import { createHash } from 'node:crypto';
import { execFileSync } from 'node:child_process';
import { readFile } from 'node:fs/promises';

const canonicalOrigin = 'https://roboskin.ai';
const report = JSON.parse(
  await readFile(new URL('../.artifacts/production-verification.json', import.meta.url), 'utf8'),
);
const verifiedAt = new Date(report.verifiedAt).getTime();
const reportAge = Date.now() - verifiedAt;
const currentCommitSha = execFileSync('git', ['rev-parse', 'HEAD'], { encoding: 'utf8' }).trim();

if (!report.ok || report.baseUrl !== canonicalOrigin) {
  throw new Error('IndexNow requires a successful production verification report');
}
if (!Number.isFinite(verifiedAt) || reportAge < 0 || reportAge > 30 * 60 * 1000) {
  throw new Error('Production verification is invalid or older than 30 minutes');
}
if (report.commitSha !== currentCommitSha) {
  throw new Error('Production verification does not match the current Git commit');
}

const [deploymentResponse, sitemapResponse] = await Promise.all([
  fetch(`${canonicalOrigin}/deployment.json`, { signal: AbortSignal.timeout(15_000) }),
  fetch(`${canonicalOrigin}/sitemap.xml`, { signal: AbortSignal.timeout(15_000) }),
]);
if (!deploymentResponse.ok || !sitemapResponse.ok) {
  throw new Error('Could not revalidate the live production identity');
}
const [deployment, sitemapXml] = await Promise.all([
  deploymentResponse.json(),
  sitemapResponse.text(),
]);
const liveSitemapSha256 = createHash('sha256').update(sitemapXml).digest('hex');
if (deployment.commitSha !== report.commitSha || liveSitemapSha256 !== report.sitemapSha256) {
  throw new Error('Production changed after verification; run verify-production again');
}

const key = (await readFile(new URL('../public/indexnow-key.txt', import.meta.url), 'utf8')).trim();
if (!/^[a-f0-9]{32}$/.test(key)) {
  throw new Error('IndexNow key is missing or invalid');
}

const requestedPaths = process.argv.slice(2);
if (requestedPaths.length === 0) {
  throw new Error('Pass at least one changed public path beginning with /');
}

const urlList = [...new Set(requestedPaths.map((pathname) => {
  const url = new URL(pathname, canonicalOrigin);
  if (!pathname.startsWith('/') || pathname.startsWith('//') || url.origin !== canonicalOrigin || url.search || url.hash) {
    throw new Error(`IndexNow path must be a canonical roboskin.ai pathname: ${pathname}`);
  }
  if (!report.verifiedPaths?.includes(pathname)) {
    throw new Error(`IndexNow path was not included in production verification: ${pathname}`);
  }
  return url.href;
}))];

const response = await fetch('https://api.indexnow.org/indexnow', {
  method: 'POST',
  headers: { 'content-type': 'application/json; charset=utf-8' },
  body: JSON.stringify({
    host: 'roboskin.ai',
    key,
    keyLocation: 'https://roboskin.ai/indexnow-key.txt',
    urlList,
  }),
  signal: AbortSignal.timeout(15_000),
});

if (!response.ok) {
  throw new Error(`IndexNow rejected ${urlList.length} URLs with status ${response.status}`);
}

console.log(`IndexNow accepted ${urlList.length} URLs with status ${response.status}`);
