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
  RotateCcw,
  ChevronRight,
  ArrowRight,
  Target,
  Flame,
  Flag
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
 * ATHLETE PORTAL MODULE: EventModule (Events & Selection Pathway Engine)
 * =========================================================================
 * Scope: Local | District | State | National (Coimbatore & Tamil Nadu demo)
 * Features: Selection Pathway 4-Stage Visualizer, Location-based GPS Sorting,
 * Tier Filter, and Demo Registration.
 * =========================================================================
 */
export const EventModule = () => {
  const navigate = useNavigate();
  const { savedEvents, toggleSaveEvent, registeredEvents, competitionResults, athlete, showToast } = useAthlete();
  
  const [activeTab, setActiveTab] = useState('All');
  const [tierFilter, setTierFilter] = useState('All'); // 'All' | 'Local' | 'District' | 'State' | 'National'
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

  const TIERS = [
    { id: 'All', label: 'All Tiers' },
    { id: 'Local', label: 'Local' },
    { id: 'District', label: 'District' },
    { id: 'State', label: 'State' },
    { id: 'National', label: 'National' }
  ];

  const SPORTS = ['All', 'Football', 'Basketball', 'Athletics', 'Tennis', 'Cricket', 'Badminton'];

  // Selection Pathway Stages definition
  const PATHWAY_STAGES = [
    {
      id: 'Local',
      title: 'Local',
      tagline: 'Grassroots & Club Meets',
      description: 'Community leagues, inter-school & neighborhood invitationals.',
      icon: MapPin,
      tierColor: 'border-slate-600 bg-slate-800/40 text-slate-300',
      activeColor: 'border-slate-400 bg-slate-700/60 text-white'
    },
    {
      id: 'District',
      title: 'District',
      tagline: 'District Trials & Meets',
      description: 'Coimbatore District championships & official squad selection trials.',
      icon: Award,
      tierColor: 'border-brand-500/30 bg-brand-500/10 text-brand-300',
      activeColor: 'border-brand-500 bg-brand-500/20 text-brand-200 shadow-glow-brand'
    },
    {
      id: 'State',
      title: 'State',
      tagline: 'CM Trophy & Zonal Finals',
      description: 'Tamil Nadu State Championships, SDAT meets, and zonal selections.',
      icon: Trophy,
      tierColor: 'border-volt/30 bg-volt/10 text-volt',
      activeColor: 'border-volt bg-volt/20 text-volt shadow-glow-volt'
    },
    {
      id: 'National',
      title: 'National',
      tagline: 'Khelo India & Nationals',
      description: 'National federation youth cups, SAI trials & Indian national feeder.',
      icon: Sparkles,
      tierColor: 'border-amber-500/30 bg-amber-500/10 text-amber-300',
      activeColor: 'border-amber-500 bg-amber-500/20 text-amber-200'
    }
  ];

  /**
   * Determine athlete's current stage in the selection pathway
   * TODO: Real competition tier mapping to be defined when profile model is extended (no natural 3-to-4 mapping from beginner/intermediate/advanced)
   */
  const currentAthleteTier = useMemo(() => {
    if (athlete?.competitionTier) {
      return athlete.competitionTier;
    }
    // Default to 'Local' stage as fallback
    return 'Local';
  }, [athlete?.competitionTier]);

  /**
   * Check which tiers the athlete has completed results at
   */
  const completedTiers = useMemo(() => {
    const passed = new Set();
    if (Array.isArray(competitionResults)) {
      competitionResults.forEach(res => {
        if (res.status === 'completed' && res.tier) {
          passed.add(res.tier);
        }
      });
    }
    return passed;
  }, [competitionResults]);

  /**
   * Request user geolocation on explicit button click
   */
  const handleRequestLocation = async () => {
    setIsLocating(true);
    try {
      const coords = await getUserLocation();
      setUserLocation(coords);
      setSortByProximity(true);
      showToast('Location detected! Events sorted by proximity to Coimbatore.', 'success');
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
   * Handle clicking a stage on the Selection Pathway
   */
  const handlePathwayStageClick = (stageId) => {
    if (tierFilter === stageId) {
      setTierFilter('All');
      showToast(`Showing all competition tiers`, 'info');
    } else {
      setTierFilter(stageId);
      showToast(`Filtered feed to ${stageId} Tier events`, 'info');
    }
  };

  /**
   * Filter and sort events based on search, tab, tier, sport, and proximity
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

      // Tier Filter Match
      const tierMatch = tierFilter === 'All' || evt.tier === tierFilter;

      // Sport Filter Match
      const sportMatch = sportFilter === 'All' || evt.sport.toLowerCase() === sportFilter.toLowerCase();

      // Search Query Match
      const searchLower = searchQuery.toLowerCase();
      const searchMatch = !searchQuery ||
        evt.name.toLowerCase().includes(searchLower) ||
        evt.location.toLowerCase().includes(searchLower) ||
        evt.sport.toLowerCase().includes(searchLower) ||
        (evt.tier && evt.tier.toLowerCase().includes(searchLower)) ||
        evt.level.toLowerCase().includes(searchLower) ||
        (evt.organizer && evt.organizer.toLowerCase().includes(searchLower));

      // Radius Filter Match
      let radiusMatch = true;
      if (userLocation && radiusFilter !== 'all' && evt.distanceKm !== undefined) {
        radiusMatch = evt.distanceKm <= parseInt(radiusFilter, 10);
      }

      return tabMatch && tierMatch && sportMatch && searchMatch && radiusMatch;
    });
  }, [COMPETITION_EVENTS, savedEvents, registeredEvents, activeTab, tierFilter, sportFilter, searchQuery, userLocation, sortByProximity, radiusFilter]);

  /**
   * Helper to render tier badge with consistent variant
   */
  const renderTierBadge = (tier) => {
    switch (tier) {
      case 'National':
        return <Badge variant="amber" size="sm">National</Badge>;
      case 'State':
        return <Badge variant="volt" size="sm">State</Badge>;
      case 'District':
        return <Badge variant="primary" size="sm">District</Badge>;
      case 'Local':
      default:
        return <Badge variant="default" size="sm">Local</Badge>;
    }
  };

  return (
    <ModuleContainer
      moduleName="EventModule.jsx"
      assignedTo="Events, Selections & Trials"
      status="Integrated & Live"
      description="Selection pathway tracking, scouted Coimbatore/Tamil Nadu tournaments, GPS proximity sorting, and verified registration."
    >
      <div className="space-y-6">

        {/* ========================================================= */}
        {/* SELECTION PATHWAY VISUALIZATION (CHANGE 3) */}
        {/* ========================================================= */}
        <Card className="p-5 bg-dark-surface/90 border-dark-border space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-dark-border/60">
            <div>
              <div className="flex items-center gap-2">
                <Target className="w-4 h-4 text-volt" />
                <h3 className="text-sm font-bold text-white font-display tracking-tight">
                  Tamil Nadu Athlete Selection Pathway
                </h3>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Progression ladder from Coimbatore grassroots to National squads. Tap any stage to filter opportunities.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-[11px] text-slate-400 font-semibold">Active Tier:</span>
              <Badge variant="volt" size="sm">
                {currentAthleteTier} Stage
              </Badge>
            </div>
          </div>

          {/* 4 Connected Stages Ladder */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {PATHWAY_STAGES.map((stage, idx) => {
              const StageIcon = stage.icon;
              const isCurrent = currentAthleteTier === stage.id;
              const isPassed = completedTiers.has(stage.id);
              const isFilterActive = tierFilter === stage.id;

              return (
                <button
                  key={stage.id}
                  type="button"
                  onClick={() => handlePathwayStageClick(stage.id)}
                  className={`p-3.5 rounded-2xl border text-left transition-all relative overflow-hidden flex flex-col justify-between group ${
                    isFilterActive
                      ? 'border-volt ring-2 ring-volt/30 bg-dark-bg shadow-glow-volt/20'
                      : isCurrent
                      ? 'border-brand-400/60 bg-dark-bg/90'
                      : 'border-dark-border/80 bg-dark-bg/50 hover:border-slate-600 hover:bg-dark-bg/80'
                  }`}
                >
                  <div>
                    {/* Top Row: Step Index & Status Badge */}
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-mono font-bold text-slate-500 uppercase">
                        Stage 0{idx + 1}
                      </span>

                      {isPassed ? (
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-400 bg-emerald-500/15 px-2 py-0.5 rounded-full border border-emerald-500/30">
                          <CheckCircle2 className="w-3 h-3" />
                          Passed
                        </span>
                      ) : isCurrent ? (
                        <span className="text-[10px] font-bold text-volt bg-volt/15 px-2 py-0.5 rounded-full border border-volt/30 animate-pulse">
                          Current
                        </span>
                      ) : (
                        <span className="text-[10px] text-slate-500 font-medium">
                          Upcoming
                        </span>
                      )}
                    </div>

                    {/* Stage Title & Icon */}
                    <div className="flex items-center gap-2 mb-1">
                      <div className={`p-1.5 rounded-lg ${isFilterActive ? 'bg-volt/20 text-volt' : 'bg-dark-card text-slate-300'}`}>
                        <StageIcon className="w-4 h-4" />
                      </div>
                      <h4 className="text-sm font-bold text-white font-display group-hover:text-volt transition-colors">
                        {stage.title}
                      </h4>
                    </div>

                    <p className="text-[11px] font-semibold text-brand-300/90 leading-tight">
                      {stage.tagline}
                    </p>
                    <p className="text-[10px] text-slate-400 mt-1 leading-snug line-clamp-2">
                      {stage.description}
                    </p>
                  </div>

                  {/* Stage Bottom Sync Indicator */}
                  <div className="mt-3 pt-2 border-t border-dark-border/40 flex items-center justify-between text-[10px]">
                    <span className={`font-semibold ${isFilterActive ? 'text-volt' : 'text-slate-500 group-hover:text-slate-300'}`}>
                      {isFilterActive ? 'Filtered Active' : 'Filter by Tier'}
                    </span>
                    <ChevronRight className={`w-3 h-3 ${isFilterActive ? 'text-volt translate-x-0.5' : 'text-slate-600 group-hover:translate-x-0.5'} transition-transform`} />
                  </div>
                </button>
              );
            })}
          </div>
        </Card>

        {/* ========================================================= */}
        {/* TIER FILTER & CONTROLS (CHANGE 2) */}
        {/* ========================================================= */}
        <div className="space-y-3">
          
          {/* Tier Buttons Bar */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 mr-1 flex items-center gap-1.5">
              <Flag className="w-3.5 h-3.5 text-brand-400" />
              Tier:
            </span>

            {TIERS.map((tier) => (
              <button
                key={tier.id}
                type="button"
                onClick={() => setTierFilter(tier.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  tierFilter === tier.id
                    ? 'bg-volt text-slate-950 font-bold shadow-glow-volt'
                    : 'bg-dark-surface border border-dark-border text-slate-300 hover:text-white hover:border-slate-600'
                }`}
              >
                {tier.label}
              </button>
            ))}
          </div>

          {/* Search, GPS & Sport Filters Bar */}
          <div className="flex flex-col lg:flex-row gap-3 items-stretch lg:items-center justify-between">
            
            {/* Search Box */}
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search Coimbatore meets, trials, venues, or sports..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-dark-surface border border-dark-border rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-all"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                  aria-label="Clear search"
                >
                  <XCircle className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Location & Sport Selectors */}
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

        {/* ========================================================= */}
        {/* EVENT CARDS GRID */}
        {/* ========================================================= */}
        {processedEvents.length === 0 ? (
          <div className="p-12 text-center border border-dashed border-dark-border/80 rounded-3xl bg-dark-surface/40 space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-dark-card border border-dark-border flex items-center justify-center text-slate-400 mx-auto shadow-glow-sm">
              <Trophy className="w-6 h-6" />
            </div>
            <h4 className="text-base font-bold text-slate-200 font-display">
              No matching events found
            </h4>
            <p className="text-xs text-slate-400 max-w-sm mx-auto leading-relaxed">
              No events found matching your selected tier ({tierFilter}), sport ({sportFilter}), or location criteria.
            </p>
            {(searchQuery || sportFilter !== 'All' || radiusFilter !== 'all' || activeTab !== 'All' || tierFilter !== 'All') && (
              <Button
                variant="secondary"
                size="sm"
                onClick={() => {
                  setSearchQuery('');
                  setTierFilter('All');
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
                    
                    {/* Card Header: Tier Badge, Type, Status, Distance, Save */}
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex flex-wrap items-center gap-1.5">
                        
                        {/* Visible Tier Badge (Change 2 & 5) */}
                        {renderTierBadge(evt.tier)}

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
                        title={isSaved ? 'Remove from Bookmarked' : 'Bookmark Event'}
                        aria-label={isSaved ? 'Remove from bookmarked' : 'Bookmark event'}
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
                          Pathway Tier: <strong className="text-brand-300">{evt.tier}</strong>
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
                          Registered Pass
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
            subtitle={`${selectedEvent.tier} Tier &bull; ${selectedEvent.type} &bull; ${selectedEvent.sport}`}
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
                  <span className="text-slate-400">Competition Tier:</span>
                  <span className="font-bold text-volt">{selectedEvent.tier} Tier</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Venue &amp; Location:</span>
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
                  <strong>Tamil Nadu Scouting Notice:</strong> Official SDAT and federation scouts will evaluate performance metrics, tactical play, and bio-mechanics for state &amp; national squad selection.
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
