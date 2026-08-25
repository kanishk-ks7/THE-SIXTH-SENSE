/**
 * athletex - Personalized Learning & Recommendation Engine
 * Computes level-based recommendations, 5-stage learning path progress,
 * YouTube-playlist-style modules, progress chart telemetry, and motivational metrics.
 */

import { 
  STRUCTURED_LESSONS, 
  STRUCTURED_MODULES, 
  LEARNING_STAGES, 
  LEARN_CATEGORIES, 
  LEARN_MILESTONES, 
  DEFAULT_SPORT_WEAK_AREAS 
} from '../data/learningData.js';

/**
 * Normalize sport string (e.g. "Football" -> "football")
 */
export const normalizeSport = (sport) => {
  if (!sport) return 'basketball';
  const clean = sport.toLowerCase().trim();
  if (clean.includes('basket')) return 'basketball';
  if (clean.includes('foot') || clean.includes('soccer')) return 'football';
  if (clean.includes('cricket')) return 'cricket';
  if (clean.includes('athletic') || clean.includes('track') || clean.includes('sprint')) return 'athletics';
  if (clean.includes('tennis')) return 'tennis';
  if (clean.includes('badminton')) return 'badminton';
  if (clean.includes('volley')) return 'volleyball';
  return 'basketball';
};

/**
 * Normalize level string (e.g. "Beginner" -> "beginner")
 */
export const normalizeLevel = (level) => {
  if (!level) return 'beginner';
  const clean = level.toLowerCase().trim();
  if (clean.includes('adv')) return 'advanced';
  if (clean.includes('inter')) return 'intermediate';
  return 'beginner';
};

/**
 * Get all available lessons for a sport, fallback to basketball if sport has no specific data
 */
export const getSportLessons = (sport) => {
  const normSport = normalizeSport(sport);
  const matched = STRUCTURED_LESSONS.filter(l => l.sport === normSport);
  if (matched.length > 0) return matched;
  return STRUCTURED_LESSONS.filter(l => l.sport === 'basketball');
};

/**
 * Normalize weak areas array into clean search tokens
 */
export const normalizeWeakAreas = (weakAreas, sport) => {
  if (Array.isArray(weakAreas) && weakAreas.length > 0) {
    return weakAreas.map(w => w.toLowerCase().trim());
  }
  const normSport = normalizeSport(sport);
  return DEFAULT_SPORT_WEAK_AREAS[normSport] || ['rules', 'fundamentals'];
};

/**
 * Calculates 2 to 4 personalized recommendations based on:
 * - Selected Sport
 * - Level (Beginner / Intermediate / Advanced)
 * - Assessment Weaknesses
 * - Completed lessons (excluded)
 * - Learning Path Stage Progression
 * 
 * Note: Lessons in "Recommended for You" are flagged with isPlayableLive = true
 * for live embedded YouTube video player demonstrations.
 */
