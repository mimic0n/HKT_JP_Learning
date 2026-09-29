import express from 'express';
import db from '../db/connection.js';
import { calculateSM2 } from '../services/srs.service.js';

const router = express.Router();

// GET /api/review/today
router.get('/today', (req, res) => {
  try {
    const { level, limit = 50 } = req.query;

    let query = `
      SELECT v.*, r.id as review_id, r.ease_factor, r.interval_days, r.repetitions, r.due_date, r.last_reviewed_at
      FROM vocabulary v
      JOIN review_state r ON v.id = r.vocabulary_id
      WHERE datetime(r.due_date) <= datetime('now')
    `;
    const params = [];

    if (level && level !== 'ALL') {
      query += ` AND v.jlpt_level = ?`;
      params.push(level);
    }

    query += ` ORDER BY r.due_date ASC LIMIT ?`;
    params.push(Number(limit));

    const items = db.prepare(query).all(...params);

    res.json({ success: true, count: items.length, data: items });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// POST /api/review/:vocabulary_id
router.post('/:vocabulary_id', (req, res) => {
  try {
    const { vocabulary_id } = req.params;
    const { quality } = req.body; // 0: Again, 3: Hard, 4: Good, 5: Easy

    if (quality === undefined || quality === null) {
      return res.status(400).json({ success: false, error: 'Quality rating (0-5) is required' });
    }

    const reviewState = db.prepare(`SELECT * FROM review_state WHERE vocabulary_id = ?`).get(vocabulary_id);
    if (!reviewState) {
      return res.status(404).json({ success: false, error: 'Review state for vocabulary not found' });
    }

    const sm2Result = calculateSM2({
      quality,
      easeFactor: reviewState.ease_factor,
      intervalDays: reviewState.interval_days,
      repetitions: reviewState.repetitions
    });

    db.prepare(`
      UPDATE review_state
      SET ease_factor = ?, interval_days = ?, repetitions = ?, due_date = ?, last_reviewed_at = ?
      WHERE vocabulary_id = ?
    `).run(
      sm2Result.easeFactor,
      sm2Result.intervalDays,
      sm2Result.repetitions,
      sm2Result.dueDate,
      sm2Result.lastReviewedAt,
      vocabulary_id
    );

    const updatedRow = db.prepare(`
      SELECT v.*, r.ease_factor, r.interval_days, r.repetitions, r.due_date, r.last_reviewed_at
      FROM vocabulary v
      JOIN review_state r ON v.id = r.vocabulary_id
      WHERE v.id = ?
    `).get(vocabulary_id);

    res.json({
      success: true,
      message: 'Review updated successfully',
      srsResult: sm2Result,
      data: updatedRow
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

export default router;
