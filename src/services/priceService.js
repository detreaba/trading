// priceService.js
const cron = require('node-cron');

// We'll track 50 coins in memory.
let coinPrices = [];

// Initialize coinPrices with random data
const initCoinPrices = () => {
  const symbols = [
    "COIN1","COIN2","COIN3","COIN4","COIN5",
    "COIN6","COIN7","COIN8","COIN9","COIN10",
    "COIN11","COIN12","COIN13","COIN14","COIN15",
    "COIN16","COIN17","COIN18","COIN19","COIN20",
    "COIN21","COIN22","COIN23","COIN24","COIN25",
    "COIN26","COIN27","COIN28","COIN29","COIN30",
    "COIN31","COIN32","COIN33","COIN34","COIN35",
    "COIN36","COIN37","COIN38","COIN39","COIN40",
    "COIN41","COIN42","COIN43","COIN44","COIN45",
    "COIN46","COIN47","COIN48","COIN49","COIN50"
  ];
  coinPrices = symbols.map(sym => ({
    symbol: sym,
    price: (Math.random() * 10 + 1).toFixed(2) // random price between 1 and 11
  }));
};

const updateCoinPrices = () => {
  coinPrices.forEach(coin => {
    // random small fluctuation
    let fluctuation = (Math.random() - 0.5) * 2; // -1 to +1
    let newPrice = parseFloat(coin.price) + fluctuation;
    newPrice = newPrice < 0 ? Math.abs(newPrice) : newPrice; // no negative
    coin.price = newPrice.toFixed(2);
  });
};

const startPricePolling = () => {
  // run every minute
  cron.schedule('* * * * *', () => {
    updateCoinPrices();
    // console.log('Prices updated');
  });
};

initCoinPrices();

module.exports = {
  getCoinPrices: () => coinPrices,
  startPricePolling
};
