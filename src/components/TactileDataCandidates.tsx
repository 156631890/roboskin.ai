import Link from 'next/link';
import { tactileDatasetCandidates } from '@/lib/tactile-datasets';

export default function TactileDataCandidates() {
  return (
    <section id="data-candidates" className="container-shell py-12" aria-labelledby="data-candidates-heading">
      <p className="eyebrow">Paper-associated data</p>
      <h2 id="data-candidates-heading" className="mt-4 text-3xl font-bold">Data candidates: access still unverified</h2>
      <p className="mt-4 max-w-4xl text-soft">These papers describe research data, but we have not verified a downloadable release and its reuse terms. Candidates are separate from the dataset catalog, its counts and filters, and its Dataset structured data. The JSON export preserves them in a separate candidates field.</p>
      {tactileDatasetCandidates.map(entry => (
        <article id={`candidate-${entry.id}`} key={entry.id} className="signal-panel mt-6 scroll-mt-24 p-6 md:p-8">
          <h3 className="text-2xl font-semibold">{entry.name}</h3>
          <p className="mt-3 text-sm text-accent">Paper-linked candidate · Access checked {entry.sourceReviewed}</p>
          <p className="mt-4 text-sm leading-relaxed text-soft">{entry.availability}</p>
          <dl className="mt-6 grid gap-5 text-sm leading-relaxed md:grid-cols-2">
            {[
              ['Original authors', entry.authors?.join('; ') ?? 'Unknown'],
              ['Source version', `First submitted ${entry.firstPublished}; ${entry.paperVersion}`],
              ['Institutions / data origin', `${entry.institution.join('; ')} / ${entry.dataOrigin}`],
              ['Reported scale', entry.sampleCount],
              ['Robot and sensors', [...entry.robot, ...entry.sensor].join('; ')],
              ['Tasks and objects', `${entry.tasks.join('; ')}. ${entry.objectCategories}`],
              ['Modalities, actions and synchronization', `${entry.modalities.join('; ')}. ${entry.dataFormat}`],
              ['Splits and generalization', entry.generalization ?? 'Unknown'],
              ['Code / data / model / asset terms', entry.license],
              ['Verified and unresolved', 'Paper v1 and official project inspected. Download entry, released file inventory, payload integrity, split files and dataset license remain unknown. No independent reproduction by RoboSkin.'],
            ].map(([label, value]) => <div key={label} className="min-w-0"><dt className="font-semibold text-white">{label}</dt><dd className="mt-1 text-soft">{value}</dd></div>)}
          </dl>
          <div className="mt-6 flex flex-wrap gap-5 text-sm text-accent underline underline-offset-4">
            <a href={entry.paperUrl} target="_blank" rel="noreferrer">Original paper v1 ↗</a>
            <a href={entry.projectUrl} target="_blank" rel="noreferrer">Official project ↗</a>
            <Link href={entry.researchUrl!}>Read the sensing-to-action evidence review</Link>
          </div>
        </article>
      ))}
    </section>
  );
}
