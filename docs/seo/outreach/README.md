# RoboSkin.ai Outreach Runbook

## Goal

Earn three crawlable, editorially chosen referring domains for the RoboSkin Tactile Research Index without paid links, bulk automation, or endorsement requests.

## Weekly cadence

1. Select five `ready` targets from `targets.md`.
2. Verify the target page and public contact route on the day of outreach.
3. Personalize one template around the exact paper, resource page, or community discussion.
4. Send only after human review.
5. Record the date and outcome in `outreach-log.csv`.
6. Follow up once after 10 business days. Stop after that unless the recipient replies.

## Qualification

A target is ready only when:

- Its audience overlaps tactile sensing, robot skin, robot learning, ROS 2, electronic skin, or dexterous manipulation.
- A public contact, issue, contribution, or submission route is still available.
- The message names the exact reason the index helps that audience.
- The target is not being asked to endorse RoboSkin.ai or add a link as a condition of inclusion.

## Counting results

Count a referring domain only after a crawlable editorial link is live. Social posts, email replies, nofollow profile links, GitHub links owned by RoboSkin.ai, and links created by RoboSkin.ai do not satisfy the three-domain target.

## Verified result snapshot

- As of 2026-08-22, four editorial placements are live: the maintainer-approved Awesome-Touch entry merged in [PR #41](https://github.com/linchangyi1/Awesome-Touch/pull/41), the [Robotics & Automation News article](https://roboticsandautomationnews.com/2026/08/19/researchers-combine-eit-and-pneumatic-sensing-for-humanoid-robot-skin/104274/), the RoboSkin tactile dataset entry merged in [Awesome Robot Learning PR #6](https://github.com/RayYoh/Awesome-Robot-Learning/pull/6), and the [RoboticsTomorrow hybrid robot-skin article](https://www.roboticstomorrow.com/story/2026/08/hybrid-robot-skin-combines-eit-location-maps-with-pneumatic-force-sensing/26954/).
- These are `4` verified editorial placements across `3` unique referring domains: `github.com`, `roboticsandautomationnews.com`, and `roboticstomorrow.com`. The original unique-domain milestone is complete at `3 / 3`.
- Awesome Robot Learning now contains a dedicated `Tactile / Visuo-Tactile Resources` section linking directly to `https://roboskin.ai/datasets`. It strengthens GitHub topical authority but does not create a new referring domain.
- RoboticsTomorrow's live article returns HTTP 200 and contains four direct RoboSkin links without `nofollow`, `sponsored`, or `ugc`: the homepage, humanoid robot-skin guide, flexible tactile-sensor-array guide, and Tactile Research Index. The article has no `noindex` or `X-Robots-Tag` restriction, its path is not blocked by `robots.txt`, and all four target URLs return HTTP 200.
- Robotics & Automation News changed its existing RoboSkin citation from the homepage to the exact [hybrid EIT-pneumatic robot-skin brief](https://roboskin.ai/news/eit-pneumatic-hybrid-robot-skin-force-map-2026). The verified live anchor has no `nofollow`, `sponsored`, or `ugc` attribute, so the placement now transfers users and crawlers to the most relevant source page.
- Form submissions, sent emails, open issues, and unmerged pull requests remain outreach activity only. Do not count them as backlinks until the destination page links to RoboSkin.ai and the link is crawlable.
