import Link from 'next/link';
import type { ReactNode } from 'react';
import { tactileSensorEntries } from '@/lib/tactile-sensors';
import { tactileDatasetEntries } from '@/lib/tactile-datasets';
import { tactileBenchmarkEntries } from '@/lib/tactile-benchmarks';
import { robotAiModelEntries } from '@/lib/robot-ai-models';
import { vlaCatalog } from '@/lib/vla-catalog';
import { getSensorSpecifications } from '@/content/sensor-specifications';

function Table({ headers, children, label }: { headers: string[]; children: ReactNode; label: string }) {
  return <div className="signal-panel mt-4 overflow-x-auto p-0" tabIndex={0} role="region" aria-label={label}>
    <table className="w-full min-w-[720px] border-collapse text-left text-sm">
      <caption className="p-4 text-left text-sm text-[#c8d1de]">{label}</caption>
      <thead><tr>{headers.map(header => <th scope="col" key={header} className="border-b border-white/10 px-4 py-3 font-semibold">{header}</th>)}</tr></thead>
      <tbody>{children}</tbody>
    </table>
  </div>;
}

function Cells({ cells }: { cells: ReactNode[] }) {
  return <>{cells.map((cell, index) => index === 0
    ? <th key={index} scope="row" className="border-b border-white/10 px-4 py-4 align-top font-semibold">{cell}</th>
    : <td key={index} className="border-b border-white/10 px-4 py-4 align-top text-[#c8d1de]">{cell}</td>)}</>;
}

export function SensorComparisonTable() {
  return <section id="sensor-specifications" className="container-shell pb-12" aria-labelledby="sensor-specifications-heading">
    <h2 id="sensor-specifications-heading" className="text-2xl font-semibold">Tactile sensing: published sensor specifications</h2>
    <p className="mt-3 text-soft">{tactileSensorEntries.length} sensors. Values belong to the cited model and source-review date. Not published means no value in the reviewed material. Spatial resolution, force resolution, taxel count and image resolution are different measurements.</p>
    <Table headers={['Sensor', 'Type', 'Spatial resolution', 'Force range', 'Interface', 'Source']} label="Sensor specifications with primary sources">
      {tactileSensorEntries.map(entry => { const spec = getSensorSpecifications(entry.id); return <tr key={entry.id}><Cells cells={[
        entry.name, entry.principle, spec.resolution, spec.force, spec.interface,
        <a key="source" href={entry.sourceUrl} className="underline">{entry.name} source ({entry.sourceReviewed})</a>,
      ]} /></tr>; })}
    </Table>
  </section>;
}

const catalogAliases: Record<string, string> = { 'openvla-7b': 'openvla', 'isaac-gr00t-n1': 'gr00t-n1', 'tau-touch-augmented-vla': 'tau' };
const releasedWeights = new Set(['openvla-7b', 'pi0', 'isaac-gr00t-n1', 't-rex']);
const unavailableWeights = new Set(['gemini-robotics-2', 'rt-2']);

export function VlaComparisonTable() {
  const models = robotAiModelEntries.filter(entry => entry.category === 'VLA');
  return <section id="vla-comparison" className="container-shell pb-12" aria-labelledby="vla-comparison-heading">
    <h2 id="vla-comparison-heading" className="text-2xl font-semibold">VLA robotics model comparison</h2>
    <p className="mt-3 text-soft">{models.length} models. Y means a documented input or released model checkpoint; N means the reviewed release explicitly lacks it. Not disclosed preserves unresolved evidence. Partial controller checkpoints do not establish a released full VLA policy. Open weights do not imply unrestricted licensing.</p>
    <Table headers={['Model', 'Params', 'Training data', 'Tactile input (Y/N)', 'Open weights (Y/N)', 'Source']} label="Eleven VLA models, training data and artifact availability">
      {models.map(entry => {
        const catalog = vlaCatalog.find(row => row.id === (catalogAliases[entry.id] ?? entry.id));
        const params = catalog?.parameterBillions ? catalog.parameters.text : 'Not disclosed';
        return <tr id={`model-${entry.id}`} key={entry.id}><Cells cells={[
          entry.name, params, entry.trainingDataSummary,
          entry.tactileInput === 'yes' ? 'Y' : entry.tactileInput === 'no' ? 'N' : 'Not disclosed',
          releasedWeights.has(entry.id) ? 'Y' : unavailableWeights.has(entry.id) ? 'N' : 'Not disclosed',
          <span key="sources"><a href={entry.primarySources[0]?.url ?? entry.projectUrl} className="underline">{entry.name} primary source</a>{catalog?.parameterBillions ? <>; <a href={catalog.parameters.source} className="underline">parameter source</a></> : null}<br />Reviewed {entry.sourceReviewed}</span>,
        ]} /></tr>;
      })}
    </Table>
    <h3 className="mt-9 text-xl font-semibold">Related model roles, outside the VLA comparison</h3>
    <p className="mt-3 text-soft">These existing records describe other roles. They are excluded from the eleven VLA rows above; their entity definitions are kept here so the foundation-model directory can refer to one model record.</p>
    <dl className="mt-4 space-y-4">{robotAiModelEntries.filter(entry => entry.category !== 'VLA').map(entry => <div id={`model-${entry.id}`} key={entry.id}>
      <dt className="font-semibold">{entry.name}: {entry.category}</dt>
      <dd className="mt-2 text-soft">{entry.trainingDataSummary} {entry.evidenceLimitations} <a href={entry.projectUrl} className="underline">{entry.name} primary source</a>. Source reviewed {entry.sourceReviewed}.</dd>
    </div>)}</dl>
  </section>;
}

