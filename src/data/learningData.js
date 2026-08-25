/**
 * athletex - Learning & Coaching Content Engine
 * Structured sports education repository organized by Sport, Level, Category, and Sequential Stage.
 * Contains real educational YouTube video IDs, YouTube-playlist-style modules, and coaching metadata.
 */

export const LEARN_CATEGORIES = [
  { id: 'all', label: 'All Topics', icon: 'Layers' },
  { id: 'rules', label: 'Rules & Match Regulations', icon: 'BookOpen' },
  { id: 'fundamentals', label: 'Core Fundamentals', icon: 'Sparkles' },
  { id: 'techniques', label: 'Techniques & Drills', icon: 'Target' },
  { id: 'strategy', label: 'Tactics & Game Strategy', icon: 'Compass' },
  { id: 'advanced', label: 'Advanced Skills', icon: 'Award' }
];

export const LEARNING_STAGES = [
  { stage: 1, category: 'rules', label: 'Rules & Regulations', shortLabel: 'Rules', icon: 'BookOpen' },
  { stage: 2, category: 'fundamentals', label: 'Core Fundamentals', shortLabel: 'Fundamentals', icon: 'Sparkles' },
  { stage: 3, category: 'techniques', label: 'Techniques & Drills', shortLabel: 'Techniques', icon: 'Target' },
  { stage: 4, category: 'strategy', label: 'Tactical Strategy', shortLabel: 'Strategy', icon: 'Compass' },
  { stage: 5, category: 'advanced', label: 'Advanced Mastery', shortLabel: 'Advanced Skills', icon: 'Award' }
];

export const LEARN_MILESTONES = [
  {
    id: 'first-lesson',
    title: 'First Step',
    description: 'Complete your first structured lesson',
    icon: 'Sparkles',
    target: 1,
    type: 'count',
    badgeColor: 'brand'
  },
  {
    id: 'three-lessons',
    title: 'Skill Builder',
    description: 'Complete 3 practice lessons',
    icon: 'Target',
    target: 3,
    type: 'count',
    badgeColor: 'volt'
  },
  {
    id: 'five-lessons',
    title: '5 Lessons Done',
    description: 'Reach 5 completed lessons',
    icon: 'Award',
    target: 5,
    type: 'count',
    badgeColor: 'gold'
  },
  {
    id: 'rules-master',
    title: 'Rules Scholar',
    description: 'Master official match regulations',
    icon: 'BookOpen',
    targetCategory: 'rules',
    type: 'category',
    badgeColor: 'cyan'
  },
  {
    id: 'module-master',
    title: 'Module Master',
    description: 'Complete an entire playlist module',
    icon: 'Flame',
    target: 1,
    type: 'module',
    badgeColor: 'volt'
  }
];

