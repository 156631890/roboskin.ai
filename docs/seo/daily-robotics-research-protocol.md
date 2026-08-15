# RoboSkin Daily Robotics Research Protocol

## Schedule and purpose

- Run automatically every day at 09:17 Asia/Shanghai through `.github/workflows/daily-research-watch.yml`.
- Run manually with `npm run research:watch` when an immediate review is needed.
- Produce a source-linked research brief for editorial review.
- Do not auto-publish or deploy a page solely because a term is trending.
- Promote a finding to the website only when it has a primary source, a distinct search intent, and a clear RoboSkin tactile/contact angle.

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
- up to ten new papers or official releases, deduplicated against earlier reports;
- publication date, evidence stage, primary URL, source-reported result, and explicit limitation for every item;
- a 0-5 RoboSkin relevance score;
- proposed action: ignore, monitor, add internal link, update an existing page, or create a distinct URL;
- proposed canonical URL and primary query when a new page is justified;
- homepage action only when the development materially changes a broad research lane.

If no strong finding appears, report that clearly instead of filling the brief with old or weak material.

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
