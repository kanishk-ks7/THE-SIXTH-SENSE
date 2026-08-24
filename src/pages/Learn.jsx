import React from 'react';
import PageHeader from '../components/ui/PageHeader';
import LearningModule from '../modules/learn/LearningModule';

export const Learn = () => {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Learn Your Sport"
        subtitle="Master the fundamentals, official match rules, advanced strategies, and biomechanics."
        badge="Sports Science & Theory"
        breadcrumbs={[
          { label: 'Dashboard', path: '/dashboard' },
          { label: 'Learn' }
        ]}
      />

      {/* Teammate Pluggable Learning Module */}
      <LearningModule />
    </div>
  );
};

export default Learn;
