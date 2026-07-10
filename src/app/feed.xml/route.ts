import { buildRssFeed } from '@/lib/feed';

export const dynamic = 'force-static';

export function GET() {
  return new Response(buildRssFeed(), {
    headers: { 'content-type': 'application/rss+xml; charset=utf-8' },
  });
}
