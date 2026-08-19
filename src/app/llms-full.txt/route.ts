import { buildLlmsFullText } from '@/lib/llms-full';

export const dynamic = 'force-static';

export function GET() {
  return new Response(buildLlmsFullText(), {
    headers: {
      'cache-control': 'public, max-age=0, s-maxage=3600',
      'content-type': 'text/plain; charset=utf-8',
    },
  });
}
