// src/services/newsCron.js
const cron = require('node-cron');
const { fetchCryptoNews } = require('./newsService');
const { analyzeNews } = require('./chatgptService');

// We'll keep an in-memory array of "latest analysis"
let latestAnalysis = [];

// Runs every hour (0 * * * *)
cron.schedule('0 * * * *', async () => {
  console.log("Running hourly news fetch + ChatGPT analysis...");
  const newsArticles = await fetchCryptoNews();

  // Optionally slice to e.g. 5 articles if ChatGPT context is too large
  const articlesToAnalyze = newsArticles.slice(0, 5);

  const gptResult = await analyzeNews(articlesToAnalyze);
  if (gptResult.analysis) {
    latestAnalysis.unshift({
      timestamp: new Date().toISOString(),
      articles: articlesToAnalyze,
      summary: gptResult.analysis
    });

    // Optionally store in DB or limit to last 10 analyses
    if (latestAnalysis.length > 10) {
      latestAnalysis.pop();
    }

    console.log("News analysis complete:", gptResult.analysis);
  } else {
    console.log("No analysis or error:", gptResult.error);
  }
});

// Provide a function for routes to get the in-memory data
function getLatestAnalysis() {
  return latestAnalysis;
}

module.exports = { getLatestAnalysis };
