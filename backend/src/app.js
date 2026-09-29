import express from 'express';
import cors from 'cors';
import { initDatabase } from './db/connection.js';
import vocabularyRoutes from './routes/vocabulary.routes.js';
import reviewRoutes from './routes/review.routes.js';
import statsRoutes from './routes/stats.routes.js';
import kanaRoutes from './routes/kana.routes.js';

const app = express();
const PORT = process.env.PORT || 5000;

// Initialize SQLite DB
initDatabase();

app.use(cors());
app.use(express.json());

// API Routes
app.use('/api/vocabulary', vocabularyRoutes);
app.use('/api/review', reviewRoutes);
app.use('/api/stats', statsRoutes);
app.use('/api/kana', kanaRoutes);

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', time: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`🌸 Japanese Learning Portal Backend listening on http://localhost:${PORT}`);
});
