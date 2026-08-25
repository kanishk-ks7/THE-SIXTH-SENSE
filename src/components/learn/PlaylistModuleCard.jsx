import React, { useState } from 'react';
import { 
  Play, 
  ListVideo, 
  CheckCircle2, 
  Check, 
  Clock, 
  ChevronDown, 
  ChevronUp, 
  Lock, 
  Sparkles,
  BookOpen,
  Target,
  Compass,
  Award
} from 'lucide-react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import ProgressBar from '../ui/ProgressBar';

export const PlaylistModuleCard = ({
  module,
  onSelectLesson,
  activeLessonId = null
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [imgError, setImgError] = useState(false);

  const {
    id,
    title,
    category,
    coverImage,
    description,
    lessons = [],
    totalCount = 0,
    completedCount = 0,
    progressPercent = 0,
    isCompleted = false,
    isInProgress = false,
    totalDuration = '45 mins',
    tags = []
  } = module;

  const fallbackImage = 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=600&auto=format&fit=crop&q=80';

  // Find next uncompleted lesson to recommend on quick action
  const nextLessonToPlay = lessons.find(l => !l.isCompleted) || lessons[0];

  return (
    <div className={`rounded-3xl border transition-all duration-300 overflow-hidden ${
      isCompleted
        ? 'bg-dark-surface/90 border-volt/40'
        : isInProgress
          ? 'bg-dark-surface border-brand-500/60 shadow-glow-sm'
          : 'bg-dark-surface/70 border-dark-border hover:border-slate-600'
    }`}>
      
      {/* Main Module Banner & Info */}
      <div className="p-5 sm:p-6 flex flex-col md:flex-row gap-5 items-start md:items-center justify-between">
        
        {/* Left Side: Playlist Cover Image & Title */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 flex-1 min-w-0">
          
          {/* YouTube Playlist Style Cover Thumbnail */}
          <div 
            onClick={() => setIsExpanded(!isExpanded)}
            className="relative w-full sm:w-44 aspect-video sm:h-28 rounded-2xl overflow-hidden bg-dark-bg border border-dark-border cursor-pointer group/cover flex-shrink-0 shadow-md"
          >
            <img
              src={imgError ? fallbackImage : coverImage}
              alt={title}
              onError={() => setImgError(true)}
              className="w-full h-full object-cover group-hover/cover:scale-105 transition-transform duration-500"
              loading="lazy"
            />

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/20" />

            {/* Playlist Icon & Count Overlay Badge (YouTube Playlist Style) */}
            <div className="absolute right-0 top-0 bottom-0 w-2/5 bg-black/60 backdrop-blur-sm flex flex-col items-center justify-center text-white border-l border-white/10 group-hover/cover:bg-brand-500/80 group-hover/cover:text-dark-bg transition-colors">
              <ListVideo className="w-5 h-5 mb-0.5" />
              <span className="text-[11px] font-extrabold font-mono">
                {totalCount}
              </span>
              <span className="text-[9px] font-bold uppercase tracking-wider">
                Videos
              </span>
            </div>

            {/* Bottom Duration Badge */}
            <div className="absolute bottom-2 left-2 z-10">
              <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-black/80 text-slate-200">
                {totalDuration}
              </span>
            </div>
          </div>

          {/* Module Title & Description */}
          <div className="space-y-1.5 min-w-0 flex-1">
            
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-brand-500/15 text-brand-300 border border-brand-500/30">
                {category}
              </span>
              {isCompleted ? (
                <span className="flex items-center gap-1 text-[10px] font-bold text-volt">
                  <CheckCircle2 className="w-3 h-3" />
                  Module Mastered
                </span>
              ) : isInProgress ? (
                <span className="text-[10px] font-bold text-brand-400">
                  {completedCount}/{totalCount} Completed
                </span>
              ) : (
                <span className="text-[10px] text-slate-400">
                  {totalCount} Ordered Lessons
                </span>
              )}
            </div>

            <h3 
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-base sm:text-lg font-bold text-white font-display hover:text-brand-300 transition-colors cursor-pointer leading-snug truncate"
            >
              {title}
            </h3>

            <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
              {description}
            </p>

            {/* Tags */}
            {tags && tags.length > 0 && (
              <div className="flex flex-wrap gap-1 pt-1">
                {tags.slice(0, 3).map((t, idx) => (
                  <span key={idx} className="text-[10px] text-slate-400 bg-dark-bg/60 px-2 py-0.5 rounded border border-dark-border/40">
                    {t}
                  </span>
                ))}
              </div>
            )}

          </div>

        </div>

        {/* Right Side: Progress Ring / Bar & Expand Toggle */}
        <div className="flex sm:flex-col items-center sm:items-end justify-between w-full md:w-auto gap-4 flex-shrink-0 pt-3 md:pt-0 border-t md:border-t-0 border-dark-border/60">
          
          {/* Progress Bar & Percentage */}
          <div className="w-36 text-right space-y-1">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-400 text-[11px]">Progress:</span>
              <span className={`font-mono font-bold ${isCompleted ? 'text-volt' : 'text-white'}`}>
                {progressPercent}%
              </span>
            </div>
            <ProgressBar 
              progress={progressPercent} 
              height="h-2" 
              color={isCompleted ? 'volt' : 'brand'} 
            />
            <span className="text-[10px] text-slate-400 block text-right">
              {completedCount} of {totalCount} completed
            </span>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            {nextLessonToPlay && (
              <Button
                variant={isCompleted ? 'secondary' : 'volt'}
                size="sm"
                icon={isCompleted ? Check : Play}
                onClick={() => onSelectLesson && onSelectLesson(nextLessonToPlay)}
              >
                {isCompleted ? 'Review' : isInProgress ? 'Resume' : 'Start Playlist'}
              </Button>
            )}

            <button
              type="button"
              onClick={() => setIsExpanded(!isExpanded)}
              className="p-2 rounded-xl bg-dark-bg border border-dark-border hover:border-brand-500/50 text-slate-300 hover:text-white transition-colors"
              aria-label={isExpanded ? 'Collapse playlist' : 'Expand playlist'}
              title={isExpanded ? 'Collapse' : 'View Lessons'}
            >
              {isExpanded ? (
                <ChevronUp className="w-4 h-4" />
              ) : (
                <ChevronDown className="w-4 h-4" />
              )}
            </button>
          </div>

        </div>

      </div>

      {/* Expandable YouTube Playlist Drawer (Lessons in Order) */}
      {isExpanded && (
        <div className="border-t border-dark-border/80 bg-dark-bg/80 p-4 sm:p-6 space-y-3 animate-fade-in">
          
          <div className="flex items-center justify-between text-xs font-bold text-slate-400 uppercase tracking-wider pb-2 border-b border-dark-border/40">
            <span>Playlist Sequence ({lessons.length} Lessons)</span>
            <span className="text-[11px] text-slate-500">Click any video to start learning</span>
          </div>

          <div className="grid grid-cols-1 gap-2.5">
            {lessons.map((lesson, idx) => {
              const isLessonDone = lesson.isCompleted;
              const isCurrentActive = activeLessonId === lesson.id;
              const ytThumb = `https://img.youtube.com/vi/${lesson.videoId || lesson.youtubeId}/mqdefault.jpg`;

              return (
                <div
                  key={lesson.id}
                  onClick={() => onSelectLesson && onSelectLesson(lesson)}
                  className={`p-3 rounded-2xl border transition-all duration-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 cursor-pointer group ${
                    isCurrentActive
                      ? 'bg-brand-500/15 border-brand-500 shadow-glow-sm'
                      : isLessonDone
                        ? 'bg-dark-surface/60 border-volt/30 hover:border-volt'
                        : 'bg-dark-surface/40 border-dark-border hover:border-brand-500/40 hover:bg-dark-surface/80'
                  }`}
                >
                  {/* Left: Thumbnail & Lesson Meta */}
                  <div className="flex items-center gap-3 min-w-0">
                    
                    {/* Order Number */}
                    <span className="font-mono text-xs font-bold text-slate-500 w-5 text-center flex-shrink-0">
                      {idx + 1}
                    </span>

                    {/* Mini Video Preview Thumbnail */}
                    <div className="relative w-20 aspect-video rounded-xl overflow-hidden bg-dark-bg border border-dark-border flex-shrink-0">
                      <img
                        src={ytThumb}
                        alt={lesson.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                        <div className={`w-5 h-5 rounded-full flex items-center justify-center ${
                          isLessonDone ? 'bg-volt text-dark-bg' : 'bg-black/70 text-white'
                        }`}>
                          {isLessonDone ? (
                            <Check className="w-3 h-3 stroke-[3]" />
                          ) : (
                            <Play className="w-2.5 h-2.5 fill-current ml-0.5" />
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Title & Short Description */}
                    <div className="space-y-0.5 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono text-slate-400">
                          {lesson.duration}
                        </span>
                        {isLessonDone && (
                          <span className="text-[10px] font-bold text-volt flex items-center gap-0.5">
                            <Check className="w-3 h-3 stroke-[3]" />
                            Done
                          </span>
                        )}
                      </div>
                      <h4 className="text-xs sm:text-sm font-bold text-white group-hover:text-brand-300 transition-colors truncate">
                        {lesson.title}
                      </h4>
                      <p className="text-[11px] text-slate-400 truncate max-w-md">
                        {lesson.description}
                      </p>
                    </div>

                  </div>

                  {/* Right: Coach attribution & Action */}
                  <div className="flex items-center justify-between sm:justify-end gap-3 flex-shrink-0 pl-8 sm:pl-0">
                    <span className="text-[10px] text-slate-500">
                      Coach {lesson.coach}
                    </span>

                    <button
                      type="button"
                      className={`px-3 py-1 rounded-xl text-xs font-bold transition-all flex items-center gap-1 ${
                        isLessonDone
                          ? 'bg-volt/15 text-volt border border-volt/30'
                          : 'bg-brand-500 text-dark-bg group-hover:bg-brand-400'
                      }`}
                    >
                      <Play className="w-3 h-3 fill-current" />
                      <span>{isLessonDone ? 'Review' : 'Play'}</span>
                    </button>
                  </div>

                </div>
              );
            })}
          </div>

        </div>
      )}

    </div>
  );
};

export default PlaylistModuleCard;
