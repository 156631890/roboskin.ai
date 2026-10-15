import { tactileDatasetEntries, tactileDatasetCandidates } from '@/lib/tactile-datasets';
import { datasetAudit, getDatasetEvidence, summarizeDatasetEvidence } from '@/lib/dataset-evidence.mjs';
import { datasetSelectionReviewed, getDatasetSelection } from '@/lib/dataset-selection.mjs';

export const dynamic = 'force-static';
export function GET() {
  return Response.json({ ...datasetAudit, snapshot: `/releases/datasets/${datasetAudit.version}.json`, count: tactileDatasetEntries.length,
    candidates: tactileDatasetCandidates.map(entry => ({ ...entry, directoryRecordUrl: `https://roboskin.ai/datasets#candidate-${entry.id}` })),
    statistics: summarizeDatasetEvidence(tactileDatasetEntries),
    selectionGuidanceReviewed: datasetSelectionReviewed,
    entries: tactileDatasetEntries.map(entry => ({ ...entry, evidence: getDatasetEvidence(entry), selectionGuidance: getDatasetSelection(entry), directoryRecordUrl: `https://roboskin.ai/datasets#dataset-${entry.id}` })),
  });
}
