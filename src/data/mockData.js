/**
 * Athletex - Central Mock Data Store
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
  id: 'demo-user-1',
  userId: 'demo-user-1',
  name: 'Alex Johnson',
  email: 'alex.athlete@athletex.ai',
  phone: '+44 7911 123456',
  gender: 'Male',
  age: 17,
  location: 'Manchester, UK',
  sport: 'Football',
  position: 'Forward / Winger',
  level: 'Beginner',
  height: '178 cm',
  weight: '68 kg',
  personalBest: '100m Sprint: 11.8s • 14 Goals Season',
  preferredTrainingDays: ['Monday', 'Wednesday', 'Friday', 'Saturday'],
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

export const AVATAR_PRESETS = [
  { id: 'av-1', label: 'Default Athlete', url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80' },
  { id: 'av-2', label: 'Striker', url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80' },
  { id: 'av-3', label: 'Sprinter', url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&auto=format&fit=crop&q=80' },
  { id: 'av-4', label: 'Champion', url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&auto=format&fit=crop&q=80' },
  { id: 'av-5', label: 'Court Master', url: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=300&auto=format&fit=crop&q=80' },
  { id: 'av-6', label: 'Pro Player', url: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=300&auto=format&fit=crop&q=80' }
];

export const SPORT_POSITIONS_MAP = {
  Football: ['Forward / Winger', 'Striker', 'Midfielder', 'Central Defensive Mid', 'Full Back', 'Center Back', 'Goalkeeper'],
  Cricket: ['Top-Order Batsman', 'Middle-Order Batsman', 'Fast Bowler', 'Spin Bowler', 'All-Rounder', 'Wicket-Keeper Batsman'],
  Basketball: ['Point Guard (PG)', 'Shooting Guard (SG)', 'Small Forward (SF)', 'Power Forward (PF)', 'Center (C)'],
  Athletics: ['100m / 200m Sprint', '400m / 800m Middle Distance', '1500m / 5000m Long Distance', 'Hurdles', 'Long Jump / Triple Jump', 'High Jump', 'Relay Specialist'],
  Volleyball: ['Outside Hitter', 'Opposite Hitter', 'Setter', 'Middle Blocker', 'Libero', 'Defensive Specialist'],
  Badminton: ['Men’s / Women’s Singles Specialist', 'Doubles Front-Court Attacker', 'Doubles Rear-Court Smasher', 'Mixed Doubles Specialist'],
  Tennis: ['Baseline Aggressor', 'Serve-and-Volleyer', 'All-Court Player', 'Counterpuncher / Defensive Specialist', 'Doubles Specialist'],
  'Other Sport': ['Athlete', 'Captain', 'Competitor', 'Individual Specialist']
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

/**
 * Demo Data - Localized to Coimbatore, Tamil Nadu
 * Structured across 4 official tiers: Local | District | State | National (No international events)
 */
