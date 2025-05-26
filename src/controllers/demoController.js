const { buyCoin, sellCoin, getPortfolioValue, getWalletBalance, getHoldings } = require('../services/demoWallet');
const { getCoinPrices } = require('../services/priceService');

exports.buy = (req, res) => {
  try {
    const { symbol, quantity, price } = req.body;
    const result = buyCoin(symbol, quantity, price);
    return res.json(result);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

exports.sell = (req, res) => {
  try {
    const { symbol, quantity, price } = req.body;
    const result = sellCoin(symbol, quantity, price);
    return res.json(result);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

exports.portfolio = (req, res) => {
  const prices = getCoinPrices();
  const portfolioValue = getPortfolioValue(prices);
  const balance = getWalletBalance();
  const holdings = getHoldings();
  return res.json({ balance, holdings, portfolioValue });
};