export const STRUCTURED_MODULES = [
  // =========================================================================
  // BASKETBALL MODULES
  // =========================================================================
  {
    id: 'mod-bb-rules',
    sport: 'basketball',
    level: 'beginner',
    title: 'Basketball Rules & Court Officiating',
    category: 'rules',
    coverImage: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=600&auto=format&fit=crop&q=80',
    description: 'Official court boundaries, violation triggers, shot clock timing, and referee signals.',
    lessonIds: ['bb-beg-rules-1', 'bb-int-rules-1'],
    tags: ['Rules', 'Violations', 'Court Lines', 'Shot Clock']
  },
  {
    id: 'mod-bb-fundamentals',
    sport: 'basketball',
    level: 'beginner',
    title: 'Basketball Fundamentals & Ball Mastery',
    category: 'fundamentals',
    coverImage: 'https://images.unsplash.com/photo-1519861531473-9200262188bf?w=600&auto=format&fit=crop&q=80',
    description: 'Low triple-threat stance, fingertip ball handling, shooting pocket dip, and triple-threat balance.',
    lessonIds: ['bb-beg-fund-1', 'bb-int-fund-1', 'bb-adv-fund-1'],
    tags: ['Ball Handling', 'Stance', 'Shooting Dip', 'Balance']
  },
  {
    id: 'mod-bb-techniques',
    sport: 'basketball',
    level: 'beginner',
    title: 'Dribbling Separation & First-Step Footwork',
    category: 'techniques',
    coverImage: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=600&auto=format&fit=crop&q=80',
    description: 'Crossover counters, snatch-back deceleration, in-and-out hesitation, and cone weaves.',
    lessonIds: ['bb-beg-tech-1', 'bb-int-tech-1'],
    tags: ['Crossover', 'Hesitation', 'Deceleration', 'Footwork']
  },
  {
    id: 'mod-bb-strategy',
    sport: 'basketball',
    level: 'beginner',
    title: 'Offensive Spacing & Tactical Defense',
    category: 'strategy',
    coverImage: 'https://images.unsplash.com/photo-1518063319789-7217e6706b04?w=600&auto=format&fit=crop&q=80',
    description: '5-out perimeter spacing, pick-and-roll reads, zone defense breakdown, and transition coverages.',
    lessonIds: ['bb-beg-strat-1', 'bb-int-strat-1', 'bb-adv-strat-1'],
    tags: ['Pick & Roll', 'Spacing', 'Zone Defense', 'Scouting']
  },
  {
    id: 'mod-bb-advanced',
    sport: 'basketball',
    level: 'beginner',
    title: 'Rim Scoring & Elite Game Execution',
    category: 'advanced',
    coverImage: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=600&auto=format&fit=crop&q=80',
    description: 'Eurosteps, high-arcing floaters, lockdown perimeter defense, and crunch-time shot creation.',
    lessonIds: ['bb-beg-adv-1', 'bb-int-adv-1'],
    tags: ['Eurostep', 'Floaters', 'Clutch Time', 'Lockdown Defense']
  },

  // =========================================================================
  // FOOTBALL / SOCCER MODULES
  // =========================================================================
  {
    id: 'mod-fb-rules',
    sport: 'football',
    level: 'beginner',
    title: 'Football Regulations & Tactical Offside Rules',
    category: 'rules',
    coverImage: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=600&auto=format&fit=crop&q=80',
    description: 'Pitch layout, offside line mechanics, direct vs indirect free kicks, and penalty area laws.',
    lessonIds: ['fb-beg-rules-1'],
    tags: ['Offside', 'Fouls', 'Pitch Dimensions', 'Referee Signals']
  },
  {
    id: 'mod-fb-fundamentals',
    sport: 'football',
    level: 'beginner',
    title: 'Football Fundamentals: First Touch & Passing',
    category: 'fundamentals',
    coverImage: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=600&auto=format&fit=crop&q=80',
    description: 'Inside-foot receiving, cushion trapping on the half-turn, aerial ball control, and diagonal passing.',
    lessonIds: ['fb-beg-fund-1', 'fb-int-fund-1'],
    tags: ['First Touch', 'Ground Passing', 'Aerial Control', 'Vision']
  },
  {
    id: 'mod-fb-techniques',
    sport: 'football',
    level: 'beginner',
    title: 'Close Dribbling & 1v1 Feints',
    category: 'techniques',
    coverImage: 'https://images.unsplash.com/photo-1529900748604-07564a03e7a6?w=600&auto=format&fit=crop&q=80',
    description: 'Tight-space cone dribbling, sole rolls, sharp direction shifts, and step-over deception.',
    lessonIds: ['fb-beg-tech-1'],
    tags: ['Cone Dribbling', 'Sole Rolls', 'Agility', 'Speed']
  },
  {
    id: 'mod-fb-strategy',
    sport: 'football',
    level: 'beginner',
    title: 'Tactical Positioning & Pressing Systems',
    category: 'strategy',
    coverImage: 'https://images.unsplash.com/photo-1489944440615-453fc2b6a9a9?w=600&auto=format&fit=crop&q=80',
    description: 'Formation structures (4-3-3 / 4-4-2), positional triangles, pressing triggers, and counter-attacks.',
    lessonIds: ['fb-beg-strat-1', 'fb-int-strat-1'],
    tags: ['Formations', 'Pressing', 'Counter-Attack', 'Spatial IQ']
  },
  {
    id: 'mod-fb-advanced',
    sport: 'football',
    level: 'beginner',
    title: 'Shooting Biomechanics & Curled Finishing',
    category: 'advanced',
    coverImage: 'https://images.unsplash.com/photo-1517466787929-bc90951d0974?w=600&auto=format&fit=crop&q=80',
    description: 'Instep lace drives, curled far-post finesse, 1-on-1 composure, and weak-foot calibration.',
    lessonIds: ['fb-beg-adv-1'],
    tags: ['Finishing', 'Curled Shots', 'Power Drives', 'Composure']
  },

  // =========================================================================
  // CRICKET MODULES
  // =========================================================================
  {
    id: 'mod-cr-rules',
    sport: 'cricket',
    level: 'beginner',
    title: 'Cricket Laws, Dismissals & Powerplays',
    category: 'rules',
    coverImage: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=600&auto=format&fit=crop&q=80',
    description: 'The 10 methods of dismissal, LBW pitch zones, no-balls, wide deliveries, and powerplays.',
    lessonIds: ['cr-beg-rules-1'],
    tags: ['LBW', 'Dismissals', 'Powerplays', 'No-Ball Rules']
  },
  {
    id: 'mod-cr-fundamentals',
    sport: 'cricket',
    level: 'beginner',
    title: 'Batting Stance, Grip & Backlift Mechanics',
    category: 'fundamentals',
    coverImage: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=600&auto=format&fit=crop&q=80',
    description: 'Classic top-hand V-grip, side-on balanced stance, high backlift, and head alignment.',
    lessonIds: ['cr-beg-fund-1'],
    tags: ['V-Grip', 'Stance', 'Backlift', 'Balance']
  },
  {
    id: 'mod-cr-techniques',
    sport: 'cricket',
    level: 'beginner',
    title: 'Front-Foot Driving & Footwork Mastery',
    category: 'techniques',
    coverImage: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=600&auto=format&fit=crop&q=80',
    description: 'Cover drive, straight drive, leading elbow alignment, and weight transfer onto front foot.',
    lessonIds: ['cr-beg-tech-1'],
    tags: ['Cover Drive', 'Straight Drive', 'Elbow Alignment', 'Sweet Spot']
  },
  {
    id: 'mod-cr-strategy',
    sport: 'cricket',
    level: 'beginner',
    title: 'Strike Rotation, Running & Field Placements',
    category: 'strategy',
    coverImage: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=600&auto=format&fit=crop&q=80',
    description: 'Calling systems, bat grounding at the crease, finding boundary gaps, and pacing innings.',
    lessonIds: ['cr-beg-strat-1'],
    tags: ['Strike Rotation', 'Running', 'Calling', 'Field Gaps']
  },
  {
    id: 'mod-cr-advanced',
    sport: 'cricket',
    level: 'beginner',
    title: 'Pace Bowling: Seam Position & Yorkers',
    category: 'advanced',
    coverImage: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=600&auto=format&fit=crop&q=80',
    description: 'Seam presentation, upright wrist release, consistent run-up rhythm, and toe-crushing yorkers.',
    lessonIds: ['cr-beg-adv-1'],
    tags: ['Seam Release', 'Yorker', 'Pace Bowling', 'Swing']
  },

  // =========================================================================
  // ATHLETICS / TRACK & FIELD MODULES
  // =========================================================================
  {
    id: 'mod-ath-rules',
    sport: 'athletics',
    level: 'beginner',
    title: 'Sprint Regulations & Block Start Laws',
    category: 'rules',
    coverImage: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=600&auto=format&fit=crop&q=80',
    description: 'Starting commands, false-start reaction thresholds, lane boundaries, and relay zones.',
    lessonIds: ['ath-beg-rules-1'],
    tags: ['Sprint Rules', 'False Starts', 'Lane Discipline', 'Relay Zones']
  },
  {
    id: 'mod-ath-fundamentals',
    sport: 'athletics',
    level: 'beginner',
    title: 'Sprint Posture & Biomechanical Form',
    category: 'fundamentals',
    coverImage: 'https://images.unsplash.com/photo-1530549387789-4c1017266635?w=600&auto=format&fit=crop&q=80',
    description: 'Tall upright posture, neutral pelvis, 90-degree arm drive, and stiff dorsiflexed ankles.',
    lessonIds: ['ath-beg-fund-1'],
    tags: ['Posture', 'Arm Swing', 'Dorsiflexion', 'Biomechanics']
  },
  {
    id: 'mod-ath-techniques',
    sport: 'athletics',
    level: 'beginner',
    title: 'Block Starts & Drive Phase Acceleration',
    category: 'techniques',
    coverImage: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=600&auto=format&fit=crop&q=80',
    description: 'Block spacing, 45-degree explosive push-off, low heel recovery, and progressive head rise.',
    lessonIds: ['ath-beg-tech-1'],
    tags: ['Block Starts', 'Drive Phase', 'Low Heel Recovery', 'Acceleration']
  },
  {
    id: 'mod-ath-strategy',
    sport: 'athletics',
    level: 'beginner',
    title: 'Race Modeling & Energy System Distribution',
    category: 'strategy',
    coverImage: 'https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=600&auto=format&fit=crop&q=80',
    description: '100m, 200m, and 400m race modeling: acceleration, max speed maintenance, and speed endurance.',
    lessonIds: ['ath-beg-strat-1'],
    tags: ['Pacing', 'Curve Running', 'Speed Endurance', 'Race Modeling']
  },
  {
    id: 'mod-ath-advanced',
    sport: 'athletics',
    level: 'beginner',
    title: 'Max Velocity & High-Speed Resistance',
    category: 'advanced',
    coverImage: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=600&auto=format&fit=crop&q=80',
    description: 'Front-side knee punch, ground contact times <0.090s, relaxation cues, and finish line lunge.',
    lessonIds: ['ath-beg-adv-1'],
    tags: ['Top Speed', 'Ground Force', 'Knee Punch', 'Finish Line']
  },

  // =========================================================================
  // TENNIS MODULES
  // =========================================================================
  {
    id: 'mod-tn-rules',
    sport: 'tennis',
    level: 'beginner',
    title: 'Tennis Scoring System & Court Lines',
    category: 'rules',
    coverImage: 'https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?w=600&auto=format&fit=crop&q=80',
    description: 'Game-set-match scoring, tiebreaks, service faults, lets, and singles vs doubles lines.',
    lessonIds: ['tn-beg-rules-1'],
    tags: ['Scoring', 'Tiebreak', 'Faults', 'Court Lines']
  },
  {
    id: 'mod-tn-fundamentals',
    sport: 'tennis',
    level: 'beginner',
    title: 'Tennis Grips & Dynamic Ready Position',
    category: 'fundamentals',
    coverImage: 'https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=600&auto=format&fit=crop&q=80',
    description: 'Bevel placement for Eastern, Semi-Western, and Continental grips with split-step readiness.',
    lessonIds: ['tn-beg-fund-1'],
    tags: ['Grips', 'Semi-Western', 'Split Step', 'Ready Position']
  },
  {
    id: 'mod-tn-techniques',
    sport: 'tennis',
    level: 'beginner',
    title: 'Topspin Forehand & Low-to-High Swing',
    category: 'techniques',
    coverImage: 'https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?w=600&auto=format&fit=crop&q=80',
    description: 'Unit turn, racket drop below the ball, windshield wiper follow-through, and brushing topspin.',
    lessonIds: ['tn-beg-tech-1'],
    tags: ['Forehand', 'Topspin', 'Unit Turn', 'Follow-Through']
  },
  {
    id: 'mod-tn-strategy',
    sport: 'tennis',
    level: 'beginner',
    title: 'Crosscourt Baseline Rally Patterns',
    category: 'strategy',
    coverImage: 'https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?w=600&auto=format&fit=crop&q=80',
    description: 'High-percentage geometry: lowest net clearance, longest court baseline distance, and angle bisecting.',
    lessonIds: ['tn-beg-strat-1'],
    tags: ['Crosscourt', 'Court Geometry', 'Shot Selection', 'Angles']
  },
  {
    id: 'mod-tn-advanced',
    sport: 'tennis',
    level: 'beginner',
    title: 'Flat & Kick Serve Biomechanics',
    category: 'advanced',
    coverImage: 'https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?w=600&auto=format&fit=crop&q=80',
    description: 'Trophy pose, 1 o’clock toss, back scratch racket drop, and forearm pronation release.',
    lessonIds: ['tn-beg-adv-1'],
    tags: ['Serve', 'Kick Serve', 'Trophy Pose', 'Pronation']
  },

  // =========================================================================
  // BADMINTON MODULES
  // =========================================================================
  {
    id: 'mod-bd-rules',
    sport: 'badminton',
    level: 'beginner',
    title: 'Badminton Regulations & Rules',
    category: 'rules',
    coverImage: 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=600&auto=format&fit=crop&q=80',
    description: 'Rally scoring to 21, singles vs doubles boxes, 1.15m service height rule, and net touch fouls.',
    lessonIds: ['bd-beg-rules-1'],
    tags: ['Badminton Rules', 'Service Rules', 'Scoring', 'Boundaries']
  },
  {
    id: 'mod-bd-fundamentals',
    sport: 'badminton',
    level: 'beginner',
    title: 'Badminton Basics & Fundamentals',
    category: 'fundamentals',
    coverImage: 'https://images.unsplash.com/photo-1613918108466-292b78a8ef95?w=600&auto=format&fit=crop&q=80',
    description: 'Relaxed V-grip, thumb grip for backhand, ready stance, and court footwork recovery.',
    lessonIds: ['bd-beg-fund-1'],
    tags: ['Badminton Basics', 'Racket Grip', 'Ready Stance', 'Footwork']
  },
  {
    id: 'mod-bd-techniques',
    sport: 'badminton',
    level: 'beginner',
    title: 'Badminton Next Step Skills & Drills',
    category: 'techniques',
    coverImage: 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=600&auto=format&fit=crop&q=80',
    description: 'Next step skills: dynamic shot control, deceptive wrist action, and smooth stroke timing.',
    lessonIds: ['bd-beg-tech-1'],
    tags: ['Next Step Skills', 'Shot Techniques', 'Wrist Action', 'Stroke Timing']
  },
  {
    id: 'mod-bd-strategy',
    sport: 'badminton',
    level: 'beginner',
    title: '4-Corner Shuttle Manipulation Strategy',
    category: 'strategy',
    coverImage: 'https://images.unsplash.com/photo-1613918108466-292b78a8ef95?w=600&auto=format&fit=crop&q=80',
    description: 'Holding shots to freeze opponent split step, diagonal corner shifts, and tempo management.',
    lessonIds: ['bd-beg-strat-1'],
    tags: ['Tactics', '4-Corners', 'Holding Shot', 'Pacing']
  },
  {
    id: 'mod-bd-advanced',
    sport: 'badminton',
    level: 'beginner',
    title: 'Jump Smash & Net Kill Reflexes',
    category: 'advanced',
    coverImage: 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=600&auto=format&fit=crop&q=80',
    description: 'Scissor kick jump smash timing, steep angle court penetration, and lightning net tap reflexes.',
    lessonIds: ['bd-beg-adv-1'],
    tags: ['Jump Smash', 'Net Kill', 'Scissor Kick', 'Power']
  },

  // =========================================================================
  // VOLLEYBALL MODULES
  // =========================================================================
  {
    id: 'mod-vb-rules',
    sport: 'volleyball',
    level: 'beginner',
    title: 'Volleyball Rotation & Net Rules',
    category: 'rules',
    coverImage: 'https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?w=600&auto=format&fit=crop&q=80',
    description: '6-player rotation, 3-touch limits, back-row attack rules, libero laws, and center line penetration.',
    lessonIds: ['vb-beg-rules-1'],
    tags: ['Rotation', '3-Touch Limit', 'Libero', 'Net Violations']
  },
  {
    id: 'mod-vb-fundamentals',
    sport: 'volleyball',
    level: 'beginner',
    title: 'Forearm Passing (Bump) & Overhead Setting',
    category: 'fundamentals',
    coverImage: 'https://images.unsplash.com/photo-1592656094267-764a45160876?w=600&auto=format&fit=crop&q=80',
    description: 'Flat forearm platform, leg-powered serve absorption, and triangular soft-finger overhead sets.',
    lessonIds: ['vb-beg-fund-1'],
    tags: ['Bump Pass', 'Setting', 'Platform', 'Leg Drive']
  },
  {
    id: 'mod-vb-techniques',
    sport: 'volleyball',
    level: 'beginner',
    title: '3-Step Approach & Wrist Snap',
    category: 'techniques',
    coverImage: 'https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?w=600&auto=format&fit=crop&q=80',
    description: 'Left-Right-Left spike approach, double-arm backswing, bow-and-arrow arm draw, and topspin snap.',
    lessonIds: ['vb-beg-tech-1'],
    tags: ['Spike Approach', 'Vertical Leap', 'Wrist Snap', 'Arm Swing']
  },
  {
    id: 'mod-vb-strategy',
    sport: 'volleyball',
    level: 'beginner',
    title: 'Defensive Perimeter & 5-1 Formation',
    category: 'strategy',
    coverImage: 'https://images.unsplash.com/photo-1592656094267-764a45160876?w=600&auto=format&fit=crop&q=80',
    description: 'Middle-middle defensive positioning, seam calls in receive, and running the single-setter 5-1.',
    lessonIds: ['vb-beg-strat-1'],
    tags: ['5-1 System', 'Perimeter Defense', 'Seams', 'Transition']
  },
  {
    id: 'mod-vb-advanced',
    sport: 'volleyball',
    level: 'beginner',
    title: 'Jump Float Serve & Block Penetration',
    category: 'advanced',
    coverImage: 'https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?w=600&auto=format&fit=crop&q=80',
    description: 'Knuckleball jump float serve with late diving turbulence, and over-the-net block penetration.',
    lessonIds: ['vb-beg-adv-1'],
    tags: ['Float Serve', 'Blocking', 'Net Penetration', 'Timing']
  }
];

