import React, { useRef } from 'react';
import MovieCard from '../MovieCard/MovieCard';
import './MovieRow.css';

function MovieRow({ title, movies, isKids, onMovieClick }) {
  var rowRef = useRef(null);

  function scroll(direction) {
    var amount = 700;
    if (rowRef.current) {
      rowRef.current.scrollBy({
        left: direction === 'right' ? amount : -amount,
        behavior: 'smooth',
      });
    }
  }

  return (
    <section className="movie-row">
      <div className="movie-row__header">
        <h2 className="movie-row__title">{title}</h2>
        <button className="movie-row__see-all">See All →</button>
      </div>

      <div className="movie-row__wrapper">
        <button
          className="movie-row__arrow movie-row__arrow--left"
          onClick={function () { scroll('left'); }}
          aria-label="Scroll left"
        >
          ‹
        </button>

        <div className="movie-row__cards" ref={rowRef}>
          {movies.map(function (movie) {
            return (
              <MovieCard
                key={movie.id}
                movie={movie}
                isKids={isKids}
                onMovieClick={onMovieClick}
              />
            );
          })}
        </div>

        <button
          className="movie-row__arrow movie-row__arrow--right"
          onClick={function () { scroll('right'); }}
          aria-label="Scroll right"
        >
          ›
        </button>
      </div>
    </section>
  );
}

export default MovieRow;