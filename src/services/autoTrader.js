// src/services/autoTrader.js (ESM)
import cron from 'node-cron';
import { fetchCryptoNews } from './newsService.js';
import { analyzeNews } from './chatgptService.js';
import { buyCoin, sellCoin, getWalletBalance } from './demoWallet.js';

let lastRunInfo = { lastRun: null, lastAction: null, sentimentScore: null };

export async function runAutoTrader() {
  try {
    const articles = await fetchCryptoNews();
    const analysis = await analyzeNews(articles);

    if (analysis.error) {
      console.warn("GPT analysis failed:", analysis.error);
      return;
    }

    // parse sentiment, do trades, etc.
    lastRunInfo.lastRun = new Date();
    lastRunInfo.lastAction = 'BUY' || 'SELL' || 'NONE';
    lastRunInfo.sentimentScore = 3;
  } catch (err) {
    console.error("AutoTrader error:", err.message);
  }
}

export function getAutoTraderStatus() {
  return lastRunInfo;
}

// cron schedule
cron.schedule('*/30 * * * *', () => {
  console.log("AutoTrader cron triggered...");
  runAutoTrader();
});
