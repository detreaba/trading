import {
  buyCoin,
  sellCoin,
  getPortfolioValue,
  getWalletBalance,
  getHoldings
} from '../services/demoWallet.mjs';

import { getCoinPrices } from '../services/priceService.mjs';

// Example "Buy" handler
export async function buy(req, res) {
  try {
    const { symbol, quantity, price } = req.body;
    const result = buyCoin(symbol, quantity, price);
    return res.json(result);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
}

// Example "Sell" handler
export async function sell(req, res) {
  try {
    const { symbol, quantity, price } = req.body;
    const result = sellCoin(symbol, quantity, price);
    return res.json(result);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
}

// Example "Portfolio" handler
export async function portfolio(req, res) {
  const prices = getCoinPrices();
  const portfolioValue = getPortfolioValue(prices);
  const balance = getWalletBalance();
  const holdings = getHoldings();
  return res.json({ balance, holdings, portfolioValue });
}
