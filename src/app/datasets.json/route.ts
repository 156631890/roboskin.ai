import { tactileDatasetEntries } from '@/lib/tactile-datasets';
import { datasetAudit, getDatasetEvidence, summarizeDatasetEvidence } from '@/lib/dataset-evidence.mjs';

export const dynamic = 'force-static';
export function GET() {
  return Response.json({ ...datasetAudit, snapshot: `/releases/datasets/${datasetAudit.version}.json`, count: tactileDatasetEntries.length,
    statistics: summarizeDatasetEvidence(tactileDatasetEntries),
    entries: tactileDatasetEntries.map(entry => ({ ...entry, evidence: getDatasetEvidence(entry), directoryRecordUrl: `https://roboskin.ai/datasets#dataset-${entry.id}` })),
  });
}
