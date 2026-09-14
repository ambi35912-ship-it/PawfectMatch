/**
 * Calls the same-origin server endpoint so provider credentials never reach the
 * browser bundle. Configure GROQ_API_KEY in the deployment environment.
 */
export async function queryGroqChat({ messages, model = 'llama-3.3-70b-versatile', temperature = 0.7 }) {
  const response = await fetch('/api/groq-chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ messages, model, temperature })
  });

  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(data.error || `AI service error (${response.status})`);
  }

  return data.content || '';
}
