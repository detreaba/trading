let walletBalance = 100000; // $100k start
let holdings = []; // e.g. [{ coinSymbol, quantity, avgPrice }]

export function buyCoin(symbol, quantity, price) {
  const cost = quantity * price;
  if (cost > walletBalance) {
    throw new Error('Not enough balance to buy!');
  }
  walletBalance -= cost;

  // Check if we already hold this symbol
  const existing = holdings.find(h => h.coinSymbol === symbol);
  if (existing) {
    // Weighted average price
    const totalQty = existing.quantity + quantity;
    existing.avgPrice =
      (existing.quantity * existing.avgPrice + cost) / totalQty;
    existing.quantity = totalQty;
  } else {
    holdings.push({ coinSymbol: symbol, quantity, avgPrice: price });
  }
  return { walletBalance, holdings };
}

export function sellCoin(symbol, quantity, price) {
  const existing = holdings.find(h => h.coinSymbol === symbol);
  if (!existing || existing.quantity < quantity) {
    throw new Error('Not enough holdings to sell!');
  }
  const revenue = quantity * price;
  walletBalance += revenue;

  existing.quantity -= quantity;
  if (existing.quantity <= 0) {
    holdings = holdings.filter(h => h.coinSymbol !== symbol);
  }
  return { walletBalance, holdings };
}

export function getPortfolioValue(currentPrices) {
  let totalHoldingsValue = 0;
  holdings.forEach(pos => {
    const cp = currentPrices.find(p => p.symbol === pos.coinSymbol);
    if (cp) {
      totalHoldingsValue += pos.quantity * parseFloat(cp.price);
    } else {
      // If coin not found, assume zero or skip
      totalHoldingsValue += pos.quantity * pos.avgPrice;
    }
  });
  return walletBalance + totalHoldingsValue;
}

export function getWalletBalance() {
  return walletBalance;
}

export function getHoldings() {
  return holdings;
}
