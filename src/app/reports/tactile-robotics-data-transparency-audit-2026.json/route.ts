import {
  tactileDataAuditMethod,
  tactileDataAuditPublished,
  tactileDataAuditRows,
  tactileDataAuditSummary,
} from '@/lib/tactile-data-transparency-audit';

export const dynamic = 'force-static';

export function GET() {
  return new Response(JSON.stringify({
    name: 'RoboSkin Tactile Robotics Dataset Transparency Audit 2026',
    published: tactileDataAuditPublished,
    generatedFrom: 'https://roboskin.ai/datasets',
    method: tactileDataAuditMethod,
    summary: tactileDataAuditSummary,
    count: tactileDataAuditRows.length,
    entries: tactileDataAuditRows,
  }), {
    headers: { 'content-type': 'application/json; charset=utf-8' },
  });
}
