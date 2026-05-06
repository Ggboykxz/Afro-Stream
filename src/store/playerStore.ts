import { create } from 'zustand';

interface PlayerState {
  currentAnimeId: string | null;
  currentEpisodeId: string | null;
  isPlaying: boolean;
  progress: number;
  volume: number;
  setAnime: (animeId: string | null, episodeId: string | null) => void;
  setPlaying: (isPlaying: boolean) => void;
  setProgress: (progress: number) => void;
  setVolume: (volume: number) => void;
}

export const usePlayerStore = create<PlayerState>((set) => ({
  currentAnimeId: null,
  currentEpisodeId: null,
  isPlaying: false,
  progress: 0,
  volume: 1,
  setAnime: (currentAnimeId, currentEpisodeId) => set({ currentAnimeId, currentEpisodeId }),
  setPlaying: (isPlaying) => set({ isPlaying }),
  setProgress: (progress) => set({ progress }),
  setVolume: (volume) => set({ volume }),
}));
