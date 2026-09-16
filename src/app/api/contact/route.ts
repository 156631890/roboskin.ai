import { createFormHandlers } from '@/lib/form-handlers.mjs';

// Includes intendedUse / budgetSignal and the complete commercial-research payload.
// Static exports keep the explicit draft fallback; this route requires a server runtime.
export const runtime = 'nodejs';
export const POST = createFormHandlers().contact;
