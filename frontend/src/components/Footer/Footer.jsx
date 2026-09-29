import React from 'react';
import { NavLink } from 'react-router-dom';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__container">
        <div className="footer__top">
          <div className="footer__logo">Washi Blossom</div>
          <div className="footer__nav">
            <NavLink to="/" className="footer__link">Home</NavLink>
            <NavLink to="/practise" className="footer__link">Flashcards (SRS)</NavLink>
            <NavLink to="/manage" className="footer__link">Vocabulary Manager</NavLink>
            <NavLink to="/kana" className="footer__link">Kana Chart</NavLink>
          </div>
        </div>

        <div className="footer__copyright">
          © 2026 Washi Blossom. Study with serenity.
        </div>
      </div>
    </footer>
  );
}
