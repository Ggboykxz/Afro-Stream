import React from 'react';
import { Mail, Github, Twitter, Instagram, ArrowUp } from 'lucide-react';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-bg-secondary border-t border-border-subtle pt-16 pb-8 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
        {/* Brand */}
        <div className="col-span-1 md:col-span-1">
          <span className="text-2xl font-display font-extrabold tracking-tighter flex items-center mb-6">
            <span className="text-accent-violet">AFRO</span>
            <span className="text-accent-orange">STREAM</span>
          </span>
          <p className="text-text-secondary text-sm leading-relaxed mb-6">
            La première plateforme dédiée aux animes et mangas africains. Découvrez la richesse de l'animation continentale.
          </p>
          <div className="flex items-center gap-4 text-text-secondary">
            <Twitter size={20} className="hover:text-accent-violet cursor-pointer" />
            <Instagram size={20} className="hover:text-accent-violet cursor-pointer" />
            <Github size={20} className="hover:text-accent-violet cursor-pointer" />
          </div>
        </div>

        {/* Links */}
        <div>
          <h4 className="font-display font-bold text-white mb-6 uppercase tracking-wider text-sm">Navigation</h4>
          <ul className="space-y-4 text-text-secondary text-sm">
            <li><a href="/" className="hover:text-accent-violet">Accueil</a></li>
            <li><a href="/catalogue" className="hover:text-accent-violet">Catalogue</a></li>
            <li><a href="/webtoons" className="hover:text-accent-violet">Webtoons</a></li>
            <li><a href="/films" className="hover:text-accent-violet">Films</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-display font-bold text-white mb-6 uppercase tracking-wider text-sm">Légal</h4>
          <ul className="space-y-4 text-text-secondary text-sm">
            <li><a href="#" className="hover:text-accent-violet">Conditions d'utilisation</a></li>
            <li><a href="#" className="hover:text-accent-violet">Politique de confidentialité</a></li>
            <li><a href="#" className="hover:text-accent-violet">DMCA</a></li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h4 className="font-display font-bold text-white mb-6 uppercase tracking-wider text-sm">Support</h4>
          <p className="text-text-secondary text-sm mb-4">Besoin d'aide ou envie de soumettre votre œuvre ?</p>
          <a href="mailto:contact@afrostream.af" className="flex items-center gap-2 text-accent-violet font-semibold text-sm">
            <Mail size={16} /> contact@afrostream.af
          </a>
        </div>
      </div>

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between border-t border-border-subtle pt-8 gap-4">
        <p className="text-text-muted text-xs font-medium">
          &copy; {currentYear} AfroStream. Tous droits réservés. Design by AfroNight.
        </p>
        <button 
          onClick={scrollToTop}
          className="flex items-center gap-2 text-text-secondary hover:text-white transition-colors text-xs font-semibold uppercase tracking-widest"
        >
          Retour en haut <ArrowUp size={14} />
        </button>
      </div>
    </footer>
  );
}
