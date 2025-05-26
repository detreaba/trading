// client/src/App.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import AITrading from './components/AITrading';
import AutoTrader from './components/AutoTrader';
import Portfolio from './components/Portfolio';
import Trade from './components/Trade';
import ChatGPTPage from './components/ChatGPTPage';
import Settings from './components/Settings';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path="ai-trading" element={<AITrading />} />
        <Route path="autotrader" element={<AutoTrader />} />
        <Route path="portfolio" element={<Portfolio />} />
        <Route path="trade" element={<Trade />} />
        <Route path="chatgpt" element={<ChatGPTPage />} />
        <Route path="settings" element={<Settings />} />
      </Route>
    </Routes>
  );
}

export default App;
