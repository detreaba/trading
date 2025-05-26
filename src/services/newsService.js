// src/services/newsService.js
const RSSParser = require('rss-parser');
const parser = new RSSParser();

// Example crypto feeds:
const feeds = [
  'https://cointelegraph.com/rss', 
  'https://coindesk.com/arc/outboundfeeds/rss/',
  'https://newsbtc.com/feed',
  // Add more if desired
];

async function fetchCryptoNews() {
  let allArticles = [];

  for (const feedUrl of feeds) {
    try {
      const feed = await parser.parseURL(feedUrl);
      feed.items.forEach(item => {
        allArticles.push({
          title: item.title || '',
          link: item.link || '',
          snippet: item.contentSnippet || '',  // or item.content
          published: item.isoDate || item.pubDate
        });
      });
    } catch (err) {
      console.error(`Error fetching from ${feedUrl}`, err.message);
    }
  }

  return allArticles;
}

module.exports = { fetchCryptoNews };
