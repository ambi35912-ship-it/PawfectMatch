export const getGroqApiKey = () => {
  try {
    if (typeof import.meta !== 'undefined' && import.meta.env?.VITE_GROQ_API_KEY) {
      return import.meta.env.VITE_GROQ_API_KEY;
    }
  } catch (e) {}
  return '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';
};

/**
 * Fast Cloud AI Chat completion powered by Groq
 * @param {Array} messages - Array of { role: 'system'|'user'|'assistant', content: string }
 * @param {string} model - e.g. 'llama-3.3-70b-versatile' or 'llama-3.1-8b-instant'
 */
export async function queryGroqChat({ messages, model = 'qwen/qwen3.6-27b', temperature = 0.7 }) {
  const apiKey = getGroqApiKey();
  if (!apiKey) {
    throw new Error('Groq API key not found');
  }

  const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      model,
      messages,
      temperature,
      max_tokens: 800
    })
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Groq API error (${response.status}): ${errorText}`);
  }

  const data = await response.json();
  let content = data.choices?.[0]?.message?.content || '';
  // Strip reasoning <think> blocks if present
  content = content.replace(/<think>[\s\S]*?<\/think>/g, '').trim();
  return content;
}
