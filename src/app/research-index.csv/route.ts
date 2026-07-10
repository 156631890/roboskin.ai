import { researchIndexEntries, serializeResearchIndexCsv } from '@/lib/research-index';

export const dynamic = 'force-static';

export function GET() {
  return new Response(serializeResearchIndexCsv(researchIndexEntries), {
    headers: {
      'content-type': 'text/csv; charset=utf-8',
      'content-disposition': 'inline; filename="roboskin-tactile-research-index.csv"',
    },
  });
}
