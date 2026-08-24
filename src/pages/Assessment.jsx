import React from 'react';
import PageHeader from '../components/ui/PageHeader';
import AssessmentModule from '../modules/assessment/AssessmentModule';

export const Assessment = () => {
  return (
    <div className="space-y-6">
      <PageHeader
        title="AI Athlete Assessment"
        subtitle="Evaluate the 4 performance pillars to generate your personalized career progression roadmap."
        badge="Multi-Pillar Diagnostics"
        breadcrumbs={[
          { label: 'Dashboard', path: '/dashboard' },
          { label: 'Assessment' }
        ]}
      />

      {/* Teammate Pluggable Assessment Module */}
      <AssessmentModule />
    </div>
  );
};

export default Assessment;
