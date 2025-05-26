import express from 'express';
import { getCoinPrices } from '../services/priceService.mjs';

const router = express.Router();

/**
 * GET /api/prices
 */
router.get('/', (req, res) => {
  const prices = getCoinPrices();
  return res.json(prices);
});

export default router;
