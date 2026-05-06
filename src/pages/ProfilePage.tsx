import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  User as UserIcon, 
  Settings, 
  Heart, 
  Clock, 
  History,
  Camera,
  LogOut,
  Edit2
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useAuthStore } from '../store/authStore';
import { auth } from '../services/firebase';
import { SEED_ANIMES } from '../lib/seedData';
import AnimeCard from '../components/anime/AnimeCard';
import { cn } from '../lib/utils';

export default function ProfilePage() {
  const { user } = useAuthStore();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'favorites' | 'history' | 'continue' | 'settings'>('favorites');

  if (!user) {
    navigate('/login');
    return null;
  }

  const tabs = [
    { id: 'favorites', label: 'Favoris', icon: Heart },
    { id: 'history', label: 'Historique', icon: History },
    { id: 'continue', label: 'En cours', icon: Clock },
    { id: 'settings', label: 'Paramètres', icon: Settings },
  ] as const;

  const handleLogout = async () => {
    await auth.signOut();
    navigate('/');
  };

  return (
    <div className="flex flex-col min-h-screen pb-20">
      {/* Profile Header */}
      <div className="relative h-64 md:h-80 bg-gradient-to-br from-accent-violet/40 to-bg-primary overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-bg-primary to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto w-full px-6 md:px-12 -mt-20 relative z-10">
        <div className="flex flex-col md:flex-row items-end gap-6 mb-12">
          <div className="relative group">
            <div className="w-32 h-32 md:w-44 md:h-44 rounded-[40px] bg-bg-secondary border-4 border-bg-primary overflow-hidden ring-1 ring-white/10 shadow-2xl">
              {user.photoURL ? (
                <img src={user.photoURL} alt={user.displayName || ''} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-accent-violet/20 text-accent-violet">
                   <UserIcon size={64} />
                </div>
              )}
            </div>
            <button className="absolute bottom-2 right-2 p-2 bg-accent-violet rounded-full shadow-lg shadow-accent-violet/20 opacity-0 group-hover:opacity-100 transition-opacity">
              <Camera size={18} />
            </button>
          </div>

          <div className="flex-grow flex flex-col items-center md:items-start text-center md:text-left gap-2 mb-2">
            <div className="flex items-center gap-3">
              <h1 className="text-3xl md:text-5xl font-display font-black tracking-tight uppercase italic underline decoration-accent-violet underline-offset-8">
                {user.displayName || user.email?.split('@')[0]}
              </h1>
              <button className="p-2 hover:bg-white/5 rounded-full transition-colors text-text-muted hover:text-white">
                <Edit2 size={16} />
              </button>
            </div>
            <p className="text-text-secondary font-medium">{user.email}</p>
            <div className="flex items-center gap-2 px-3 py-1 bg-accent-gold/10 border border-accent-gold/20 rounded-full text-[10px] font-bold text-accent-gold uppercase tracking-widest mt-2">
              Membre Standard
            </div>
          </div>

          <button 
            onClick={handleLogout}
            className="px-6 py-3 bg-red-500/10 hover:bg-red-500/20 text-red-500 rounded-xl font-bold flex items-center gap-2 transition-all border border-red-500/20 text-sm mb-2"
          >
            <LogOut size={18} /> Déconnexion
          </button>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-4 md:gap-8 border-b border-border-subtle mb-10 overflow-x-auto no-scrollbar">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "relative flex items-center gap-2 px-4 pb-4 text-sm font-bold uppercase tracking-widest transition-colors flex-shrink-0",
                activeTab === tab.id ? "text-accent-violet" : "text-text-muted hover:text-text-secondary"
              )}
            >
              <tab.icon size={18} />
              {tab.label}
              {activeTab === tab.id && (
                <motion.div layoutId="profile-tab" className="absolute bottom-0 left-0 right-0 h-1 bg-accent-violet rounded-full" />
              )}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="min-h-[400px]">
          <AnimatePresence mode="wait">
            {activeTab === 'favorites' && (
              <motion.div
                key="favorites"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6"
              >
                {SEED_ANIMES.slice(0, 3).map(anime => (
                  <AnimeCard key={anime.id} anime={anime} />
                ))}
              </motion.div>
            )}

            {activeTab === 'history' && (
              <motion.div
                key="history"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex flex-col gap-4"
              >
                {SEED_ANIMES.slice(1, 4).map(anime => (
                  <div key={anime.id} className="flex gap-4 p-4 bg-bg-secondary rounded-2xl border border-border-subtle hover:border-white/10 transition-colors group">
                    <img src={anime.posterUrl} className="w-20 aspect-[2/3] object-cover rounded-xl shadow-lg" />
                    <div className="flex flex-col justify-center gap-1">
                      <span className="text-text-muted text-[10px] font-bold uppercase tracking-widest">Vu hier</span>
                      <h3 className="font-bold text-lg group-hover:text-accent-violet transition-colors">{anime.title}</h3>
                      <p className="text-sm text-text-secondary">Épisode 04 — Le Chant de la Jungle</p>
                    </div>
                  </div>
                ))}
              </motion.div>
            )}

            {activeTab === 'continue' && (
              <motion.div
                key="continue"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6"
              >
                {SEED_ANIMES.slice(0, 1).map(anime => (
                  <AnimeCard key={anime.id} anime={anime} showProgress progress={45} />
                ))}
              </motion.div>
            )}

            {activeTab === 'settings' && (
              <motion.div
                key="settings"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="max-w-2xl flex flex-col gap-8"
              >
                <div className="space-y-4">
                   <h3 className="text-lg font-display font-bold italic tracking-tight underline decoration-accent-violet">Préférences du compte</h3>
                   <div className="space-y-3">
                      <div className="flex items-center justify-between p-4 bg-bg-secondary rounded-xl border border-border-subtle">
                         <div>
                            <p className="font-bold text-sm">Thème AfroNight</p>
                            <p className="text-xs text-text-muted">Toujours sombre, toujours mystique.</p>
                         </div>
                         <div className="w-12 h-6 bg-accent-violet rounded-full relative">
                            <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full" />
                         </div>
                      </div>
                      <div className="flex items-center justify-between p-4 bg-bg-secondary rounded-xl border border-border-subtle">
                         <div>
                            <p className="font-bold text-sm">Notifications</p>
                            <p className="text-xs text-text-muted">Alertez-moi pour les nouvelles sorties.</p>
                         </div>
                         <div className="w-12 h-6 bg-accent-violet rounded-full relative">
                            <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full" />
                         </div>
                      </div>
                   </div>
                </div>

                <div className="space-y-4">
                   <h3 className="text-lg font-display font-bold italic tracking-tight text-red-500">Zone de danger</h3>
                   <button className="w-full py-4 border border-red-500/20 text-red-500 hover:bg-red-500/10 rounded-xl font-bold transition-all text-sm uppercase tracking-widest">
                      Supprimer mon compte
                   </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
