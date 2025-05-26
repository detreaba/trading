import cron from 'node-cron';
import { fetchCryptoNews } from './newsService.mjs';
import { analyzeNews } from './chatgptService.mjs';

// We'll keep an in-memory array of "latest analysis"
let latestAnalysis = [];

// Runs every hour
cron.schedule('0 * * * *', async () => {
  console.log('[newsCron] Running hourly news fetch + ChatGPT analysis...');
  const newsArticles = await fetchCryptoNews();

  // Optionally limit the number of articles
  const articlesToAnalyze = newsArticles.slice(0, 5);

  const gptResult = await analyzeNews(articlesToAnalyze);
  if (gptResult.analysis) {
    latestAnalysis.unshift({
      timestamp: new Date().toISOString(),
      articles: articlesToAnalyze,
      summary: gptResult.analysis,
    });
    // Keep only last 10
    if (latestAnalysis.length > 10) {
      latestAnalysis.pop();
    }
    console.log('[newsCron] News analysis complete.');
  } else {
    console.log('[newsCron] No analysis or error:', gptResult.error);
  }
});

// Provide a function for routes to get the in-memory data
export function getLatestAnalysis() {
  return latestAnalysis;
}
