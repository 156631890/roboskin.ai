export const evidenceBatch = '2026-09-12-evidence-sensors';
export const newsletterBatch = '2026-09-12-newsletter';
export const tactileAiGrowthBatch = '2026-09-12-tactile-ai-expansion';
export const vlaGrowthBatch = '2026-09-15-vla-search-intent';

const evidencePaths = new Set(['/benchmarks', '/sensors', '/sensors/digit', '/sensors/gelsight-mini', '/sensors/reskin']);

/** @param {string} pathname */
export function growthBatchForPath(pathname) {
  if (['/research/univtac-platform-encoder-benchmark-2026', '/robot-teleoperation', '/robot-learning'].includes(pathname)) return '2026-09-19-search-resource-access';
  if (['/research/slipsense-multimodal-slip-detection-2026', '/research/touch2trace-tactile-cable-tracing-2026', '/research/visible-touch-contact-overlays-visuomotor-policies-2026'].includes(pathname)) return '2026-09-19-tactile-method-reviews';
  if (pathname === '/robot-vla-models') return vlaGrowthBatch;
  if (['/robotics-programming', '/guides/ros2-tactile-sensing', '/guides/python-tactile-data-processing', '/guides/lerobot-dataset-format', '/guides/tactile-sensor-calibration'].includes(pathname)) return 'programming-2026-09-16';
  if (pathname === '/tactile-ai') return tactileAiGrowthBatch;
  return evidencePaths.has(pathname) ? evidenceBatch : 'existing-site';
}
