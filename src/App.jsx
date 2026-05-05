import React, { useState, useCallback } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar   from './components/Navbar/Navbar';
import Hero     from './components/Hero/Hero';
import MovieRow from './components/MovieRow/MovieRow';
import MovieModal from './components/MovieModal/MovieModal';
import KidsBanner from './components/KidsBanner/KidsBanner';
import Footer   from './components/Footer/Footer';
import './App.css';

// ── All movie data ────────────────────────────────────────────────────────────
const trendingMovies = [
  {
    id: 1, title: 'The Lion King', genre: 'Animation / Adventure',
    rating: '8.5', year: '1994', duration: '1h 28m', emoji: '🦁',
    image: 'https://images.unsplash.com/photo-1614036417651-efe5912149d8?w=600&h=340&fit=crop&q=80',
    desc: 'Simba, a young lion prince, flees his kingdom after the murder of his father Mufasa by his uncle Scar. Years later he must return and reclaim his rightful place on Pride Rock. A timeless tale of courage, friendship, and the circle of life — pure magic for the whole family! 🌅',
  },
  {
    id: 2, title: 'Toy Story', genre: 'Animation / Comedy',
    rating: '8.3', year: '1995', duration: '1h 21m', emoji: '🤠',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=340&fit=crop&q=80',
    desc: 'Woody, a cowboy toy, is Andy\'s favourite — until Buzz Lightyear arrives. Jealousy turns into adventure when both toys end up lost and must work together to get home. The movie that started it all! You\'ve got a friend in me. 🤝',
  },
  {
    id: 3, title: 'Finding Nemo', genre: 'Animation / Family',
    rating: '8.1', year: '2003', duration: '1h 40m', emoji: '🐠',
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=600&h=340&fit=crop&q=80',
    desc: 'Marlin, an overprotective clownfish, embarks on a thrilling ocean adventure to rescue his son Nemo from a dentist\'s fish tank in Sydney. Just keep swimming! With Dory by his side, nothing is impossible. 🌊',
  },
  {
    id: 4, title: 'Up', genre: 'Animation / Drama',
    rating: '8.2', year: '2009', duration: '1h 36m', emoji: '🎈',
    image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=600&h=340&fit=crop&q=80',
    desc: 'Elderly widower Carl Fredricksen fulfils his late wife\'s dream by tying thousands of balloons to his house and floating to South America. He\'s not alone — young Russell accidentally hitches a ride. Adventure is out there! 🏔️',
  },
  {
    id: 5, title: 'Moana', genre: 'Animation / Musical',
    rating: '7.6', year: '2016', duration: '1h 47m', emoji: '🌊',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&h=340&fit=crop&q=80',
    desc: 'The spirited daughter of a Pacific Island chief sets sail on a daring mission to save her people, teaming up with the demigod Maui. The ocean is calling! Stunning animation, unforgettable songs, and a heroine like no other. 🌺',
  },
  {
    id: 6, title: 'Zootopia', genre: 'Animation / Comedy',
    rating: '8.0', year: '2016', duration: '1h 48m', emoji: '🦊',
    image: 'https://images.unsplash.com/photo-1474511320723-9a56873867b5?w=600&h=340&fit=crop&q=80',
    desc: 'Judy Hopps becomes the first bunny police officer in the mammal metropolis of Zootopia. With sly fox Nick Wilde\'s help she unravels a conspiracy. Try everything! A clever, funny, and deeply meaningful adventure about inclusion and dreams. 🐰',
  },
];

