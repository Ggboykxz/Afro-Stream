import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { 
  Filter, 
  Search as SearchIcon, 
  X, 
  ChevronDown,
  LayoutGrid,
  List as ListIcon
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { SEED_ANIMES } from '../lib/seedData';
import AnimeCard from '../components/anime/AnimeCard';
import { cn } from '../lib/utils';

export default function CataloguePage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const filters = {
    format: searchParams.get('format') || 'all',
    status: searchParams.get('status') || 'all',
    country: searchParams.get('country') || 'all',
    sort: searchParams.get('sort') || 'rating'
  };

  const setFilter = (key: string, value: string) => {
    const newParams = new URLSearchParams(searchParams);
    if (value === 'all') {
      newParams.delete(key);
    } else {
      newParams.set(key, value);
    }
    setSearchParams(newParams);
  };

  const filteredAnimes = useMemo(() => {
    return SEED_ANIMES.filter(anime => {
      const matchSearch = anime.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          anime.genres.some(g => g.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchFormat = filters.format === 'all' || anime.format === filters.format;
      const matchStatus = filters.status === 'all' || anime.status === filters.status;
      const matchCountry = filters.country === 'all' || anime.country === filters.country;
      
      return matchSearch && matchFormat && matchStatus && matchCountry;
    }).sort((a, b) => {
      if (filters.sort === 'rating') return b.rating - a.rating;
      if (filters.sort === 'popularity') return b.popularity - a.popularity;
      if (filters.sort === 'new') return b.id.localeCompare(a.id); // Placeholder for date
      return 0;
    });
  }, [searchQuery, filters]);

  const categories = {
    format: ['All', 'Anime', 'Webtoon', 'Manga', 'Film'],
    status: ['All', 'Ongoing', 'Completed', 'Upcoming'],
    sort: [
      { label: 'Note', value: 'rating' },
      { label: 'Popularité', value: 'popularity' },
      { label: 'Nouveautés', value: 'new' }
    ]
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header / Search Area */}
      <div className="bg-bg-secondary border-b border-border-subtle px-6 md:px-12 py-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col gap-2">
            <h1 className="text-3xl font-display font-black italic tracking-tight uppercase">Catalogue Afro</h1>
            <p className="text-text-secondary text-sm">Parcourez {SEED_ANIMES.length} œuvres du continent.</p>
          </div>

          <div className="relative w-full md:w-96">
            <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" size={20} />
            <input 
              type="text"
              placeholder="Rechercher un anime, manga..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-12 py-4 bg-bg-primary border border-border-subtle rounded-2xl focus:outline-none focus:border-accent-violet transition-colors text-sm"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:bg-white/5 rounded-full"
              >
                <X size={16} />
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="flex-grow flex flex-col lg:flex-row max-w-7xl mx-auto w-full px-6 md:px-12 py-10 gap-10">
        {/* Sidebar Filters */}
        <aside className="hidden lg:flex flex-col gap-8 w-64 shrink-0">
          <div className="space-y-6">
            <div>
              <h3 className="font-display font-bold uppercase tracking-widest text-[10px] text-text-muted mb-4 border-b border-border-subtle pb-2">Format</h3>
              <div className="flex flex-col gap-2">
                {categories.format.map(f => (
                  <button 
                    key={f}
                    onClick={() => setFilter('format', f.toLowerCase())}
                    className={cn(
                      "px-4 py-2 rounded-xl text-sm font-medium text-left transition-all",
                      filters.format === f.toLowerCase() ? "bg-accent-violet text-white" : "hover:bg-white/5 text-text-secondary"
                    )}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-display font-bold uppercase tracking-widest text-[10px] text-text-muted mb-4 border-b border-border-subtle pb-2">Statut</h3>
              <div className="flex flex-col gap-2">
                {categories.status.map(s => (
                  <button 
                    key={s}
                    onClick={() => setFilter('status', s.toLowerCase())}
                    className={cn(
                      "px-4 py-2 rounded-xl text-sm font-medium text-left transition-all",
                      filters.status === s.toLowerCase() ? "bg-accent-violet text-white" : "hover:bg-white/5 text-text-secondary"
                    )}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="p-6 bg-gradient-to-br from-accent-violet/20 to-accent-orange/10 rounded-2xl border border-white/5 text-center">
               <p className="text-xs font-bold mb-3 italic">DEVENEZ PREMIUM</p>
               <button className="w-full py-2 bg-accent-gold text-black rounded-lg text-[10px] font-black uppercase tracking-tighter shadow-lg shadow-accent-gold/20">
                 DÉBLOQUER TOUT
               </button>
            </div>
          </div>
        </aside>

        {/* Main Grid */}
        <div className="flex-grow flex flex-col gap-6">
          {/* Controls Bar */}
          <div className="flex items-center justify-between bg-bg-secondary/40 p-4 rounded-2xl border border-border-subtle">
             <div className="flex items-center gap-2">
                 <span className="text-xs font-bold text-text-secondary uppercase tracking-widest">{filteredAnimes.length}</span>
                 <span className="text-[10px] font-bold text-text-muted uppercase tracking-widest">Résultats</span>
             </div>
             
             <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 bg-bg-primary rounded-xl p-1 border border-border-subtle">
                   {categories.sort.map(s => (
                     <button
                       key={s.value}
                       onClick={() => setFilter('sort', s.value)}
                       className={cn(
                         "px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase transition-all",
                         filters.sort === s.value ? "bg-accent-violet text-white" : "hover:bg-white/5 text-text-muted"
                       )}
                     >
                       {s.label}
                     </button>
                   ))}
                </div>
                <button className="lg:hidden p-2 bg-bg-primary rounded-xl border border-border-subtle" onClick={() => setIsSidebarOpen(true)}>
                  <Filter size={18} />
                </button>
             </div>
          </div>

          {/* Grid */}
          {filteredAnimes.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
              {filteredAnimes.map(anime => (
                <AnimeCard key={anime.id} anime={anime} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-24 gap-4 text-text-muted">
              <SearchIcon size={64} className="opacity-20" />
              <p className="text-lg font-display font-bold italic">Aucun résultat trouvé</p>
              <button 
                onClick={() => {
                  setSearchParams(new URLSearchParams());
                  setSearchQuery('');
                }}
                className="text-accent-violet font-bold text-sm hover:underline"
              >
                Réinitialiser les filtres
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-black/80 md:hidden backdrop-blur-sm"
            onClick={() => setIsSidebarOpen(false)}
          >
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              className="absolute bottom-0 left-0 right-0 bg-bg-primary rounded-t-[32px] p-8 max-h-[80vh] overflow-y-auto"
              onClick={e => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-xl font-display font-black uppercase italic">Filtres</h2>
                <button onClick={() => setIsSidebarOpen(false)} className="p-2 hover:bg-white/5 rounded-full">
                  <X size={24} />
                </button>
              </div>

              <div className="space-y-8">
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-widest text-text-muted mb-4">Format</h3>
                  <div className="flex flex-wrap gap-2">
                    {categories.format.map(f => (
                      <button 
                        key={f}
                        onClick={() => setFilter('format', f.toLowerCase())}
                        className={cn(
                          "px-4 py-2 rounded-xl text-sm font-medium transition-all",
                          filters.format === f.toLowerCase() ? "bg-accent-violet text-white" : "bg-bg-secondary text-text-secondary"
                        )}
                      >
                        {f}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-xs font-bold uppercase tracking-widest text-text-muted mb-4">Statut</h3>
                  <div className="flex flex-wrap gap-2">
                    {categories.status.map(s => (
                      <button 
                        key={s}
                        onClick={() => setFilter('status', s.toLowerCase())}
                        className={cn(
                          "px-4 py-2 rounded-xl text-sm font-medium transition-all",
                          filters.status === s.toLowerCase() ? "bg-accent-violet text-white" : "bg-bg-secondary text-text-secondary"
                        )}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>

                <button 
                  onClick={() => setIsSidebarOpen(false)}
                  className="w-full py-4 bg-accent-violet rounded-2xl font-bold mt-4"
                >
                  Appliquer
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
