/**
 * Athletex - Dynamic Progress & Performance Telemetry Data Engine
 * Computes dynamic metrics, bi-weekly assessment cycles, and trajectory charts
 * based on selected Sport and Difficulty Level.
 */

// Base profiles per sport and difficulty
const SPORT_BASE_PROFILES = {
  Football: {
    Beginner: {
      overall: 38,
      overallDelta: 5,
      target: 55,
      technical: { score: 40, delta: 4, label: 'Ball Control & Passing' },
      fitness: { score: 36, delta: 6, label: 'Cardio & Sprint Endurance' },
      knowledge: { score: 45, delta: -2, label: 'Positional Rules & Formations' },
      consistency: { score: 78, delta: 8, label: 'Session Attendance' },
      historicalScores: [20, 24, 29, 34, 38],
      projectedScores: [44, 52],
      loggedHours: 12,
      targetHours: 16,
      completedAssessments: 2,
      totalAssessments: 4
    },
    Intermediate: {
      overall: 66,
      overallDelta: 7,
      target: 80,
      technical: { score: 68, delta: 5, label: 'First-Touch & Dynamic Dribbling' },
      fitness: { score: 70, delta: 8, label: 'High-Intensity Interval Speed' },
      knowledge: { score: 62, delta: 3, label: 'Tactical Pressing & Spatial IQ' },
      consistency: { score: 86, delta: 6, label: 'Training Frequency' },
      historicalScores: [48, 52, 58, 61, 66],
      projectedScores: [72, 79],
      loggedHours: 22,
      targetHours: 24,
      completedAssessments: 3,
      totalAssessments: 4
    },
    Advanced: {
      overall: 88,
      overallDelta: 3,
      target: 95,
      technical: { score: 91, delta: 2, label: 'Precision Finishing & Vision' },
      fitness: { score: 89, delta: 4, label: 'VO2 Max & Explosive Agility' },
      knowledge: { score: 87, delta: 1, label: 'Match Reading & Game Management' },
      consistency: { score: 94, delta: 2, label: 'Elite Recovery & Regimen' },
      historicalScores: [75, 78, 82, 85, 88],
      projectedScores: [91, 95],
      loggedHours: 34,
      targetHours: 36,
      completedAssessments: 4,
      totalAssessments: 4
    }
  },
  Athletics: {
    Beginner: {
      overall: 34,
      overallDelta: 6,
      target: 50,
      technical: { score: 32, delta: 5, label: 'Sprint Mechanics & Drive Phase' },
      fitness: { score: 38, delta: 8, label: 'Aerobic Base & Core Strength' },
      knowledge: { score: 40, delta: 2, label: 'Pacing & Lane Discipline' },
      consistency: { score: 75, delta: 10, label: 'Weekly Track Attendance' },
      historicalScores: [18, 22, 26, 30, 34],
      projectedScores: [41, 48],
      loggedHours: 10,
      targetHours: 14,
      completedAssessments: 1,
      totalAssessments: 4
    },
    Intermediate: {
      overall: 68,
      overallDelta: 8,
      target: 82,
      technical: { score: 72, delta: 7, label: 'Stride Cadence & Transition' },
      fitness: { score: 74, delta: 9, label: 'Lactate Threshold & Power' },
      knowledge: { score: 60, delta: -3, label: 'Race Tactics & Wind Strategy' },
      consistency: { score: 88, delta: 7, label: 'Periodization Adherence' },
      historicalScores: [45, 50, 56, 62, 68],
      projectedScores: [75, 82],
      loggedHours: 24,
      targetHours: 26,
      completedAssessments: 3,
      totalAssessments: 4
    },
    Advanced: {
      overall: 90,
      overallDelta: 4,
      target: 96,
      technical: { score: 93, delta: 3, label: 'Block Clearance & Biomechanics' },
      fitness: { score: 92, delta: 5, label: 'Peak Force Production' },
      knowledge: { score: 86, delta: 2, label: 'National Qualifying Standards' },
      consistency: { score: 96, delta: 3, label: 'Strict Regime & Rest' },
      historicalScores: [76, 80, 84, 87, 90],
      projectedScores: [93, 96],
      loggedHours: 36,
      targetHours: 38,
      completedAssessments: 4,
      totalAssessments: 4
    }
  },
  Basketball: {
    Beginner: {
      overall: 36,
      overallDelta: 4,
      target: 52,
      technical: { score: 38, delta: 3, label: 'Shooting Form & Ball Handling' },
      fitness: { score: 34, delta: 5, label: 'Lateral Quickness & Stamina' },
      knowledge: { score: 42, delta: 2, label: 'Court Geometry & Violations' },
      consistency: { score: 76, delta: 6, label: 'Court Drills Routine' },
      historicalScores: [19, 23, 27, 32, 36],
      projectedScores: [43, 50],
      loggedHours: 12,
      targetHours: 16,
      completedAssessments: 2,
      totalAssessments: 4
    },
    Intermediate: {
      overall: 65,
      overallDelta: 6,
      target: 78,
      technical: { score: 67, delta: 6, label: 'Pull-Up Jumpers & Passing Lanes' },
      fitness: { score: 68, delta: 7, label: 'Vertical Leap & Fast-Break Stamina' },
      knowledge: { score: 64, delta: -2, label: 'Pick & Roll Schemes' },
      consistency: { score: 84, delta: 8, label: 'Shooting Volume Log' },
      historicalScores: [46, 51, 55, 60, 65],
      projectedScores: [71, 78],
      loggedHours: 20,
      targetHours: 24,
      completedAssessments: 2,
      totalAssessments: 4
    },
    Advanced: {
      overall: 87,
      overallDelta: 3,
      target: 94,
      technical: { score: 90, delta: 3, label: 'Contested Shotmaking & Handles' },
      fitness: { score: 88, delta: 4, label: 'Explosive First Step & Core' },
      knowledge: { score: 89, delta: 2, label: 'Defensive Rotations & Scouting' },
      consistency: { score: 92, delta: 3, label: 'Court Time & Recovery' },
      historicalScores: [74, 77, 81, 84, 87],
      projectedScores: [90, 94],
      loggedHours: 32,
      targetHours: 35,
      completedAssessments: 4,
      totalAssessments: 4
    }
  },
  Cricket: {
    Beginner: {
      overall: 35,
      overallDelta: 5,
      target: 50,
      technical: { score: 37, delta: 4, label: 'Batting Stance & Straight Drive' },
      fitness: { score: 33, delta: 6, label: 'Running Between Wickets' },
      knowledge: { score: 46, delta: 3, label: 'LBW & Fielding Positions' },
      consistency: { score: 74, delta: 7, label: 'Net Session Hours' },
      historicalScores: [18, 22, 27, 31, 35],
      projectedScores: [42, 49],
      loggedHours: 11,
      targetHours: 15,
      completedAssessments: 1,
      totalAssessments: 4
    },
    Intermediate: {
      overall: 64,
      overallDelta: 5,
      target: 77,
      technical: { score: 66, delta: 6, label: 'Seam / Spin Bowling Line' },
      fitness: { score: 65, delta: 5, label: 'Core Stability & Shoulder Power' },
      knowledge: { score: 68, delta: 4, label: 'Field Placements & Pitch Reading' },
      consistency: { score: 85, delta: 6, label: 'Weekend Match Play' },
      historicalScores: [44, 49, 54, 59, 64],
      projectedScores: [70, 77],
      loggedHours: 21,
      targetHours: 24,
      completedAssessments: 3,
      totalAssessments: 4
    },
    Advanced: {
      overall: 86,
      overallDelta: 3,
      target: 93,
      technical: { score: 89, delta: 3, label: 'Shot Selection Under Pressure' },
      fitness: { score: 85, delta: 4, label: 'High-Speed Sprinting & Agility' },
      knowledge: { score: 91, delta: 2, label: 'Opposition Analysis & Bowling Plans' },
      consistency: { score: 93, delta: 2, label: 'Pre-Match Warmups' },
      historicalScores: [73, 76, 80, 83, 86],
      projectedScores: [89, 93],
      loggedHours: 30,
      targetHours: 34,
      completedAssessments: 4,
      totalAssessments: 4
    }
  },
  Volleyball: {
    Beginner: {
      overall: 33,
      overallDelta: 4,
      target: 48,
      technical: { score: 35, delta: 4, label: 'Underhand Pass & Setting' },
      fitness: { score: 32, delta: 5, label: 'Jump Height & Quick Footwork' },
      knowledge: { score: 44, delta: -1, label: 'Rotations & Net Touch Rules' },
      consistency: { score: 72, delta: 6, label: 'Practice Drills' },
      historicalScores: [17, 21, 25, 29, 33],
      projectedScores: [40, 47],
      loggedHours: 10,
      targetHours: 14,
      completedAssessments: 1,
      totalAssessments: 4
    },
    Intermediate: {
      overall: 63,
      overallDelta: 6,
      target: 76,
      technical: { score: 65, delta: 5, label: 'Spike Timing & Defensive Digs' },
      fitness: { score: 67, delta: 7, label: 'Vertical Jump Conditioning' },
      knowledge: { score: 62, delta: 3, label: 'Block Formations & Coverage' },
      consistency: { score: 83, delta: 7, label: 'Weekly Scrimmages' },
      historicalScores: [43, 48, 53, 58, 63],
      projectedScores: [69, 76],
      loggedHours: 19,
      targetHours: 22,
      completedAssessments: 2,
      totalAssessments: 4
    },
    Advanced: {
      overall: 85,
      overallDelta: 3,
      target: 92,
      technical: { score: 88, delta: 3, label: 'Jump Serve & Line Attacks' },
      fitness: { score: 87, delta: 4, label: 'Explosive Power & Shoulder Health' },
      knowledge: { score: 86, delta: 2, label: 'Quick Sets & Defensive Schemes' },
      consistency: { score: 91, delta: 2, label: 'Match Prep Discipline' },
      historicalScores: [72, 75, 79, 82, 85],
      projectedScores: [88, 92],
      loggedHours: 29,
      targetHours: 32,
      completedAssessments: 4,
      totalAssessments: 4
    }
  },
  Badminton: {
    Beginner: {
      overall: 36,
      overallDelta: 5,
      target: 52,
      technical: { score: 37, delta: 4, label: 'Grip Control & Basic Clears' },
      fitness: { score: 35, delta: 6, label: 'Lateral Court Footwork' },
      knowledge: { score: 43, delta: 2, label: 'Service Faults & Boundaries' },
      consistency: { score: 76, delta: 8, label: 'Shuttle Time Attendance' },
      historicalScores: [18, 22, 26, 31, 36],
      projectedScores: [43, 50],
      loggedHours: 11,
      targetHours: 15,
      completedAssessments: 2,
      totalAssessments: 4
    },
    Intermediate: {
      overall: 67,
      overallDelta: 7,
      target: 80,
      technical: { score: 70, delta: 6, label: 'Cross-Court Smashes & Drops' },
      fitness: { score: 71, delta: 8, label: 'Reflex Speed & Anaerobic Burst' },
      knowledge: { score: 65, delta: 3, label: 'Doubles Rotation & Tactics' },
      consistency: { score: 87, delta: 6, label: 'Racket Drill Log' },
      historicalScores: [47, 52, 57, 62, 67],
      projectedScores: [73, 80],
      loggedHours: 21,
      targetHours: 24,
      completedAssessments: 3,
      totalAssessments: 4
    },
    Advanced: {
      overall: 89,
      overallDelta: 3,
      target: 95,
      technical: { score: 92, delta: 3, label: 'Deceptive Net Shots & Drives' },
      fitness: { score: 90, delta: 4, label: 'Rapid Recovery & Reaction Time' },
      knowledge: { score: 88, delta: 1, label: 'Rally Management & Pacing' },
      consistency: { score: 95, delta: 2, label: 'Elite On-Court Reps' },
      historicalScores: [75, 79, 83, 86, 89],
      projectedScores: [92, 95],
      loggedHours: 33,
      targetHours: 36,
      completedAssessments: 4,
      totalAssessments: 4
    }
  },
  Tennis: {
    Beginner: {
      overall: 35,
      overallDelta: 4,
      target: 50,
      technical: { score: 36, delta: 4, label: 'Forehand Grip & Baseline Rally' },
      fitness: { score: 34, delta: 5, label: 'Baseline Endurance & Stamina' },
      knowledge: { score: 45, delta: -1, label: 'Scoring Rules & Tiebreaks' },
      consistency: { score: 74, delta: 7, label: 'Weekly Court Sessions' },
      historicalScores: [19, 23, 27, 31, 35],
      projectedScores: [42, 49],
      loggedHours: 11,
      targetHours: 15,
      completedAssessments: 1,
      totalAssessments: 4
    },
    Intermediate: {
      overall: 66,
      overallDelta: 6,
      target: 79,
      technical: { score: 69, delta: 6, label: 'Top-spin Backhand & Volleys' },
      fitness: { score: 68, delta: 7, label: 'Split-Step Agility & Recovery' },
      knowledge: { score: 64, delta: 3, label: 'Serve Placement Strategies' },
      consistency: { score: 85, delta: 7, label: 'Practice Sets' },
      historicalScores: [46, 51, 56, 61, 66],
      projectedScores: [72, 79],
      loggedHours: 21,
      targetHours: 24,
      completedAssessments: 3,
      totalAssessments: 4
    },
    Advanced: {
      overall: 88,
      overallDelta: 3,
      target: 94,
      technical: { score: 91, delta: 3, label: 'Kick Serves & Approach Shots' },
      fitness: { score: 89, delta: 4, label: 'Multi-Set Endurance & Core' },
      knowledge: { score: 89, delta: 2, label: 'Pattern Play & Opponent Weakness' },
      consistency: { score: 94, delta: 2, label: 'Tour Match Preparation' },
      historicalScores: [74, 78, 82, 85, 88],
      projectedScores: [91, 94],
      loggedHours: 32,
      targetHours: 35,
      completedAssessments: 4,
      totalAssessments: 4
    }
  }
};

