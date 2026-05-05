import React, { useState, useEffect } from 'react';
import './Hero.css';

const FEATURED = [
  {
    id: 1,
    title: 'The Wild Robot',
    tagline: 'A robot lost at sea finds a family she never expected.',
    genre: 'Animation • Sci-Fi • 2024',
    rating: '8.2',
    image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=1400&h=700&fit=crop&q=80',
  },
  {
    id: 2,
    title: 'Inside Out 2',
    tagline: 'New feelings, new adventures — growing up is complicated!',
    genre: 'Animation • Family • 2024',
    rating: '7.7',
    image: 'https://images.unsplash.com/photo-1531685250784-7569952593d2?w=1400&h=700&fit=crop&q=80',
  },
  {
    id: 3,
    title: 'Flow',
    tagline: 'A cat. A boat. A flood. And the journey of a lifetime.',
    genre: 'Animation • Adventure • 2024',
    rating: '8.3',
    image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=1400&h=700&fit=crop&q=80',
  },
];

function Hero({ isKids, onMovieClick }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visible, setVisible]           = useState(true);

  useEffect(function () {
    var timer = setInterval(function () {
      changeSlide((currentIndex + 1) % FEATURED.length);
    }, 5000);
    return function () { clearInterval(timer); };
  }, [currentIndex]);

  function changeSlide(index) {
    setVisible(false);
    setTimeout(function () {
      setCurrentIndex(index);
      setVisible(true);
    }, 300);
  }

  var movie = FEATURED[currentIndex];

  return (
    <section className="hero">
      <div
        className="hero__bg"
        style={{ backgroundImage: 'url(' + movie.image + ')' }}
      ></div>

      <div className="hero__overlay"></div>
      <div className="hero__overlay-bottom"></div>
      <div className="hero__overlay-side"></div>

      <div className={`hero__content ${visible ? 'hero__content--visible' : ''}`}>
        <div className="hero__badge">
          {isKids ? '🎬 Now Watching!' : '▶ Now Streaming'}
        </div>
        <h1 className="hero__title">{movie.title}</h1>
        <p className="hero__tagline">{movie.tagline}</p>
        <div className="hero__meta">
          <span className="hero__genre">{movie.genre}</span>
          <span className="hero__rating">⭐ {movie.rating}</span>
        </div>

        <div className="hero__buttons">
          <button className="hero__btn hero__btn--play">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <polygon points="5,3 19,12 5,21" />
            </svg>
            Play Now
          </button>
          <button
            className="hero__btn hero__btn--info"
            onClick={function () {
              /* find matching movie from data if needed — just alert for hero */
              if (onMovieClick) {
                onMovieClick({
                  id: movie.id,
                  title: movie.title,
                  genre: movie.genre,
                  rating: movie.rating,
                  year: '2024',
                  duration: '1h 40m',
                  emoji: '🎬',
                  image: movie.image,
                  desc: movie.tagline + ' An incredible animated adventure you won\'t want to miss!',
                });
              }
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8"  x2="12"   y2="12"  />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            More Info
          </button>
          <button className="hero__btn hero__btn--watchlist">+ Watchlist</button>
        </div>
      </div>

      <div className="hero__dots">
        {FEATURED.map(function (_, i) {
          return (
            <button
              key={i}
              className={`hero__dot ${i === currentIndex ? 'hero__dot--active' : ''}`}
              onClick={function () { changeSlide(i); }}
              aria-label={'Slide ' + (i + 1)}
            ></button>
          );
        })}
      </div>
    </section>
  );
}

export default Hero;