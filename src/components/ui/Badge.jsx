import React from 'react';

export const Badge = ({
  children,
  variant = 'default',
  size = 'md',
  className = '',
  dot = false,
  ...props
}) => {
  const variants = {
    default: 'bg-slate-800/80 text-slate-300 border-slate-700',
    primary: 'bg-brand-500/15 text-brand-300 border-brand-500/30',
    volt: 'bg-volt/15 text-volt-dark dark:text-volt border-volt/30',
    emerald: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30',
    amber: 'bg-amber-500/15 text-amber-300 border-amber-500/30',
    rose: 'bg-rose-500/15 text-rose-300 border-rose-500/30',
    purple: 'bg-purple-500/15 text-purple-300 border-purple-500/30',
    locked: 'bg-slate-800/50 text-slate-500 border-slate-700/50'
  };

  const sizes = {
    sm: 'text-xs px-2 py-0.5',
    md: 'text-xs px-2.5 py-1',
    lg: 'text-sm px-3.5 py-1.5 font-semibold'
  };

  const dotColors = {
    default: 'bg-slate-400',
    primary: 'bg-brand-400',
    volt: 'bg-volt',
    emerald: 'bg-emerald-400',
    amber: 'bg-amber-400',
    rose: 'bg-rose-400',
    purple: 'bg-purple-400',
    locked: 'bg-slate-600'
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 font-medium rounded-full border ${variants[variant] || variants.default} ${sizes[size]} ${className}`}
      {...props}
    >
      {dot && <span className={`w-1.5 h-1.5 rounded-full ${dotColors[variant] || 'bg-brand-400'}`} />}
      {children}
    </span>
  );
};

export default Badge;
