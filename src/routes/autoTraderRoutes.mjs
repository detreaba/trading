import express from 'express';
import { runAutoTrader, getAutoTraderStatus } from '../services/autoTrader.mjs';

const router = express.Router();

/**
 * Manually trigger the auto-trader once
 */
router.post('/run', async (req, res) => {
  try {
    await runAutoTrader(); 
    return res.json({ success: true, message: 'AutoTrader run completed' });
  } catch (err) {
    console.error('autoTrader run error:', err.message);
    return res.status(500).json({ success: false, error: err.message });
  }
});

/**
 * Get the last run info, sentiment, etc.
 */
router.get('/status', (req, res) => {
  try {
    const status = getAutoTraderStatus();
    return res.json({ success: true, data: status });
  } catch (err) {
    console.error('autoTrader status error:', err.message);
    return res.status(500).json({ success: false, error: err.message });
  }
});

export default router;
