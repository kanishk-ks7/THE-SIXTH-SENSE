import React from 'react';
import PageHeader from '../components/ui/PageHeader';
import EventModule from '../modules/compete/EventModule';

export const Events = () => {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Competition & Trial Events"
        subtitle="Discover scouted tournaments, verified selection trials, and regional championships."
        badge="Live Scouting Feed"
        breadcrumbs={[
          { label: 'Dashboard', path: '/dashboard' },
          { label: 'Events' }
        ]}
      />

      {/* Teammate Pluggable Event Module */}
      <EventModule />
    </div>
  );
};

export default Events;
