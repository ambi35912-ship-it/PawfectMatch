import test from 'node:test';
import assert from 'node:assert/strict';
import handler from '../api/groq-chat.js';

function responseRecorder() {
  return {
    statusCode: null,
    body: null,
    headers: {},
    setHeader(name, value) { this.headers[name] = value; },
    status(code) { this.statusCode = code; return this; },
    json(body) { this.body = body; return this; }
  };
}

test('AI proxy rejects unsupported methods', async () => {
  const response = responseRecorder();
  await handler({ method: 'GET' }, response);
  assert.equal(response.statusCode, 405);
  assert.equal(response.headers.Allow, 'POST');
});

test('AI proxy fails closed when the server credential is absent', async () => {
  const previousKey = process.env.GROQ_API_KEY;
  delete process.env.GROQ_API_KEY;
  const response = responseRecorder();

  await handler({ method: 'POST', body: { messages: [{ role: 'user', content: 'Hello' }] } }, response);
  assert.equal(response.statusCode, 503);

  if (previousKey) process.env.GROQ_API_KEY = previousKey;
});
