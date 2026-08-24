import React from 'react';
import { Code2, Sparkles, CheckCircle2 } from 'lucide-react';
import Badge from './Badge';

/**
 * ModuleContainer provides a clean architectural boundary for team members to plug in their components.
 */
export const ModuleContainer = ({
  moduleName,
  assignedTo = 'Teammate Module',
  status = 'Ready for Extension',
  description,
  children,
  className = ''
}) => {
  return (
    <div className={`space-y-6 ${className}`}>
      {/* Teammate Integration Banner (Discrete sports-tech developer note) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 px-4 bg-dark-bg/60 border border-brand-500/20 rounded-xl text-xs text-slate-400">
        <div className="flex items-center gap-2">
          <Code2 className="w-4 h-4 text-brand-400 flex-shrink-0" />
          <span className="font-semibold text-slate-200">{moduleName}</span>
          <span className="hidden sm:inline text-slate-600">|</span>
          <span className="truncate">{description || 'Clean modular entry point for team member integration.'}</span>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <Badge variant="primary" size="sm" dot>
            {assignedTo}
          </Badge>
          <Badge variant="emerald" size="sm">
            {status}
          </Badge>
        </div>
      </div>

      {/* Module Content */}
      <div className="relative">
        {children}
      </div>
    </div>
  );
};

export default ModuleContainer;
