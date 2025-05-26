import cron from 'node-cron';

let coinPrices = [];

function initCoinPrices() {
  const symbols = [
    "COIN1","COIN2","COIN3","COIN4","COIN5",
    "COIN6","COIN7","COIN8","COIN9","COIN10",
  ];
  coinPrices = symbols.map(sym => ({
    symbol: sym,
    price: (Math.random() * 10 + 1).toFixed(2) // random price between 1..11
  }));
}

// Randomly fluctuate coin prices
function updateCoinPrices() {
  coinPrices.forEach(coin => {
    let fluctuation = (Math.random() - 0.5) * 2; // -1..+1
    let newPrice = parseFloat(coin.price) + fluctuation;
    if (newPrice < 0) newPrice = Math.abs(newPrice); // no negative
    coin.price = newPrice.toFixed(2);
  });
}

// Start a cron to update prices every minute
export function startPricePolling() {
  cron.schedule('* * * * *', () => {
    updateCoinPrices();
  });
}

// Return the current prices array
export function getCoinPrices() {
  return coinPrices;
}

// Initialize once at load
initCoinPrices();
