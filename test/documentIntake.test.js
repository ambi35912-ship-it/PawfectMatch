import test from 'node:test';
import assert from 'node:assert/strict';
import { MAX_FILE_SIZE, prepareVeterinaryDocument } from '../src/utils/documentIntake.js';

test('accepts and fingerprints a supported document without claiming verification', async () => {
  const file = new File(['certificate'], 'certificate.pdf', { type: 'application/pdf' });
  const result = await prepareVeterinaryDocument(file);

  assert.equal(result.success, true);
  assert.equal(result.reviewStatus, 'pending');
  assert.equal(result.checksum.length, 64);
  assert.equal('confidence' in result, false);
});

test('rejects unsupported or oversized files', async () => {
  const textFile = new File(['nope'], 'certificate.txt', { type: 'text/plain' });
  await assert.rejects(() => prepareVeterinaryDocument(textFile), /PDF, JPEG, PNG, or WebP/);

  const oversized = { name: 'large.pdf', type: 'application/pdf', size: MAX_FILE_SIZE + 1 };
  await assert.rejects(() => prepareVeterinaryDocument(oversized), /10 MB/);
});
