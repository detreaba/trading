import express from 'express';
const router = express.Router();

// Import sub-routes (each with a default export)
import priceRoutes from './priceRoutes.mjs';
import demoRoutes from './demoRoutes.mjs';
import chatgptRoutes from './chatgptRoutes.mjs';
import newsRoutes from './newsRoutes.mjs';
import signalRoutes from './signalRoutes.mjs';
import autoTraderRoutes from './autoTraderRoutes.mjs';

// Map each sub-route under some path
router.use('/prices', priceRoutes);
router.use('/demo', demoRoutes);
router.use('/chatgpt', chatgptRoutes);
router.use('/news', newsRoutes);
router.use('/signals', signalRoutes);
router.use('/autoTrader', autoTraderRoutes);

export default router;
