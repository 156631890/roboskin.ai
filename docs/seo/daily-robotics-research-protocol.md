# RoboSkin Daily Robotics Research Protocol

## Schedule and purpose

- Run automatically every day at 09:17 Asia/Shanghai through `.github/workflows/daily-research-watch.yml`.
- Run manually with `npm run research:watch` when an immediate review is needed.
- Produce a source-linked research brief for editorial review.
- Do not auto-publish or deploy a page solely because a term is trending.
- Promote a finding to the website only when it has a primary source, a distinct search intent, and a clear RoboSkin tactile/contact angle.
- Apply the user's [search-led content loop](search-led-content-loop.md) before choosing publication work. Prioritize verified updates to topics with useful traffic; diagnose weak stages and preserve active observation windows. Consult the latest batch records rather than treating a historical winner list as permanent.
- Follow the [GEO maintenance protocol](geo-maintenance.md) for fixed-question citation samples, referral/resource-use measurement and release acceptance. Its Tuesday/Friday local review is separate from this daily source-discovery workflow; the protocol distinguishes schedule configuration from completed runs.

## Monitored topic set

1. robotics and robot learning
2. humanoid robot and humanoid robotics
3. Physical AI and embodied AI
4. robot hand and dexterous manipulation
5. robot manipulation and contact-rich manipulation
6. tactile sensor, tactile AI, robot skin, and electronic skin
7. vision-language-action model (VLA)
8. world model, world-action model, and visuo-tactile world model
9. tactile datasets, benchmarks, ROS 2, and real-time robot inference

## Source order

1. Primary paper records: arXiv, DOI/publisher pages, conference proceedings.
2. Official laboratory and university releases.
3. Official robotics companies, standards bodies, ROS documentation, and the International Federation of Robotics.
4. Reputable secondary reporting only as discovery context; trace every technical claim back to a primary source before recommending publication.

## Daily output

The automated run writes `.artifacts/daily-research-watch.md` and `.artifacts/daily-research-watch.json`, adds the report to the GitHub Actions job summary, and uploads both files as a 30-day workflow artifact. It does not commit candidate data or publish pages.

Each run must report:

- search date and coverage window;
- five large-term signals with the reason each term matters;
- up to ten priority papers from bounded submitted-date and updated-date queries, deduplicated by arXiv ID within the run; the report does not claim a historical comparison it has not performed;
- publication date, evidence stage, primary URL, source-reported result, and explicit limitation for every item;
- a 0-5 RoboSkin relevance score;
- proposed action: ignore, monitor, add internal link, update an existing page, or create a distinct URL;
- proposed canonical URL and primary query when a new page is justified;
- homepage action only when the development materially changes a broad research lane.

If no strong finding appears, report that clearly instead of filling the brief with old or weak material.

## November 8, 2026 workflow refinement

The watch now queries both first submissions and recent revisions (eight bounded
arXiv batches), retains the newest version per ID, and sorts by source update date.
First publication and source revision dates remain separate. It reads primary
source ownership from existing News and Research records: a known paper routes to
its existing URL for review, even when a revision changes the title. References
inside another article do not create ownership. Dataset, world-model and tactile
simulation titles route to their specific long-lived resources before generic
robot-learning topics. Topic matches measure relevance, not search demand.

An empty Trends result is described as no matched daily signal only when all
markets succeeded. Failed/partial coverage remains unavailable. Daily RSS is not
a monthly keyword-volume estimate or the weekly normalized Trends study.

Every accepted News candidate must carry `substantive_delta`, `resource_updates`
and `evidence_stage` in `news-editorial-log.jsonl`. A companion resource update
must add a sourced fact or practical limitation, not only a link. Human content
review and release authorization remain separate from automated discovery and
technical checks. The existing schedule and read-only workflow permissions are
unchanged.

## Trend cadence

- Review Google Trends weekly using worldwide five-year and recent 90-day views.
- Treat Trends values as normalized relative interest, not search volume.
- Compare large terms in coherent groups so a dominant generic term does not flatten all niche terms.
- Use Search Console impressions, position, and clicks as the final evidence for page-level decisions.

## Publication gates

A new URL requires all of the following:

1. A search intent not already owned by an existing RoboSkin page.
2. At least one primary source and a defensible evidence boundary.
3. Enough material for a complete answer, not a thin news rewrite.
4. Natural internal links from the homepage or a relevant hub and back to its canonical definition route.
5. Structured data, canonical URL, sitemap/RSS inclusion, and export/production verification.

Broad terms such as `robotics`, `Physical AI`, or `humanoid robot` should not be repeated mechanically. They should appear where the page genuinely explains the concept and links it to robot skin, tactile sensing, contact data, manipulation, or control.
