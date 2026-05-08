import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Navbar.css';

const NAV_LINKS = [
  { label: 'Home',      path: '/' },
  { label: 'Movies',    path: '/movies' },
  { label: 'Series',    path: '/series' },
  { label: 'Originals', path: '/originals' },
  { label: 'My List',   path: '/my-list' },
];

function Navbar({ isKids, onToggleTheme }) {
  const [scrolled, setScrolled]           = useState(false);
  const [menuOpen, setMenuOpen]           = useState(false);
  const [showSignIn, setShowSignIn]       = useState(false);
  const [signInSuccess, setSignInSuccess] = useState(false);
  const [userName, setUserName]           = useState('');

  const navigate = useNavigate();
  const location = useLocation();

  // Scroll effect
  useEffect(function () {
    function handleScroll() { setScrolled(window.scrollY > 50); }
    window.addEventListener('scroll', handleScroll);
    return function () { window.removeEventListener('scroll', handleScroll); };
  }, []);

  // Close modal on Escape key
  useEffect(function () {
    function handleKeyDown(e) { if (e.key === 'Escape') closeSignIn(); }
    if (showSignIn) window.addEventListener('keydown', handleKeyDown);
    return function () { window.removeEventListener('keydown', handleKeyDown); };
  }, [showSignIn]);

  // Close mobile menu on route change
  useEffect(function () { setMenuOpen(false); }, [location.pathname]);

  function handleNavClick(path) {
    navigate(path);
    setMenuOpen(false);
  }

  function isActive(path) {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  }

  function openSignIn() {
    setShowSignIn(true);
    setSignInSuccess(false);
    document.body.style.overflow = 'hidden';
  }

  function closeSignIn() {
    setShowSignIn(false);
    setSignInSuccess(false);
    setUserName('');
    document.body.style.overflow = '';
  }

  function handleSignInSubmit(e) {
    e.preventDefault();
    const name = e.target.elements['signinName'].value.trim();
    setUserName(name);
    setSignInSuccess(true);
    setTimeout(function () { closeSignIn(); }, 2200);
  }

  return (
    <>
      <nav className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
        <div className="navbar__container">

          {/* Logo */}
          <div className="navbar__logo" onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
            <span className="navbar__logo-icon">▶</span>
            <span className="navbar__logo-text">
              {isKids ? 'Screenify 🌈' : 'SCREENIFY'}
            </span>
          </div>

          {/* Desktop nav links */}
          <ul className="navbar__links">
            {NAV_LINKS.map(function ({ label, path }) {
              return (
                <li key={path}>
                  <a
                    href="#"
                    className={`navbar__link ${isActive(path) ? 'navbar__link--active' : ''}`}
                    onClick={function (e) { e.preventDefault(); handleNavClick(path); }}
                  >
                    {label}
                  </a>
                </li>
              );
            })}
          </ul>

          {/* Right actions */}
          <div className="navbar__actions">
            <button className="navbar__search-btn" aria-label="Search">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </button>

            {/* Theme toggle */}
            <button
              className="navbar__theme-toggle"
              onClick={onToggleTheme}
              title={isKids ? 'Switch to Cinema Mode' : 'Switch to Kids Mode'}
              aria-label="Toggle theme"
            >
              <span className="toggle__icon">{isKids ? '🌙' : '🎀'}</span>
              <div className="toggle__pill">
                <div className={`toggle__thumb ${isKids ? 'toggle__thumb--right' : ''}`}>
                  {isKids ? '🌙' : '🎬'}
                </div>
              </div>
              <span className="toggle__label">{isKids ? 'DARK' : 'KIDS'}</span>
            </button>

            <button className="navbar__btn navbar__btn--sign-in" onClick={openSignIn}>Sign In</button>
            <button className="navbar__btn navbar__btn--subscribe">Subscribe</button>
          </div>

          {/* Hamburger */}
          <button
            className={`navbar__hamburger ${menuOpen ? 'navbar__hamburger--open' : ''}`}
            onClick={function () { setMenuOpen(!menuOpen); }}
            aria-label="Toggle menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>

        {/* Mobile drawer */}
        <div className={`navbar__mobile-menu ${menuOpen ? 'navbar__mobile-menu--open' : ''}`}>
          {NAV_LINKS.map(function ({ label, path }) {
            return (
              <a
                key={path}
                href="#"
                className={`navbar__mobile-link ${isActive(path) ? 'navbar__mobile-link--active' : ''}`}
                onClick={function (e) { e.preventDefault(); handleNavClick(path); }}
              >
                {label}
              </a>
            );
          })}
          <div className="navbar__mobile-actions">
            <button className="navbar__theme-toggle" onClick={onToggleTheme}>
              <span className="toggle__icon">{isKids ? '🌙' : '🎀'}</span>
              <span className="toggle__label" style={{ fontSize: '13px' }}>
                {isKids ? 'Cinema Mode' : 'Kids Mode'}
              </span>
            </button>
            <button className="navbar__btn navbar__btn--sign-in" onClick={openSignIn}>Sign In</button>
            <button className="navbar__btn navbar__btn--subscribe">Subscribe</button>
          </div>
        </div>
      </nav>

      {/* ===== SIGN IN MODAL ===== */}
      {showSignIn && (
        <div
          className="signup-modal"
          onClick={function (e) { if (e.target.classList.contains('signup-modal')) closeSignIn(); }}
        >
          <div className="signup-container signin-container">
            <button className="signup-close" onClick={closeSignIn} aria-label="Close">×</button>

            {!signInSuccess ? (
              <>
                <div className="signin-modal-logo">▶ SCREENIFY</div>
                <h2>Welcome Back</h2>
                <p>Sign in to access your watchlist &amp; more 🎬</p>

                <form className="signup-form" onSubmit={handleSignInSubmit}>
                  <div className="signin-field">
                    <label htmlFor="signinName">Full Name</label>
                    <div className="signin-input-wrap">
                      <span className="signin-icon">👤</span>
                      <input id="signinName" name="signinName" type="text"
                        placeholder="e.g. Jane Doe" required autoComplete="name" autoFocus />
                    </div>
                  </div>

                  <div className="signin-field">
                    <label htmlFor="signinAge">Age</label>
                    <div className="signin-input-wrap">
                      <span className="signin-icon">🎂</span>
                      <input id="signinAge" name="signinAge" type="number"
                        placeholder="Your age" min="1" max="120" required />
                    </div>
                  </div>

                  <div className="signin-field">
                    <label htmlFor="signinPhone">Phone Number</label>
                    <div className="signin-input-wrap">
                      <span className="signin-icon">📱</span>
                      <input id="signinPhone" name="signinPhone" type="tel"
                        placeholder="+91 98765 43210" required autoComplete="tel" />
                    </div>
                  </div>

                  <button type="submit" className="signup-submit-btn">SIGN IN →</button>
                </form>

                <p className="signin-footer-text">
                  Don't have an account?{' '}
                  <span className="signin-subscribe-link" onClick={closeSignIn}>Subscribe now</span>
                </p>
              </>
            ) : (
              <div className="signin-success">
                <div className="signin-success-icon">🎉</div>
                <h3>Welcome, {userName}!</h3>
                <p>You're all set. Enjoy Screenify!</p>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default Navbar;