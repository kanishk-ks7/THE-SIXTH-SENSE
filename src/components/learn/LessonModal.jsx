import React, { useState, useEffect } from 'react';
import { 
  X, 
  Play, 
  CheckCircle2, 
  Clock, 
  Award, 
  Sparkles, 
  Check, 
  Target, 
  ArrowRight, 
  Info, 
  Share2, 
  RotateCcw,
  ExternalLink,
  Video,
  ListVideo
} from 'lucide-react';
import Button from '../ui/Button';
import Badge from '../ui/Badge';

export const LessonModal = ({
  lesson,
  isOpen,
  onClose,
  isCompleted,
  onMarkComplete,
  onStartProgress,
  onNextLesson
}) => {
  const [justCompleted, setJustCompleted] = useState(false);
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    if (isOpen && lesson) {
      setJustCompleted(false);
      if (onStartProgress && !isCompleted) {
        onStartProgress(lesson.id, 35);
      }
    }
  }, [isOpen, lesson, isCompleted, onStartProgress]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !lesson) return null;

  const handleComplete = () => {
    setJustCompleted(true);
    if (onMarkComplete) {
      onMarkComplete(lesson.id, lesson.title);
    }
  };

  const videoId = lesson.videoId || lesson.youtubeId || 'w4S8jW9L0w0';
  const isPlayableLive = lesson.isPlayableLive !== false; // Live playable enabled for recommended lessons
  const ytThumbnail = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
  const fallbackCover = 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=600&auto=format&fit=crop&q=80';

  // Real YouTube embed with modest branding and autoplay
  const embedUrl = `https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1&autoplay=1`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-dark-bg/90 backdrop-blur-md transition-opacity animate-fade-in"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className="relative w-full max-w-4xl bg-dark-surface border border-dark-border rounded-3xl shadow-2xl overflow-hidden z-10 my-6 transform transition-all duration-300 animate-scale-up flex flex-col max-h-[92vh]">
        
        {/* Top Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-dark-border/80 bg-dark-card/50 flex-shrink-0">
          <div className="flex items-center gap-3 min-w-0">
            <div className="p-2 rounded-xl bg-brand-500/10 text-brand-400 border border-brand-500/20 flex-shrink-0">
              <Play className="w-4 h-4 fill-current" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-[11px] font-bold uppercase tracking-wider text-brand-400">
                  athletex Coaching Player
                </span>
                <span className="text-slate-600">•</span>
                <Badge variant={isCompleted || justCompleted ? 'volt' : 'primary'} size="sm">
                  {isCompleted || justCompleted ? 'Completed' : 'In Progress'}
                </Badge>
                {isPlayableLive && (
                  <span className="text-[10px] font-extrabold px-2 py-0.5 rounded bg-volt/20 text-volt border border-volt/30">
                    Live Stream
                  </span>
                )}
              </div>
              <h2 className="text-base sm:text-lg font-bold text-white font-display truncate max-w-lg">
                {lesson.title}
              </h2>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/5 border border-transparent hover:border-dark-border transition-colors flex-shrink-0 ml-2"
            aria-label="Close lesson"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Modal Body */}
        <div className="p-6 space-y-6 overflow-y-auto flex-grow">
          
          {/* Real Embedded YouTube Video Player or Video Preview */}
          <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-black border border-dark-border shadow-2xl">
            {isPlayableLive ? (
              <iframe
                src={embedUrl}
                title={lesson.title}
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            ) : (
              <div className="relative w-full h-full flex items-center justify-center">
                <img
                  src={imgError ? fallbackCover : ytThumbnail}
                  alt={lesson.title}
                  onError={() => setImgError(true)}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex flex-col items-center justify-center p-6 text-center space-y-3">
                  <div className="p-4 rounded-2xl bg-brand-500/20 text-brand-300 border border-brand-500/30">
                    <ListVideo className="w-8 h-8" />
                  </div>
                  <div className="space-y-1 max-w-md">
                    <h3 className="text-base font-bold text-white">Module Library Preview</h3>
                    <p className="text-xs text-slate-300">
                      Live interactive playback is active for lessons in <strong className="text-volt">Recommended for You</strong>.
                    </p>
                  </div>
                  <Button
                    variant="volt"
                    size="sm"
                    icon={Check}
                    onClick={handleComplete}
                  >
                    Mark as Studied
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* Lesson Metadata Strip */}
          <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 rounded-2xl bg-dark-bg/80 border border-dark-border">
            <div className="flex flex-wrap items-center gap-4 text-xs">
              <div className="flex items-center gap-1.5 text-slate-300">
                <Award className="w-4 h-4 text-brand-400" />
                <span>Coach: <strong className="text-white">{lesson.coach || 'athletex Coach'}</strong></span>
                {lesson.channel && (
                  <span className="text-slate-500">({lesson.channel})</span>
                )}
              </div>
              <div className="flex items-center gap-1.5 text-slate-400">
                <Clock className="w-3.5 h-3.5" />
                <span>Duration: <strong className="text-slate-200">{lesson.duration}</strong></span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-[11px] px-2.5 py-1 rounded-lg bg-dark-card border border-dark-border text-slate-300 font-medium">
                Level: {lesson.difficulty || lesson.level}
              </span>
              <span className="text-[11px] px-2.5 py-1 rounded-lg bg-brand-500/10 border border-brand-500/30 text-brand-300 font-medium capitalize">
                Category: {lesson.category}
              </span>
            </div>
          </div>

          {/* Why Recommended Alert */}
          {lesson.recommendationReason && (
            <div className="p-4 rounded-2xl bg-brand-500/10 border border-brand-500/30 flex items-start gap-3">
              <div className="p-2 rounded-xl bg-brand-500/20 text-brand-300 flex-shrink-0 mt-0.5">
                <Sparkles className="w-4 h-4" />
              </div>
              <div className="space-y-1">
                <h4 className="text-xs font-bold uppercase tracking-wider text-brand-300">
                  Targeted Recommendation Insight
                </h4>
                <p className="text-xs text-slate-200 leading-relaxed">
                  {lesson.recommendationReason}
                </p>
              </div>
            </div>
          )}

          {/* Short Description */}
          <div className="space-y-1.5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Lesson Overview
            </h4>
            <p className="text-sm text-slate-300 leading-relaxed">
              {lesson.description}
            </p>
          </div>

          {/* Skill Badges */}
          {lesson.skills && lesson.skills.length > 0 && (
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Target Skills Covered
              </h4>
              <div className="flex flex-wrap gap-2">
                {lesson.skills.map((skill, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 rounded-xl bg-dark-bg border border-dark-border text-slate-200 text-xs font-medium"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* What You Will Learn */}
          {lesson.learningOutcomes && lesson.learningOutcomes.length > 0 && (
            <div className="space-y-3 p-4 rounded-2xl bg-dark-bg/60 border border-dark-border">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <Target className="w-4 h-4 text-volt" />
                <span>What You Will Master:</span>
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {lesson.learningOutcomes.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-volt flex-shrink-0 mt-0.5" />
                    <span className="leading-normal">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Completion Celebration Alert */}
          {justCompleted && (
            <div className="p-4 rounded-2xl bg-volt/10 border border-volt/30 flex items-center justify-between gap-4 animate-fade-in">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-volt text-dark-bg font-bold">
                  <Check className="w-5 h-5 stroke-[3]" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">Lesson Completed!</h4>
                  <p className="text-xs text-slate-300">Your progress ring and recommendation trajectory updated.</p>
                </div>
              </div>
              {onNextLesson && (
                <Button variant="volt" size="sm" icon={ArrowRight} iconPosition="right" onClick={onNextLesson}>
                  Next Lesson
                </Button>
              )}
            </div>
          )}

        </div>

        {/* Modal Footer Controls */}
        <div className="p-4 sm:p-6 border-t border-dark-border/80 bg-dark-card/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3 flex-shrink-0">
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <Info className="w-4 h-4 text-slate-500" />
            <span>Structured for <strong className="text-white">athletex</strong> sequential coaching</span>
          </div>

          <div className="flex items-center gap-3">
            <Button variant="secondary" size="sm" onClick={onClose}>
              Close
            </Button>

            {isCompleted || justCompleted ? (
              <div className="flex items-center gap-2">
                <span className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-volt/15 text-volt border border-volt/30 text-xs font-bold">
                  <Check className="w-4 h-4 stroke-[3]" />
                  Completed
                </span>
                {onNextLesson && (
                  <Button variant="volt" size="sm" icon={ArrowRight} iconPosition="right" onClick={onNextLesson}>
                    Next Recommendation
                  </Button>
                )}
              </div>
            ) : (
              <Button
                variant="volt"
                size="sm"
                icon={Check}
                onClick={handleComplete}
              >
                Mark as Complete
              </Button>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default LessonModal;
