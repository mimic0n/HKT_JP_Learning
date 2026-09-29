import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();
const kanaFilePath = path.join(__dirname, '../data/kana-data.json');

// GET /api/kana
router.get('/', (req, res) => {
  try {
    const rawData = fs.readFileSync(kanaFilePath, 'utf8');
    const kanaData = JSON.parse(rawData);
    res.json({ success: true, data: kanaData });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

export default router;
