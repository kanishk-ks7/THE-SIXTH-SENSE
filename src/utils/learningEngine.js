/**
 * athletex - Personalized Learning & Recommendation Engine
 * Computes level-based recommendations, 5-stage learning path progress,
 * and weakness-targeted coaching suggestions.
 */

import { STRUCTURED_LESSONS, LEARNING_STAGES, DEFAULT_SPORT_WEAK_AREAS } from '../data/learningData.js';

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

  // 2. Score candidate lessons based on:
  // - Weakness match (highest priority)
  // - Stage order (lower stage first so rules & fundamentals come before advanced)
  // - In-progress bonus
  const scoredLessons = candidateLessons.map((lesson) => {
    let score = 0;
    let matchedWeakness = null;

    // Check match against weak areas
    for (const weak of activeWeakAreas) {
      const isMatch = lesson.weakAreasCovered.some(tag => 
        tag.includes(weak) || weak.includes(tag) || lesson.category.includes(weak) || weak.includes(lesson.category)
      );
      if (isMatch) {
        score += 50;
        matchedWeakness = weak;
        break;
      }
    }

    // Stage hierarchy: Stage 1 (Rules) > Stage 2 (Fundamentals) > Stage 3 > Stage 4 > Stage 5
    // Stage 1 gives +30, Stage 2 gives +25, etc.
    const stageBonus = Math.max(0, (6 - lesson.stage) * 6);
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
      _score: score,
      recommendationBadge,
      isWeaknessMatch,
      prereqsMet
    };
  });

  // 3. Sort by computed score descending
  scoredLessons.sort((a, b) => b._score - a._score);

  // 4. Return strictly 2 to 4 lessons (as mandated in specifications)
  const finalRecommendations = scoredLessons.slice(0, 3);

  // Fallback: If athlete completed everything, return the first 2 refresher lessons
  if (finalRecommendations.length === 0 && allSportLessons.length > 0) {
    return allSportLessons.slice(0, 2).map(l => ({
      ...l,
      recommendationBadge: 'Refresher Review',
      isWeaknessMatch: false,
      prereqsMet: true
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
  const sportLessons = getSportLessons(normSport);

  const active = [];

  Object.entries(inProgressLessons).forEach(([lessonId, progressData]) => {
    if (!completedSet.has(lessonId)) {
      const lesson = STRUCTURED_LESSONS.find(l => l.id === lessonId);
      if (lesson && (lesson.sport === normSport || active.length < 2)) {
        active.push({
          ...lesson,
          progressPercent: progressData.percent || 45,
          lastWatched: progressData.lastWatched || 'Today'
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
    // Find lesson in this sport and level for this stage
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
      // Check if previous stage was completed
      status = 'available';
    }

    return {
      stageNumber: stageMeta.stage,
      category: stageMeta.category,
      title: stageMeta.label,
      shortTitle: stageMeta.shortLabel,
      lesson: preferredLesson,
      status, // 'completed' | 'current' | 'available' | 'locked'
      totalLessons: stageLessons.length,
      completedCount: stageLessons.filter(l => completedSet.has(l.id)).length
    };
  });

  return pathStages;
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

    // Search Query Match (Title, Coach, Description, Weak Areas, Learning Outcomes)
    let matchesSearch = true;
    if (query) {
      const matchTitle = lesson.title.toLowerCase().includes(query);
      const matchCoach = (lesson.coach || '').toLowerCase().includes(query) || (lesson.channel || '').toLowerCase().includes(query);
      const matchDesc = (lesson.description || '').toLowerCase().includes(query);
      const matchTags = (lesson.weakAreasCovered || []).some(t => t.toLowerCase().includes(query));
      const matchOutcomes = (lesson.learningOutcomes || []).some(o => o.toLowerCase().includes(query));
      matchesSearch = matchTitle || matchCoach || matchDesc || matchTags || matchOutcomes;
    }

    return matchesCategory && matchesLevel && matchesSearch;
  }).map(lesson => ({
    ...lesson,
    isCompleted: completedSet.has(lesson.id)
  }));
};
