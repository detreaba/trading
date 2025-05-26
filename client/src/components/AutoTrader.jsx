// client/src/components/AutoTrader.jsx
import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, Alert } from '@mui/material';

function AutoTrader() {
  const [status, setStatus] = useState(null);
  const [msg, setMsg] = useState('');

  const fetchStatus = () => {
    fetch('/api/autoTrader/status')
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setStatus(data.data);
        } else {
          console.error(data.error);
        }
      })
      .catch(err => console.error(err));
  };

  const runAutoTrader = () => {
    setMsg('Running auto-trader...');
    fetch('/api/autoTrader/run', { method: 'POST' })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setMsg(data.message);
          fetchStatus();
        } else {
          setMsg(`Error: ${data.error}`);
        }
      })
      .catch(err => setMsg(`Error: ${err.message}`));
  };

  useEffect(() => {
    fetchStatus();
  }, []);

  return (
    <Box>
      <Typography variant="h4" gutterBottom>AutoTrader</Typography>
      <Button variant="contained" onClick={runAutoTrader}>
        Run AutoTrader (Manual)
      </Button>

      {msg && <Alert severity="info" sx={{ mt: 2 }}>{msg}</Alert>}

      {status && (
        <Box sx={{ mt: 2 }}>
          <Typography>Last Run: {status.lastRun || 'N/A'}</Typography>
          <Typography>Last Action: {status.lastAction || 'N/A'}</Typography>
          <Typography>Sentiment Score: {status.sentimentScore ?? 'N/A'}</Typography>
        </Box>
      )}
    </Box>
  );
}

export default AutoTrader;
