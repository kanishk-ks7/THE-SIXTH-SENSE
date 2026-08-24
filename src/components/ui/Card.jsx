import React from 'react';

export const Card = ({
  children,
  className = '',
  hover = true,
  glow = false,
  bordered = true,
  padding = 'default',
  onClick,
  ...props
}) => {
  const paddings = {
    none: '',
    sm: 'p-4',
    default: 'p-6',
    lg: 'p-8'
  };

  const glowStyle = glow ? 'border-brand-500/40 shadow-glow-sm' : '';
  const hoverStyle = hover ? 'hover:border-brand-400/40 hover:bg-dark-cardHover/90 hover:shadow-sport-card-hover hover:-translate-y-1 transition-all duration-300' : '';
  const borderStyle = bordered ? 'border border-white/[0.08]' : '';

  return (
    <div
      className={`bg-dark-card/75 backdrop-blur-xl rounded-2xl ${borderStyle} ${glowStyle} ${hoverStyle} ${paddings[padding]} ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </div>
  );
};

export const CardHeader = ({ children, className = '' }) => (
  <div className={`flex items-center justify-between pb-4 mb-4 border-b border-dark-border/60 ${className}`}>
    {children}
  </div>
);

export const CardTitle = ({ children, className = '' }) => (
  <h3 className={`text-lg font-bold text-slate-100 flex items-center gap-2 ${className}`}>
    {children}
  </h3>
);

export const CardDescription = ({ children, className = '' }) => (
  <p className={`text-sm text-slate-400 mt-1 ${className}`}>
    {children}
  </p>
);

export default Card;
