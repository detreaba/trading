// client/src/components/Sidebar.jsx
import React from 'react';
import { Drawer, Toolbar, List, ListItemButton, ListItemText, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

function Sidebar() {
  const drawerWidth = 220;

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': { width: drawerWidth, boxSizing: 'border-box' },
      }}
    >
      <Toolbar>
        <Typography variant="h6">MyCryptoDashboard</Typography>
      </Toolbar>
      <List>
        <ListItemButton component={Link} to="/">
          <ListItemText primary="Dashboard" />
        </ListItemButton>
        <ListItemButton component={Link} to="/ai-trading">
          <ListItemText primary="AI Trading" />
        </ListItemButton>
        <ListItemButton component={Link} to="/autotrader">
          <ListItemText primary="AutoTrader" />
        </ListItemButton>
        <ListItemButton component={Link} to="/portfolio">
          <ListItemText primary="Portfolio" />
        </ListItemButton>
        <ListItemButton component={Link} to="/trade">
          <ListItemText primary="Trade" />
        </ListItemButton>
        <ListItemButton component={Link} to="/chatgpt">
          <ListItemText primary="ChatGPT" />
        </ListItemButton>
        <ListItemButton component={Link} to="/settings">
          <ListItemText primary="Settings" />
        </ListItemButton>
      </List>
    </Drawer>
  );
}

export default Sidebar;
