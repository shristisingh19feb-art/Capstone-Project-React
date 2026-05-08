import React from 'react';
import './Kidsbanner.css';

function Kidsbanner() {
  return (
    <div className="kids-banner">
      <div className="kids-banner__chars" aria-hidden="true">
        <span>🦁</span>
        <span>🐠</span>
        <span>🤖</span>
        <span>🐼</span>
        <span>🌊</span>
      </div>
      <h2 className="kids-banner__title">Welcome to Screenify Kids! 🌈</h2>
      <p className="kids-banner__sub">Magical movies for little adventurers ✨</p>
    </div>
  );
}

export default Kidsbanner;