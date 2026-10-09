import { mkdir, writeFile } from 'node:fs/promises';

const root = new URL('../public/generated/research-guides/', import.meta.url);
await mkdir(root, { recursive: true });
const escape = (s) => s.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
const text = (x, y, label, size = 30, color = '#dbe3ef', extra = '') => `<text x="${x}" y="${y}" fill="${color}" font-size="${size}" ${extra}>${escape(label)}</text>`;
const line = (d, color = '#ff9e7b', dashed = false) => `<path d="${d}" fill="none" stroke="${color}" stroke-width="5" ${dashed ? 'stroke-dasharray="10 9"' : ''} marker-end="url(#arrow)"/>`;
const box = (x, y, w, h, title, subtitle, accent = false, titleSize = 34) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="18" fill="${accent ? '#312219' : '#121d2d'}" stroke="${accent ? '#ff9e7b' : '#536a84'}" stroke-width="2"/>${text(x + 24, y + 51, title, titleSize, '#f6f3ed', 'font-weight="700"')}${text(x + 24, y + 94, subtitle, 25)}`;
const svg = (title, sub, content) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 720" width="1200" height="720" role="img" aria-labelledby="title desc"><title id="title">${escape(title)}</title><desc id="desc">${escape(sub)}</desc><defs><marker id="arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse"><path d="M 0 0 L 10 5 L 0 10 z" fill="#ff9e7b"/></marker><pattern id="grid" width="48" height="48" patternUnits="userSpaceOnUse"><path d="M48 0H0V48" fill="none" stroke="#203249" stroke-width="1" opacity=".45"/></pattern></defs><rect width="1200" height="720" fill="#080e18"/><rect width="1200" height="720" fill="url(#grid)"/><g font-family="Arial, Helvetica, sans-serif">${text(54, 68, 'ROBOSKIN / RESEARCH EXPLAINED', 22, '#ffb99f', 'letter-spacing="3"')}${text(54, 127, title, 43, '#f6f3ed', 'font-weight="700"')}${text(54, 175, sub, 25, '#afbdce')}${content}${text(54, 677, 'CONCEPTUAL DIAGRAM · NOT AN EXPERIMENTAL RESULT', 20, '#afbdce', 'letter-spacing="2"')}</g></svg>`;

const diagrams = {
  'vla-observe-act-loop.svg': svg('Observe → interpret → act', 'A policy connects perception and language to physical commands.',
    box(54, 233, 300, 120, 'Camera + prompt', 'Scene + instruction', false, 30) +
    box(450, 233, 285, 120, 'VLA policy', 'Condition an action', true) +
    box(829, 233, 317, 120, 'Robot action', 'Execute a command') +
    line('M354 293H436') + line('M735 293H815') +
    box(340, 454, 520, 120, 'Observe the physical result', 'New image, robot state, optional touch') +
    line('M984 353V514H874') + line('M340 514H202V367') +
    text(475, 400, 'Model-specific interfaces', 25, '#ffb99f')),
  'vla-action-chunks.svg': svg('Plan a sequence; keep observing', 'An action chunk can extend beyond the commands already executed.',
    text(55, 260, 'PLANNED CHUNK', 23, '#ffb99f', 'letter-spacing="2"') +
    [0,1,2,3,4,5].map((n) => `<rect x="${54+n*183}" y="289" width="164" height="104" rx="12" fill="${n<2?'#653b29':'#121d2d'}" stroke="${n<2?'#ff9e7b':'#536a84'}" stroke-width="2"/>${text(98+n*183,355,`a${n+1}`,38,'#f6f3ed')}`).join('') +
    text(73, 435, 'Executed prefix', 28) + text(470, 435, 'Remaining predicted actions', 28) +
    box(54, 493, 355, 121, 'Fresh observation', 'Contact may change plans') +
    box(569, 493, 578, 121, 'Update remaining commands', 'Policy + controller determine the timing', true) +
    line('M409 554H555') + line('M849 493V453', '#ff9e7b', true)),
  'world-model-planning-loop.svg': svg('Ask what an action may cause', 'Prediction informs a planner; execution supplies new evidence.',
    box(54, 234, 322, 120, 'Observation', 'Robot + environment') +
    box(472, 234, 334, 120, 'World model', 'Condition on actions', true) +
    line('M376 294H458') +
    box(888, 221, 259, 105, 'Future A', 'Candidate A') +
    box(888, 359, 259, 105, 'Future B', 'Candidate B') +
    line('M806 269H874') + line('M806 294H830V407H874') +
    box(464, 491, 490, 120, 'Compare and execute', 'A planner selects the next action') +
    line('M1147 274H1170V551H968') + line('M1014 464V551H968') + line('M464 551H212V368') +
    text(250, 435, 'Observe again', 28, '#ffb99f')),
  'world-model-prediction-spaces.svg': svg('The future need not be a video', 'Choose a prediction target that supports the intended robot task.',
    [54,425,796].map(x=>`<rect x="${x}" y="231" width="349" height="363" rx="18" fill="#121d2d" stroke="#536a84" stroke-width="2"/>`).join('') +
    `<rect x="102" y="276" width="190" height="111" rx="10" fill="#263e54" stroke="#8faec7" stroke-width="2"/><rect x="131" y="300" width="214" height="123" rx="10" fill="#304760" stroke="#ff9e7b" stroke-width="3"/><circle cx="192" cy="350" r="19" fill="#ff9e7b"/><path d="M155 401L217 357L270 393L315 338" fill="none" stroke="#dbe3ef" stroke-width="4"/>` +
    text(80, 475, 'Observations', 34, '#f6f3ed', 'font-weight="700"') + text(80,520,'RGB / depth / touch',26) + text(80,560,'What might be sensed?',24) +
    text(457,324,'position · velocity',29,'#ffb99f') + text(457,374,'pose · contact',29,'#ffb99f') + text(451,475,'Explicit state',34,'#f6f3ed','font-weight="700"') + text(451,520,'Measured variables',26) + text(451,560,'How might state change?',24) +
    [0,1,2,3,4].map((n)=>`<rect x="${839+n*54}" y="${375-[25,80,47,108,59][n]}" width="29" height="${[25,80,47,108,59][n]}" rx="4" fill="${n%2?'#ff9e7b':'#91b9cf'}"/>`).join('') +
    text(822,475,'Latent features',34,'#f6f3ed','font-weight="700"') + text(822,520,'Learned representation',26) + text(822,560,'Does it help control?',24)),
};
for (const [name, markup] of Object.entries(diagrams)) await writeFile(new URL(name, root), markup + '\n');
console.log(`Generated ${Object.keys(diagrams).length} original research diagrams.`);
