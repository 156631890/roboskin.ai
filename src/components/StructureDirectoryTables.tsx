import type { ReactNode } from 'react';
import { grippers, humanoidCompanies } from '@/content/structure-directories';
import { getSensorSpecifications } from '@/content/sensor-specifications';
import { tactileSensorEntries } from '@/lib/tactile-sensors';

function DirectoryTable({ caption, headers, rows }: { caption: string; headers: string[]; rows: ReactNode[][] }) {
  return <div className="signal-panel mt-4 overflow-x-auto p-0" tabIndex={0} role="region" aria-label={caption}>
    <table className="w-full min-w-[720px] border-collapse text-left text-sm">
      <caption className="p-4 text-left text-sm text-soft">{caption}</caption>
      <thead><tr>{headers.map(header => <th key={header} scope="col" className="border-b border-white/10 px-4 py-3 font-semibold">{header}</th>)}</tr></thead>
      <tbody>{rows.map((row, i) => <tr key={i}>{row.map((cell, j) => j === 0
        ? <th key={j} scope="row" className="border-b border-white/10 px-4 py-4 align-top font-semibold">{cell}</th>
        : <td key={j} className="border-b border-white/10 px-4 py-4 align-top text-soft">{cell}</td>)}</tr>)}</tbody>
    </table>
  </div>;
}

const gripperHeaders = ['Model', 'Type', 'Payload', 'Grip force', 'Interface', 'Contact points / sensing', 'Price', 'Source'];
const gripperRows = (entries: typeof grippers) => entries.map(entry => [entry.name, entry.type, entry.payload, entry.force, entry.interface, entry.contacts, entry.price,
  <a key="source" href={entry.source} className="underline">{entry.name} specifications</a>,
]);

export function GripperDirectory() {
  return <section id="gripper-models" className="container-shell pb-12" aria-labelledby="gripper-models-heading">
    <h2 id="gripper-models-heading" className="text-2xl font-semibold text-white">Robot gripper models and selection fields</h2>
    <p className="mt-3 text-soft">Four sourced models, checked 2026-10-30. Prices and protocols are marked Not published when the cited page does not establish them. Payload limits use different grasp conditions and are not a common performance ranking.</p>
    <DirectoryTable caption="All four gripper models" headers={gripperHeaders} rows={gripperRows(grippers)} />
    <h3 className="mt-7 text-xl font-semibold text-white">Filter by gripper type</h3>
    <p className="mt-3 text-soft">Open a type to view only matching rows. The complete comparison remains available above.</p>
    {[...new Set(grippers.map(entry => entry.type))].map(type => <details key={type} name="gripper-type" className="contact-fold">
      <summary>{type} ({grippers.filter(entry => entry.type === type).length} models)</summary>
      <DirectoryTable caption={`${type} models`} headers={gripperHeaders} rows={gripperRows(grippers.filter(entry => entry.type === type))} />
    </details>)}
  </section>;
}

export function RobotTactileSensorDirectory() {
  return <section id="robot-tactile-models" className="container-shell pb-12" aria-labelledby="robot-tactile-models-heading">
    <h2 id="robot-tactile-models-heading" className="text-2xl font-semibold text-white">{tactileSensorEntries.length} sensor models tracked</h2>
    <p className="mt-3 text-soft">Tracked manufacturer and research models. Source-reviewed records retain their actual evidence dates. Manual review follows a checked release or correction; no automatic refresh. Unknown values remain Not published.</p>
    <DirectoryTable caption="Robot tactile sensor models, integration and source dates" headers={['Model', 'Type', 'Force range', 'Sampling rate', 'Interface', 'Vendor / group', 'Source / reviewed']} rows={tactileSensorEntries.map(entry => {
      const spec = getSensorSpecifications(entry.id);
      return [entry.name, entry.principle, spec.force, /not publicly|not specified|not reported|not disclosed/i.test(entry.reportedRate) ? `Not published. ${entry.reportedRate}` : entry.reportedRate, spec.interface, entry.organization,
        <span key="source"><a href={entry.sourceUrl} className="underline">{entry.name} source</a><br /><time dateTime={entry.sourceReviewed}>{entry.sourceReviewed}</time></span>];
    })} />
  </section>;
}

export function HumanoidCompanyDirectory() {
  return <section id="humanoid-companies" className="container-shell pb-12" aria-labelledby="humanoid-companies-heading">
    <h2 id="humanoid-companies-heading" className="text-2xl font-semibold text-white">{humanoidCompanies.length} companies tracked</h2>
    <p className="mt-3 text-soft">One row per company with an official humanoid model source. Last verified records the source check, not independent hardware validation. Review is manual after a relevant release or correction.</p>
    <DirectoryTable caption="Company origins, selected humanoid models and tactile disclosure" headers={['Company', 'Founded', 'Location', 'Model', 'Tactile approach', 'Official site / sources', 'Last verified']} rows={humanoidCompanies.map(entry => [
      entry.name, entry.founded, entry.location, entry.model, entry.tactile,
      <span key="sources"><a href={entry.website} className="underline">{entry.name} official site</a>{entry.sources.map(source => <span key={source.href}><br /><a href={source.href} className="underline">{source.label}</a></span>)}</span>,
      <time key="date" dateTime={entry.verified}>{entry.verified}</time>,
    ])} />
  </section>;
}
