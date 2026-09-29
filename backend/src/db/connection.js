import Database from 'better-sqlite3';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dataDir = path.join(__dirname, '../../data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

const dbPath = path.join(dataDir, 'vocab.db');
const db = new Database(dbPath);

db.pragma('foreign_keys = ON');

export function initDatabase() {
  db.exec(`
    CREATE TABLE IF NOT EXISTS vocabulary (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      kanji TEXT,
      kana TEXT NOT NULL,
      romaji TEXT,
      meaning TEXT NOT NULL,
      example_sentence TEXT,
      jlpt_level TEXT DEFAULT 'N5',
      tags TEXT,
      source TEXT DEFAULT 'manual',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS review_state (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      vocabulary_id INTEGER NOT NULL UNIQUE,
      ease_factor REAL DEFAULT 2.5,
      interval_days INTEGER DEFAULT 0,
      repetitions INTEGER DEFAULT 0,
      due_date DATETIME DEFAULT CURRENT_TIMESTAMP,
      last_reviewed_at DATETIME,
      FOREIGN KEY (vocabulary_id) REFERENCES vocabulary(id) ON DELETE CASCADE
    );
  `);
  console.log('Database initialized successfully at:', dbPath);
}

export default db;
