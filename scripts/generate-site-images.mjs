import fs from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');
const promptsPath = path.join(projectRoot, 'scripts', 'site-image-prompts.json');
const outputDir = path.join(projectRoot, 'public', 'generated');
const envLocalPath = path.join(projectRoot, '.env.local');

async function loadEnvFromFile(filePath) {
  try {
    const text = await fs.readFile(filePath, 'utf8');
    for (const rawLine of text.split(/\r?\n/)) {
      const line = rawLine.trim();
      if (!line || line.startsWith('#')) continue;
      const eq = line.indexOf('=');
      if (eq === -1) continue;
      const key = line.slice(0, eq).trim();
      const value = line.slice(eq + 1).trim();
      if (key && !(key in process.env)) {
        process.env[key] = value;
      }
    }
  } catch {
    // Ignore missing env files.
  }
}

await loadEnvFromFile(envLocalPath);

const apiKey = process.env.GEMINI_API_KEY;
const model = process.env.GEMINI_IMAGE_MODEL || 'gemini-2.0-flash-exp-image-generation';
const proxyUrl = process.env.HTTPS_PROXY || process.env.HTTP_PROXY || process.env.ALL_PROXY;
const offlineMode = process.env.GEMINI_OFFLINE_MODE === '1' || process.argv.includes('--offline');

if (!apiKey && !offlineMode) {
  console.error('Missing GEMINI_API_KEY. Set it in .env.local or environment variables before running this script.');
  process.exit(1);
}

if (proxyUrl && !offlineMode) {
  try {
    const { ProxyAgent, setGlobalDispatcher } = await import('undici');
    setGlobalDispatcher(new ProxyAgent(proxyUrl));
    console.log(`Using proxy: ${proxyUrl}`);
  } catch {
    console.warn('Proxy is configured, but failed to load undici ProxyAgent. Falling back to direct fetch.');
  }
}

const prompts = JSON.parse(await fs.readFile(promptsPath, 'utf8'));

const fallbackByFilename = {
  'team-sarah-chen.jpg': 'contact-lab-team.jpg',
  'team-michael-rodriguez.jpg': 'hero-lab.jpg',
  'team-emily-watson.jpg': 'tech-self-healing.jpg',
  'team-james-liu.jpg': 'tech-neuromorphic-core.jpg',
  'research-neuromorphic-2026.jpg': 'tech-neuromorphic-core.jpg',
  'research-graphene-quantum-tunneling.jpg': 'tech-sensor-layer.jpg',
  'research-self-healing-2025.jpg': 'tech-self-healing.jpg',
  'research-multimodal-sensing-2025.jpg': 'product-sensor-array.jpg',
  'research-bio-integration-2025.jpg': 'contact-lab-team.jpg',
  'research-scalable-manufacturing-2025.jpg': 'product-dev-kit.jpg',
  'research-ai-tactile-learning-2025.jpg': 'hero-lab.jpg',
  'research-extreme-environment-2025.jpg': 'tech-sensor-layer.jpg',
  'case-medtronic-surgery.jpg': 'contact-lab-team.jpg',
  'case-tesla-manufacturing.jpg': 'product-processing-unit.jpg',
  'case-nasa-sample-handling.jpg': 'hero-lab.jpg',
};

await fs.mkdir(outputDir, { recursive: true });

async function generateImage(prompt) {
  const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      contents: [
        {
          role: 'user',
          parts: [{ text: prompt }],
        },
      ],
      generationConfig: {
        responseModalities: ['TEXT', 'IMAGE'],
      },
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Gemini API error ${response.status}: ${errorText}`);
  }

  const data = await response.json();
  const parts = data?.candidates?.[0]?.content?.parts || [];
  const imagePart = parts.find((part) => part.inlineData?.data);

  if (!imagePart?.inlineData?.data) {
    throw new Error(`No image data returned. Response: ${JSON.stringify(data).slice(0, 500)}`);
  }

  return Buffer.from(imagePart.inlineData.data, 'base64');
}

async function fileExists(filePath) {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

async function getAnyExistingImage(excludeFilename) {
  const files = await fs.readdir(outputDir);
  return files.find((name) => {
    if (name === excludeFilename) return false;
    return /\.(jpg|jpeg|png|webp)$/i.test(name);
  });
}

async function tryFallback(item, outputPath) {
  if (await fileExists(outputPath)) {
    return { ok: true, reason: 'kept existing file' };
  }

  const configuredFallback = item.fallbackFrom || fallbackByFilename[item.filename];
  if (configuredFallback) {
    const configuredPath = path.join(outputDir, configuredFallback);
    if (configuredFallback !== item.filename && (await fileExists(configuredPath))) {
      await fs.copyFile(configuredPath, outputPath);
      return { ok: true, reason: `copied ${configuredFallback}` };
    }
  }

  const anyImage = await getAnyExistingImage(item.filename);
  if (anyImage) {
    await fs.copyFile(path.join(outputDir, anyImage), outputPath);
    return { ok: true, reason: `copied ${anyImage}` };
  }

  return { ok: false, reason: 'no local fallback source available' };
}

for (const item of prompts) {
  const filename = item.filename;
  const prompt = item.prompt;
  const outputPath = path.join(outputDir, filename);

  process.stdout.write(`Generating ${filename}... `);
  if (offlineMode) {
    const fallback = await tryFallback(item, outputPath);
    if (fallback.ok) {
      process.stdout.write(`offline fallback (${fallback.reason})\n`);
    } else {
      process.stdout.write(`offline skipped (${fallback.reason})\n`);
    }
    continue;
  }

  try {
    const image = await generateImage(prompt);
    await fs.writeFile(outputPath, image);
    process.stdout.write('done\n');
  } catch (error) {
    const fallback = await tryFallback(item, outputPath);
    if (fallback.ok) {
      process.stdout.write(`fallback (${fallback.reason})\n`);
    } else {
      process.stdout.write('failed\n');
      console.error(error instanceof Error ? error.message : error);
    }
  }
}

console.log(`Images saved to ${outputDir}`);
