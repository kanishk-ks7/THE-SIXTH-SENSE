import React from 'react';
import PageHeader from '../components/ui/PageHeader';
import ProgressModule from '../modules/progress/ProgressModule';

export const Progress = () => {
  return (
    <div className="space-y-6">
      <PageHeader
        title="My Progress & Analytics"
        subtitle="Track your readiness trajectory, physical metrics, and assessment scores across all 4 pillars."
        badge="Performance Telemetry"
        breadcrumbs={[
          { label: 'Dashboard', path: '/dashboard' },
          { label: 'Progress' }
        ]}
      />

      {/* Teammate Pluggable Progress Module */}
      <ProgressModule />
    </div>
  );
};

export default Progress;
