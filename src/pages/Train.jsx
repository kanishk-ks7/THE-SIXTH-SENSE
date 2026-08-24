import React from 'react';
import PageHeader from '../components/ui/PageHeader';
import TrainingModule from '../modules/train/TrainingModule';

export const Train = () => {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Training Hub"
        subtitle="Daily routines, weekly conditioning programs, and precision technical drills."
        badge="Performance Conditioning"
        breadcrumbs={[
          { label: 'Dashboard', path: '/dashboard' },
          { label: 'Train' }
        ]}
      />

      {/* Teammate Pluggable Training Module */}
      <TrainingModule />
    </div>
  );
};

export default Train;
