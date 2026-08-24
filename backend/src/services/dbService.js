import prisma, { checkDatabaseConnection } from '../config/db.js';
import bcrypt from 'bcryptjs';

// Central sports catalog corresponding to frontend SPORTS_LIST
export const INITIAL_SPORTS = [
  {
    id: 'football',
    name: 'Football',
    slug: 'football',
    icon: 'Activity',
    color: '#10B981',
    description: 'Passing, dribbling, tactical awareness, physical endurance, and teamwork.',
    popularPositions: JSON.stringify(['Forward / Winger', 'Striker', 'Midfielder', 'Central Defensive Mid', 'Full Back', 'Center Back', 'Goalkeeper'])
  },
  {
    id: 'cricket',
    name: 'Cricket',
    slug: 'cricket',
    icon: 'Target',
    color: '#F59E0B',
    description: 'Batting technique, bowling precision, fielding agility, and match strategy.',
    popularPositions: JSON.stringify(['Top-Order Batsman', 'Middle-Order Batsman', 'Fast Bowler', 'Spin Bowler', 'All-Rounder', 'Wicket-Keeper Batsman'])
  },
  {
    id: 'basketball',
    name: 'Basketball',
    slug: 'basketball',
    icon: 'Dribbble',
    color: '#F97316',
    description: 'Shooting mechanics, ball handling, defensive footwork, and spatial game sense.',
    popularPositions: JSON.stringify(['Point Guard (PG)', 'Shooting Guard (SG)', 'Small Forward (SF)', 'Power Forward (PF)', 'Center (C)'])
  },
  {
    id: 'athletics',
    name: 'Athletics',
    slug: 'athletics',
    icon: 'Zap',
    color: '#EF4444',
    description: 'Sprint mechanics, pacing strategy, explosive power, and recovery discipline.',
    popularPositions: JSON.stringify(['100m / 200m Sprint', '400m / 800m Middle Distance', '1500m / 5000m Long Distance', 'Hurdles', 'Long Jump', 'Relay'])
  },
  {
    id: 'volleyball',
    name: 'Volleyball',
    slug: 'volleyball',
    icon: 'Flame',
    color: '#8B5CF6',
    description: 'Spiking, setting, defensive digs, vertical leap, and court communication.',
    popularPositions: JSON.stringify(['Outside Hitter', 'Opposite Hitter', 'Setter', 'Middle Blocker', 'Libero', 'Defensive Specialist'])
  },
  {
    id: 'badminton',
    name: 'Badminton',
    slug: 'badminton',
    icon: 'Wind',
    color: '#06B6D4',
    description: 'Smash speed, footwork agility, net play, reaction time, and deception.',
    popularPositions: JSON.stringify(['Singles Specialist', 'Doubles Front-Court Attacker', 'Doubles Rear-Court Smasher', 'Mixed Doubles Specialist'])
  },
  {
    id: 'tennis',
    name: 'Tennis',
    slug: 'tennis',
    icon: 'CircleDot',
    color: '#84CC16',
    description: 'Forehand/backhand power, serve precision, stamina, and baseline endurance.',
    popularPositions: JSON.stringify(['Baseline Aggressor', 'Serve-and-Volleyer', 'All-Court Player', 'Counterpuncher', 'Doubles Specialist'])
  },
  {
    id: 'other',
    name: 'Other Sport',
    slug: 'other',
    icon: 'Trophy',
    color: '#94A3B8',
    description: 'Multi-disciplinary athletic growth and structured development.',
    popularPositions: JSON.stringify(['Athlete', 'Captain', 'Competitor', 'Individual Specialist'])
  }
];

// Difficulty levels catalog
export const INITIAL_DIFFICULTY_LEVELS = [
  {
    id: 'Beginner',
    name: 'Beginner',
    label: 'Beginner',
    tagline: 'Learning fundamentals & building habits',
    description: 'Practicing for under 1-2 years or just starting structured sports training.',
    rankOrder: 1
  },
  {
    id: 'Intermediate',
    name: 'Intermediate',
    label: 'Intermediate',
    tagline: 'Refining skills & playing competitively',
    description: 'Regular player in school, club, or district level with solid basic foundation.',
    rankOrder: 2
  },
  {
    id: 'Advanced',
    name: 'Advanced',
    label: 'Advanced',
    tagline: 'Elite training & selection trials',
    description: 'Competing at state/national levels or actively aiming for professional sports drafts.',
    rankOrder: 3
  }
];

// Bi-weekly Assessment Cycles
export const INITIAL_ASSESSMENT_CYCLES = [
  {
    id: 'cycle-current',
    cycleNumber: 4,
    title: 'Cycle 4 (Jul 3 – Jul 16, 2026)',
    startDate: new Date('2026-07-03T00:00:00.000Z'),
    endDate: new Date('2026-07-16T23:59:59.000Z'),
    durationWeeks: 2,
    status: 'ACTIVE'
  },
  {
    id: 'cycle-next',
    cycleNumber: 5,
    title: 'Cycle 5 (Jul 17 – Jul 30, 2026)',
    startDate: new Date('2026-07-17T00:00:00.000Z'),
    endDate: new Date('2026-07-30T23:59:59.000Z'),
    durationWeeks: 2,
    status: 'UPCOMING'
  }
];

// Core 4 Assessments
export const INITIAL_ASSESSMENTS = [
  {
    id: 'skills',
    slug: 'skills',
    title: 'Skills Assessment',
    category: 'Technical Ability',
    description: 'Evaluate technical dexterity, precision, ball handling, and sport-specific mechanics.',
    estimatedTime: '10 mins',
    badgeCategory: 'Technical',
    items: JSON.stringify(['Ball Control / Dribbling', 'Passing Accuracy', 'Shooting Mechanics', 'First Touch'])
  },
  {
    id: 'fitness',
    slug: 'fitness',
    title: 'Fitness Assessment',
    category: 'Physical Readiness',
    description: 'Evaluate aerobic endurance, explosive agility, core stability, and sprint velocity.',
    estimatedTime: '15 mins',
    badgeCategory: 'Physical',
    items: JSON.stringify(['Aerobic Capacity (Beep Test)', '20m Sprint Velocity', 'Agility T-Test', 'Core & Plank Test'])
  },
  {
    id: 'knowledge',
    slug: 'knowledge',
    title: 'Knowledge Assessment',
    category: 'Sport IQ & Rules',
    description: 'Evaluate understanding of game strategy, defensive schemes, positioning, and refereeing rules.',
    estimatedTime: '8 mins',
    badgeCategory: 'Tactical',
    items: JSON.stringify(['Tactical Formations', 'Offside & Game Rules', 'Defensive Transition', 'Set Piece Strategy'])
  },
  {
    id: 'performance',
    slug: 'performance',
    title: 'Performance Assessment',
    category: 'Match Execution',
    description: 'Evaluate real game performance, consistency under pressure, and decision-making speed.',
    estimatedTime: '12 mins',
    badgeCategory: 'Execution',
    items: JSON.stringify(['Decision Speed', 'Mental Resilience', 'Match Impact Score', 'Consistency Index'])
  }
];

// Full matrix for dynamic telemetry (Sport × Difficulty)
const createTelemetryHelper = (d) => ({
  overallReadiness: d.or,
  technicalSkill: { value: d.ts, delta: d.tsd },
  physicalFitness: { value: d.pf, delta: d.pfd },
  sportIQ: { value: d.iq, delta: d.iqd },
  trainingConsistency: { value: d.tc, delta: d.tcd },
  targetReadiness: d.target,
  assessmentsCompleted: d.ac,
  assessmentsTotal: 4,
  cycleTrainingHours: d.hrs,
  biWeeklyTargetHours: d.tgtHrs,
  trajectoryData: d.traj
});

