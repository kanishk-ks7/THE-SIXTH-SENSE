/**
 * SportPath AI - Central Mock Data Store
 * Designed for clean teammate module extension and prototype demonstration.
 */

export const SPORTS_LIST = [
  {
    id: 'football',
    name: 'Football',
    icon: 'Activity',
    color: '#10B981',
    description: 'Passing, dribbling, tactical awareness, physical endurance, and teamwork.',
    popularPositions: ['Forward', 'Midfielder', 'Defender', 'Goalkeeper']
  },
  {
    id: 'cricket',
    name: 'Cricket',
    icon: 'Target',
    color: '#F59E0B',
    description: 'Batting technique, bowling precision, fielding agility, and match strategy.',
    popularPositions: ['Batsman', 'Bowler', 'All-Rounder', 'Wicket Keeper']
  },
  {
    id: 'basketball',
    name: 'Basketball',
    icon: 'Dribbble',
    color: '#F97316',
    description: 'Shooting mechanics, ball handling, defensive footwork, and spatial game sense.',
    popularPositions: ['Point Guard', 'Shooting Guard', 'Forward', 'Center']
  },
  {
    id: 'athletics',
    name: 'Athletics',
    icon: 'Zap',
    color: '#EF4444',
    description: 'Sprint mechanics, pacing strategy, explosive power, and recovery discipline.',
    popularPositions: ['100m/200m Sprint', 'Middle Distance', 'Long Jump', 'Relay']
  },
  {
    id: 'volleyball',
    name: 'Volleyball',
    icon: 'Flame',
    color: '#8B5CF6',
    description: 'Spiking, setting, defensive digs, vertical leap, and court communication.',
    popularPositions: ['Setter', 'Outside Hitter', 'Libero', 'Middle Blocker']
  },
  {
    id: 'badminton',
    name: 'Badminton',
    icon: 'Wind',
    color: '#06B6D4',
    description: 'Smash speed, footwork agility, net play, reaction time, and deception.',
    popularPositions: ['Singles Specialist', 'Doubles Attacker', 'Mixed Doubles']
  },
  {
    id: 'tennis',
    name: 'Tennis',
    icon: 'CircleDot',
    color: '#84CC16',
    description: 'Forehand/backhand power, serve precision, stamina, and baseline endurance.',
    popularPositions: ['Singles', 'Doubles']
  },
  {
    id: 'other',
    name: 'Other Sport',
    icon: 'Trophy',
    color: '#94A3B8',
    description: 'Multi-disciplinary athletic growth and structured development.',
    popularPositions: ['Athlete']
  }
];

export const DEFAULT_DEMO_ATHLETE = {
  name: 'Alex',
  age: 17,
  location: 'Manchester, UK',
  sport: 'Football',
  level: 'Beginner',
  trainingHours: '4 hours/week',
  trainingHoursNumber: 4,
  goal: 'Improve performance',
  readiness: 35,
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80',
  bio: 'Passionate aspiring footballer striving to build strong technical fundamentals, agility, and tactical vision for high-school and academy selection.',
  sportsBackground: 'School varsity team player for 2 seasons. Community tournament participant with 3 years of recreational play.',
  joinedDate: 'August 2026',
  strengths: ['Ball Control', 'Agility', 'Determination'],
  focusAreas: ['Tactical Positioning', 'Stamina', 'Weak-foot shooting']
};

export const ONBOARDING_LEVELS = [
  {
    id: 'Beginner',
    label: 'Beginner',
    tagline: 'Learning fundamentals & building habits',
    desc: 'Practicing for under 1-2 years or just starting structured sports training.'
  },
  {
    id: 'Intermediate',
    label: 'Intermediate',
    tagline: 'Refining skills & playing competitively',
    desc: 'Regular player in school, club, or district level with solid basic foundation.'
  },
  {
    id: 'Advanced',
    label: 'Advanced',
    tagline: 'Elite training & selection trials',
    desc: 'Competing at state/national levels or actively aiming for professional sports drafts.'
  }
];

