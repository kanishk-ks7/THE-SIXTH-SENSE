import React from 'react';
import PageHeader from '../components/ui/PageHeader';
import RoadmapModule from '../modules/roadmap/RoadmapModule';

export const Roadmap = () => {
  return (
    <div className="space-y-6">
      <PageHeader
        title="My Athlete Roadmap"
        subtitle="A vertical milestone trajectory engineered to take you from grassroots fundamentals to competitive selection."
        badge="8-Stage Pathway"
        breadcrumbs={[
          { label: 'Dashboard', path: '/dashboard' },
          { label: 'Roadmap' }
        ]}
      />

      {/* Teammate Pluggable Roadmap Module */}
      <RoadmapModule />
    </div>
  );
};

export default Roadmap;
