import React, { useState } from 'react';
import { 
  BookOpen, 
  Play, 
  Clock, 
  Bookmark, 
  Sparkles, 
  Search, 
  Layers, 
  Filter,
  CheckCircle2
} from 'lucide-react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import Modal from '../../components/ui/Modal';
import ModuleContainer from '../../components/ui/ModuleContainer';
import { LEARN_CATEGORIES, LEARN_RESOURCES } from '../../data/mockData';
import { useAthlete } from '../../context/AthleteContext';

/**
 * =========================================================================
 * TEAMMATE INTEGRATION MODULE: LearningModule
 * =========================================================================
 * Teammate Responsible: Sports Learning & Video Content Engine
 * 
 * Future Integration Guide:
 * - Replace mock resource items with real video player embeds (YouTube/Vimeo/HLS).
 * - Implement topic bookmarking and video completion tracking.
 * - Dynamically filter resources by athlete's selected sport and level.
 * =========================================================================
 */
export const LearningModule = () => {
  const { athlete, showToast } = useAthlete();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeResource, setActiveResource] = useState(null);

  const filteredResources = LEARN_RESOURCES.filter((res) => {
    const matchesCategory = selectedCategory === 'all' || res.category === selectedCategory;
    const matchesSearch = res.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          res.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <ModuleContainer
      moduleName="LearningModule.jsx"
      assignedTo="Learning Content Teammate"
      status="Ready for Integration"
      description="Comprehensive sports education repository covering rules, tactics, biomechanics, and skill execution."
    >
      <div className="space-y-6">

        {/* Search & Category Filter Bar */}
        <div className="flex flex-col md:flex-row gap-4 justify-between items-stretch md:items-center">
          
          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0">
            {LEARN_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  selectedCategory === cat.id
                    ? 'bg-brand-500 text-slate-950 shadow-glow-sm'
                    : 'bg-dark-surface border border-dark-border text-slate-300 hover:text-white hover:border-slate-600'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search topics..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-dark-surface border border-dark-border rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-all"
            />
          </div>
        </div>

        {/* Learning Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredResources.map((item) => (
            <Card
              key={item.id}
              className="flex flex-col justify-between group hover:border-brand-500/50 transition-all"
            >
              <div>
                {/* Card Header Tags */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <Badge variant="primary" size="sm">
                    {item.categoryLabel}
                  </Badge>
                  <div className="flex items-center gap-1 text-[11px] text-slate-400">
                    <Clock className="w-3 h-3" />
                    <span>{item.duration}</span>
                  </div>
                </div>

                {/* Title & Description */}
                <h3 className="text-base font-bold text-white font-display group-hover:text-brand-300 transition-colors mb-2">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-400 line-clamp-3 mb-4 leading-relaxed">
                  {item.description}
                </p>

                {/* Topic tags */}
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {item.topics.map((t, idx) => (
                    <span
                      key={idx}
                      className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-dark-bg border border-dark-border/60 text-slate-300"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Card Footer Button */}
              <div className="pt-3 border-t border-dark-border/40 flex items-center justify-between">
                <span className="text-[11px] text-slate-400 truncate">
                  By {item.author}
                </span>
                <Button
                  variant="primary"
                  size="sm"
                  icon={Play}
                  onClick={() => setActiveResource(item)}
                >
                  Start Learning
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {/* Learning Resource Preview Modal */}
        {activeResource && (
          <Modal
            isOpen={!!activeResource}
            onClose={() => setActiveResource(null)}
            title={activeResource.title}
            subtitle={`Category: ${activeResource.categoryLabel} • Duration: ${activeResource.duration}`}
            footer={
              <Button variant="primary" size="sm" onClick={() => {
                showToast(`Started learning: ${activeResource.title}`);
                setActiveResource(null);
              }}>
                Mark as In Progress
              </Button>
            }
          >
            <div className="space-y-4">
              {/* Video Player Placeholder Frame */}
              <div className="aspect-video w-full rounded-2xl bg-dark-bg border border-dark-border flex flex-col items-center justify-center p-6 text-center relative overflow-hidden group">
                <div className="w-14 h-14 rounded-full bg-brand-500/20 border border-brand-500/40 text-brand-300 flex items-center justify-center mb-3 shadow-glow-sm group-hover:scale-110 transition-transform">
                  <Play className="w-6 h-6 ml-0.5" />
                </div>
                <h4 className="text-sm font-bold text-white">
                  Video Player & Interactive Lesson Embed
                </h4>
                <p className="text-xs text-slate-400 mt-1 max-w-sm">
                  This media player slot is ready for teammate integration (YouTube, Vimeo, or custom video platform).
                </p>
              </div>

              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
                  Lesson Summary
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {activeResource.description}
                </p>
              </div>
            </div>
          </Modal>
        )}

      </div>
    </ModuleContainer>
  );
};

export default LearningModule;
