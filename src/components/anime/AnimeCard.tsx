import React from 'react';
import { Link } from 'react-router-dom';
import { Play, Plus, BookOpen } from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '../../lib/utils';
import { Anime } from '../../lib/seedData';

interface AnimeCardProps {
  anime: Anime;
  showProgress?: boolean;
  progress?: number;
  rank?: number;
}

export default function AnimeCard({ anime, showProgress, progress, rank }: AnimeCardProps) {
  const statusColors = {
    ongoing: 'bg-green-500',
    completed: 'bg-gray-500',
    upcoming: 'bg-accent-orange',
  };

  const formatLabels = {
    anime: 'ANIME',
    webtoon: 'WEBTOON',
    manga: 'MANGA',
    film: 'FILM',
  };

  return (
    <motion.div
      whileHover={{ scale: 1.04, y: -4 }}
      className="group relative flex flex-col bg-bg-secondary rounded-xl overflow-hidden shadow-lg hover:shadow-accent-violet/20 transition-all duration-300"
    >
      <Link to={`/${anime.format === 'webtoon' || anime.format === 'manga' ? 'manga' : 'anime'}/${anime.id}`}>
        <div className="relative aspect-[2/3] overflow-hidden">
          <img
            src={anime.posterUrl}
            alt={anime.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            loading="lazy"
          />
          
          {/* Rank overlay */}
          {rank !== undefined && (
            <div className="absolute top-2 left-2 z-10">
              <span className="text-6xl font-accent font-black text-white/90 drop-shadow-[0_4px_4px_rgba(0,0,0,0.5)]">
                {rank}
              </span>
            </div>
          )}

          {/* Badges */}
          <div className="absolute top-2 right-2 flex flex-col gap-1 items-end">
            <span className={cn(
              "text-[10px] font-bold px-2 py-0.5 rounded text-white uppercase",
              statusColors[anime.status]
            )}>
              {anime.status === 'ongoing' ? 'En cours' : anime.status === 'completed' ? 'Terminé' : 'À venir'}
            </span>
            <span className="text-[10px] font-bold px-2 py-0.5 bg-accent-violet/90 rounded text-white uppercase">
              {formatLabels[anime.format]}
            </span>
          </div>

          {/* Hover Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-bg-primary via-bg-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
            <p className="text-xs text-text-secondary line-clamp-3 mb-3">
              {anime.synopsis}
            </p>
            <div className="flex items-center gap-2">
              <button className="flex-grow py-2 bg-accent-violet hover:bg-violet-600 rounded-lg text-xs font-bold flex items-center justify-center gap-2 transition-colors">
                {anime.format === 'anime' || anime.format === 'film' ? <Play size={12} fill="currentColor" /> : <BookOpen size={12} />}
                {anime.format === 'anime' || anime.format === 'film' ? 'Regarder' : 'Lire'}
              </button>
              <button className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors">
                <Plus size={16} />
              </button>
            </div>
          </div>
        </div>

        <div className="p-3">
          <h3 className="font-bold text-sm line-clamp-1 group-hover:text-accent-violet transition-colors">
            {anime.title}
          </h3>
          <div className="flex items-center justify-between mt-1">
            <span className="text-[10px] text-text-muted font-medium uppercase tracking-wider">
              {anime.country} • {anime.genres[0]}
            </span>
            <span className="font-accent text-accent-gold text-sm">
              ★ {anime.rating.toFixed(1)}
            </span>
          </div>
        </div>

        {/* Progress bar */}
        {showProgress && progress !== undefined && (
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/10">
            <div 
              className="h-full bg-accent-violet" 
              style={{ width: `${progress}%` }}
            />
          </div>
        )}
      </Link>
    </motion.div>
  );
}
