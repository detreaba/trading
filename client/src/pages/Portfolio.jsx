// client/src/pages/Portfolio.jsx
import React, { useEffect, useState } from 'react';

function Portfolio() {
  const [portfolio, setPortfolio] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/demo/portfolio') // calls the Node endpoint
      .then(res => res.json())
      .then(data => {
        setPortfolio(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching portfolio:', err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading portfolio...</p>;
  if (!portfolio) return <p>No portfolio data.</p>;

  const { balance, holdings, portfolioValue } = portfolio;

  return (
    <div>
      <h2>My Portfolio</h2>
      <div>
        <strong>Wallet Balance: </strong> ${balance.toFixed(2)}
      </div>
      <div>
        <strong>Portfolio Value (including holdings): </strong> 
        ${portfolioValue.toFixed(2)}
      </div>

      <h3>Holdings</h3>
      <table>
        <thead>
          <tr>
            <th>Coin Symbol</th>
            <th>Quantity</th>
            <th>Avg Price</th>
          </tr>
        </thead>
        <tbody>
          {holdings.map((h, idx) => (
            <tr key={idx}>
              <td>{h.coinSymbol}</td>
              <td>{h.quantity}</td>
              <td>${h.avgPrice.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Portfolio;
