// client/src/components/ChatGPTPage.jsx
import React, { useState } from 'react';
import { Typography, TextField, Button, Box } from '@mui/material';

function ChatGPTPage() {
  const [text, setText] = useState('');
  const [analysis, setAnalysis] = useState('');

  const analyzeSnippet = () => {
    fetch('/api/chatgpt/analyze-snippet', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text }),
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setAnalysis(data.data.analysis);
        } else {
          setAnalysis(`Error: ${data.error}`);
        }
      })
      .catch(err => setAnalysis(`Error: ${err.message}`));
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>ChatGPT Analysis</Typography>
      <Typography variant="body2" sx={{ mb: 1 }}>
        Enter a snippet, news excerpt, or user text to analyze via ChatGPT.
      </Typography>
      <TextField
        label="Text to Analyze"
        multiline
        rows={4}
        value={text}
        onChange={e => setText(e.target.value)}
        sx={{ width: '100%', maxWidth: 600 }}
      />
      <br />
      <Button variant="contained" sx={{ mt: 1 }} onClick={analyzeSnippet}>
        Analyze
      </Button>
      <Box sx={{ mt: 2, whiteSpace: 'pre-wrap' }}>
        {analysis}
      </Box>
    </Box>
  );
}

export default ChatGPTPage;
