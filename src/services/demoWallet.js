let walletBalance = 100000; // $100k start
let holdings = []; // e.g. [{ coinSymbol, quantity, avgPrice }]

// Buy function
function buyCoin(symbol, quantity, price) {
  const cost = quantity * price;
  if (cost > walletBalance) {
    throw new Error("Not enough balance to buy!");
  }
  walletBalance -= cost;

  // check if we already hold this symbol
  const existing = holdings.find(h => h.coinSymbol === symbol);
  if (existing) {
    // Weighted avg price update
    const totalQty = existing.quantity + quantity;
    existing.avgPrice = ((existing.quantity * existing.avgPrice) + cost) / totalQty;
    existing.quantity = totalQty;
  } else {
    holdings.push({ coinSymbol: symbol, quantity, avgPrice: price });
  }
  return { walletBalance, holdings };
}

// Sell function
function sellCoin(symbol, quantity, price) {
  const existing = holdings.find(h => h.coinSymbol === symbol);
  if (!existing || existing.quantity < quantity) {
    throw new Error("Not enough holdings to sell!");
  }
  const revenue = quantity * price;
  walletBalance += revenue;

  existing.quantity -= quantity;
  if (existing.quantity <= 0) {
    // remove from holdings if zero
    holdings = holdings.filter(h => h.coinSymbol !== symbol);
  }
  return { walletBalance, holdings };
}

// Revalue holdings
function getPortfolioValue(currentPrices) {
  let totalHoldingsValue = 0;
  holdings.forEach(pos => {
    const cp = currentPrices.find(p => p.symbol === pos.coinSymbol);
    if (cp) {
      totalHoldingsValue += pos.quantity * parseFloat(cp.price);
    } else {
      // coin not found in price feed? Assume 0 or skip
      totalHoldingsValue += pos.quantity * pos.avgPrice;
    }
  });
  return walletBalance + totalHoldingsValue;
}

module.exports = {
  buyCoin,
  sellCoin,
  getPortfolioValue,
  getWalletBalance: () => walletBalance,
  getHoldings: () => holdings
};
