import { buildExperimentCsv, experimentEvidence } from '@/lib/experiment-evidence.mjs';

export const dynamic = 'force-static';

export function GET() {
  return new Response(buildExperimentCsv(experimentEvidence), {
    headers: {
      'content-type': 'text/csv; charset=utf-8',
      'content-disposition': 'attachment; filename="roboskin-experiment-evidence.csv"',
    },
  });
}
