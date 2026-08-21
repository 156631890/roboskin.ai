import { knowledgeGraph } from '@/lib/knowledge-graph';

export const dynamic = 'force-static';

export function GET() {
  return new Response(`${JSON.stringify(knowledgeGraph, null, 2)}\n`, {
    headers: {
      'cache-control': 'public, max-age=0, s-maxage=3600',
      'content-type': 'application/json; charset=utf-8',
    },
  });
}
