export const evidenceBatch = '2026-09-12-evidence-sensors';
export const newsletterBatch = '2026-09-12-newsletter';
export const tactileAiGrowthBatch = '2026-09-12-tactile-ai-expansion';

const evidencePaths = new Set(['/benchmarks', '/sensors', '/sensors/digit', '/sensors/gelsight-mini', '/sensors/reskin']);

/** @param {string} pathname */
export function growthBatchForPath(pathname) {
  if (pathname === '/tactile-ai') return tactileAiGrowthBatch;
  return evidencePaths.has(pathname) ? evidenceBatch : 'existing-site';
}
