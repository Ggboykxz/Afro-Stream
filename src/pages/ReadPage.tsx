import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  ChevronLeft, 
  ChevronRight, 
  ArrowLeft,
  Settings,
  Layout,
  BookOpen,
  Maximize2,
  Menu,
  ChevronUp,
  ChevronDown
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { SEED_ANIMES, Anime, Chapter } from '../lib/seedData';
import { cn } from '../lib/utils';

export default function ReadPage() {
  const { mangaId, chapterId } = useParams();
  const navigate = useNavigate();
  const [manga, setManga] = useState<Anime | null>(null);
  const [currentChapter, setCurrentChapter] = useState<Chapter | null>(null);
  const [readMode, setReadMode] = useState<'webtoon' | 'manga'>('webtoon');
  const [currentPage, setCurrentPage] = useState(0);
  const [isControlsVisible, setIsControlsVisible] = useState(true);
  const [isChapterListOpen, setIsChapterListOpen] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const foundManga = SEED_ANIMES.find(a => a.id === mangaId);
    if (foundManga) {
      setManga(foundManga);
      const foundCh = foundManga.chapters?.find(c => c.id === chapterId);
      setCurrentChapter(foundCh);
      setReadMode(foundManga.format === 'webtoon' ? 'webtoon' : 'manga');
    }
    window.scrollTo(0, 0);
  }, [mangaId, chapterId]);

  useEffect(() => {
    let timeout: any;
    const handleMouseMove = () => {
      setIsControlsVisible(true);
      clearTimeout(timeout);
      timeout = setTimeout(() => setIsControlsVisible(false), 3000);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearTimeout(timeout);
    };
  }, []);

  if (!manga || !currentChapter) return <div className="p-20 text-center">Chargement...</div>;

  const nextChapter = manga.chapters?.find((c: any) => c.number === currentChapter.number + 1);
  const prevChapter = manga.chapters?.find((c: any) => c.number === currentChapter.number - 1);

  const handleNextPage = () => {
    if (currentPage < currentChapter.pages.length - 1) {
      setCurrentPage(currentPage + 1);
      window.scrollTo(0, 0);
    } else if (nextChapter) {
      navigate(`/read/${mangaId}/${nextChapter.id}`);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
      window.scrollTo(0, 0);
    } else if (prevChapter) {
      navigate(`/read/${mangaId}/${prevChapter.id}`);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-black">
      {/* Top Header */}
      <AnimatePresence>
        {isControlsVisible && (
          <motion.header 
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            exit={{ y: -100 }}
            className="fixed top-0 left-0 right-0 z-50 bg-bg-primary/80 backdrop-blur-md border-b border-white/5 px-6 py-4 flex items-center justify-between"
          >
            <div className="flex items-center gap-4">
              <button 
                onClick={() => navigate(`/manga/${manga.id}`)}
                className="p-2 hover:bg-white/5 rounded-full transition-colors"
              >
                <ArrowLeft size={20} />
              </button>
              <div>
                <h1 className="text-sm font-bold line-clamp-1">{manga.title}</h1>
                <p className="text-[10px] text-accent-violet font-black uppercase tracking-widest">
                  Chapitre {currentChapter.number} — {currentChapter.title}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <button 
                onClick={() => setReadMode(readMode === 'webtoon' ? 'manga' : 'webtoon')}
                className="p-2 hover:bg-white/5 rounded-lg flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-text-secondary"
              >
                {readMode === 'webtoon' ? <Layout size={18} /> : <BookOpen size={18} />}
                <span className="hidden md:inline">{readMode === 'webtoon' ? 'Webtoon' : 'Manga'} Mode</span>
              </button>
              <button className="p-2 hover:bg-white/5 rounded-full">
                <Settings size={20} />
              </button>
            </div>
          </motion.header>
        )}
      </AnimatePresence>

      {/* Reader Area */}
      <main className={cn(
        "flex-grow flex flex-col items-center",
        readMode === 'webtoon' ? "pb-24" : "justify-center h-screen overflow-hidden"
      )}>
        {readMode === 'webtoon' ? (
          <div className="max-w-3xl w-full flex flex-col pt-20">
            {currentChapter.pages.map((page: string, idx: number) => (
              <img 
                key={idx} 
                src={page} 
                alt={`Page ${idx + 1}`} 
                className="w-full h-auto object-contain"
                loading="lazy"
              />
            ))}
            
            {/* End of chapter controls */}
            <div className="p-12 flex flex-col items-center gap-6 bg-bg-secondary/40 border-t border-white/5">
              <h3 className="text-xl font-display font-bold italic tracking-tight">Chapitre {currentChapter.number} terminé</h3>
              <div className="flex gap-4">
                {prevChapter && (
                  <button 
                    onClick={() => navigate(`/read/${mangaId}/${prevChapter.id}`)}
                    className="px-8 py-4 bg-white/5 hover:bg-white/10 rounded-2xl font-bold transition-all border border-white/5"
                  >
                    Précédent
                  </button>
                )}
                {nextChapter && (
                  <button 
                    onClick={() => navigate(`/read/${mangaId}/${nextChapter.id}`)}
                    className="px-8 py-4 bg-accent-violet hover:bg-violet-600 rounded-2xl font-bold transition-all shadow-lg shadow-accent-violet/20"
                  >
                    Chapitre Suivant
                  </button>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="relative w-full h-full flex items-center justify-center p-4">
            <img 
              src={currentChapter.pages[currentPage]} 
              alt={`Page ${currentPage + 1}`} 
              className="max-h-full max-w-full object-contain shadow-2xl"
            />
            
            {/* Click regions for navigation */}
            <div className="absolute inset-y-0 left-0 w-1/4 cursor-pointer" onClick={handlePrevPage} />
            <div className="absolute inset-y-0 right-0 w-1/4 cursor-pointer" onClick={handleNextPage} />
          </div>
        )}
      </main>

      {/* Bottom Controls */}
      <AnimatePresence>
        {isControlsVisible && (
          <motion.footer
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            exit={{ y: 100 }}
            className="fixed bottom-0 left-0 right-0 z-50 bg-bg-primary/80 backdrop-blur-md border-t border-white/5 px-6 py-4 flex items-center justify-between"
          >
            <div className="flex items-center gap-4">
               <button 
                 onClick={() => setIsChapterListOpen(!isChapterListOpen)}
                 className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 rounded-xl text-xs font-bold uppercase tracking-widest border border-white/5 transition-all"
               >
                 <Menu size={16} /> Chapitres
               </button>
            </div>

            {readMode === 'manga' && (
              <div className="flex items-center gap-6">
                <button onClick={handlePrevPage} disabled={currentPage === 0 && !prevChapter} className="p-2 hover:bg-white/5 rounded-full disabled:opacity-30">
                  <ChevronLeft size={24} />
                </button>
                <div className="flex flex-col items-center">
                  <span className="text-xs font-bold tracking-widest text-text-secondary">{currentPage + 1} / {currentChapter.pages.length}</span>
                  <div className="w-32 h-1 bg-white/10 rounded-full mt-2 overflow-hidden">
                    <div className="h-full bg-accent-violet" style={{ width: `${((currentPage + 1) / currentChapter.pages.length) * 100}%` }} />
                  </div>
                </div>
                <button onClick={handleNextPage} disabled={currentPage === currentChapter.pages.length - 1 && !nextChapter} className="p-2 hover:bg-white/5 rounded-full disabled:opacity-30">
                  <ChevronRight size={24} />
                </button>
              </div>
            )}

            {readMode === 'webtoon' && (
              <div className="flex items-center gap-6">
                 <button className="p-2 hover:bg-white/5 rounded-full" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                   <ChevronUp size={24} />
                 </button>
                 <span className="text-xs font-bold tracking-widest text-text-secondary">SCROLL POUR LIRE</span>
                 <button className="p-2 hover:bg-white/5 rounded-full" onClick={() => window.scrollBy({ top: window.innerHeight, behavior: 'smooth' })}>
                   <ChevronDown size={24} />
                 </button>
              </div>
            )}

            <button className="hidden md:flex p-2 hover:bg-white/5 rounded-full">
              <Maximize2 size={20} />
            </button>
          </motion.footer>
        )}
      </AnimatePresence>

      {/* Chapter Drawer */}
      <AnimatePresence>
        {isChapterListOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-black/80 backdrop-blur-sm"
            onClick={() => setIsChapterListOpen(false)}
          >
            <motion.div
              initial={{ x: -320 }}
              animate={{ x: 0 }}
              exit={{ x: -320 }}
              className="absolute top-0 left-0 bottom-0 w-80 bg-bg-primary border-r border-white/10 p-8 pt-24 overflow-y-auto no-scrollbar"
              onClick={e => e.stopPropagation()}
            >
              <h2 className="text-xl font-display font-black uppercase italic mb-8 underline decoration-accent-violet underline-offset-8">Chapitres</h2>
              <div className="flex flex-col gap-2">
                {manga.chapters?.map((ch: any) => (
                  <Link
                    key={ch.id}
                    to={`/read/${mangaId}/${ch.id}`}
                    onClick={() => setIsChapterListOpen(false)}
                    className={cn(
                      "flex items-center justify-between p-4 rounded-xl transition-all border",
                      ch.id === chapterId ? "bg-accent-violet/10 border-accent-violet/40" : "bg-bg-secondary/40 border-transparent hover:bg-white/5"
                    )}
                  >
                    <span className={cn("text-sm font-bold", ch.id === chapterId ? "text-accent-violet" : "text-text-primary")}>
                      Ch. {ch.number} — {ch.title}
                    </span>
                  </Link>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
