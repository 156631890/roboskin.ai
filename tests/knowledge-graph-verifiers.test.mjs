import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const root = new URL('../', import.meta.url);
const read = (path) => readFile(new URL(path, root), 'utf8');

test('export and production verifiers enforce knowledge graph v2 evidence relations', async () => {
  const verifiers = await Promise.all([
    read('scripts/verify-export.mjs'),
    read('scripts/verify-production.mjs'),
  ]);

  for (const verifier of verifiers) {
    assert.match(verifier, /researchProvenanceRelations = \['sourceAffiliation', 'partOf', 'usesSensor', 'usesRobot'\]/);
    assert.match(verifier, /researchSemanticRelations = \['introduces', 'describesDataset', 'usesDataset', 'trainedOn', 'evaluatedBy'\]/);
    assert.match(verifier, /relationVocabulary/);
    assert.match(verifier, /evidenceBackedRelations/);
    assert.match(verifier, /fromEntity\?\.primarySourceIds\?\.includes\(sourceId\)/);
    assert.match(verifier, /edge\.sourceLabels\.some/);
    assert.match(verifier, /edge\.evidenceBoundary\.trim\(\)\.length === 0/);
    assert.match(verifier, /edge\.sourceEmbodimentLabels\.some/);
    for (const countField of [
      'researchRelationEdges',
      'researchProvenanceEdges',
      'researchSemanticEdges',
      'sourceAffiliationEdges',
      'organizationHierarchyEdges',
      'datasetUsageEdges',
      'paperSensorUsageEdges',
      'usesSensorEdges',
      'usesRobotEdges',
      'introducesEdges',
      'describesDatasetEdges',
      'usesDatasetEdges',
      'trainedOnEdges',
      'evaluatedByEdges',
    ]) {
      assert.match(verifier, new RegExp(countField));
    }
    assert.match(verifier, /\+ graph\.counts\?*\.researchRelationEdges/);
    assert.match(verifier, /graph\.counts\?*\.researchIndex/);
    assert.doesNotMatch(verifier, /Dataset records: 12|Benchmark records: 9|organization records: 12/);
  }
});

test('RSS and production status reflect the current generated artifacts', async () => {
  const [exportVerifier, productionVerifier] = await Promise.all([
    read('scripts/verify-export.mjs'),
    read('scripts/verify-production.mjs'),
  ]);

  assert.match(exportVerifier, /rssItems\.length !== 49[\s\S]*?rssLinks\.length !== 50[\s\S]*?rssGuids\.length !== 49/);
  assert.match(productionVerifier, /rssItems\.length !== 49[\s\S]*?rssLinks\.length !== 50[\s\S]*?rssGuids\.length !== 49/);
  assert.match(productionVerifier, /\$\{indexData\.entries\.length\} research records/);
  assert.match(productionVerifier, /\$\{rssItems\.length\} RSS items/);
  assert.doesNotMatch(productionVerifier, /23 research records|46 RSS items|47 RSS items/);
});
