import snapshot from '../../public/releases/research-index/v2026.08.22/research-index.json';

export const researchIndexRelease = {
  version: 'v2026.08.22',
  recordCount: snapshot.entries.length,
  jsonPath: '/releases/research-index/v2026.08.22/research-index.json',
  csvPath: '/releases/research-index/v2026.08.22/research-index.csv',
  repositoryUrl: 'https://github.com/roboskin-ai/tactile-research-index',
  releaseUrl: 'https://github.com/roboskin-ai/tactile-research-index/releases/tag/v2026.08.22',
  licenseName: 'Creative Commons Attribution 4.0 International',
  licenseShortName: 'CC BY 4.0',
  licenseUrl: 'https://creativecommons.org/licenses/by/4.0/',
  citation:
    'RoboSkin.ai Editorial Team. (2026). RoboSkin Tactile Research Index (v2026.08.22) [Data set]. RoboSkin.ai. https://github.com/roboskin-ai/tactile-research-index/releases/tag/v2026.08.22',
  bibtex: `@misc{roboskin_tactile_research_index_2026,
  author  = {{RoboSkin.ai Editorial Team}},
  title   = {RoboSkin Tactile Research Index},
  year    = {2026},
  version = {v2026.08.22},
  url     = {https://github.com/roboskin-ai/tactile-research-index/releases/tag/v2026.08.22},
  note    = {Source-reviewed public release; CC BY 4.0}
}`,
} as const;