export const STRUCTURED_LESSONS = [
  // =========================================================================
  // BASKETBALL (Complete 5-Stage Path + Level Differentiation)
  // =========================================================================
  {
    id: 'bb-beg-rules-1',
    sport: 'basketball',
    level: 'beginner',
    category: 'rules',
    stage: 1,
    order: 1,
    title: 'Basketball Rules Basics: Court Lines, Violations & Fouls',
    coach: 'Coach Ninh Ly',
    channel: 'Ninh Ly Sports Guide',
    duration: '8 mins',
    difficulty: 'Beginner',
    videoId: 'w4S8jW9L0w0', // Real Basketball Rules
    youtubeId: 'w4S8jW9L0w0',
    module: 'Basketball Rules & Court Officiating',
    skills: ['Court Boundaries', 'Foul Classifications', 'Travelling', 'Shot Clock'],
    weakAreasCovered: ['rules', 'game-regulations', 'court-awareness', 'fouls'],
    description: 'Master boundary lines, travelling, double-dribble, backcourt violation, and shot clock mechanics.',
    recommendationReason: 'Addresses your identified weakness in Basketball Rules from your initial Sports IQ Assessment.',
    learningOutcomes: [
      'Understand key boundary lines: key, three-point arc, baseline, and sideline.',
      'Differentiate between technical fouls, personal fouls, and team foul penalties.',
      'Identify travelling and double-dribble triggers before making your move.',
      'Learn how the 24-second shot clock and 8-second backcourt transition rule work.'
    ],
    prerequisites: []
  },
  {
    id: 'bb-beg-fund-1',
    sport: 'basketball',
    level: 'beginner',
    category: 'fundamentals',
    stage: 2,
    order: 2,
    title: 'Ball Handling Basics: Fingertip Control & Low Stance',
    coach: 'Coach Phil Handy',
    channel: 'Pure Sweat Basketball',
    duration: '11 mins',
    difficulty: 'Beginner',
    videoId: '0mPZ3oI0T3k', // Real Ball Handling & Dribbling drills
    youtubeId: '0mPZ3oI0T3k',
    module: 'Basketball Fundamentals & Ball Mastery',
    skills: ['Fingertip Sensitivity', 'Triple Threat Stance', 'Ball Protection', 'Eyes-Up Posture'],
    weakAreasCovered: ['ball-handling', 'dribbling', 'finger-control', 'ball-security'],
    description: 'Build fingertip sensitivity, protect the ball with your off-arm in a low stance, and eliminate looking down.',
    recommendationReason: 'Targeted drill to address Ball Handling and posture weaknesses identified in your Technical Skills Assessment.',
    learningOutcomes: [
      'Pound dribble mechanics utilizing finger pads instead of palms.',
      'Maintain an active low triple-threat stance for maximum balance.',
      'Keep head and eyes up to scan open passing lanes on the floor.',
      'Protect the basketball against reaching defenders with your lead forearm.'
    ],
    prerequisites: ['bb-beg-rules-1']
  },
  {
    id: 'bb-beg-tech-1',
    sport: 'basketball',
    level: 'beginner',
    category: 'techniques',
    stage: 3,
    order: 3,
    title: 'Beginner Dribbling Practice: Crossover & Change of Pace',
    coach: 'Coach Drew Hanlen',
    channel: 'Drew Hanlen Skills Academy',
    duration: '13 mins',
    difficulty: 'Beginner',
    videoId: 'm4XgK0J9G5o', // Real Crossover & Dribbling Drills
    youtubeId: 'm4XgK0J9G5o',
    module: 'Dribbling Separation & First-Step Footwork',
    skills: ['Knee-Level Crossover', 'Body Weight Shift', 'Acceleration Burst', 'Cone Drills'],
    weakAreasCovered: ['ball-handling', 'crossover', 'dribbling', 'footwork', 'agility'],
    description: 'Execute a crisp below-the-knee crossover dribble combined with rapid acceleration bursts to blow past defenders.',
    recommendationReason: 'Essential technical progression to sharpen your dynamic ball handling and first-step explosiveness.',
    learningOutcomes: [
      'Snap crossover below knee level to prevent ball strips.',
      'Shift your body weight to sell the fake before changing directions.',
      'Explosive first-step footwork out of the crossover release.',
      'Combine stationary stationary pound dribbles with moving cone weaves.'
    ],
    prerequisites: ['bb-beg-fund-1']
  },
  {
    id: 'bb-beg-strat-1',
    sport: 'basketball',
    level: 'beginner',
    category: 'strategy',
    stage: 4,
    order: 4,
    title: 'Offensive Spacing & Pick-and-Roll Fundamentals',
    coach: 'Coach Nick',
    channel: 'BBALLBREAKDOWN',
    duration: '10 mins',
    difficulty: 'Beginner',
    videoId: '3uK41W1nEek', // Real Basketball Offense Spacing
    youtubeId: '3uK41W1nEek',
    module: 'Offensive Spacing & Tactical Defense',
    skills: ['5-Out Spacing', 'On-Ball Screens', 'Drive & Kick', 'Roll Reads'],
    weakAreasCovered: ['strategy', 'spacing', 'court-awareness', 'tactics', 'pick-and-roll'],
    description: 'Understand 5-out floor spacing, drive-and-kick reads, and how to set solid on-ball screens to create open scoring.',
    recommendationReason: 'Enhances tactical understanding of offensive spacing and team play after completing core mechanics.',
    learningOutcomes: [
      'Maintain 15-to-18-foot perimeter spacing to prevent defensive packing.',
      'Correct angle and body positioning for setting an effective on-ball screen.',
      'Read whether the on-ball defender goes over or under the screen.',
      'Hit corner shooters off baseline drive collapses.'
    ],
    prerequisites: ['bb-beg-tech-1']
  },
  {
    id: 'bb-beg-adv-1',
    sport: 'basketball',
    level: 'beginner',
    category: 'advanced',
    stage: 5,
    order: 5,
    title: 'Finishing Around the Rim: Eurostep & Floater Mastery',
    coach: 'Coach Tyler Relph',
    channel: 'Hoop Study',
    duration: '15 mins',
    difficulty: 'Beginner',
    videoId: 'Z6b7bB0-M-Y', // Real Eurostep and Rim Finishing
    youtubeId: 'Z6b7bB0-M-Y',
    module: 'Rim Scoring & Elite Game Execution',
    skills: ['Teardrop Floater', 'Eurostep Gather', 'Reverse Layup', 'Contact Absorption'],
    weakAreasCovered: ['finishing', 'layups', 'floater', 'footwork', 'advanced-skills'],
    description: 'High-level finishing techniques over rim protectors including teardrop floaters and decelerated eurosteps.',
    recommendationReason: 'Crown jewel lesson to complete the Beginner Basketball Learning Path with rim scoring finesse.',
    learningOutcomes: [
      'Two-step gather footwork to sidestep rotating help defenders.',
      'Soft fingertip touch on teardrop floaters outside the restricted area.',
      'Using the backboard angles on reverse baseline finishes.',
      'Absorbing contact at the rim while maintaining shooting arm alignment.'
    ],
    prerequisites: ['bb-beg-strat-1']
  },

  // Basketball Intermediate
  {
    id: 'bb-int-rules-1',
    sport: 'basketball',
    level: 'intermediate',
    category: 'rules',
    stage: 1,
    order: 1,
    title: 'Defensive 3-Seconds & Advanced Match Infractions',
    coach: 'Ref Masterclass',
    channel: 'Hoops Official Clinic',
    duration: '9 mins',
    difficulty: 'Intermediate',
    videoId: 'w4S8jW9L0w0',
    youtubeId: 'w4S8jW9L0w0',
    module: 'Basketball Rules & Court Officiating',
    skills: ['Defensive 3 Seconds', 'Verticality Cylinder', 'Charge/Block Rules', 'Screen Legality'],
    weakAreasCovered: ['rules', 'defensive-rules', 'tactics'],
    description: 'Breakdown of intermediate rules: defensive 3-in-the-key, verticality cylinder rule, and charge/block interpretations.',
    recommendationReason: 'Crucial for intermediate competitive matches to avoid defensive lane penalties.',
    learningOutcomes: [
      'Master the defensive 3-second reset timing when guarding off-ball.',
      'Establish legal defensive guarding position inside the semi-circle.',
      'Understand cylinder verticality rules during contest jumps.',
      'Avoid illegal screen and offensive hook foul calls.'
    ],
    prerequisites: []
  },
  {
    id: 'bb-int-fund-1',
    sport: 'basketball',
    level: 'intermediate',
    category: 'fundamentals',
    stage: 2,
    order: 2,
    title: 'Shooting Pocket & Quick Dip Mechanics Under Pressure',
    coach: 'Coach Colin Castellaw',
    channel: 'ShotMechanics',
    duration: '14 mins',
    difficulty: 'Intermediate',
    videoId: 'sF1xY1w_gBw',
    youtubeId: 'sF1xY1w_gBw',
    module: 'Basketball Fundamentals & Ball Mastery',
    skills: ['Shot Pocket Dip', 'Guide Hand Discipline', '1-2 Step-In', 'Arc Elevation'],
    weakAreasCovered: ['shooting', 'release-speed', 'footwork', 'fundamentals'],
    description: 'Refine your shot dip, guide-hand discipline, and 1-2 step-in footwork to shoot consistently over contesting defenders.',
    recommendationReason: 'Targeted drill based on your Shooting & Release consistency assessment score.',
    learningOutcomes: [
      'Eliminate guide-hand thumb flick to stabilize shooting flight.',
      'Synchronize lower-body dip with upward ball elevation.',
      'Master 1-2 step into hop gather off aggressive closeouts.',
      'High-arcing follow-through with clean index/middle finger release.'
    ],
    prerequisites: ['bb-int-rules-1']
  },
  {
    id: 'bb-int-tech-1',
    sport: 'basketball',
    level: 'intermediate',
    category: 'techniques',
    stage: 3,
    order: 3,
    title: 'In-and-Out Hesitation & Snatch-Back Separation',
    coach: 'Coach Coleman',
    channel: 'By Any Means Basketball',
    duration: '16 mins',
    difficulty: 'Intermediate',
    videoId: 'm4XgK0J9G5o',
    youtubeId: 'm4XgK0J9G5o',
    module: 'Dribbling Separation & First-Step Footwork',
    skills: ['In-and-Out Fake', 'Hang Hesitation', 'Snatch-Back Brake', 'Pull-Up Transition'],
    weakAreasCovered: ['ball-handling', 'separation', 'hesitation', 'techniques'],
    description: 'Pro deceleration moves: the hard in-and-out fake, hang dribble hesitation, and snatch-back crossover to create instant space.',
    recommendationReason: 'Expands your one-on-one shot creation toolkit for competitive league matches.',
    learningOutcomes: [
      'Eyes and shoulder drop commitment on in-and-out counter fakes.',
      'Rapid rear-foot brake plant on step-back separation.',
      'Reading defender hip momentum before triggering the counter move.',
      'Quick transition from dribble move directly into a pull-up jump shot.'
    ],
    prerequisites: ['bb-int-fund-1']
  },
  {
    id: 'bb-int-strat-1',
    sport: 'basketball',
    level: 'intermediate',
    category: 'strategy',
    stage: 4,
    order: 4,
    title: 'Switch-Hunting & Zone Defense Breakdown Strategies',
    coach: 'Coach Dan',
    channel: 'Thinking Basketball',
    duration: '18 mins',
    difficulty: 'Intermediate',
    videoId: '3uK41W1nEek',
    youtubeId: '3uK41W1nEek',
    module: 'Offensive Spacing & Tactical Defense',
    skills: ['High Post Flashes', 'Short Roll Passes', 'Ghost Screens', 'Backdoor Cuts'],
    weakAreasCovered: ['strategy', 'tactics', 'zone-defense', 'game-iq'],
    description: 'Defeating 2-3 and 1-3-1 zone defenses through high-post flashes, overload cuts, and mismatch switch targeting.',
    recommendationReason: 'Sharpens your game IQ against organized club defenses.',
    learningOutcomes: [
      'Operating in the high post free-throw line pocket against 2-3 zone.',
      'Short-roll decision making: pass to corner vs floater finish.',
      'Setting ghost screens to force defensive confusion and miscommunication.',
      'Weak-side baseline backdoor cuts when defense overloads.'
    ],
    prerequisites: ['bb-int-tech-1']
  },
  {
    id: 'bb-int-adv-1',
    sport: 'basketball',
    level: 'intermediate',
    category: 'advanced',
    stage: 5,
    order: 5,
    title: 'Clutch Time Game Management & Lock-down On-Ball Defense',
    coach: 'Coach Phil Beckner',
    channel: 'Pure Sweat Pro',
    duration: '15 mins',
    difficulty: 'Intermediate',
    videoId: 'Z6b7bB0-M-Y',
    youtubeId: 'Z6b7bB0-M-Y',
    module: 'Rim Scoring & Elite Game Execution',
    skills: ['Lateral Chest Containment', 'Hand Mirror Contests', '2-for-1 Clock Play', 'Screen Communication'],
    weakAreasCovered: ['defense', 'clutch', 'game-iq', 'advanced-skills'],
    description: 'Execute textbook perimeter containment without fouling, contest angles, and late-game possession clock management.',
    recommendationReason: 'Prepares you for varsity/district team selection trials and crunch-time execution.',
    learningOutcomes: [
      'Lateral slide footwork and chest containment on driving guards.',
      'Contesting jump shots using high hand mirror without jumping forward.',
      'End-game 2-for-1 offensive clock management.',
      'Defensive communication on flare screens and down screens.'
    ],
    prerequisites: ['bb-int-strat-1']
  },

  // Basketball Advanced
  {
    id: 'bb-adv-fund-1',
    sport: 'basketball',
    level: 'advanced',
    category: 'fundamentals',
    stage: 2,
    order: 1,
    title: 'Elite Biomechanical Shooting Calibration & Off-Balance Fades',
    coach: 'Rob McClanaghan',
    channel: 'Elite Hoops Trainer',
    duration: '18 mins',
    difficulty: 'Advanced',
    videoId: 'sF1xY1w_gBw',
    youtubeId: 'sF1xY1w_gBw',
    module: 'Basketball Fundamentals & Ball Mastery',
    skills: ['Fadeaway Balance', 'High Release Calibration', 'Post Turnarounds', 'Kinetic Transfer'],
    weakAreasCovered: ['shooting', 'biomechanics', 'advanced-skills'],
    description: 'Fine-tuning micro-biomechanics for high-pressure contested shots, fadeaways, and step-back jumpers over athletic length.',
    recommendationReason: 'Recommended for elite shot creators aiming for state/national combine trials.',
    learningOutcomes: [
      'Leg kick-out calibration to counter backwards momentum on fadeaways.',
      'High release point preservation against aggressive shot blockers.',
      'Off-the-catch quick turnarounds out of low post pin-downs.'
    ],
    prerequisites: []
  },
  {
    id: 'bb-adv-strat-1',
    sport: 'basketball',
    level: 'advanced',
    category: 'strategy',
    stage: 4,
    order: 2,
    title: 'Pro Scouting Breakdown: Reading Drop Coverage & Blitzes',
    coach: 'Coach Gibson Pyper',
    channel: 'Half Court Hoops',
    duration: '22 mins',
    difficulty: 'Advanced',
    videoId: '3uK41W1nEek',
    youtubeId: '3uK41W1nEek',
    module: 'Offensive Spacing & Tactical Defense',
    skills: ['Drop Coverage Reads', 'Snake Dribbles', 'Split Double Teams', 'Skip Passes'],
    weakAreasCovered: ['tactics', 'film-study', 'strategy', 'game-iq'],
    description: 'Film breakdown on dissecting defensive drop coverage, trap blitzes, and ice ball screen coverages in transition.',
    recommendationReason: 'Elite sports IQ study for starting point guards and offensive facilitators.',
    learningOutcomes: [
      'Snake dribble technique to put the drop big in conflict.',
      'Split double-team traps with low shoulder dip and wrap pass.',
      'Skip pass trajectory over collapsing help defenders.'
    ],
    prerequisites: ['bb-adv-fund-1']
  },

  // =========================================================================
  // FOOTBALL / SOCCER (5-Stage Path + Level Differentiation)
  // =========================================================================
  {
    id: 'fb-beg-rules-1',
    sport: 'football',
    level: 'beginner',
    category: 'rules',
    stage: 1,
    order: 1,
    title: 'Football Rules Explained: Offside, Fouls & Match Regulations',
    coach: 'UEFA Official Academy',
    channel: 'Ninh Ly Soccer Clinic',
    duration: '10 mins',
    difficulty: 'Beginner',
    videoId: 'fI5s7nQo6dE', // Real Soccer Rules & Offsides
    youtubeId: 'fI5s7nQo6dE',
    module: 'Football Regulations & Tactical Offside Rules',
    skills: ['Offside Line Mechanics', 'Direct vs Indirect Kicks', 'Throw-In Rules', 'Back-Pass Laws'],
    weakAreasCovered: ['rules', 'offside', 'game-regulations', 'positioning'],
    description: 'Pitch layout, referee signals, direct vs indirect free kicks, penalty box rules, and offside line mechanics.',
    recommendationReason: 'Builds vital baseline match rules awareness identified in your football diagnostic test.',
    learningOutcomes: [
      'Master the second-to-last defender offside positioning line.',
      'Differentiate between yellow card threshold fouls and advantage play.',
      'Proper throw-in technique and dead-ball restart procedures.',
      'Goalkeeper pass-back rule and penalty area restrictions.'
    ],
    prerequisites: []
  },
  {
    id: 'fb-beg-fund-1',
    sport: 'football',
    level: 'beginner',
    category: 'fundamentals',
    stage: 2,
    order: 2,
    title: 'Passing & First-Touch Fundamentals: Inside Foot Receiving',
    coach: 'Coach Miller (UEFA B)',
    channel: 'AllAttack Soccer',
    duration: '12 mins',
    difficulty: 'Beginner',
    videoId: 'Kz1JjHk4tFw', // Real First touch and passing drills
    youtubeId: 'Kz1JjHk4tFw',
    module: 'Football Fundamentals: First Touch & Passing',
    skills: ['Inside Instep Pass', 'Half-Turn Receiving', 'Pass Weight Calibration', 'Body Orientation'],
    weakAreasCovered: ['first-touch', 'passing', 'ball-control', 'fundamentals'],
    description: 'Master crisp ground passing with the inside instep and cushion receiving into open space away from pressure.',
    recommendationReason: 'Identified weakness in First Touch and Passing Accuracy from your Skills Assessment.',
    learningOutcomes: [
      'Locking the ankle and pointing the plant foot towards target.',
      'Cushioning ground passes on the half-turn to see the full pitch.',
      'Weight of pass calibration for smooth teammate reception.',
      'Body shape orientation before receiving the ball.'
    ],
    prerequisites: ['fb-beg-rules-1']
  },
  {
    id: 'fb-beg-tech-1',
    sport: 'football',
    level: 'beginner',
    category: 'techniques',
    stage: 3,
    order: 3,
    title: 'Cone Dribbling Mastery & Tight Space Ball Control',
    coach: 'Michael Lewis',
    channel: '7mlc Soccer Skills',
    duration: '15 mins',
    difficulty: 'Beginner',
    videoId: 'n_Xg4B2nN7s', // Real cone dribbling
    youtubeId: 'n_Xg4B2nN7s',
    module: 'Close Dribbling & 1v1 Feints',
    skills: ['Micro Touches', 'Sole Rolls & V-Cuts', 'Head-Up Posture', 'Directional Bursts'],
    weakAreasCovered: ['dribbling', 'ball-control', 'agility', 'techniques'],
    description: 'Sharpen close-control dribbling using inside/outside foot cuts, sole rolls, and rapid directional shifts through cones.',
    recommendationReason: 'Develops agility, close ball security, and bilateral foot confidence.',
    learningOutcomes: [
      'Micro-touches with every stride to keep ball within 1-foot radius.',
      'Sole roll and V-cut transitions around defensive markers.',
      'Head-up posture while navigating traffic in congested midfield zones.',
      'Accelerating explosively out of sharp 90-degree cuts.'
    ],
    prerequisites: ['fb-beg-fund-1']
  },
  {
    id: 'fb-beg-strat-1',
    sport: 'football',
    level: 'beginner',
    category: 'strategy',
    stage: 4,
    order: 4,
    title: 'Pitch Positioning & Defensive Shape Basics (4-3-3 & 4-4-2)',
    coach: 'TacticsHQ Analyst',
    channel: 'Tifo Football',
    duration: '11 mins',
    difficulty: 'Beginner',
    videoId: '3m_q4Z1r8bM', // Real tactics and formations
    youtubeId: '3m_q4Z1r8bM',
    module: 'Tactical Positioning & Pressing Systems',
    skills: ['Passing Triangles', 'Line Compaction', 'Overlapping Runs', 'Zonal Marking'],
    weakAreasCovered: ['tactics', 'positioning', 'spatial-iq', 'strategy'],
    description: 'Responsibilities of defenders, midfielders, and forwards, and how team lines shift cohesively with ball movement.',
    recommendationReason: 'Enhances positional awareness and tactical discipline on the pitch.',
    learningOutcomes: [
      'Understanding positional triangles and passing angles.',
      'Maintaining compact horizontal and vertical distances between lines.',
      'Full-back overlapping and winger inside cut synchronization.',
      'Zonal marking duties during set pieces and corner kicks.'
    ],
    prerequisites: ['fb-beg-tech-1']
  },
  {
    id: 'fb-beg-adv-1',
    sport: 'football',
    level: 'beginner',
    category: 'advanced',
    stage: 5,
    order: 5,
    title: 'Shooting Mechanics: Instep Drive & Curled Finishing',
    coach: 'Coach Joltter',
    channel: 'Unisport Football',
    duration: '14 mins',
    difficulty: 'Beginner',
    videoId: 'E_h3K1b_9e0', // Real shooting tutorial
    youtubeId: 'E_h3K1b_9e0',
    module: 'Shooting Biomechanics & Curled Finishing',
    skills: ['Plant Foot Alignment', 'Chest-Over-Ball Drive', 'Striking Foot Landing', '1v1 Composure'],
    weakAreasCovered: ['shooting', 'finishing', 'weak-foot', 'advanced-skills'],
    description: 'Striking through the center with laces for power, and wrapping inside instep for curled far-post finishes.',
    recommendationReason: 'Final stage module to convert technical mastery into decisive match-winning finishes.',
    learningOutcomes: [
      'Plant foot placement alongside the ball pointing at the goal corner.',
      'Chest over the ball to keep low-driven strikes on target.',
      'Follow-through landing on the striking foot for maximum kinetic transfer.',
      'Composed 1-on-1 placement past the advancing goalkeeper.'
    ],
    prerequisites: ['fb-beg-strat-1']
  },

  // Football Intermediate
  {
    id: 'fb-int-fund-1',
    sport: 'football',
    level: 'intermediate',
    category: 'fundamentals',
    stage: 2,
    order: 1,
    title: 'Aerial Ball Trapping & High-Velocity Ping Passing',
    coach: 'ProSkills Lab',
    channel: 'Progressive Soccer',
    duration: '16 mins',
    difficulty: 'Intermediate',
    videoId: 'Kz1JjHk4tFw',
    youtubeId: 'Kz1JjHk4tFw',
    module: 'Football Fundamentals: First Touch & Passing',
    skills: ['Driven Diagonal Switches', 'Chest Trapping on Run', 'Backspin Strike', 'Scan Timing'],
    weakAreasCovered: ['first-touch', 'long-passing', 'fundamentals'],
    description: 'Execute crisp 40-yard diagonal switches and absorb dipping lofted passes with chest, thigh, and foot cushion.',
    recommendationReason: 'Elevates your passing range and aerial control for competitive 11v11 matches.',
    learningOutcomes: [
      'Striking under the equator of the ball with backspin for driven diagonals.',
      'Soft chest cushioning into forward stride on aerial clearances.',
      'Scanning twice before receiving lofted deliveries.'
    ],
    prerequisites: []
  },
  {
    id: 'fb-int-strat-1',
    sport: 'football',
    level: 'intermediate',
    category: 'strategy',
    stage: 4,
    order: 2,
    title: 'High-Press Triggers & Rapid Transition Counter-Attacks',
    coach: 'Tactics Specialist',
    channel: 'Tifo Football Tactics',
    duration: '18 mins',
    difficulty: 'Intermediate',
    videoId: '3m_q4Z1r8bM',
    youtubeId: '3m_q4Z1r8bM',
    module: 'Tactical Positioning & Pressing Systems',
    skills: ['Pressing Triggers', 'Cover Shadows', 'Vertical Outlet Passes', 'Sideline Traps'],
    weakAreasCovered: ['tactics', 'pressing', 'counter-attack', 'strategy'],
    description: 'Learn how modern squads initiate coordinated pressing traps when opponents play backward passes or receive facing goal.',
    recommendationReason: 'Critical tactical study based on your Tactical Positioning assessment results.',
    learningOutcomes: [
      'Recognizing pressing triggers: poor touch, backward pass, sideline trap.',
      'Covering shadow angles to intercept outlet passing lanes.',
      'Direct vertical transition sequences immediately after winning possession.'
    ],
    prerequisites: ['fb-int-fund-1']
  },

  // =========================================================================
  // CRICKET (Structured 5-Stage Path)
  // =========================================================================
  {
    id: 'cr-beg-rules-1',
    sport: 'cricket',
    level: 'beginner',
    category: 'rules',
    stage: 1,
    order: 1,
    title: 'Cricket Rules Masterclass: Dismissals, Overs & Powerplays',
    coach: 'ICC Certified Coach',
    channel: 'Ninh Ly Cricket Guide',
    duration: '10 mins',
    difficulty: 'Beginner',
    videoId: 'AqtpNkMvj58', // Real Cricket Rules
    youtubeId: 'AqtpNkMvj58',
    module: 'Cricket Laws, Dismissals & Powerplays',
    skills: ['LBW Zones', 'Powerplay Field Caps', 'Dead Ball Laws', 'No-Ball Warnings'],
    weakAreasCovered: ['rules', 'lbw', 'game-regulations', 'cricket-iq'],
    description: 'Learn the 10 methods of dismissal, LBW pitch zones, no-balls, wide deliveries, and powerplay field limits.',
    recommendationReason: 'Foundational module to master cricket match rules and umpire signaling.',
    learningOutcomes: [
      'Understanding LBW criteria: pitching, impact in line, and hitting wickets.',
      'Field restrictions during mandatory batting powerplays.',
      'Dead ball scenarios, over-throws, and bye/leg-bye scoring.',
      'Differentiate between front-foot no balls and above-waist height warnings.'
    ],
    prerequisites: []
  },
  {
    id: 'cr-beg-fund-1',
    sport: 'cricket',
    level: 'beginner',
    category: 'fundamentals',
    stage: 2,
    order: 2,
    title: 'Batting Stance, Grip (V-Grip) & Backlift Alignment',
    coach: 'Coach Gary Palmer',
    channel: 'Cricket Masterclass',
    duration: '13 mins',
    difficulty: 'Beginner',
    videoId: 'u4Z9X0b7Y6Q', // Real batting fundamentals
    youtubeId: 'u4Z9X0b7Y6Q',
    module: 'Batting Stance, Grip & Backlift Mechanics',
    skills: ['V-Grip Alignment', 'Shoulder-Width Base', 'Slip Backlift', 'Stationary Head Position'],
    weakAreasCovered: ['batting', 'stance', 'grip', 'fundamentals'],
    description: 'Establish a rock-solid batting foundation with the classic top-hand V-grip, side-on balanced stance, and high backlift.',
    recommendationReason: 'Targeted drill to correct balance and bat speed identified in your Batting Assessment.',
    learningOutcomes: [
      'Forming both Vs on the bat handle pointing between splice and outside edge.',
      'Maintaining shoulder-width base with eyes level on the bowler release point.',
      'Smooth backlift toward second slip for maximum downswing velocity.',
      'Head stationary directly over the ball on contact.'
    ],
    prerequisites: ['cr-beg-rules-1']
  },
  {
    id: 'cr-beg-tech-1',
    sport: 'cricket',
    level: 'beginner',
    category: 'techniques',
    stage: 3,
    order: 3,
    title: 'Cover Drive & Straight Drive Footwork Mastery',
    coach: 'Coach Simon Jones',
    channel: 'Pro Cricket Coaching',
    duration: '15 mins',
    difficulty: 'Beginner',
    videoId: 'd6y8Q1w4m9E',
    youtubeId: 'd6y8Q1w4m9E',
    module: 'Front-Foot Driving & Footwork Mastery',
    skills: ['Front-Toe Step', 'High Leading Elbow', 'Front-Knee Bend', 'Sweet Spot Contact'],
    weakAreasCovered: ['batting', 'front-foot', 'drive', 'techniques'],
    description: 'Signature front-foot drives: transferring weight forward, bending the front knee, and presenting the full bat face.',
    recommendationReason: 'Essential technical shot development to dominate over-pitched deliveries.',
    learningOutcomes: [
      'Stepping forward with front toe pointing toward the ball trajectory.',
      'Leading with the elbow high to keep strokes along the carpet.',
      'Weight transfer on front foot with head over the contact point.',
      'Presenting full blade of the bat for maximum sweet-spot impact.'
    ],
    prerequisites: ['cr-beg-fund-1']
  },
  {
    id: 'cr-beg-strat-1',
    sport: 'cricket',
    level: 'beginner',
    category: 'strategy',
    stage: 4,
    order: 4,
    title: 'Field Placements, Strike Rotation & Running Between Wickets',
    coach: 'Tactical Analyst',
    channel: 'Cricket IQ Breakdown',
    duration: '12 mins',
    difficulty: 'Beginner',
    videoId: 'e2k8R9w4n1L',
    youtubeId: 'e2k8R9w4n1L',
    module: 'Strike Rotation, Running & Field Placements',
    skills: ['Crease Bat Extension', 'Yes/No Calling', 'Gap Placement', 'Innings Run Rate Pacing'],
    weakAreasCovered: ['strategy', 'running-between-wickets', 'tactics', 'cricket-iq'],
    description: 'Master calling systems (Yes/No/Wait), turning sharply at the crease with bat sliding, and dropping the ball into gaps.',
    recommendationReason: 'Improves match situation awareness and partnership building.',
    learningOutcomes: [
      'Crisp, loud calls on single opportunities to prevent run-outs.',
      'Grounded bat extension past the popping crease on every turn.',
      'Identifying boundary protection gaps and field sweeper positions.',
      'Pacing an innings based on required run rate in limited-overs matches.'
    ],
    prerequisites: ['cr-beg-tech-1']
  },
  {
    id: 'cr-beg-adv-1',
    sport: 'cricket',
    level: 'beginner',
    category: 'advanced',
    stage: 5,
    order: 5,
    title: 'Bowling Precision: Seam Presentation, Release & Yorkers',
    coach: 'Wasim Akram Masterclass',
    channel: 'Pace Bowling Academy',
    duration: '16 mins',
    difficulty: 'Beginner',
    videoId: 'h5Y3q1w9P0e',
    youtubeId: 'h5Y3q1w9P0e',
    module: 'Pace Bowling: Seam Position & Yorkers',
    skills: ['Upright Seam Lock', '15-Pace Approach', 'Base-of-Stump Yorker', 'Late In-Drift'],
    weakAreasCovered: ['bowling', 'yorker', 'seam-position', 'advanced-skills'],
    description: 'Learn seam alignment, wrist position behind the ball, repeatable run-up rhythm, and executing the toe-crushing yorker.',
    recommendationReason: 'Completes the core cricket progression with clinical bowling execution.',
    learningOutcomes: [
      'Upright seam wobble prevention through locked wrist release.',
      'Consistent 12-to-15 pace approach run-up with bound momentum.',
      'Hitting the base of the stumps on full yorker lengths under pressure.',
      'Varying seam angle for subtle late away-swing and in-drift.'
    ],
    prerequisites: ['cr-beg-strat-1']
  },

  // =========================================================================
  // ATHLETICS / TRACK & FIELD (5-Stage Path)
  // =========================================================================
  {
    id: 'ath-beg-rules-1',
    sport: 'athletics',
    level: 'beginner',
    category: 'rules',
    stage: 1,
    order: 1,
    title: 'Sprint Regulations: Starting Blocks, False Starts & Lane Infringements',
    coach: 'World Athletics Official',
    channel: 'Track & Field Guide',
    duration: '8 mins',
    difficulty: 'Beginner',
    videoId: '8yq1W4P0m8k',
    youtubeId: '8yq1W4P0m8k',
    module: 'Sprint Regulations & Block Start Laws',
    skills: ['Gun Commands & Set Position', 'False Start <0.100s Threshold', 'Curve Stepping Rules', 'Baton Exchange Boxes'],
    weakAreasCovered: ['rules', 'false-start', 'lane-discipline', 'athletics-iq'],
    description: 'Learn official sprint rules: "On your marks" / "Set" commands, reaction time threshold, and lane line stepping penalties.',
    recommendationReason: 'Essential regulations baseline for competitive track meets.',
    learningOutcomes: [
      'Master the starting gun commands and steady position requirements.',
      'Understand zero-tolerance false start disqualification rules.',
      'Lane discipline rules on curves in 200m and 400m races.',
      'Baton exchange zone boundaries for 4x100m sprint relays.'
    ],
    prerequisites: []
  },
  {
    id: 'ath-beg-fund-1',
    sport: 'athletics',
    level: 'beginner',
    category: 'fundamentals',
    stage: 2,
    order: 2,
    title: 'Sprint Mechanics: Posture, Ankle Stiffness & Arm Swing',
    coach: 'Coach Ralph Mann',
    channel: 'Sprint Biomechanics Lab',
    duration: '14 mins',
    difficulty: 'Beginner',
    videoId: '9vX4k8m0P1Q',
    youtubeId: '9vX4k8m0P1Q',
    module: 'Sprint Posture & Biomechanical Form',
    skills: ['Neutral Pelvis Posture', 'Hip-to-Chin Arm Drive', 'Ankle Dorsiflexion', 'Under-Hip Ground Strike'],
    weakAreasCovered: ['sprint-mechanics', 'posture', 'arm-swing', 'fundamentals'],
    description: 'Upright sprint posture, relaxed facial muscles, compact 90-degree arm drive, and stiff dorsiflexed ankles.',
    recommendationReason: 'Addresses running form and energy leak weaknesses identified in your Sprint Assessment.',
    learningOutcomes: [
      'Maintaining tall neutral pelvis alignment to prevent anterior tilt.',
      'Driving arms forward and backward without lateral chest crossing.',
      'Active ankle dorsiflexion ("toes up") prior to ground contact.',
      'Minimizing braking forces through ball-of-foot strike directly under hips.'
    ],
    prerequisites: ['ath-beg-rules-1']
  },
  {
    id: 'ath-beg-tech-1',
    sport: 'athletics',
    level: 'beginner',
    category: 'techniques',
    stage: 3,
    order: 3,
    title: 'Block Start Acceleration & Drive Phase Mechanics',
    coach: 'Coach Vince Anderson',
    channel: 'Speed Academy Elite',
    duration: '16 mins',
    difficulty: 'Beginner',
    videoId: '3uK41W1nEek',
    youtubeId: '3uK41W1nEek',
    module: 'Block Starts & Drive Phase Acceleration',
    skills: ['Block Spacing Setup', 'Dual Leg Drive', 'Low Heel Recovery', 'Posture Unfolding'],
    weakAreasCovered: ['acceleration', 'block-starts', 'drive-phase', 'techniques'],
    description: 'Block spacing setup, 45-degree push-off angle, low heel recovery, and progressive head rise over first 30m.',
    recommendationReason: 'Crucial technical drill to cut tenths of a second off your 60m and 100m sprint starts.',
    learningOutcomes: [
      'Setting front block 2 shoe-lengths from line, rear block 3 shoe-lengths.',
      'Simultaneous drive from both legs upon starter gun release.',
      'Low heel recovery on initial 5 steps to maintain forward force vector.',
      'Gradual posture unfolding from drive phase into upright top speed.'
    ],
    prerequisites: ['ath-beg-fund-1']
  },
  {
    id: 'ath-beg-strat-1',
    sport: 'athletics',
    level: 'beginner',
    category: 'strategy',
    stage: 4,
    order: 4,
    title: 'Sprint Pacing Strategy & Energy System Distribution (100m-400m)',
    coach: 'Coach Loren Seagrave',
    channel: 'Speed & Conditioning Lab',
    duration: '12 mins',
    difficulty: 'Beginner',
    videoId: 'w4S8jW9L0w0',
    youtubeId: 'w4S8jW9L0w0',
    module: 'Race Modeling & Energy System Distribution',
    skills: ['100m Phase Modeling', '200m Slingshot Curve', '400m Lactate Pacing', 'Pre-Race Breath Focus'],
    weakAreasCovered: ['pacing', 'energy-distribution', 'strategy', 'athletics-iq'],
    description: 'Race modeling: acceleration, maximum velocity, and speed endurance deceleration management for 100m-400m events.',
    recommendationReason: 'Teaches strategic pacing to avoid blowing up in the final 50 meters.',
    learningOutcomes: [
      '100m race phases: 0-30m acceleration, 30-60m max velocity, 60-100m maintenance.',
      '200m curve running mechanics and slingshot into home straight.',
      '400m differential pacing: first 200m vs second 200m lactate threshold.',
      'Breath control and mental focus routines before stepping into blocks.'
    ],
    prerequisites: ['ath-beg-tech-1']
  },
  {
    id: 'ath-beg-adv-1',
    sport: 'athletics',
    level: 'beginner',
    category: 'advanced',
    stage: 5,
    order: 5,
    title: 'Top-End Max Velocity & High-Speed Deceleration Resistance',
    coach: 'Coach Dan Pfaff',
    channel: 'ALTIS Track & Field',
    duration: '18 mins',
    difficulty: 'Beginner',
    videoId: '0mPZ3oI0T3k',
    youtubeId: '0mPZ3oI0T3k',
    module: 'Max Velocity & High-Speed Resistance',
    skills: ['Front-Side Knee Punch', 'Ground Contact <0.090s', 'Acidosis Relaxation', 'Finish Line Torso Dip'],
    weakAreasCovered: ['max-velocity', 'stride-frequency', 'speed-endurance', 'advanced-skills'],
    description: 'Peak stride frequency and force output over the final 40 meters while resisting postural breakdown and fatigue.',
    recommendationReason: 'Capstone lesson to reach elite track performance standards.',
    learningOutcomes: [
      'Front-side mechanics dominance with aggressive knee punch.',
      'High ground reaction force with contact time under 0.090 seconds.',
      'Relaxation cues under high lactic acidosis.',
      'Finish line torso dip and lunge technique.'
    ],
    prerequisites: ['ath-beg-strat-1']
  },

  // =========================================================================
  // TENNIS (5-Stage Path)
  // =========================================================================
  {
    id: 'tn-beg-rules-1',
    sport: 'tennis',
    level: 'beginner',
    category: 'rules',
    stage: 1,
    order: 1,
    title: 'Tennis Scoring System, Court Boundaries & Fault Rules',
    coach: 'Coach Nick Saviano',
    channel: 'Ninh Ly Tennis Clinic',
    duration: '9 mins',
    difficulty: 'Beginner',
    videoId: '5-mR5cWn8wM',
    youtubeId: '5-mR5cWn8wM',
    module: 'Tennis Scoring System & Court Lines',
    skills: ['Game-Set-Match Scoring', 'Super Tiebreak Format', 'Service Box Limits', 'Singles vs Doubles Lines'],
    weakAreasCovered: ['rules', 'scoring', 'court-lines', 'tennis-iq'],
    description: 'Understand love-15-30-40 scoring, deuce and advantage, tiebreak regulations, and singles vs doubles sidelines.',
    recommendationReason: 'Essential foundation to understand official match play and tournament scoring.',
    learningOutcomes: [
      'Master the 15-30-40-game-set scoring structure.',
      '7-point and 10-point super tiebreak formats.',
      'Service box limits, let serves, and double fault rules.',
      'Singles alley vs doubles alley line boundaries.'
    ],
    prerequisites: []
  },
  {
    id: 'tn-beg-fund-1',
    sport: 'tennis',
    level: 'beginner',
    category: 'fundamentals',
    stage: 2,
    order: 2,
    title: 'Eastern & Semi-Western Racket Grips and Ready Position',
    coach: 'Coach Tom Avery',
    channel: 'Feel Tennis Lessons',
    duration: '13 mins',
    difficulty: 'Beginner',
    videoId: 'Kz1JjHk4tFw',
    youtubeId: 'Kz1JjHk4tFw',
    module: 'Tennis Grips & Dynamic Ready Position',
    skills: ['8 Bevel Identification', 'Semi-Western Forehand', 'Continental Grip', 'Split Step Timing'],
    weakAreasCovered: ['grip', 'ready-position', 'footwork', 'fundamentals'],
    description: 'Learn proper bevel placement for Continental, Eastern, and Semi-Western grips with split-step ready posture.',
    recommendationReason: 'Corrects grip inconsistencies identified in your Baseline Stroke Assessment.',
    learningOutcomes: [
      'Identifying the 8 bevels on the tennis racket handle.',
      'Semi-Western forehand grip for effortless topspin generation.',
      'Continental grip mastery for serves, volleys, and slices.',
      'Split-step timing synchronized with opponent contact point.'
    ],
    prerequisites: ['tn-beg-rules-1']
  },
  {
    id: 'tn-beg-tech-1',
    sport: 'tennis',
    level: 'beginner',
    category: 'techniques',
    stage: 3,
    order: 3,
    title: 'Topspin Forehand Stroke Biomechanics & Low-to-High Swing',
    coach: 'Coach Jeff Salzenstein',
    channel: 'Total Tennis Academy',
    duration: '16 mins',
    difficulty: 'Beginner',
    videoId: 'm4XgK0J9G5o',
    youtubeId: 'm4XgK0J9G5o',
    module: 'Topspin Forehand & Low-to-High Swing',
    skills: ['Shoulder Unit Turn', 'Low-to-High Racket Drop', 'Windshield Wiper Finish', 'Front Waist Contact'],
    weakAreasCovered: ['forehand', 'topspin', 'swing-path', 'techniques'],
    description: 'Master unit turn, racket drop below the ball, windshield wiper follow-through, and brushing topspin.',
    recommendationReason: 'Builds deep, consistent baseline rallying power with built-in net clearance.',
    learningOutcomes: [
      'Coiling shoulders in the unit turn prior to forward racket swing.',
      'Dropping racket tip below contact point for low-to-high path.',
      'Windshield wiper follow-through over the non-dominant shoulder.',
      'Striking ball at comfortable waist height out in front of body.'
    ],
    prerequisites: ['tn-beg-fund-1']
  },
  {
    id: 'tn-beg-strat-1',
    sport: 'tennis',
    level: 'beginner',
    category: 'strategy',
    stage: 4,
    order: 4,
    title: 'Crosscourt Baseline Patterns & High-Percentage Tennis',
    coach: 'Coach Wardlaw',
    channel: 'Tactical Tennis Lab',
    duration: '11 mins',
    difficulty: 'Beginner',
    videoId: '3m_q4Z1r8bM',
    youtubeId: '3m_q4Z1r8bM',
    module: 'Crosscourt Baseline Rally Patterns',
    skills: ['Lowest Net Clearance', 'Angle Bisect Recovery', 'Short Ball Transitions', 'Backhand Wing Targeting'],
    weakAreasCovered: ['strategy', 'crosscourt', 'shot-selection', 'tactics'],
    description: 'Why crosscourt rallies give you the lowest net height and longest court distance, reducing errors by 40%.',
    recommendationReason: 'Transforms frantic shot-making into disciplined, winning point construction.',
    learningOutcomes: [
      'Playing over the lowest part of the net in crosscourt exchanges.',
      'Recovering to the bisecting angle of opponent possible returns.',
      'Recognizing short balls to transition from rally ball to approach shot.',
      'Targeting opponent weaker wing (backhand) consistently.'
    ],
    prerequisites: ['tn-beg-tech-1']
  },
  {
    id: 'tn-beg-adv-1',
    sport: 'tennis',
    level: 'beginner',
    category: 'advanced',
    stage: 5,
    order: 5,
    title: 'Flat & Kick Serve Mechanics: Toss, Trophy Pose & Pronation',
    coach: 'Coach Patrick Mouratoglou',
    channel: 'Mouratoglou Tennis Academy',
    duration: '17 mins',
    difficulty: 'Beginner',
    videoId: 'E_h3K1b_9e0',
    youtubeId: 'E_h3K1b_9e0',
    module: 'Flat & Kick Serve Biomechanics',
    skills: ['Trophy Pose Arch', '1 O’Clock Toss Release', 'Forearm Internal Pronation', 'Landing Balance'],
    weakAreasCovered: ['serve', 'kick-serve', 'pronation', 'advanced-skills'],
    description: 'Trophy pose, consistent forward ball toss at 1 o’clock, racket drop into back scratch, and explosive pronation.',
    recommendationReason: 'Complete your tennis journey with a dominant, unreturnable first serve weapon.',
    learningOutcomes: [
      'Consistent ball toss release height with relaxed left arm.',
      'Deep knee bend and hip drive into the court.',
      'Forearm internal rotation/pronation for speed without shoulder strain.',
      'Land on front foot inside baseline ready for return plus-one.'
    ],
    prerequisites: ['tn-beg-strat-1']
  },

  // =========================================================================
  // BADMINTON (3 Primary Real Videos for Recommended Section + 5-Stage Path)
  // =========================================================================
  {
    id: 'bd-beg-rules-1',
    sport: 'badminton',
    level: 'beginner',
    category: 'rules',
    stage: 1,
    order: 1,
    title: 'Badminton Rules',
    coach: 'BWF Official Clinic',
    channel: 'Badminton Insights',
    duration: '1 min',
    difficulty: 'Beginner',
    url: 'https://youtube.com/shorts/7PCnyBk2O5s?si=7oA8Q70DXUDeDcu1',
    videoId: '7PCnyBk2O5s', // Real Badminton Rules Shorts
    youtubeId: '7PCnyBk2O5s',
    module: 'Badminton Regulations & Rules',
    skill: 'Badminton Rules',
    skills: ['Badminton Rules', 'Service Lines', 'Fault Rules', 'Scoring System'],
    weakAreasCovered: ['rules', 'badminton-rules', 'regulations', 'service-rules', 'scoring', 'court-lines'],
    description: 'Essential badminton rules breakdown: official service limits, court boundary lines, fault triggers, and match scoring regulations.',
    recommendationReason: 'Addresses your identified weakness in Badminton Rules from your initial Sports IQ Assessment.',
    learningOutcomes: [
      'Understand singles long-and-narrow vs doubles short-and-wide service boxes.',
      'Comply with the 1.15m fixed service height regulation.',
      'Shuttlecock boundary line rules and net touch infractions.',
      'Rally scoring up to 21 points and deuce advantage criteria.'
    ],
    prerequisites: []
  },
  {
    id: 'bd-beg-fund-1',
    sport: 'badminton',
    level: 'beginner',
    category: 'fundamentals',
    stage: 2,
    order: 2,
    title: 'Badminton Basics',
    coach: 'Coach Lee Jae Bok',
    channel: 'Lee Jae Bok Badminton',
    duration: '12 mins',
    difficulty: 'Beginner',
    url: 'https://youtu.be/7Oo98XY0rtA?si=D7kR724CJBmVgJs5',
    videoId: '7Oo98XY0rtA', // Real Badminton Basics Full Video
    youtubeId: '7Oo98XY0rtA',
    module: 'Badminton Basics & Fundamentals',
    skill: 'Badminton Basics',
    skills: ['Badminton Basics', 'Forehand/Backhand Grip', 'Ready Stance', '6-Corner Footwork'],
    weakAreasCovered: ['fundamentals', 'badminton-basics', 'basics', 'grip', 'footwork', 'stance'],
    description: 'Master foundational badminton basics including essential racket grips, athletic ready stance, and court footwork mechanics.',
    recommendationReason: 'Targeted fundamental coaching to build core racket grip, ready position, and court balance.',
    learningOutcomes: [
      'Master the relaxed V-grip and thumb bevel transition for backhand strokes.',
      'Establish a dynamic split-step ready stance for explosive multi-directional movement.',
      'Execute 6-corner court footwork without off-balance overextension.',
      'Immediate recovery to the central court base position after every hit.'
    ],
    prerequisites: ['bd-beg-rules-1']
  },
  {
    id: 'bd-beg-tech-1',
    sport: 'badminton',
    level: 'beginner',
    category: 'techniques',
    stage: 3,
    order: 3,
    title: 'Badminton Next Step on Skills',
    coach: 'Coach Zhao Jianhua',
    channel: 'Badminton Racket Skills',
    duration: '1 min',
    difficulty: 'Beginner',
    url: 'https://youtube.com/shorts/j4_8W5tNmD4?si=joz9LEW918TLyp2D',
    videoId: 'j4_8W5tNmD4', // Real Badminton Next Step on Skills Shorts
    youtubeId: 'j4_8W5tNmD4',
    module: 'Badminton Next Step Skills & Drills',
    skill: 'Next Step Skills',
    skills: ['Next Step Skills', 'Shot Techniques', 'Wrist Action', 'Stroke Timing'],
    weakAreasCovered: ['techniques', 'skills', 'next-step-skills', 'stroke', 'wrist-action', 'shot-control', 'drop-shot'],
    description: 'Elevate your game with next-step badminton skills: dynamic shot control, deceptive wrist action, and smooth stroke execution.',
    recommendationReason: 'Targeted technical progression to master next-step stroke execution and shot precision.',
    learningOutcomes: [
      'Pronate forearm and snap wrist at point of impact for rapid shuttle acceleration.',
      'Disguise overhead clears and steep drop shots using identical preparation.',
      'Maintain compact stroke mechanics to minimize recovery lag time.',
      'Execute consistent high-percentage crosscourt and down-the-line returns.'
    ],
    prerequisites: ['bd-beg-fund-1']
  },
  {
    id: 'bd-beg-strat-1',
    sport: 'badminton',
    level: 'beginner',
    category: 'strategy',
    stage: 4,
    order: 4,
    title: 'Singles Match Strategy: 4-Corner Shuttle Manipulation',
    coach: 'Coach Peter Gade',
    channel: 'Peter Gade Badminton Lab',
    duration: '12 mins',
    difficulty: 'Beginner',
    videoId: '3m_q4Z1r8bM',
    youtubeId: '3m_q4Z1r8bM',
    module: '4-Corner Shuttle Manipulation Strategy',
    skill: 'Match Strategy',
    skills: ['Half-Second Shot Holding', 'Fast Flat Clears', 'Line Push Placements', 'Rally Energy Management'],
    weakAreasCovered: ['strategy', 'tactics', 'court-movement', 'badminton-iq'],
    description: 'Pull opponents out of balance by moving them consecutively between diagonally opposite court corners.',
    recommendationReason: 'Develops ruthless tactical point construction for competitive singles matches.',
    learningOutcomes: [
      'Holding your shot half a second to freeze opponent split step.',
      'Attacking the opponent backhand rear corner with fast flat clears.',
      'Pushing loose net shots down the line into empty space.',
      'Managing energy expenditure in long 30-shot rallies.'
    ],
    prerequisites: ['bd-beg-tech-1']
  },
  {
    id: 'bd-beg-adv-1',
    sport: 'badminton',
    level: 'beginner',
    category: 'advanced',
    stage: 5,
    order: 5,
    title: 'Steep Jump Smash & Net Kill Reflex Execution',
    coach: 'Coach Lin Dan Academy',
    channel: 'Super Series Badminton',
    duration: '16 mins',
    difficulty: 'Beginner',
    videoId: 'E_h3K1b_9e0',
    youtubeId: 'E_h3K1b_9e0',
    module: 'Jump Smash & Net Kill Reflexes',
    skill: 'Jump Smash & Net Kills',
    skills: ['Scissor Kick Jump', 'High Extension Angle', 'Compact Net Tap Snap', 'Landing Recovery'],
    weakAreasCovered: ['smash', 'jump-smash', 'net-kill', 'advanced-skills'],
    description: 'Jump timing, scissor kick leg switch, steep downward angle contact, and lightning-fast net kill tap reflexes.',
    recommendationReason: 'Crown jewel lesson for explosive offensive finishing power.',
    learningOutcomes: [
      'Scissor kick footwork in mid-air to generate core torque.',
      'Striking at highest extension point for steep court penetration.',
      'Short compact forearm snap for aggressive net kills without touching mesh.',
      'Rapid recovery from jump landing into defensive base.'
    ],
    prerequisites: ['bd-beg-strat-1']
  },

  // =========================================================================
  // VOLLEYBALL (5-Stage Path)
  // =========================================================================
  {
    id: 'vb-beg-rules-1',
    sport: 'volleyball',
    level: 'beginner',
    category: 'rules',
    stage: 1,
    order: 1,
    title: 'Volleyball Rules: Rotation, 3-Touch Limit & Net Violations',
    coach: 'FIVB Instructor',
    channel: 'Ninh Ly Volleyball Guide',
    duration: '8 mins',
    difficulty: 'Beginner',
    videoId: 'w4S8jW9L0w0',
    youtubeId: 'w4S8jW9L0w0',
    module: 'Volleyball Rotation & Net Rules',
    skills: ['Clockwise Rotation', 'Back-Row Attack Rules', 'Libero Substitutions', 'Center Line Crossing'],
    weakAreasCovered: ['rules', 'rotation', 'net-violations', 'volleyball-iq'],
    description: 'Learn 6-player court rotation, back-row attack restrictions, 3-touch maximum rule, and net touch infractions.',
    recommendationReason: 'Essential regulations baseline for structured team play and match rotation.',
    learningOutcomes: [
      'Clockwise player rotation upon winning service back.',
      'Libero substitution rules and back-court defense limits.',
      'Center line foot penetration rules under the net.',
      'Legal contact criteria: no catching, lifting, or double hits.'
    ],
    prerequisites: []
  },
  {
    id: 'vb-beg-fund-1',
    sport: 'volleyball',
    level: 'beginner',
    category: 'fundamentals',
    stage: 2,
    order: 2,
    title: 'Forearm Passing (Bump) & Overhead Setting Mechanics',
    coach: 'Coach Donny',
    channel: 'Elevate Yourself Volleyball',
    duration: '15 mins',
    difficulty: 'Beginner',
    videoId: '0mPZ3oI0T3k',
    youtubeId: '0mPZ3oI0T3k',
    module: 'Forearm Passing (Bump) & Overhead Setting',
    skills: ['Flat Passing Platform', 'Leg Serve Absorption', 'Soft-Finger Window Setting', '3-Foot Off-Net Target'],
    weakAreasCovered: ['passing', 'bump', 'setting', 'fundamentals'],
    description: 'Build a flat forearm platform, absorb hard incoming serves with leg extension, and execute soft-finger overhead sets.',
    recommendationReason: 'Targeted drill based on your Serve-Receive & Passing accuracy assessment score.',
    learningOutcomes: [
      'Locking thumbs and elbows to create a wide, flat passing platform.',
      'Shrugging shoulders and using legs instead of swinging arms.',
      'Triangular soft-finger window shape for clean overhead setting.',
      'Directing sets high and 3 feet off the net for easy hitter approach.'
    ],
    prerequisites: ['vb-beg-rules-1']
  },
  {
    id: 'vb-beg-tech-1',
    sport: 'volleyball',
    level: 'beginner',
    category: 'techniques',
    stage: 3,
    order: 3,
    title: '3-Step Approach & Overhead Spike Arm Swing Mechanics',
    coach: 'Coach Mark Lebedew',
    channel: 'Volleyball Spike Lab',
    duration: '16 mins',
    difficulty: 'Beginner',
    videoId: 'm4XgK0J9G5o',
    youtubeId: 'm4XgK0J9G5o',
    module: '3-Step Spike Approach & Wrist Snap',
    skills: ['Left-Right-Left Approach', 'Double Arm Backswing', 'Bow & Arrow Draw', 'Topspin Wrist Wrap'],
    weakAreasCovered: ['spiking', 'vertical-jump', 'arm-swing', 'techniques'],
    description: '4-step spike approach, high double-arm backswing, and high contact wrist snap on the ball.',
    recommendationReason: 'Develops explosive vertical leap and clean downward spike trajectory.',
    learningOutcomes: [
      'Accelerating last two steps (plant and brake) for maximal vertical conversion.',
      'Bow-and-arrow arm draw with high non-hitting guide hand.',
      'Wrapping open palm over top half of ball for crisp topspin dip.',
      'Balanced two-foot landing to protect knees and avoid net contact.'
    ],
    prerequisites: ['vb-beg-fund-1']
  },
  {
    id: 'vb-beg-strat-1',
    sport: 'volleyball',
    level: 'beginner',
    category: 'strategy',
    stage: 4,
    order: 4,
    title: 'Defensive Perimeter Coverage, Free Ball Transition & 5-1 Strategy',
    coach: 'Coach Hugh McCutcheon',
    channel: 'USA Volleyball Academy',
    duration: '13 mins',
    difficulty: 'Beginner',
    videoId: '3m_q4Z1r8bM',
    youtubeId: '3m_q4Z1r8bM',
    module: 'Defensive Perimeter & 5-1 Formation',
    skills: ['Crosscourt Dig Posture', 'Passer Seam Calls', 'Free Ball Hitter Drops', 'Middle 1-Ball Option'],
    weakAreasCovered: ['strategy', 'defense', 'rotation-systems', 'volleyball-iq'],
    description: 'Middle-middle and rotational defense setups, calling seams in serve-receive, and executing the 5-1 single-setter offense.',
    recommendationReason: 'Enhances court communication and team defensive positioning.',
    learningOutcomes: [
      'Perimeter defensive positioning for digging hard crosscourt spikes.',
      'Seam communication: taking responsibility for balls between passers.',
      'Transitioning off the net into ready hitting positions on free balls.',
      'Running quick middle 1-balls to hold opponent blockers.'
    ],
    prerequisites: ['vb-beg-tech-1']
  },
  {
    id: 'vb-beg-adv-1',
    sport: 'volleyball',
    level: 'beginner',
    category: 'advanced',
    stage: 5,
    order: 5,
    title: 'Jump Float Serve & Read-and-React Block Penetration',
    coach: 'Coach John Speraw',
    channel: 'Pro Volleyball Training',
    duration: '17 mins',
    difficulty: 'Beginner',
    videoId: 'E_h3K1b_9e0',
    youtubeId: 'E_h3K1b_9e0',
    module: 'Jump Float Serve & Block Penetration',
    skills: ['Firm Palm Knuckleball', 'Turbulence Dip Release', 'Net Hand Spread Penetration', 'Line Funnel Angle'],
    weakAreasCovered: ['serve', 'float-serve', 'blocking', 'advanced-skills'],
    description: 'Knuckleball jump float serve that drops unpredictably, combined with solid over-the-net blocking penetration.',
    recommendationReason: 'Equips you with a dangerous match-opening serve and impenetrable net wall.',
    learningOutcomes: [
      'Striking dead center of ball with firm flat palm and zero follow-through.',
      'Air turbulence exploitation creating unpredictable late dive.',
      'Pressing hands over the net with fingers spread and core engaged.',
      'Sealing the sideline block angle to funnel hits to the libero.'
    ],
    prerequisites: ['vb-beg-strat-1']
  }
];

/**
 * Helper to get default weak areas for sports if none configured yet
 */
export const DEFAULT_SPORT_WEAK_AREAS = {
  badminton: ['rules', 'fundamentals', 'techniques'],
  basketball: ['rules', 'ball-handling'],
  football: ['first-touch', 'passing', 'rules'],
  cricket: ['batting', 'rules', 'footwork'],
  athletics: ['sprint-mechanics', 'acceleration', 'rules'],
  tennis: ['grip', 'forehand', 'rules'],
  volleyball: ['passing', 'rules', 'spiking'],
  other: ['fundamentals', 'rules', 'techniques']
};
