import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Trophy, 
  MapPin, 
  Calendar, 
  Bookmark, 
  BookmarkCheck, 
  ExternalLink, 
  Search, 
  Filter,
  ShieldCheck, 
  Sparkles,
  Info,
  Navigation,
  CheckCircle2,
  Clock,
  Award,
  Layers,
  XCircle,
  RotateCcw
} from 'lucide-react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import Modal from '../../components/ui/Modal';
import ModuleContainer from '../../components/ui/ModuleContainer';
import { COMPETITION_EVENTS } from '../../data/mockData';
import { useAthlete } from '../../context/AthleteContext';
import { getUserLocation, enrichEventsWithDistance, sortEventsByProximity } from '../../utils/geoUtils';

/**
 * =========================================================================
 * ATHLETE PORTAL MODULE: EventModule (Events & Trials Engine)
 * =========================================================================
 * Responsible for: Competition & Trial Discovery, GPS Proximity Filtering,
 * Event Bookmark Storage, and Registration Gateway.
 * =========================================================================
 */
export const EventModule = () => {
  const navigate = useNavigate();
  const { savedEvents, toggleSaveEvent, registeredEvents, athlete, showToast } = useAthlete();
  
  const [activeTab, setActiveTab] = useState('All');
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [sportFilter, setSportFilter] = useState('All');
  
  // Geolocation state
  const [userLocation, setUserLocation] = useState(null);
  const [isLocating, setIsLocating] = useState(false);
  const [radiusFilter, setRadiusFilter] = useState('all'); // 'all' | '25' | '50' | '100'
  const [sortByProximity, setSortByProximity] = useState(false);

  const TABS = [
    'All',
    'Upcoming Events',
    'Selection Trials',
    'Competitions',
    'Saved Opportunities',
    'Registered Events'
  ];

  const SPORTS = ['All', 'Football', 'Basketball', 'Athletics', 'Tennis', 'Cricket'];

  /**
   * Request user geolocation on explicit button click
   */
  const handleRequestLocation = async () => {
    setIsLocating(true);
    try {
      const coords = await getUserLocation();
      setUserLocation(coords);
      setSortByProximity(true);
      showToast('Location detected! Events sorted by proximity.', 'success');
    } catch (err) {
      console.warn('Geolocation notice:', err.message);
      showToast(err.message || 'Location permission denied. Showing all events.', 'info');
    } finally {
      setIsLocating(false);
    }
  };

  /**
   * Clear active location filter
   */
  const handleClearLocation = () => {
    setUserLocation(null);
    setSortByProximity(false);
    setRadiusFilter('all');
    showToast('Location filter cleared.', 'info');
  };

  /**
   * Filter and sort events based on search, tab, sport, and proximity
   */
  const processedEvents = useMemo(() => {
    let list = COMPETITION_EVENTS;

    // Enrich with distance if location available
    if (userLocation) {
      list = enrichEventsWithDistance(list, userLocation.latitude, userLocation.longitude);
      if (sortByProximity) {
        list = [...list].sort((a, b) => {
          const distA = a.distanceKm !== undefined ? a.distanceKm : Infinity;
          const distB = b.distanceKm !== undefined ? b.distanceKm : Infinity;
          return distA - distB;
        });
      }
    }

    return list.filter((evt) => {
      const isSaved = savedEvents.includes(evt.id);
      const isRegistered = registeredEvents.includes(evt.id);

      // Tab Match
      let tabMatch = true;
      if (activeTab === 'Saved Opportunities') {
        tabMatch = isSaved;
      } else if (activeTab === 'Registered Events') {
        tabMatch = isRegistered;
      } else if (activeTab !== 'All') {
        tabMatch = evt.type === activeTab;
      }

      // Sport Filter Match
      const sportMatch = sportFilter === 'All' || evt.sport.toLowerCase() === sportFilter.toLowerCase();

      // Search Query Match
      const searchLower = searchQuery.toLowerCase();
      const searchMatch = !searchQuery ||
        evt.name.toLowerCase().includes(searchLower) ||
        evt.location.toLowerCase().includes(searchLower) ||
        evt.sport.toLowerCase().includes(searchLower) ||
        evt.level.toLowerCase().includes(searchLower) ||
        (evt.organizer && evt.organizer.toLowerCase().includes(searchLower));

      // Radius Filter Match
      let radiusMatch = true;
      if (userLocation && radiusFilter !== 'all' && evt.distanceKm !== undefined) {
        radiusMatch = evt.distanceKm <= parseInt(radiusFilter, 10);
      }

      return tabMatch && sportMatch && searchMatch && radiusMatch;
    });
  }, [COMPETITION_EVENTS, savedEvents, registeredEvents, activeTab, sportFilter, searchQuery, userLocation, sortByProximity, radiusFilter]);

  return (
    <ModuleContainer
      moduleName="EventModule.jsx"
      assignedTo="Events & Competition Discovery"
      status="Integrated & Live"
      description="Scouted match discovery, verified trial calendar, GPS proximity filter, and registration portal."
    >
      <div className="space-y-6">

        {/* Top Control Bar: Search & Location */}
        <div className="flex flex-col lg:flex-row gap-3 items-stretch lg:items-center justify-between">
          
          {/* Search Box */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search tournaments, trials, cities, or organizers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-dark-surface border border-dark-border rounded-xl pl-9 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-all"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
              >
                <XCircle className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Location Actions & Filters */}
          <div className="flex flex-wrap items-center gap-2">
            
            {/* GPS Location Button */}
            {!userLocation ? (
              <Button
                variant="outline"
                size="sm"
                icon={Navigation}
                loading={isLocating}
                onClick={handleRequestLocation}
                className="whitespace-nowrap"
              >
                Use My Location
              </Button>
            ) : (
              <div className="flex items-center gap-1.5 bg-volt/10 border border-volt/30 px-3 py-1.5 rounded-xl text-xs">
                <span className="w-2 h-2 rounded-full bg-volt animate-ping" />
                <span className="text-volt font-bold text-[11px]">Proximity Active</span>
                
                {/* Radius Select */}
                <select
                  value={radiusFilter}
                  onChange={(e) => setRadiusFilter(e.target.value)}
                  className="ml-1 bg-dark-bg/80 border border-dark-border rounded-lg text-[11px] px-2 py-0.5 text-slate-200 focus:outline-none focus:border-volt"
                  aria-label="Filter events by radius"
                >
                  <option value="all">All Distances</option>
                  <option value="25">&lt; 25 km</option>
                  <option value="50">&lt; 50 km</option>
                  <option value="100">&lt; 100 km</option>
                </select>

                <button
                  type="button"
                  onClick={handleClearLocation}
                  title="Reset Location"
                  className="ml-1 text-slate-400 hover:text-white p-0.5 rounded"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
              </div>
            )}

            {/* Sport Filter Dropdown */}
            <select
              value={sportFilter}
              onChange={(e) => setSportFilter(e.target.value)}
              className="bg-dark-surface border border-dark-border text-slate-300 rounded-xl text-xs px-3 py-2 focus:outline-none focus:border-brand-500"
              aria-label="Filter events by sport"
            >
              {SPORTS.map((sp) => (
                <option key={sp} value={sp}>
                  {sp === 'All' ? 'All Sports' : sp}
                </option>
              ))}
            </select>

          </div>
        </div>

        {/* Tab Selector */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-dark-border/60 scrollbar-none">
          {TABS.map((tab) => {
            const isTabActive = activeTab === tab;
            let count = null;
            if (tab === 'Saved Opportunities' && savedEvents.length > 0) {
              count = savedEvents.length;
            } else if (tab === 'Registered Events' && registeredEvents.length > 0) {
              count = registeredEvents.length;
            }

            return (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                  isTabActive
                    ? 'bg-brand-500 text-slate-950 shadow-glow-sm font-bold'
                    : 'bg-dark-surface border border-dark-border text-slate-400 hover:text-white hover:border-slate-600'
                }`}
              >
                <span>{tab}</span>
                {count !== null && (
                  <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-bold ${
                    isTabActive
                      ? 'bg-slate-950 text-brand-300'
                      : 'bg-dark-bg text-slate-300 border border-dark-border'
                  }`}>
                    {count}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Event Cards Grid */}
        {processedEvents.length === 0 ? (
          <div className="p-12 text-center border border-dashed border-dark-border/80 rounded-3xl bg-dark-surface/40 space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-dark-card border border-dark-border flex items-center justify-center text-slate-400 mx-auto shadow-glow-sm">
              <Trophy className="w-6 h-6" />
            </div>
            <h4 className="text-base font-bold text-slate-200 font-display">
              No matching events found
            </h4>
            <p className="text-xs text-slate-400 max-w-sm mx-auto leading-relaxed">
              Try adjusting your sport, proximity radius, or search filters to discover more competitive opportunities.
            </p>
            {(searchQuery || sportFilter !== 'All' || radiusFilter !== 'all' || activeTab !== 'All') && (
              <Button
                variant="secondary"
                size="sm"
                onClick={() => {
                  setSearchQuery('');
                  setSportFilter('All');
                  setRadiusFilter('all');
                  setActiveTab('All');
                }}
              >
                Reset All Filters
              </Button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {processedEvents.map((evt) => {
              const isSaved = savedEvents.includes(evt.id);
              const isRegistered = registeredEvents.includes(evt.id);
              const isPast = evt.status === 'Completed' || (evt.startDate && new Date(evt.startDate) < new Date());

              return (
                <Card
                  key={evt.id}
                  className="flex flex-col justify-between group hover:border-brand-500/40 transition-all duration-300"
                >
                  <div className="space-y-3">
                    
                    {/* Card Header: Type, Status, Distance, Save */}
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex flex-wrap items-center gap-1.5">
                        <Badge
                          variant={evt.type === 'Selection Trials' ? 'volt' : 'primary'}
                          size="sm"
                        >
                          {evt.type}
                        </Badge>
                        
                        {isRegistered ? (
                          <Badge variant="emerald" size="sm" dot={true}>
                            Registered
                          </Badge>
                        ) : (
                          <Badge variant={isPast ? 'default' : 'emerald'} size="sm">
                            {evt.status}
                          </Badge>
                        )}

                        {evt.formattedDistance && (
                          <Badge variant="volt" size="sm">
                            {evt.formattedDistance}
                          </Badge>
                        )}
                      </div>

                      {/* Bookmark Save Button */}
                      <button
                        type="button"
                        onClick={() => toggleSaveEvent(evt.id)}
                        className={`p-2 rounded-xl border transition-all ${
                          isSaved
                            ? 'bg-brand-500/20 text-brand-300 border-brand-500/40'
                            : 'bg-dark-bg text-slate-400 border-dark-border hover:text-white'
                        }`}
                        title={isSaved ? 'Remove from Saved' : 'Save Event'}
                        aria-label={isSaved ? 'Remove from saved' : 'Save event'}
                      >
                        {isSaved ? (
                          <BookmarkCheck className="w-4 h-4 text-brand-400" />
                        ) : (
                          <Bookmark className="w-4 h-4" />
                        )}
                      </button>
                    </div>

                    {/* Title */}
                    <div>
                      <h3 className="text-base sm:text-lg font-bold text-white font-display group-hover:text-brand-300 transition-colors leading-snug">
                        {evt.name}
                      </h3>
                      {evt.description && (
                        <p className="text-xs text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                          {evt.description}
                        </p>
                      )}
                    </div>

                    {/* Details Info Box */}
                    <div className="space-y-2 text-xs text-slate-300 bg-dark-bg/60 p-3.5 rounded-xl border border-dark-border/60">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-3.5 h-3.5 text-brand-400 flex-shrink-0" />
                        <span className="truncate">{evt.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-3.5 h-3.5 text-volt flex-shrink-0" />
                        <span>{evt.date}</span>
                      </div>
                      <div className="flex items-center justify-between pt-1 border-t border-dark-border/40 text-[11px]">
                        <span className="text-slate-400">
                          Sport: <strong className="text-slate-200">{evt.sport}</strong>
                        </span>
                        <span className="text-slate-400">
                          Target Level: <strong className="text-slate-200">{evt.level}</strong>
                        </span>
                      </div>
                    </div>

                  </div>

                  {/* Card Footer Actions */}
                  <div className="pt-3 mt-4 border-t border-dark-border/40 flex items-center justify-between gap-3">
                    <span className="text-[11px] text-slate-400 truncate max-w-[140px] sm:max-w-none">
                      {evt.organizer}
                    </span>

                    <div className="flex items-center gap-2 flex-shrink-0">
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => setSelectedEvent(evt)}
                      >
                        Details
                      </Button>

                      {isRegistered ? (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => navigate(`/events/register/${evt.id}`)}
                        >
                          View Pass
                        </Button>
                      ) : (
                        <Button
                          variant={isPast ? 'secondary' : 'volt'}
                          size="sm"
                          onClick={() => navigate(`/events/register/${evt.id}`)}
                        >
                          {isPast ? 'Past Event' : 'Register'}
                        </Button>
                      )}
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        )}

        {/* Detailed Modal View */}
        {selectedEvent && (
          <Modal
            isOpen={!!selectedEvent}
            onClose={() => setSelectedEvent(null)}
            title={selectedEvent.name}
            subtitle={`${selectedEvent.type} &bull; ${selectedEvent.sport}`}
            footer={
              <>
                <Button variant="secondary" size="sm" onClick={() => setSelectedEvent(null)}>
                  Close
                </Button>
                <Button
                  variant="volt"
                  size="sm"
                  onClick={() => {
                    const evtId = selectedEvent.id;
                    setSelectedEvent(null);
                    navigate(`/events/register/${evtId}`);
                  }}
                >
                  {registeredEvents.includes(selectedEvent.id) ? 'View Registration Pass' : 'Proceed to Registration'}
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
                {selectedEvent.formattedDistance && (
                  <div className="flex justify-between">
                    <span className="text-slate-400">Proximity:</span>
                    <span className="font-semibold text-volt">{selectedEvent.formattedDistance}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-slate-400">Tournament Dates:</span>
                  <span className="font-semibold text-white">{selectedEvent.date}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Registration Deadline:</span>
                  <span className="font-semibold text-amber-300">{selectedEvent.registrationDeadline || 'Closing Soon'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Eligibility / Age:</span>
                  <span className="font-semibold text-brand-300">{selectedEvent.eligibility}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Sanctioned By:</span>
                  <span className="font-semibold text-slate-200">{selectedEvent.organizer}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Entry Fee:</span>
                  <span className="font-semibold text-slate-200">{selectedEvent.fee || 'Free Entry'}</span>
                </div>
              </div>

              {selectedEvent.description && (
                <div className="p-3.5 rounded-xl bg-dark-card border border-dark-border text-slate-300 leading-relaxed">
                  <p>{selectedEvent.description}</p>
                </div>
              )}

              <div className="p-3.5 rounded-xl bg-brand-500/10 border border-brand-500/30 text-brand-200 flex items-start gap-2.5">
                <ShieldCheck className="w-4 h-4 text-brand-400 flex-shrink-0 mt-0.5" />
                <p className="leading-relaxed">
                  <strong>Scouting Evaluation Notice:</strong> Certified regional scouts will be evaluating performance metrics and bio-mechanics during this event.
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
