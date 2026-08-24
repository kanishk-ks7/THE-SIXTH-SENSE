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
  const baseStyles = 'inline-flex items-center justify-center font-medium transition-all duration-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed select-none active:scale-[0.98] cursor-pointer';

  const variants = {
    primary: 'bg-gradient-to-r from-brand-500 via-cyan-400 to-cyan-300 hover:from-brand-400 hover:to-cyan-200 text-slate-950 font-bold shadow-glow-sm hover:shadow-glow-cyan hover:scale-[1.01] focus:ring-brand-400 focus:ring-offset-dark-bg',
    volt: 'bg-gradient-to-r from-volt via-lime-400 to-volt hover:from-lime-300 hover:to-volt-300 text-slate-950 font-extrabold shadow-glow-volt hover:shadow-[0_0_28px_-2px_rgba(204,255,0,0.6)] hover:scale-[1.02] focus:ring-volt focus:ring-offset-dark-bg',
    secondary: 'bg-dark-surface/90 hover:bg-dark-card text-slate-100 border border-dark-border hover:border-slate-500/80 shadow-sm hover:shadow-glow-sm hover:text-white focus:ring-slate-400 focus:ring-offset-dark-bg backdrop-blur-md',
    outline: 'border border-brand-500/40 text-brand-300 hover:bg-brand-500/10 hover:border-brand-300 hover:text-white focus:ring-brand-400 focus:ring-offset-dark-bg',
    ghost: 'text-slate-300 hover:text-white hover:bg-white/5 focus:ring-slate-400 focus:ring-offset-dark-bg',
    danger: 'bg-red-500/20 text-red-400 border border-red-500/30 hover:bg-red-500/30 focus:ring-red-400',
  };

  const sizes = {
    sm: 'text-xs px-3 py-1.5 gap-1.5',
    md: 'text-sm px-4.5 py-2.5 gap-2',
    lg: 'text-base px-6.5 py-3.5 gap-2.5 font-bold',
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
