import express from 'express';
import { buy, sell, portfolio } from '../controllers/demoController.mjs';

const router = express.Router();

// /api/demo/buy
router.post('/buy', buy);
// /api/demo/sell
router.post('/sell', sell);
// /api/demo/portfolio
router.get('/portfolio', portfolio);

export default router;
