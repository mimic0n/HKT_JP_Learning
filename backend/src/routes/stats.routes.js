import express from 'express';
import db from '../db/connection.js';

const router = express.Router();

// GET /api/stats
router.get('/', (req, res) => {
  try {
    const totalWords = db.prepare(`SELECT COUNT(*) as count FROM vocabulary`).get().count;
    const dueToday = db.prepare(`SELECT COUNT(*) as count FROM review_state WHERE datetime(due_date) <= datetime('now')`).get().count;
    const mastered = db.prepare(`SELECT COUNT(*) as count FROM review_state WHERE interval_days > 21`).get().count;
    const learning = db.prepare(`SELECT COUNT(*) as count FROM review_state WHERE interval_days <= 21 AND repetitions > 0`).get().count;
    const newWords = db.prepare(`SELECT COUNT(*) as count FROM review_state WHERE repetitions = 0`).get().count;

    const levelCounts = db.prepare(`
      SELECT jlpt_level, COUNT(*) as count
      FROM vocabulary
      GROUP BY jlpt_level
    `).all();

    const levels = { N5: 0, N4: 0, N3: 0, N2: 0, N1: 0 };
    levelCounts.forEach((lc) => {
      if (lc.jlpt_level && levels[lc.jlpt_level] !== undefined) {
        levels[lc.jlpt_level] = lc.count;
      }
    });

    res.json({
      success: true,
      stats: {
        totalWords,
        dueToday,
        mastered,
        learning,
        newWords,
        streakDays: 12, // Default streak counter for motivation
        levels
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

export default router;
