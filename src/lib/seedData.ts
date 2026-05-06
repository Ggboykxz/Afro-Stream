export interface Chapter {
  id: string;
  number: number;
  title: string;
  pages: string[];
  releaseDate: string;
}

export interface Episode {
  id: string;
  number: number;
  seasonNumber: number;
  title: string;
  thumbnailUrl: string;
  videoUrl: string;
  duration: number;
  releaseDate: string;
}

export interface Anime {
  id: string;
  title: string;
  titleOriginal?: string;
  posterUrl: string;
  bannerUrl: string;
  genres: string[];
  country: string;
  status: 'ongoing' | 'completed' | 'upcoming';
  format: 'anime' | 'webtoon' | 'manga' | 'film';
  rating: number;
  popularity: number;
  synopsis: string;
  episodes?: Episode[];
  chapters?: Chapter[];
  similarIds?: string[];
}

export const SEED_ANIMES: Anime[] = [
  {
    id: 'kizazi-moto',
    title: 'Kizazi Moto: Generation Fire',
    titleOriginal: 'Kizazi Moto',
    posterUrl: 'https://images.unsplash.com/photo-1620336655055-088d06e36bf0?q=80&w=600&auto=format&fit=crop',
    bannerUrl: 'https://images.unsplash.com/photo-1620336655055-088d06e36bf0?q=80&w=1200&auto=format&fit=crop',
    genres: ['Sci-Fi', 'Anthology', 'Action'],
    country: 'Pan-African',
    status: 'completed',
    format: 'anime',
    rating: 9.2,
    popularity: 98,
    synopsis: 'Une anthologie d\'animation de science-fiction qui présente des visions audacieuses de l\'avenir de l\'Afrique... Kizazi Moto: Generation Fire est une série d\'anthologie acclamée par la critique.',
    similarIds: ['mufasa-legend', 'shaka-ila'],
    episodes: [
      { id: 'ep1', number: 1, seasonNumber: 1, title: 'Son de la Poussière', duration: 1200, releaseDate: '2023-07-05', thumbnailUrl: 'https://images.unsplash.com/photo-1614728263952-84ea206f99b6?q=80&w=400&auto=format&fit=crop', videoUrl: 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8' },
      { id: 'ep2', number: 2, seasonNumber: 1, title: 'Adieu le Roi', duration: 1150, releaseDate: '2023-07-05', thumbnailUrl: 'https://images.unsplash.com/photo-1514539079130-25950c84af65?q=80&w=400&auto=format&fit=crop', videoUrl: 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8' },
      { id: 'ep3', number: 3, seasonNumber: 1, title: 'Mami Wata', duration: 1300, releaseDate: '2023-07-05', thumbnailUrl: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=400&auto=format&fit=crop', videoUrl: 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8' },
    ]
  },
  {
    id: 'shaka-ila',
    title: 'Shaka: Ilembe',
    titleOriginal: 'Shaka Ilembe',
    posterUrl: 'https://images.unsplash.com/photo-1514539079130-25950c84af65?q=80&w=600&auto=format&fit=crop',
    bannerUrl: 'https://images.unsplash.com/photo-1514539079130-25950c84af65?q=80&w=1200&auto=format&fit=crop',
    genres: ['Historical', 'Action', 'Drama'],
    country: 'South Africa',
    status: 'ongoing',
    format: 'anime',
    rating: 8.8,
    popularity: 85,
    synopsis: 'L\'ascension épique du roi zoulou Shaka...',
    similarIds: ['kizazi-moto'],
    episodes: [
      { id: 'ep1', number: 1, seasonNumber: 1, title: 'Le Commencement', duration: 1500, releaseDate: '2023-06-18', thumbnailUrl: 'https://images.unsplash.com/photo-1514539079130-25950c84af65?q=80&w=400&auto=format&fit=crop', videoUrl: 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8' },
    ]
  },
  {
    id: 'ijebu-shadows',
    title: 'Ijebu Shadows',
    titleOriginal: 'Shadows of Ijebu',
    posterUrl: 'https://images.unsplash.com/photo-1614728263952-84ea206f99b6?q=80&w=600&auto=format&fit=crop',
    bannerUrl: 'https://images.unsplash.com/photo-1614728263952-84ea206f99b6?q=80&w=1200&auto=format&fit=crop',
    genres: ['Fantasy', 'Mythology', 'Adventure'],
    country: 'Nigeria',
    status: 'ongoing',
    format: 'webtoon',
    rating: 8.5,
    popularity: 72,
    synopsis: 'Dans l\'ancien royaume d\'Ijebu...',
    similarIds: ['kizazi-moto'],
    chapters: [
      { id: 'ch1', number: 1, title: 'Le Réveil des Ombres', releaseDate: '2024-01-10', pages: ['https://images.unsplash.com/photo-1614728263952-84ea206f99b6?q=80&w=1000', 'https://images.unsplash.com/photo-1514539079130-25950c84af65?q=80&w=1000', 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=1000'] },
      { id: 'ch2', number: 2, title: 'La Trahison', releaseDate: '2024-01-17', pages: ['https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1000'] }
    ]
  },
  {
    id: 'lake-of-spirits',
    title: 'The Lake of Spirits',
    titleOriginal: 'Lac des Esprits',
    posterUrl: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=600&auto=format&fit=crop',
    bannerUrl: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=1200&auto=format&fit=crop',
    genres: ['Mystery', 'Supernatural'],
    country: 'Cameroon',
    status: 'upcoming',
    format: 'film',
    rating: 7.9,
    popularity: 45,
    synopsis: 'Une jeune fille retourne dans le village...'
  },
  {
    id: 'mufasa-legend',
    title: 'Mufasa: The Last Stand',
    titleOriginal: 'Mufasa',
    posterUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=600&auto=format&fit=crop',
    bannerUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop',
    genres: ['Action', 'Thriller'],
    country: 'Kenya',
    status: 'ongoing',
    format: 'anime',
    rating: 9.0,
    popularity: 88,
    synopsis: 'Un chasseur de primes urbain...'
  },
  {
    id: 'senegal-tales',
    title: 'Tales of Senegal',
    titleOriginal: 'Contes du Sénégal',
    posterUrl: 'https://images.unsplash.com/photo-1634157703432-46fac0c60914?q=80&w=600&auto=format&fit=crop',
    bannerUrl: 'https://images.unsplash.com/photo-1634157703432-46fac0c60914?q=80&w=1200&auto=format&fit=crop',
    genres: ['Folklore', 'Slice of Life'],
    country: 'Senegal',
    status: 'completed',
    format: 'manga',
    rating: 8.2,
    popularity: 55,
    synopsis: 'Une collection d\'histoires...',
    chapters: [
      { id: 'ch1', number: 1, title: 'Le Lion et la Girafe', releaseDate: '2023-11-05', pages: ['https://images.unsplash.com/photo-1634157703432-46fac0c60914?q=80&w=1000'] }
    ]
  }
];
