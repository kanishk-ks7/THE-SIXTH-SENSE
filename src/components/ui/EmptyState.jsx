import React from 'react';
import { Button } from './Button';

export const EmptyState = ({
  icon: Icon,
  title = 'No data available',
  description = 'There are currently no items to display.',
  actionText,
  onActionClick,
  className = ''
}) => {
  return (
    <div className={`flex flex-col items-center justify-center text-center p-8 sm:p-12 border border-dashed border-dark-border/80 rounded-2xl bg-dark-bg/40 ${className}`}>
      {Icon && (
        <div className="w-14 h-14 rounded-2xl bg-dark-card border border-dark-border flex items-center justify-center text-brand-400 mb-4 shadow-glow-sm">
          <Icon className="w-7 h-7" />
        </div>
      )}
      <h4 className="text-lg font-bold text-slate-200 font-display mb-1.5">
        {title}
      </h4>
      <p className="text-sm text-slate-400 max-w-md mb-6 leading-relaxed">
        {description}
      </p>
      {actionText && onActionClick && (
        <Button variant="outline" size="sm" onClick={onActionClick}>
          {actionText}
        </Button>
      )}
    </div>
  );
};

export default EmptyState;
