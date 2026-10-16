import { createMembershipHandlers } from '@/lib/membership/handlers.mjs';
export const runtime = 'nodejs';
export const maxDuration = 10;
export const POST = createMembershipHandlers().webhook;
