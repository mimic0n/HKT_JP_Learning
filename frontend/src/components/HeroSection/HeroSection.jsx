import React from 'react';
import { useNavigate } from 'react-router-dom';
import './HeroSection.css';

export default function HeroSection() {
  const navigate = useNavigate();

  const handleAction = (level, mode) => {
    if (mode === 'flashcard') {
      navigate(`/practise?level=${level}`);
    } else {
      navigate(`/manage?level=${level}`);
    }
  };

  return (
    <div className="hero-section">
      <header className="hero-header animate-scale-in">
        <h1 className="display-hero mb-4">
          JLPT Prep Center
        </h1>
        <p className="body-lg hero-description">
          A structured guide to conquer the JLPT from N5 to N1. Find thousands of essential kanji, vocabulary items, and grammar points in one place.
        </p>

        <div className="hero-badges">
          <div className="glass-panel hero-badge">
            <span className="material-symbols-outlined icon-pink">school</span>
            <span className="label-caps">5 Exam Levels</span>
          </div>
          <div className="glass-panel hero-badge">
            <span className="material-symbols-outlined icon-pink">translate</span>
            <span className="label-caps">2000+ Kanji</span>
          </div>
          <div className="glass-panel hero-badge">
            <span className="material-symbols-outlined icon-pink">menu_book</span>
            <span className="label-caps">10,000+ Vocab</span>
          </div>
        </div>
      </header>

      {/* JLPT Roadmap Bento Grid */}
      <section className="roadmap">
        <div className="roadmap__title-row">
          <span className="material-symbols-outlined roadmap__icon">map</span>
          <h2 className="headline-md">JLPT Roadmap</h2>
        </div>
        <p className="body-md roadmap__subtitle">Pick a target level to see available materials.</p>

        <div className="roadmap__grid">
          {/* N5 Card */}
          <div className="glass-panel roadmap-card roadmap-card--n5 washi-texture neo-lift animate-fade-in-up delay-1">
            <div className="roadmap-card__header">
              <div>
                <span className="badge-phase badge-phase--n5">Phase 1</span>
                <h3 className="headline-md">N5</h3>
                <p className="label-sm text-dim uppercase">Beginner Foundations</p>
              </div>
              <span className="watermark">N5</span>
            </div>
            <p className="body-md roadmap-card__desc">Build the most important scripts, particles, and sentence patterns.</p>
            <div className="roadmap-card__buttons">
              <button onClick={() => handleAction('N5', 'vocab')} className="action-btn-item">
                <span className="material-symbols-outlined">translate</span>
                <span>Kanji</span>
              </button>
              <button onClick={() => handleAction('N5', 'vocab')} className="action-btn-item">
                <span className="material-symbols-outlined">library_books</span>
                <span>Vocab</span>
              </button>
              <button onClick={() => handleAction('N5', 'flashcard')} className="action-btn-item action-btn-item--highlight">
                <span className="material-symbols-outlined">style</span>
                <span>SRS Flashcard</span>
              </button>
            </div>
          </div>

          {/* N4 Card */}
          <div className="glass-panel roadmap-card roadmap-card--n4 washi-texture neo-lift animate-fade-in-up delay-2">
            <div className="roadmap-card__header">
              <div>
                <span className="badge-phase badge-phase--n4">Phase 2</span>
                <h3 className="headline-md">N4</h3>
                <p className="label-sm text-dim uppercase">Upper Beginner</p>
              </div>
              <span className="watermark">N4</span>
            </div>
            <p className="body-md roadmap-card__desc">Expand grammar and short reading for stable everyday communication.</p>
            <div className="roadmap-card__buttons">
              <button onClick={() => handleAction('N4', 'vocab')} className="action-btn-item">
                <span className="material-symbols-outlined">translate</span>
                <span>Kanji</span>
              </button>
              <button onClick={() => handleAction('N4', 'vocab')} className="action-btn-item">
                <span className="material-symbols-outlined">library_books</span>
                <span>Vocab</span>
              </button>
              <button onClick={() => handleAction('N4', 'flashcard')} className="action-btn-item action-btn-item--highlight">
                <span className="material-symbols-outlined">style</span>
                <span>SRS Flashcard</span>
              </button>
            </div>
          </div>

          {/* N3 Card */}
          <div className="glass-panel roadmap-card roadmap-card--n3 washi-texture neo-lift animate-fade-in-up delay-3">
            <div className="roadmap-card__header">
              <div>
                <span className="badge-phase badge-phase--n3">Phase 3</span>
                <h3 className="headline-md">N3</h3>
                <p className="label-sm text-dim uppercase">Intermediate Bridge</p>
              </div>
              <span className="watermark">N3</span>
            </div>
            <p className="body-md roadmap-card__desc">Move into context, nuance, and near-normal-speed listening.</p>
            <div className="roadmap-card__buttons">
              <button onClick={() => handleAction('N3', 'vocab')} className="action-btn-item">
                <span className="material-symbols-outlined">translate</span>
                <span>Kanji</span>
              </button>
              <button onClick={() => handleAction('N3', 'vocab')} className="action-btn-item">
                <span className="material-symbols-outlined">library_books</span>
                <span>Vocab</span>
              </button>
              <button onClick={() => handleAction('N3', 'flashcard')} className="action-btn-item action-btn-item--highlight">
                <span className="material-symbols-outlined">style</span>
                <span>SRS Flashcard</span>
              </button>
            </div>
          </div>

          {/* N2 Card */}
          <div className="glass-panel roadmap-card roadmap-card--n2 washi-texture neo-lift animate-fade-in-up delay-4">
            <div className="roadmap-card__header">
              <div>
                <span className="badge-phase badge-phase--n2">Phase 4</span>
                <h3 className="headline-md">N2</h3>
                <p className="label-sm text-dim uppercase">Work & Academic</p>
              </div>
              <span className="watermark">N2</span>
            </div>
            <p className="body-md roadmap-card__desc">Primary target for professional needs and formal study in Japan.</p>
            <div className="roadmap-card__buttons">
              <button onClick={() => handleAction('N2', 'vocab')} className="action-btn-item">
                <span className="material-symbols-outlined">translate</span>
                <span>Kanji</span>
              </button>
              <button onClick={() => handleAction('N2', 'vocab')} className="action-btn-item">
                <span className="material-symbols-outlined">library_books</span>
                <span>Vocab</span>
              </button>
              <button onClick={() => handleAction('N2', 'flashcard')} className="action-btn-item action-btn-item--highlight">
                <span className="material-symbols-outlined">style</span>
                <span>SRS Flashcard</span>
              </button>
            </div>
          </div>

          {/* N1 Card */}
          <div className="glass-panel roadmap-card roadmap-card--n1 washi-texture neo-lift animate-fade-in-up delay-5">
            <div className="roadmap-card__header">
              <div>
                <span className="badge-phase badge-phase--n1">Phase 5</span>
                <h3 className="headline-md">N1</h3>
                <p className="label-sm text-dim uppercase">Advanced Expertise</p>
              </div>
              <span className="watermark">N1</span>
            </div>
            <p className="body-md roadmap-card__desc">Peak JLPT competence for abstract text and complex nuance.</p>
            <div className="roadmap-card__buttons">
              <button onClick={() => handleAction('N1', 'vocab')} className="action-btn-item">
                <span className="material-symbols-outlined">translate</span>
                <span>Kanji</span>
              </button>
              <button onClick={() => handleAction('N1', 'vocab')} className="action-btn-item">
                <span className="material-symbols-outlined">library_books</span>
                <span>Vocab</span>
              </button>
              <button onClick={() => handleAction('N1', 'flashcard')} className="action-btn-item action-btn-item--highlight">
                <span className="material-symbols-outlined">style</span>
                <span>SRS Flashcard</span>
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
