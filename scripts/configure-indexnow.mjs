import { randomBytes } from 'node:crypto';
import { access, writeFile } from 'node:fs/promises';

const keyFile = new URL('../public/indexnow-key.txt', import.meta.url);
const exists = await access(keyFile).then(() => true, () => false);

if (!exists) {
  await writeFile(keyFile, `${randomBytes(16).toString('hex')}\n`, { encoding: 'utf8', flag: 'wx' });
  console.log('Created public/indexnow-key.txt');
} else {
  console.log('Reused existing public/indexnow-key.txt');
}
