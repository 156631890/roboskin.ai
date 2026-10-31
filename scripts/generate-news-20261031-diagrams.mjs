import { writeFile } from 'node:fs/promises';
import sharp from 'sharp';

const output = new URL('../public/generated/news/', import.meta.url);
const escape = (s) => s.replaceAll('&', '&amp;').replaceAll('<', '&lt;');
const text = (x, y, s, size = 25, color = '#c1cedc') => `<text x="${x}" y="${y}" fill="${color}" font-size="${size}">${escape(s)}</text>`;
const card = (x, y, label, line1, line2, accent = false) => `<rect x="${x}" y="${y}" width="510" height="145" rx="16" fill="${accent ? '#28392f' : '#132235'}" stroke="${accent ? '#90d6a9' : '#415c78'}" stroke-width="2"/>${text(x + 25, y + 42, label, 30, accent ? '#b4edc7' : '#f4f6fa')}${text(x + 25, y + 83, line1)}${text(x + 25, y + 117, line2)}`;
const diagrams = [
  {
    id: 'tactus-data-evidence', title: 'From human touch to robot evidence',
    subtitle: 'A proposed evaluation path for demonstration data',
    cards: [
      ['CONTACT MEASUREMENT', 'Reference load + calibration', 'Retain session and sensor identity'],
      ['HAND POSE', 'Coordinate frame + timing', 'Separate causal and offline estimates'],
      ['EPISODE RECORD', 'Align observations and labels', 'Inspect gaps and held-out sessions'],
      ['ROBOT TRANSFER TEST', 'Match task, hardware and budget', 'Measure the effect of tactile input'],
    ],
  },
  {
    id: 'dexsuite-data-evidence', title: 'DexSuite: three evidence scopes',
    subtitle: 'Framework availability does not establish dataset readiness',
    cards: [
      ['FRAMEWORK', 'Task + arm + end-effector', 'Pin the software configuration'],
      ['BENCHMARK', 'Task-embodiment pair', 'Keep the evaluation protocol fixed'],
      ['DATASET SUBSET', 'Schema + action layout + license', 'Pin the data revision separately'],
      ['NEXT VERIFICATION', 'Load and replay an episode', 'Then test a matched policy baseline'],
    ],
  },
];

for (const diagram of diagrams) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="720" viewBox="0 0 1200 720" role="img" aria-labelledby="title desc"><title id="title">${escape(diagram.title)}</title><desc id="desc">${escape(diagram.subtitle)}. Conceptual editorial framework, not an experiment.</desc><rect width="1200" height="720" fill="#09131f"/><g font-family="Arial, Helvetica, sans-serif">${text(60, 65, 'ROBOSKIN / EVIDENCE REVIEW', 22, '#91d8ad')}${text(60, 126, diagram.title, 42, '#f4f6fa')}${text(60, 176, diagram.subtitle, 26)}${diagram.cards.map((c, i) => card(i % 2 === 0 ? 60 : 630, i < 2 ? 225 : 430, ...c, i === 3)).join('')}${text(60, 647, 'EDITORIAL FRAMEWORK  /  NO EXPERIMENTAL RESULT SHOWN', 21, '#91a6ba')}</g></svg>`;
  await writeFile(new URL(`${diagram.id}.svg`, output), svg);
  await sharp(Buffer.from(svg)).png().toFile(new URL(`${diagram.id}.png`, output).pathname.replace(/^\/([A-Za-z]:)/, '$1'));
  console.log(`${diagram.id}: SVG + PNG`);
}
