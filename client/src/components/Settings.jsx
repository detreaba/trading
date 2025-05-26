// client/src/components/Settings.jsx
import React, { useState, useEffect } from 'react';
import { Typography, TextField, Button, List, ListItem, ListItemText, Box } from '@mui/material';

/**
 * RSS feed manager, for your news scanning
 */
function Settings() {
  const [feeds, setFeeds] = useState([]);
  const [newFeed, setNewFeed] = useState('');

  useEffect(() => {
    fetch('/api/news/feeds')
      .then(res => res.json())
      .then(data => setFeeds(data))
      .catch(err => console.error(err));
  }, []);

  const addFeed = () => {
    if (!newFeed) return;
    fetch('/api/news/feeds', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ feedUrl: newFeed })
    })
      .then(res => res.json())
      .then(data => {
        setFeeds(data);
        setNewFeed('');
      })
      .catch(err => console.error(err));
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>Settings</Typography>
      <Typography variant="body2" sx={{ mb: 2 }}>
        Manage your RSS feeds for the news scanner. Add or remove sources to gather altcoin-related news.
      </Typography>

      <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
        <TextField
          label="New RSS Feed URL"
          value={newFeed}
          onChange={e => setNewFeed(e.target.value)}
        />
        <Button variant="contained" onClick={addFeed}>Add Feed</Button>
      </Box>

      <List>
        {feeds.map((url, i) => (
          <ListItem key={i}>
            <ListItemText primary={url} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
}

export default Settings;