// Generic fallback for any other sport
const DEFAULT_SPORT_PROFILE = {
  Beginner: {
    overall: 35,
    overallDelta: 5,
    target: 50,
    technical: { score: 37, delta: 4, label: 'Technical Execution' },
    fitness: { score: 35, delta: 6, label: 'Physical Conditioning' },
    knowledge: { score: 42, delta: 1, label: 'Rules & Spatial Sense' },
    consistency: { score: 75, delta: 8, label: 'Session Attendance' },
    historicalScores: [18, 22, 26, 31, 35],
    projectedScores: [42, 49],
    loggedHours: 12,
    targetHours: 16,
    completedAssessments: 2,
    totalAssessments: 4
  },
  Intermediate: {
    overall: 65,
    overallDelta: 6,
    target: 78,
    technical: { score: 68, delta: 5, label: 'Intermediate Mechanics' },
    fitness: { score: 69, delta: 7, label: 'Stamina & Agility' },
    knowledge: { score: 63, delta: 3, label: 'Match Strategy' },
    consistency: { score: 85, delta: 6, label: 'Training Regularity' },
    historicalScores: [45, 50, 55, 60, 65],
    projectedScores: [71, 78],
    loggedHours: 20,
    targetHours: 24,
    completedAssessments: 3,
    totalAssessments: 4
  },
  Advanced: {
    overall: 87,
    overallDelta: 3,
    target: 94,
    technical: { score: 90, delta: 3, label: 'High-Level Mastery' },
    fitness: { score: 88, delta: 4, label: 'Peak Physical Power' },
    knowledge: { score: 88, delta: 2, label: 'Advanced Tactical IQ' },
    consistency: { score: 93, delta: 2, label: 'Rigorous Regime' },
    historicalScores: [74, 77, 81, 84, 87],
    projectedScores: [90, 94],
    loggedHours: 32,
    targetHours: 36,
    completedAssessments: 4,
    totalAssessments: 4
  }
};

