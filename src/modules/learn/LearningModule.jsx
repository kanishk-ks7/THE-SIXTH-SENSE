import React, { useState, useMemo } from 'react';
import { 
  BookOpen, 
  Play, 
  Clock, 
  Bookmark, 
  Sparkles, 
  Search, 
  Layers, 
  Filter,
  CheckCircle2,
  Check,
  Target,
  ArrowRight,
  Compass,
  Award,
  Flame,
  RotateCcw,
  Zap,
  Info
} from 'lucide-react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import ProgressBar from '../../components/ui/ProgressBar';
import ModuleContainer from '../../components/ui/ModuleContainer';
import { useAthlete } from '../../context/AthleteContext';
import { LEARN_CATEGORIES } from '../../data/learningData';
import { 
  getRecommendedLessons, 
  getInProgressLessons, 
  getLearningPath, 
  searchAndFilterLessons,
  normalizeSport
} from '../../utils/learningEngine';
import LessonModal from '../../components/learn/LessonModal';
import CoachDiagnosticsBar from '../../components/learn/CoachDiagnosticsBar';
import LearningPathSequence from '../../components/learn/LearningPathSequence';

/**
 * =========================================================================
 * ATHLETEX: Personalized Learning & Coaching Module
 * =========================================================================
 * Level-based, weakness-targeted learning hub with real YouTube practice videos.
 * =========================================================================
 */
