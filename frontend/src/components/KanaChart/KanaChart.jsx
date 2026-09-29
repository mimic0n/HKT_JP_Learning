import React, { useEffect, useState } from 'react';
import { api } from '../../api/client';
import './KanaChart.css';

export default function KanaChart() {
  const [kanaData, setKanaData] = useState({ hiragana: [], katakana: [] });
  const [script, setScript] = useState('hiragana'); // 'hiragana' | 'katakana'
  const [filterType, setFilterType] = useState('all'); // 'all' | 'basic' | 'dakuten' | 'yoon'
  const [selectedKana, setSelectedKana] = useState(null);

  useEffect(() => {
    async function loadKana() {
      const res = await api.getKana();
      if (res.ok) {
        setKanaData(res.data.data || res.data);
      }
    }
    loadKana();
  }, []);

  const currentList = (kanaData[script] || []).filter((item) => {
    if (filterType === 'all') return true;
    return item.type === filterType;
  });

  return (
    <div className="kana-container">
      <div className="kana-header">
        <div className="kana-header__text">
          <h1 className="headline-lg">Interactive Kana Chart</h1>
          <p className="body-md text-dim">
            Master fundamental Hiragana and Katakana character sets with romaji pronunciation guides.
          </p>
        </div>

        {/* Script Switcher */}
        <div className="kana-tabs neo-lift">
          <button 
            className={`kana-tab ${script === 'hiragana' ? 'kana-tab--active' : ''}`}
            onClick={() => setScript('hiragana')}
          >
            Hiragana (ひらがな)
          </button>
          <button 
            className={`kana-tab ${script === 'katakana' ? 'kana-tab--active' : ''}`}
            onClick={() => setScript('katakana')}
          >
            Katakana (カタカナ)
          </button>
        </div>
      </div>

      {/* Filter Pills */}
      <div className="kana-filters">
        <button 
          className={`filter-pill ${filterType === 'all' ? 'filter-pill--active' : ''}`}
          onClick={() => setFilterType('all')}
        >
          All Characters
        </button>
        <button 
          className={`filter-pill ${filterType === 'basic' ? 'filter-pill--active' : ''}`}
          onClick={() => setFilterType('basic')}
        >
          Basic (Seion)
        </button>
        <button 
          className={`filter-pill ${filterType === 'dakuten' ? 'filter-pill--active' : ''}`}
          onClick={() => setFilterType('dakuten')}
        >
          Voiced (Dakuten)
        </button>
        <button 
          className={`filter-pill ${filterType === 'yoon' ? 'filter-pill--active' : ''}`}
          onClick={() => setFilterType('yoon')}
        >
          Contracted (Yōon)
        </button>
      </div>

      {/* Skeuomorphic Board Grid */}
      <div className="kana-chart washi-texture glass-panel">
        <div className="kana-chart__grid">
          {currentList.map((item, index) => (
            <div 
              key={index} 
              className={`kana-cell ${!item.kana ? 'kana-cell--empty' : ''}`}
              onClick={() => item.kana && setSelectedKana(item)}
            >
              {item.kana && (
                <>
                  <span className="kana-cell__char">{item.kana}</span>
                  <span className="kana-cell__romaji">{item.romaji}</span>
                </>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Detail Modal */}
      {selectedKana && (
        <div className="kana-modal-backdrop" onClick={() => setSelectedKana(null)}>
          <div className="kana-modal glass-panel washi-texture neo-lift" onClick={(e) => e.stopPropagation()}>
            <button className="kana-modal__close" onClick={() => setSelectedKana(null)}>✕</button>
            <div className="kana-modal__char">{selectedKana.kana}</div>
            <div className="kana-modal__romaji">[{selectedKana.romaji}]</div>
            <div className="kana-modal__info">
              <span className="badge badge--n5">Type: {selectedKana.type}</span>
              <span className="badge badge--n4">Row: {selectedKana.row.toUpperCase()}</span>
            </div>
            <p className="body-md text-center text-dim mt-2">
              Pronounced as <strong>"{selectedKana.romaji}"</strong> in English phonetics.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
