import { researchIndexEntries } from '@/lib/research-index';

export const dynamic = 'force-static';

export function GET() {
  return new Response(JSON.stringify({
    name: 'RoboSkin Tactile Research Index',
    updated: '2026-07-10',
    count: researchIndexEntries.length,
    entries: researchIndexEntries,
  }), {
    headers: { 'content-type': 'application/json; charset=utf-8' },
  });
}
