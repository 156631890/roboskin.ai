import { researchIndexEntries, researchIndexUpdatedAt } from '@/lib/research-index';
import { researchIndexRelease } from '@/lib/research-index-release';

export const dynamic = 'force-static';

export function GET() {
  return new Response(JSON.stringify({
    name: 'RoboSkin Tactile Research Index',
    updated: researchIndexUpdatedAt,
    version: researchIndexRelease.version,
    license: researchIndexRelease.licenseUrl,
    repository: researchIndexRelease.repositoryUrl,
    release: researchIndexRelease.releaseUrl,
    citation: researchIndexRelease.citation,
    count: researchIndexEntries.length,
    entries: researchIndexEntries,
  }), {
    headers: { 'content-type': 'application/json; charset=utf-8' },
  });
}