export const ONBOARDING_GOALS = [
  { id: 'Learn the sport', title: 'Learn the sport', desc: 'Master the rules, positions, and core fundamental techniques.' },
  { id: 'Improve performance', title: 'Improve performance', desc: 'Elevate physical conditioning, consistency, and game statistics.' },
  { id: 'Participate in competitions', title: 'Participate in competitions', desc: 'Gain match experience in local tournaments and competitive leagues.' },
  { id: 'Get selected', title: 'Get selected', desc: 'Prepare specifically for academy, school team, or regional trials.' },
  { id: 'Pursue professional career', title: 'Pursue professional career', desc: 'Execute high-level developmental roadmap for pro athlete pathways.' }
];

export const ROADMAP_MILESTONES = [
  {
    id: 1,
    title: 'Profile Genesis',
    subtitle: 'Account setup & sport selection',
    status: 'completed', // 'completed' | 'in-progress' | 'locked'
    stage: 'START',
    icon: 'UserCheck',
    description: 'Basic athlete metrics, sport selection, and primary aspirations initialized.',
    progress: 100
  },
  {
    id: 2,
    title: 'Initial Assessment',
    subtitle: 'Evaluate 4 pillars of performance',
    status: 'in-progress',
    stage: 'Assessment',
    icon: 'ClipboardCheck',
    description: 'Complete skills, fitness, sports IQ, and match readiness evaluations.',
    progress: 25,
    isCurrentStep: true
  },
  {
    id: 3,
    title: 'Foundation Building',
    subtitle: 'Core mechanical & conditioning drills',
    status: 'locked',
    stage: 'Foundation',
    icon: 'Layers',
    description: 'Establish consistent training frequency and correct bio-mechanical form.',
    progress: 0
  },
  {
    id: 4,
    title: 'Skill Development',
    subtitle: 'Position-specific mastery',
    status: 'locked',
    stage: 'Skill Development',
    icon: 'Crosshair',
    description: 'Master advanced ball handling, precision execution, and reaction speed.',
    progress: 0
  },
  {
    id: 5,
    title: 'High-Performance Training',
    subtitle: 'Structured regimen & periodization',
    status: 'locked',
    stage: 'Training',
    icon: 'Dumbbell',
    description: 'Integrate endurance stamina, injury prevention, and tactical video study.',
    progress: 0
  },
  {
    id: 6,
    title: 'Local & District Competition',
    subtitle: 'Live match execution & scouting',
    status: 'locked',
    stage: 'Local Competition',
    icon: 'Trophy',
    description: 'Test skills under real competitive pressure in certified local brackets.',
    progress: 0
  },
  {
    id: 7,
    title: 'Advanced Selection Trials',
    subtitle: 'Regional showcase & trials',
    status: 'locked',
    stage: 'Advanced Competition',
    icon: 'Award',
    description: 'Participate in scouted trials for state, academy, or varsity squads.',
    progress: 0
  },
  {
    id: 8,
    title: 'Career Pathway & Scouting',
    subtitle: 'Elite representation & contracts',
    status: 'locked',
    stage: 'Career Development',
    icon: 'Compass',
    description: 'Unlock professional pathway analytics, scouting connections, and sponsorships.',
    progress: 0
  }
];

