const operations = new Set([
  'membership', 'webhook', 'dispatch',
  'dispatch.subscription.refresh', 'dispatch.subscription.access',
  'dispatch.delivery.prepare', 'dispatch.delivery.lease',
  'dispatch.delivery.send', 'dispatch.delivery.confirm',
]);
const errorTypes = new Set(['Error', 'TypeError', 'AggregateError', 'AbortError', 'TimeoutError', 'DatabaseError', 'error']);
const databaseCodes = new Set([
  '08000', '08001', '08003', '08004', '08006', '08007', '08P01',
  '28000', '28P01', '3D000', '3F000', '42P01', '42703', '42501',
  '53300', '53400', '57014', '57P01', '57P02', '57P03',
  '40001', '40P01', '23502', '23503', '23505', '23514',
]);
const networkCodes = new Set([
  'ECONNRESET', 'ECONNREFUSED', 'ETIMEDOUT', 'EAI_AGAIN', 'ENOTFOUND',
  'EHOSTUNREACH', 'ENETUNREACH', 'EPIPE', 'UND_ERR_CONNECT_TIMEOUT',
  'UND_ERR_HEADERS_TIMEOUT', 'UND_ERR_BODY_TIMEOUT', 'UND_ERR_SOCKET',
  'CERT_HAS_EXPIRED', 'DEPTH_ZERO_SELF_SIGNED_CERT', 'UNABLE_TO_VERIFY_LEAF_SIGNATURE',
  'ERR_TLS_CERT_ALTNAME_INVALID', 'ERR_SSL_WRONG_VERSION_NUMBER',
]);

// Payment, database and mail errors can contain credentials, SQL parameters or
// customer data. Never log their messages, stacks, response bodies or request data.
export function reportMembershipFailure(operation, error) {
  const diagnostic = { operation: operations.has(operation) ? operation : 'unknown', category: 'unknown', errorType: 'Error' };
  const visited = new Set();
  let current = error;
  for (let depth = 0; depth < 4 && current && !visited.has(current); depth++) {
    visited.add(current);
    try {
      const name = current.name;
      const code = current.code;
      if (errorTypes.has(name)) diagnostic.errorType = name;
      if (!diagnostic.code && (databaseCodes.has(code) || networkCodes.has(code))) {
        diagnostic.code = code;
        diagnostic.category = databaseCodes.has(code) ? 'database' : 'network';
      }
      const status = current.status ?? current.statusCode;
      if (!diagnostic.httpStatus && Number.isInteger(status) && status >= 400 && status <= 599) {
        diagnostic.httpStatus = status;
        if (diagnostic.category === 'unknown') diagnostic.category = 'http';
      }
      current = current.cause;
    } catch {
      // A malformed provider error must not replace the original failure response.
      break;
    }
  }
  console.error('Paid reports operation failed.', diagnostic);
}