export const getRecommendedLessons = ({
  sport = 'basketball',
  level = 'beginner',
  weakAreas = [],
  completedLessons = [],
  inProgressLessons = {}
}) => {
  const normSport = normalizeSport(sport);
  const normLevel = normalizeLevel(level);
  const activeWeakAreas = normalizeWeakAreas(weakAreas, normSport);
  const completedSet = new Set(completedLessons);

  // 1. Get sport lessons matching athlete's level first, or all sport lessons
  const allSportLessons = getSportLessons(normSport);
  let candidateLessons = allSportLessons.filter(l => l.level === normLevel && !completedSet.has(l.id));

  // If candidate count is low in exact level, allow other levels for this sport that are not completed
  if (candidateLessons.length < 2) {
    const remainingSportLessons = allSportLessons.filter(l => !completedSet.has(l.id));
    candidateLessons = remainingSportLessons;
  }

  // 2. Score candidate lessons
  const scoredLessons = candidateLessons.map((lesson) => {
    let score = 0;
    let matchedWeakness = null;

    // Check match against weak areas
    for (const weak of activeWeakAreas) {
      const isMatch = (lesson.weakAreasCovered || []).some(tag => 
        tag.includes(weak) || weak.includes(tag) || lesson.category.includes(weak) || weak.includes(lesson.category)
      ) || (lesson.skills || []).some(s => s.toLowerCase().includes(weak));

      if (isMatch) {
        score += 50;
        matchedWeakness = weak;
        break;
      }
    }

    // Stage hierarchy: Stage 1 (Rules) > Stage 2 (Fundamentals) > Stage 3 > Stage 4 > Stage 5
    const stageBonus = Math.max(0, (6 - (lesson.stage || 1)) * 6);
    score += stageBonus;

    // Check if prerequisites are satisfied
    const prereqsMet = (lesson.prerequisites || []).every(pre => completedSet.has(pre));
    if (prereqsMet) {
      score += 20;
    } else {
      score -= 15;
    }

    // Generate recommendation reason badge
    let recommendationBadge = 'AI Coach Recommendation';
    let isWeaknessMatch = false;

    if (matchedWeakness) {
      isWeaknessMatch = true;
      const formattedWeakness = matchedWeakness.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
      recommendationBadge = `Targeted: Weakness in ${formattedWeakness}`;
    } else if (lesson.category === 'rules') {
      recommendationBadge = 'Essential Baseline: Match Rules';
    } else if (lesson.category === 'fundamentals') {
      recommendationBadge = 'Core Skill Building';
    } else if (lesson.stage === 3) {
      recommendationBadge = 'Next Step on Learning Path';
    }

    return {
      ...lesson,
      videoId: lesson.videoId || lesson.youtubeId,
      youtubeId: lesson.youtubeId || lesson.videoId,
      _score: score,
      recommendationBadge,
      isWeaknessMatch,
      prereqsMet,
      isPlayableLive: true // Live player enabled for Recommended For You
    };
  });

  // 3. Sort by computed score descending
  scoredLessons.sort((a, b) => b._score - a._score);

  // 4. Return strictly 2 to 3 recommendations
  const finalRecommendations = scoredLessons.slice(0, 3);

  // Fallback: If athlete completed everything, return first 2 refresher lessons
  if (finalRecommendations.length === 0 && allSportLessons.length > 0) {
    return allSportLessons.slice(0, 2).map(l => ({
      ...l,
      videoId: l.videoId || l.youtubeId,
      youtubeId: l.youtubeId || l.videoId,
      recommendationBadge: 'Refresher Review',
      isWeaknessMatch: false,
      prereqsMet: true,
      isPlayableLive: true
    }));
  }

  return finalRecommendations;
};

/**
 * Get active lessons currently in progress
 */
export const getInProgressLessons = ({
  sport = 'basketball',
  completedLessons = [],
  inProgressLessons = {}
}) => {
  const normSport = normalizeSport(sport);
  const completedSet = new Set(completedLessons);

  const active = [];

  Object.entries(inProgressLessons).forEach(([lessonId, progressData]) => {
    if (!completedSet.has(lessonId)) {
      const lesson = STRUCTURED_LESSONS.find(l => l.id === lessonId);
      if (lesson && (lesson.sport === normSport || active.length < 2)) {
        active.push({
          ...lesson,
          videoId: lesson.videoId || lesson.youtubeId,
          youtubeId: lesson.youtubeId || lesson.videoId,
          progressPercent: progressData.percent || 45,
          lastWatched: progressData.lastWatched || 'Today',
          isPlayableLive: true
        });
      }
    }
  });

  return active;
};

/**
 * Computes 5-stage sequential learning path status:
 * Status values: 'completed' | 'current' | 'available' | 'locked'
 */
export const getLearningPath = ({
  sport = 'basketball',
  level = 'beginner',
  completedLessons = []
}) => {
  const normSport = normalizeSport(sport);
  const normLevel = normalizeLevel(level);
  const completedSet = new Set(completedLessons);
  const sportLessons = getSportLessons(normSport);

  let hasFoundCurrent = false;

  const pathStages = LEARNING_STAGES.map((stageMeta) => {
    const stageLessons = sportLessons.filter(l => l.stage === stageMeta.stage);
    const preferredLesson = stageLessons.find(l => l.level === normLevel) || stageLessons[0];

    const isStageCompleted = stageLessons.length > 0 && stageLessons.every(l => completedSet.has(l.id));
    const isPreferredCompleted = preferredLesson ? completedSet.has(preferredLesson.id) : false;

    let status = 'locked';

    if (isStageCompleted || isPreferredCompleted) {
      status = 'completed';
    } else if (!hasFoundCurrent) {
      status = 'current';
      hasFoundCurrent = true;
    } else {
      status = 'available';
    }

    return {
      stageNumber: stageMeta.stage,
      category: stageMeta.category,
      title: stageMeta.label,
      shortTitle: stageMeta.shortLabel,
      lesson: preferredLesson ? {
        ...preferredLesson,
        videoId: preferredLesson.videoId || preferredLesson.youtubeId,
        youtubeId: preferredLesson.youtubeId || preferredLesson.videoId
      } : null,
      status, // 'completed' | 'current' | 'available' | 'locked'
      totalLessons: stageLessons.length,
      completedCount: stageLessons.filter(l => completedSet.has(l.id)).length
    };
  });

  return pathStages;
};