/**
 * Bi-weekly assessment cycle labels & date timeline
 */
export const BIWEEKLY_CYCLES = [
  { id: 'c1', label: 'Cycle 1', dateRange: 'May 8 – May 21', dateShort: 'May 8', type: 'historical' },
  { id: 'c2', label: 'Cycle 2', dateRange: 'May 22 – Jun 4', dateShort: 'May 22', type: 'historical' },
  { id: 'c3', label: 'Cycle 3', dateRange: 'Jun 5 – Jun 18', dateShort: 'Jun 5', type: 'historical' },
  { id: 'c4', label: 'Cycle 4', dateRange: 'Jun 19 – Jul 2', dateShort: 'Jun 19', type: 'historical' },
  { id: 'c5', label: 'Cycle 5', dateRange: 'Jul 3 – Jul 16', dateShort: 'Jul 3 (Current)', type: 'current' },
  { id: 'c6', label: 'Cycle 6', dateRange: 'Jul 17 – Jul 30', dateShort: 'Jul 17 (Proj)', type: 'projected' },
  { id: 'c7', label: 'Cycle 7', dateRange: 'Jul 31 – Aug 13', dateShort: 'Jul 31 (Proj)', type: 'projected' },
];

/**
 * Retrieve comprehensive, calculated progress telemetry data for a specific sport and difficulty
 */
