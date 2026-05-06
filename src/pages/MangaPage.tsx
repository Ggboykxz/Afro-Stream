import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  BookOpen, 
  Heart, 
  Share2, 
  Bell, 
  Star, 
  ChevronDown, 
  ChevronUp,
  Calendar,
  Layers
} from 'lucide-react';
import { motion } from 'motion/react';
import { SEED_ANIMES } from '../lib/seedData';
import CategoryRow from '../components/home/CategoryRow';
import { cn } from '../lib/utils';

export default function MangaPage() {
  const { id } = useParams();
  const [manga, setManga] = useState<any>(null);
  const [isSynopsisExpanded, setIsSynopsisExpanded] = useState(false);

  useEffect(() => {
    const found = SEED_ANIMES.find(a => a.id === id);
    setManga(found);
    window.scrollTo(0, 0);
  }, [id]);

  if (!manga) return <div className="p-20 text-center">Chargement...</div>;

  const similarManga = SEED_ANIMES.filter(a => manga.similarIds?.includes(a.id));

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <div className="relative w-full h-[40vh] md:h-[60vh] overflow-hidden">
        <img 
          src={manga.bannerUrl} 
          alt={manga.title} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-bg-primary via-bg-primary/60 to-transparent" />
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 -mt-32 md:-mt-48 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 pb-20">
        
        {/* Left Column */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="aspect-[2/3] rounded-2xl overflow-hidden shadow-2xl border border-white/10 ring-1 ring-white/5"
          >
            <img src={manga.posterUrl} alt={manga.title} className="w-full h-full object-cover" />
          </motion.div>

          <div className="grid grid-cols-2 gap-4">
            <button className="flex items-center justify-center gap-2 py-4 bg-accent-violet hover:bg-violet-600 rounded-xl font-bold transition-all shadow-lg shadow-accent-violet/20">
              <Heart size={20} /> Favoris
            </button>
            <button className="flex items-center justify-center gap-2 py-4 bg-white/10 hover:bg-white/20 rounded-xl font-bold transition-all border border-white/5">
              <Share2 size={20} /> Partager
            </button>
          </div>
        </div>

        {/* Right Column */}
        <div className="lg:col-span-8 flex flex-col gap-10">
          <div>
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className="px-3 py-1 bg-accent-orange/20 border border-accent-orange/40 rounded text-[10px] font-bold uppercase tracking-widest text-accent-orange">
                {manga.format === 'webtoon' ? 'WEBTOON' : 'MANGA'}
              </span>
              <span className="px-3 py-1 bg-green-500/20 border border-green-500/40 rounded text-[10px] font-bold uppercase tracking-widest text-green-400">
                {manga.status === 'ongoing' ? 'En cours' : 'Terminé'}
              </span>
              <span className="text-text-muted text-xs">•</span>
              <span className="text-text-secondary text-sm font-medium">{manga.country}</span>
            </div>

            <h1 className="text-4xl md:text-6xl font-display font-black mb-6 leading-tight tracking-tight uppercase">
              {manga.title}
            </h1>

            <div className="flex items-center gap-6 mb-8">
              <div className="flex flex-col">
                <div className="flex items-center gap-1 text-accent-gold mb-1">
                  <Star fill="currentColor" size={20} />
                  <span className="text-3xl font-accent leading-none">{manga.rating.toFixed(1)}</span>
                </div>
                <span className="text-[10px] text-text-muted font-bold uppercase tracking-widest">Score AfroStream</span>
              </div>
            </div>

            <div className="relative">
              <p className={cn(
                "text-text-secondary leading-relaxed mb-4 transition-all duration-300",
                !isSynopsisExpanded && "line-clamp-3"
              )}>
                {manga.synopsis}
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
          </div>

          {/* Chapter List */}
          <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between border-b border-border-subtle pb-4">
              <h3 className="text-lg font-display font-bold uppercase tracking-widest flex items-center gap-2">
                <Layers size={18} className="text-accent-violet" /> Liste des Chapitres
              </h3>
              <span className="text-text-muted text-xs font-bold uppercase tracking-widest">
                {manga.chapters?.length || 0} Chapitres
              </span>
            </div>

            <div className="flex flex-col gap-2">
              {manga.chapters?.map((chapter: any) => (
                <Link 
                  key={chapter.id}
                  to={`/read/${manga.id}/${chapter.id}`}
                  className="group flex items-center justify-between p-4 bg-bg-secondary/40 hover:bg-bg-tertiary border border-border-subtle rounded-2xl transition-all"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-accent-violet/10 rounded-lg flex items-center justify-center font-accent text-accent-violet">
                      {chapter.number}
                    </div>
                    <div>
                      <h4 className="font-bold text-sm md:text-base group-hover:text-accent-violet transition-colors">
                        {chapter.title}
                      </h4>
                      <div className="flex items-center gap-2 text-text-muted text-[10px]">
                        <Calendar size={10} /> {chapter.releaseDate}
                      </div>
                    </div>
                  </div>
                  <BookOpen size={18} className="text-text-muted group-hover:text-accent-violet transition-colors" />
                </Link>
              ))}
              {!manga.chapters && (
                <div className="py-12 text-center text-text-muted italic border-2 border-dashed border-border-subtle rounded-3xl">
                  Aucun chapitre disponible pour le moment.
                </div>
              )}
            </div>
          </div>

          {/* Similar Manga */}
          {similarManga.length > 0 && (
            <CategoryRow title="Titres Similaires" items={similarManga} />
          )}
        </div>
      </div>
    </div>
  );
}
