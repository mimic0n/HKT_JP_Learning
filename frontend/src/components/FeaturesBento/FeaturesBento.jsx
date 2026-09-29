import React from 'react';
import { useNavigate } from 'react-router-dom';
import './FeaturesBento.css';

export default function FeaturesBento() {
  const navigate = useNavigate();

  return (
    <section className="features-section">
      <div className="features-header">
        <h2 className="headline-md">Core Features</h2>
      </div>

      <div className="features-grid">
        {/* Main Bento Card: Flashcard Review */}
        <div 
          className="feature-card feature-card--main washi-texture neo-lift"
          onClick={() => navigate('/practise')}
        >
          <div className="feature-card__content">
            <div className="feature-icon">
              <span className="material-symbols-outlined">style</span>
            </div>
            <h3 className="headline-md">Flashcard Review</h3>
            <p className="body-md feature-card__desc">
              Automatic spaced repetition algorithm dynamically schedules your review cards based on your recall accuracy.
            </p>
            <button className="feature-card__cta">Start Reviewing →</button>
          </div>
        </div>

        {/* Secondary Card 1: Kanji Dictionary */}
        <div 
          className="feature-card feature-card--secondary feature-card--dictionary neo-lift"
          onClick={() => navigate('/manage')}
        >
          <div className="feature-icon">
            <span className="material-symbols-outlined">translate</span>
          </div>
          <div>
            <h4 className="headline-md card-title-sm">Vocabulary & Kanji</h4>
            <p className="body-md text-dim">CRUD management, search, and JLPT level filters.</p>
          </div>
        </div>

        {/* Secondary Card 2: Kana Chart */}
        <div 
          className="feature-card feature-card--secondary feature-card--kana neo-lift"
          onClick={() => navigate('/kana')}
        >
          <div className="feature-icon">
            <span className="material-symbols-outlined">grid_view</span>
          </div>
          <div>
            <h4 className="headline-md card-title-sm">Kana Chart</h4>
            <p className="body-md text-dim">Interactive Hiragana & Katakana grid with romaji & stroke guides.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
