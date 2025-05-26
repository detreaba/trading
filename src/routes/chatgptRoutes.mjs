import express from 'express';
import { analyzeNews, analyzeSnippet } from '../services/chatgptService.mjs';

const router = express.Router();

/**
 * POST /api/chatgpt/analyze-news
 * Body: { "newsArray": [ { "title":"...", "snippet":"..." }, ... ] }
 */
router.post('/analyze-news', async (req, res) => {
  try {
    const { newsArray } = req.body;
    if (!Array.isArray(newsArray) || newsArray.length === 0) {
      return res
        .status(400)
        .json({ success: false, error: 'newsArray must be a non-empty array' });
    }
    const result = await analyzeNews(newsArray);
    if (result.error) {
      return res.status(500).json({ success: false, error: result.error });
    }
    return res.json({ success: true, data: { analysis: result.analysis } });
  } catch (err) {
    console.error('analyze-news error:', err.message);
    return res.status(500).json({ success: false, error: err.message });
  }
});

/**
 * POST /api/chatgpt/analyze-snippet
 * Body: { "text": "Some snippet..." }
 */
router.post('/analyze-snippet', async (req, res) => {
  try {
    const { text } = req.body;
    if (!text) {
      return res
        .status(400)
        .json({ success: false, error: 'No text provided' });
    }
    const result = await analyzeSnippet(text);
    if (result.error) {
      return res.status(500).json({ success: false, error: result.error });
    }
    return res.json({ success: true, data: { analysis: result.analysis } });
  } catch (err) {
    console.error('analyze-snippet error:', err.message);
    return res.status(500).json({ success: false, error: err.message });
  }
});

export default router;
