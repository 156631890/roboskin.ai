import { createMembershipHandlers } from '@/lib/membership/handlers.mjs';
export const runtime = 'nodejs';
export const maxDuration = 300;
export const POST = createMembershipHandlers().dispatch;
