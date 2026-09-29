import express from 'express';
import db from '../db/connection.js';

const router = express.Router();

// GET /api/vocabulary
router.get('/', (req, res) => {
  try {
    const { level, search, limit = 100, offset = 0 } = req.query;

    let query = `
      SELECT v.*, r.ease_factor, r.interval_days, r.repetitions, r.due_date, r.last_reviewed_at
      FROM vocabulary v
      LEFT JOIN review_state r ON v.id = r.vocabulary_id
      WHERE 1=1
    `;
    const params = [];

    if (level && level !== 'ALL') {
      query += ` AND v.jlpt_level = ?`;
      params.push(level);
    }

    if (search) {
      query += ` AND (v.kanji LIKE ? OR v.kana LIKE ? OR v.romaji LIKE ? OR v.meaning LIKE ?)`;
      const term = `%${search}%`;
      params.push(term, term, term, term);
    }

    query += ` ORDER BY v.id DESC LIMIT ? OFFSET ?`;
    params.push(Number(limit), Number(offset));

    const rows = db.prepare(query).all(...params);

    // Get total count
    let countQuery = `SELECT COUNT(*) as count FROM vocabulary WHERE 1=1`;
    const countParams = [];
    if (level && level !== 'ALL') {
      countQuery += ` AND jlpt_level = ?`;
      countParams.push(level);
    }
    if (search) {
      countQuery += ` AND (kanji LIKE ? OR kana LIKE ? OR romaji LIKE ? OR meaning LIKE ?)`;
      const term = `%${search}%`;
      countParams.push(term, term, term, term);
    }
    const { count } = db.prepare(countQuery).get(...countParams);

    res.json({ success: true, data: rows, total: count });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// POST /api/vocabulary
router.post('/', (req, res) => {
  try {
    const { kanji, kana, romaji, meaning, example_sentence, jlpt_level = 'N5', tags } = req.body;

    if (!kana || !meaning) {
      return res.status(400).json({ success: false, error: 'Kana and Meaning are required fields' });
    }

    const insertStmt = db.prepare(`
      INSERT INTO vocabulary (kanji, kana, romaji, meaning, example_sentence, jlpt_level, tags, source)
      VALUES (?, ?, ?, ?, ?, ?, ?, 'manual')
    `);

    const result = insertStmt.run(kanji || null, kana, romaji || null, meaning, example_sentence || null, jlpt_level, tags || null);
    const vocabId = result.lastInsertRowid;

    // Create corresponding review_state
    db.prepare(`
      INSERT INTO review_state (vocabulary_id, ease_factor, interval_days, repetitions, due_date)
      VALUES (?, 2.5, 0, 0, datetime('now'))
    `).run(vocabId);

    const newRow = db.prepare(`
      SELECT v.*, r.ease_factor, r.interval_days, r.repetitions, r.due_date, r.last_reviewed_at
      FROM vocabulary v
      LEFT JOIN review_state r ON v.id = r.vocabulary_id
      WHERE v.id = ?
    `).get(vocabId);

    res.status(201).json({ success: true, data: newRow });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// PUT /api/vocabulary/:id
router.put('/:id', (req, res) => {
  try {
    const { id } = req.params;
    const { kanji, kana, romaji, meaning, example_sentence, jlpt_level, tags } = req.body;

    const existing = db.prepare(`SELECT * FROM vocabulary WHERE id = ?`).get(id);
    if (!existing) {
      return res.status(404).json({ success: false, error: 'Vocabulary item not found' });
    }

    db.prepare(`
      UPDATE vocabulary
      SET kanji = ?, kana = ?, romaji = ?, meaning = ?, example_sentence = ?, jlpt_level = ?, tags = ?
      WHERE id = ?
    `).run(
      kanji !== undefined ? kanji : existing.kanji,
      kana !== undefined ? kana : existing.kana,
      romaji !== undefined ? romaji : existing.romaji,
      meaning !== undefined ? meaning : existing.meaning,
      example_sentence !== undefined ? example_sentence : existing.example_sentence,
      jlpt_level !== undefined ? jlpt_level : existing.jlpt_level,
      tags !== undefined ? tags : existing.tags,
      id
    );

    const updated = db.prepare(`
      SELECT v.*, r.ease_factor, r.interval_days, r.repetitions, r.due_date, r.last_reviewed_at
      FROM vocabulary v
      LEFT JOIN review_state r ON v.id = r.vocabulary_id
      WHERE v.id = ?
    `).get(id);

    res.json({ success: true, data: updated });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// DELETE /api/vocabulary/:id
router.delete('/:id', (req, res) => {
  try {
    const { id } = req.params;
    const existing = db.prepare(`SELECT * FROM vocabulary WHERE id = ?`).get(id);
    if (!existing) {
      return res.status(404).json({ success: false, error: 'Vocabulary item not found' });
    }

    db.prepare(`DELETE FROM vocabulary WHERE id = ?`).run(id);
    res.json({ success: true, message: 'Deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

export default router;