export const TELEMETRY_MATRIX = {
  football: {
    Beginner: createTelemetryHelper({
      or: 35, ts: 32, tsd: 4, pf: 30, pfd: 3, iq: 38, iqd: 5, tc: 65, tcd: 8, target: 50, ac: 1, hrs: 8, tgtHrs: 10,
      traj: [
        { label: 'Cycle 1', date: 'Jun 5', score: 18 },
        { label: 'Cycle 2', date: 'Jun 19', score: 22 },
        { label: 'Cycle 3', date: 'Jul 3', score: 28 },
        { label: 'Now', date: 'Jul 17', score: 35, isCurrent: true },
        { label: 'Projected', date: 'Jul 31', score: 43, isProjected: true }
      ]
    }),
    Intermediate: createTelemetryHelper({
      or: 55, ts: 52, tsd: 6, pf: 50, pfd: 4, iq: 58, iqd: 3, tc: 78, tcd: 5, target: 70, ac: 2, hrs: 14, tgtHrs: 16,
      traj: [
        { label: 'Cycle 1', date: 'Jun 5', score: 35 },
        { label: 'Cycle 2', date: 'Jun 19', score: 40 },
        { label: 'Cycle 3', date: 'Jul 3', score: 48 },
        { label: 'Now', date: 'Jul 17', score: 55, isCurrent: true },
        { label: 'Projected', date: 'Jul 31', score: 64, isProjected: true }
      ]
    }),
    Advanced: createTelemetryHelper({
      or: 78, ts: 80, tsd: 3, pf: 75, pfd: 2, iq: 82, iqd: 4, tc: 92, tcd: 2, target: 90, ac: 3, hrs: 22, tgtHrs: 24,
      traj: [
        { label: 'Cycle 1', date: 'Jun 5', score: 62 },
        { label: 'Cycle 2', date: 'Jun 19', score: 68 },
        { label: 'Cycle 3', date: 'Jul 3', score: 74 },
        { label: 'Now', date: 'Jul 17', score: 78, isCurrent: true },
        { label: 'Projected', date: 'Jul 31', score: 85, isProjected: true }
      ]
    })
  },
  cricket: {
    Beginner: createTelemetryHelper({
      or: 30, ts: 28, tsd: 3, pf: 25, pfd: 2, iq: 35, iqd: 6, tc: 60, tcd: 7, target: 45, ac: 1, hrs: 7, tgtHrs: 10,
      traj: [
        { label: 'Cycle 1', date: 'Jun 5', score: 15 },
        { label: 'Cycle 2', date: 'Jun 19', score: 20 },
        { label: 'Cycle 3', date: 'Jul 3', score: 25 },
        { label: 'Now', date: 'Jul 17', score: 30, isCurrent: true },
        { label: 'Projected', date: 'Jul 31', score: 38, isProjected: true }
      ]
    }),
    Intermediate: createTelemetryHelper({
      or: 52, ts: 55, tsd: 5, pf: 48, pfd: 4, iq: 60, iqd: 2, tc: 74, tcd: 6, target: 68, ac: 2, hrs: 13, tgtHrs: 14,
      traj: [
        { label: 'Cycle 1', date: 'Jun 5', score: 32 },
        { label: 'Cycle 2', date: 'Jun 19', score: 38 },
        { label: 'Cycle 3', date: 'Jul 3', score: 46 },
        { label: 'Now', date: 'Jul 17', score: 52, isCurrent: true },
        { label: 'Projected', date: 'Jul 31', score: 60, isProjected: true }
      ]
    }),
    Advanced: createTelemetryHelper({
      or: 76, ts: 78, tsd: 2, pf: 72, pfd: 3, iq: 85, iqd: 1, tc: 90, tcd: 3, target: 88, ac: 3, hrs: 20, tgtHrs: 22,
      traj: [
        { label: 'Cycle 1', date: 'Jun 5', score: 60 },
        { label: 'Cycle 2', date: 'Jun 19', score: 66 },
        { label: 'Cycle 3', date: 'Jul 3', score: 72 },
        { label: 'Now', date: 'Jul 17', score: 76, isCurrent: true },
        { label: 'Projected', date: 'Jul 31', score: 83, isProjected: true }
      ]
    })
  },
  basketball: {
    Beginner: createTelemetryHelper({
      or: 33, ts: 30, tsd: 5, pf: 35, pfd: 4, iq: 32, iqd: 3, tc: 62, tcd: 9, target: 48, ac: 1, hrs: 9, tgtHrs: 12,
      traj: [
        { label: 'Cycle 1', date: 'Jun 5', score: 16 },
        { label: 'Cycle 2', date: 'Jun 19', score: 22 },
        { label: 'Cycle 3', date: 'Jul 3', score: 28 },
        { label: 'Now', date: 'Jul 17', score: 33, isCurrent: true },
        { label: 'Projected', date: 'Jul 31', score: 42, isProjected: true }
      ]
    }),
    Intermediate: createTelemetryHelper({
      or: 58, ts: 56, tsd: 7, pf: 60, pfd: 5, iq: 54, iqd: 4, tc: 80, tcd: 6, target: 72, ac: 2, hrs: 15, tgtHrs: 16,
      traj: [
        { label: 'Cycle 1', date: 'Jun 5', score: 38 },
        { label: 'Cycle 2', date: 'Jun 19', score: 44 },
        { label: 'Cycle 3', date: 'Jul 3', score: 52 },
        { label: 'Now', date: 'Jul 17', score: 58, isCurrent: true },
        { label: 'Projected', date: 'Jul 31', score: 66, isProjected: true }
      ]
    }),
    Advanced: createTelemetryHelper({
      or: 82, ts: 84, tsd: 3, pf: 80, pfd: 2, iq: 79, iqd: 5, tc: 94, tcd: 1, target: 92, ac: 3, hrs: 24, tgtHrs: 26,
      traj: [
        { label: 'Cycle 1', date: 'Jun 5', score: 66 },
        { label: 'Cycle 2', date: 'Jun 19', score: 72 },
        { label: 'Cycle 3', date: 'Jul 3', score: 78 },
        { label: 'Now', date: 'Jul 17', score: 82, isCurrent: true },
        { label: 'Projected', date: 'Jul 31', score: 88, isProjected: true }
      ]
    })
  },
  athletics: {
    Beginner: createTelemetryHelper({
      or: 38, ts: 35, tsd: 6, pf: 40, pfd: 5, iq: 30, iqd: 4, tc: 70, tcd: 10, target: 52, ac: 1, hrs: 10, tgtHrs: 12,
      traj: [
        { label: 'Cycle 1', date: 'Jun 5', score: 20 },
        { label: 'Cycle 2', date: 'Jun 19', score: 26 },
        { label: 'Cycle 3', date: 'Jul 3', score: 32 },
        { label: 'Now', date: 'Jul 17', score: 38, isCurrent: true },
        { label: 'Projected', date: 'Jul 31', score: 46, isProjected: true }
      ]
    }),
    Intermediate: createTelemetryHelper({
      or: 60, ts: 58, tsd: 4, pf: 65, pfd: 6, iq: 52, iqd: -2, tc: 82, tcd: 4, target: 75, ac: 2, hrs: 16, tgtHrs: 18,
      traj: [
        { label: 'Cycle 1', date: 'Jun 5', score: 40 },
        { label: 'Cycle 2', date: 'Jun 19', score: 46 },
        { label: 'Cycle 3', date: 'Jul 3', score: 54 },
        { label: 'Now', date: 'Jul 17', score: 60, isCurrent: true },
        { label: 'Projected', date: 'Jul 31', score: 68, isProjected: true }
      ]
    }),
    Advanced: createTelemetryHelper({
      or: 85, ts: 83, tsd: 2, pf: 90, pfd: 1, iq: 78, iqd: 3, tc: 95, tcd: 1, target: 95, ac: 4, hrs: 26, tgtHrs: 28,
      traj: [
        { label: 'Cycle 1', date: 'Jun 5', score: 70 },
        { label: 'Cycle 2', date: 'Jun 19', score: 75 },
        { label: 'Cycle 3', date: 'Jul 3', score: 80 },
        { label: 'Now', date: 'Jul 17', score: 85, isCurrent: true },
        { label: 'Projected', date: 'Jul 31', score: 91, isProjected: true }
      ]
    })
  },
  volleyball: {
    Beginner: createTelemetryHelper({
      or: 32, ts: 28, tsd: 5, pf: 34, pfd: 4, iq: 30, iqd: 6, tc: 58, tcd: 7, target: 46, ac: 1, hrs: 7, tgtHrs: 10,
      traj: [
        { label: 'Cycle 1', date: 'Jun 5', score: 14 },
        { label: 'Cycle 2', date: 'Jun 19', score: 20 },
        { label: 'Cycle 3', date: 'Jul 3', score: 26 },
        { label: 'Now', date: 'Jul 17', score: 32, isCurrent: true },
        { label: 'Projected', date: 'Jul 31', score: 40, isProjected: true }
      ]
    }),
    Intermediate: createTelemetryHelper({
      or: 54, ts: 50, tsd: 6, pf: 55, pfd: 5, iq: 56, iqd: 3, tc: 76, tcd: 5, target: 68, ac: 2, hrs: 12, tgtHrs: 14,
      traj: [
        { label: 'Cycle 1', date: 'Jun 5', score: 34 },
        { label: 'Cycle 2', date: 'Jun 19', score: 40 },
        { label: 'Cycle 3', date: 'Jul 3', score: 48 },
        { label: 'Now', date: 'Jul 17', score: 54, isCurrent: true },
        { label: 'Projected', date: 'Jul 31', score: 62, isProjected: true }
      ]
    }),
    Advanced: createTelemetryHelper({
      or: 79, ts: 77, tsd: 3, pf: 82, pfd: 2, iq: 80, iqd: 2, tc: 91, tcd: 2, target: 90, ac: 3, hrs: 21, tgtHrs: 24,
      traj: [
        { label: 'Cycle 1', date: 'Jun 5', score: 63 },
        { label: 'Cycle 2', date: 'Jun 19', score: 68 },
        { label: 'Cycle 3', date: 'Jul 3', score: 74 },
        { label: 'Now', date: 'Jul 17', score: 79, isCurrent: true },
        { label: 'Projected', date: 'Jul 31', score: 86, isProjected: true }
      ]
    })
  },
  badminton: {
    Beginner: createTelemetryHelper({
      or: 34, ts: 30, tsd: 4, pf: 32, pfd: 3, iq: 36, iqd: 5, tc: 64, tcd: 8, target: 48, ac: 1, hrs: 8, tgtHrs: 10,
      traj: [
        { label: 'Cycle 1', date: 'Jun 5', score: 17 },
        { label: 'Cycle 2', date: 'Jun 19', score: 22 },
        { label: 'Cycle 3', date: 'Jul 3', score: 28 },
        { label: 'Now', date: 'Jul 17', score: 34, isCurrent: true },
        { label: 'Projected', date: 'Jul 31', score: 42, isProjected: true }
      ]
    }),
    Intermediate: createTelemetryHelper({
      or: 56, ts: 58, tsd: 5, pf: 52, pfd: 4, iq: 60, iqd: 2, tc: 78, tcd: 6, target: 70, ac: 2, hrs: 14, tgtHrs: 16,
      traj: [
        { label: 'Cycle 1', date: 'Jun 5', score: 36 },
        { label: 'Cycle 2', date: 'Jun 19', score: 42 },
        { label: 'Cycle 3', date: 'Jul 3', score: 50 },
        { label: 'Now', date: 'Jul 17', score: 56, isCurrent: true },
        { label: 'Projected', date: 'Jul 31', score: 64, isProjected: true }
      ]
    }),
    Advanced: createTelemetryHelper({
      or: 80, ts: 82, tsd: 2, pf: 76, pfd: 3, iq: 84, iqd: 1, tc: 93, tcd: 2, target: 92, ac: 3, hrs: 22, tgtHrs: 24,
      traj: [
        { label: 'Cycle 1', date: 'Jun 5', score: 64 },
        { label: 'Cycle 2', date: 'Jun 19', score: 70 },
        { label: 'Cycle 3', date: 'Jul 3', score: 76 },
        { label: 'Now', date: 'Jul 17', score: 80, isCurrent: true },
        { label: 'Projected', date: 'Jul 31', score: 87, isProjected: true }
      ]
    })
  },
  tennis: {
    Beginner: createTelemetryHelper({
      or: 36, ts: 34, tsd: 5, pf: 38, pfd: 4, iq: 33, iqd: 3, tc: 66, tcd: 9, target: 50, ac: 1, hrs: 9, tgtHrs: 12,
      traj: [
        { label: 'Cycle 1', date: 'Jun 5', score: 19 },
        { label: 'Cycle 2', date: 'Jun 19', score: 24 },
        { label: 'Cycle 3', date: 'Jul 3', score: 30 },
        { label: 'Now', date: 'Jul 17', score: 36, isCurrent: true },
        { label: 'Projected', date: 'Jul 31', score: 44, isProjected: true }
      ]
    }),
    Intermediate: createTelemetryHelper({
      or: 57, ts: 60, tsd: 6, pf: 55, pfd: 3, iq: 54, iqd: -1, tc: 76, tcd: 5, target: 72, ac: 2, hrs: 15, tgtHrs: 16,
      traj: [
        { label: 'Cycle 1', date: 'Jun 5', score: 37 },
        { label: 'Cycle 2', date: 'Jun 19', score: 43 },
        { label: 'Cycle 3', date: 'Jul 3', score: 51 },
        { label: 'Now', date: 'Jul 17', score: 57, isCurrent: true },
        { label: 'Projected', date: 'Jul 31', score: 65, isProjected: true }
      ]
    }),
    Advanced: createTelemetryHelper({
      or: 81, ts: 85, tsd: 2, pf: 78, pfd: 2, iq: 80, iqd: 3, tc: 92, tcd: 1, target: 93, ac: 3, hrs: 23, tgtHrs: 26,
      traj: [
        { label: 'Cycle 1', date: 'Jun 5', score: 65 },
        { label: 'Cycle 2', date: 'Jun 19', score: 71 },
        { label: 'Cycle 3', date: 'Jul 3', score: 77 },
        { label: 'Now', date: 'Jul 17', score: 81, isCurrent: true },
        { label: 'Projected', date: 'Jul 31', score: 88, isProjected: true }
      ]
    })
  },
  other: {
    Beginner: createTelemetryHelper({
      or: 30, ts: 28, tsd: 3, pf: 30, pfd: 3, iq: 28, iqd: 4, tc: 55, tcd: 6, target: 44, ac: 1, hrs: 6, tgtHrs: 8,
      traj: [
        { label: 'Cycle 1', date: 'Jun 5', score: 14 },
        { label: 'Cycle 2', date: 'Jun 19', score: 19 },
        { label: 'Cycle 3', date: 'Jul 3', score: 24 },
        { label: 'Now', date: 'Jul 17', score: 30, isCurrent: true },
        { label: 'Projected', date: 'Jul 31', score: 37, isProjected: true }
      ]
    }),
    Intermediate: createTelemetryHelper({
      or: 50, ts: 48, tsd: 4, pf: 50, pfd: 5, iq: 48, iqd: 2, tc: 72, tcd: 5, target: 65, ac: 2, hrs: 12, tgtHrs: 14,
      traj: [
        { label: 'Cycle 1', date: 'Jun 5', score: 30 },
        { label: 'Cycle 2', date: 'Jun 19', score: 36 },
        { label: 'Cycle 3', date: 'Jul 3', score: 44 },
        { label: 'Now', date: 'Jul 17', score: 50, isCurrent: true },
        { label: 'Projected', date: 'Jul 31', score: 58, isProjected: true }
      ]
    }),
    Advanced: createTelemetryHelper({
      or: 74, ts: 72, tsd: 2, pf: 74, pfd: 2, iq: 70, iqd: 3, tc: 88, tcd: 2, target: 85, ac: 3, hrs: 20, tgtHrs: 22,
      traj: [
        { label: 'Cycle 1', date: 'Jun 5', score: 58 },
        { label: 'Cycle 2', date: 'Jun 19', score: 63 },
        { label: 'Cycle 3', date: 'Jul 3', score: 69 },
        { label: 'Now', date: 'Jul 17', score: 74, isCurrent: true },
        { label: 'Projected', date: 'Jul 31', score: 81, isProjected: true }
      ]
    })
  }
};

