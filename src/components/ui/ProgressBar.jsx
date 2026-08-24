import React from 'react';

export const ProgressBar = ({
  value = 0,
  max = 100,
  label = '',
  showValue = true,
  size = 'md',
  color = 'brand', // 'brand' | 'volt' | 'emerald' | 'amber'
  className = '',
  animated = false
}) => {
  const percentage = Math.min(Math.max(Math.round((value / max) * 100), 0), 100);

  const heights = {
    sm: 'h-1.5',
    md: 'h-2.5',
    lg: 'h-4',
    xl: 'h-6'
  };

  const gradients = {
    brand: 'bg-gradient-to-r from-cyan-500 to-brand-400',
    volt: 'bg-gradient-to-r from-lime-500 to-volt',
    emerald: 'bg-gradient-to-r from-emerald-500 to-teal-400',
    amber: 'bg-gradient-to-r from-amber-500 to-yellow-400',
  };

  return (
    <div className={`w-full ${className}`}>
      {(label || showValue) && (
        <div className="flex items-center justify-between text-xs font-semibold mb-1.5">
          {label && <span className="text-slate-300">{label}</span>}
          {showValue && <span className="text-brand-300 font-mono">{percentage}%</span>}
        </div>
      )}
      <div className={`w-full bg-dark-bg/80 border border-dark-border/60 rounded-full overflow-hidden p-0.5 ${heights[size]}`}>
        <div
          className={`h-full rounded-full transition-all duration-500 ease-out ${gradients[color] || gradients.brand} ${animated ? 'animate-pulse' : ''}`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
