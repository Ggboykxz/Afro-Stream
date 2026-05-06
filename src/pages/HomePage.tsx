import React from 'react';
import { useAuthStore } from '../store/authStore';
import HeroBanner from '../components/home/HeroBanner';
import CategoryRow from '../components/home/CategoryRow';
import { SEED_ANIMES } from '../lib/seedData';
import { motion } from 'motion/react';

export default function HomePage() {
  const { user } = useAuthStore();
  
  // For demo, we split the seed data
  const trendyAnime = SEED_ANIMES[0];
  const newEpisodes = SEED_ANIMES.slice(1, 5);
  const topAnimes = [...SEED_ANIMES].sort((a, b) => b.rating - a.rating);
  const webtoons = SEED_ANIMES.filter(a => a.format === 'webtoon' || a.format === 'manga');
  
  const countries = [
    { name: 'Nigeria', flag: '🇳🇬' },
    { name: 'Sénégal', flag: '🇸🇳' },
    { name: 'Côte d\'Ivoire', flag: '🇨🇮' },
    { name: 'Afrique du Sud', flag: '🇿🇦' },
    { name: 'Cameroun', flag: '🇨🇲' },
    { name: 'Kenya', flag: '🇰🇪' },
    { name: 'Ghana', flag: '🇬🇭' },
    { name: 'DRC', flag: '🇨🇩' },
  ];

  return (
    <div className="flex flex-col gap-8 pb-12">
      {/* Hero Section */}
      <HeroBanner anime={trendyAnime} />

      {/* Continue Watching (Placeholder for now) */}
      {user && (
        <CategoryRow 
          title="Continuer à regarder" 
          items={SEED_ANIMES.slice(2, 4)} 
          showProgress 
        />
      )}

      {/* Nouveaux épisodes */}
      <CategoryRow 
        title="Nouveaux épisodes" 
        items={newEpisodes} 
        viewAllPath="/catalogue?sort=new"
      />

      {/* Top Animes */}
      <CategoryRow 
        title="Top Afro Animes" 
        items={topAnimes} 
        rank
        viewAllPath="/catalogue?sort=rating"
      />

      {/* Par Pays Filter Row */}
      <section className="py-8 px-6 md:px-12 overflow-hidden">
        <h2 className="text-xl font-display font-bold uppercase tracking-tight flex items-center gap-3 mb-8">
          <span className="w-1.5 h-6 bg-accent-orange rounded-full" />
          Parcourir par pays
        </h2>
        <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2">
          {countries.map((country) => (
            <motion.button
              key={country.name}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="flex flex-col items-center gap-3 min-w-[100px] p-4 bg-bg-secondary hover:bg-bg-tertiary border border-border-subtle rounded-2xl transition-colors group"
            >
              <span className="text-3xl filter grayscale group-hover:grayscale-0 transition-all duration-300">
                {country.flag}
              </span>
              <span className="text-xs font-bold uppercase tracking-widest text-text-secondary group-hover:text-white">
                {country.name}
              </span>
            </motion.button>
          ))}
        </div>
      </section>

      {/* Webtoons & BDs */}
      <CategoryRow 
        title="Webtoons & BDs Africains" 
        items={webtoons} 
        viewAllPath="/catalogue?format=webtoon"
      />

      {/* Newsletter / CTA Section */}
      <section className="mx-6 md:mx-12 my-12 p-8 md:p-16 bg-gradient-to-br from-accent-violet/20 to-accent-orange/10 border border-white/5 rounded-3xl relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="max-w-xl">
            <h2 className="text-3xl md:text-5xl font-display font-black mb-6 leading-tight">
              NE MANQUEZ AUCUNE <span className="text-accent-violet">NOUVEAUTÉ</span>
            </h2>
            <p className="text-text-secondary text-lg mb-8">
              Inscrivez-vous pour recevoir des notifications sur les sorties d'animes et les nouveaux chapitres de vos webtoons préférés.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <input 
                type="email" 
                placeholder="votre@email.com" 
                className="flex-grow px-6 py-4 bg-black/40 border border-white/10 rounded-2xl focus:outline-none focus:border-accent-violet transition-colors"
              />
              <button className="px-8 py-4 bg-accent-violet hover:bg-violet-600 rounded-2xl font-bold transition-all shadow-lg shadow-accent-violet/20">
                S'abonner
              </button>
            </div>
          </div>
          <div className="hidden lg:block w-72 h-72 bg-accent-violet/20 rounded-full blur-[100px] absolute -right-20 -top-20" />
        </div>
      </section>
    </div>
  );
}
