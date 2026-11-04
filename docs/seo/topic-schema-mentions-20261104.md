# Topic JSON-LD external mention correction

On November 4, 2026, production verification confirmed that the ROS 2 tutorial emitted an invalid site-origin prefix on the public starter-kit GitHub URL in both its WebPage and TechArticle `mentions`. The visible hyperlink was correct.

The shared topic graph builder had treated every related link as a local canonical path. Resolve these mention URLs against the existing site origin instead: absolute external targets retain their origin, while local paths become absolute site URLs. Page canonical generation, content, dates, links, imagery and sitemap membership remain unchanged.

Regression coverage exercises the rendered tutorial and graph outputs across the actual topic catalogue, with an additional query/fragment case. Verify the built HTML schema across all exported routes and compare unchanged content/metadata on the programming overview and two tutorials. Normal PR checks and automatic deployment must pass, followed by exact production SHA and output verification.

This is a shared structured-data correction, not a new article or another completed factual review. The whole-site queue remains active at 41 of 210 individually reviewed and revised URLs. No GSC request, outreach, new credentials or permissions.
