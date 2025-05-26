import './envSetup.mjs'; // This already does dotenv.config()

import express from 'express';
import morgan from 'morgan';
import cors from 'cors';

// DB connection
import connectDB from './src/config/db.mjs';
// Routes index
import router from './src/routes/index.mjs';
// Optional price polling or other background tasks
import { startPricePolling } from './src/services/priceService.mjs';

// REMOVE OR COMMENT OUT:
// dotenv.config(); // <<--- remove this call

// Connect to MongoDB
await connectDB();

const app = express();
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

// All API routes under /api
app.use('/api', router);

// Start any background tasks
startPricePolling();

// Choose your port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
