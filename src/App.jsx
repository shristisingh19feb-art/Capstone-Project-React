import React from 'react';
import Navbar from './components/Navbar/Navbar';
import Hero from './components/Hero/Hero';
import MovieRow from './components/MovieRow/MovieRow';
import Footer from './components/Footer/Footer';
import './App.css';

// ── Cartoon / Animated Movie Data ───────────────────────────────────────────
// Poster images sourced from TMDB's public CDN (no API key required).
const trendingMovies = [
  {
    id: 1,
    title: 'The Lion King',
    genre: 'Animation / Adventure',
    rating: '8.5',
    year: '1994',
    duration: '1h 28m',
    image: 'https://media.themoviedb.org/t/p/w400/sIyr4E8F1gFb7R3kFMtFfGQCHzT.jpg',
  },
  {
    id: 2,
    title: 'Toy Story',
    genre: 'Animation / Comedy',
    rating: '8.3',
    year: '1995',
    duration: '1h 21m',
    image: 'https://media.themoviedb.org/t/p/w400/uXDfjJbdP4ijW5hWSBrPrlKpxab.jpg',
  },
  {
    id: 3,
    title: 'Finding Nemo',
    genre: 'Animation / Family',
    rating: '8.1',
    year: '2003',
    duration: '1h 40m',
    image: 'https://media.themoviedb.org/t/p/w400/eHuGQ10FUzK1mdOY69wF5pGgEf5.jpg',
  },
  {
    id: 4,
    title: 'Up',
    genre: 'Animation / Drama',
    rating: '8.2',
    year: '2009',
    duration: '1h 36m',
    image: 'https://media.themoviedb.org/t/p/w400/tx7jHn3ZNTJ6h8CxkFbUEqTMYhZ.jpg',
  },
  {
    id: 5,
    title: 'Moana',
    genre: 'Animation / Musical',
    rating: '7.6',
    year: '2016',
    duration: '1h 47m',
    image: 'https://media.themoviedb.org/t/p/w400/uP7gpBiQnlLPHRjk3ULLLhWrHSb.jpg',
  },
  {
    id: 6,
    title: 'Zootopia',
    genre: 'Animation / Comedy',
    rating: '8.0',
    year: '2016',
    duration: '1h 48m',
    image: 'https://media.themoviedb.org/t/p/w400/sM33SANp9zvmIBX4ED6GbSOAdaM.jpg',
  },
];

const newReleases = [
  {
    id: 7,
    title: 'Moana 2',
    genre: 'Animation / Adventure',
    rating: '7.0',
    year: '2024',
    duration: '1h 40m',
    image: 'https://media.themoviedb.org/t/p/w400/aLVkiINlIeCkcZIzb7XHzPYgO6L.jpg',
  },
  {
    id: 8,
    title: 'Mufasa: The Lion King',
    genre: 'Animation / Drama',
    rating: '7.2',
    year: '2024',
    duration: '1h 58m',
    image: 'https://media.themoviedb.org/t/p/w400/lurEK87kukWNaHd0zYnsi3yzJrs.jpg',
  },
  {
    id: 9,
    title: 'Inside Out 2',
    genre: 'Animation / Family',
    rating: '7.7',
    year: '2024',
    duration: '1h 40m',
    image: 'https://media.themoviedb.org/t/p/w400/vpnVM9B6NMmQpWeZvzLvDESb2QY.jpg',
  },
  {
    id: 10,
    title: 'Despicable Me 4',
    genre: 'Animation / Comedy',
    rating: '6.9',
    year: '2024',
    duration: '1h 34m',
    image: 'https://media.themoviedb.org/t/p/w400/wWba3TaojhK7NdycRhoQpsG0FaH.jpg',
  },
  {
    id: 11,
    title: 'The Wild Robot',
    genre: 'Animation / Sci-Fi',
    rating: '8.2',
    year: '2024',
    duration: '1h 42m',
    image: 'https://media.themoviedb.org/t/p/w400/wTnV3PCVW5O92JMrFvvrRcV39RU.jpg',
  },
  {
    id: 12,
    title: 'Flow',
    genre: 'Animation / Adventure',
    rating: '8.3',
    year: '2024',
    duration: '1h 25m',
    image: 'https://media.themoviedb.org/t/p/w400/jBmGBiSQLhOFPOEqBRXEJPV5QjL.jpg',
  },
];

const actionMovies = [
  {
    id: 13,
    title: 'The Incredibles',
    genre: 'Animation / Superhero',
    rating: '8.0',
    year: '2004',
    duration: '1h 55m',
    image: 'https://media.themoviedb.org/t/p/w400/2LqaLgk4Z226KkgPJuiOQ58ShKD.jpg',
  },
  {
    id: 14,
    title: 'Big Hero 6',
    genre: 'Animation / Action',
    rating: '7.8',
    year: '2014',
    duration: '1h 42m',
    image: 'https://media.themoviedb.org/t/p/w400/bzdWqPIxCDlFPMz5MioMOzAlmy8.jpg',
  },
  {
    id: 15,
    title: 'Kung Fu Panda',
    genre: 'Animation / Martial Arts',
    rating: '7.6',
    year: '2008',
    duration: '1h 32m',
    image: 'https://media.themoviedb.org/t/p/w400/wWt85kgDrmS0bFDSGmGJpXgPGID.jpg',
  },
  {
    id: 16,
    title: 'How to Train Your Dragon',
    genre: 'Animation / Fantasy',
    rating: '8.1',
    year: '2010',
    duration: '1h 38m',
    image: 'https://media.themoviedb.org/t/p/w400/ld8jtGeNEBXFuHRJdCWOaJFPNjC.jpg',
  },
  {
    id: 17,
    title: 'Ratatouille',
    genre: 'Animation / Comedy',
    rating: '8.1',
    year: '2007',
    duration: '1h 51m',
    image: 'https://media.themoviedb.org/t/p/w400/npHNjldbeTHdKKw28bJKs7lzqzj.jpg',
  },
  {
    id: 18,
    title: 'Horrid Henry: The Movie',
    genre: 'Animation / Kids',
    rating: '5.9',
    year: '2011',
    duration: '1h 12m',
    image: 'https://media.themoviedb.org/t/p/w400/mNedAuKvpzlLTCOyRhX3AxbKhSc.jpg',
  },
];

// ── App Component ───────────────────────────────────────────────────────────
function App() {
  return (
    <div className="app">
      <Navbar />
      <main>
        <Hero />
        <MovieRow title="🔥 Trending Now"          movies={trendingMovies} />
        <MovieRow title="🆕 New Releases"          movies={newReleases}   />
        <MovieRow title="💥 Top Animated Action"   movies={actionMovies}   />
      </main>
      <Footer />
    </div>
  );
}

export default App;