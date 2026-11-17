import test from 'node:test';
import assert from 'node:assert/strict';
import { reportMembershipFailure } from '../src/lib/membership/diagnostics.mjs';

test('failure diagnostics retain known database and network codes without private error details', t => {
  const log = t.mock.method(console, 'error', () => {});
  const databaseError = Object.assign(new Error('password=PRIVATE_PASSWORD user=member@example.org'), {
    code: '42P01', query: 'SELECT PRIVATE_REPORT FROM private_table', parameters: ['PRIVATE_TOKEN'],
  });
  reportMembershipFailure('dispatch', databaseError);
  assert.deepEqual(log.mock.calls[0].arguments, ['Paid reports operation failed.', {
    operation: 'dispatch', category: 'database', errorType: 'Error', code: '42P01',
  }]);

  const networkError = Object.assign(new Error('postgres://user:PRIVATE_PASSWORD@private-host/db'), { code: 'ECONNRESET' });
  const wrapper = new TypeError('fetch failed for member@example.org', { cause: networkError });
  networkError.cause = wrapper;
  reportMembershipFailure('dispatch.subscription.refresh', wrapper);
  assert.equal(log.mock.calls[1].arguments[1].code, 'ECONNRESET');
  assert.equal(log.mock.calls[1].arguments[1].category, 'network');
  assert.doesNotMatch(JSON.stringify(log.mock.calls.map(call => call.arguments)), /PRIVATE_|member@example|private-host|private_table|postgres:/);
});

test('failure diagnostics reject arbitrary operation, type, code and status strings', t => {
  const log = t.mock.method(console, 'error', () => {});
  reportMembershipFailure('member@example.org', {
    name: 'PRIVATE_TYPE', code: 'PRIVATE_TOKEN', status: 'PRIVATE_STATUS',
    message: 'PRIVATE_MESSAGE', stack: 'PRIVATE_STACK', response: { body: 'PRIVATE_BODY' },
  });
  assert.deepEqual(log.mock.calls[0].arguments[1], { operation: 'unknown', category: 'unknown', errorType: 'Error' });
});

test('failure diagnostics preserve numeric provider HTTP status and tolerate malformed errors', t => {
  const log = t.mock.method(console, 'error', () => {});
  reportMembershipFailure('dispatch.delivery.send', Object.assign(new Error('PRIVATE_MESSAGE'), { status: 429 }));
  assert.deepEqual(log.mock.calls[0].arguments[1], {
    operation: 'dispatch.delivery.send', category: 'http', errorType: 'Error', httpStatus: 429,
  });
  reportMembershipFailure('webhook', { get name() { throw new Error('PRIVATE_MESSAGE'); } });
  reportMembershipFailure('membership', undefined);
  assert.equal(log.mock.calls.length, 3);
  assert.doesNotMatch(JSON.stringify(log.mock.calls.map(call => call.arguments)), /PRIVATE_MESSAGE/);
});
