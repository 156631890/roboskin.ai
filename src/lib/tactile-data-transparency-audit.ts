import { tactileDatasetEntries } from '@/lib/tactile-datasets';

export const tactileDataAuditPath = '/reports/tactile-robotics-data-transparency-audit-2026';
export const tactileDataAuditPublished = '2026-08-27';

export type TactileDataAuditRow = {
  id: string;
  name: string;
  year: number;
  institution: string;
  paperUrl: string;
  datasetUrl: string | null;
  licenseUrl: string | null;
  githubUrl: string | null;
  projectUrl: string | null;
  hasDatasetUrl: boolean;
  hasLicenseUrl: boolean;
  hasCodeRepository: boolean;
  mentionsSamplingRate: boolean;
  mentionsSynchronization: boolean;
  mentionsDataSplit: boolean;
  sourceReviewed: string;
};

const samplingRatePattern = /\b\d+(?:\.\d+)?\s*(?:hz|fps)\b/i;
const synchronizationPattern = /\b(?:synchron(?:ized|ization)?|timestamps?)\b/i;
const dataSplitPattern = /\b(?:train(?:ing)?|validation|test|split)\b/i;

const auditText = (entry: (typeof tactileDatasetEntries)[number]) => [
  entry.sampleCount,
  entry.dataFormat,
  entry.availability,
  ...entry.modalities,
  ...entry.sensor,
].join(' ');

export const tactileDataAuditRows: TactileDataAuditRow[] = tactileDatasetEntries.map((entry) => {
  const text = auditText(entry);

  return {
    id: entry.id,
    name: entry.name,
    year: entry.year,
    institution: entry.institution.join('; '),
    paperUrl: entry.paperUrl,
    datasetUrl: entry.datasetUrl ?? null,
    licenseUrl: entry.licenseUrl ?? null,
    githubUrl: entry.githubUrl ?? null,
    projectUrl: entry.projectUrl ?? null,
    hasDatasetUrl: Boolean(entry.datasetUrl),
    hasLicenseUrl: Boolean(entry.licenseUrl),
    hasCodeRepository: Boolean(entry.githubUrl),
    mentionsSamplingRate: samplingRatePattern.test(text),
    mentionsSynchronization: synchronizationPattern.test(text),
    mentionsDataSplit: dataSplitPattern.test(text),
    sourceReviewed: entry.sourceReviewed,
  };
});

const count = (key: keyof Pick<
  TactileDataAuditRow,
  | 'hasDatasetUrl'
  | 'hasLicenseUrl'
  | 'hasCodeRepository'
  | 'mentionsSamplingRate'
  | 'mentionsSynchronization'
  | 'mentionsDataSplit'
>) => tactileDataAuditRows.filter((row) => row[key]).length;

export const tactileDataAuditSummary = {
  totalRecords: tactileDataAuditRows.length,
  recordsWithDatasetUrl: count('hasDatasetUrl'),
  recordsWithLicenseUrl: count('hasLicenseUrl'),
  recordsWithCodeRepository: count('hasCodeRepository'),
  recordsMentioningSamplingRate: count('mentionsSamplingRate'),
  recordsMentioningSynchronization: count('mentionsSynchronization'),
  recordsMentioningDataSplit: count('mentionsDataSplit'),
  latestSourceReview: tactileDataAuditRows.reduce(
    (latest, row) => row.sourceReviewed > latest ? row.sourceReviewed : latest,
    '',
  ),
};

export const tactileDataAuditMethod = {
  scope:
    'The audit covers every record in the RoboSkin.ai tactile robotics dataset directory on the publication date. It is a bounded editorial sample, not a census of every tactile dataset in existence.',
  rules: [
    'Dataset URL means the reviewed record contains a dedicated dataset or file-hosting URL. It does not prove that every file, revision, or advertised subset is downloadable.',
    'License URL means the record contains a direct URL for the dataset license. A license named only in prose does not pass this stricter machine-verifiable test.',
    'Code repository means the record contains a public GitHub repository URL. It does not establish that the dataset itself or every model weight is licensed under the repository license.',
    'Sampling rate, synchronization, and split signals are deterministic keyword checks over the record’s sample-count, format, availability, modality, and sensor fields. They measure documented disclosure in the reviewed record, not independent validation of the underlying files.',
  ],
  limitations: [
    'RoboSkin.ai did not download and checksum every hosted package for this audit.',
    'A missing signal can mean either that the primary public material did not state it clearly or that the current editorial record has not captured it yet.',
    'A present signal does not establish data quality, calibration quality, benchmark validity, or suitability for a particular robot.',
    'Records differ in scope: some describe released trajectory packages, while others describe research corpora that were not verified as standalone downloads.',
  ],
};

const csvEscape = (value: string | number | boolean | null) => {
  const text = value === null ? '' : String(value);
  return /[",\r\n]/.test(text) ? `"${text.replaceAll('"', '""')}"` : text;
};

const csvColumns: Array<keyof TactileDataAuditRow> = [
  'id',
  'name',
  'year',
  'institution',
  'paperUrl',
  'datasetUrl',
  'licenseUrl',
  'githubUrl',
  'projectUrl',
  'hasDatasetUrl',
  'hasLicenseUrl',
  'hasCodeRepository',
  'mentionsSamplingRate',
  'mentionsSynchronization',
  'mentionsDataSplit',
  'sourceReviewed',
];

export function serializeTactileDataAuditCsv(rows = tactileDataAuditRows) {
  return [
    csvColumns.join(','),
    ...rows.map((row) => csvColumns.map((column) => csvEscape(row[column])).join(',')),
  ].join('\n');
}

export function tactileDataAuditPercent(value: number) {
  if (!tactileDataAuditSummary.totalRecords) return 0;
  return Math.round((value / tactileDataAuditSummary.totalRecords) * 100);
}
