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
  Info,
  ListVideo
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
  getSportModules,
  getProgressChartData,
  getMotivationStats,
  searchAndFilterLessons,
  normalizeSport
} from '../../utils/learningEngine';
import LessonModal from '../../components/learn/LessonModal';
import CoachDiagnosticsBar from '../../components/learn/CoachDiagnosticsBar';
import ProgressPathwayChart from '../../components/learn/ProgressPathwayChart';
import MotivationWidget from '../../components/learn/MotivationWidget';
import PlaylistModuleCard from '../../components/learn/PlaylistModuleCard';
import LessonVideoCard from '../../components/learn/LessonVideoCard';

/**
 * =========================================================================
 * ATHLETEX: Visual-First Personalized Learning & Coaching Module
 * =========================================================================
 * - YouTube-playlist-style modules with progress rings and cover thumbnails
 * - Visual progress chart showing completed, active current, and upcoming topics
 * - Lightweight motivational streak counter & milestone badges
 * - Visual-first video cards with 16:9 YouTube thumbnail previews & play overlays
 * - Live embedded YouTube playback for Recommended lessons
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

  // 1. Personalized Recommendations (Strictly 2 to 3 targeted lessons with live video playback enabled)
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

  // 3. YouTube-Playlist-Style Modules
  const playlistModules = useMemo(() => {
    return getSportModules({
      sport: activeSport,
      level: activeLevel,
      completedLessons: completedLessons || []
    });
  }, [activeSport, activeLevel, completedLessons]);

  // 4. Visual Progress Chart Data (Completed, Current, Next)
  const progressChartData = useMemo(() => {
    return getProgressChartData({
      sport: activeSport,
      level: activeLevel,
      completedLessons: completedLessons || []
    });
  }, [activeSport, activeLevel, completedLessons]);

  // 5. Motivational Telemetry (Streak, Milestone Badges, Encouraging Line)
  const motivationStats = useMemo(() => {
    return getMotivationStats({
      sport: activeSport,
      level: activeLevel,
      completedLessons: completedLessons || [],
      inProgressLessons: inProgressLessons || {}
    });
  }, [activeSport, activeLevel, completedLessons, inProgressLessons]);

  // 6. Filtered Library for Search & Categories
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
      status="Active Visual-First Hub"
      description="Visual-first, playlist-driven sports education engine with real YouTube coaching previews and live telemetry."
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

        {/* 2. Motivational Strip (Streak Counter + Milestone Badges + Encouraging Line) */}
        <MotivationWidget motivationStats={motivationStats} />

        {/* 3. Visual Progress Chart & Pathway (Topics Completed, Current Topic, What's Coming Next) */}
        <ProgressPathwayChart
          chartData={progressChartData}
          sport={activeSport}
          onSelectLesson={handleOpenLesson}
        />

        {/* 4. SECTION: RECOMMENDED FOR YOU (Live Playable YouTube Video Cards) */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-volt flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5" />
                  Targeted Coaching
                </span>
                <span className="text-slate-600">•</span>
                <span className="text-xs text-slate-400">Live Demo Videos Based on Weak Areas</span>
              </div>
              <h2 className="text-xl font-bold text-white font-display">
                Recommended for You
              </h2>
            </div>

            <div className="text-xs text-slate-400 bg-dark-card/60 px-3 py-1.5 rounded-xl border border-dark-border flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-volt animate-ping" />
              <span><strong className="text-volt">{recommendedLessons.length} live interactive lessons</strong> ready for playback</span>
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
                Great job! You have conquered your primary weak areas. Explore the playlist modules below or level up your profile.
              </p>
              <Button variant="secondary" size="sm" onClick={resetLearningProgress}>
                Reset for Review
              </Button>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recommendedLessons.map((item) => {
                const isItemCompleted = (completedLessons || []).includes(item.id);
                return (
                  <LessonVideoCard
                    key={item.id}
                    lesson={item}
                    isCompleted={isItemCompleted}
                    isRecommended={true}
                    onOpenLesson={handleOpenLesson}
                  />
                );
              })}
            </div>
          )}
        </div>

        {/* 5. SECTION: CONTINUE LEARNING (IN-PROGRESS LESSONS) */}
        {inProgressList.length > 0 && (
          <div className="space-y-4 pt-2">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-brand-400 flex items-center gap-1">
                <Flame className="w-3.5 h-3.5" />
                Resume Training
              </span>
              <span className="text-slate-600">•</span>
              <span className="text-xs text-slate-400">Videos In Progress</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {inProgressList.map((item) => (
                <div
                  key={item.id}
                  className="p-4 rounded-2xl bg-dark-surface border border-dark-border hover:border-brand-500/40 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="flex items-start gap-3">
                    <div className="relative w-20 aspect-video rounded-xl overflow-hidden bg-dark-bg border border-dark-border flex-shrink-0 mt-0.5">
                      <img
                        src={`https://img.youtube.com/vi/${item.videoId || item.youtubeId}/mqdefault.jpg`}
                        alt={item.title}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                        <Play className="w-4 h-4 fill-white text-white" />
                      </div>
                    </div>

                    <div className="space-y-1.5 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-dark-card border border-dark-border text-slate-300">
                          {item.duration}
                        </span>
                        <span className="text-[10px] text-slate-400">
                          {item.lastWatched}
                        </span>
                      </div>
                      <h4 className="text-sm font-bold text-white font-display truncate max-w-xs">
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

        {/* 6. SECTION: YOUTUBE-PLAYLIST-STYLE MODULES */}
        <div className="space-y-5 pt-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-brand-400 flex items-center gap-1">
                  <ListVideo className="w-3.5 h-3.5" />
                  Curated Modules
                </span>
                <span className="text-slate-600">•</span>
                <span className="text-xs text-slate-400">{activeSport} Sequential Video Playlists</span>
              </div>
              <h2 className="text-xl font-bold text-white font-display">
                Structured Learning Playlists
              </h2>
            </div>

            <div className="text-xs text-slate-400 bg-dark-card/60 px-3 py-1.5 rounded-xl border border-dark-border">
              {playlistModules.length} Modules • Ordered video lessons
            </div>
          </div>

          {/* Playlist Cards List */}
          <div className="space-y-4">
            {playlistModules.map((mod) => (
              <PlaylistModuleCard
                key={mod.id}
                module={mod}
                onSelectLesson={handleOpenLesson}
                activeLessonId={activeLesson?.id}
              />
            ))}
          </div>
        </div>

        {/* 7. SECTION: COMPLETE SPORT LIBRARY & VISUAL CARD SEARCH */}
        <div className="space-y-6 pt-6">
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Comprehensive Library
                </span>
                <span className="text-slate-600">•</span>
                <span className="text-xs text-brand-400">{activeSport} Video Catalog</span>
              </div>
              <h2 className="text-xl font-bold text-white font-display">
                Explore All Practice Videos & Skills
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
                placeholder={`Search ${activeSport} skills, drills, videos...`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-dark-surface border border-dark-border rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-all"
              />
            </div>
          </div>

          {/* Library Cards Grid (Visual First with Video Thumbnails) */}
          {filteredLibrary.length === 0 ? (
            <Card className="p-8 text-center bg-dark-card/30">
              <div className="w-12 h-12 rounded-2xl bg-dark-surface border border-dark-border text-slate-400 mx-auto flex items-center justify-center mb-3">
                <Search className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white mb-1">
                No video lessons found matching your search
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
                  <LessonVideoCard
                    key={item.id}
                    lesson={item}
                    isCompleted={isCompleted}
                    isRecommended={false}
                    onOpenLesson={handleOpenLesson}
                  />
                );
              })}
            </div>
          )}

        </div>

        {/* 8. Real YouTube Interactive Lesson Modal */}
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
