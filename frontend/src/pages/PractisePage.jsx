import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { api } from '../api/client';
import Flashcard from '../components/Flashcard/Flashcard';
import './PractisePage.css';

export default function PractisePage() {
  const [searchParams] = useSearchParams();
  const levelParam = searchParams.get('level') || 'ALL';
  const navigate = useNavigate();

  const [queue, setQueue] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [reviewedCount, setReviewedCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [sessionCompleted, setSessionCompleted] = useState(false);
  const [activeLevel, setActiveLevel] = useState(levelParam);

  const loadReviewQueue = async () => {
    setLoading(true);
    setSessionCompleted(false);
    setCurrentIndex(0);
    setReviewedCount(0);

    const res = await api.getReviewToday({ level: activeLevel });
    if (res.ok) {
      const items = res.data.data || res.data || [];
      setQueue(items);
      if (items.length === 0) {
        setSessionCompleted(true);
      }
    }
    setLoading(false);
  };

  useEffect(() => {
    loadReviewQueue();
  }, [activeLevel]);

  const handleScore = async (cardId, quality) => {
    await api.submitReview(cardId, quality);
    setReviewedCount((prev) => prev + 1);

    if (currentIndex + 1 < queue.length) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setSessionCompleted(true);
    }
  };

  const currentCard = queue[currentIndex];
  const totalCards = queue.length;
  const progressPercent = totalCards > 0 ? Math.round((reviewedCount / totalCards) * 100) : 100;

  return (
    <main className="practise-page page-container">
      <div className="practise-header">
        <div>
          <h1 className="headline-lg">Daily Review Session</h1>
          <p className="body-md text-dim">Review due cards with spaced repetition.</p>
        </div>

        {/* Level selector */}
        <div className="level-tabs">
          {['ALL', 'N5', 'N4', 'N3', 'N2', 'N1'].map((lvl) => (
            <button
              key={lvl}
              className={`level-tab ${activeLevel === lvl ? 'level-tab--active' : ''}`}
              onClick={() => setActiveLevel(lvl)}
            >
              {lvl}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="practise-loading">
          <div className="loading-shimmer glass-panel" style={{width: '100%', maxWidth: '540px', height: '48px', margin: '0 auto 24px', borderRadius: 'var(--rounded-lg)'}} />
          <div className="loading-shimmer glass-panel" style={{width: '100%', maxWidth: '540px', height: '350px', margin: '0 auto', borderRadius: 'var(--rounded-xl)'}} />
        </div>
      ) : sessionCompleted ? (
        <div className="session-complete glass-panel washi-texture neo-lift">
          <span className="material-symbols-outlined icon-pink complete-icon">verified_user</span>
          <h2 className="headline-lg">Session Complete</h2>
          <p className="body-lg text-dim">
            You've reviewed all <strong>{reviewedCount}</strong> cards due for this session. Great job keeping your memory curve sharp!
          </p>
          <div className="complete-actions">
            <button className="complete-btn neo-lift" onClick={loadReviewQueue}>
              Refresh Due Queue
            </button>
            <button className="complete-btn complete-btn--alt neo-lift" onClick={() => navigate('/manage')}>
              Manage Words
            </button>
          </div>
        </div>
      ) : (
        <div className="session-content">
          {/* Progress bar */}
          <div className="progress-card glass-panel">
            <div className="progress-info">
              <span>Card {currentIndex + 1} of {totalCards}</span>
              <span className="label-caps icon-pink">{progressPercent}% Completed</span>
            </div>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: `${progressPercent}%` }}></div>
            </div>
          </div>

          {/* Flashcard */}
          <Flashcard card={currentCard} onScore={handleScore} />
        </div>
      )}
    </main>
  );
}
