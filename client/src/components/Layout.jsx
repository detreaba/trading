// client/src/components/Layout.jsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import TopBar from './TopBar';
import { Box } from '@mui/material';

function Layout() {
  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <Sidebar />
      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <TopBar />
        <Box component="main" sx={{ p: 2 }}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
}

export default Layout;