/**
 * In-Memory & Prisma Hybrid Store Implementation
 */
class DatabaseService {
  constructor() {
    this.memoryStore = {
      users: [],
      sports: [...INITIAL_SPORTS],
      difficultyLevels: [...INITIAL_DIFFICULTY_LEVELS],
      assessmentCycles: [...INITIAL_ASSESSMENT_CYCLES],
      assessments: [...INITIAL_ASSESSMENTS],
      userSportProfiles: {}, // key: `${userId}_${sportId}_${difficultyLevelId}`
      userPillarProgress: {}, // key: `${userId}_${sportId}_${difficultyLevelId}`
      userTrajectoryRecords: {}, // key: `${userId}_${sportId}_${difficultyLevelId}`
      userAssessmentResults: {}, // key: `${userId}_${sportId}_${difficultyLevelId}`
      userEvents: {},
      userCompetitionResults: {}
    };

    this.initDefaultDemoUser();
    this.initDefaultAdminUser();
  }

  initDefaultAdminUser() {
    const adminEmail = (process.env.ADMIN_EMAIL || 'admin@athletex.ai').trim().toLowerCase();
    const adminPassword = process.env.ADMIN_PASSWORD || 'adminPassword123';

    const adminUser = {
      id: 'admin-user-1',
      name: 'Athletex Administrator',
      email: adminEmail,
      passwordHash: bcrypt.hashSync(adminPassword, 10),
      role: 'ADMIN',
      createdAt: new Date('2026-08-01T08:00:00.000Z'),
      updatedAt: new Date()
    };

    // Ensure not duplicated
    if (!this.memoryStore.users.some(u => u.email.toLowerCase() === adminEmail)) {
      this.memoryStore.users.push(adminUser);
    }
  }

