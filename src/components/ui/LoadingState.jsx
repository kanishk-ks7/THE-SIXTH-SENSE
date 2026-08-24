import React from 'react';
import { Loader2 } from 'lucide-react';

export const LoadingState = ({ message = 'Loading athlete data...', rows = 3 }) => {
  return (
    <div className="w-full space-y-4 p-6 animate-pulse">
      <div className="flex items-center gap-3 mb-6">
        <Loader2 className="w-5 h-5 animate-spin text-brand-400" />
        <span className="text-sm font-medium text-slate-400">{message}</span>
      </div>
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="h-20 bg-dark-surface/60 border border-dark-border/40 rounded-2xl w-full" />
      ))}
    </div>
  );
};

export default LoadingState;
