import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  Mail, 
  Lock, 
  User as UserIcon, 
  Github, 
  Chrome, 
  ArrowLeft,
  AlertCircle
} from 'lucide-react';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signInWithPopup, 
  GoogleAuthProvider 
} from 'firebase/auth';
import { auth, db } from '../services/firebase';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        const { user } = await createUserWithEmailAndPassword(auth, email, password);
        // Create user document in Firestore
        await setDoc(doc(db, 'users', user.uid), {
          uid: user.uid,
          email: user.email,
          username: username || user.email?.split('@')[0],
          avatarUrl: null,
          createdAt: new Date().toISOString(),
        });
      }
      navigate('/');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      setLoading(true);
      const { user } = await signInWithPopup(auth, provider);
      
      // Check if user doc exists, if not create it
      const userDoc = await getDoc(doc(db, 'users', user.uid));
      if (!userDoc.exists()) {
        await setDoc(doc(db, 'users', user.uid), {
          uid: user.uid,
          email: user.email,
          username: user.displayName || user.email?.split('@')[0],
          avatarUrl: user.photoURL,
          createdAt: new Date().toISOString(),
        });
      }
      navigate('/');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-bg-primary flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-accent-violet/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-accent-orange/5 rounded-full blur-[120px]" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md relative z-10"
      >
        <Link 
          to="/"
          className="inline-flex items-center gap-2 text-text-secondary hover:text-white transition-colors mb-8 group"
        >
          <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
          Retour à l'accueil
        </Link>

        <div className="bg-bg-secondary/40 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
          {/* Progress bar line if loading */}
          {loading && (
            <motion.div 
              layoutId="loading"
              className="absolute top-0 left-0 right-0 h-1 bg-accent-violet z-20"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            />
          )}

          <div className="text-center mb-10">
            <h1 className="text-3xl font-display font-black tracking-tight mb-2 italic">
              {isLogin ? 'BON RETOUR !' : 'REJOIGNEZ NOUS'}
            </h1>
            <p className="text-text-secondary text-sm">
              {isLogin ? 'Accédez à vos animes et mangas préférés.' : 'Commencez votre voyage à travers l\'animation africaine.'}
            </p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex items-start gap-3 text-red-500 text-sm">
              <AlertCircle size={18} className="shrink-0 mt-0.5" />
              <p>{error}</p>
            </div>
          )}

          <form onSubmit={handleAuth} className="space-y-4">
            {!isLogin && (
              <div className="space-y-1.5 text-text-primary">
                <label className="text-[10px] font-bold uppercase tracking-widest text-text-muted ml-1">Pseudo</label>
                <div className="relative">
                  <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" size={18} />
                  <input 
                    type="text" 
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full pl-12 pr-6 py-4 bg-black/40 border border-white/5 rounded-2xl focus:outline-none focus:border-accent-violet transition-colors"
                    placeholder="L'Élu de l'Éther"
                  />
                </div>
              </div>
            )}

            <div className="space-y-1.5 text-text-primary">
              <label className="text-[10px] font-bold uppercase tracking-widest text-text-muted ml-1">Email</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" size={18} />
                <input 
                  type="email" 
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-12 pr-6 py-4 bg-black/40 border border-white/5 rounded-2xl focus:outline-none focus:border-accent-violet transition-colors"
                  placeholder="nom@exemple.com"
                />
              </div>
            </div>

            <div className="space-y-1.5 text-text-primary">
              <label className="text-[10px] font-bold uppercase tracking-widest text-text-muted ml-1">Mot de passe</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" size={18} />
                <input 
                  type="password" 
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-12 pr-6 py-4 bg-black/40 border border-white/5 rounded-2xl focus:outline-none focus:border-accent-violet transition-colors"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button 
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-accent-violet hover:bg-violet-600 rounded-2xl font-bold transition-all shadow-lg shadow-accent-violet/20 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (isLogin ? 'Connexion en cours...' : 'Création en cours...') : (isLogin ? 'Se connecter' : 'Créer un compte')}
            </button>
          </form>

          <div className="my-8 flex items-center gap-4">
            <div className="h-px bg-white/5 flex-grow" />
            <span className="text-[10px] uppercase font-bold text-text-muted tracking-widest">OU</span>
            <div className="h-px bg-white/5 flex-grow" />
          </div>

          <div className="grid grid-cols-1 gap-4">
            <button 
              onClick={handleGoogleLogin}
              disabled={loading}
              className="flex items-center justify-center gap-3 py-4 bg-white text-black hover:bg-gray-100 rounded-2xl font-bold transition-all"
            >
              <Chrome size={20} /> Continuer avec Google
            </button>
          </div>

          <p className="mt-8 text-center text-sm text-text-secondary">
            {isLogin ? 'Nouveau sur AfroStream ?' : 'DÉJÀ UN COMPTE ?'}{' '}
            <button 
              onClick={() => setIsLogin(!isLogin)}
              className="text-accent-violet font-bold hover:underline uppercase tracking-wide text-xs"
            >
              {isLogin ? 'Créer un compte' : 'Se connecter'}
            </button>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
