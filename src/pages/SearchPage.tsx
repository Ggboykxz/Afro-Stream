import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Search as SearchIcon, X, TrendingUp, History, Play, BookOpen } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { SEED_ANIMES } from '../lib/seedData';
import AnimeCard from '../components/anime/AnimeCard';
import { cn } from '../lib/utils';

export default function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('q') || '');
  const [results, setResults] = useState<any[]>([]);

  const trending = SEED_ANIMES.slice(0, 4);
  const recentSearches = ['Kizazi Moto', 'Shaka', 'Ijebu Shadows'];

  useEffect(() => {
    if (query.trim()) {
      const filtered = SEED_ANIMES.filter(a => 
        a.title.toLowerCase().includes(query.toLowerCase()) || 
        a.genres.some(g => g.toLowerCase().includes(query.toLowerCase())) ||
        a.country.toLowerCase().includes(query.toLowerCase())
      );
      setResults(filtered);
    } else {
      setResults([]);
    }
  }, [query]);

  const handleSearch = (q: string) => {
    setQuery(q);
    setSearchParams({ q });
  };

  return (
    <div className="flex flex-col min-h-screen pt-12 md:pt-20">
      <div className="max-w-4xl mx-auto w-full px-6 flex flex-col gap-12">
        
        {/* Search Input */}
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-accent-violet to-accent-orange rounded-[32px] blur opacity-25 group-focus-within:opacity-50 transition-opacity" />
          <div className="relative flex items-center bg-bg-secondary border border-white/10 rounded-[28px] overflow-hidden shadow-2xl">
            <SearchIcon className="ml-6 text-text-muted" size={24} />
            <input 
              type="text"
              autoFocus
              value={query}
              onChange={(e) => handleSearch(e.target.value)}
              placeholder="Rechercher sur AfroStream..."
              className="flex-grow px-6 py-6 bg-transparent focus:outline-none text-xl font-medium tracking-tight"
            />
            {query && (
              <button 
                onClick={() => handleSearch('')}
                className="mr-6 p-2 hover:bg-white/5 rounded-full transition-colors"
              >
                <X size={20} />
              </button>
            )}
          </div>
        </div>

        {/* Dynamic Content */}
        <div className="flex flex-col gap-12 pb-20">
          <AnimatePresence mode="wait">
            {!query ? (
              <motion.div 
                key="suggestions"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-12"
              >
                {/* Recent Searches */}
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-text-muted mb-6 flex items-center gap-2">
                    <History size={14} /> Recherches Récentes
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {recentSearches.map(s => (
                      <button 
                        key={s}
                        onClick={() => handleSearch(s)}
                        className="px-4 py-2 bg-bg-secondary hover:bg-bg-tertiary border border-border-subtle rounded-xl text-sm transition-colors"
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Trending */}
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-text-muted mb-6 flex items-center gap-2">
                    <TrendingUp size={14} /> Tendances Actuelles
                  </h3>
                  <div className="flex flex-col gap-3">
                    {trending.map((anime, idx) => (
                      <Link 
                        key={anime.id}
                        to={`/anime/${anime.id}`}
                        className="flex items-center gap-4 p-2 hover:bg-white/5 rounded-xl transition-all group"
                      >
                        <span className="text-2xl font-accent text-text-muted group-hover:text-accent-violet transition-colors">0{idx + 1}</span>
                        <div className="flex flex-col">
                          <span className="font-bold group-hover:text-accent-violet transition-colors">{anime.title}</span>
                          <span className="text-[10px] text-text-muted uppercase tracking-widest">{anime.format}</span>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div 
                key="results"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col gap-8"
              >
                <div className="flex items-center justify-between border-b border-white/5 pb-4">
                  <h3 className="text-lg font-display font-bold italic tracking-tight">
                    {results.length} Résultats pour "{query}"
                  </h3>
                  <div className="flex gap-2">
                     <span className="px-2 py-0.5 bg-accent-violet/10 text-accent-violet text-[10px] font-bold rounded">FILTRER</span>
                  </div>
                </div>

                {results.length > 0 ? (
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
                    {results.map(anime => (
                      <AnimeCard key={anime.id} anime={anime} />
                    ))}
                  </div>
                ) : (
                  <div className="py-20 text-center flex flex-col items-center gap-4">
                    <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center">
                       <X className="text-text-muted" size={32} />
                    </div>
                    <p className="text-text-secondary">Nous n'avons rien trouvé correspondant à votre recherche.</p>
                    <button 
                      onClick={() => handleSearch('')}
                      className="text-accent-violet font-bold hover:underline"
                    >
                      Essayer une autre recherche
                    </button>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
