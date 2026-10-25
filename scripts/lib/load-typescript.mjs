// Execute real data/builders in Node tests and editorial checks, without altering source.
import { readFileSync, existsSync } from 'node:fs';
import { createRequire } from 'node:module';
import path from 'node:path';
import ts from 'typescript';
const root = path.resolve(import.meta.dirname, '../..');
export function createTypeScriptLoader() {
  const cache = new Map();
  function load(file) {
    file = path.resolve(root, file);
    if (cache.has(file)) return cache.get(file);
    const exports = {};
    cache.set(file, exports);
    const nativeRequire = createRequire(file);
    const require = (name) => {
      if (name.startsWith('@/') || name.startsWith('.')) {
        const stem = name.startsWith('@/') ? path.join(root, 'src', name.replace('@/', '')) : path.resolve(path.dirname(file), name);
        const target = [stem, `${stem}.ts`, `${stem}.tsx`, `${stem}.mjs`, `${stem}.json`].find(existsSync);
        if (target?.match(/\.tsx?$/)) return load(target);
        if (target) return nativeRequire(target);
      }
      return nativeRequire(name);
    };
    const { outputText } = ts.transpileModule(readFileSync(file, 'utf8'), {
      compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, jsx: ts.JsxEmit.ReactJSX, esModuleInterop: true },
    });
    new Function('exports', 'require', outputText)(exports, require);
    return exports;
  }
  return load;
}
