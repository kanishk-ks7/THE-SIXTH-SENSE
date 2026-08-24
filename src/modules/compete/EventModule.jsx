import React, { useState } from 'react';
import { 
  Trophy, 
  MapPin, 
  Calendar, 
  Bookmark, 
  BookmarkCheck, 
  ExternalLink, 
  Search, 
  Filter,
  Shield,
  Sparkles,
  Info
} from 'lucide-react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import Modal from '../../components/ui/Modal';
import ModuleContainer from '../../components/ui/ModuleContainer';
import { COMPETITION_EVENTS } from '../../data/mockData';
import { useAthlete } from '../../context/AthleteContext';

/**
 * =========================================================================
 * TEAMMATE INTEGRATION MODULE: EventModule
 * =========================================================================
 * Teammate Responsible: Sports Event Aggregation, Trials & Scouting Feed
 * 
 * Future Integration Guide:
 * - Ingest tournament data from national federations and regional trial APIs.
 * - Implement official registration form submissions and ticket confirmation.
 * - Filter matches based on athlete's verified age, sport, and geographic location.
 * =========================================================================
 */
export const EventModule = () => {
  const { savedEvents, toggleSaveEvent, athlete, showToast } = useAthlete();
  const [activeTab, setActiveTab] = useState('All');
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const TABS = ['All', 'Upcoming Events', 'Selection Trials', 'Competitions', 'Saved Opportunities'];

  const filteredEvents = COMPETITION_EVENTS.filter((evt) => {
    const isSaved = savedEvents.includes(evt.id);
    let tabMatch = true;
    if (activeTab === 'Saved Opportunities') {
      tabMatch = isSaved;
    } else if (activeTab !== 'All') {
      tabMatch = evt.type === activeTab;
    }

    const searchMatch = evt.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        evt.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        evt.level.toLowerCase().includes(searchQuery.toLowerCase());

    return tabMatch && searchMatch;
  });

  return (
    <ModuleContainer
      moduleName="EventModule.jsx"
      assignedTo="Competitions & Trials Teammate"
      status="Ready for Integration"
      description="Scouted match discovery, academy trials calendar, and competitive registration engine."
    >
      <div className="space-y-6">

        {/* Filter & Search Bar */}
        <div className="flex flex-col md:flex-row gap-4 justify-between items-stretch md:items-center">
          
          {/* Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0">
            {TABS.map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  activeTab === tab
                    ? 'bg-brand-500 text-slate-950 shadow-glow-sm'
                    : 'bg-dark-surface border border-dark-border text-slate-300 hover:text-white hover:border-slate-600'
                }`}
              >
                {tab}
                {tab === 'Saved Opportunities' && savedEvents.length > 0 && (
                  <span className="ml-1.5 px-1.5 py-0.2 rounded-full bg-slate-950 text-brand-300 text-[10px]">
                    {savedEvents.length}
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search tournaments..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-dark-surface border border-dark-border rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-all"
            />
          </div>
        </div>

        {/* Event Cards Grid */}
        {filteredEvents.length === 0 ? (
          <div className="p-12 text-center border border-dashed border-dark-border rounded-2xl bg-dark-surface/40">
            <Trophy className="w-10 h-10 text-slate-500 mx-auto mb-3" />
            <h4 className="text-sm font-bold text-slate-300 mb-1">No competition events found</h4>
            <p className="text-xs text-slate-500">Try adjusting your search filters or browse other tabs.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredEvents.map((evt) => {
              const isSaved = savedEvents.includes(evt.id);
              return (
                <Card
                  key={evt.id}
                  className="flex flex-col justify-between group hover:border-brand-500/40 transition-all"
                >
                  <div>
                    {/* Event Header: Type, Status, Save Action */}
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div className="flex items-center gap-2">
                        <Badge
                          variant={evt.type === 'Selection Trials' ? 'volt' : 'primary'}
                          size="sm"
                        >
                          {evt.type}
                        </Badge>
                        <Badge variant="emerald" size="sm">
                          {evt.status}
                        </Badge>
                      </div>

                      <button
                        type="button"
                        onClick={() => toggleSaveEvent(evt.id)}
                        className={`p-2 rounded-xl border transition-all ${
                          isSaved
                            ? 'bg-brand-500/20 text-brand-300 border-brand-500/40'
                            : 'bg-dark-bg text-slate-400 border-dark-border hover:text-white'
                        }`}
                        title={isSaved ? 'Remove from Saved' : 'Save Event'}
                        aria-label="Save event"
                      >
                        {isSaved ? (
                          <BookmarkCheck className="w-4 h-4 text-brand-400" />
                        ) : (
                          <Bookmark className="w-4 h-4" />
                        )}
                      </button>
                    </div>

                    {/* Title */}
                    <h3 className="text-base sm:text-lg font-bold text-white font-display group-hover:text-brand-300 transition-colors mb-3">
                      {evt.name}
                    </h3>

                    {/* Details List */}
                    <div className="space-y-2 text-xs text-slate-300 mb-4 bg-dark-bg/60 p-3.5 rounded-xl border border-dark-border/60">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-3.5 h-3.5 text-brand-400 flex-shrink-0" />
                        <span className="truncate">{evt.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-3.5 h-3.5 text-volt flex-shrink-0" />
                        <span>{evt.date}</span>
                      </div>
                      <div className="flex items-center justify-between pt-1 border-t border-dark-border/40 text-[11px]">
                        <span className="text-slate-400">Target Level: <strong className="text-slate-200">{evt.level}</strong></span>
                        <span className="text-slate-400">Sport: <strong className="text-slate-200">{evt.sport}</strong></span>
                      </div>
                    </div>
                  </div>

                  {/* Footer Actions */}
                  <div className="pt-3 border-t border-dark-border/40 flex items-center justify-between gap-3">
                    <span className="text-[11px] text-slate-400 truncate">
                      {evt.organizer}
                    </span>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => toggleSaveEvent(evt.id)}
                      >
                        {isSaved ? 'Saved' : 'Save'}
                      </Button>
                      <Button
                        variant="primary"
                        size="sm"
                        onClick={() => setSelectedEvent(evt)}
                      >
                        View Details
                      </Button>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        )}

        {/* Event Details Modal */}
        {selectedEvent && (
          <Modal
            isOpen={!!selectedEvent}
            onClose={() => setSelectedEvent(null)}
            title={selectedEvent.name}
            subtitle={`${selectedEvent.type} • ${selectedEvent.sport}`}
            footer={
              <>
                <Button variant="secondary" size="sm" onClick={() => setSelectedEvent(null)}>
                  Close
                </Button>
                <Button
                  variant="volt"
                  size="sm"
                  onClick={() => {
                    showToast(`Registration initiated for ${selectedEvent.name}`);
                    setSelectedEvent(null);
                  }}
                >
                  Register for Event
                </Button>
              </>
            }
          >
            <div className="space-y-4 text-xs">
              <div className="p-4 rounded-xl bg-dark-bg border border-dark-border space-y-2.5">
                <div className="flex justify-between">
                  <span className="text-slate-400">Location:</span>
                  <span className="font-semibold text-white">{selectedEvent.location}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Dates:</span>
                  <span className="font-semibold text-white">{selectedEvent.date}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Eligibility:</span>
                  <span className="font-semibold text-brand-300">{selectedEvent.eligibility}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Sanctioned By:</span>
                  <span className="font-semibold text-slate-200">{selectedEvent.organizer}</span>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-brand-500/10 border border-brand-500/30 text-brand-200">
                <p className="leading-relaxed">
                  <strong>Scouting Note:</strong> Official regional scouts will be present at this event to evaluate players for upcoming state squad trials.
                </p>
              </div>
            </div>
          </Modal>
        )}

      </div>
    </ModuleContainer>
  );
};

export default EventModule;
