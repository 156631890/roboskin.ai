import type { NextApiRequest, NextApiResponse } from 'next';
import { createMembershipHandlers } from '@/lib/membership/handlers.mjs';

// Pages API routes stay out of the optional static export; Vercel runs this
// authenticated endpoint only in the production server deployment.
export const config = { maxDuration: 300 };

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    return res.status(405).json({ error: 'Method not allowed.' });
  }
  const response = await createMembershipHandlers().dispatch(new Request('https://roboskin.ai/api/reports-cron', {
    headers: { authorization: req.headers.authorization || '' },
  }));
  response.headers.forEach((value, key) => res.setHeader(key, value));
  return res.status(response.status).send(await response.text());
}
