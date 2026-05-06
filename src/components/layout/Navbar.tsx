import React, { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Search, Menu, X, User, Bell, LogOut } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useAuthStore } from '../../store/authStore';
import { auth } from '../../services/firebase';
import { cn } from '../../lib/utils';

export default function Navbar() {
  const { user } = useAuthStore();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = async () => {
    await auth.signOut();
    navigate('/');
  };

  const navLinks = [
    { label: 'Accueil', path: '/' },
    { label: 'Catalogue', path: '/catalogue' },
    { label: 'Webtoons', path: '/catalogue?format=webtoon' },
    { label: 'Films', path: '/catalogue?format=film' },
  ];

  return (
    <nav className={cn(
      'fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 py-4 flex items-center justify-between',
      isScrolled ? 'bg-bg-primary/80 backdrop-blur-md border-b border-border-subtle py-3' : 'bg-transparent'
    )}>
      {/* Logo */}
      <Link to="/" className="flex items-center gap-2">
        <span className="text-2xl font-display font-extrabold tracking-tighter flex items-center">
          <span className="text-accent-violet">AFRO</span>
          <span className="text-accent-orange">STREAM</span>
        </span>
      </Link>

      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center gap-8">
        {navLinks.map((link) => (
          <NavLink
            key={link.path}
            to={link.path}
            className={({ isActive }) => cn(
              'text-sm font-medium transition-colors hover:text-accent-violet',
              isActive ? 'text-accent-violet' : 'text-text-secondary'
            )}
          >
            {link.label}
          </NavLink>
        ))}
      </div>

      {/* Actions */}
      <div className="flex items-center gap-4 text-text-primary">
        <button 
          onClick={() => setIsSearchOpen(!isSearchOpen)}
          className="p-2 hover:bg-white/5 rounded-full transition-colors"
        >
          <Search size={22} />
        </button>

        <button className="relative p-2 hover:bg-white/5 rounded-full transition-colors">
          <Bell size={22} />
          <span className="absolute top-2 right-2 w-2 h-2 bg-accent-orange rounded-full" />
        </button>

        {user ? (
          <div className="relative group">
            <button className="flex items-center gap-2 p-1 hover:bg-white/5 rounded-full transition-colors">
              <div className="w-8 h-8 rounded-full bg-accent-violet flex items-center justify-center overflow-hidden">
                {user.photoURL ? (
                  <img src={user.photoURL} alt={user.displayName || 'User'} className="w-full h-full object-cover" />
                ) : (
                  <User size={18} />
                )}
              </div>
            </button>
            
            {/* Dropdown would go here - simplified for now */}
            <div className="absolute right-0 top-full mt-2 w-48 py-2 bg-bg-secondary border border-border-subtle rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
              <Link to="/profile" className="flex items-center gap-3 px-4 py-2 hover:bg-white/5 text-sm">
                <User size={16} /> Profil
              </Link>
              <button 
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-4 py-2 hover:bg-white/5 text-sm text-red-400"
              >
                <LogOut size={16} /> Déconnexion
              </button>
            </div>
          </div>
        ) : (
          <Link 
            to="/login"
            className="px-5 py-2 bg-accent-violet hover:bg-violet-600 font-semibold rounded-full text-sm transition-all"
          >
            Connexion
          </Link>
        )}

        {/* Mobile Menu Toggle */}
        <button 
          className="md:hidden p-2 hover:bg-white/5 rounded-full transition-colors"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            className="fixed inset-0 z-40 bg-bg-primary flex flex-col p-8 pt-24 gap-6 md:hidden"
          >
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-2xl font-display font-bold uppercase tracking-wide hover:text-accent-violet transition-colors"
              >
                {link.label}
              </NavLink>
            ))}
            <div className="h-px bg-border-subtle my-2" />
            {!user && (
              <Link
                to="/login"
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-full py-4 bg-accent-violet rounded-xl text-center font-bold"
              >
                Sign In
              </Link>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
