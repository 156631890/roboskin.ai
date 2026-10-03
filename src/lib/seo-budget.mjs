// Project audit thresholds (Ahrefs), not Google ranking requirements.
export const SEO_TITLE_SUFFIX = ' | RoboSkin.ai';
export const SEO_TITLE_TEMPLATE = `%s${SEO_TITLE_SUFFIX}`;
export const SEO_BUDGET = Object.freeze({ title: 70, description: 160 });
// Exact URL + field + text + reason + reviewer/date only. No blanket exemptions.
export const SEO_LENGTH_EXCEPTIONS = Object.freeze([]);
export const normalizeSeoText = (value) => String(value ?? '').replace(/\s+/gu, ' ').trim();
// Count Unicode code points, not UTF-16 units. HTML entities must be decoded by the DOM first.
export const seoLength = (value) => [...normalizeSeoText(value)].length;
export const finalSeoTitle = (title) => `${title}${SEO_TITLE_SUFFIX}`;
export function resolveArticleSeo(post) {
  return { title: post.seoTitle ?? post.title, description: post.seoDescription ?? post.excerpt };
}
export function seoLengthIssues(path, title, description, exceptions = SEO_LENGTH_EXCEPTIONS) {
  return Object.entries({ title, description }).flatMap(([field, value]) => {
    const length = seoLength(value);
    const limit = SEO_BUDGET[field];
    if (!length) return [{ path, field, length, limit, reason: 'missing SEO field or fallback' }];
    if (length <= limit) return [];
    const exception = exceptions.find((item) => item.path === path && item.field === field
      && item.value === value && item.reason?.trim() && item.reviewedBy?.trim()
      && /^\d{4}-\d{2}-\d{2}$/.test(item.reviewedAt ?? ''));
    return [{ path, field, length, limit, reason: `${field} exceeds ${limit} code points`, ...(exception ? { exception } : {}) }];
  });
}
export function assertSeoBudget(path, fields) {
  const issues = seoLengthIssues(path, finalSeoTitle(fields.title ?? ''), fields.description)
    .filter((issue) => !issue.exception);
  if (!normalizeSeoText(fields.title)) issues.push({ field: 'title', reason: 'missing SEO field or fallback' });
  if (issues.length) throw new Error(`SEO publication blocked: ${path}: ${issues.map((i) => `${i.field} ${i.length ?? 0}: ${i.reason}`).join('; ')}. Rewrite SEO fields; do not truncate.`);
  return fields;
}
