import React from 'react';
import PageHeader from '../components/ui/PageHeader';
import ResultsModule from '../modules/results/ResultsModule';

export const Results = () => {
  return (
    <div className="space-y-6">
      <PageHeader
        title="My Results & Record Archive"
        subtitle="Verified match statistics, assessment history, and unlocked athletic achievements."
        badge="Official Athletic Record"
        breadcrumbs={[
          { label: 'Dashboard', path: '/dashboard' },
          { label: 'Results' }
        ]}
      />

      {/* Teammate Pluggable Results Module */}
      <ResultsModule />
    </div>
  );
};

export default Results;
