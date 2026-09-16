import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import path from 'node:path';

const root = path.resolve('out');
const port = Number(process.env.PORT || 3213);
const types = {'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.json':'application/json; charset=utf-8','.csv':'text/csv; charset=utf-8','.xml':'application/xml; charset=utf-8','.txt':'text/plain; charset=utf-8','.md':'text/markdown; charset=utf-8','.svg':'image/svg+xml','.webp':'image/webp','.png':'image/png','.pdf':'application/pdf','.woff2':'font/woff2'};
createServer(async (request,response) => {
  if (!['GET','HEAD'].includes(request.method)) {
    response.writeHead(405,{'Content-Type':'application/json'}).end(JSON.stringify({ok:false,error:'Static preview: no form submission was sent.'})); return;
  }
  try {
    const pathname = decodeURIComponent(new URL(request.url,'http://localhost').pathname);
    const mapped = pathname === '/robots.txt' ? '/crawler-robots.txt' : pathname;
    const filename = path.resolve(root, `.${mapped}`);
    if (filename !== root && !filename.startsWith(root+path.sep)) { response.writeHead(403).end(); return; }
    const candidates = pathname === '/' ? [path.join(root,'index.html')] : [filename,`${filename}.html`,path.join(filename,'index.html')];
    for(const file of candidates) {
      if (!(await stat(file).catch(()=>null))?.isFile()) continue;
      response.writeHead(200,{'Content-Type':types[path.extname(file)] || 'application/octet-stream','Cache-Control':'no-store'});
      response.end(request.method==='HEAD'?undefined:await readFile(file));return;
    }
    response.writeHead(404,{'Content-Type':'text/html; charset=utf-8'}).end(await readFile(path.join(root,'404.html')));
  } catch { response.writeHead(400).end('Invalid preview request'); }
}).listen(port,'127.0.0.1',()=>console.log(`Static preview: http://127.0.0.1:${port} (forms never send through this server)`));
