# Backlink reconciliation and social content batch - 2026-09-10

## Verified public placements

This batch rechecked the five previously known referring pages and the Open
Robotics topic. All six returned HTTP 200 without authenticated browser cookies
and exposed nine direct RoboSkin links across four root domains. This is the
audited subset, not a whole-web or Google Search Console count.

| Referring page | Direct RoboSkin links | Observed treatment |
| --- | ---: | --- |
| [Awesome-Touch](https://github.com/linchangyi1/Awesome-Touch/blob/main/README.md) | 1 | nofollow |
| [Awesome Robot Learning](https://github.com/RayYoh/Awesome-Robot-Learning/blob/master/README.md) | 1 | nofollow |
| [Awesome-Embodied-AI](https://github.com/wadeKeith/Awesome-Embodied-AI/blob/main/README.md) | 1 | nofollow |
| [Robotics & Automation News](https://roboticsandautomationnews.com/2026/08/19/researchers-combine-eit-and-pneumatic-sensing-for-humanoid-robot-skin/104274/) | 1 | noopener |
| [RoboticsTomorrow](https://www.roboticstomorrow.com/story/2026/08/hybrid-robot-skin-combines-eit-location-maps-with-pneumatic-force-sensing/26954/) | 4 | no rel attribute |
| [Open Robotics project topic](https://discourse.openrobotics.org/t/roboskin-ros-2-tactile-array-starter-kit-message-contract-synthetic-publisher-and-rosbag2-example/57650) | 1 | noopener, nofollow, ugc |

The last row is an owned community contribution, distinct from the five editorial
placements above. Its publication predates this audit; it was not newly submitted
today. The public topic shows the original August 25 post and points to the ROS 2
engineering guide. The old pending-moderation state in C29 is superseded.

[ROS News for the Week of August 24th, 2026](https://discourse.openrobotics.org/t/ros-news-for-the-week-of-august-24th-2026/57728)
also links to that community topic. This is an independently published reference
to the project post; it does not add a direct RoboSkin link or another root domain.

Robotics & Automation News was retrieved using Windows system-trust HTTPS after
Python Requests could not validate its local issuer chain. Certificate checks
were kept enabled. The other HTTP checks used fresh unauthenticated requests.

## Existing submissions

The 15 distinct GitHub PR/issue URLs in the outreach log were checked through the
GitHub API, including comments and pull-request reviews where present:

- Merged: C13 and C28. C28 merged on 2026-08-25 at 16:38:41 UTC and is corrected in
  the CSV to linked; the public README destination is verified.
- Open PRs: C02, C14, C18 and C26; no maintainer comments or reviews found.
- Open scope issues: C15, C16, C17, C20, C24 and C25; no replies found.
- C09 and C10: the only comments are the user's existing final follow-ups; no new
  reminder was posted.
- C19: the maintainer's out-of-scope decline remains closed and respected.

## Next qualified follow-up

C12, `sun254667/awesome-touch`, remains active and publicly invites suggestions
for papers and datasets through its Contact section. Its README does not contain
RoboSkin. The original email thread contains one SENT message and no received
reply. No existing draft to the recipient was found before preparation.

One final follow-up was prepared as an unsent Gmail draft in that original thread.
It describes the directory's comparison, CSV export and checklist additions,
discloses ownership, and leaves placement to the maintainer's editorial judgment.
It uses the original correspondence signature. Sending remains pending explicit
user approval; a draft is neither sent outreach nor a backlink.

Three additional repository candidates were screened without contact:
`fkromer/awesome-ros2` is archived, and the last pushes reported by the GitHub API
for `Ly0n/awesome-robotic-tooling` and `kiloreux/awesome-robotics` were in 2023 and
2024 respectively. No new contribution was submitted to these candidates.

## Social content deliverables

Prepared a private review package for LinkedIn, X, Facebook, Instagram, Xiaohongshu,
WeChat and Reddit: 15 copy units including a four-part X thread, three generated
campaign images, account descriptions, two video scripts, a 14-day suggested
sequence, optional UTM links, and a publication log. These are drafts, not account
creation, scheduled jobs, posted content, or completed video files.

The assets use the website's charcoal, warm ivory and orange palette. Hardware
visuals are explicitly conceptual. Copy describes currently implemented directory
filters, comparison of up to three records, directory CSV exports and source
limitations. No new experiment, performance result, hardware product, affiliation,
user count or publication acceptance is claimed. Ten referenced landing/resource
URLs returned HTTP 200 in this batch.

Full unpublished copy and the outbound draft are kept outside this public
repository. The task checkpoint records the local package location and verification.
Evidence for this audit is in `output/social-2026-09-10/`.
