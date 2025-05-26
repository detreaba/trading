// client/src/components/Trade.jsx
import React, { useState } from 'react';
import { Typography, TextField, Button, MenuItem, FormControl, Select, Box } from '@mui/material';

function Trade() {
  const [symbol, setSymbol] = useState('');
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');
  const [mode, setMode] = useState('buy');
  const [responseMsg, setResponseMsg] = useState('');

  const handleTrade = () => {
    const endpoint = mode === 'buy' ? '/api/demo/buy' : '/api/demo/sell';
    fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ symbol, quantity: +quantity, price: +price }),
    })
      .then(res => res.json())
      .then(data => {
        if (data.error) {
          setResponseMsg(`Error: ${data.error}`);
        } else {
          setResponseMsg(`Success! New wallet balance: $${data.walletBalance.toFixed(2)}`);
        }
      })
      .catch(err => {
        setResponseMsg('Error: ' + err.message);
      });
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>Trade (Demo)</Typography>

      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 2 }}>
        <TextField
          label="Symbol"
          value={symbol}
          onChange={e => setSymbol(e.target.value)}
          placeholder="e.g. BTC"
        />
        <TextField
          label="Quantity"
          type="number"
          value={quantity}
          onChange={e => setQuantity(e.target.value)}
        />
        <TextField
          label="Price"
          type="number"
          value={price}
          onChange={e => setPrice(e.target.value)}
        />
        <FormControl sx={{ minWidth: 100 }}>
          <Select value={mode} onChange={e => setMode(e.target.value)}>
            <MenuItem value="buy">Buy</MenuItem>
            <MenuItem value="sell">Sell</MenuItem>
          </Select>
        </FormControl>
        <Button variant="contained" onClick={handleTrade}>
          Submit
        </Button>
      </Box>

      {responseMsg && <Typography>{responseMsg}</Typography>}
    </Box>
  );
}

export default Trade;
