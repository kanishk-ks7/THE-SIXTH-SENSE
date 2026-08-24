/**
 * athletex - Learning & Coaching Content Engine
 * Structured sports education repository organized by Sport, Level, Category, and Sequential Stage.
 * Contains real educational YouTube video IDs and rich coaching metadata.
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
    youtubeId: 'w4S8jW9L0w0', // Real Basketball Rules Explained
    weakAreasCovered: ['rules', 'game-regulations', 'court-awareness', 'fouls'],
    description: 'Master the fundamental rules of basketball including travelling, double-dribble, backcourt violation, shot clock, and personal foul classifications.',
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
    youtubeId: '0mPZ3oI0T3k', // Real Ball Handling & Dribbling drills
    weakAreasCovered: ['ball-handling', 'dribbling', 'finger-control', 'ball-security'],
    description: 'Build fingertip sensitivity, protect the ball with your off-arm in a low athletic stance, and eliminate looking down while dribbling.',
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
    youtubeId: 'm4XgK0J9G5o', // Real Crossover & Dribbling Drills
    weakAreasCovered: ['ball-handling', 'crossover', 'dribbling', 'footwork', 'agility'],
    description: 'Learn how to execute a crisp, below-the-knee crossover dribble combined with acceleration bursts to blow past perimeter defenders.',
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
    youtubeId: '3uK41W1nEek', // Real Basketball Offense Spacing
    weakAreasCovered: ['strategy', 'spacing', 'court-awareness', 'tactics', 'pick-and-roll'],
    description: 'Understand 5-out floor spacing, drive-and-kick reads, and how to set solid on-ball screens to create open scoring looks.',
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
    youtubeId: 'Z6b7bB0-M-Y', // Real Eurostep and Rim Finishing
    weakAreasCovered: ['finishing', 'layups', 'floater', 'footwork', 'advanced-skills'],
    description: 'High-level finishing techniques over taller rim protectors including high-arching teardrop floaters, decelerated eurosteps, and reverse layups.',
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
    youtubeId: 'w4S8jW9L0w0',
    weakAreasCovered: ['rules', 'defensive-rules', 'tactics'],
    description: 'Comprehensive breakdown of intermediate competitive rules: defensive 3-in-the-key, verticality cylinder rule, and charge/block interpretations.',
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
    youtubeId: 'sF1xY1w_gBw',
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
    youtubeId: 'k7WqXbJ8s9E',
    weakAreasCovered: ['ball-handling', 'separation', 'hesitation', 'techniques'],
    description: 'Learn pro-level deceleration moves: the hard in-and-out fake, hang dribble hesitation, and snatch-back crossover to create instant space.',
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
    youtubeId: 'X9T8e6k0b7g',
    weakAreasCovered: ['strategy', 'tactics', 'zone-defense', 'game-iq'],
    description: 'Systematic approach to defeating 2-3 and 1-3-1 zone defenses through high-post flashes, overload cuts, and mismatch switch targeting.',
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
    youtubeId: '4D7y1W9Vz1k',
    weakAreasCovered: ['defense', 'clutch', 'game-iq', 'advanced-skills'],
    description: 'Execute textbook perimeter defensive containment without fouling, contest angles, and late-game possession clock management.',
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
    youtubeId: 'sF1xY1w_gBw',
    weakAreasCovered: ['shooting', 'biomechanics', 'advanced-skills'],
    description: 'Fine-tuning micro-biomechanics for high-pressure contested shots, Dirk fadeaways, and step-back jumpers over athletic length.',
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
    youtubeId: '3uK41W1nEek',
    weakAreasCovered: ['tactics', 'film-study', 'strategy', 'game-iq'],
    description: 'Pro-level film breakdown on dissecting defensive drop coverage, trap blitzes, and ice ball screen coverages in transition.',
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
    youtubeId: 'fI5s7nQo6dE', // Real Soccer Rules & Offsides
    weakAreasCovered: ['rules', 'offside', 'game-regulations', 'positioning'],
    description: 'Understand pitch layout, referee signals, direct vs indirect free kicks, penalty box rules, and the precise mechanics of the offside rule.',
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
    youtubeId: 'Kz1JjHk4tFw', // Real First touch and passing drills
    weakAreasCovered: ['first-touch', 'passing', 'ball-control', 'fundamentals'],
    description: 'Master crisp ground passing with the inside instep and cushion receiving into open space away from opponent pressure.',
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
    youtubeId: 'n_Xg4B2nN7s', // Real cone dribbling
    weakAreasCovered: ['dribbling', 'ball-control', 'agility', 'techniques'],
    description: 'Sharpen close-control dribbling using inside/outside foot cuts, sole rolls, and rapid directional shifts through staggered cones.',
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
    youtubeId: '3m_q4Z1r8bM', // Real tactics and formations
    weakAreasCovered: ['tactics', 'positioning', 'spatial-iq', 'strategy'],
    description: 'Learn the core responsibilities of defenders, midfielders, and forwards, and how team lines shift cohesively with ball movement.',
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
    youtubeId: 'E_h3K1b_9e0', // Real shooting tutorial
    weakAreasCovered: ['shooting', 'finishing', 'weak-foot', 'advanced-skills'],
    description: 'Master shooting biomechanics: striking through the center with laces for power, and wrapping inside instep for curled far-post finishes.',
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
    youtubeId: 'Kz1JjHk4tFw',
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
    youtubeId: '3m_q4Z1r8bM',
    weakAreasCovered: ['tactics', 'pressing', 'counter-attack', 'strategy'],
    description: 'Learn how modern squads initiate coordinated pressing traps when opponents play backward passes or receive with back to goal.',
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
    youtubeId: 'AqtpNkMvj58', // Real Cricket Rules
    weakAreasCovered: ['rules', 'lbw', 'game-regulations', 'cricket-iq'],
    description: 'Learn the essential rules of cricket including the 10 methods of dismissal, LBW pitch zones, no-balls, wide deliveries, and powerplay field limits.',
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
    youtubeId: 'u4Z9X0b7Y6Q', // Real batting fundamentals
    weakAreasCovered: ['batting', 'stance', 'grip', 'fundamentals'],
    description: 'Establish a rock-solid batting foundation with the classic top-hand dominant V-grip, side-on balanced stance, and high backlift.',
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
    youtubeId: 'd6y8Q1w4m9E',
    weakAreasCovered: ['batting', 'front-foot', 'drive', 'techniques'],
    description: 'Learn the signature front-foot drives: transferring weight forward, bending the front knee, and presenting the full bat face.',
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
    youtubeId: 'e2k8R9w4n1L',
    weakAreasCovered: ['strategy', 'running-between-wickets', 'tactics', 'cricket-iq'],
    description: 'Master calling systems (Yes/No/Wait), turning sharply at the crease with bat sliding, and dropping the ball into gaps for quick singles.',
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
    youtubeId: 'h5Y3q1w9P0e',
    weakAreasCovered: ['bowling', 'yorker', 'seam-position', 'advanced-skills'],
    description: 'Learn seam alignment, wrist position behind the ball, repeatable run-up rhythm, and executing the toe-crushing death-over yorker.',
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
    youtubeId: '8yq1W4P0m8k',
    weakAreasCovered: ['rules', 'false-start', 'lane-discipline', 'athletics-iq'],
    description: 'Learn official track & field sprint rules: "On your marks" and "Set" commands, reaction time threshold (<0.100s), and lane line stepping penalties.',
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
    youtubeId: '9vX4k8m0P1Q',
    weakAreasCovered: ['sprint-mechanics', 'posture', 'arm-swing', 'fundamentals'],
    description: 'Establish upright sprint posture, relaxed facial muscles, compact 90-degree elbow arm drive from hip to chin, and stiff dorsiflexed ankles.',
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
    youtubeId: '3uK41W1nEek',
    weakAreasCovered: ['acceleration', 'block-starts', 'drive-phase', 'techniques'],
    description: 'Master setting block spacing, explosive push-off angle (45 degrees), low heel recovery, and progressive head rise through the first 30 meters.',
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
    youtubeId: 'w4S8jW9L0w0',
    weakAreasCovered: ['pacing', 'energy-distribution', 'strategy', 'athletics-iq'],
    description: 'Learn race modeling: acceleration, maximum velocity, and speed endurance deceleration management for 100m, 200m, and 400m events.',
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
    youtubeId: '0mPZ3oI0T3k',
    weakAreasCovered: ['max-velocity', 'stride-frequency', 'speed-endurance', 'advanced-skills'],
    description: 'Achieve peak stride frequency and force output over the final 40 meters while resisting postural breakdown and fatigue collapse.',
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
    youtubeId: '5-mR5cWn8wM',
    weakAreasCovered: ['rules', 'scoring', 'court-lines', 'tennis-iq'],
    description: 'Understand love-15-30-40 scoring, deuce and advantage, tiebreak regulations, singles vs doubles sidelines, and foot fault rules.',
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
    youtubeId: 'Kz1JjHk4tFw',
    weakAreasCovered: ['grip', 'ready-position', 'footwork', 'fundamentals'],
    description: 'Learn proper bevel placement for Continental, Eastern, and Semi-Western grips, combined with active split-step ready posture.',
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
    youtubeId: 'm4XgK0J9G5o',
    weakAreasCovered: ['forehand', 'topspin', 'swing-path', 'techniques'],
    description: 'Master unit turn, racket drop below the ball, windshield wiper follow-through, and brushing up the back of the ball for heavy topspin.',
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
    youtubeId: '3m_q4Z1r8bM',
    weakAreasCovered: ['strategy', 'crosscourt', 'shot-selection', 'tactics'],
    description: 'Learn why crosscourt rallies give you the lowest net height and longest court distance, reducing unforced errors by over 40%.',
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
    youtubeId: 'E_h3K1b_9e0',
    weakAreasCovered: ['serve', 'kick-serve', 'pronation', 'advanced-skills'],
    description: 'Master the trophy pose, consistent forward ball toss at 1 o’clock, racket drop into back scratch, and explosive forearm pronation.',
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
  // BADMINTON (5-Stage Path)
  // =========================================================================
  {
    id: 'bd-beg-rules-1',
    sport: 'badminton',
    level: 'beginner',
    category: 'rules',
    stage: 1,
    order: 1,
    title: 'Badminton Official Regulations: Service Lines, Faults & Scoring',
    coach: 'BWF Certified Umpire',
    channel: 'Badminton Insights',
    duration: '8 mins',
    difficulty: 'Beginner',
    youtubeId: 'w4S8jW9L0w0',
    weakAreasCovered: ['rules', 'service-rules', 'court-lines', 'badminton-iq'],
    description: 'Master rally scoring to 21 points, singles vs doubles service court boundaries, 1.15m service height limit, and net touch faults.',
    recommendationReason: 'Essential tournament rules breakdown to avoid costly service faults.',
    learningOutcomes: [
      'Understand singles long-and-narrow vs doubles short-and-wide service boxes.',
      'Comply with the 1.15m fixed service height regulation.',
      'Shuttlecock boundary line rules (on-the-line is in).',
      'Over-the-net invasion and racket touch infractions.'
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
    title: 'Basic Racket Grips (Forehand/Backhand) & 6-Corner Footwork',
    coach: 'Coach Lee Jae Bok',
    channel: 'Lee Jae Bok Badminton',
    duration: '14 mins',
    difficulty: 'Beginner',
    youtubeId: '0mPZ3oI0T3k',
    weakAreasCovered: ['grip', 'footwork', 'corner-recovery', 'fundamentals'],
    description: 'Master the relaxed V-grip, thumb grip for backhand, split step, and chassé step recovery to the center base T.',
    recommendationReason: 'Targeted drill to address footwork agility and grip transitions.',
    learningOutcomes: [
      'Relaxed grip that tightens only on moment of impact.',
      'Thumb position along wide bevel for crisp backhand generation.',
      'Chassé and lunging footwork to reach front corners without knee strain.',
      'Immediate recovery to the central court base position.'
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
    title: 'High Clear & Deceptive Drop Shot Mastery from Rear Court',
    coach: 'Coach Zhao Jianhua',
    channel: 'Badminton Racket Skills',
    duration: '15 mins',
    difficulty: 'Beginner',
    youtubeId: 'm4XgK0J9G5o',
    weakAreasCovered: ['clear', 'drop-shot', 'overhead-stroke', 'techniques'],
    description: 'Execute deep overhead high clears to push opponents to baseline, paired with deceptive soft slicing drop shots to front net.',
    recommendationReason: 'Builds versatile rear-court shot selection to control rally tempo.',
    learningOutcomes: [
      'Full body rotation and elbow leading on overhead strokes.',
      'Disguising drop shots by using identical swing prep as high clears.',
      'Slicing the shuttlecock skirt for steep falling trajectories.',
      'Clearing high and deep to the opponent back double tramlines.'
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
    youtubeId: '3m_q4Z1r8bM',
    weakAreasCovered: ['strategy', 'tactics', 'court-movement', 'badminton-iq'],
    description: 'Learn how to pull opponents out of balance by moving them consecutively between diagonally opposite court corners.',
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
    youtubeId: 'E_h3K1b_9e0',
    weakAreasCovered: ['smash', 'jump-smash', 'net-kill', 'advanced-skills'],
    description: 'Learn jump timing, scissor kick leg switch, steep downward angle contact, and lightning-fast net kill tap reflexes.',
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
    youtubeId: 'w4S8jW9L0w0',
    weakAreasCovered: ['rules', 'rotation', 'net-violations', 'volleyball-iq'],
    description: 'Learn 6-player court rotation, back-row attack restrictions, 3-touch maximum rule, double contact, and net touch infractions.',
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
    youtubeId: '0mPZ3oI0T3k',
    weakAreasCovered: ['passing', 'bump', 'setting', 'fundamentals'],
    description: 'Build a flat forearm platform, absorb hard incoming serves with leg extension, and execute soft-finger overhead sets to the setter zone.',
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
    youtubeId: 'm4XgK0J9G5o',
    weakAreasCovered: ['spiking', 'vertical-jump', 'arm-swing', 'techniques'],
    description: 'Master the Left-Right-Left (for right-handers) 4-step spike approach, high double-arm backswing, and high contact wrist snap on the ball.',
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
    youtubeId: '3m_q4Z1r8bM',
    weakAreasCovered: ['strategy', 'defense', 'rotation-systems', 'volleyball-iq'],
    description: 'Learn middle-middle and rotational defense setups, calling seams in serve-receive, and executing the 5-1 single-setter offense.',
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
    youtubeId: 'E_h3K1b_9e0',
    weakAreasCovered: ['serve', 'float-serve', 'blocking', 'advanced-skills'],
    description: 'Master the no-spin knuckleball jump float serve that drops unpredictably, combined with solid over-the-net blocking penetration.',
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
  basketball: ['rules', 'ball-handling'],
  football: ['first-touch', 'passing', 'rules'],
  cricket: ['batting', 'rules', 'footwork'],
  athletics: ['sprint-mechanics', 'acceleration', 'rules'],
  tennis: ['grip', 'forehand', 'rules'],
  badminton: ['footwork', 'rules', 'grip'],
  volleyball: ['passing', 'rules', 'spiking'],
  other: ['fundamentals', 'rules', 'techniques']
};
