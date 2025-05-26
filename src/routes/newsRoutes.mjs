import express from 'express';
import { getLatestAnalysis } from '../services/newsCron.mjs';

const router = express.Router();

/**
 * GET /api/news/analysis
 * returns the last sets of ChatGPT analyses from the in-memory store
 */
router.get('/analysis', (req, res) => {
  try {
    const data = getLatestAnalysis();
    return res.json({ success: true, data });
  } catch (err) {
    console.error('news/analysis error:', err.message);
    return res.status(500).json({ success: false, error: err.message });
  }
});

export default router;
