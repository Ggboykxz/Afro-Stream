# 🌍 AfroStream - La Plateforme de l'Anime & Manga Africain

AfroStream est une plateforme de streaming et de lecture moderne dédiée à la célébration et à la diffusion de l'animation et des bandes dessinées africaines. Alliant une esthétique "AfroNight" audacieuse et une expérience utilisateur fluide, le projet met en avant des talents du continent.

## ✨ Fonctionnalités Principales

- **🎬 Streaming Vidéo Prémium** : Intégration de `Vidstack` pour un lecteur vidéo fluide avec support des épisodes et résolutions.
- **📚 Lecteur Manga Hybride** : Modes de lecture adaptatifs (Webtoon pour le scroll vertical, Manga pour le feuilletage horizontal).
- **🎨 Design AfroNight** : Une interface sombre avec des accents Ultra-Violet et Or, utilisant Tailwind CSS v4 pour une performance maximale.
- **🔐 Authentification Firebase** : Connexion sécurisée via Google pour gérer son profil et ses favoris.
- **📂 Bibliothèque Dynamique** : Recherche instantanée et classification par pays d'origine (Nigeria, Afrique du Sud, Kenya, etc.).
- **👤 Espace Personnel** : Historique de lecture, liste de favoris et gestion des préférences de compte.

## 🚀 Stack Technique

- **Framework** : [React 19](https://react.dev/) + [Vite](https://vitejs.dev/)
- **Style** : [Tailwind CSS v4](https://tailwindcss.com/) (Architecture moderne @theme)
- **Animations** : [Framer Motion](https://motion.dev/)
- **Icônes** : [Lucide React](https://lucide.dev/)
- **Backend** : [Firebase](https://firebase.google.com/) (Auth / Firestore)
- **State Management** : [Zustand](https://zustand-demo.pmnd.rs/)
- **Routage** : [React Router v7](https://reactrouter.com/)

## 📂 Structure du Projet

```text
src/
├── components/     # Composants atomiques et organisés par module (home, anime)
├── lib/            # Utilitaires, constantes et données de démo (seedData)
├── pages/          # Pages principales (Watch, Read, Profile, Search, etc.)
├── router/         # Configuration du routing React Router
├── services/       # Intégrations Firebase et services Tier-3
└── store/          # Stores Zustand (authStore)
```

## 🛠️ Installation et Lancement

1. **Installer les dépendances** :
   ```bash
   npm install
   ```

2. **Lancer en mode développement** :
   ```bash
   npm run dev
   ```

3. **Compiler pour la production** :
   ```bash
   npm run build
   ```

## 📜 Licence

Ce projet est conçu dans le cadre d'une démonstration de plateforme culturelle dédiée à l'Afrique. Tous les visuels utilisés sont des placeholders issus d'Unsplash ou des références à des œuvres existantes.
