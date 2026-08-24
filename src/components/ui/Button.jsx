import React from 'react';
import { Loader2 } from 'lucide-react';

export const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  icon: Icon,
  iconPosition = 'left',
  loading = false,
  disabled = false,
  type = 'button',
  onClick,
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-medium transition-all duration-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed select-none active:scale-[0.98]';

  const variants = {
    primary: 'bg-gradient-to-r from-brand-500 to-cyan-400 hover:from-brand-600 hover:to-cyan-500 text-slate-950 font-semibold shadow-glow-sm hover:shadow-glow-brand focus:ring-brand-400 focus:ring-offset-dark-bg',
    volt: 'bg-volt hover:bg-volt-400 text-slate-950 font-bold shadow-glow-volt hover:shadow-lg focus:ring-volt focus:ring-offset-dark-bg',
    secondary: 'bg-dark-surface hover:bg-dark-card text-slate-200 border border-dark-border hover:border-slate-600 focus:ring-slate-400 focus:ring-offset-dark-bg',
    outline: 'border border-brand-500/40 text-brand-300 hover:bg-brand-500/10 hover:border-brand-400 focus:ring-brand-400 focus:ring-offset-dark-bg',
    ghost: 'text-slate-300 hover:text-white hover:bg-white/5 focus:ring-slate-400 focus:ring-offset-dark-bg',
    danger: 'bg-red-500/20 text-red-400 border border-red-500/30 hover:bg-red-500/30 focus:ring-red-400',
  };

  const sizes = {
    sm: 'text-xs px-3 py-1.5 gap-1.5',
    md: 'text-sm px-4 py-2.5 gap-2',
    lg: 'text-base px-6 py-3.5 gap-2.5 font-semibold',
  };

  return (
    <button
      type={type}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={disabled || loading}
      onClick={onClick}
      {...props}
    >
      {loading && <Loader2 className="w-4 h-4 animate-spin text-current" />}
      {!loading && Icon && iconPosition === 'left' && <Icon className="w-4 h-4 flex-shrink-0" />}
      <span>{children}</span>
      {!loading && Icon && iconPosition === 'right' && <Icon className="w-4 h-4 flex-shrink-0" />}
    </button>
  );
};

export default Button;
