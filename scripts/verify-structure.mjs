import { readFile, mkdir, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import assert from 'node:assert/strict';
import domino from '@mixmark-io/domino';
import { createTypeScriptLoader } from './lib/load-typescript.mjs';

const load = createTypeScriptLoader();
const pages = load('src/content/seo-topic-pages.ts').seoTopicPages;
const keywordByPath = {
  '/sensors': 'tactile sensing', '/robot-vla-models': 'vla robotics',
  '/robot-foundation-models': 'robot foundation model', '/datasets': 'tactile dataset',
  '/tactile-ai': 'tactile ai', '/robot-skin': 'robot skin',
  '/benchmarks': 'tactile robotics benchmark', '/physical-ai-touch': 'tactile sensing roadmap',
};
const argv = process.argv.slice(2);
const batch = Number(argv[argv.indexOf('--batch') + 1] || 1);
const base = argv.includes('--base') ? argv[argv.indexOf('--base') + 1] : null;
const root = argv.includes('--output-root') ? argv[argv.indexOf('--output-root') + 1] : 'out';
const lines = [`Verification ${new Date().toISOString()}`, `Batch ${batch}; source ${base ?? root}`];
const links = [];
let errors = 0;
const check = (ok, message) => { if (!ok) { errors++; lines.push(`FAIL ${message}`); } };
const get = async path => {
  if (base) { const response = await fetch(new URL(path,base), {redirect:'manual'}); return {status:response.status, html:await response.text()}; }
  for (const file of [join(root, path === '/' ? 'index.html' : `${path.slice(1)}.html`), join(root,path,'index.html')]) {
    try { return {status:path==='/404'?404:200, html:await readFile(file,'utf8')}; } catch {}
  }
  return {status:404,html:''};
};
const flatten = value => Array.isArray(value) ? value.flatMap(flatten) : value && typeof value === 'object' ? [value,...Object.values(value).flatMap(flatten)] : [];

if (batch >= 3) Object.assign(keywordByPath, {
  '/robot-grippers':'robot gripper', '/electronic-skin':'electronic skin',
  '/robot-tactile-sensors':'robot tactile sensor', '/humanoid-robot-companies':'humanoid robot companies', '/embodied-ai':'embodied ai',
});
for (const [path,keyword] of Object.entries(keywordByPath)) {
  const page = pages.find(page => page.path === path);
  const {status,html} = await get(path);
  check(status===200, `${path} HTTP ${status}`);
  const doc=domino.createDocument(html);
  const title=doc.querySelector('title')?.textContent ?? '';
  const desc=doc.querySelector('meta[name="description"]')?.getAttribute('content') ?? '';
  const h1=doc.querySelector('h1')?.textContent ?? '';
  const introduction=doc.querySelector('h1')?.nextElementSibling?.textContent ?? '';
  const first100=introduction.split(/\s+/).slice(0,100).join(' ').toLowerCase();
  const count=first100.split(keyword).length-1;
  const graphs=[...doc.querySelectorAll('script[type="application/ld+json"]')].map(node=>JSON.parse(node.textContent));
  const nodes=graphs.flatMap(flatten);
  const pageNode=nodes.find(node=>node['@type']==='WebPage'&&node.url===`https://roboskin.ai${path}`);
  lines.push(`\n== ${path}\n<title>${title}</title>\n<meta name="description" content="${desc}">\nTitle characters: ${title.length}; description characters: ${desc.length}\nH1: ${h1}\nFirst 100 words keyword occurrences: ${count}\nDouble suffix: ${title.includes('RoboSkin.ai | RoboSkin.ai')}\nDate modified: ${pageNode?.dateModified ?? 'missing'}`);
  check(title===`${page?.title} | RoboSkin.ai` && title.length<=60, `${path} title mismatch or length`);
  check(!/roboskin/i.test(title.replace(/ \| RoboSkin\.ai$/,'')), `${path} brand in main title`);
  check(desc===page?.description && desc.length<=155, `${path} description mismatch or length`);
  check(doc.querySelectorAll('h1').length===1 && h1.toLowerCase().includes(keyword), `${path} H1 keyword`);
  check(count>=2, `${path} keyword in introduction`);
  check(/^(?:a |an )?.{2,60}\b(is|refers to)\b/i.test(introduction), `${path} opening definition`);
  check(graphs.some(graph=>Array.isArray(graph['@graph'])), `${path} @graph`);
  check(pageNode?.dateModified===page?.updated, `${path} dateModified`);
  check(nodes.some(node=>['CollectionPage','ItemList','TechArticle','FAQPage'].includes(node['@type'])), `${path} entity type`);
  const anchors=[...doc.querySelectorAll('main a[href]')].map(a=>({href:a.getAttribute('href'),text:a.textContent.trim().replace(/\s+/g,' ')}));
  const internal=anchors.filter(a=>a.href.startsWith('/') && !a.href.startsWith('//'));
  lines.push('Internal links:\n'+internal.slice(0,20).map(a=>`${a.href}\t${a.text}`).join('\n'));
  links.push(...internal.map(a=>({source_url:`https://roboskin.ai${path}`,target_url:`https://roboskin.ai${a.href}`,anchor_text:a.text,insertion_position:'related_block'})));
  if(batch>=2) {
    check(internal.length>=3,`${path} fewer than three internal links`);
    check(!anchors.some(a=>/\b(click here|read more|learn more|see details)\b/i.test(a.text)),`${path} generic anchor`);
  }
  if(batch>=3 && ['/robot-grippers','/electronic-skin','/robot-tactile-sensors','/humanoid-robot-companies','/embodied-ai'].includes(path)) check(doc.querySelectorAll('table').length>0,`${path} missing table`);
}
if(batch>=3){
  const {html,status}=await get(base?'/__roboskin_structure_missing__':'/404');
  const doc=domino.createDocument(html);
  const robots=[...doc.querySelectorAll('meta[name="robots"]')].map(n=>n.getAttribute('content'));
  lines.push(`\n404 status ${status}; robots ${JSON.stringify(robots)}; googlebot ${doc.querySelectorAll('meta[name="googlebot"]').length}; canonical ${doc.querySelectorAll('link[rel="canonical"]').length}`);
  check(status===404,'missing route must return HTTP 404');
  check(robots.length===1&&robots[0].includes('noindex'),'404 must have one noindex robots tag');
  check(!doc.querySelector('meta[name="googlebot"]'),'404 must not inherit googlebot index');
  check(!doc.querySelector('link[rel="canonical"]'),'404 must not canonicalize to homepage');
}
if(batch>=2) {
  const {html:sitemap}=await get('/sitemap.xml');
  const sitemapText=base?sitemap:await readFile(join(root,'sitemap.xml'),'utf8');
  const paths=[...sitemapText.matchAll(/<loc>([^<]+)<\/loc>/g)].map(match=>new URL(match[1]).pathname);
  const inserted=[];
  const generic=[];
  for(const path of paths) {
    const {html}=await get(path);
    const doc=domino.createDocument(html);
    for(const anchor of doc.querySelectorAll('a[data-structure-position]')) inserted.push({
      source_url:`https://roboskin.ai${path}`, target_url:new URL(anchor.getAttribute('href'),'https://roboskin.ai').href,
      anchor_text:anchor.textContent.trim().replace(/\s+/g,' '), insertion_position:anchor.getAttribute('data-structure-position'),
    });
    for(const anchor of doc.querySelectorAll('main a[href]')) if(/\b(click here|read more|learn more|see details)\b/i.test(anchor.textContent)) generic.push(`${path}\t${anchor.getAttribute('href')}\t${anchor.textContent.trim()}`);
    check(doc.querySelectorAll('[data-structure-position="body_backlink"]').length<=1,`${path} duplicated body hub backlink`);
  }
  lines.push(`\nSitemap anchor audit: ${paths.length} pages; generic anchors: ${generic.length}; inserted links: ${inserted.length}`, ...generic);
  check(generic.length===0,'sitemap generic anchors');
  const csvCell=value=>'"'+String(value).replaceAll('"','""')+'"';
  await mkdir('docs/seo/structure-20261030',{recursive:true});
  await writeFile('docs/seo/structure-20261030/internal-links.csv',['source_url,target_url,anchor_text,insertion_position',...inserted.map(row=>Object.values(row).map(csvCell).join(','))].join('\n')+'\n');
  const {html:home}=await get('/');
  const homeDoc=domino.createDocument(home);
  check(homeDoc.querySelectorAll('[data-structure-position="home_hub"]').length===(batch>=3?6:4),'homepage topic hub count');
}
lines.push(`\nRESULT: ${errors===0?'PASS':'FAIL'} (${errors} failures)`);
console.log(lines.join('\n'));
await mkdir('docs/seo/structure-20261030',{recursive:true});
await writeFile(`docs/seo/structure-20261030/verify-output${base?'-live':''}.txt`,lines.join('\n')+'\n');
assert.equal(errors,0,`Structure batch ${batch} acceptance failures`);
