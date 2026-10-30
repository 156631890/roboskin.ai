import test from 'node:test';
import assert from 'node:assert/strict';
import { createTypeScriptLoader } from '../scripts/lib/load-typescript.mjs';
const load=createTypeScriptLoader();
const models=load('src/lib/robot-ai-models.ts').robotAiModelEntries;
const schema=load('src/lib/robot-ai-schema.ts');
const vla=load('src/lib/vla-model-schema.ts');

test('model directory references resolve to one definition on the VLA hub',()=>{
  const refs=schema.buildRobotAiModelDirectoryJsonLd(models)['@graph'];
  assert.equal(refs.some(n=>n['@type']==='CreativeWork'),false);
  const nodes=vla.buildVlaModelIndexJsonLd(models.filter(m=>m.category==='VLA'),[])['@graph'];
  for(const entry of models){
    const id=`https://roboskin.ai/robot-vla-models#model-${entry.id}`;
    const definitions=nodes.filter(n=>n['@id']===id);
    assert.equal(definitions.length,1);
    assert.deepEqual(definitions[0].citation,entry.primarySources.map(s=>s.url));
    assert.equal(definitions[0].abstract,entry.evidenceLimitations);
    assert.ok(refs[0].itemListElement.some(item=>item.item['@id']===id));
  }
});
