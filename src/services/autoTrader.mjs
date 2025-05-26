import cron from 'node-cron';
import { fetchCryptoNews } from './newsService.mjs';
import { analyzeNews } from './chatgptService.mjs';
import { buyCoin, sellCoin, getWalletBalance } from './demoWallet.mjs';

let lastRunInfo = {
  lastRun: null,
  lastAction: null,
  sentimentScore: null,
};

/**
 * Manually run the auto-trader logic once
 */
export async function runAutoTrader() {
  try {
    // Example logic: fetch news, analyze with GPT, decide to buy/sell
    const articles = await fetchCryptoNews();
    const analysis = await analyzeNews(articles.slice(0, 3)); // analyze 3 articles

    if (analysis.error) {
      console.warn('GPT analysis failed:', analysis.error);
      return;
    }

    // You might parse the text for sentiment or signals
    // Placeholder:
    const randomScore = Math.round(Math.random() * 10) - 5; // -5..+5

    // Make a fake trade decision for example
    if (randomScore > 0) {
      buyCoin('COIN1', 10, 10); 
      lastRunInfo.lastAction = 'BUY 10 COIN1';
    } else if (randomScore < 0) {
      sellCoin('COIN1', 5, 9); 
      lastRunInfo.lastAction = 'SELL 5 COIN1';
    } else {
      lastRunInfo.lastAction = 'NONE';
    }

    lastRunInfo.lastRun = new Date();
    lastRunInfo.sentimentScore = randomScore;

    console.log('[AutoTrader] GPT says:', analysis.analysis);
    console.log('[AutoTrader] Decision:', lastRunInfo.lastAction);
  } catch (err) {
    console.error('AutoTrader error:', err.message);
  }
}

/**
 * Return last known auto-trader info
 */
export function getAutoTraderStatus() {
  return lastRunInfo;
}

// Example cron job: run every 30 minutes
cron.schedule('*/30 * * * *', () => {
  console.log('[AutoTrader CRON] Triggering auto trader...');
  runAutoTrader();
});
