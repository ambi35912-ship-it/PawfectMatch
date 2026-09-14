import test from 'node:test';
import assert from 'node:assert/strict';
import { evaluateVaccineRecords, parseValidUntilDate } from '../src/utils/vaccineExpiryEngine.js';

test('parses ISO, month-year, and month-day-year dates', () => {
  assert.equal(parseValidUntilDate('2027-01-15').getFullYear(), 2027);
  assert.equal(parseValidUntilDate('Aug 2027').getDate(), 31);
  assert.equal(parseValidUntilDate('Nov 18, 2027').getDate(), 18);
});

test('rejects missing and malformed dates', () => {
  assert.equal(parseValidUntilDate(''), null);
  assert.equal(parseValidUntilDate('not a date'), null);
});

test('evaluates against the supplied current date instead of a frozen date', () => {
  const report = evaluateVaccineRecords(
    [
      { name: 'Expired', validUntil: 'Aug 2026' },
      { name: 'Soon', validUntil: 'Oct 2026' },
      { name: 'Valid', validUntil: 'Dec 2027' },
      { name: 'Unknown', validUntil: 'unknown' }
    ],
    new Date('2026-09-14T12:00:00Z')
  );

  assert.equal(report.overdueList.length, 2);
  assert.equal(report.expiringSoonList.length, 1);
  assert.equal(report.validList.length, 1);
  assert.equal(report.overdueList[1].computedStatus, 'unknown');
});
