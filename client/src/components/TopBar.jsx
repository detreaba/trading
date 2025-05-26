// client/src/components/TopBar.jsx
import React from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';

function TopBar() {
  return (
    <AppBar position="static" elevation={1}>
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Trading Dashboard
        </Typography>
        <Typography>Logged in as: Demo User</Typography>
      </Toolbar>
    </AppBar>
  );
}

export default TopBar;