export const LearningModule = () => {
  const { 
    athlete, 
    updateProfile, 
    completedLessons, 
    inProgressLessons, 
    weakAreas, 
    markLessonComplete, 
    startLessonProgress, 
    updateWeakAreas, 
    resetLearningProgress 
  } = useAthlete();

  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedLevelFilter, setSelectedLevelFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeLesson, setActiveLesson] = useState(null);

  const activeSport = athlete?.sport || 'Basketball';
  const activeLevel = athlete?.level || 'Beginner';

  // 1. Personalized Recommendations (Strictly 2 to 4 lessons matching weaknesses & progression)
  const recommendedLessons = useMemo(() => {
    return getRecommendedLessons({
      sport: activeSport,
      level: activeLevel,
      weakAreas: weakAreas || athlete?.focusAreas || [],
      completedLessons: completedLessons || [],
      inProgressLessons: inProgressLessons || {}
    });
  }, [activeSport, activeLevel, weakAreas, athlete?.focusAreas, completedLessons, inProgressLessons]);

  // 2. Continue Learning (Lessons in progress)
  const inProgressList = useMemo(() => {
    return getInProgressLessons({
      sport: activeSport,
      completedLessons: completedLessons || [],
      inProgressLessons: inProgressLessons || {}
    });
  }, [activeSport, completedLessons, inProgressLessons]);

  // 3. 5-Stage Learning Path Sequence
  const pathStages = useMemo(() => {
    return getLearningPath({
      sport: activeSport,
      level: activeLevel,
      completedLessons: completedLessons || []
    });
  }, [activeSport, activeLevel, completedLessons]);

  // 4. Filtered Library for Search & Categories
  const filteredLibrary = useMemo(() => {
    return searchAndFilterLessons({
      sport: activeSport,
      category: selectedCategory,
      levelFilter: selectedLevelFilter,
      searchQuery: searchQuery,
      completedLessons: completedLessons || []
    });
  }, [activeSport, selectedCategory, selectedLevelFilter, searchQuery, completedLessons]);

  // Handle sport switch from diagnostic bar
  const handleUpdateSport = (newSport) => {
    updateProfile({ sport: newSport });
  };

  // Handle level switch from diagnostic bar
  const handleUpdateLevel = (newLevel) => {
    updateProfile({ level: newLevel });
  };

  // Open lesson modal & track progress
  const handleOpenLesson = (lesson) => {
    setActiveLesson(lesson);
  };

  // Find next lesson after completion
  const handleNextLesson = () => {
    if (recommendedLessons.length > 0) {
      const nextOne = recommendedLessons.find(l => l.id !== activeLesson?.id) || recommendedLessons[0];
      if (nextOne) {
        setActiveLesson(nextOne);
      } else {
        setActiveLesson(null);
      }
    } else {
      setActiveLesson(null);
    }
  };

  return (
    <ModuleContainer
      moduleName="LearningModule.jsx"
      assignedTo="Learning & Coaching Module"
      status="Active Personalized Hub"
      description="Personalized, level-based sports education hub powered by athletex AI coaching diagnostic telemetry."
    >
      <div className="space-y-8">

        {/* 1. Coach Diagnostics & Context Bar */}
        <CoachDiagnosticsBar
          sport={activeSport}
          level={activeLevel}
          weakAreas={weakAreas || []}
          onUpdateSport={handleUpdateSport}
          onUpdateLevel={handleUpdateLevel}
          onUpdateWeakAreas={updateWeakAreas}
          onResetProgress={resetLearningProgress}
          completedCount={(completedLessons || []).length}
        />

        {/* 2. SECTION: RECOMMENDED FOR YOU (2-4 TARGETED LESSONS) */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-volt flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5" />
                  Targeted Coaching
                </span>
                <span className="text-slate-600">•</span>
                <span className="text-xs text-slate-400">Based on Weak Areas & Progression</span>
              </div>
              <h2 className="text-xl font-bold text-white font-display">
                Recommended for You
              </h2>
            </div>

            <div className="text-xs text-slate-400 bg-dark-card/60 px-3 py-1.5 rounded-xl border border-dark-border">
              Displaying <strong className="text-volt">{recommendedLessons.length} targeted lessons</strong> for your current stage
            </div>
          </div>

          {recommendedLessons.length === 0 ? (
            <Card className="p-8 text-center bg-dark-card/50 border-dashed border-dark-border">
              <div className="w-12 h-12 rounded-2xl bg-volt/10 text-volt mx-auto flex items-center justify-center mb-3">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-white mb-1">
                All Recommended Lessons for this Level Completed!
              </h3>
              <p className="text-xs text-slate-400 max-w-md mx-auto mb-4">
                Great job! You have conquered your primary weak areas. Explore the advanced library below or level up your profile.
              </p>
              <Button variant="secondary" size="sm" onClick={resetLearningProgress}>
                Reset for Review
              </Button>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recommendedLessons.map((item, idx) => {
                const isItemCompleted = (completedLessons || []).includes(item.id);
                return (
                  <Card
                    key={item.id}
                    className="flex flex-col justify-between group hover:border-brand-500/60 transition-all duration-300 relative overflow-hidden bg-gradient-to-b from-dark-surface to-dark-card"
                  >
                    {/* Top Accent Stripe */}
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-brand-500 via-volt to-brand-400 opacity-60 group-hover:opacity-100 transition-opacity" />

                    <div className="pt-2">
                      {/* Priority Tag & Recommendation Reason Badge */}
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <span className={`text-[10px] font-bold px-2.5 py-1 rounded-lg border ${
                          item.isWeaknessMatch
                            ? 'bg-volt/15 text-volt border-volt/30 shadow-glow-sm'
                            : 'bg-brand-500/15 text-brand-300 border-brand-500/30'
                        }`}>
                          {item.recommendationBadge}
                        </span>

                        <div className="flex items-center gap-1 text-[11px] text-slate-400">
                          <Clock className="w-3 h-3" />
                          <span>{item.duration}</span>
                        </div>
                      </div>

                      {/* Lesson Title */}
                      <h3 className="text-base font-bold text-white font-display group-hover:text-brand-300 transition-colors mb-2 leading-snug">
                        {idx + 1}. {item.title}
                      </h3>

                      {/* Description */}
                      <p className="text-xs text-slate-300 line-clamp-3 mb-4 leading-relaxed">
                        {item.description}
                      </p>

                      {/* Key Learning Outcomes Preview */}
                      {item.learningOutcomes && item.learningOutcomes.length > 0 && (
                        <div className="p-2.5 rounded-xl bg-dark-bg/60 border border-dark-border/60 mb-5 space-y-1">
                          <div className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                            <Target className="w-3 h-3 text-volt" />
                            <span>Core Objective:</span>
                          </div>
                          <p className="text-[11px] text-slate-300 truncate">
                            • {item.learningOutcomes[0]}
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Footer Row */}
                    <div className="pt-3 border-t border-dark-border/40 flex items-center justify-between gap-2">
                      <div className="truncate">
                        <span className="text-[11px] text-slate-400 truncate block">
                          Coach {item.coach}
                        </span>
                      </div>

                      <Button
                        variant={item.isWeaknessMatch ? 'volt' : 'primary'}
                        size="sm"
                        icon={Play}
                        onClick={() => handleOpenLesson(item)}
                      >
                        Start Learning
                      </Button>
                    </div>
                  </Card>
                );
              })}
            </div>
          )}
        </div>

        {/* 3. SECTION: CONTINUE LEARNING (IN-PROGRESS LESSONS) */}
        {inProgressList.length > 0 && (
          <div className="space-y-4 pt-2">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-brand-400 flex items-center gap-1">
                <Flame className="w-3.5 h-3.5" />
                Resume Training
              </span>
              <span className="text-slate-600">•</span>
              <span className="text-xs text-slate-400">Lessons In Progress</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {inProgressList.map((item) => (
                <div
                  key={item.id}
                  className="p-4 rounded-2xl bg-dark-surface border border-dark-border hover:border-brand-500/40 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="flex items-start gap-3">
                    <div className="p-3 rounded-xl bg-brand-500/10 text-brand-400 border border-brand-500/20 flex-shrink-0 mt-0.5">
                      <Play className="w-4 h-4 fill-current" />
                    </div>
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-dark-card border border-dark-border text-slate-300">
                          {item.duration}
                        </span>
                        <span className="text-[10px] text-slate-400">
                          Last active: {item.lastWatched}
                        </span>
                      </div>
                      <h4 className="text-sm font-bold text-white font-display">
                        {item.title}
                      </h4>
                      <div className="w-48 max-w-full pt-1">
                        <ProgressBar progress={item.progressPercent || 40} height="h-1.5" color="volt" />
                      </div>
                    </div>
                  </div>

                  <Button
                    variant="primary"
                    size="sm"
                    icon={Play}
                    onClick={() => handleOpenLesson(item)}
                  >
                    Resume
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 4. SECTION: 5-STAGE LEARNING PATH */}
        <LearningPathSequence
          pathStages={pathStages}
          onSelectLesson={handleOpenLesson}
        />

        {/* 5. SECTION: COMPLETE SPORT LIBRARY & CATEGORY SEARCH */}
        <div className="space-y-6 pt-4">
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Sports Curriculum
                </span>
                <span className="text-slate-600">•</span>
                <span className="text-xs text-brand-400">{activeSport} Education Library</span>
              </div>
              <h2 className="text-xl font-bold text-white font-display">
                Explore All Topics & Skills
              </h2>
            </div>

            {/* Level Filter Pills */}
            <div className="flex items-center gap-1.5 bg-dark-surface p-1 rounded-xl border border-dark-border">
              {['all', 'beginner', 'intermediate', 'advanced'].map((lvl) => (
                <button
                  key={lvl}
                  type="button"
                  onClick={() => setSelectedLevelFilter(lvl)}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold capitalize transition-all ${
                    selectedLevelFilter === lvl
                      ? 'bg-brand-500 text-slate-950 font-bold'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {lvl}
                </button>
              ))}
            </div>
          </div>

          {/* Search & Category Filter Bar */}
          <div className="flex flex-col md:flex-row gap-4 justify-between items-stretch md:items-center">
            
            {/* Category Filter Pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0">
              {LEARN_CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                    selectedCategory === cat.id
                      ? 'bg-brand-500 text-slate-950 shadow-glow-sm font-bold'
                      : 'bg-dark-surface border border-dark-border text-slate-300 hover:text-white hover:border-slate-600'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Search Box */}
            <div className="relative w-full md:w-72">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder={`Search ${activeSport} topics, skills, videos...`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-dark-surface border border-dark-border rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-all"
              />
            </div>
          </div>

          {/* Library Cards Grid */}
          {filteredLibrary.length === 0 ? (
            <Card className="p-8 text-center bg-dark-card/30">
              <div className="w-12 h-12 rounded-2xl bg-dark-surface border border-dark-border text-slate-400 mx-auto flex items-center justify-center mb-3">
                <Search className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white mb-1">
                No lessons found matching your search
              </h3>
              <p className="text-xs text-slate-400 max-w-sm mx-auto mb-4">
                Try searching for a different skill, topic keyword, or switch the category filter.
              </p>
              <Button variant="secondary" size="sm" onClick={() => { setSearchQuery(''); setSelectedCategory('all'); setSelectedLevelFilter('all'); }}>
                Clear Filters
              </Button>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredLibrary.map((item) => {
                const isCompleted = item.isCompleted;
                return (
                  <Card
                    key={item.id}
                    className="flex flex-col justify-between group hover:border-brand-500/50 transition-all duration-300"
                  >
                    <div>
                      {/* Card Header Tags */}
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <div className="flex items-center gap-1.5">
                          <span className="text-[11px] px-2.5 py-0.5 rounded-lg bg-brand-500/10 text-brand-300 font-semibold capitalize border border-brand-500/20">
                            {item.category}
                          </span>
                          <span className="text-[10px] text-slate-400 capitalize px-2 py-0.5 rounded-md bg-dark-bg border border-dark-border">
                            {item.difficulty || item.level}
                          </span>
                        </div>

                        <div className="flex items-center gap-1 text-[11px] text-slate-400">
                          <Clock className="w-3 h-3" />
                          <span>{item.duration}</span>
                        </div>
                      </div>

                      {/* Title & Description */}
                      <h3 className="text-base font-bold text-white font-display group-hover:text-brand-300 transition-colors mb-2 leading-snug">
                        {item.title}
                      </h3>
                      <p className="text-xs text-slate-400 line-clamp-3 mb-4 leading-relaxed">
                        {item.description}
                      </p>

                      {/* Weak areas / Topics tags */}
                      {item.weakAreasCovered && (
                        <div className="flex flex-wrap gap-1.5 mb-6">
                          {item.weakAreasCovered.map((t, idx) => (
                            <span
                              key={idx}
                              className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-dark-bg border border-dark-border/60 text-slate-300 capitalize"
                            >
                              {t.replace(/-/g, ' ')}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Card Footer Button */}
                    <div className="pt-3 border-t border-dark-border/40 flex items-center justify-between gap-2">
                      <span className="text-[11px] text-slate-400 truncate">
                        By {item.coach}
                      </span>
                      
                      <Button
                        variant={isCompleted ? 'secondary' : 'primary'}
                        size="sm"
                        icon={isCompleted ? Check : Play}
                        onClick={() => handleOpenLesson(item)}
                      >
                        {isCompleted ? 'Review' : 'Start Learning'}
                      </Button>
                    </div>
                  </Card>
                );
              })}
            </div>
          )}

        </div>

        {/* 6. Real YouTube Interactive Lesson Modal */}
        {activeLesson && (
          <LessonModal
            lesson={activeLesson}
            isOpen={!!activeLesson}
            onClose={() => setActiveLesson(null)}
            isCompleted={(completedLessons || []).includes(activeLesson.id)}
            onMarkComplete={markLessonComplete}
            onStartProgress={startLessonProgress}
            onNextLesson={handleNextLesson}
          />
        )}

      </div>
    </ModuleContainer>
  );
};

export default LearningModule;
