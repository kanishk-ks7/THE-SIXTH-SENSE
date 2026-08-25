import React, { useState } from 'react';
import { 
  Play, 
  Clock, 
  CheckCircle2, 
  Check, 
  Sparkles, 
  Target, 
  Award,
  Video,
  ExternalLink
} from 'lucide-react';
import Card from '../ui/Card';
import Button from '../ui/Button';

export const LessonVideoCard = ({
  lesson,
  isCompleted = false,
  isRecommended = false,
  onOpenLesson
}) => {
  const [imgError, setImgError] = useState(false);

  const videoId = lesson.videoId || lesson.youtubeId || 'w4S8jW9L0w0';
  // High-res YouTube thumbnail URL
  const ytThumbnail = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
  // Fallback sports cover
  const fallbackCover = 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=600&auto=format&fit=crop&q=80';

  return (
    <Card className="flex flex-col justify-between group hover:border-brand-500/60 transition-all duration-300 relative overflow-hidden bg-gradient-to-b from-dark-surface to-dark-card p-0">
      
      {/* Top Accent Gradient Border */}
      <div className={`h-1 w-full ${
        isRecommended 
          ? 'bg-gradient-to-r from-brand-500 via-volt to-brand-400' 
          : isCompleted 
            ? 'bg-volt/60' 
            : 'bg-dark-border group-hover:bg-brand-500/50'
      } transition-all`} />

      <div className="p-4 sm:p-5 flex flex-col justify-between flex-grow space-y-4">
        
        {/* 1. HERO VIDEO THUMBNAIL PREVIEW (Primary Visual Element) */}
        <div 
          onClick={() => onOpenLesson && onOpenLesson(lesson)}
          className="relative aspect-video w-full rounded-2xl overflow-hidden bg-dark-bg cursor-pointer group/thumb border border-dark-border/80 shadow-md"
        >
          {/* Video Thumbnail Image */}
          <img
            src={imgError ? fallbackCover : ytThumbnail}
            alt={lesson.title}
            onError={() => setImgError(true)}
            className="w-full h-full object-cover group-hover/thumb:scale-105 transition-transform duration-500"
            loading="lazy"
          />

          {/* Dark Overlay Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-dark-bg/90 via-dark-bg/30 to-black/20 group-hover/thumb:from-dark-bg/80 transition-opacity" />

          {/* Top Chips on Thumbnail */}
          <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between gap-2 z-10">
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-lg bg-dark-bg/90 backdrop-blur-md border border-dark-border text-slate-200 capitalize">
              {lesson.category}
            </span>

            {isRecommended && (
              <span className="flex items-center gap-1 text-[10px] font-extrabold px-2.5 py-0.5 rounded-lg bg-volt text-dark-bg shadow-glow-volt">
                <Sparkles className="w-3 h-3" />
                Live Demo
              </span>
            )}

            {isCompleted && (
              <span className="flex items-center gap-1 text-[10px] font-bold px-2.5 py-0.5 rounded-lg bg-volt/90 text-dark-bg">
                <Check className="w-3 h-3 stroke-[3]" />
                Completed
              </span>
            )}
          </div>

          {/* Center Interactive Play Button Overlay */}
          <div className="absolute inset-0 flex items-center justify-center z-10">
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-300 shadow-2xl ${
              isRecommended 
                ? 'bg-volt text-dark-bg group-hover/thumb:scale-110 shadow-glow-volt' 
                : 'bg-dark-surface/90 text-white border border-white/20 group-hover/thumb:bg-brand-500 group-hover/thumb:text-dark-bg group-hover/thumb:scale-110'
            }`}>
              <Play className="w-5 h-5 fill-current ml-0.5" />
            </div>
          </div>

          {/* Bottom Duration Badge on Thumbnail */}
          <div className="absolute bottom-2.5 right-2.5 z-10">
            <span className="flex items-center gap-1 text-[11px] font-mono font-bold px-2 py-0.5 rounded-md bg-black/80 backdrop-blur-md text-white border border-white/10">
              <Clock className="w-3 h-3 text-slate-300" />
              {lesson.duration}
            </span>
          </div>

          {/* Coach Name on Bottom Left */}
          {lesson.coach && (
            <div className="absolute bottom-2.5 left-2.5 z-10 truncate max-w-[65%]">
              <span className="text-[10px] font-medium text-slate-300 drop-shadow truncate block">
                Coach: {lesson.coach}
              </span>
            </div>
          )}
        </div>

        {/* 2. LESSON INFO (Short, Scannable Text) */}
        <div className="space-y-2">
          
          {/* Recommendation Tag / Reason if applicable */}
          {lesson.recommendationBadge && isRecommended && (
            <div className="flex items-center gap-1.5 text-[11px] font-bold text-volt">
              <Target className="w-3.5 h-3.5 flex-shrink-0" />
              <span className="truncate">{lesson.recommendationBadge}</span>
            </div>
          )}

          {/* Title */}
          <h4 
            onClick={() => onOpenLesson && onOpenLesson(lesson)}
            className="text-sm sm:text-base font-bold text-white font-display group-hover:text-brand-300 transition-colors line-clamp-2 cursor-pointer leading-snug"
          >
            {lesson.title}
          </h4>

          {/* Short 1-2 line description */}
          <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
            {lesson.description}
          </p>

          {/* Skill Chips */}
          {lesson.skills && lesson.skills.length > 0 && (
            <div className="flex flex-wrap gap-1.5 pt-1">
              {lesson.skills.slice(0, 3).map((skill, idx) => (
                <span
                  key={idx}
                  className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-dark-bg/80 border border-dark-border/60 text-slate-300 truncate"
                >
                  {skill}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* 3. CARD FOOTER: Visual Action Button */}
        <div className="pt-3 border-t border-dark-border/50 flex items-center justify-between gap-2">
          <div className="text-[11px] text-slate-400 capitalize">
            {lesson.difficulty || lesson.level}
          </div>

          <Button
            variant={isCompleted ? 'secondary' : isRecommended ? 'volt' : 'primary'}
            size="sm"
            icon={isCompleted ? Check : Play}
            onClick={() => onOpenLesson && onOpenLesson(lesson)}
          >
            {isCompleted ? 'Review' : isRecommended ? 'Watch Live' : 'View Lesson'}
          </Button>
        </div>

      </div>

    </Card>
  );
};

export default LessonVideoCard;
