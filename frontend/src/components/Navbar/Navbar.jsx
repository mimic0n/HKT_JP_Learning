import React, { useState, useEffect, useCallback } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import './Navbar.css';

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  // Close mobile menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  // Close on Escape key
  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Escape' && menuOpen) {
      setMenuOpen(false);
    }
  }, [menuOpen]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  return (
    <nav className="navbar" role="navigation" aria-label="Main navigation">
      <div className="navbar__container">
        <NavLink to="/" className="navbar__logo" aria-label="Washi Blossom home">
          Washi Blossom <span className="navbar__subtitle" aria-hidden="true">桜</span>
        </NavLink>

        <button
          className={`navbar__hamburger ${menuOpen ? 'navbar__hamburger--open' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-expanded={menuOpen}
          aria-controls="navbar-menu"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
        >
          <span className="navbar__hamburger-bar" />
          <span className="navbar__hamburger-bar" />
          <span className="navbar__hamburger-bar" />
        </button>

        <div
          className={`navbar__links ${menuOpen ? 'navbar__links--open' : ''}`}
          id="navbar-menu"
        >
          <NavLink to="/" className={({ isActive }) => `navbar__link ${isActive ? 'navbar__link--active' : ''}`}>
            Home
          </NavLink>
          <NavLink to="/practise" className={({ isActive }) => `navbar__link ${isActive ? 'navbar__link--active' : ''}`}>
            Flashcard
          </NavLink>
          <NavLink to="/manage" className={({ isActive }) => `navbar__link ${isActive ? 'navbar__link--active' : ''}`}>
            Vocabulary
          </NavLink>
          <NavLink to="/kana" className={({ isActive }) => `navbar__link ${isActive ? 'navbar__link--active' : ''}`}>
            Kana Chart
          </NavLink>
        </div>

        <button 
          className="navbar__cta"
          onClick={() => navigate('/practise')}
        >
          Today's Review
        </button>
      </div>
    </nav>
  );
}