export const getProgressTelemetry = (sportName = 'Football', level = 'Beginner') => {
  const sportKey = Object.keys(SPORT_BASE_PROFILES).find(
    s => s.toLowerCase() === (sportName || '').toLowerCase()
  ) || 'Football';

  const levelKey = ['Beginner', 'Intermediate', 'Advanced'].find(
    l => l.toLowerCase() === (level || '').toLowerCase()
  ) || 'Beginner';

  const sportData = SPORT_BASE_PROFILES[sportKey] || DEFAULT_SPORT_PROFILE;
  const config = sportData[levelKey] || DEFAULT_SPORT_PROFILE[levelKey];

  // Construct chart series
  const trajectoryPoints = [
    { ...BIWEEKLY_CYCLES[0], score: config.historicalScores[0], status: 'Historical' },
    { ...BIWEEKLY_CYCLES[1], score: config.historicalScores[1], status: 'Historical' },
    { ...BIWEEKLY_CYCLES[2], score: config.historicalScores[2], status: 'Historical' },
    { ...BIWEEKLY_CYCLES[3], score: config.historicalScores[3], status: 'Historical' },
    { ...BIWEEKLY_CYCLES[4], score: config.historicalScores[4], status: 'Current Score' },
    { ...BIWEEKLY_CYCLES[5], score: config.projectedScores[0], status: 'Projected' },
    { ...BIWEEKLY_CYCLES[6], score: config.projectedScores[1], status: 'Projected' },
  ];

  return {
    sport: sportKey,
    level: levelKey,
    assessmentCycle: 'Every 2 Weeks',
    overallReadiness: config.overall,
    overallDelta: config.overallDelta,
    targetReadiness: config.target,
    
    pillars: [
      {
        id: 'technical',
        label: 'Technical Skill Progress',
        value: config.technical.score,
        delta: config.technical.delta,
        focus: config.technical.label,
        color: 'emerald'
      },
      {
        id: 'fitness',
        label: 'Physical Fitness Progress',
        value: config.fitness.score,
        delta: config.fitness.delta,
        focus: config.fitness.label,
        color: 'volt'
      },
      {
        id: 'knowledge',
        label: 'Sport IQ & Knowledge',
        value: config.knowledge.score,
        delta: config.knowledge.delta,
        focus: config.knowledge.label,
        color: 'amber'
      },
      {
        id: 'consistency',
        label: 'Training Consistency',
        value: config.consistency.score,
        delta: config.consistency.delta,
        focus: config.consistency.label,
        color: 'brand'
      }
    ],

    trajectory: trajectoryPoints,

    assessmentSummary: {
      completed: config.completedAssessments,
      total: config.totalAssessments,
      cyclePeriod: 'Jul 3 – Jul 16, 2026',
      nextAssessmentDate: 'Jul 17, 2026',
      cycleStatus: 'Active Evaluation',
      frequency: 'Every 2 Weeks',
      daysRemaining: 4
    },

    trainingSummary: {
      loggedHours: config.loggedHours,
      targetHours: config.targetHours,
      cyclePeriod: 'This Cycle (Jul 3 – Jul 16)',
      statusText: 'On track for bi-weekly goal',
      frequency: 'Bi-weekly (2-week cycle)'
    }
  };
};
