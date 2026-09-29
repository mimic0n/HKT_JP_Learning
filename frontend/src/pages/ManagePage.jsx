import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { api } from '../api/client';
import VocabTable from '../components/VocabTable/VocabTable';
import VocabModal from '../components/VocabModal/VocabModal';
import './ManagePage.css';

export default function ManagePage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const levelParam = searchParams.get('level') || 'ALL';

  const [vocabularies, setVocabularies] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeLevel, setActiveLevel] = useState(levelParam);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setActiveLevel(levelParam);
  }, [levelParam]);

  const loadData = async () => {
    setLoading(true);
    const res = await api.getVocabulary({
      level: activeLevel,
      search: searchQuery
    });
    if (res.ok) {
      setVocabularies(res.data.data || res.data || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, [activeLevel, searchQuery]);

  const handleLevelTab = (lvl) => {
    setActiveLevel(lvl);
    if (lvl === 'ALL') {
      searchParams.delete('level');
    } else {
      searchParams.set('level', lvl);
    }
    setSearchParams(searchParams);
  };

  const handleCreateOrUpdate = async (formData) => {
    if (editingItem) {
      const res = await api.updateVocabulary(editingItem.id, formData);
      if (res.ok) {
        setIsModalOpen(false);
        setEditingItem(null);
        loadData();
      } else {
        alert('Failed to update item: ' + res.error);
      }
    } else {
      const res = await api.createVocabulary(formData);
      if (res.ok) {
        setIsModalOpen(false);
        loadData();
      } else {
        alert('Failed to create item: ' + res.error);
      }
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this vocabulary item?')) return;
    const res = await api.deleteVocabulary(id);
    if (res.ok) {
      loadData();
    } else {
      alert('Failed to delete item: ' + res.error);
    }
  };

  return (
    <main className="manage-page page-container">
      {/* Header Banner */}
      <div className="manage-header">
        <div>
          <h1 className="headline-lg">Vocabulary Manager</h1>
          <p className="body-md text-dim">Add, search, edit, and organize Japanese words and Kanji.</p>
        </div>

        <button 
          className="add-vocab-btn neo-lift"
          onClick={() => { setEditingItem(null); setIsModalOpen(true); }}
        >
          <span className="material-symbols-outlined">add</span>
          <span>Add Vocabulary</span>
        </button>
      </div>

      {/* Filter & Search Bar */}
      <div className="manage-controls glass-panel">
        <div className="search-bar neo-inset">
          <span className="material-symbols-outlined search-icon">search</span>
          <input 
            type="text"
            placeholder="Search Kanji, Kana, Romaji, or Meaning..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="level-tabs">
          {['ALL', 'N5', 'N4', 'N3', 'N2', 'N1'].map((lvl) => (
            <button 
              key={lvl}
              className={`level-tab ${activeLevel === lvl ? 'level-tab--active' : ''}`}
              onClick={() => handleLevelTab(lvl)}
            >
              {lvl}
            </button>
          ))}
        </div>
      </div>

      {/* Vocab Table */}
      {loading ? (
        <div className="vocab-loading text-dim">Loading vocabulary data...</div>
      ) : (
        <VocabTable 
          items={vocabularies}
          onEdit={(item) => { setEditingItem(item); setIsModalOpen(true); }}
          onDelete={handleDelete}
        />
      )}

      {/* Create/Edit Modal */}
      <VocabModal 
        isOpen={isModalOpen}
        onClose={() => { setIsModalOpen(false); setEditingItem(null); }}
        onSubmit={handleCreateOrUpdate}
        initialData={editingItem}
      />
    </main>
  );
}
