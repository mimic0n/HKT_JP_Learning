import React from 'react';
import { useNavigate } from 'react-router-dom';
import './QuickLinks.css';

export default function QuickLinks() {
  const navigate = useNavigate();

  return (
    <section className="quick-links">
      <div className="quick-links__grid">
        <div className="quick-link-card neo-lift" onClick={() => navigate('/manage')}>
          <div className="quick-link-card__bg-circle circle-1"></div>
          <div className="quick-link-card__inner glass-panel">
            <span className="material-symbols-outlined quick-link-icon">menu_book</span>
            <h3 className="headline-md">Vocabulary Manager</h3>
            <p className="body-md text-dim">Add, search, and organize custom Japanese words and Kanji items.</p>
          </div>
        </div>

        <div className="quick-link-card neo-lift" onClick={() => navigate('/practise')}>
          <div className="quick-link-card__bg-circle circle-2"></div>
          <div className="quick-link-card__inner glass-panel">
            <span className="material-symbols-outlined quick-link-icon">school</span>
            <span className="badge badge--n5 mb-2">SRS Practice</span>
            <h3 className="headline-md">Daily Review Session</h3>
            <p className="body-md text-dim">Review due cards based on spaced repetition memory curves.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
