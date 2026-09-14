const ALLOWED_MODELS = new Set([
  'llama-3.3-70b-versatile',
  'llama-3.1-8b-instant',
  'qwen/qwen3-32b'
]);

const MAX_MESSAGES = 20;
const MAX_CONTENT_LENGTH = 4000;

function validateMessages(messages) {
  return Array.isArray(messages)
    && messages.length > 0
    && messages.length <= MAX_MESSAGES
    && messages.every((message) =>
      ['system', 'user', 'assistant'].includes(message?.role)
      && typeof message?.content === 'string'
      && message.content.length > 0
      && message.content.length <= MAX_CONTENT_LENGTH
    );
}

export default async function handler(request, response) {
  if (request.method !== 'POST') {
    response.setHeader('Allow', 'POST');
    return response.status(405).json({ error: 'Method not allowed' });
  }

  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    return response.status(503).json({ error: 'AI service is not configured' });
  }

  const { messages, model = 'llama-3.3-70b-versatile', temperature = 0.7 } = request.body || {};
  if (!validateMessages(messages)) {
    return response.status(400).json({ error: 'Invalid messages payload' });
  }
  if (!ALLOWED_MODELS.has(model)) {
    return response.status(400).json({ error: 'Unsupported model' });
  }

  const safeTemperature = Math.min(1.5, Math.max(0, Number(temperature) || 0.7));

  try {
    const upstream = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ model, messages, temperature: safeTemperature, max_tokens: 800 })
    });

    const data = await upstream.json().catch(() => ({}));
    if (!upstream.ok) {
      console.error('Groq upstream request failed', upstream.status);
      return response.status(502).json({ error: 'AI service is temporarily unavailable' });
    }

    const content = data.choices?.[0]?.message?.content || '';
    return response.status(200).json({
      content: content.replace(/<think>[\s\S]*?<\/think>/g, '').trim()
    });
  } catch (error) {
    console.error('Groq proxy failed', error);
    return response.status(502).json({ error: 'AI service is temporarily unavailable' });
  }
}
