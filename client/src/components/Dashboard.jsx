// client/src/components/Dashboard.jsx
import React, { useState } from 'react';
import { Box, Typography, Card, CardContent, Grid } from '@mui/material';
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

/**
 * Example "Home" page showing a quick portfolio chart + stats
 */
function Dashboard() {
  const [history] = useState([
    { day: 1, value: 100000 },
    { day: 2, value: 105000 },
    { day: 3, value: 99000 },
    { day: 4, value: 118000 },
    { day: 5, value: 125000 },
  ]);

  return (
    <Box>
      <Typography variant="h4" gutterBottom>Dashboard</Typography>

      <Grid container spacing={2}>
        {/* Chart card */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6">Portfolio Value</Typography>
              <LineChart
                width={300}
                height={200}
                data={history}
                margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
              >
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                <Line type="monotone" dataKey="value" stroke="#1976d2" />
              </LineChart>
            </CardContent>
          </Card>
        </Grid>

        {/* Quick Stats card */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>Quick Stats</Typography>
              <Typography>Total coins tracked: 50</Typography>
              <Typography>Open positions: 12</Typography>
              <Typography>Last auto-trader action: BUY BTC</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Dashboard;
