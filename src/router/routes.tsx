import { createBrowserRouter } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import HomePage from '../pages/HomePage';
import CataloguePage from '../pages/CataloguePage';
import AnimePage from '../pages/AnimePage';
import WatchPage from '../pages/WatchPage';
import MangaPage from '../pages/MangaPage';
import ReadPage from '../pages/ReadPage';
import SearchPage from '../pages/SearchPage';
import ProfilePage from '../pages/ProfilePage';
import LoginPage from '../pages/LoginPage';
import NotFoundPage from '../pages/NotFoundPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'catalogue',
        element: <CataloguePage />,
      },
      {
        path: 'anime/:id',
        element: <AnimePage />,
      },
      {
        path: 'watch/:animeId/:episodeId',
        element: <WatchPage />,
      },
      {
        path: 'manga/:id',
        element: <MangaPage />,
      },
      {
        path: 'read/:mangaId/:chapterId',
        element: <ReadPage />,
      },
      {
        path: 'search',
        element: <SearchPage />,
      },
      {
        path: 'profile',
        element: <ProfilePage />,
      },
      {
        path: 'login',
        element: <LoginPage />,
      },
    ],
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
]);