/**
 * Computes YouTube-playlist-style modules for the given sport
 * Each module aggregates lessons with completed counts, progress %, and ordered playlist items.
 */
export const getSportModules = ({
  sport = 'basketball',
  level = 'beginner',
  completedLessons = []
}) => {
  const normSport = normalizeSport(sport);
  const normLevel = normalizeLevel(level);
  const completedSet = new Set(completedLessons);

  // Find defined modules for sport, or fallback to basketball
  let matchedModules = STRUCTURED_MODULES.filter(m => m.sport === normSport);
  if (matchedModules.length === 0) {
    matchedModules = STRUCTURED_MODULES.filter(m => m.sport === 'basketball');
  }

  const allSportLessons = getSportLessons(normSport);
  const lessonMap = new Map(allSportLessons.map(l => [l.id, l]));

  return matchedModules.map((mod) => {
    // Resolve all lesson objects in order
    const lessonsInModule = (mod.lessonIds || [])
      .map(id => lessonMap.get(id))
      .filter(Boolean)
      .map(l => ({
        ...l,
        videoId: l.videoId || l.youtubeId,
        youtubeId: l.youtubeId || l.videoId,
        isCompleted: completedSet.has(l.id),
        prereqsMet: (l.prerequisites || []).every(p => completedSet.has(p))
      }));

    const totalCount = lessonsInModule.length;
    const completedCount = lessonsInModule.filter(l => l.isCompleted).length;
    const progressPercent = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;
    const isCompleted = totalCount > 0 && completedCount === totalCount;
    const isInProgress = completedCount > 0 && completedCount < totalCount;

    // Estimate total playlist duration
    const totalDurationMinutes = lessonsInModule.reduce((acc, l) => {
      const match = (l.duration || '').match(/\d+/);
      return acc + (match ? parseInt(match[0], 10) : 10);
    }, 0);

    return {
      ...mod,
      lessons: lessonsInModule,
      totalCount,
      completedCount,
      progressPercent,
      isCompleted,
      isInProgress,
      totalDuration: `${totalDurationMinutes} mins`
    };
  });
};

/**
 * Computes visual progress telemetry for the Progress & Pathway Chart
 * Returns overall completion %, completed topics, current active topic, and what's next.
 */
export const getProgressChartData = ({
  sport = 'basketball',
  level = 'beginner',
  completedLessons = []
}) => {
  const normSport = normalizeSport(sport);
  const sportLessons = getSportLessons(normSport);
  const completedSet = new Set(completedLessons);

  const completedTopics = [];
  let currentTopic = null;
  const nextTopics = [];

  sportLessons.forEach((lesson) => {
    const formatted = {
      ...lesson,
      videoId: lesson.videoId || lesson.youtubeId,
      youtubeId: lesson.youtubeId || lesson.videoId,
      isCompleted: completedSet.has(lesson.id)
    };

    if (completedSet.has(lesson.id)) {
      completedTopics.push(formatted);
    } else if (!currentTopic) {
      currentTopic = formatted;
    } else {
      nextTopics.push(formatted);
    }
  });

  const totalCount = sportLessons.length;
  const completedCount = completedTopics.length;
  const overallPercent = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  // Category breakdown
  const categoryBreakdown = LEARN_CATEGORIES.filter(c => c.id !== 'all').map((cat) => {
    const catLessons = sportLessons.filter(l => l.category === cat.id);
    const catCompleted = catLessons.filter(l => completedSet.has(l.id)).length;
    const catTotal = catLessons.length;
    return {
      category: cat.id,
      label: cat.label,
      total: catTotal,
      completed: catCompleted,
      percent: catTotal > 0 ? Math.round((catCompleted / catTotal) * 100) : 0
    };
  });

  return {
    overallPercent,
    completedCount,
    totalCount,
    completedTopics,
    currentTopic,
    nextTopics,
    categoryBreakdown
  };
};

