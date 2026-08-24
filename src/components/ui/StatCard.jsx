import React from 'react';
import { TrendingUp, ArrowRight } from 'lucide-react';

export const StatCard = ({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  color = 'cyan', // 'cyan' | 'volt' | 'emerald' | 'amber' | 'purple'
  className = '',
  actionText,
  onActionClick
}) => {
  const colorMap = {
    cyan: {
      border: 'hover:border-cyan-500/50',
      iconBg: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
      glow: 'group-hover:shadow-[0_0_25px_-5px_rgba(6,182,212,0.3)]',
      valueColor: 'text-white'
    },
    volt: {
      border: 'hover:border-volt/50',
      iconBg: 'bg-volt/10 text-volt border-volt/20',
      glow: 'group-hover:shadow-[0_0_25px_-5px_rgba(204,255,0,0.3)]',
      valueColor: 'text-white'
    },
    emerald: {
      border: 'hover:border-emerald-500/50',
      iconBg: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
      glow: 'group-hover:shadow-[0_0_25px_-5px_rgba(16,185,129,0.3)]',
      valueColor: 'text-white'
    },
    amber: {
      border: 'hover:border-amber-500/50',
      iconBg: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
      glow: 'group-hover:shadow-[0_0_25px_-5px_rgba(245,158,11,0.3)]',
      valueColor: 'text-white'
    },
    purple: {
      border: 'hover:border-purple-500/50',
      iconBg: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
      glow: 'group-hover:shadow-[0_0_25px_-5px_rgba(139,92,246,0.3)]',
      valueColor: 'text-white'
    }
  };

  const scheme = colorMap[color] || colorMap.cyan;

  return (
    <div
      className={`group relative overflow-hidden bg-dark-surface/90 border border-dark-border rounded-2xl p-6 transition-all duration-300 ${scheme.border} ${scheme.glow} ${className}`}
    >
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            {title}
          </p>
          <h4 className={`text-2xl sm:text-3xl font-extrabold tracking-tight font-display ${scheme.valueColor}`}>
            {value}
          </h4>
        </div>
        {Icon && (
          <div className={`p-3 rounded-xl border flex-shrink-0 ${scheme.iconBg}`}>
            <Icon className="w-5 h-5" />
          </div>
        )}
      </div>

      {(subtitle || trend || actionText) && (
        <div className="mt-4 pt-3 border-t border-dark-border/60 flex items-center justify-between text-xs text-slate-400">
          <div className="flex items-center gap-1.5 truncate">
            {trend && (
              <span className="flex items-center gap-0.5 text-emerald-400 font-semibold">
                <TrendingUp className="w-3.5 h-3.5" />
                {trend}
              </span>
            )}
            <span className="truncate">{subtitle}</span>
          </div>

          {actionText && (
            <button
              onClick={onActionClick}
              className="flex items-center gap-1 text-brand-400 hover:text-brand-300 font-semibold transition-colors flex-shrink-0 ml-2"
            >
              <span>{actionText}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default StatCard;