  initDefaultDemoUser() {
    const demoUser = {
      id: 'demo-user-1',
      name: 'Alex Johnson',
      email: 'alex.athlete@athletex.ai',
      passwordHash: bcrypt.hashSync('password123', 10),
      role: 'ATHLETE',
      createdAt: new Date('2026-08-01T10:00:00.000Z'),
      updatedAt: new Date()
    };
    this.memoryStore.users.push(demoUser);

    // Populate default sport profiles and telemetry for demo user across sports and levels
    for (const sport of INITIAL_SPORTS) {
      for (const level of INITIAL_DIFFICULTY_LEVELS) {
        const key = `${demoUser.id}_${sport.id}_${level.id}`;
        const telemetry = this.resolveTelemetry(sport.id, level.id);

        this.memoryStore.userSportProfiles[key] = {
          id: `profile_${key}`,
          userId: demoUser.id,
          sportId: sport.id,
          difficultyLevelId: level.id,
          sportName: sport.name,
          levelName: level.name,
          name: demoUser.name,
          email: demoUser.email,
          position: 'Forward / Winger',
          height: '178 cm',
          weight: '68 kg',
          age: 17,
          gender: 'Male',
          location: 'Manchester, UK',
          personalBest: '100m Sprint: 11.8s • 14 Goals Season',
          trainingHours: `${telemetry.cycleTrainingHours / 2} hours/week`,
          trainingHoursNumber: Math.round(telemetry.cycleTrainingHours / 2),
          goal: 'Improve performance',
          readiness: telemetry.overallReadiness,
          bio: 'Passionate aspiring athlete striving to build strong technical fundamentals, agility, and tactical vision for high-school and academy selection.',
          sportsBackground: 'School varsity team player for 2 seasons. Community tournament participant with 3 years of recreational play.',
          strengths: ['Ball Control', 'Agility', 'Determination'],
          focusAreas: ['Tactical Positioning', 'Stamina', 'Weak-foot shooting'],
          preferredTrainingDays: ['Monday', 'Wednesday', 'Friday', 'Saturday'],
          isCurrentSelected: sport.id === 'football' && level.id === 'Beginner'
        };

        this.memoryStore.userPillarProgress[key] = [
          { pillarType: 'TECHNICAL_SKILL', pillarName: 'Technical Skill', value: telemetry.technicalSkill.value, delta: telemetry.technicalSkill.delta, targetValue: 100 },
          { pillarType: 'PHYSICAL_FITNESS', pillarName: 'Physical Fitness', value: telemetry.physicalFitness.value, delta: telemetry.physicalFitness.delta, targetValue: 100 },
          { pillarType: 'SPORT_IQ', pillarName: 'Sport IQ & Tactical', value: telemetry.sportIQ.value, delta: telemetry.sportIQ.delta, targetValue: 100 },
          { pillarType: 'TRAINING_CONSISTENCY', pillarName: 'Training Consistency', value: telemetry.trainingConsistency.value, delta: telemetry.trainingConsistency.delta, targetValue: 100 }
        ];

        this.memoryStore.userTrajectoryRecords[key] = telemetry.trajectoryData.map((t, idx) => ({
          id: `traj_${key}_${idx}`,
          userId: demoUser.id,
          sportId: sport.id,
          difficultyLevelId: level.id,
          cycleOrder: idx + 1,
          label: t.label,
          recordedDate: t.date,
          score: t.score,
          isCurrent: !!t.isCurrent,
          isProjected: !!t.isProjected
        }));

        this.memoryStore.userAssessmentResults[key] = [
          { assessmentId: 'skills', title: 'Skills Assessment', status: 'COMPLETED', score: telemetry.technicalSkill.value, completedAt: '2026-07-08T10:00:00Z' },
          { assessmentId: 'fitness', title: 'Fitness Assessment', status: telemetry.assessmentsCompleted >= 2 ? 'COMPLETED' : 'PENDING', score: telemetry.physicalFitness.value, completedAt: '2026-07-12T14:00:00Z' },
          { assessmentId: 'knowledge', title: 'Knowledge Assessment', status: telemetry.assessmentsCompleted >= 3 ? 'COMPLETED' : 'PENDING', score: telemetry.sportIQ.value, completedAt: null },
          { assessmentId: 'performance', title: 'Performance Assessment', status: telemetry.assessmentsCompleted >= 4 ? 'COMPLETED' : 'PENDING', score: telemetry.overallReadiness, completedAt: null }
        ];
      }
    }
  }

  resolveTelemetry(sportId, difficultyLevelId) {
    const sId = (sportId || 'football').toLowerCase();
    const lId = difficultyLevelId || 'Beginner';
    const sportBucket = TELEMETRY_MATRIX[sId] || TELEMETRY_MATRIX.other;
    return sportBucket[lId] || sportBucket.Beginner;
  }

  // -------------------------------------------------------------
  // USER METHODS
  // -------------------------------------------------------------
  async findUserByEmail(email) {
    const normalized = (email || '').trim().toLowerCase();
    
    if (prisma && await checkDatabaseConnection()) {
      try {
        const user = await prisma.user.findUnique({
          where: { email: normalized }
        });
        if (user) return user;
      } catch (err) {
        console.warn('Prisma findUserByEmail fallback:', err.message);
      }
    }

    return this.memoryStore.users.find(u => u.email.toLowerCase() === normalized) || null;
  }

  async findUserById(id) {
    if (prisma && await checkDatabaseConnection()) {
      try {
        const user = await prisma.user.findUnique({
          where: { id }
        });
        if (user) return user;
      } catch (err) {
        console.warn('Prisma findUserById fallback:', err.message);
      }
    }

    return this.memoryStore.users.find(u => u.id === id) || null;
  }

