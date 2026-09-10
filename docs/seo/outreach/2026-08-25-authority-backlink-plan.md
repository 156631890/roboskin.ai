# Authority Backlink Audit and Action Plan — 2026-08-25

## Execution results

Historical snapshot below. The IROS email receipt, original attachment and
activation status were reconciled on 2026-09-10 in the
[submission record](../../submissions/iros-2026-touch-to-action.md).

- IROS reply: sent in the existing organizer thread and verified with Gmail message ID `1a034c7fec38c29d` in thread `1a0248b8f93eff98`. The workshop route remains temporary email receipt pending OpenReview activation and organizer confirmation; it is not an acceptance or backlink.
- Awesome-Embodied-AI: pull request [#5](https://github.com/wadeKeith/Awesome-Embodied-AI/pull/5) is public and open. The repository check passed after explicitly enabling UTF-8 for the Windows Python process. It is not counted as a backlink unless merged.
- Open Robotics Discourse: submitted to the official Projects category and awaiting moderation. The GitHub-linked account was created with username `steven_yang`, and the public display name was verified as `Steven Yang`. The account activity page shows `Pending (1)` for the exact prepared title and body; both the GitHub repository and RoboSkin engineering-guide links are present. No public topic URL or backlink exists until moderators approve the post, so it must not be resubmitted or counted yet.

## Verified position

The verified result remains four editorial placements across three unique referring domains. The four live placements are the Awesome-Touch README, the Robotics & Automation News article, the Awesome Robot Learning README, and the RoboticsTomorrow article.

The live-link audit on 2026-08-25 found:

- Robotics & Automation News still links directly to the source-specific RoboSkin news brief.
- RoboticsTomorrow still contains four RoboSkin links: the homepage, humanoid robot skin guide, flexible tactile sensor array guide, and Tactile Research Index.
- Awesome-Touch still contains the RoboSkin source review.
- Awesome Robot Learning still contains the RoboSkin tactile dataset directory on its `master` branch.

No email, open issue, open pull request, social post, owned profile, or paid placement is counted as an earned editorial backlink.

## Existing outreach status

Four pull requests and six scope-check issues remain open without maintainer comments. Their recorded review windows begin on 2026-09-02 or later, so no reminder should be posted on 2026-08-25.

The Gmail audit found one material authority response:

- Carlo Alessi confirmed that IROS 2026 Touch-to-Action could accept the attached two-page submission by email for the moment.
- After receiving the OpenReview profile URL, he reported that `~steven_yang2` was not active and asked whether verification and all profile steps were complete.
- This is an active workshop-submission route, not a backlink or an acceptance decision.

Maurizio Valle's response is an out-of-office notice through August 31. It does not require an early follow-up.

The RankPulse shortlist consists of paid guest-post offers priced at approximately USD 160–450. It does not supply the requested recent article examples, measurement sources, check dates, traffic trends, country mix, or proof of publisher authorization. RoboSkin.ai should not purchase or continue negotiating these placements.

## Action A — Open Robotics Discourse project post

Target: `https://discourse.openrobotics.org/c/projects/10`

Qualification: the official Projects category permits community members to post projects built with ROS. Recent posts include open-source ROS 2 sensor, telemetry, and manipulation projects. The post must be technical, disclose ownership, avoid ranking language, and ask for engineering feedback.

Proposed title:

`RoboSkin ROS 2 tactile-array starter kit: message contract, synthetic publisher, and rosbag2 example`

Proposed body:

> Hi everyone,
>
> I maintain RoboSkin.ai and have released v0.1.0 of a small Apache-2.0 ROS 2 tactile-array starter kit. The goal is not to propose an official message standard or claim hardware compatibility; it is a hardware-neutral reference for teams that need a typed message contract, a deterministic test stream, and a record/replay path before connecting a real tactile sensor.
>
> It includes:
>
> - an experimental `TactileArray` interface with timestamp, frame and sensor IDs, taxel-grid dimensions, channel names and units, channel-major values, and a validity mask;
> - a deterministic synthetic publisher and contract monitor;
> - launch parameters and a rosbag2 QoS override example;
> - a sample CSV, message-contract documentation, `CITATION.cff`, and dependency-free contract tests;
> - a CI build against ROS 2 Lyrical.
>
> Code and v0.1.0 release: https://github.com/roboskin-ai/ros2-tactile-starter-kit
>
> Engineering guide: https://roboskin.ai/guides/ros2-tactile-sensing
>
> Evidence boundary: all bundled values are synthetic. The project makes no latency, accuracy, force-range, sampling-rate, robustness, or real-hardware performance claim.
>
> I would particularly value feedback on the message semantics, invalid-taxel handling, channel-major layout, and the QoS and recording defaults.

Do not add a manual signature because Discourse attaches profile identity to the post.

## Action B — Awesome-Embodied-AI toolkit pull request

Target: `https://github.com/wadeKeith/Awesome-Embodied-AI`

Qualification: the repository is active, has 239 stars at audit time, explicitly welcomes pull requests, provides a `Toolkits` section, and requires stable project links and a passing `scripts/check_readme.py` check.

Proposed single README entry under `## Toolkits`:

```md
- [x] RoboSkin ROS 2 Tactile Starter Kit [[Project Link]](https://roboskin.ai/guides/ros2-tactile-sensing) [2026]
```

The pull-request body should link the Apache-2.0 code repository, v0.1.0 release, and successful CI run; disclose that Steven Yang maintains RoboSkin.ai; state that the values are synthetic; and request editorial review without asking for endorsement or reciprocal placement.

## Action C — IROS organizer reply

Reply to the existing thread, retaining the existing recipients and subject:

> Dear Dr. Alessi,
>
> Thank you for checking the profile and for confirming that the workshop can receive the submission by email for the moment.
>
> You are correct: the public profile still reports `~steven_yang2` as inactive. I have attempted the email-verification and activation flow, but the profile has not become active. I am continuing to resolve this with OpenReview.
>
> In the meantime, could you please confirm that the attached two-page manuscript remains received by email while the profile issue is being resolved? I will send you the active profile link as soon as OpenReview completes the activation.
>
> Best regards,
> Steven Yang
> RoboSkin.ai

This reply preserves the submission route without claiming formal acceptance or asking for a backlink.

## Counting rule

Action A becomes an external crawlable UGC link only after the topic is public. Action B becomes an editorial GitHub placement only after the pull request is merged. Action C remains academic outreach until the workshop confirms submission status and, separately, publishes a crawlable page linking to RoboSkin.ai.