export const COMPETITION_EVENTS = [
  // --- LOCAL TIER ---
  {
    id: 'evt-cbe-1',
    name: 'Nehru Stadium Community Football League',
    tier: 'Local',
    type: 'Upcoming Events',
    sport: 'Football',
    location: 'Nehru Stadium Grounds, Coimbatore',
    latitude: 11.0028,
    longitude: 76.9658,
    date: 'Oct 14 - Oct 18, 2026',
    startDate: '2026-10-14',
    endDate: '2026-10-18',
    registrationDeadline: 'Oct 01, 2026',
    level: 'Beginner / Intermediate',
    ageCategory: 'U-19 / Open Community',
    status: 'Registration Open',
    eligibility: 'Coimbatore Local Clubs & Schools',
    organizer: 'Coimbatore District Football Association',
    fee: 'Free / Sanctioned',
    description: 'Community-level youth football league featuring group stages and knockouts scouted by regional development coaches.'
  },
  {
    id: 'evt-cbe-2',
    name: 'RS Puram Inter-Club Badminton Open',
    tier: 'Local',
    type: 'Competitions',
    sport: 'Badminton',
    location: 'RS Puram Sports Club, Coimbatore',
    latitude: 11.0118,
    longitude: 76.9482,
    date: 'Nov 05 - Nov 07, 2026',
    startDate: '2026-11-05',
    endDate: '2026-11-07',
    registrationDeadline: 'Oct 28, 2026',
    level: 'All Levels',
    ageCategory: 'U-17 & U-19 Singles/Doubles',
    status: 'Registration Open',
    eligibility: 'Club Affiliated & Open Entry',
    organizer: 'Coimbatore Badminton Club Network',
    fee: 'INR 300',
    description: 'Local weekend tournament providing grassroots tournament match exposure and ranking points for district feeder brackets.'
  },
  {
    id: 'evt-cbe-3',
    name: 'Kovai Grassroots 5v5 Futsal Carnival',
    tier: 'Local',
    type: 'Upcoming Events',
    sport: 'Football',
    location: 'Saravanampatti Arena Turf, Coimbatore',
    latitude: 11.0797,
    longitude: 76.9997,
    date: 'Dec 05 - Dec 06, 2026',
    startDate: '2026-12-05',
    endDate: '2026-12-06',
    registrationDeadline: 'Nov 28, 2026',
    level: 'Beginner',
    ageCategory: 'Open Division (U-18)',
    status: 'Early Bird',
    eligibility: 'Open Grassroots Teams',
    organizer: 'Kovai Youth Sports Hub',
    fee: 'Free Entry',
    description: 'Fast-paced 5v5 small-sided tournament focused on rapid transition play, close ball control, and talent identification.'
  },

  // --- DISTRICT TIER ---
  {
    id: 'evt-cbe-4',
    name: 'Coimbatore District Athletic Championship 2026',
    tier: 'District',
    type: 'Competitions',
    sport: 'Athletics',
    location: 'VOC Park Grounds, Coimbatore',
    latitude: 11.0065,
    longitude: 76.9744,
    date: 'Nov 12 - Nov 14, 2026',
    startDate: '2026-11-12',
    endDate: '2026-11-14',
    registrationDeadline: 'Nov 02, 2026',
    level: 'Intermediate / Advanced',
    ageCategory: 'U-16, U-18, U-20 Divisions',
    status: 'Registration Open',
    eligibility: 'Coimbatore District Registered Athletes',
    organizer: 'Coimbatore District Amateur Athletics Association',
    fee: 'INR 150 per event',
    description: 'Official district championship track meet featuring electronic timing in sprints, middle distance, hurdles, and long jump.'
  },
  {
    id: 'evt-cbe-5',
    name: 'Kovai District Junior Basketball Selection Trials',
    tier: 'District',
    type: 'Selection Trials',
    sport: 'Basketball',
    location: 'PSG Tech Indoor Stadium, Peelamedu, Coimbatore',
    latitude: 11.0247,
    longitude: 77.0028,
    date: 'Nov 22 - Nov 24, 2026',
    startDate: '2026-11-22',
    endDate: '2026-11-24',
    registrationDeadline: 'Nov 15, 2026',
    level: 'Intermediate / Advanced',
    ageCategory: 'Age 15-18 / Verified High School',
    status: 'Applications Verified',
    eligibility: 'District Club / School Varsity',
    organizer: 'Coimbatore District Basketball Association',
    fee: 'Free / Scouted',
    description: 'Selection trials for forming the official Coimbatore District squad competing in the upcoming Tamil Nadu State Inter-District Tournaments.'
  },
  {
    id: 'evt-cbe-6',
    name: 'District Inter-School Cricket Selection Trophy',
    tier: 'District',
    type: 'Competitions',
    sport: 'Cricket',
    location: 'SNR College Grounds, Nava India, Coimbatore',
    latitude: 11.0255,
    longitude: 76.9942,
    date: 'Nov 28 - Dec 02, 2026',
    startDate: '2026-11-28',
    endDate: '2026-12-02',
    registrationDeadline: 'Nov 18, 2026',
    level: 'All Levels',
    ageCategory: 'U-19 School & Club',
    status: 'Registration Open',
    eligibility: 'School Affiliated Squads',
    organizer: 'Coimbatore District Cricket Association (CDCA)',
    fee: 'INR 500 per Team',
    description: 'Annual 50-over red ball selection tournament to scout top talent for district representative age-group camps.'
  },

  // --- STATE TIER ---
  {
    id: 'evt-cbe-7',
    name: 'Tamil Nadu State CM Trophy Zonal Qualifiers',
    tier: 'State',
    type: 'Competitions',
    sport: 'Football',
    location: 'Nehru Stadium, Coimbatore',
    latitude: 11.0028,
    longitude: 76.9658,
    date: 'Dec 10 - Dec 14, 2026',
    startDate: '2026-12-10',
    endDate: '2026-12-14',
    registrationDeadline: 'Nov 30, 2026',
    level: 'Intermediate / Advanced',
    ageCategory: 'U-19 & College Division',
    status: 'Registration Open',
    eligibility: 'District Qualifiers / State Registered',
    organizer: 'Sports Development Authority of Tamil Nadu (SDAT)',
    fee: 'Free / Sanctioned',
    description: 'Prestigious Tamil Nadu State Chief Minister Trophy Zonal leg where top district champions battle for spots in the State Finals in Chennai.'
  },
  {
    id: 'evt-cbe-8',
    name: 'Tamil Nadu Inter-District State Selection Trials',
    tier: 'State',
    type: 'Selection Trials',
    sport: 'Athletics',
    location: 'VOC Park Athletic Complex, Coimbatore',
    latitude: 11.0065,
    longitude: 76.9744,
    date: 'Dec 18 - Dec 20, 2026',
    startDate: '2026-12-18',
    endDate: '2026-12-20',
    registrationDeadline: 'Dec 08, 2026',
    level: 'Advanced',
    ageCategory: 'U-18 & U-20 State Contenders',
    status: 'Registration Open',
    eligibility: 'State Ranked & District Medalists',
    organizer: 'Tamil Nadu Athletic Association (TNAA)',
    fee: 'Free / Scouted',
    description: 'Elite state evaluation trials under the supervision of state national coaches to pick the Tamil Nadu contingent for National Junior meets.'
  },
  {
    id: 'evt-cbe-9',
    name: 'Tamil Nadu State Junior Tennis Championship',
    tier: 'State',
    type: 'Upcoming Events',
    sport: 'Tennis',
    location: 'Cosmopolitan Club Courts, Race Course, Coimbatore',
    latitude: 11.0084,
    longitude: 76.9806,
    date: 'Dec 22 - Dec 26, 2026',
    startDate: '2026-12-22',
    endDate: '2026-12-26',
    registrationDeadline: 'Dec 12, 2026',
    level: 'Intermediate / Advanced',
    ageCategory: 'U-18 AITA / State Points',
    status: 'Registration Open',
    eligibility: 'AITA State Ranking Players',
    organizer: 'Tamil Nadu Tennis Association (TNTA)',
    fee: 'INR 600',
    description: 'State-ranking junior tennis championship offering valuable TNA points and selection for state zonal squads.'
  },

  // --- NATIONAL TIER ---
  {
    id: 'evt-cbe-10',
    name: 'National Federation Youth Cup - South Zone Qualifiers',
    tier: 'National',
    type: 'Selection Trials',
    sport: 'Football',
    location: 'Nehru Stadium & SDAT Complex, Coimbatore',
    latitude: 11.0028,
    longitude: 76.9658,
    date: 'Jan 08 - Jan 12, 2027',
    startDate: '2027-01-08',
    endDate: '2027-01-12',
    registrationDeadline: 'Dec 24, 2026',
    level: 'Advanced',
    ageCategory: 'U-19 Verified National Feeder',
    status: 'Applications Verified',
    eligibility: 'State Selected & Verified National Players',
    organizer: 'All India Football Federation (AIFF) & SDAT',
    fee: 'Free / AIFF Scouted',
    description: 'South Zone national selection tournament scouted by Indian youth national team scouts and ISL academy directors.'
  },
  {
    id: 'evt-cbe-11',
    name: 'Khelo India Youth Games - Tamil Nadu Trials',
    tier: 'National',
    type: 'Selection Trials',
    sport: 'Athletics',
    location: 'VOC Sports Complex, Coimbatore',
    latitude: 11.0065,
    longitude: 76.9744,
    date: 'Jan 20 - Jan 22, 2027',
    startDate: '2027-01-20',
    endDate: '2027-01-22',
    registrationDeadline: 'Jan 05, 2027',
    level: 'Advanced',
    ageCategory: 'U-18 National Standard Qualifiers',
    status: 'Registration Open',
    eligibility: 'Sub-National Electronic Timing Qualifiers',
    organizer: 'Sports Authority of India (SAI) & SDAT',
    fee: 'Free / Government Sanctioned',
    description: 'Official trials for final qualification into the Khelo India National Youth Games track and field contingent.'
  },

  // --- PAST EVENTS (FOR DYNAMIC RESULTS AUTO-POPULATION DEMONSTRATION) ---
  {
    id: 'evt-past-1',
    name: 'Coimbatore District Monsoon Track Meet 2026',
    tier: 'District',
    type: 'Competitions',
    sport: 'Athletics',
    location: 'VOC Park Grounds, Coimbatore',
    latitude: 11.0065,
    longitude: 76.9744,
    date: 'Jul 18 - Jul 20, 2026',
    startDate: '2026-07-18',
    endDate: '2026-07-20',
    registrationDeadline: 'Jul 10, 2026',
    level: 'Intermediate / Advanced',
    ageCategory: 'U-18 District',
    status: 'Completed',
    eligibility: 'District Registered Athletes',
    organizer: 'Coimbatore District Amateur Athletics Association',
    fee: 'Completed',
    description: 'Competitive district-level track and field meet culminating in podium finishes and official state camp selections.'
  },
  {
    id: 'evt-past-2',
    name: 'Kongu Regional Youth Football Tournament',
    tier: 'Local',
    type: 'Competitions',
    sport: 'Football',
    location: 'Saravanampatti Turf Arena, Coimbatore',
    latitude: 11.0797,
    longitude: 76.9997,
    date: 'Aug 08, 2026',
    startDate: '2026-08-08',
    endDate: '2026-08-08',
    registrationDeadline: 'Aug 01, 2026',
    level: 'Beginner / Intermediate',
    ageCategory: 'U-18 Community League',
    status: 'Completed',
    eligibility: 'Coimbatore Regional Academy Teams',
    organizer: 'Kongu Youth Sports Academy',
    fee: 'Completed',
    description: 'Annual local youth football cup featuring competitive knockouts and talent scouting.'
  }
];