export const ASSESSMENT_MODULES = [
  {
    id: 'skills',
    title: 'Skills Assessment',
    category: 'Technical Ability',
    description: 'Evaluate technical dexterity, precision, ball handling, and sport-specific mechanics.',
    estimatedTime: '10 mins',
    badge: 'Technical',
    status: 'Pending',
    items: ['Ball Control / Dribbling', 'Passing Accuracy', 'Shooting Mechanics', 'First Touch']
  },
  {
    id: 'fitness',
    title: 'Fitness Assessment',
    category: 'Physical Readiness',
    description: 'Evaluate aerobic endurance, explosive agility, core stability, and sprint velocity.',
    estimatedTime: '15 mins',
    badge: 'Physical',
    status: 'Pending',
    items: ['Aerobic Capacity (Beep Test)', '20m Sprint Velocity', 'Agility T-Test', 'Core & Plank Test']
  },
  {
    id: 'knowledge',
    title: 'Knowledge Assessment',
    category: 'Sport IQ & Rules',
    description: 'Evaluate understanding of game strategy, defensive schemes, positioning, and refereeing rules.',
    estimatedTime: '8 mins',
    badge: 'Tactical',
    status: 'Pending',
    items: ['Tactical Formations', 'Offside & Game Rules', 'Defensive Transition', 'Set Piece Strategy']
  },
  {
    id: 'performance',
    title: 'Performance Assessment',
    category: 'Match Execution',
    description: 'Evaluate real game performance, consistency under pressure, and decision-making speed.',
    estimatedTime: '12 mins',
    badge: 'Execution',
    status: 'Pending',
    items: ['Decision Speed', 'Mental Resilience', 'Match Impact Score', 'Consistency Index']
  }
];

export const LEARN_CATEGORIES = [
  { id: 'all', label: 'All Topics' },
  { id: 'fundamentals', label: 'Fundamentals' },
  { id: 'rules', label: 'Rules' },
  { id: 'techniques', label: 'Techniques' },
  { id: 'strategy', label: 'Strategy' },
  { id: 'advanced', label: 'Advanced Skills' }
];

export const LEARN_RESOURCES = [
  {
    id: 'lr-1',
    title: 'Football Fundamentals & Pitch Positioning',
    category: 'fundamentals',
    categoryLabel: 'Fundamentals',
    sport: 'Football',
    level: 'Beginner',
    duration: '12 mins',
    author: 'Coach Miller (UEFA B)',
    description: 'Learn the foundational principles of field layout, player roles, spatial movement, and communication.',
    topics: ['Pitch Anatomy', 'Role Responsibilities', 'Passing Lanes']
  },
  {
    id: 'lr-2',
    title: 'The Comprehensive Guide to Match Rules & Offsides',
    category: 'rules',
    categoryLabel: 'Rules',
    sport: 'Football',
    level: 'Beginner',
    duration: '8 mins',
    author: 'Ref Academy',
    description: 'Clear breakdown of modern football regulations, foul classifications, VAR protocols, and offside geometry.',
    topics: ['Offside Rule', 'Fouls & Cards', 'Restart Scenarios']
  },
  {
    id: 'lr-3',
    title: 'First-Touch Mastery & Cushion Receiving',
    category: 'techniques',
    categoryLabel: 'Techniques',
    sport: 'Football',
    level: 'Intermediate',
    duration: '15 mins',
    author: 'ProSkills Lab',
    description: 'Drills to absorb ground and aerial passes into open space away from incoming pressure.',
    topics: ['Inside Foot Receiving', 'Body Orientation', 'Chest Trap']
  },
  {
    id: 'lr-4',
    title: 'Defensive Pressing & Counter-Attack Geometry',
    category: 'strategy',
    categoryLabel: 'Strategy',
    sport: 'Football',
    level: 'Intermediate',
    duration: '18 mins',
    author: 'TacticsHQ',
    description: 'Learn how to synchronize with teammates to force turnovers and execute rapid vertical counter-attacks.',
    topics: ['Zonal Pressing', 'Transition Triggers', 'Width vs Depth']
  },
  {
    id: 'lr-5',
    title: 'Advanced Weak-Foot Strike & Curled Finishing',
    category: 'advanced',
    categoryLabel: 'Advanced Skills',
    sport: 'Football',
    level: 'Advanced',
    duration: '20 mins',
    author: 'Elite Striker Lab',
    description: 'Master shooting biomechanics, instep curl, and lethal finishing with your non-dominant foot.',
    topics: ['Shooting Biomechanics', 'Dip & Swerve', '1-on-1 Composure']
  }
];

