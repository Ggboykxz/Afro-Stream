import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  ChevronLeft, 
  ChevronRight, 
  Settings, 
  Maximize, 
  Volume2, 
  Play, 
  Pause,
  ArrowLeft,
  List,
  MessageSquare
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { SEED_ANIMES, Anime, Episode } from '../lib/seedData';
import { MediaPlayer, MediaProvider, Poster } from '@vidstack/react';
import { DefaultVideoLayout, defaultLayoutIcons } from '@vidstack/react/player/layouts/default';
import '@vidstack/react/player/styles/default/theme.css';
import '@vidstack/react/player/styles/default/layouts/video.css';
import { cn } from '../lib/utils';

export default function WatchPage() {
  const { animeId, episodeId } = useParams();
  const navigate = useNavigate();
  const [anime, setAnime] = useState<Anime | null>(null);
  const [currentEpisode, setCurrentEpisode] = useState<Episode | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const foundAnime = SEED_ANIMES.find(a => a.id === animeId);
    if (foundAnime) {
      setAnime(foundAnime);
      const foundEp = foundAnime.episodes?.find(e => e.id === episodeId);
      setCurrentEpisode(foundEp);
    }
    window.scrollTo(0, 0);
  }, [animeId, episodeId]);

  if (!anime || !currentEpisode) return <div className="p-20 text-center">Chargement...</div>;

  const nextEpisode = anime.episodes?.find((e: any) => e.number === currentEpisode.number + 1);
  const prevEpisode = anime.episodes?.find((e: any) => e.number === currentEpisode.number - 1);

  return (
    <div className="flex flex-col min-h-screen bg-bg-primary">
      {/* Top Banner with back button */}
      <div className="px-6 py-4 flex items-center justify-between bg-bg-secondary border-b border-border-subtle">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate(`/anime/${anime.id}`)}
            className="p-2 hover:bg-white/5 rounded-full transition-colors"
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1 className="text-sm md:text-base font-bold line-clamp-1">{anime.title}</h1>
            <p className="text-[10px] md:text-xs text-text-secondary uppercase tracking-widest font-black text-accent-violet">
              S{currentEpisode.seasonNumber} Épisode {currentEpisode.number} — {currentEpisode.title}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
           <button 
             onClick={() => setIsSidebarOpen(!isSidebarOpen)}
             className={cn(
               "p-2 rounded-lg transition-all",
               isSidebarOpen ? "bg-accent-violet text-white" : "hover:bg-white/5 text-text-secondary"
             )}
           >
             <List size={22} />
           </button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row flex-grow">
        {/* Main Player Area */}
        <div className={cn(
          "flex-grow flex flex-col transition-all duration-300",
          isSidebarOpen ? "lg:mr-80" : ""
        )}>
          <div className="aspect-video w-full bg-black shadow-2xl">
            <MediaPlayer
              title={currentEpisode.title}
              src={currentEpisode.videoUrl}
              crossOrigin
              playsInline
              onEnded={() => {
                if (nextEpisode) navigate(`/watch/${anime.id}/${nextEpisode.id}`);
              }}
              className="w-full h-full"
            >
              <MediaProvider>
                <Poster
                  className="vds-poster vds-absolute vds-inset-0 vds-w-full vds-h-full vds-opacity-0 vds-transition-opacity vds-duration-200 vds-object-cover"
                  src={currentEpisode.thumbnailUrl}
                  alt={currentEpisode.title}
                />
              </MediaProvider>
              <DefaultVideoLayout 
                icons={defaultLayoutIcons} 
              />
            </MediaPlayer>
          </div>

          {/* Episode Details Below Player */}
          <div className="p-6 md:p-8 flex flex-col gap-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="flex flex-col">
                <h2 className="text-2xl md:text-3xl font-display font-black tracking-tight mb-2">
                  {currentEpisode.number}. {currentEpisode.title}
                </h2>
                <div className="flex items-center gap-4 text-text-secondary text-sm">
                  <span className="flex items-center gap-1"><Play size={14} /> {anime.format}</span>
                  <span>•</span>
                  <span className="flex items-center gap-1">Diffusé le {currentEpisode.releaseDate}</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button 
                  disabled={!prevEpisode}
                  onClick={() => navigate(`/watch/${anime.id}/${prevEpisode?.id}`)}
                  className={cn(
                    "flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all border border-border-subtle",
                    prevEpisode ? "hover:bg-white/5 text-white" : "opacity-30 cursor-not-allowed"
                  )}
                >
                  <ChevronLeft size={20} /> Précédent
                </button>
                <button 
                  disabled={!nextEpisode}
                  onClick={() => navigate(`/watch/${anime.id}/${nextEpisode?.id}`)}
                  className={cn(
                    "flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all bg-accent-violet shadow-lg shadow-accent-violet/20",
                    nextEpisode ? "hover:bg-violet-600 text-white" : "opacity-30 cursor-not-allowed"
                  )}
                >
                  Suivant <ChevronRight size={20} />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="md:col-span-2">
                <h3 className="font-display font-bold uppercase tracking-widest text-sm mb-4 flex items-center gap-2">
                  <MessageSquare size={16} /> Commentaires (0)
                </h3>
                <div className="p-8 bg-bg-secondary rounded-2xl border border-border-subtle text-center text-text-muted italic">
                  Soyez le premier à commenter cet épisode !
                </div>
              </div>
              <div className="md:col-span-1">
                 <h3 className="font-display font-bold uppercase tracking-widest text-sm mb-4">À propos de l'anime</h3>
                 <div className="p-4 bg-bg-secondary rounded-2xl border border-border-subtle flex gap-4">
                   <img src={anime.posterUrl} className="w-16 aspect-[2/3] ring-1 ring-white/10 rounded-lg object-cover" />
                   <div className="flex flex-col justify-center">
                     <h4 className="font-bold text-sm mb-1">{anime.title}</h4>
                     <Link to={`/anime/${anime.id}`} className="text-accent-violet text-xs font-bold hover:underline">
                       Voir la fiche
                     </Link>
                   </div>
                 </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar Episode List */}
        <AnimatePresence>
          {isSidebarOpen && (
            <motion.aside
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed right-0 top-[73px] bottom-0 w-80 bg-bg-secondary border-l border-border-subtle z-30 flex flex-col"
            >
              <div className="p-6 border-b border-border-subtle flex items-center justify-between">
                <h2 className="font-display font-bold uppercase tracking-wider">Liste des épisodes</h2>
                <button onClick={() => setIsSidebarOpen(false)} className="p-1 hover:bg-white/5 rounded-full">
                  <X size={20} />
                </button>
              </div>
              <div className="flex-grow overflow-y-auto p-4 flex flex-col gap-2 no-scrollbar">
                {anime.episodes?.map((ep: any) => (
                  <Link
                    key={ep.id}
                    to={`/watch/${anime.id}/${ep.id}`}
                    className={cn(
                      "flex gap-3 p-2 rounded-xl transition-all border",
                      ep.id === episodeId 
                        ? "bg-accent-violet/10 border-accent-violet/40 ring-1 ring-accent-violet/20" 
                        : "bg-transparent border-transparent hover:bg-white/5"
                    )}
                  >
                    <div className="relative w-24 aspect-video rounded-lg overflow-hidden shrink-0">
                      <img src={ep.thumbnailUrl} alt={ep.title} className="w-full h-full object-cover" />
                      {ep.id === episodeId && (
                        <div className="absolute inset-0 bg-accent-violet/40 flex items-center justify-center">
                          <Play size={16} fill="white" className="text-white" />
                        </div>
                      )}
                    </div>
                    <div className="flex flex-col justify-center min-w-0">
                      <span className={cn(
                        "text-[10px] font-black uppercase mb-0.5",
                        ep.id === episodeId ? "text-accent-violet" : "text-text-muted"
                      )}>
                        Épisode {ep.number}
                      </span>
                      <h4 className="text-xs font-bold line-clamp-1">{ep.title}</h4>
                    </div>
                  </Link>
                ))}
              </div>
            </motion.aside>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

const X = ({ size, className }: { size?: number, className?: string }) => (
  <svg 
    width={size || 24} 
    height={size || 24} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
);
