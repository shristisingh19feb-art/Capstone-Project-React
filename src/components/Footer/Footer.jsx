import React from 'react';
import './Footer.css';

var FOOTER_COLUMNS = [
  {
    heading: 'Explore',
    links: ['Movies', 'TV Series', 'Originals', 'Documentaries', 'Kids Zone'],
  },
  {
    heading: 'Account',
    links: ['Sign In', 'Register', 'Manage Profile', 'Subscription', 'Parental Controls'],
  },
  {
    heading: 'Support',
    links: ['Help Centre', 'Contact Us', 'Device Support', 'Accessibility', 'FAQs'],
  },
  {
    heading: 'Company',
    links: ['About Us', 'Careers', 'Press', 'Privacy Policy', 'Terms of Service'],
  },
];

function Footer({ isKids }) {
  return (
    <footer className="footer">
      <div className="footer__container">

        <div className="footer__top">
          <div className="footer__brand">
            <div className="footer__logo">
              <span className="footer__logo-icon">▶</span>
              <span className="footer__logo-text">
                {isKids ? 'Screenify 🌈' : 'SCREENIFY'}
              </span>
            </div>
            <p className="footer__tagline">
              Where Stories Come Alive.<br />
              Step Inside, Let Moments Thrive.
            </p>
            <div className="footer__social">
              {['𝕏', 'IG', 'YT', 'FB'].map(function (s) {
                return (
                  <button key={s} className="footer__social-btn" aria-label={s}>
                    {s}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="footer__links-grid">
            {FOOTER_COLUMNS.map(function (col) {
              return (
                <div key={col.heading} className="footer__col">
                  <h4 className="footer__col-heading">{col.heading}</h4>
                  <ul className="footer__col-links">
                    {col.links.map(function (link) {
                      return (
                        <li key={link}>
                          <a href="#" className="footer__link">{link}</a>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>

        <div className="footer__divider"></div>

        <div className="footer__bottom">
          <p className="footer__copy">
            © {new Date().getFullYear()} SCREENIFY. All rights reserved.
          </p>
          <p className="footer__credit">
            {isKids ? 'Made with 💖 for little dreamers!' : 'Where Stories Come Alive ❤️'}
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;