export const TRAINING_DRILLS = [
  {
    id: 'td-1',
    title: 'Agility Ladder & Quick Footwork Drill',
    category: "Today's Training",
    difficulty: 'Beginner drill',
    duration: '15 minutes',
    focus: 'Agility & Coordination',
    calories: '120 kcal',
    description: 'Improve rapid foot turnover, deceleration control, and quick directional changes on the pitch.',
    equipment: ['Speed Ladder', 'Cones']
  },
  {
    id: 'td-2',
    title: 'Cone Weaving & Tight Ball Control',
    category: "Today's Training",
    difficulty: 'Beginner drill',
    duration: '20 minutes',
    focus: 'Dribbling & Touch',
    calories: '150 kcal',
    description: 'Sharpen close-control dribbling using inside/outside foot cuts around staggered marker cones.',
    equipment: ['6 Cones', 'Size 5 Football']
  },
  {
    id: 'td-3',
    title: 'Interval Sprint & Recovery Conditioning',
    category: 'Weekly Training',
    difficulty: 'Intermediate drill',
    duration: '25 minutes',
    focus: 'Cardiovascular Stamina',
    calories: '240 kcal',
    description: 'High-intensity sprint bursts simulating match counter-attacks and rapid recovery jog intervals.',
    equipment: ['Stopwatch', 'Open Field']
  },
  {
    id: 'td-4',
    title: 'Wall Passing & Fast Rebound Volleys',
    category: 'Recommended Drills',
    difficulty: 'All Levels',
    duration: '15 minutes',
    focus: 'First Touch Reflex',
    calories: '110 kcal',
    description: 'One-touch and two-touch rapid pass returns against a rebounder board or wall.',
    equipment: ['Rebounder / Wall', 'Football']
  }
];

export const COMPETITION_EVENTS = [
  {
    id: 'evt-1',
    name: 'Metropolitan Youth Championship 2026',
    type: 'Upcoming Events',
    sport: 'Football',
    location: 'Central Regional Stadium',
    date: 'Oct 14 - Oct 18, 2026',
    level: 'Beginner / Intermediate',
    status: 'Registration Open',
    eligibility: 'U-19 / Open Entry',
    organizer: 'State Sports Authority',
    isSaved: false
  },
  {
    id: 'evt-2',
    name: 'National Talent Hunt & Selection Trials',
    type: 'Selection Trials',
    sport: 'Football',
    location: 'Elite Sports Complex',
    date: 'Nov 02 - Nov 04, 2026',
    level: 'Intermediate / Advanced',
    status: 'Applications Verified',
    eligibility: 'Age 15-20 / Verified Stats',
    organizer: 'National Federation Scouts',
    isSaved: true
  },
  {
    id: 'evt-3',
    name: 'District Inter-Club Autumn Cup',
    type: 'Competitions',
    sport: 'Football',
    location: 'Civic Sports Grounds',
    date: 'Nov 20 - Nov 25, 2026',
    level: 'All Levels',
    status: 'Registration Open',
    eligibility: 'Club Affiliated',
    organizer: 'District Football Board',
    isSaved: false
  },
  {
    id: 'evt-4',
    name: 'Rising Star 7v7 Grassroots Tournament',
    type: 'Upcoming Events',
    sport: 'Football',
    location: 'Westside Arena',
    date: 'Dec 05 - Dec 06, 2026',
    level: 'Beginner',
    status: 'Early Bird',
    eligibility: 'Open Division',
    organizer: 'Grassroots Sports Hub',
    isSaved: false
  }
];

export const PROGRESS_METRICS = {
  overallScore: 35,
  skillScore: 40,
  fitnessScore: 35,
  knowledgeScore: 45,
  consistencyStreak: 4, // days
  totalTrainingHours: 16,
  weeklyTargetHours: 4,
  assessmentsCompleted: 1,
  chartData: [
    { week: 'W1', score: 20 },
    { week: 'W2', score: 25 },
    { week: 'W3', score: 30 },
    { week: 'W4', score: 35 }
  ]
};
