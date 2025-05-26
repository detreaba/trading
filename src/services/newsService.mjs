import RSSParser from 'rss-parser';
const parser = new RSSParser();

const feeds = [
  'https://cointelegraph.com/rss',
  'https://coindesk.com/arc/outboundfeeds/rss/',
  'https://newsbtc.com/feed'
];

// Fetch articles from each feed
export async function fetchCryptoNews() {
  let allArticles = [];

  for (const feedUrl of feeds) {
    try {
      const feed = await parser.parseURL(feedUrl);
      feed.items.forEach(item => {
        allArticles.push({
          title: item.title || '',
          link: item.link || '',
          snippet: item.contentSnippet || '',
          published: item.isoDate || item.pubDate
        });
      });
    } catch (err) {
      console.error(`Error fetching from ${feedUrl}:`, err.message);
    }
  }

  return allArticles;
}