const newReleases = [
  {
    id: 7, title: 'Moana 2', genre: 'Animation / Adventure',
    rating: '7.0', year: '2024', duration: '1h 40m', emoji: '🌺',
    image: 'https://images.unsplash.com/photo-1534190760961-74e8c1c5c3da?w=600&h=340&fit=crop&q=80',
    desc: 'Moana is back on another incredible ocean voyage! She receives an unexpected call from her wayfinding ancestors and must journey to the far seas of Oceania. Bigger waves, bigger adventures, bigger songs — the sequel the whole family has been waiting for! 🌊✨',
  },
  {
    id: 8, title: 'Mufasa: The Lion King', genre: 'Animation / Drama',
    rating: '7.2', year: '2024', duration: '1h 58m', emoji: '🦁',
    image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=600&h=340&fit=crop&q=80',
    desc: 'The origin story of Mufasa — from a lost cub to the beloved King of Pride Rock. Discover how he found his pride, his place, and his purpose. A prequel that will make you fall in love with the Lion King universe all over again. ✨🌅',
  },
  {
    id: 9, title: 'Inside Out 2', genre: 'Animation / Family',
    rating: '7.7', year: '2024', duration: '1h 40m', emoji: '😊',
    image: 'https://images.unsplash.com/photo-1531685250784-7569952593d2?w=600&h=340&fit=crop&q=80',
    desc: 'Riley is now a teenager and new emotions are moving into Headquarters! Meet Anxiety, Envy, Ennui, and Embarrassment as they join Joy and the original crew. Growing up is complicated — but it\'s also beautiful. Pixar\'s most heartfelt film in years! 🧠❤️',
  },
  {
    id: 10, title: 'Despicable Me 4', genre: 'Animation / Comedy',
    rating: '6.9', year: '2024', duration: '1h 34m', emoji: '💛',
    image: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=600&h=340&fit=crop&q=80',
    desc: 'Gru, Lucy, and the girls welcome a new member to the family: Gru Jr. But a new villain threat means Gru must team up with the AVL once again. More minions, more chaos, more laughs! 🍌 The whole gang is back and funnier than ever.',
  },
  {
    id: 11, title: 'The Wild Robot', genre: 'Animation / Sci-Fi',
    rating: '8.2', year: '2024', duration: '1h 42m', emoji: '🤖',
    image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=600&h=340&fit=crop&q=80',
    desc: 'A robot named Rozzum — Roz — is stranded on a wild island and must learn to survive. When she adopts an orphaned gosling, their unlikely bond changes everything. Breathtaking animation and one of the most touching stories of 2024. Prepare for happy tears! 💙',
  },
  {
    id: 12, title: 'Flow', genre: 'Animation / Adventure',
    rating: '8.3', year: '2024', duration: '1h 25m', emoji: '🐱',
    image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=600&h=340&fit=crop&q=80',
    desc: 'A lone cat bands together with a capybara, a bird, a dog, and a lemur aboard a boat to survive a great flood. No dialogue — just breathtaking visuals and an incredible emotional journey. Latvia\'s beautiful masterpiece that has swept the world\'s heart! 🌊🐈',
  },
];

const actionMovies = [
  {
    id: 13, title: 'The Incredibles', genre: 'Animation / Superhero',
    rating: '8.0', year: '2004', duration: '1h 55m', emoji: '💥',
    image: 'https://images.unsplash.com/photo-1531956531700-dc0ee0f1f9a5?w=600&h=340&fit=crop&q=80',
    desc: 'A family of undercover superheroes must go back into action to save the world. Mr. Incredible, Elastigirl, Violet, Dash, and baby Jack-Jack — together there\'s no villain they can\'t beat! Where is my super suit?! The greatest superhero family movie ever made. 🦸‍♂️💪',
  },
  {
    id: 14, title: 'Big Hero 6', genre: 'Animation / Action',
    rating: '7.8', year: '2014', duration: '1h 42m', emoji: '🤖',
    image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600&h=340&fit=crop&q=80',
    desc: 'Brilliant young robotics prodigy Hiro Hamada teams up with his adorable healthcare robot Baymax and a group of friends to uncover a dark conspiracy. Hairy baby! A superhero adventure full of heart, tech, and unforgettable friendship. 💙',
  },
  {
    id: 15, title: 'Kung Fu Panda', genre: 'Animation / Martial Arts',
    rating: '7.6', year: '2008', duration: '1h 32m', emoji: '🐼',
    image: 'https://images.unsplash.com/photo-1564349683136-77e08dba1ef7?w=600&h=340&fit=crop&q=80',
    desc: 'Po, a bumbling giant panda and avid kung fu fan, is chosen as the legendary Dragon Warrior. With Master Shifu and the Furious Five he must face the fearsome Tai Lung. There is no secret ingredient! A hilarious and surprisingly profound martial arts epic. 🥟🥋',
  },
  {
    id: 16, title: 'How to Train Your Dragon', genre: 'Animation / Fantasy',
    rating: '8.1', year: '2010', duration: '1h 38m', emoji: '🐉',
    image: 'https://images.unsplash.com/photo-1588117305388-c2631a279f82?w=600&h=340&fit=crop&q=80',
    desc: 'Young Viking Hiccup befriends the most feared dragon of all — a Night Fury he names Toothless — and discovers that dragons aren\'t the enemy. A soaring adventure about friendship, bravery, and challenging what you think you know. One of the greatest animated films ever! 💚',
  },
  {
    id: 17, title: 'Ratatouille', genre: 'Animation / Comedy',
    rating: '8.1', year: '2007', duration: '1h 51m', emoji: '🐭',
    image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&h=340&fit=crop&q=80',
    desc: 'Remy the rat dreams of becoming a great French chef — and through an unlikely partnership with Linguini, he gets his shot at the most famous restaurant in Paris. Anyone can cook! A delicious celebration of passion, art, and never giving up on your dreams. 🍝✨',
  },
  {
    id: 18, title: 'Encanto', genre: 'Animation / Musical',
    rating: '7.3', year: '2021', duration: '1h 39m', emoji: '🌺',
    image: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=600&h=340&fit=crop&q=80',
    desc: 'Mirabel is the one member of the magical Madrigal family without any powers — but when the family\'s magic begins to fade, she may be the only one who can save it. We don\'t talk about Bruno... but you\'ll be singing about him for weeks! 🕯️🦋',
  },
];

