import { researchIndexEntries, researchIndexUpdatedAt } from '@/lib/research-index';

export const dynamic = 'force-static';

export function GET() {
  return new Response(JSON.stringify({
    name: 'RoboSkin Tactile Research Index',
    updated: researchIndexUpdatedAt,
    count: researchIndexEntries.length,
    entries: researchIndexEntries,
  }), {
    headers: { 'content-type': 'application/json; charset=utf-8' },
  });
}
