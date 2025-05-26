// client/src/components/AITrading.jsx
import React from 'react';
import { Box, Typography } from '@mui/material';

function AITrading() {
  return (
    <Box>
      <Typography variant="h4" gutterBottom>AI Trading</Typography>
      <Typography variant="body1">
        Here you could display combined data from your predictive model and ChatGPT sentiment. 
        Showcase real-time signals or recommended trades for high-risk altcoins, 
        leveraging on-chain + social data.
      </Typography>
    </Box>
  );
}

export default AITrading;
