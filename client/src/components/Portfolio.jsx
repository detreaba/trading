// client/src/components/Portfolio.jsx
import React, { useState, useEffect } from 'react';
import { Typography, Table, TableHead, TableRow, TableCell, TableBody, Paper } from '@mui/material';

function Portfolio() {
  const [portfolio, setPortfolio] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/demo/portfolio')
      .then(res => res.json())
      .then((data) => {
        setPortfolio(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching portfolio:', err);
        setLoading(false);
      });
  }, []);

  if (loading) return <Typography>Loading portfolio...</Typography>;
  if (!portfolio) return <Typography>No portfolio data found.</Typography>;

  const { balance, holdings, portfolioValue } = portfolio;

  return (
    <Paper sx={{ p: 2 }}>
      <Typography variant="h4" gutterBottom>My Portfolio</Typography>
      <Typography><strong>Wallet Balance:</strong> ${balance.toFixed(2)}</Typography>
      <Typography><strong>Total Value (Balance + Holdings):</strong> ${portfolioValue.toFixed(2)}</Typography>

      <Table sx={{ mt: 2 }}>
        <TableHead>
          <TableRow>
            <TableCell>Coin</TableCell>
            <TableCell>Quantity</TableCell>
            <TableCell>Avg Price</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {holdings.map((h, idx) => (
            <TableRow key={idx}>
              <TableCell>{h.coinSymbol}</TableCell>
              <TableCell>{h.quantity}</TableCell>
              <TableCell>${h.avgPrice.toFixed(2)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}

export default Portfolio;
