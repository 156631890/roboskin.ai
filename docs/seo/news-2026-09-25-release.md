# RoboSkin research news release — September 25, 2026

## Scope

- New: `/news/internw0-contact-aware-world-model-pipetting` (published date September 25; paper submitted September 23).
- Updated source-adjacent citations: `/news/copre-proprioceptive-contact-detection` and `/news/cartesian-hand-all-linear-in-hand-manipulation`. Their original publication dates stay September 24 and 23 respectively; their modification dates move to September 25.
- No duplicate CoPRE slug or copy of the older uncommitted draft was published.

## Source and interpretation checks

- InternW0 arXiv v1 full text and official project responded HTTP 200 on September 25. Table 7's 65.3%, 46.7% and 18.7% are average ordered-subtask progress for InternW0, π0.5 and Fast-WAM, not whole-task success. The final listed InternW0 pipetting stage is 46.7%. Table 1's 7,233.5 hours and 811,969 episodes describe the pretraining mixture. The 60.73 ms action path excludes asynchronous video generation. The official project's GitHub, Hugging Face and ModelScope controls remained disabled on inspection.
- CoPRE's manuscript and official summary CSV responded HTTP 200. The added direct links put the benchmark protocol and published table beside the numerical claims. The CSV is a summary, not raw robot traces.
- Cartesian Hand's arXiv HTML responded HTTP 200. Links to the 35-object experimental evaluation and the separate qualitative humanoid demonstration point to the actual `#S5` and `#S5.SS4` sections. The 350 trial count remains tied to configured objects, not the humanoid demonstration.
- The new article has a title, descriptive opening, question-led H2s, methods/results/limitations, claim-adjacent primary citations and natural links to `/robot-world-models`, `/tactile-ai`, `/datasets` and the visuotactile world-model guide. The two existing articles retain their meaningful robot-hand, sensor and safety links.

## Release checklist

- The homepage count changes from 77 to 78; home and News index sitemap modification dates move to September 25.
- The new canonical URL is added to `config/protected-urls.json` and the URL contract test.
- The News template derives canonical, NewsArticle, RSS, sitemap and news sitemap from the article record. Verify generated output and production after deployment.

## Local validation

- `npm test`: 200 passed, 0 failed after restoring the isolated Windows checkout's tracked text to LF. The first run's 10 failures came from CRLF-sensitive existing tests. No assertions were weakened.
- `npm run lint` and `npm run build`: passed. The build generated the new News route and 152 agent Markdown representations.
- `npm run verify:export`: passed; 143 sitemap pages and 147 protected URL entries checked, including titles, descriptions, H1s, canonicals and internal destinations/anchors.
- The previously tracked sample report PDF arrived with altered checkout bytes on Windows. Its original Git blob was restored and `public/reports/** -text` was added to `.gitattributes` so future Windows checkouts preserve published PDF bytes.
