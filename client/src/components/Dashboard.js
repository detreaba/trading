import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import axios from 'axios';

function Dashboard() {
  const [prices, setPrices] = useState([]);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    // fetch current prices
    const fetchPrices = async () => {
      try {
        const { data } = await axios.get('http://localhost:4001/api/prices');
        setPrices(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchPrices();

    // Example of a "mocked" portfolio history
    // In a real app, you'd get from server or Socket.io
    setHistory([
      { day: 1, value: 100000 },
      { day: 2, value: 102000 },
      { day: 3, value: 105000 },
      { day: 4, value: 99000 },
      { day: 5, value: 110000 }
    ]);
  }, []);

  return (
    <div>
      <h2>Dashboard</h2>
      <div>
        <h4>Current Prices (mocked)</h4>
        <ul>
          {prices.map((c, idx) => (
            <li key={idx}>
              {c.symbol}: ${c.price}
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h4>Portfolio Value Over Time</h4>
        <LineChart
          width={600}
          height={300}
          data={history}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <XAxis dataKey="day" />
          <YAxis />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <Line type="monotone" dataKey="value" stroke="#8884d8" />
        </LineChart>
      </div>
    </div>
  );
}

export default Dashboard;