/**
 * =========================================================================
 * PROGRESS DATA — keyed by sport (lowercase) → level → metrics
 * =========================================================================
 * Each entry supplies everything the Progress page needs:
 *   - Pillar scores + deltas from previous assessment cycle
 *   - Trajectory chart data (historical assessments + projected)
 *   - Assessment summary (completed, total, cycle dates)
 *   - Training hours for the current bi-weekly cycle
 *   - Target readiness percentage
 * =========================================================================
 */
const _buildEntry = (o) => ({
  overallReadiness: o.or,
  technicalSkill:   { value: o.ts, delta: o.tsd },
  physicalFitness:  { value: o.pf, delta: o.pfd },
  sportIQ:          { value: o.iq, delta: o.iqd },
  trainingConsistency: { value: o.tc, delta: o.tcd },
  targetReadiness: o.target,
  assessmentsCompleted: o.ac,
  assessmentsTotal: 4,
  cycleTrainingHours: o.hrs,
  biWeeklyTargetHours: o.tgtHrs,
  trajectoryData: o.traj,
});

export const PROGRESS_DATA_BY_SPORT_LEVEL = {
  football: {
    Beginner: _buildEntry({
      or: 35, ts: 32, tsd: 4, pf: 30, pfd: 3, iq: 38, iqd: 5, tc: 65, tcd: 8,
      target: 50, ac: 1, hrs: 8, tgtHrs: 10,
      traj: [
        { label: 'Cycle 1', date: 'Jun 5', score: 18 },
        { label: 'Cycle 2', date: 'Jun 19', score: 22 },
        { label: 'Cycle 3', date: 'Jul 3', score: 28 },
        { label: 'Now',     date: 'Jul 17', score: 35, isCurrent: true },
        { label: 'Projected', date: 'Jul 31', score: 43, isProjected: true },
      ],
    }),
    Intermediate: _buildEntry({
      or: 55, ts: 52, tsd: 6, pf: 50, pfd: 4, iq: 58, iqd: 3, tc: 78, tcd: 5,
      target: 70, ac: 2, hrs: 14, tgtHrs: 16,
      traj: [
        { label: 'Cycle 1', date: 'Jun 5', score: 35 },
        { label: 'Cycle 2', date: 'Jun 19', score: 40 },
        { label: 'Cycle 3', date: 'Jul 3', score: 48 },
        { label: 'Now',     date: 'Jul 17', score: 55, isCurrent: true },
        { label: 'Projected', date: 'Jul 31', score: 64, isProjected: true },
      ],
    }),
    Advanced: _buildEntry({
      or: 78, ts: 80, tsd: 3, pf: 75, pfd: 2, iq: 82, iqd: 4, tc: 92, tcd: 2,
      target: 90, ac: 3, hrs: 22, tgtHrs: 24,
      traj: [
        { label: 'Cycle 1', date: 'Jun 5', score: 62 },
        { label: 'Cycle 2', date: 'Jun 19', score: 68 },
        { label: 'Cycle 3', date: 'Jul 3', score: 74 },
        { label: 'Now',     date: 'Jul 17', score: 78, isCurrent: true },
        { label: 'Projected', date: 'Jul 31', score: 85, isProjected: true },
      ],
    }),
  },
  cricket: {
    Beginner: _buildEntry({
      or: 30, ts: 28, tsd: 3, pf: 25, pfd: 2, iq: 35, iqd: 6, tc: 60, tcd: 7,
      target: 45, ac: 1, hrs: 7, tgtHrs: 10,
      traj: [
        { label: 'Cycle 1', date: 'Jun 5', score: 15 },
        { label: 'Cycle 2', date: 'Jun 19', score: 20 },
        { label: 'Cycle 3', date: 'Jul 3', score: 25 },
        { label: 'Now',     date: 'Jul 17', score: 30, isCurrent: true },
        { label: 'Projected', date: 'Jul 31', score: 38, isProjected: true },
      ],
    }),
    Intermediate: _buildEntry({
      or: 52, ts: 55, tsd: 5, pf: 48, pfd: 4, iq: 60, iqd: 2, tc: 74, tcd: 6,
      target: 68, ac: 2, hrs: 13, tgtHrs: 14,
      traj: [
        { label: 'Cycle 1', date: 'Jun 5', score: 32 },
        { label: 'Cycle 2', date: 'Jun 19', score: 38 },
        { label: 'Cycle 3', date: 'Jul 3', score: 46 },
        { label: 'Now',     date: 'Jul 17', score: 52, isCurrent: true },
        { label: 'Projected', date: 'Jul 31', score: 60, isProjected: true },
      ],
    }),
    Advanced: _buildEntry({
      or: 76, ts: 78, tsd: 2, pf: 72, pfd: 3, iq: 85, iqd: 1, tc: 90, tcd: 3,
      target: 88, ac: 3, hrs: 20, tgtHrs: 22,
      traj: [
        { label: 'Cycle 1', date: 'Jun 5', score: 60 },
        { label: 'Cycle 2', date: 'Jun 19', score: 66 },
        { label: 'Cycle 3', date: 'Jul 3', score: 72 },
        { label: 'Now',     date: 'Jul 17', score: 76, isCurrent: true },
        { label: 'Projected', date: 'Jul 31', score: 83, isProjected: true },
      ],
    }),
  },
  basketball: {
    Beginner: _buildEntry({
      or: 33, ts: 30, tsd: 5, pf: 35, pfd: 4, iq: 32, iqd: 3, tc: 62, tcd: 9,
      target: 48, ac: 1, hrs: 9, tgtHrs: 12,
      traj: [
        { label: 'Cycle 1', date: 'Jun 5', score: 16 },
        { label: 'Cycle 2', date: 'Jun 19', score: 22 },
        { label: 'Cycle 3', date: 'Jul 3', score: 28 },
        { label: 'Now',     date: 'Jul 17', score: 33, isCurrent: true },
        { label: 'Projected', date: 'Jul 31', score: 42, isProjected: true },
      ],
    }),
    Intermediate: _buildEntry({
      or: 58, ts: 56, tsd: 7, pf: 60, pfd: 5, iq: 54, iqd: 4, tc: 80, tcd: 6,
      target: 72, ac: 2, hrs: 15, tgtHrs: 16,
      traj: [
        { label: 'Cycle 1', date: 'Jun 5', score: 38 },
        { label: 'Cycle 2', date: 'Jun 19', score: 44 },
        { label: 'Cycle 3', date: 'Jul 3', score: 52 },
        { label: 'Now',     date: 'Jul 17', score: 58, isCurrent: true },
        { label: 'Projected', date: 'Jul 31', score: 66, isProjected: true },
      ],
    }),
    Advanced: _buildEntry({
      or: 82, ts: 84, tsd: 3, pf: 80, pfd: 2, iq: 79, iqd: 5, tc: 94, tcd: 1,
      target: 92, ac: 3, hrs: 24, tgtHrs: 26,
      traj: [
        { label: 'Cycle 1', date: 'Jun 5', score: 66 },
        { label: 'Cycle 2', date: 'Jun 19', score: 72 },
        { label: 'Cycle 3', date: 'Jul 3', score: 78 },
        { label: 'Now',     date: 'Jul 17', score: 82, isCurrent: true },
        { label: 'Projected', date: 'Jul 31', score: 88, isProjected: true },
      ],
    }),
  },
  athletics: {
    Beginner: _buildEntry({
      or: 38, ts: 35, tsd: 6, pf: 40, pfd: 5, iq: 30, iqd: 4, tc: 70, tcd: 10,
      target: 52, ac: 1, hrs: 10, tgtHrs: 12,
      traj: [
        { label: 'Cycle 1', date: 'Jun 5', score: 20 },
        { label: 'Cycle 2', date: 'Jun 19', score: 26 },
        { label: 'Cycle 3', date: 'Jul 3', score: 32 },
        { label: 'Now',     date: 'Jul 17', score: 38, isCurrent: true },
        { label: 'Projected', date: 'Jul 31', score: 46, isProjected: true },
      ],
    }),
    Intermediate: _buildEntry({
      or: 60, ts: 58, tsd: 4, pf: 65, pfd: 6, iq: 52, iqd: -2, tc: 82, tcd: 4,
      target: 75, ac: 2, hrs: 16, tgtHrs: 18,
      traj: [
        { label: 'Cycle 1', date: 'Jun 5', score: 40 },
        { label: 'Cycle 2', date: 'Jun 19', score: 46 },
        { label: 'Cycle 3', date: 'Jul 3', score: 54 },
        { label: 'Now',     date: 'Jul 17', score: 60, isCurrent: true },
        { label: 'Projected', date: 'Jul 31', score: 68, isProjected: true },
      ],
    }),
    Advanced: _buildEntry({
      or: 85, ts: 83, tsd: 2, pf: 90, pfd: 1, iq: 78, iqd: 3, tc: 95, tcd: 1,
      target: 95, ac: 4, hrs: 26, tgtHrs: 28,
      traj: [
        { label: 'Cycle 1', date: 'Jun 5', score: 70 },
        { label: 'Cycle 2', date: 'Jun 19', score: 75 },
        { label: 'Cycle 3', date: 'Jul 3', score: 80 },
        { label: 'Now',     date: 'Jul 17', score: 85, isCurrent: true },
        { label: 'Projected', date: 'Jul 31', score: 91, isProjected: true },
      ],
    }),
  },
  volleyball: {
    Beginner: _buildEntry({
      or: 32, ts: 28, tsd: 5, pf: 34, pfd: 4, iq: 30, iqd: 6, tc: 58, tcd: 7,
      target: 46, ac: 1, hrs: 7, tgtHrs: 10,
      traj: [
        { label: 'Cycle 1', date: 'Jun 5', score: 14 },
        { label: 'Cycle 2', date: 'Jun 19', score: 20 },
        { label: 'Cycle 3', date: 'Jul 3', score: 26 },
        { label: 'Now',     date: 'Jul 17', score: 32, isCurrent: true },
        { label: 'Projected', date: 'Jul 31', score: 40, isProjected: true },
      ],
    }),
    Intermediate: _buildEntry({
      or: 54, ts: 50, tsd: 6, pf: 55, pfd: 5, iq: 56, iqd: 3, tc: 76, tcd: 5,
      target: 68, ac: 2, hrs: 12, tgtHrs: 14,
      traj: [
        { label: 'Cycle 1', date: 'Jun 5', score: 34 },
        { label: 'Cycle 2', date: 'Jun 19', score: 40 },
        { label: 'Cycle 3', date: 'Jul 3', score: 48 },
        { label: 'Now',     date: 'Jul 17', score: 54, isCurrent: true },
        { label: 'Projected', date: 'Jul 31', score: 62, isProjected: true },
      ],
    }),
    Advanced: _buildEntry({
      or: 79, ts: 77, tsd: 3, pf: 82, pfd: 2, iq: 80, iqd: 2, tc: 91, tcd: 2,
      target: 90, ac: 3, hrs: 21, tgtHrs: 24,
      traj: [
        { label: 'Cycle 1', date: 'Jun 5', score: 63 },
        { label: 'Cycle 2', date: 'Jun 19', score: 68 },
        { label: 'Cycle 3', date: 'Jul 3', score: 74 },
        { label: 'Now',     date: 'Jul 17', score: 79, isCurrent: true },
        { label: 'Projected', date: 'Jul 31', score: 86, isProjected: true },
      ],
    }),
  },
  badminton: {
    Beginner: _buildEntry({
      or: 34, ts: 30, tsd: 4, pf: 32, pfd: 3, iq: 36, iqd: 5, tc: 64, tcd: 8,
      target: 48, ac: 1, hrs: 8, tgtHrs: 10,
      traj: [
        { label: 'Cycle 1', date: 'Jun 5', score: 17 },
        { label: 'Cycle 2', date: 'Jun 19', score: 22 },
        { label: 'Cycle 3', date: 'Jul 3', score: 28 },
        { label: 'Now',     date: 'Jul 17', score: 34, isCurrent: true },
        { label: 'Projected', date: 'Jul 31', score: 42, isProjected: true },
      ],
    }),
    Intermediate: _buildEntry({
      or: 56, ts: 58, tsd: 5, pf: 52, pfd: 4, iq: 60, iqd: 2, tc: 78, tcd: 6,
      target: 70, ac: 2, hrs: 14, tgtHrs: 16,
      traj: [
        { label: 'Cycle 1', date: 'Jun 5', score: 36 },
        { label: 'Cycle 2', date: 'Jun 19', score: 42 },
        { label: 'Cycle 3', date: 'Jul 3', score: 50 },
        { label: 'Now',     date: 'Jul 17', score: 56, isCurrent: true },
        { label: 'Projected', date: 'Jul 31', score: 64, isProjected: true },
      ],
    }),
    Advanced: _buildEntry({
      or: 80, ts: 82, tsd: 2, pf: 76, pfd: 3, iq: 84, iqd: 1, tc: 93, tcd: 2,
      target: 92, ac: 3, hrs: 22, tgtHrs: 24,
      traj: [
        { label: 'Cycle 1', date: 'Jun 5', score: 64 },
        { label: 'Cycle 2', date: 'Jun 19', score: 70 },
        { label: 'Cycle 3', date: 'Jul 3', score: 76 },
        { label: 'Now',     date: 'Jul 17', score: 80, isCurrent: true },
        { label: 'Projected', date: 'Jul 31', score: 87, isProjected: true },
      ],
    }),
  },
  tennis: {
    Beginner: _buildEntry({
      or: 36, ts: 34, tsd: 5, pf: 38, pfd: 4, iq: 33, iqd: 3, tc: 66, tcd: 9,
      target: 50, ac: 1, hrs: 9, tgtHrs: 12,
      traj: [
        { label: 'Cycle 1', date: 'Jun 5', score: 19 },
        { label: 'Cycle 2', date: 'Jun 19', score: 24 },
        { label: 'Cycle 3', date: 'Jul 3', score: 30 },
        { label: 'Now',     date: 'Jul 17', score: 36, isCurrent: true },
        { label: 'Projected', date: 'Jul 31', score: 44, isProjected: true },
      ],
    }),
    Intermediate: _buildEntry({
      or: 57, ts: 60, tsd: 6, pf: 55, pfd: 3, iq: 54, iqd: -1, tc: 76, tcd: 5,
      target: 72, ac: 2, hrs: 15, tgtHrs: 16,
      traj: [
        { label: 'Cycle 1', date: 'Jun 5', score: 37 },
        { label: 'Cycle 2', date: 'Jun 19', score: 43 },
        { label: 'Cycle 3', date: 'Jul 3', score: 51 },
        { label: 'Now',     date: 'Jul 17', score: 57, isCurrent: true },
        { label: 'Projected', date: 'Jul 31', score: 65, isProjected: true },
      ],
    }),
    Advanced: _buildEntry({
      or: 81, ts: 85, tsd: 2, pf: 78, pfd: 2, iq: 80, iqd: 3, tc: 92, tcd: 1,
      target: 93, ac: 3, hrs: 23, tgtHrs: 26,
      traj: [
        { label: 'Cycle 1', date: 'Jun 5', score: 65 },
        { label: 'Cycle 2', date: 'Jun 19', score: 71 },
        { label: 'Cycle 3', date: 'Jul 3', score: 77 },
        { label: 'Now',     date: 'Jul 17', score: 81, isCurrent: true },
        { label: 'Projected', date: 'Jul 31', score: 88, isProjected: true },
      ],
    }),
  },
  other: {
    Beginner: _buildEntry({
      or: 30, ts: 28, tsd: 3, pf: 30, pfd: 3, iq: 28, iqd: 4, tc: 55, tcd: 6,
      target: 44, ac: 1, hrs: 6, tgtHrs: 8,
      traj: [
        { label: 'Cycle 1', date: 'Jun 5', score: 14 },
        { label: 'Cycle 2', date: 'Jun 19', score: 19 },
        { label: 'Cycle 3', date: 'Jul 3', score: 24 },
        { label: 'Now',     date: 'Jul 17', score: 30, isCurrent: true },
        { label: 'Projected', date: 'Jul 31', score: 37, isProjected: true },
      ],
    }),
    Intermediate: _buildEntry({
      or: 50, ts: 48, tsd: 4, pf: 50, pfd: 5, iq: 48, iqd: 2, tc: 72, tcd: 5,
      target: 65, ac: 2, hrs: 12, tgtHrs: 14,
      traj: [
        { label: 'Cycle 1', date: 'Jun 5', score: 30 },
        { label: 'Cycle 2', date: 'Jun 19', score: 36 },
        { label: 'Cycle 3', date: 'Jul 3', score: 44 },
        { label: 'Now',     date: 'Jul 17', score: 50, isCurrent: true },
        { label: 'Projected', date: 'Jul 31', score: 58, isProjected: true },
      ],
    }),
    Advanced: _buildEntry({
      or: 74, ts: 72, tsd: 2, pf: 74, pfd: 2, iq: 70, iqd: 3, tc: 88, tcd: 2,
      target: 85, ac: 3, hrs: 20, tgtHrs: 22,
      traj: [
        { label: 'Cycle 1', date: 'Jun 5', score: 58 },
        { label: 'Cycle 2', date: 'Jun 19', score: 63 },
        { label: 'Cycle 3', date: 'Jul 3', score: 69 },
        { label: 'Now',     date: 'Jul 17', score: 74, isCurrent: true },
        { label: 'Projected', date: 'Jul 31', score: 81, isProjected: true },
      ],
    }),
  },
};

/**
 * Resolve progress data for a given sport + level.
 * Falls back gracefully: unknown sport → 'other', unknown level → 'Beginner'.
 */
export const getProgressData = (sport = 'Football', level = 'Beginner') => {
  const key = sport.toLowerCase();
  const sportData = PROGRESS_DATA_BY_SPORT_LEVEL[key] || PROGRESS_DATA_BY_SPORT_LEVEL['other'];
  return sportData[level] || sportData['Beginner'];
};

/** Backward-compatible alias so nothing else breaks */
export const PROGRESS_METRICS = {
  overallScore: 35,
  skillScore: 40,
  fitnessScore: 35,
  knowledgeScore: 45,
  consistencyStreak: 4,
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
