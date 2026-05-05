import React, { useEffect } from 'react';
import './MovieModal.css';

function MovieModal({ movie, isKids, onClose, onWatchlist }) {

  // Close on Escape key
  useEffect(function () {
    function onKey(e) { if (e.key === 'Escape') onClose(); }
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return function () {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  // Close when clicking the backdrop
  function handleBackdropClick(e) {
    if (e.target === e.currentTarget) onClose();
  }

  return (
    <div
      className="modal-overlay"
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-label={`Details for ${movie.title}`}
    >
      <div className="modal">
        {/* Hero image */}
        <div className="modal__hero">
          <img
            src={movie.image}
            alt={movie.title}
            className="modal__hero-img"
          />
          <div className="modal__hero-overlay"></div>

          {/* Close button */}
          <button
            className="modal__close"
            onClick={onClose}
            aria-label="Close"
          >
            ✕
          </button>

          {/* Kids badge over image */}
          {isKids && (
            <div className="modal__kids-sticker">{movie.emoji}</div>
          )}
        </div>

        {/* Body */}
        <div className="modal__body">
          <div className="modal__badge">
            {isKids ? '🎬 Now Watching!' : '▶ Now Streaming'}
          </div>

          <h2 className="modal__title">
            {isKids && movie.emoji ? `${movie.emoji} ` : ''}{movie.title}
          </h2>

          <div className="modal__meta-row">
            <span className="modal__pill modal__pill--rating">⭐ {movie.rating}</span>
            <span className="modal__pill modal__pill--genre">{movie.genre}</span>
            <span className="modal__pill modal__pill--year">{movie.year}</span>
            <span className="modal__pill modal__pill--dur">🕐 {movie.duration}</span>
          </div>

          <p className="modal__desc">{movie.desc}</p>

          <div className="modal__btns">
            <button className="modal__btn modal__btn--play">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <polygon points="5,3 19,12 5,21" />
              </svg>
              {isKids ? 'Watch Now! 🎉' : 'Play Now'}
            </button>
            <button
              className="modal__btn modal__btn--watchlist"
              onClick={onWatchlist}
            >
              {isKids ? '⭐ Save to My List' : '+ Add to Watchlist'}
            </button>
            <button
              className="modal__btn modal__btn--close"
              onClick={onClose}
            >
              {isKids ? '← Go Back' : 'Close'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieModal;