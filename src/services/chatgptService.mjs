import OpenAI from 'openai';

// Create an instance of the new OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // ensure you have this in .env
});

/**
 * Analyze an array of news articles with GPT-4
 * @param {Array} newsArray - [{ title: "...", snippet: "..." }, ...]
 * @returns {Object} { analysis: string } or { error: string }
 */
export async function analyzeNews(newsArray) {
  if (!process.env.OPENAI_API_KEY) {
    return { error: 'No OpenAI API key provided' };
  }
  if (!Array.isArray(newsArray) || newsArray.length === 0) {
    return { error: 'No valid news articles provided' };
  }

  // Combine articles into a single prompt
  const newsText = newsArray.map((item, i) => 
    `Article #${i + 1}:\nTitle: ${item.title}\nSnippet: ${item.snippet}\n`
  ).join('\n');

  const prompt = `
    You are an AI analyzing multiple crypto news articles:

    ${newsText}

    Provide:
    1) A short combined summary (max 3 sentences).
    2) A sentiment score from -5 (very negative) to +5 (very positive).
    3) Note if there's any hack, major partnership, or exchange listing.
  `;

  try {
    // Create a chat completion
    const response = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content: 'You are an AI specialized in summarizing crypto news.'
        },
        { role: 'user', content: prompt }
      ],
      max_tokens: 300
    });

    const assistantMsg = response.choices[0].message.content;
    return { analysis: assistantMsg };
  } catch (err) {
    console.error('OpenAI analyzeNews error:', err.message);
    return { error: err.message };
  }
}

/**
 * Analyze a single snippet
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

    Summarize in 3 sentences,
    give a sentiment rating (-5 to +5),
    and note any unusual or noteworthy info.
  `;

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content: 'You are an AI specialized in summarizing user snippets.'
        },
        { role: 'user', content: prompt }
      ],
      max_tokens: 300
    });

    const assistantMsg = response.choices[0].message.content;
    return { analysis: assistantMsg };
  } catch (err) {
    console.error('OpenAI analyzeSnippet error:', err.message);
    return { error: err.message };
  }
}
