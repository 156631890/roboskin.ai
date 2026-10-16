import { createMembershipHandlers } from '@/lib/membership/handlers.mjs';
export const runtime = 'nodejs';
export const maxDuration = 60;
export const POST = createMembershipHandlers().membership;
