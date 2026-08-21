import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const root = new URL('../', import.meta.url);
const read = (path) => readFile(new URL(path, root), 'utf8');

const relationSource = await read('src/lib/research-entity-relations.ts');
const graphSource = await read('src/lib/knowledge-graph.ts');
const llmsSource = await read('src/lib/llms-full.ts');
const contract = JSON.parse(await read('config/knowledge-graph-contract.json'));

const arrayBody = (source, exportName) => {
  const match = source.match(new RegExp(`export const ${exportName}[^=]*= \\[([\\s\\S]*?)\\n\\];`));
  assert.ok(match, `${exportName} must remain an explicit, reviewable inventory`);
  return match[1];
};

test('the first knowledge graph v2 batch is exactly thirteen reviewed relations', () => {
  const paperSensorBody = arrayBody(relationSource, 'researchPaperSensorRelations');
  const semanticBody = arrayBody(relationSource, 'researchSemanticRelations');

  assert.equal((paperSensorBody.match(/\n\s*\{/g) ?? []).length, 2);
  assert.equal((semanticBody.match(/\n\s*\{/g) ?? []).length, 11);
  assert.equal(
    (paperSensorBody.match(/\n\s*\{/g) ?? []).length
      + (semanticBody.match(/\n\s*\{/g) ?? []).length,
    13,
  );

  assert.match(paperSensorBody, /fromId: 'genforce-transferable-force-sensing-2026'[\s\S]*?toId: 'tactip'/);
  assert.match(paperSensorBody, /fromId: 'genforce-transferable-force-sensing-2026'[\s\S]*?toId: 'uskin'/);
  assert.doesNotMatch(paperSensorBody, /gelsight-mini|digit-?360/);
  assert.match(paperSensorBody, /https:\/\/www\.nature\.com\/articles\/s41467-026-68753-1/g);

  assert.equal((semanticBody.match(/relation: 'introduces'/g) ?? []).length, 8);
  assert.equal((semanticBody.match(/relation: 'describesDataset'/g) ?? []).length, 2);
  assert.equal((semanticBody.match(/relation: 'evaluatedBy'/g) ?? []).length, 1);
  assert.equal((semanticBody.match(/relation: 'usesDataset'/g) ?? []).length, 0);
  assert.equal((semanticBody.match(/relation: 'trainedOn'/g) ?? []).length, 0);

  for (const pattern of [
    /relation: 'introduces'[\s\S]*?fromId: 'softvtbench-deformation-aware-visuo-tactile-dataset-2026'[\s\S]*?toType: 'dataset'[\s\S]*?toId: 'softvtbench'/,
    /relation: 'introduces'[\s\S]*?fromId: 'softvtbench-deformation-aware-visuo-tactile-dataset-2026'[\s\S]*?toType: 'benchmark'[\s\S]*?toId: 'softvtbench'/,
    /relation: 'describesDataset'[\s\S]*?fromId: 'ht-bench-full-hand-tactile-representations-2026'[\s\S]*?toId: 'ht-bench'/,
    /relation: 'introduces'[\s\S]*?fromId: 'ht-bench-full-hand-tactile-representations-2026'[\s\S]*?toType: 'benchmark'[\s\S]*?toId: 'ht-bench'/,
    /relation: 'introduces'[\s\S]*?fromId: 'tactidex-tactile-guided-dexterous-benchmark-2026'[\s\S]*?toType: 'dataset'[\s\S]*?toId: 'tactidex'/,
    /relation: 'introduces'[\s\S]*?fromId: 'tactidex-tactile-guided-dexterous-benchmark-2026'[\s\S]*?toType: 'benchmark'[\s\S]*?toId: 'tactidex'/,
    /relation: 'introduces'[\s\S]*?fromId: 'freetacman-robot-free-visuotactile-data-collection-2025'[\s\S]*?toId: 'freetacman'[\s\S]*?https:\/\/arxiv\.org\/abs\/2506\.01941/,
    /relation: 'describesDataset'[\s\S]*?fromId: 'sparsh-x-multisensory-touch-representations-2025'[\s\S]*?toId: 'sparsh-x'/,
    /relation: 'introduces'[\s\S]*?fromId: 'humanoid-visual-tactile-action-dataset-2025'[\s\S]*?toId: 'humanoid-vta'/,
    /relation: 'introduces'[\s\S]*?fromId: 'dream-tac-tactile-world-action-model-2026'[\s\S]*?toId: 'dream-tac'/,
    /relation: 'evaluatedBy'[\s\S]*?fromId: 'sparsh'[\s\S]*?toId: 'tacbench'/,
  ]) {
    assert.match(semanticBody, pattern);
  }

  assert.doesNotMatch(semanticBody, /relation: 'usesDataset'|relation: 'trainedOn'|toId: 'franka-emika-panda'|toId: 'gelsight-mini'/);
  assert.match(semanticBody, /original v1 stated that a large-scale dataset had not yet been released/);
});

test('relation vocabulary constrains every v2 endpoint pair', () => {
  assert.match(relationSource, /relation: 'introduces'[\s\S]*?fromTypes: \['paper'\][\s\S]*?toTypes: \['model', 'dataset', 'benchmark'\]/);
  assert.match(relationSource, /relation: 'describesDataset'[\s\S]*?fromTypes: \['paper'\][\s\S]*?toTypes: \['dataset'\]/);
  assert.match(relationSource, /relation: 'usesDataset'[\s\S]*?fromTypes: \['model'\][\s\S]*?toTypes: \['dataset'\]/);
  assert.match(relationSource, /relation: 'trainedOn'[\s\S]*?fromTypes: \['model'\][\s\S]*?toTypes: \['dataset'\]/);
  assert.match(relationSource, /relation: 'evaluatedBy'[\s\S]*?fromTypes: \['model'\][\s\S]*?toTypes: \['benchmark'\]/);
  assert.match(relationSource, /relation: 'usesSensor'[\s\S]*?fromTypes: \['paper', 'dataset'\][\s\S]*?toTypes: \['sensor'\]/);
  assert.match(relationSource, /type UsesDatasetRelation =[\s\S]*?fromType: 'model'[\s\S]*?toType: 'dataset'/);
  assert.match(relationSource, /Research-entity relation .* references a missing source entity/);
  assert.match(relationSource, /references a missing or unsupported target entity|references a missing model or (?:dataset|benchmark)/);
});

test('graph contract and GEO export expose relation counts and evidence boundaries', () => {
  assert.equal(contract.version, '2.0.0');
  assert.deepEqual(
    {
      researchRelationEdges: contract.counts.researchRelationEdges,
      researchProvenanceEdges: contract.counts.researchProvenanceEdges,
      researchSemanticEdges: contract.counts.researchSemanticEdges,
      paperSensorUsageEdges: contract.counts.paperSensorUsageEdges,
      introducesEdges: contract.counts.introducesEdges,
      describesDatasetEdges: contract.counts.describesDatasetEdges,
      usesDatasetEdges: contract.counts.usesDatasetEdges,
      trainedOnEdges: contract.counts.trainedOnEdges,
      evaluatedByEdges: contract.counts.evaluatedByEdges,
    },
    {
      researchRelationEdges: 57,
      researchProvenanceEdges: 46,
      researchSemanticEdges: 11,
      paperSensorUsageEdges: 2,
      introducesEdges: 8,
      describesDatasetEdges: 2,
      usesDatasetEdges: 0,
      trainedOnEdges: 0,
      evaluatedByEdges: 1,
    },
  );

  assert.match(graphSource, /relationVocabulary: researchEntityRelationVocabulary\.map/);
  assert.match(graphSource, /evidenceSourceIds: relation\.evidenceUrls[\s\S]*?sourceId\(normalizeSourceUrl\(url\)\)/);
  assert.match(graphSource, /sourceLabels: \[\.\.\.relation\.sourceLabels\]/);
  assert.match(graphSource, /evidenceBoundary: relation\.evidenceBoundary/);
  assert.match(llmsSource, /## Knowledge Graph v2 Relationship Vocabulary/);
  assert.match(llmsSource, /## Evidence-Backed Research Entity Relations/);
  assert.match(llmsSource, /- Relationship evidence: \$\{relation\.evidenceUrls\.join/);
  assert.match(llmsSource, /- Source wording: \$\{list\(relation\.sourceLabels\)\}/);
  assert.match(llmsSource, /- Evidence boundary: \$\{compact\(relation\.evidenceBoundary\)\}/);
});