// ── App Component ─────────────────────────────────────────────────────────────
function App() {
  const [isKids, setIsKids]             = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [toastMsg, setToastMsg]         = useState('');
  const [toastVisible, setToastVisible] = useState(false);

  // Toggle kids / dark theme
  const toggleTheme = useCallback(() => {
    setIsKids(prev => {
      const next = !prev;
      document.body.classList.toggle('kids', next);
      showToast(next ? '🎀 Kids Mode On! Let the fun begin!' : '🎬 Cinema Mode activated!');
      return next;
    });
  }, []);

  // Show toast notification
  const showToast = useCallback((msg) => {
    setToastMsg(msg);
    setToastVisible(true);
    setTimeout(() => setToastVisible(false), 3000);
  }, []);

  const openModal  = useCallback((movie) => setSelectedMovie(movie), []);
  const closeModal = useCallback(() => setSelectedMovie(null), []);

  return (
    <BrowserRouter>
    <div className={`app ${isKids ? 'kids-app' : ''}`}>
      {/* Floating stickers – kids mode only */}
      <div className="stickers" aria-hidden="true">
        {['⭐','🌈','🦄','🎀','🌟','🍭','🐱','🦋'].map((s, i) => (
          <span key={i} className="sticker">{s}</span>
        ))}
      </div>

      <Navbar isKids={isKids} onToggleTheme={toggleTheme} />

      <main style={{ paddingTop: 'var(--nav-height)' }}>
          <Routes>
            <Route path="/" element={
              <>
                <Hero isKids={isKids} onMovieClick={openModal} />

                {/* Kids welcome banner */}
                {isKids && <KidsBanner />}

                <MovieRow
                  title={isKids ? '🔥 Trending Adventures' : '🔥 Trending Now'}
                  movies={trendingMovies}
                  isKids={isKids}
                  onMovieClick={openModal}
                />
                <MovieRow
                  title={isKids ? '✨ New Magical Releases' : '🆕 New Releases'}
                  movies={newReleases}
                  isKids={isKids}
                  onMovieClick={openModal}
                />
                <MovieRow
                  title={isKids ? '💥 Epic Animated Action' : '💥 Top Animated Action'}
                  movies={actionMovies}
                  isKids={isKids}
                  onMovieClick={openModal}
                />
              </>
            } />
          </Routes>
        </main>

      <Footer isKids={isKids} />

      {/* Movie detail modal */}
      {selectedMovie && (
        <MovieModal
          movie={selectedMovie}
          isKids={isKids}
          onClose={closeModal}
          onWatchlist={() => showToast(isKids ? '🌟 Added to your list!' : 'Added to Watchlist!')}
        />
      )}

      {/* Toast notification */}
      <div className={`toast ${toastVisible ? 'show' : ''}`}>{toastMsg}</div>
    </div>
    </BrowserRouter>
  );
}

export default App;