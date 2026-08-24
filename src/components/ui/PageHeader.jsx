import React from 'react';
import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const PageHeader = ({
  title,
  subtitle,
  badge,
  breadcrumbs = [],
  action,
  children,
  className = ''
}) => {
  return (
    <div className={`mb-8 ${className}`}>
      {/* Optional Breadcrumbs */}
      {breadcrumbs.length > 0 && (
        <nav className="flex items-center gap-2 text-xs text-slate-400 mb-3 font-medium">
          {breadcrumbs.map((crumb, idx) => (
            <React.Fragment key={idx}>
              {crumb.path ? (
                <Link to={crumb.path} className="hover:text-brand-300 transition-colors">
                  {crumb.label}
                </Link>
              ) : (
                <span className="text-slate-200">{crumb.label}</span>
              )}
              {idx < breadcrumbs.length - 1 && (
                <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
              )}
            </React.Fragment>
          ))}
        </nav>
      )}

      {/* Main Header Row */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 flex-wrap">
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white font-display">
              {title}
            </h1>
            {badge && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-brand-500/10 text-brand-300 border border-brand-500/20">
                {badge}
              </span>
            )}
          </div>
          {subtitle && (
            <p className="text-slate-400 text-sm mt-1 max-w-2xl">
              {subtitle}
            </p>
          )}
        </div>

        {action && (
          <div className="flex items-center gap-3 flex-shrink-0">
            {action}
          </div>
        )}
      </div>

      {children && <div className="mt-4">{children}</div>}
    </div>
  );
};

export default PageHeader;
