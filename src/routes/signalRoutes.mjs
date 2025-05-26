import express from 'express';
const router = express.Router();

// Example in-memory signals
let signals = [
  { time: 1684550000, type: 'BUY', message: 'GPT bullish on BTC' },
  { time: 1684600000, type: 'SELL', message: 'GPT found negative news' }
];

// GET /api/signals
router.get('/', (req, res) => {
  return res.json({ success: true, data: signals });
});

// POST /api/signals
router.post('/', (req, res) => {
  const { time, type, message } = req.body;
  if (!time || !type) {
    return res
      .status(400)
      .json({ success: false, error: 'time and type are required' });
  }
  signals.push({ time, type, message: message || '' });
  return res.json({ success: true, data: signals });
});

export default router;
