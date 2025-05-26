// src/services/chatgptService.js
// ESM usage with openai@4.x (e.g. openai@4.100.0 or similar).

import { OpenAIApi } from 'openai';

// Create an instance with your API key.
// Make sure process.env.OPENAI_API_KEY is set (in your .env).
const openai = new OpenAIApi({
  apiKey: process.env.OPENAI_API_KEY,
});

/**
 * analyzeNews: Summarizes an array of articles with GPT-4
 * @param {Array} newsArray - e.g. [{ title: "...", snippet: "..." }, ...]
 * @returns {Object} { analysis: string } or { error: string }
 */
export async function analyzeNews(newsArray) {
  if (!process.env.OPENAI_API_KEY) {
    return { error: 'No OpenAI API key provided' };
  }

  // Basic validation
  if (!Array.isArray(newsArray) || newsArray.length === 0) {
    return { error: 'No valid news articles provided' };
  }

  // Convert articles into a single text block
  const newsText = newsArray.map((item, idx) => (
    `Article #${idx + 1}:\nTitle: ${item.title}\nSnippet: ${item.snippet}\n`
  )).join('\n');

  // Construct the prompt
  const prompt = `
    You are an AI analyzing multiple crypto news articles:

    ${newsText}

    Provide:
    1) A short combined summary (max 3 sentences).
    2) A sentiment score from -5 (very negative) to +5 (very positive).
    3) Note if there's any hack, major partnership, or exchange listing.
  `;

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4',  // or "gpt-3.5-turbo" if you prefer
      messages: [
        {
          role: 'system',
          content: 'You are an AI specialized in summarizing crypto news from a trading perspective.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      max_tokens: 300,
    });

    // GPT reply
    const assistantMsg = response.choices[0].message.content;
    return { analysis: assistantMsg };
  } catch (err) {
    console.error('OpenAI analyzeNews error:', err.message);
    return { error: err.message };
  }
}

/**
 * analyzeSnippet: Summarizes a single user text snippet
 * @param {String} userText
 * @returns {Object} { analysis: string } or { error: string }
 */
export async function analyzeSnippet(userText) {
  if (!process.env.OPENAI_API_KEY) {
    return { error: 'No OpenAI API key provided' };
  }
  if (!userText) {
    return { error: 'No snippet text provided' };
  }

  const prompt = `
    You are an AI analyzing a user snippet:
    "${userText}"

    Please summarize in 3 sentences,
    then give a sentiment rating (-5 to +5),
    and note any unusual or noteworthy info.
  `;

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content: 'You are an AI specialized in summarizing user snippets from a trading perspective.'
        },
        { role: 'user', content: prompt }
      ],
      max_tokens: 300,
    });

    const assistantMsg = response.choices[0].message.content;
    return { analysis: assistantMsg };
  } catch (err) {
    console.error('OpenAI analyzeSnippet error:', err.message);
    return { error: err.message };
  }
}
