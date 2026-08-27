import { serializeTactileDataAuditCsv } from '@/lib/tactile-data-transparency-audit';

export const dynamic = 'force-static';

export function GET() {
  return new Response(serializeTactileDataAuditCsv(), {
    headers: {
      'content-type': 'text/csv; charset=utf-8',
      'content-disposition': 'inline; filename="roboskin-tactile-data-transparency-audit-2026.csv"',
    },
  });
}
