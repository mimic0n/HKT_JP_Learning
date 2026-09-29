const API_BASE = '/api';

async function request(endpoint, options = {}) {
  try {
    const res = await fetch(`${API_BASE}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers
      },
      ...options
    });

    const data = await res.json();
    if (!res.ok || !data.success) {
      return { ok: false, error: data.error || `HTTP error ${res.status}` };
    }
    return { ok: true, data: data.data || data.stats || data };
  } catch (error) {
    return { ok: false, error: error.message };
  }
}

export const api = {
  // Vocabulary endpoints
  getVocabulary: (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return request(`/vocabulary?${query}`);
  },
  createVocabulary: (payload) => {
    return request('/vocabulary', {
      method: 'POST',
      body: JSON.stringify(payload)
    });
  },
  updateVocabulary: (id, payload) => {
    return request(`/vocabulary/${id}`, {
      method: 'PUT',
      body: JSON.stringify(payload)
    });
  },
  deleteVocabulary: (id) => {
    return request(`/vocabulary/${id}`, {
      method: 'DELETE'
    });
  },

  // Review (SRS) endpoints
  getReviewToday: (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return request(`/review/today?${query}`);
  },
  submitReview: (vocabularyId, quality) => {
    return request(`/review/${vocabularyId}`, {
      method: 'POST',
      body: JSON.stringify({ quality })
    });
  },

  // Stats
  getStats: () => {
    return request('/stats');
  },

  // Kana
  getKana: () => {
    return request('/kana');
  }
};
