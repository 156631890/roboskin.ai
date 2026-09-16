# Robotics programming tutorial introduction — prepared, not sent

Prepared on 2026-09-16. This is local review material. The new production URLs
and updated ROS guide must be released and checked before sharing this draft.
No email, community post, directory submission or external PR was created or
changed during this work.

## Short English introduction

**Learn robotics programming through tactile data, without a robot**

RoboSkin.ai has prepared a practical learning path for developers who know basic
programming and are new to robotics. The Python exercise needs no robot, tactile
sensor, GPU or ROS installation. Download a small project, validate a synthetic
CSV, generate a heatmap and time-series plot, and export contact-event segments
with explicit missing-data handling.

The supplied run produces 12 frames, three teaching contact-event segments and
three unknown frames. It was reproduced in a clean Windows environment with
Python 3.13.3, and 12 behavior tests passed. These are synthetic teaching signals,
not sensor measurements, calibrated contact detection or a physical simulation.

A companion ROS 2 guide follows the open-source tactile starter kit. Its source
and upstream Lyrical build/interface checks were reviewed; local ROS publishing,
recording and playback have not been executed. The guides connect these exercises
to tactile AI, robot learning and the site's research dataset directory.

- Learning path: https://roboskin.ai/robotics-programming
- Python tutorial: https://roboskin.ai/guides/python-tactile-data-processing
- Python source and results (Apache-2.0 code, CC0-1.0 data): https://roboskin.ai/tutorials/python-tactile/python-tactile-project.zip
- ROS 2 guide: https://roboskin.ai/guides/ros2-tactile-sensing
- ROS 2 source (Apache-2.0): https://github.com/roboskin-ai/ros2-tactile-starter-kit

## Evidence available for a future introduction

- `public/tutorials/python-tactile/results/heatmap.png`: generated 2 × 2 array;
  caption: “Synthetic teaching array at 0.4 s. The gray taxel is unknown, not zero.”
- `public/tutorials/python-tactile/results/timeline.png`: actual threshold plot;
  caption: “Normalized synthetic values, teaching threshold and unknown frames;
  not hardware-calibrated contact detection.”
- `.artifacts/programming-20260916/`: actual local browser screenshots and
  verification reports. Use only screenshots whose filenames appear in the
  delivery checkpoint; they are local previews, not production screenshots.
- No ROS runtime screenshot or demonstration recording exists for this work.

## Previous-contact check and duplication limits

Reviewed the local `2026-09-13-resource-link-tracker.csv` and related drafts.
These are the last recorded statuses, not new claims about live PR or inbox state.
No mailbox was opened because this round only prepares material.

| Recorded target | Existing record | Handling for this draft |
| --- | --- | --- |
| Awesome Robot Learning | Existing dataset-directory inclusion | Do not resubmit an already included resource. |
| Awesome Embodied AI | Existing ROS guide inclusion, prior PR merged | Do not submit a second equivalent listing. |
| Awesome Dexterous Hands, PR 1 | Recorded as awaiting review | Leave the existing PR untouched. |
| Open Robotics Discourse, topic 57650 | Existing starter-kit post and September 12 reply | Do not create a duplicate introductory thread. |
| IEEE RAS Robot Learning TC | Prior outreach; follow-up recorded September 8 | Check for a response before considering any later message. |
| Weekly Robotics | Prior submission; follow-up recorded September 8 | Do not send another pitch during this round. |

Before any later outreach, verify production links and the selected recipient's
latest record. This document itself grants no sending or publishing authorization.
