import React, { useState, useEffect, useCallback } from 'react';
import './Flashcard.css';

export default function Flashcard({ card, onScore }) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  // Reset flipped state when card changes
  useEffect(() => {
    setIsFlipped(false);
  }, [card?.id]);

  // Audio pronunciation via Web Speech Synthesis
  const playAudio = useCallback((text, e) => {
    if (e) {
      e.stopPropagation();
    }
    if (!('speechSynthesis' in window)) return;

    try {
      window.speechSynthesis.cancel();
      const textToSpeak = text || card?.kanji || card?.kana;
      if (!textToSpeak) return;

      const utterance = new SpeechSynthesisUtterance(textToSpeak);
      utterance.lang = 'ja-JP';
      utterance.rate = 0.9;

      utterance.onstart = () => setIsPlayingAudio(true);
      utterance.onend = () => setIsPlayingAudio(false);
      utterance.onerror = () => setIsPlayingAudio(false);

      window.speechSynthesis.speak(utterance);
    } catch (err) {
      console.warn('Speech synthesis error:', err);
      setIsPlayingAudio(false);
    }
  }, [card]);

  const handleScore = useCallback((score) => {
    setIsFlipped(false);
    onScore(card.id, score);
  }, [card, onScore]);

  // Keyboard navigation suite
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Don't trigger shortcuts if typing inside an input or form element
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes(e.target.tagName)) return;

      if (e.code === 'Space' || e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        setIsFlipped((prev) => !prev);
      } else if (e.key === 'a' || e.key === 'A') {
        e.preventDefault();
        playAudio();
      } else if (isFlipped) {
        if (e.key === '1') {
          e.preventDefault();
          handleScore(0);
        } else if (e.key === '2') {
          e.preventDefault();
          handleScore(3);
        } else if (e.key === '3') {
          e.preventDefault();
          handleScore(4);
        } else if (e.key === '4') {
          e.preventDefault();
          handleScore(5);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isFlipped, handleScore, playAudio]);

  if (!card) return null;

  const tagsList = card.tags ? card.tags.split(',').map((t) => t.trim()).filter(Boolean) : [];

  return (
    <div className="flashcard-wrapper">
      <div 
        className={`flashcard ${isFlipped ? 'flashcard--flipped' : ''}`}
        onClick={() => setIsFlipped(!isFlipped)}
        role="button"
        tabIndex={0}
        aria-label={`Flashcard: ${card.kanji || card.kana}. Press Space or click to flip.`}
        aria-pressed={isFlipped}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            setIsFlipped(!isFlipped);
          }
        }}
      >
        <div className="flashcard__inner">
          {/* Front Face */}
          <div className="flashcard__face flashcard__face--front washi-texture">
            <div className="flashcard__top">
              <div className="flashcard__top-left">
                <span className={`badge badge--${(card.jlpt_level || 'n5').toLowerCase()}`}>
                  {card.jlpt_level || 'N5'}
                </span>
                {card.source && (
                  <span className="flashcard__source-tag">
                    {card.source === 'manual' ? 'Custom' : 'JLPT Core'}
                  </span>
                )}
              </div>

              <div className="flashcard__top-right">
                <button 
                  className={`flashcard__audio-btn ${isPlayingAudio ? 'flashcard__audio-btn--playing' : ''}`}
                  onClick={(e) => playAudio(card.kanji || card.kana, e)}
                  title="Pronounce Japanese (Shortcut: A)"
                  aria-label="Listen to pronunciation"
                >
                  <span className="material-symbols-outlined">
                    {isPlayingAudio ? 'graphic_eq' : 'volume_up'}
                  </span>
                </button>
                <span className="flashcard__hint">
                  Flip <kbd className="kbd-badge">Space</kbd>
                </span>
              </div>
            </div>

            <div className="flashcard__main">
              {card.kanji ? (
                <>
                  <div className="flashcard__kanji">{card.kanji}</div>
                  <div className="flashcard__kana">{card.kana}</div>
                </>
              ) : (
                <div className="flashcard__kanji">{card.kana}</div>
              )}
            </div>

            <div className="flashcard__footer">
              {card.romaji ? (
                <span className="flashcard__romaji">[{card.romaji}]</span>
              ) : (
                <span></span>
              )}
              {tagsList.length > 0 && (
                <div className="flashcard__tags">
                  {tagsList.slice(0, 2).map((tag, idx) => (
                    <span key={idx} className="flashcard__tag-item">{tag}</span>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Back Face */}
          <div className="flashcard__face flashcard__face--back washi-texture">
            <div className="flashcard__top">
              <div className="flashcard__top-left">
                <span className="label-caps icon-pink">DEFINITION & CONTEXT</span>
              </div>

              <div className="flashcard__top-right">
                <button 
                  className={`flashcard__audio-btn ${isPlayingAudio ? 'flashcard__audio-btn--playing' : ''}`}
                  onClick={(e) => playAudio(card.kanji || card.kana, e)}
                  title="Pronounce Japanese (Shortcut: A)"
                  aria-label="Listen to pronunciation"
                >
                  <span className="material-symbols-outlined">
                    {isPlayingAudio ? 'graphic_eq' : 'volume_up'}
                  </span>
                </button>
                <span className="flashcard__hint">
                  Flip <kbd className="kbd-badge">Space</kbd>
                </span>
              </div>
            </div>

            <div className="flashcard__back-content">
              <h2 className="flashcard__meaning">{card.meaning}</h2>

              {card.example_sentence && (
                <div className="flashcard__example">
                  <div className="flashcard__example-header">
                    <span className="label-sm icon-pink">Example:</span>
                    <button 
                      className="example-audio-btn"
                      onClick={(e) => playAudio(card.example_sentence, e)}
                      title="Read example sentence"
                      aria-label="Listen to example sentence"
                    >
                      <span className="material-symbols-outlined example-audio-icon">volume_up</span>
                    </button>
                  </div>
                  <p className="flashcard__example-text">{card.example_sentence}</p>
                </div>
              )}
            </div>

            <div className="flashcard__meta">
              <div className="flashcard__meta-item">
                <span className="meta-label">Interval:</span>
                <strong>{card.interval_days || 0}d</strong>
              </div>
              <div className="flashcard__meta-item">
                <span className="meta-label">Ease:</span>
                <strong>{Number(card.ease_factor || 2.5).toFixed(2)}</strong>
              </div>
              <div className="flashcard__meta-item">
                <span className="meta-label">Reps:</span>
                <strong>{card.repetitions || 0}</strong>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Answer Quality Buttons */}
      <div className="flashcard__actions">
        {!isFlipped ? (
          <button 
            className="flashcard__flip-btn neo-lift"
            onClick={() => setIsFlipped(true)}
            aria-label="Show Answer"
          >
            <span>Show Answer</span>
            <kbd className="kbd-badge kbd-badge--primary">Space</kbd>
          </button>
        ) : (
          <div className="flashcard__scores">
            <button 
              className="flashcard__btn flashcard__btn--again neo-lift"
              onClick={() => handleScore(0)}
              title="Forgot completely (Interval resets to 1 day)"
            >
              <div className="btn-label-group">
                <span className="btn-title">Again (1d)</span>
                <kbd className="kbd-badge kbd-badge--dark">1</kbd>
              </div>
            </button>

            <button 
              className="flashcard__btn flashcard__btn--hard neo-lift"
              onClick={() => handleScore(3)}
              title="Remembered with difficulty"
            >
              <div className="btn-label-group">
                <span className="btn-title">Hard</span>
                <kbd className="kbd-badge kbd-badge--dark">2</kbd>
              </div>
            </button>

            <button 
              className="flashcard__btn flashcard__btn--good neo-lift"
              onClick={() => handleScore(4)}
              title="Normal recall"
            >
              <div className="btn-label-group">
                <span className="btn-title">Good</span>
                <kbd className="kbd-badge kbd-badge--dark">3</kbd>
              </div>
            </button>

            <button 
              className="flashcard__btn flashcard__btn--easy neo-lift"
              onClick={() => handleScore(5)}
              title="Effortless recall"
            >
              <div className="btn-label-group">
                <span className="btn-title">Easy</span>
                <kbd className="kbd-badge kbd-badge--dark">4</kbd>
              </div>
            </button>
          </div>
        )}
      </div>

      {/* Keyboard Shortcuts Hint Legend */}
      <div className="flashcard__shortcuts-legend">
        <span className="legend-icon">⌨️</span>
        <span className="legend-text">
          Shortcuts: <kbd className="kbd-mini">Space</kbd> Flip &bull; <kbd className="kbd-mini">1</kbd> Again &bull; <kbd className="kbd-mini">2</kbd> Hard &bull; <kbd className="kbd-mini">3</kbd> Good &bull; <kbd className="kbd-mini">4</kbd> Easy &bull; <kbd className="kbd-mini">A</kbd> Audio
        </span>
      </div>
    </div>
  );
}
