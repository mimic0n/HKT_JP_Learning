import React, { useState, useMemo } from 'react';
import './VocabTable.css';

const JLPT_ORDER = { N5: 1, N4: 2, N3: 3, N2: 4, N1: 5 };

export default function VocabTable({ items, onEdit, onDelete }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(15);
  const [sortBy, setSortBy] = useState('id'); // 'id' | 'word' | 'level' | 'interval' | 'reps'
  const [sortDirection, setSortDirection] = useState('asc'); // 'asc' | 'desc'
  const [playingId, setPlayingId] = useState(null);

  // Audio pronunciation
  const playAudio = (text, id, e) => {
    if (e) e.stopPropagation();
    if (!('speechSynthesis' in window)) return;

    try {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'ja-JP';
      utterance.rate = 0.9;

      utterance.onstart = () => setPlayingId(id);
      utterance.onend = () => setPlayingId(null);
      utterance.onerror = () => setPlayingId(null);

      window.speechSynthesis.speak(utterance);
    } catch (err) {
      console.warn('TTS playback error:', err);
      setPlayingId(null);
    }
  };

  // Handle column header sort toggle
  const handleSort = (column) => {
    if (sortBy === column) {
      setSortDirection((prev) => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortBy(column);
      setSortDirection('asc');
    }
    setCurrentPage(1);
  };

  // Sort and paginate items
  const sortedItems = useMemo(() => {
    if (!items || items.length === 0) return [];
    const list = [...items];

    list.sort((a, b) => {
      let comparison = 0;
      switch (sortBy) {
        case 'word': {
          const wordA = (a.kanji || a.kana || '').toLowerCase();
          const wordB = (b.kanji || b.kana || '').toLowerCase();
          comparison = wordA.localeCompare(wordB, 'ja');
          break;
        }
        case 'meaning': {
          comparison = (a.meaning || '').localeCompare(b.meaning || '');
          break;
        }
        case 'level': {
          const lvlA = JLPT_ORDER[a.jlpt_level] || 0;
          const lvlB = JLPT_ORDER[b.jlpt_level] || 0;
          comparison = lvlA - lvlB;
          break;
        }
        case 'interval': {
          const intA = Number(a.interval_days || 0);
          const intB = Number(b.interval_days || 0);
          comparison = intA - intB;
          break;
        }
        case 'reps': {
          const repsA = Number(a.repetitions || 0);
          const repsB = Number(b.repetitions || 0);
          comparison = repsA - repsB;
          break;
        }
        default: {
          comparison = Number(a.id || 0) - Number(b.id || 0);
        }
      }
      return sortDirection === 'asc' ? comparison : -comparison;
    });

    return list;
  }, [items, sortBy, sortDirection]);

  // Pagination calculation
  const totalItems = sortedItems.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
  const validCurrentPage = Math.min(currentPage, totalPages);
  const startIdx = (validCurrentPage - 1) * pageSize;
  const paginatedItems = sortedItems.slice(startIdx, startIdx + pageSize);

  if (!items || items.length === 0) {
    return (
      <div className="vocab-empty glass-panel washi-texture neo-lift">
        <span className="material-symbols-outlined icon-pink empty-icon">search_off</span>
        <h3 className="headline-md">No vocabulary found</h3>
        <p className="body-md text-dim">
          Try adjusting your search query, clearing level filters, or click <strong>Add Vocabulary</strong> to create a new word!
        </p>
      </div>
    );
  }

  const renderSortIndicator = (column) => {
    if (sortBy !== column) {
      return <span className="sort-icon sort-icon--inactive">⇅</span>;
    }
    return <span className="sort-icon sort-icon--active">{sortDirection === 'asc' ? '▲' : '▼'}</span>;
  };

  return (
    <div className="vocab-table-wrapper">
      <div className="vocab-table-container glass-panel washi-texture">
        <table className="vocab-table" role="table" aria-label="Vocabulary and Kanji Management Table">
          <thead>
            <tr>
              <th scope="col" onClick={() => handleSort('word')} className="sortable-th">
                <div className="th-content">
                  <span>Kanji / Kana</span>
                  {renderSortIndicator('word')}
                </div>
              </th>

              <th scope="col" onClick={() => handleSort('meaning')} className="sortable-th">
                <div className="th-content">
                  <span>Meaning & Context</span>
                  {renderSortIndicator('meaning')}
                </div>
              </th>

              <th scope="col" onClick={() => handleSort('level')} className="sortable-th">
                <div className="th-content">
                  <span>Level</span>
                  {renderSortIndicator('level')}
                </div>
              </th>

              <th scope="col" onClick={() => handleSort('reps')} className="sortable-th">
                <div className="th-content">
                  <span>SRS Progress</span>
                  {renderSortIndicator('reps')}
                </div>
              </th>

              <th scope="col" onClick={() => handleSort('interval')} className="sortable-th">
                <div className="th-content">
                  <span>Interval</span>
                  {renderSortIndicator('interval')}
                </div>
              </th>

              <th scope="col" className="th-actions">
                <span>Actions</span>
              </th>
            </tr>
          </thead>

          <tbody>
            {paginatedItems.map((item) => {
              const intervalDays = item.interval_days || 0;
              const isMastered = intervalDays > 21;
              const isLearning = intervalDays > 0 && intervalDays <= 21;
              const isPlaying = playingId === item.id;
              const tags = item.tags ? item.tags.split(',').map((t) => t.trim()).filter(Boolean) : [];

              return (
                <tr key={item.id} className="vocab-row">
                  {/* Kanji & Kana */}
                  <td>
                    <div className="vocab-word">
                      <div className="vocab-word__headline">
                        <span className="vocab-kanji">{item.kanji || item.kana}</span>
                        <button 
                          className={`row-audio-btn ${isPlaying ? 'row-audio-btn--playing' : ''}`}
                          onClick={(e) => playAudio(item.kanji || item.kana, item.id, e)}
                          title={`Pronounce ${item.kanji || item.kana}`}
                          aria-label={`Pronounce ${item.kanji || item.kana}`}
                        >
                          <span className="material-symbols-outlined audio-icon">
                            {isPlaying ? 'graphic_eq' : 'volume_up'}
                          </span>
                        </button>
                      </div>

                      {item.kanji && (
                        <span className="vocab-reading" title="Hiragana / Katakana reading">
                          {item.kana}
                        </span>
                      )}

                      {item.romaji && (
                        <span className="vocab-romaji">[{item.romaji}]</span>
                      )}
                    </div>
                  </td>

                  {/* Meaning & Example */}
                  <td>
                    <div className="vocab-meaning">
                      <span className="meaning-text">{item.meaning}</span>
                      {item.example_sentence && (
                        <span className="example-text" title="Example sentence">
                          &ldquo;{item.example_sentence}&rdquo;
                        </span>
                      )}
                      {tags.length > 0 && (
                        <div className="table-tags">
                          {tags.slice(0, 2).map((t, idx) => (
                            <span key={idx} className="table-tag-pill">{t}</span>
                          ))}
                        </div>
                      )}
                    </div>
                  </td>

                  {/* JLPT Level */}
                  <td>
                    <span className={`badge badge--${(item.jlpt_level || 'n5').toLowerCase()}`}>
                      {item.jlpt_level || 'N5'}
                    </span>
                  </td>

                  {/* SRS Status */}
                  <td>
                    <div className="srs-status-cell">
                      {isMastered ? (
                        <span className="srs-stage-badge srs-stage-badge--mastered">
                          ✓ Mastered
                        </span>
                      ) : isLearning ? (
                        <span className="srs-stage-badge srs-stage-badge--learning">
                          ⚡ Learning
                        </span>
                      ) : (
                        <span className="srs-stage-badge srs-stage-badge--new">
                          ○ New Word
                        </span>
                      )}
                      <div className="srs-sub-metrics">
                        <span>Reps: <strong>{item.repetitions || 0}</strong></span>
                        <span>EF: <strong>{Number(item.ease_factor || 2.5).toFixed(2)}</strong></span>
                      </div>
                    </div>
                  </td>

                  {/* Interval */}
                  <td>
                    <span className="interval-tag">
                      {intervalDays} {intervalDays === 1 ? 'day' : 'days'}
                    </span>
                  </td>

                  {/* Action Buttons */}
                  <td>
                    <div className="action-buttons">
                      <button 
                        className="action-btn action-btn--edit" 
                        onClick={() => onEdit(item)}
                        title={`Edit ${item.kanji || item.kana}`}
                        aria-label={`Edit ${item.kanji || item.kana}`}
                      >
                        <span className="material-symbols-outlined">edit</span>
                      </button>

                      <button 
                        className="action-btn action-btn--delete" 
                        onClick={() => onDelete(item.id)}
                        title={`Delete ${item.kanji || item.kana}`}
                        aria-label={`Delete ${item.kanji || item.kana}`}
                      >
                        <span className="material-symbols-outlined">delete</span>
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Pagination & Status Footer Bar */}
      <div className="table-pagination-bar glass-panel">
        <div className="pagination-info">
          <span>
            Showing <strong>{startIdx + 1}</strong>–<strong>{Math.min(startIdx + pageSize, totalItems)}</strong> of <strong>{totalItems}</strong> entries
          </span>

          <div className="page-size-selector">
            <label htmlFor="pageSizeSelect" className="page-size-label">Rows:</label>
            <select
              id="pageSizeSelect"
              className="page-size-select neo-inset"
              value={pageSize}
              onChange={(e) => {
                setPageSize(Number(e.target.value));
                setCurrentPage(1);
              }}
            >
              <option value={10}>10</option>
              <option value={15}>15</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
            </select>
          </div>
        </div>

        {/* Page Nav Buttons */}
        <div className="pagination-controls">
          <button 
            className="pagination-btn neo-lift"
            disabled={validCurrentPage <= 1}
            onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
            aria-label="Previous Page"
          >
            <span className="material-symbols-outlined">chevron_left</span>
            <span>Prev</span>
          </button>

          <div className="pagination-pages">
            {Array.from({ length: totalPages }, (_, i) => i + 1)
              .filter((p) => p === 1 || p === totalPages || Math.abs(p - validCurrentPage) <= 1)
              .map((p, idx, arr) => {
                const prev = arr[idx - 1];
                const showEllipsis = prev && p - prev > 1;
                return (
                  <React.Fragment key={p}>
                    {showEllipsis && <span className="pagination-ellipsis">&hellip;</span>}
                    <button 
                      className={`pagination-page-btn ${validCurrentPage === p ? 'pagination-page-btn--active' : ''}`}
                      onClick={() => setCurrentPage(p)}
                      aria-label={`Go to page ${p}`}
                      aria-current={validCurrentPage === p ? 'page' : undefined}
                    >
                      {p}
                    </button>
                  </React.Fragment>
                );
              })}
          </div>

          <button 
            className="pagination-btn neo-lift"
            disabled={validCurrentPage >= totalPages}
            onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
            aria-label="Next Page"
          >
            <span>Next</span>
            <span className="material-symbols-outlined">chevron_right</span>
          </button>
        </div>
      </div>
    </div>
  );
}
