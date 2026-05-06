import React from 'react';
import { Play, Plus, Info } from 'lucide-react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { Anime } from '../../lib/seedData';

interface HeroBannerProps {
  anime: Anime;
}

export default function HeroBanner({ anime }: HeroBannerProps) {
  return (
    <section className="relative w-full h-[70vh] md:h-[85vh] overflow-hidden flex items-end pb-12 md:pb-24 px-6 md:px-12">
      {/* Background Image with Parallax effect (simulated with Framer Motion) */}
      <motion.div 
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.5, ease: 'easeOut' }}
        className="absolute inset-0 z-0"
      >
        <img 
          src={anime.bannerUrl} 
          alt={anime.title} 
          className="w-full h-full object-cover"
        />
        {/* Gradients */}
        <div className="absolute inset-0 bg-gradient-to-r from-bg-primary via-bg-primary/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-bg-primary via-transparent to-bg-primary/20" />
      </motion.div>

      {/* Content */}
      <div className="relative z-10 max-w-3xl">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="px-3 py-1 bg-accent-violet/60 border border-accent-violet/40 rounded-full text-[10px] font-bold uppercase tracking-widest backdrop-blur-sm">
              Tendances
            </span>
            <span className="text-text-secondary text-xs font-medium">
              {anime.genres.join(' • ')}
            </span>
          </div>

          <h1 className="text-5xl md:text-8xl font-display font-black mb-6 leading-[0.95] tracking-tighter">
            {anime.title}
          </h1>

          <p className="text-text-secondary text-sm md:text-lg mb-8 line-clamp-3 leading-relaxed max-w-2xl bg-black/20 backdrop-blur-sm p-3 rounded-lg border border-white/5">
            {anime.synopsis}
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <Link
              to={`/watch/${anime.id}/ep1`}
              className="px-8 py-4 bg-white text-black hover:bg-accent-violet hover:text-white transition-all duration-300 rounded-full font-bold flex items-center gap-3 shadow-xl shadow-accent-violet/10 group"
            >
              <Play fill="currentColor" size={24} className="group-hover:scale-110 transition-transform" />
              Regarder maintenant
            </Link>
            
            <button className="p-4 bg-white/10 hover:bg-white/20 transition-all rounded-full backdrop-blur-md border border-white/10 text-white flex items-center justify-center">
              <Plus size={24} />
            </button>

            <Link
              to={`/anime/${anime.id}`}
              className="p-4 bg-white/10 hover:bg-white/20 transition-all rounded-full backdrop-blur-md border border-white/10 text-white flex items-center justify-center"
            >
              <Info size={24} />
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Side Score Indicator (Bebas Neue) */}
      <div className="absolute right-12 bottom-24 hidden lg:flex flex-col items-center">
        <span className="text-accent-gold font-accent text-7xl leading-none">
          {anime.rating.toFixed(1)}
        </span>
        <span className="text-text-muted text-xs uppercase tracking-widest font-bold">SCORE AFRO</span>
      </div>
    </section>
  );
}
