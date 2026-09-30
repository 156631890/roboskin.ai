export type Modality = 'vision' | 'touch' | 'proprioception' | 'action' | 'reward' | 'latent';
export type ReleaseStatus = 'released' | 'announced' | 'none' | 'unknown';
export type AuthorCheck = 'not-contacted' | 'contacted' | 'confirmed' | 'corrected';
/** A: real robot + released code; B: real robot + explicitly unreleased code;
 * C: simulation only; D: evidence insufficient for A/B/C, including unknown code status.
 * These labels describe evidence availability, not model quality or replication.
 */
export type EvidenceLevel = 'A' | 'B' | 'C' | 'D';

export interface TrackerEntry {
  id: string;
  name: string;
  paperTitle: string | null;
  sourceUrl: string;
  /** First paper submission date, not the latest revision or tracker ingestion date. */
  releaseDate: string | null;
  institutions: string[];
  /** Predicted outputs only; latent can coexist with the modality represented. */
  predicts: Modality[];
  tactileSensor: string | null;
  robotPlatform: string | null;
  realRobotEval: {
    has: boolean | null;
    taskCount: number | null;
    /** Per policy, task and evaluation condition; null if the split is undisclosed. */
    rolloutsPerSetting: number | null;
  };
  openSource: {
    code: ReleaseStatus;
    data: ReleaseStatus;
    weights: ReleaseStatus;
    /** Scope must be explicit; an article license is not an artifact license. */
    license: string | null;
  };
  evidenceLevel: EvidenceLevel;
  verdict: string;
  briefUrl: string | null;
  sources: string[];
  lastVerified: string;
  authorCheck: AuthorCheck;
}
