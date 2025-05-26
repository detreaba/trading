import React, { useState } from 'react';
import axios from 'axios';
import { Typography, TextField, Button, Paper, Stack } from '@mui/material';

function AIInsights() {
  const [customPrompt, setCustomPrompt] = useState('');
  const [aiResponse, setAiResponse] = useState('');

  const handleAnalyze = async () => {
    try {
      // For example, we can send newsArray or a direct user prompt
      const { data } = await axios.post('http://localhost:4001/api/chatgpt/analyze-news', {
        newsArray: [
          { title: "Sample Title", snippet: customPrompt }
        ]
      });
      if (data.analysis) {
        setAiResponse(data.analysis);
      } else if (data.error) {
        setAiResponse(`Error: ${data.error}`);
      }
    } catch (err) {
      setAiResponse(err.response?.data?.error || err.message);
    }
  };

  return (
    <Paper sx={{ p: 2 }}>
      <Typography variant="h4" gutterBottom>AI Insights</Typography>
      <Typography variant="body1" paragraph>
        Use ChatGPT to analyze or summarize custom text (e.g. news snippet, Twitter posts, etc.)
      </Typography>

      <Stack spacing={2}>
        <TextField
          label="Enter text or snippet"
          multiline
          rows={4}
          value={customPrompt}
          onChange={(e) => setCustomPrompt(e.target.value)}
        />
        <Button variant="contained" onClick={handleAnalyze}>
          Analyze with ChatGPT
        </Button>
        {aiResponse && (
          <Paper sx={{ p: 2 }}>
            <Typography variant="subtitle1">AI Response:</Typography>
            <Typography>{aiResponse}</Typography>
          </Paper>
        )}
      </Stack>
    </Paper>
  );
}

export default AIInsights;
