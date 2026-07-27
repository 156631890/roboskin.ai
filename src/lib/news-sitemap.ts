import { newsPosts } from '@/lib/news-data';

const newsWindowMilliseconds = 2 * 24 * 60 * 60 * 1000;

export function getRecentNewsPosts(now = Date.now()) {
  const cutoff = now - newsWindowMilliseconds;
  return newsPosts.filter(
    (post) => new Date(`${post.date}T00:00:00Z`).getTime() >= cutoff,
  );
}
