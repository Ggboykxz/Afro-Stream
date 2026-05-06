import React from 'react';
import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import AnimeCard from '../anime/AnimeCard';
import { Anime } from '../../lib/seedData';

interface CategoryRowProps {
  title: string;
  items: Anime[];
  viewAllPath?: string;
  rank?: boolean;
  showProgress?: boolean;
}

export default function CategoryRow({ title, items, viewAllPath, rank, showProgress }: CategoryRowProps) {
  return (
    <section className="py-8 px-6 md:px-12">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl md:text-2xl font-display font-bold uppercase tracking-tight flex items-center gap-3">
          <span className="w-1.5 h-6 bg-accent-violet rounded-full" />
          {title}
        </h2>
        {viewAllPath && (
          <Link 
            to={viewAllPath}
            className="text-text-secondary hover:text-accent-violet text-xs font-bold uppercase tracking-widest flex items-center gap-1 transition-colors"
          >
            Voir tout <ChevronRight size={14} />
          </Link>
        )}
      </div>

      <div className="overflow-x-auto pb-4 -mx-6 px-6 no-scrollbar">
        <div className="flex gap-4 md:gap-6 min-w-max">
          {items.map((anime, index) => (
            <div key={anime.id} className="w-40 md:w-56">
              <AnimeCard 
                anime={anime} 
                rank={rank ? index + 1 : undefined}
                showProgress={showProgress}
                progress={showProgress ? Math.floor(Math.random() * 90) + 10 : undefined}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