/**
 * Computes motivational metrics:
 * - Active Streak counter
 * - Earned vs In-Progress Milestone Badges
 * - Dynamic encouraging line tied directly to athlete progress
 */
export const getMotivationStats = ({
  sport = 'basketball',
  level = 'beginner',
  completedLessons = [],
  inProgressLessons = {}
}) => {
  const completedCount = (completedLessons || []).length;
  const normSport = normalizeSport(sport);
  const modules = getSportModules({ sport, level, completedLessons });

  // Compute simulated streak (base 3 + active completions)
  const baseStreak = 3;
  const streak = completedCount > 0 ? baseStreak + Math.min(completedCount, 7) : 2;

  // Evaluate milestone badges
  const completedModulesCount = modules.filter(m => m.isCompleted).length;
  const rulesLessons = getSportLessons(normSport).filter(l => l.category === 'rules');
  const rulesDone = rulesLessons.length > 0 && rulesLessons.every(l => completedLessons.includes(l.id));

  const milestoneBadges = LEARN_MILESTONES.map((badge) => {
    let isEarned = false;
    let currentProgress = 0;
    let target = badge.target || 1;

    if (badge.type === 'count') {
      currentProgress = completedCount;
      isEarned = completedCount >= target;
    } else if (badge.type === 'category') {
      currentProgress = rulesDone ? 1 : 0;
      isEarned = rulesDone;
    } else if (badge.type === 'module') {
      currentProgress = completedModulesCount;
      isEarned = completedModulesCount >= 1;
    }

    return {
      ...badge,
      isEarned,
      currentProgress,
      target
    };
  });

  // Dynamic encouraging line tied to actual module progress
  let encouragingMessage = 'Start your first lesson to build momentum!';
  
  // Find an in-progress module
  const activeModule = modules.find(m => m.isInProgress) || modules.find(m => !m.isCompleted);

  if (activeModule) {
    const remaining = activeModule.totalCount - activeModule.completedCount;
    if (activeModule.completedCount === 0) {
      encouragingMessage = `Ready to kick off ${activeModule.title}? ${activeModule.totalCount} bite-sized video lessons await.`;
    } else if (remaining === 1) {
      encouragingMessage = `Just 1 lesson away from completing ${activeModule.title}! Keep the streak alive!`;
    } else {
      encouragingMessage = `${remaining} lessons from mastering ${activeModule.title}. You're on track!`;
    }
  } else if (completedCount > 0) {
    encouragingMessage = `Incredible dedication! You've mastered all core modules for ${sport}. Explore advanced drills!`;
  }

  return {
    streak,
    streakLabel: `${streak}-Day Streak`,
    milestoneBadges,
    encouragingMessage,
    completedCount
  };
};

/**
 * Filter library by sport, category, difficulty level and search query
 */
export const searchAndFilterLessons = ({
  sport = 'basketball',
  category = 'all',
  levelFilter = 'all',
  searchQuery = '',
  completedLessons = []
}) => {
  const normSport = normalizeSport(sport);
  const completedSet = new Set(completedLessons);
  const sportLessons = getSportLessons(normSport);

  const query = searchQuery.trim().toLowerCase();

  return sportLessons.filter((lesson) => {
    // Category Filter
    const matchesCategory = category === 'all' || lesson.category === category;

    // Level Filter
    const matchesLevel = levelFilter === 'all' || lesson.level.toLowerCase() === levelFilter.toLowerCase();

    // Search Query Match (Title, Coach, Description, Weak Areas, Skills)
    let matchesSearch = true;
    if (query) {
      const matchTitle = lesson.title.toLowerCase().includes(query);
      const matchCoach = (lesson.coach || '').toLowerCase().includes(query) || (lesson.channel || '').toLowerCase().includes(query);
      const matchDesc = (lesson.description || '').toLowerCase().includes(query);
      const matchTags = (lesson.weakAreasCovered || []).some(t => t.toLowerCase().includes(query));
      const matchSkills = (lesson.skills || []).some(s => s.toLowerCase().includes(query));
      const matchModule = (lesson.module || '').toLowerCase().includes(query);
      matchesSearch = matchTitle || matchCoach || matchDesc || matchTags || matchSkills || matchModule;
    }

    return matchesCategory && matchesLevel && matchesSearch;
  }).map(lesson => ({
    ...lesson,
    videoId: lesson.videoId || lesson.youtubeId,
    youtubeId: lesson.youtubeId || lesson.videoId,
    isCompleted: completedSet.has(lesson.id)
  }));
};