  async createUser({ name, email, passwordHash, role = 'ATHLETE', sport = 'football', level = 'Beginner' }) {
    const normalizedEmail = email.trim().toLowerCase();
    const newUser = {
      id: `usr_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      name: name.trim(),
      email: normalizedEmail,
      passwordHash,
      role,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    if (prisma && await checkDatabaseConnection()) {
      try {
        const created = await prisma.user.create({
          data: {
            id: newUser.id,
            name: newUser.name,
            email: newUser.email,
            passwordHash: newUser.passwordHash,
            role: newUser.role
          }
        });
        newUser.id = created.id;
      } catch (err) {
        console.warn('Prisma createUser fallback:', err.message);
      }
    }

    this.memoryStore.users.push(newUser);

    // Initialize sport profiles for the new user across sports and levels
    const targetSport = (sport || 'football').toLowerCase();
    const targetLevel = level || 'Beginner';

    for (const s of INITIAL_SPORTS) {
      for (const l of INITIAL_DIFFICULTY_LEVELS) {
        const key = `${newUser.id}_${s.id}_${l.id}`;
        const telemetry = this.resolveTelemetry(s.id, l.id);
        const isCurrent = s.id === targetSport && l.id === targetLevel;

        this.memoryStore.userSportProfiles[key] = {
          id: `profile_${key}`,
          userId: newUser.id,
          sportId: s.id,
          difficultyLevelId: l.id,
          sportName: s.name,
          levelName: l.name,
          name: newUser.name,
          email: newUser.email,
          position: 'Athlete',
          height: '178 cm',
          weight: '68 kg',
          age: 17,
          gender: 'Male',
          location: 'Manchester, UK',
          personalBest: 'Personal Best Not Set',
          trainingHours: '4 hours/week',
          trainingHoursNumber: 4,
          goal: 'Improve performance',
          readiness: telemetry.overallReadiness,
          bio: 'Aspiring athlete aiming to advance skills and compete at higher levels.',
          sportsBackground: 'Passionate multi-sport development athlete.',
          strengths: ['Dedication', 'Speed', 'Agility'],
          focusAreas: ['Tactical Awareness', 'Conditioning'],
          preferredTrainingDays: ['Monday', 'Wednesday', 'Friday'],
          isCurrentSelected: isCurrent
        };

        this.memoryStore.userPillarProgress[key] = [
          { pillarType: 'TECHNICAL_SKILL', pillarName: 'Technical Skill', value: telemetry.technicalSkill.value, delta: telemetry.technicalSkill.delta, targetValue: 100 },
          { pillarType: 'PHYSICAL_FITNESS', pillarName: 'Physical Fitness', value: telemetry.physicalFitness.value, delta: telemetry.physicalFitness.delta, targetValue: 100 },
          { pillarType: 'SPORT_IQ', pillarName: 'Sport IQ & Tactical', value: telemetry.sportIQ.value, delta: telemetry.sportIQ.delta, targetValue: 100 },
          { pillarType: 'TRAINING_CONSISTENCY', pillarName: 'Training Consistency', value: telemetry.trainingConsistency.value, delta: telemetry.trainingConsistency.delta, targetValue: 100 }
        ];

        this.memoryStore.userTrajectoryRecords[key] = telemetry.trajectoryData.map((t, idx) => ({
          id: `traj_${key}_${idx}`,
          userId: newUser.id,
          sportId: s.id,
          difficultyLevelId: l.id,
          cycleOrder: idx + 1,
          label: t.label,
          recordedDate: t.date,
          score: t.score,
          isCurrent: !!t.isCurrent,
          isProjected: !!t.isProjected
        }));

        this.memoryStore.userAssessmentResults[key] = [
          { assessmentId: 'skills', title: 'Skills Assessment', status: 'PENDING', score: null, completedAt: null },
          { assessmentId: 'fitness', title: 'Fitness Assessment', status: 'PENDING', score: null, completedAt: null },
          { assessmentId: 'knowledge', title: 'Knowledge Assessment', status: 'PENDING', score: null, completedAt: null },
          { assessmentId: 'performance', title: 'Performance Assessment', status: 'PENDING', score: null, completedAt: null }
        ];
      }
    }

    return newUser;
  }

  async updateUserPassword(userId, newPasswordHash) {
    const user = this.memoryStore.users.find(u => u.id === userId);
    if (user) {
      user.passwordHash = newPasswordHash;
      user.updatedAt = new Date();
    }

    if (prisma && await checkDatabaseConnection()) {
      try {
        await prisma.user.update({
          where: { id: userId },
          data: { passwordHash: newPasswordHash }
        });
      } catch (err) {
        console.warn('Prisma updateUserPassword fallback:', err.message);
      }
    }

    return true;
  }

  // -------------------------------------------------------------
  // SPORTS & DIFFICULTY CATALOG
  // -------------------------------------------------------------
  async getAllSports() {
    return this.memoryStore.sports;
  }

  async getSportById(id) {
    const normalized = (id || '').toLowerCase();
    return this.memoryStore.sports.find(s => s.id === normalized || s.slug === normalized) || null;
  }

  async getAllDifficultyLevels() {
    return this.memoryStore.difficultyLevels;
  }

  // -------------------------------------------------------------
  // USER SPORT PROFILE (USER + SPORT + DIFFICULTY LEVEL)
  // -------------------------------------------------------------
  async getUserSportProfile(userId, sportId = 'football', difficultyLevelId = 'Beginner') {
    const sId = (sportId || 'football').toLowerCase();
    const lId = difficultyLevelId || 'Beginner';
    const key = `${userId}_${sId}_${lId}`;

    if (prisma && await checkDatabaseConnection()) {
      try {
        const profile = await prisma.userSportProfile.findUnique({
          where: { user_sport_level_unique: { userId, sportId: sId, difficultyLevelId: lId } },
          include: { sport: true, difficultyLevel: true, user: true }
        });
        if (profile) {
          return {
            ...profile,
            sportName: profile.sport.name,
            levelName: profile.difficultyLevel.name,
            name: profile.user.name,
            email: profile.user.email,
            strengths: profile.strengths ? JSON.parse(profile.strengths) : [],
            focusAreas: profile.focusAreas ? JSON.parse(profile.focusAreas) : [],
            preferredTrainingDays: profile.preferredTrainingDays ? JSON.parse(profile.preferredTrainingDays) : []
          };
        }
        const user = await prisma.user.findUnique({ where: { id: userId } });
        if (user) {
          const sport = await prisma.sport.findUnique({ where: { id: sId } });
          const level = await prisma.difficultyLevel.findUnique({ where: { id: lId } });
          if (sport && level) {
            const created = await prisma.userSportProfile.create({
              data: { userId, sportId: sId, difficultyLevelId: lId, isCurrentSelected: true },
              include: { sport: true, difficultyLevel: true, user: true }
            });
            return {
              ...created,
              sportName: created.sport.name,
              levelName: created.difficultyLevel.name,
              name: created.user.name,
              email: created.user.email,
              strengths: [],
              focusAreas: [],
              preferredTrainingDays: []
            };
          }
        }
      } catch (err) {
        console.warn('Prisma getUserSportProfile fallback:', err.message);
      }
    }

    if (this.memoryStore.userSportProfiles[key]) {
      return this.memoryStore.userSportProfiles[key];
    }

    // Auto-create if not yet initialized
    const user = await this.findUserById(userId);
    const sport = await this.getSportById(sId) || { name: 'Football', id: 'football' };
    const telemetry = this.resolveTelemetry(sId, lId);

    const profile = {
      id: `profile_${key}`,
      userId,
      sportId: sId,
      difficultyLevelId: lId,
      sportName: sport.name,
      levelName: lId,
      name: user?.name || 'Athlete',
      email: user?.email || '',
      position: 'Athlete',
      height: '178 cm',
      weight: '68 kg',
      age: 17,
      gender: 'Male',
      location: 'Manchester, UK',
      personalBest: 'Personal Best Not Set',
      trainingHours: '4 hours/week',
      trainingHoursNumber: 4,
      goal: 'Improve performance',
      readiness: telemetry.overallReadiness,
      bio: 'Athlete profile data.',
      sportsBackground: 'Athletic background.',
      strengths: ['Agility', 'Focus'],
      focusAreas: ['Consistency'],
      preferredTrainingDays: ['Monday', 'Wednesday', 'Friday'],
      isCurrentSelected: true
    };

    this.memoryStore.userSportProfiles[key] = profile;
    return profile;
  }

  async getActiveUserSportProfile(userId) {
    if (prisma && await checkDatabaseConnection()) {
      try {
        const profile = await prisma.userSportProfile.findFirst({
          where: { userId, isCurrentSelected: true },
          orderBy: { updatedAt: 'desc' },
          include: { sport: true, difficultyLevel: true, user: true }
        });
        if (profile) {
          return {
            ...profile,
            sportName: profile.sport.name,
            levelName: profile.difficultyLevel.name,
            name: profile.user.name,
            email: profile.user.email,
            strengths: profile.strengths ? JSON.parse(profile.strengths) : [],
            focusAreas: profile.focusAreas ? JSON.parse(profile.focusAreas) : [],
            preferredTrainingDays: profile.preferredTrainingDays ? JSON.parse(profile.preferredTrainingDays) : []
          };
        }
      } catch (err) {
        console.warn('Prisma getActiveUserSportProfile fallback:', err.message);
      }
      return this.getUserSportProfile(userId, 'football', 'Beginner');
    }

    // Find profile marked as isCurrentSelected, or default to Football Beginner
    const userProfileKeys = Object.keys(this.memoryStore.userSportProfiles).filter(k => k.startsWith(`${userId}_`));
    for (const key of userProfileKeys) {
      if (this.memoryStore.userSportProfiles[key]?.isCurrentSelected) {
        return this.memoryStore.userSportProfiles[key];
      }
    }
    return this.getUserSportProfile(userId, 'football', 'Beginner');
  }

  async updateUserSportProfile(userId, sportId, difficultyLevelId, updateData) {
    const sId = (sportId || 'football').toLowerCase();
    const lId = difficultyLevelId || 'Beginner';

    if (prisma && await checkDatabaseConnection()) {
      try {
        const { name, email, sport, level, strengths, focusAreas, preferredTrainingDays, phone, avatar, ...profileData } = updateData;
        await prisma.userSportProfile.updateMany({ where: { userId }, data: { isCurrentSelected: false } });
        if (name || email) {
          await prisma.user.update({
            where: { id: userId },
            data: { ...(name ? { name } : {}), ...(email ? { email: email.trim().toLowerCase() } : {}) }
          });
        }
        if (avatar) {
          await prisma.user.update({ where: { id: userId }, data: { avatar } });
        }
        const updated = await prisma.userSportProfile.upsert({
          where: { user_sport_level_unique: { userId, sportId: sId, difficultyLevelId: lId } },
          update: {
            ...profileData,
            ...(strengths ? { strengths: JSON.stringify(strengths) } : {}),
            ...(focusAreas ? { focusAreas: JSON.stringify(focusAreas) } : {}),
            ...(preferredTrainingDays ? { preferredTrainingDays: JSON.stringify(preferredTrainingDays) } : {})
          },
          create: {
            userId,
            sportId: sId,
            difficultyLevelId: lId,
            isCurrentSelected: true,
            ...profileData,
            ...(strengths ? { strengths: JSON.stringify(strengths) } : {}),
            ...(focusAreas ? { focusAreas: JSON.stringify(focusAreas) } : {}),
            ...(preferredTrainingDays ? { preferredTrainingDays: JSON.stringify(preferredTrainingDays) } : {})
          },
          include: { sport: true, difficultyLevel: true, user: true }
        });
        return {
          ...updated,
          sportName: updated.sport.name,
          levelName: updated.difficultyLevel.name,
          name: updated.user.name,
          email: updated.user.email,
          strengths: updated.strengths ? JSON.parse(updated.strengths) : [],
          focusAreas: updated.focusAreas ? JSON.parse(updated.focusAreas) : [],
          preferredTrainingDays: updated.preferredTrainingDays ? JSON.parse(updated.preferredTrainingDays) : []
        };
      } catch (err) {
        console.warn('Prisma updateUserSportProfile fallback:', err.message);
      }
    }

    const profile = await this.getUserSportProfile(userId, sId, lId);

    const updated = {
      ...profile,
      ...updateData,
      sportId: sId,
      difficultyLevelId: lId,
      isCurrentSelected: true,
      updatedAt: new Date()
    };

    const userProfileKeys = Object.keys(this.memoryStore.userSportProfiles).filter(k => k.startsWith(`${userId}_`));
    userProfileKeys.forEach(k => {
      if (this.memoryStore.userSportProfiles[k]) this.memoryStore.userSportProfiles[k].isCurrentSelected = false;
    });

    const key = `${userId}_${sId}_${lId}`;
    this.memoryStore.userSportProfiles[key] = updated;
    return updated;
  }

  async switchUserSportAndLevel(userId, sportId, difficultyLevelId) {
    const sId = (sportId || 'football').toLowerCase();
    const lId = difficultyLevelId || 'Beginner';

    if (prisma && await checkDatabaseConnection()) {
      try {
        await prisma.userSportProfile.updateMany({ where: { userId }, data: { isCurrentSelected: false } });
        return this.updateUserSportProfile(userId, sId, lId, { isCurrentSelected: true });
      } catch (err) {
        console.warn('Prisma switchUserSportAndLevel fallback:', err.message);
      }
    }

    // Set all other profiles for this user to isCurrentSelected = false
    const userProfileKeys = Object.keys(this.memoryStore.userSportProfiles).filter(k => k.startsWith(`${userId}_`));
    for (const k of userProfileKeys) {
      if (this.memoryStore.userSportProfiles[k]) {
        this.memoryStore.userSportProfiles[k].isCurrentSelected = false;
      }
    }

    const targetProfile = await this.getUserSportProfile(userId, sId, lId);
    targetProfile.isCurrentSelected = true;
    const key = `${userId}_${sId}_${lId}`;
    this.memoryStore.userSportProfiles[key] = targetProfile;

    return targetProfile;
  }

  // -------------------------------------------------------------
  // PROGRESS & TELEMETRY (DYNAMIC BY USER + SPORT + DIFFICULTY)
  // -------------------------------------------------------------
  async getProgressTelemetry(userId, sportId = 'football', difficultyLevelId = 'Beginner') {
    const sId = (sportId || 'football').toLowerCase();
    const lId = difficultyLevelId || 'Beginner';
    const key = `${userId}_${sId}_${lId}`;

    const baseTelemetry = this.resolveTelemetry(sId, lId);
    const databaseAvailable = prisma && await checkDatabaseConnection();
    let pillars = this.memoryStore.userPillarProgress[key] || [
      { pillarType: 'TECHNICAL_SKILL', pillarName: 'Technical Skill', value: baseTelemetry.technicalSkill.value, delta: baseTelemetry.technicalSkill.delta, targetValue: 100 },
      { pillarType: 'PHYSICAL_FITNESS', pillarName: 'Physical Fitness', value: baseTelemetry.physicalFitness.value, delta: baseTelemetry.physicalFitness.delta, targetValue: 100 },
      { pillarType: 'SPORT_IQ', pillarName: 'Sport IQ & Tactical', value: baseTelemetry.sportIQ.value, delta: baseTelemetry.sportIQ.delta, targetValue: 100 },
      { pillarType: 'TRAINING_CONSISTENCY', pillarName: 'Training Consistency', value: baseTelemetry.trainingConsistency.value, delta: baseTelemetry.trainingConsistency.delta, targetValue: 100 }
    ];

    if (databaseAvailable) {
      try {
        const records = await prisma.userPillarProgress.findMany({
          where: { userId, sportId: sId, difficultyLevelId: lId },
          orderBy: { pillarType: 'asc' }
        });
        pillars = records;
      } catch (err) {
        console.warn('Prisma getProgressTelemetry fallback:', err.message);
      }
    }

    const trajectory = await this.getTrajectoryRecords(userId, sId, lId);
    const assessmentResults = await this.getAssessmentHistory(userId, sId, lId);
    const completedAssessmentsCount = assessmentResults.filter(a => a.status === 'COMPLETED').length;

    const emptyPillar = { value: 0, delta: 0 };
    const technicalPillar = pillars.find(p => p.pillarType === 'TECHNICAL_SKILL') || (databaseAvailable ? emptyPillar : { value: baseTelemetry.technicalSkill.value, delta: baseTelemetry.technicalSkill.delta });
    const physicalPillar = pillars.find(p => p.pillarType === 'PHYSICAL_FITNESS') || (databaseAvailable ? emptyPillar : { value: baseTelemetry.physicalFitness.value, delta: baseTelemetry.physicalFitness.delta });
    const sportIqPillar = pillars.find(p => p.pillarType === 'SPORT_IQ') || (databaseAvailable ? emptyPillar : { value: baseTelemetry.sportIQ.value, delta: baseTelemetry.sportIQ.delta });
    const consistencyPillar = pillars.find(p => p.pillarType === 'TRAINING_CONSISTENCY') || (databaseAvailable ? emptyPillar : { value: baseTelemetry.trainingConsistency.value, delta: baseTelemetry.trainingConsistency.delta });
    const overallReadiness = databaseAvailable
      ? Math.round((technicalPillar.value + physicalPillar.value + sportIqPillar.value + consistencyPillar.value) / 4)
      : baseTelemetry.overallReadiness;

    return {
      sport: sId,
      level: lId,
      overallReadiness,
      targetReadiness: databaseAvailable ? 100 : baseTelemetry.targetReadiness,
      technicalSkill: { value: technicalPillar.value, delta: technicalPillar.delta },
      physicalFitness: { value: physicalPillar.value, delta: physicalPillar.delta },
      sportIQ: { value: sportIqPillar.value, delta: sportIqPillar.delta },
      trainingConsistency: { value: consistencyPillar.value, delta: consistencyPillar.delta },
      assessmentsCompleted: completedAssessmentsCount || baseTelemetry.assessmentsCompleted,
      assessmentsTotal: 4,
      cycleTrainingHours: baseTelemetry.cycleTrainingHours,
      biWeeklyTargetHours: baseTelemetry.biWeeklyTargetHours,
      pillars,
      trajectoryData: trajectory
    };
  }

  async updateProgressTelemetry(userId, sportId = 'football', difficultyLevelId = 'Beginner', progress = {}) {
    const sId = (sportId || 'football').toLowerCase();
    const lId = difficultyLevelId || 'Beginner';
    const definitions = [
      ['TECHNICAL_SKILL', 'Technical Skill', progress.technicalSkill],
      ['PHYSICAL_FITNESS', 'Physical Fitness', progress.physicalFitness],
      ['SPORT_IQ', 'Sport IQ & Tactical', progress.sportIQ],
      ['TRAINING_CONSISTENCY', 'Training Consistency', progress.trainingConsistency]
    ];
    const values = definitions.filter(([, , value]) => value !== undefined && value !== null);

    if (prisma && await checkDatabaseConnection()) {
      try {
        for (const [pillarType, pillarName, value] of values) {
          const normalized = typeof value === 'object' ? value : { value };
          await prisma.userPillarProgress.upsert({
            where: { user_sport_level_pillar_unique: { userId, sportId: sId, difficultyLevelId: lId, pillarType } },
            update: { value: Number(normalized.value), delta: Number(normalized.delta || 0), targetValue: Number(normalized.targetValue || 100) },
            create: { userId, sportId: sId, difficultyLevelId: lId, pillarType, pillarName, value: Number(normalized.value), delta: Number(normalized.delta || 0), targetValue: Number(normalized.targetValue || 100) }
          });
        }
        return this.getProgressTelemetry(userId, sId, lId);
      } catch (err) {
        console.warn('Prisma updateProgressTelemetry fallback:', err.message);
      }
    }

    const key = `${userId}_${sId}_${lId}`;
    const current = this.memoryStore.userPillarProgress[key] || [];
    values.forEach(([pillarType, pillarName, value]) => {
      const normalized = typeof value === 'object' ? value : { value };
      const updated = { pillarType, pillarName, value: Number(normalized.value), delta: Number(normalized.delta || 0), targetValue: Number(normalized.targetValue || 100) };
      const existing = current.find(pillar => pillar.pillarType === pillarType);
      if (existing) Object.assign(existing, updated);
      else current.push(updated);
    });
    this.memoryStore.userPillarProgress[key] = current;
    return this.getProgressTelemetry(userId, sId, lId);
  }

  async getTrajectoryRecords(userId, sportId = 'football', difficultyLevelId = 'Beginner') {
    const sId = (sportId || 'football').toLowerCase();
    const lId = difficultyLevelId || 'Beginner';
    const key = `${userId}_${sId}_${lId}`;

    if (prisma && await checkDatabaseConnection()) {
      try {
        return await prisma.performanceTrajectoryRecord.findMany({
          where: { userId, sportId: sId, difficultyLevelId: lId },
          orderBy: { cycleOrder: 'asc' }
        });
      } catch (err) {
        console.warn('Prisma getTrajectoryRecords fallback:', err.message);
      }
    }

    if (this.memoryStore.userTrajectoryRecords[key]) {
      return this.memoryStore.userTrajectoryRecords[key];
    }

    const telemetry = this.resolveTelemetry(sId, lId);
    const records = telemetry.trajectoryData.map((t, idx) => ({
      id: `traj_${key}_${idx}`,
      userId,
      sportId: sId,
      difficultyLevelId: lId,
      cycleOrder: idx + 1,
      label: t.label,
      recordedDate: t.date,
      score: t.score,
      isCurrent: !!t.isCurrent,
      isProjected: !!t.isProjected
    }));

    this.memoryStore.userTrajectoryRecords[key] = records;
    return records;
  }

  async createTrajectorySnapshot(userId, sportId, difficultyLevelId, { score, label = 'Assessment Snapshot', recordedDate }) {
    const sId = (sportId || 'football').toLowerCase();
    const lId = difficultyLevelId || 'Beginner';
    const key = `${userId}_${sId}_${lId}`;

    if (prisma && await checkDatabaseConnection()) {
      try {
        const previous = await prisma.performanceTrajectoryRecord.findMany({
          where: { userId, sportId: sId, difficultyLevelId: lId, isProjected: false }
        });
        await prisma.performanceTrajectoryRecord.updateMany({
          where: { userId, sportId: sId, difficultyLevelId: lId, isProjected: false },
          data: { isCurrent: false }
        });
        return await prisma.performanceTrajectoryRecord.create({
          data: {
            userId,
            sportId: sId,
            difficultyLevelId: lId,
            cycleOrder: previous.length + 1,
            label,
            recordedDate: recordedDate || new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
            score: Number(score),
            isCurrent: true,
            isProjected: false
          }
        });
      } catch (err) {
        console.warn('Prisma createTrajectorySnapshot fallback:', err.message);
      }
    }

    const records = await this.getTrajectoryRecords(userId, sId, lId);
    const dateLabel = recordedDate || new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

    const newRecord = {
      id: `traj_${key}_${Date.now()}`,
      userId,
      sportId: sId,
      difficultyLevelId: lId,
      cycleOrder: records.length + 1,
      label,
      recordedDate: dateLabel,
      score: Number(score),
      isCurrent: true,
      isProjected: false
    };

    // Mark previous current as not current
    records.forEach(r => { if (!r.isProjected) r.isCurrent = false; });
    records.push(newRecord);
    this.memoryStore.userTrajectoryRecords[key] = records;

    return newRecord;
  }

  // -------------------------------------------------------------
  // ASSESSMENTS (DYNAMIC BY USER + SPORT + DIFFICULTY)
  // -------------------------------------------------------------
  async getAllAssessments() {
    return this.memoryStore.assessments;
  }

  async getAssessmentHistory(userId, sportId = 'football', difficultyLevelId = 'Beginner') {
    const sId = (sportId || 'football').toLowerCase();
    const lId = difficultyLevelId || 'Beginner';
    const key = `${userId}_${sId}_${lId}`;

    if (prisma && await checkDatabaseConnection()) {
      try {
        const results = await prisma.userAssessmentResult.findMany({
          where: { userId, sportId: sId, difficultyLevelId: lId },
          include: { assessment: true, cycle: true },
          orderBy: { completedAt: 'asc' }
        });
        return results.map(result => ({
          id: result.id,
          assessmentId: result.assessmentId,
          slug: result.assessment.slug,
          title: result.assessment.title,
          category: result.assessment.category,
          status: result.status,
          score: result.score,
          completedAt: result.completedAt,
          cycleId: result.cycleId,
          cycle: result.cycle,
          breakdown: result.breakdown ? JSON.parse(result.breakdown) : null
        }));
      } catch (err) {
        console.warn('Prisma getAssessmentHistory fallback:', err.message);
      }
    }

    if (!this.memoryStore.userAssessmentResults[key]) {
      const telemetry = this.resolveTelemetry(sId, lId);
      this.memoryStore.userAssessmentResults[key] = [
        { assessmentId: 'skills', slug: 'skills', title: 'Skills Assessment', status: 'COMPLETED', score: telemetry.technicalSkill.value, completedAt: '2026-07-08T10:00:00Z' },
        { assessmentId: 'fitness', slug: 'fitness', title: 'Fitness Assessment', status: telemetry.assessmentsCompleted >= 2 ? 'COMPLETED' : 'PENDING', score: telemetry.physicalFitness.value, completedAt: '2026-07-12T14:00:00Z' },
        { assessmentId: 'knowledge', slug: 'knowledge', title: 'Knowledge Assessment', status: telemetry.assessmentsCompleted >= 3 ? 'COMPLETED' : 'PENDING', score: telemetry.sportIQ.value, completedAt: null },
        { assessmentId: 'performance', slug: 'performance', title: 'Performance Assessment', status: telemetry.assessmentsCompleted >= 4 ? 'COMPLETED' : 'PENDING', score: telemetry.overallReadiness, completedAt: null }
      ];
    }

    return this.memoryStore.userAssessmentResults[key];
  }

  async submitAssessment(userId, sportId, difficultyLevelId, assessmentSlug, { score, breakdown }) {
    const sId = (sportId || 'football').toLowerCase();
    const lId = difficultyLevelId || 'Beginner';
    const key = `${userId}_${sId}_${lId}`;

    if (prisma && await checkDatabaseConnection()) {
      try {
        const assessment = await prisma.assessment.findUnique({ where: { slug: assessmentSlug } });
        if (!assessment) throw new Error(`Assessment '${assessmentSlug}' not found`);
        const currentCycle = await prisma.assessmentCycle.findFirst({ where: { status: 'ACTIVE' }, orderBy: { cycleNumber: 'desc' } });
        const existing = await prisma.userAssessmentResult.findFirst({
          where: { userId, sportId: sId, difficultyLevelId: lId, assessmentId: assessment.id, cycleId: currentCycle?.id || null }
        });
        const data = {
          score: Number(score),
          status: 'COMPLETED',
          completedAt: new Date(),
          breakdown: breakdown ? JSON.stringify(breakdown) : null,
          cycleId: currentCycle?.id || null
        };
        const result = existing
          ? await prisma.userAssessmentResult.update({ where: { id: existing.id }, data, include: { assessment: true, cycle: true } })
          : await prisma.userAssessmentResult.create({ data: { userId, sportId: sId, difficultyLevelId: lId, assessmentId: assessment.id, ...data }, include: { assessment: true, cycle: true } });
        return {
          id: result.id,
          assessmentId: result.assessmentId,
          slug: result.assessment.slug,
          title: result.assessment.title,
          category: result.assessment.category,
          status: result.status,
          score: result.score,
          completedAt: result.completedAt,
          cycleId: result.cycleId,
          cycle: result.cycle,
          breakdown: result.breakdown ? JSON.parse(result.breakdown) : null
        };
      } catch (err) {
        console.warn('Prisma submitAssessment fallback:', err.message);
      }
    }

    const history = await this.getAssessmentHistory(userId, sId, lId);
    const existingIndex = history.findIndex(a => a.assessmentId === assessmentSlug || a.slug === assessmentSlug);

    const submission = {
      assessmentId: assessmentSlug,
      slug: assessmentSlug,
      title: `${assessmentSlug.charAt(0).toUpperCase() + assessmentSlug.slice(1)} Assessment`,
      status: 'COMPLETED',
      score: Number(score) || 75,
      completedAt: new Date().toISOString(),
      breakdown: breakdown || null
    };

    if (existingIndex >= 0) {
      history[existingIndex] = { ...history[existingIndex], ...submission };
    } else {
      history.push(submission);
    }

    this.memoryStore.userAssessmentResults[key] = history;
    return submission;
  }

  // -------------------------------------------------------------
  // ADMIN QUERIES & ANALYTICS (ADMIN ROLE ONLY)
  // -------------------------------------------------------------

  /**
   * Get all athletes with summary progression data for admin directory
   */
  async getAdminAthletesList({ search = '', sport = '', level = '' } = {}) {
    let athleteUsers = this.memoryStore.users.filter(u => u.role === 'ATHLETE');
    if (prisma && await checkDatabaseConnection()) {
      try {
        athleteUsers = await prisma.user.findMany({
          where: { role: 'ATHLETE' },
          orderBy: { updatedAt: 'desc' }
        });
      } catch (err) {
        console.warn('Prisma getAdminAthletesList fallback:', err.message);
      }
    }
    const results = [];

    for (const user of athleteUsers) {
      const activeProfile = await this.getActiveUserSportProfile(user.id);
      const sId = activeProfile?.sportId || 'football';
      const lId = activeProfile?.difficultyLevelId || 'Beginner';
      const telemetry = await this.getProgressTelemetry(user.id, sId, lId);
      const assessments = await this.getAssessmentHistory(user.id, sId, lId);

      const completedAssessments = assessments.filter(a => a.status === 'COMPLETED');
      const latestAssessment = completedAssessments.length > 0
        ? completedAssessments[completedAssessments.length - 1]
        : null;

      const traj = telemetry.trajectoryData || [];
      const currentTraj = traj.find(t => t.isCurrent) || traj[traj.length - 1] || { score: telemetry.overallReadiness };

      const athleteSummary = {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        avatar: activeProfile?.avatar || null,
        selectedSport: activeProfile?.sportName || sId.charAt(0).toUpperCase() + sId.slice(1),
        sportId: sId,
        difficultyLevel: activeProfile?.levelName || lId,
        difficultyLevelId: lId,
        position: activeProfile?.position || 'Athlete',
        location: activeProfile?.location || null,
        overallProgress: telemetry.overallReadiness,
        targetReadiness: telemetry.targetReadiness,
        latestAssessmentScore: latestAssessment?.score ?? telemetry.technicalSkill.value,
        latestPerformanceScore: currentTraj.score,
        assessmentsCompleted: telemetry.assessmentsCompleted,
        assessmentsTotal: 4,
        trainingHours: activeProfile?.trainingHours || null,
        joinedDate: user.createdAt ? new Date(user.createdAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : null,
        createdAt: user.createdAt
      };

      // Search and filters
      const matchSearch = !search || 
        user.name.toLowerCase().includes(search.toLowerCase()) || 
        user.email.toLowerCase().includes(search.toLowerCase());
      
      const matchSport = !sport || sport === 'all' || sId.toLowerCase() === sport.toLowerCase();
      const matchLevel = !level || level === 'all' || lId.toLowerCase() === level.toLowerCase();

      if (matchSearch && matchSport && matchLevel) {
        results.push(athleteSummary);
      }
    }

    return results;
  }

  /**
   * Get complete details of a specific athlete for Admin Inspector
   */
  async getAthleteDetailById(athleteId) {
    const user = await this.findUserById(athleteId);
    if (!user || user.role === 'ADMIN') {
      return null;
    }

    const activeProfile = await this.getActiveUserSportProfile(user.id);
    const sId = activeProfile.sportId || 'football';
    const lId = activeProfile.difficultyLevelId || 'Beginner';

    const telemetry = await this.getProgressTelemetry(user.id, sId, lId);
    const trajectory = await this.getTrajectoryRecords(user.id, sId, lId);
    const assessments = await this.getAssessmentHistory(user.id, sId, lId);

    return {
      athlete: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        createdAt: user.createdAt
      },
      profile: activeProfile,
      telemetry,
      trajectory,
      assessments
    };
  }

  /**
   * Get progress telemetry for a specific athlete
   */
  async getAthleteProgressById(athleteId, sport, level) {
    const user = await this.findUserById(athleteId);
    if (!user || user.role === 'ADMIN') {
      return null;
    }

    const sId = sport || 'football';
    const lId = level || 'Beginner';
    return this.getProgressTelemetry(athleteId, sId, lId);
  }

  /**
   * Get performance trajectory for a specific athlete
   */
  async getAthletePerformanceById(athleteId, sport, level) {
    const user = await this.findUserById(athleteId);
    if (!user || user.role === 'ADMIN') {
      return null;
    }

    const sId = sport || 'football';
    const lId = level || 'Beginner';
    return this.getTrajectoryRecords(athleteId, sId, lId);
  }

  /**
   * Get assessment history for a specific athlete
   */
  async getAthleteAssessmentsById(athleteId, sport, level) {
    const user = await this.findUserById(athleteId);
    if (!user || user.role === 'ADMIN') {
      return null;
    }

    const sId = sport || 'football';
    const lId = level || 'Beginner';
    return this.getAssessmentHistory(athleteId, sId, lId);
  }

  /**
   * Aggregate admin overview dashboard statistics
   */
  async getAdminDashboardSummary() {
    const athletes = await this.getAdminAthletesList();
    const totalAthletes = athletes.length;
    const activeAthletes = athletes.filter(a => a.overallProgress > 0).length;

    let totalReadiness = 0;
    let totalCompletedAssessments = 0;
    const sportCounts = {};

    athletes.forEach(a => {
      totalReadiness += a.overallProgress || 0;
      totalCompletedAssessments += a.assessmentsCompleted || 0;
      const s = a.selectedSport || 'Football';
      sportCounts[s] = (sportCounts[s] || 0) + 1;
    });

    const averageReadiness = totalAthletes > 0 ? Math.round(totalReadiness / totalAthletes) : 0;
    const assessmentCompletionRate = totalAthletes > 0 
      ? Math.round((totalCompletedAssessments / (totalAthletes * 4)) * 100) 
      : 0;

    return {
      stats: {
        totalAthletes,
        activeAthletes,
        averageReadiness,
        assessmentCompletionRate,
        totalAssessmentsTaken: totalCompletedAssessments
      },
      sportDistribution: sportCounts,
      recentAthletes: athletes.slice(0, 5)
    };
  }
}

export const dbService = new DatabaseService();