export function BenchmarkComparisonTable() {
  return <section id="benchmark-comparison" className="container-shell pb-12" aria-labelledby="benchmark-comparison-heading">
    <h2 id="benchmark-comparison-heading" className="text-2xl font-semibold">Tactile robotics benchmark protocols</h2>
    <p className="mt-3 text-soft">{tactileBenchmarkEntries.length} records retained. N below means cross-lab comparability is not established by our reviewed evidence. It does not mean a protocol cannot be reproduced. A public repository alone is insufficient to mark Y.</p>
    <Table headers={['Benchmark', 'Task suites', 'Metrics', 'Hardware requirements', 'Comparable across labs (Y/N)', 'Source']} label="Benchmark conditions and comparability limits">
      {tactileBenchmarkEntries.map(entry => <tr key={entry.id}><Cells cells={[
        entry.name, entry.tasks.join('; '), entry.metrics.join('; '), [...entry.sensors, ...entry.robots].join('; '),
        'N (not established)', <a key="source" href={entry.paperUrl} className="underline">{entry.name} protocol ({entry.sourceReviewed})</a>,
      ]} /></tr>)}
    </Table>
  </section>;
}

export function DatasetIndexes({ updated }: { updated: string }) {
  const summary = `This page indexes ${tactileDatasetEntries.length} records. Last updated: ${updated}. Individual source-review dates are retained.`;
  const sensorGroup = (sensors: string[]) => /gelsight|digit|vision|optical|tactip|gelslim|vitai|gf225/i.test(sensors.join(' ')) ? 'Vision-based / optical' : /magnetic|hall|reskin|uskin|anyskin/i.test(sensors.join(' ')) ? 'Magnetic' : 'Other, mixed or simulated';
  const groups = ['Vision-based / optical', 'Magnetic', 'Other, mixed or simulated'];
  return <div className="container-shell pb-12">
    <section id="datasets-by-sensor" aria-labelledby="datasets-by-sensor-heading">
      <h2 id="datasets-by-sensor-heading" className="text-2xl font-semibold">Tactile dataset index by sensor type</h2><p className="mt-3 text-soft">{summary}</p>
      {groups.map(group => <div key={group} className="mt-6"><h3 className="text-xl font-semibold">{group}</h3><ul className="mt-3 space-y-3">{tactileDatasetEntries.filter(entry => sensorGroup(entry.sensor) === group).map(entry => <li key={entry.id}><Link href={`#dataset-${entry.id}`} className="underline">{entry.name} tactile dataset</Link>: {entry.sensor.join('; ')}. Source reviewed {entry.sourceReviewed}.</li>)}</ul></div>)}
    </section>
    <section id="datasets-by-task" className="mt-9" aria-labelledby="datasets-by-task-heading">
      <h2 id="datasets-by-task-heading" className="text-2xl font-semibold">Tactile dataset index by task</h2><p className="mt-3 text-soft">{summary}</p>
      <p className="mt-3 text-soft">These groups match the stated task fields. They do not infer a slip or insertion label from a sensor name.</p>
      {(['grasping', 'slip', 'insertion'] as const).map(task => {
        const pattern = task === 'grasping' ? /grasp|grip/i : task === 'insertion' ? /insert|assembly/i : /slip/i;
        const entries = tactileDatasetEntries.filter(entry => pattern.test(entry.tasks.join(' ')));
        return <div key={task} className="mt-6"><h3 className="text-xl font-semibold">{task}</h3>{entries.length ? <ul className="mt-3 space-y-2">{entries.map(entry => <li key={entry.id}><Link href={`#dataset-${entry.id}`} className="underline">{entry.name} tactile dataset</Link>: {entry.tasks.join('; ')}.</li>)}</ul> : <p className="mt-3 text-soft">No record explicitly labels this task in the current index. Check the original release before assuming labels exist.</p>}</div>;
      })}
    </section>
    <section id="datasets-by-license" className="mt-9" aria-labelledby="datasets-by-license-heading">
      <h2 id="datasets-by-license-heading" className="text-2xl font-semibold">Tactile dataset index by license</h2><p className="mt-3 text-soft">{summary}</p>
      <p className="mt-3 text-soft">Data, code and weights can have different terms. A repository license does not automatically cover a dataset. Unverified terms remain unresolved.</p>
      <Table headers={['Dataset', 'Dataset license and limits', 'Download / access source', 'Source reviewed']} label="Dataset reuse terms and primary access routes">
        {[...tactileDatasetEntries].sort((a,b) => a.license.localeCompare(b.license)).map(entry => <tr key={entry.id}><Cells cells={[
          <Link key="record" href={`#dataset-${entry.id}`} className="underline">{entry.name} tactile dataset</Link>, entry.license,
          <a key="source" href={entry.datasetUrl ?? entry.projectUrl ?? entry.paperUrl} className="underline">{entry.name} access source</a>, entry.sourceReviewed,
        ]} /></tr>)}
      </Table>
    </section>
  </div>;
}
