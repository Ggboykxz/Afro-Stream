import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Play, 
  Heart, 
  Share2, 
  Bell, 
  Star, 
  ChevronDown, 
  ChevronUp,
  Clock,
  Calendar
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { SEED_ANIMES } from '../lib/seedData';
import { formatDuration, cn } from '../lib/utils';
import CategoryRow from '../components/home/CategoryRow';

export default function AnimePage() {
  const { id } = useParams();
  const [anime, setAnime] = useState<any>(null);
  const [isSynopsisExpanded, setIsSynopsisExpanded] = useState(false);
  const [selectedSeason, setSelectedSeason] = useState(1);

  useEffect(() => {
    const found = SEED_ANIMES.find(a => a.id === id);
    setAnime(found);
    window.scrollTo(0, 0);
  }, [id]);

  if (!anime) return <div className="p-20 text-center">Chargement...</div>;

  const similarAnimes = SEED_ANIMES.filter(a => anime.similarIds?.includes(a.id));

  return (
    <div className="flex flex-col">
      {/* Hero Section with Banner Background */}
      <div className="relative w-full h-[40vh] md:h-[60vh] overflow-hidden">
        <img 
          src={anime.bannerUrl} 
          alt={anime.title} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-bg-primary via-bg-primary/60 to-transparent" />
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 -mt-32 md:-mt-48 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 pb-20">
        
        {/* Left Column - Poster & Actions */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="aspect-[2/3] rounded-2xl overflow-hidden shadow-2xl border border-white/10 ring-1 ring-white/5"
          >
            <img src={anime.posterUrl} alt={anime.title} className="w-full h-full object-cover" />
          </motion.div>

          <div className="grid grid-cols-2 gap-4">
            <button className="flex items-center justify-center gap-2 py-4 bg-accent-violet hover:bg-violet-600 rounded-xl font-bold transition-all shadow-lg shadow-accent-violet/20">
              <Heart size={20} /> Favoris
            </button>
            <button className="flex items-center justify-center gap-2 py-4 bg-white/10 hover:bg-white/20 rounded-xl font-bold transition-all border border-white/5">
              <Share2 size={20} /> Partager
            </button>
          </div>
          
          <button className="flex items-center justify-center gap-3 py-4 bg-bg-secondary hover:bg-bg-tertiary border border-border-subtle rounded-xl font-bold transition-all text-text-secondary">
            <Bell size={20} /> Notifier les sorties
          </button>
        </div>

        {/* Right Column - Info & Episodes */}
        <div className="lg:col-span-8 flex flex-col gap-10">
          <div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
            >
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <span className="px-3 py-1 bg-accent-violet/20 border border-accent-violet/40 rounded text-[10px] font-bold uppercase tracking-widest text-accent-violet">
                  {anime.format}
                </span>
                <span className="px-3 py-1 bg-green-500/20 border border-green-500/40 rounded text-[10px] font-bold uppercase tracking-widest text-green-400">
                  {anime.status === 'ongoing' ? 'En cours' : 'Terminé'}
                </span>
                <span className="text-text-muted text-xs">•</span>
                <span className="text-text-secondary text-sm font-medium">{anime.country}</span>
              </div>

              <h1 className="text-4xl md:text-6xl font-display font-black mb-4 leading-tight tracking-tight italic">
                {anime.title}
              </h1>
              
              {anime.titleOriginal && (
                <h2 className="text-xl text-text-secondary mb-6 font-medium">
                  {anime.titleOriginal}
                </h2>
              )}

              <div className="flex items-center gap-6 mb-8">
                <div className="flex flex-col">
                  <div className="flex items-center gap-1 text-accent-gold mb-1">
                    <Star fill="currentColor" size={20} />
                    <span className="text-3xl font-accent leading-none">{anime.rating.toFixed(1)}</span>
                  </div>
                  <span className="text-[10px] text-text-muted font-bold uppercase tracking-widest">Score AfroStream</span>
                </div>
                <div className="h-10 w-px bg-border-subtle" />
                <div className="flex flex-col">
                  <span className="text-2xl font-accent text-white leading-none">#{anime.popularity}</span>
                  <span className="text-[10px] text-text-muted font-bold uppercase tracking-widest">Popularité</span>
                </div>
              </div>

              <div className="relative">
                <p className={cn(
                  "text-text-secondary leading-relaxed mb-4 transition-all duration-300",
                  !isSynopsisExpanded && "line-clamp-3"
                )}>
                  {anime.synopsis}
                </p>
                <button 
                  onClick={() => setIsSynopsisExpanded(!isSynopsisExpanded)}
                  className="text-accent-violet text-xs font-bold uppercase tracking-widest flex items-center gap-1 hover:underline"
                >
                  {isSynopsisExpanded ? (
                    <>Lire moins <ChevronUp size={14} /></>
                  ) : (
                    <>Lire plus <ChevronDown size={14} /></>
                  )}
                </button>
              </div>
            </motion.div>
          </div>

          {/* Episode List */}
          <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between border-b border-border-subtle pb-4">
              <div className="flex gap-6">
                <button 
                  className={cn(
                    "text-lg font-display font-bold relative pb-4 transition-colors",
                    selectedSeason === 1 ? "text-white" : "text-text-muted hover:text-text-secondary"
                  )}
                  onClick={() => setSelectedSeason(1)}
                >
                  Saison 01
                  {selectedSeason === 1 && (
                    <motion.div layoutId="tab" className="absolute bottom-0 left-0 right-0 h-1 bg-accent-violet rounded-full" />
                  )}
                </button>
                {/* More seasons could be added here */}
              </div>
              <span className="text-text-muted text-xs font-bold uppercase tracking-widest">
                {anime.episodes?.length || 0} Épisodes
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {anime.episodes?.map((episode: any) => (
                <Link 
                  key={episode.id}
                  to={`/watch/${anime.id}/${episode.id}`}
                  className="group flex gap-4 p-3 bg-bg-secondary/40 hover:bg-bg-tertiary border border-border-subtle rounded-2xl transition-all"
                >
                  <div className="relative w-32 md:w-40 aspect-video rounded-xl overflow-hidden shrink-0">
                    <img src={episode.thumbnailUrl} alt={episode.title} className="w-full h-full object-cover transition-transform group-hover:scale-105" />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <Play fill="white" size={24} className="text-white" />
                    </div>
                    <div className="absolute bottom-1 right-1 px-1.5 py-0.5 bg-black/80 text-[10px] font-bold rounded">
                      {formatDuration(episode.duration)}
                    </div>
                  </div>
                  <div className="flex flex-col justify-center min-w-0">
                    <span className="text-accent-violet text-[10px] font-black uppercase tracking-tighter mb-1">
                      Épisode {episode.number}
                    </span>
                    <h4 className="font-bold text-sm md:text-base line-clamp-1 group-hover:text-accent-violet transition-colors">
                      {episode.title}
                    </h4>
                    <div className="flex items-center gap-2 mt-1 text-text-muted text-[10px]">
                      <Calendar size={10} /> {episode.releaseDate}
                    </div>
                  </div>
                </Link>
              ))}
              {!anime.episodes && (
                <div className="col-span-full py-12 text-center text-text-muted italic border-2 border-dashed border-border-subtle rounded-3xl">
                  Aucun épisode disponible pour le moment.
                </div>
              )}
            </div>
          </div>

          {/* Similar Animes */}
          {similarAnimes.length > 0 && (
            <CategoryRow title="Animes Similaires" items={similarAnimes} />
          )}
        </div>
      </div>
    </div>
  );
}
