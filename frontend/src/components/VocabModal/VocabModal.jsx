import React, { useState, useEffect } from 'react';
import './VocabModal.css';

export default function VocabModal({ isOpen, onClose, onSubmit, initialData }) {
  const [formData, setFormData] = useState({
    kanji: '',
    kana: '',
    romaji: '',
    meaning: '',
    example_sentence: '',
    jlpt_level: 'N5',
    tags: ''
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        kanji: initialData.kanji || '',
        kana: initialData.kana || '',
        romaji: initialData.romaji || '',
        meaning: initialData.meaning || '',
        example_sentence: initialData.example_sentence || '',
        jlpt_level: initialData.jlpt_level || 'N5',
        tags: initialData.tags || ''
      });
    } else {
      setFormData({
        kanji: '',
        kana: '',
        romaji: '',
        meaning: '',
        example_sentence: '',
        jlpt_level: 'N5',
        tags: ''
      });
    }
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.kana || !formData.meaning) {
      alert('Kana reading and Meaning are required.');
      return;
    }
    onSubmit(formData);
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="vocab-modal glass-panel washi-texture neo-lift" onClick={(e) => e.stopPropagation()}>
        <div className="vocab-modal__header">
          <h2 className="headline-md">{initialData ? 'Edit Vocabulary' : 'Add New Vocabulary'}</h2>
          <button className="vocab-modal__close" onClick={onClose}>✕</button>
        </div>

        <form onSubmit={handleSubmit} className="vocab-form">
          <div className="form-group">
            <label className="label-caps">Kanji (optional)</label>
            <input 
              className="neo-inset input-field"
              type="text"
              placeholder="e.g. 桜"
              value={formData.kanji}
              onChange={(e) => setFormData({ ...formData, kanji: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label className="label-caps">Kana Reading *</label>
            <input 
              className="neo-inset input-field"
              type="text"
              placeholder="e.g. さくら"
              value={formData.kana}
              onChange={(e) => setFormData({ ...formData, kana: e.target.value })}
              required
            />
          </div>

          <div className="form-group">
            <label className="label-caps">Romaji</label>
            <input 
              className="neo-inset input-field"
              type="text"
              placeholder="e.g. sakura"
              value={formData.romaji}
              onChange={(e) => setFormData({ ...formData, romaji: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label className="label-caps">Meaning *</label>
            <input 
              className="neo-inset input-field"
              type="text"
              placeholder="e.g. Cherry Blossom"
              value={formData.meaning}
              onChange={(e) => setFormData({ ...formData, meaning: e.target.value })}
              required
            />
          </div>

          <div className="form-group">
            <label className="label-caps">Example Sentence</label>
            <textarea 
              className="neo-inset input-field textarea-field"
              placeholder="e.g. 桜の花が咲きました。"
              value={formData.example_sentence}
              onChange={(e) => setFormData({ ...formData, example_sentence: e.target.value })}
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="label-caps">JLPT Level</label>
              <select 
                className="neo-inset select-field"
                value={formData.jlpt_level}
                onChange={(e) => setFormData({ ...formData, jlpt_level: e.target.value })}
              >
                <option value="N5">N5</option>
                <option value="N4">N4</option>
                <option value="N3">N3</option>
                <option value="N2">N2</option>
                <option value="N1">N1</option>
              </select>
            </div>

            <div className="form-group">
              <label className="label-caps">Tags</label>
              <input 
                className="neo-inset input-field"
                type="text"
                placeholder="e.g. Noun, Nature"
                value={formData.tags}
                onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
              />
            </div>
          </div>

          <div className="form-actions">
            <button type="button" className="btn-cancel" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn-submit neo-lift">Save Item</button>
          </div>
        </form>
      </div>
    </div>
  );
}
