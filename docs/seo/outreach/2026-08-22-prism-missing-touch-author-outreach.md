# PRISM and The Missing Touch author outreach — 2026-08-22

## State

- Both evidence-bounded RoboSkin records are live from production commit `c89183c760037f32b16bb7d7d4fee16c04b94e81`.
- Two Gmail drafts were created and rechecked under the `DRAFT` label on 2026-08-22.
- Neither message has been sent. No `contacted` row has been added to `outreach-log.csv`, no follow-up date is active, and neither draft counts as a backlink.
- If the drafts are approved and sent on 2026-08-22, the one permitted follow-up date is 2026-09-08, ten business days later. Recalculate that date if they are sent later.

## R21 — PRISM

### Live asset

- https://roboskin.ai/research/prism-contact-rich-industrial-skill-dataset-2026

### Public contact basis

- The [PRISM arXiv HTML](https://arxiv.org/html/2608.17962v1) identifies Hangxin Liu as the corresponding author and publishes `hx.liu@pku.edu.cn`.
- The [Peking University official faculty profile](https://sai.pku.edu.cn/info/1362/9405.htm) independently confirms Hangxin Liu and the same address.
- The arXiv author block publishes `yutengbo26@stu.pku.edu.cn` for first author Tengbo Yu.
- Recipient choice: Hangxin Liu; copy Tengbo Yu. Do not expand the first message to the remaining authors.

### Evidence boundary being reviewed

- The paper reports more than 5,000 robot trajectories paired with 5,000 human demonstrations, more than 45 hours, and more than 25 industrial tasks.
- The approximately 27 million images combine visual and visuotactile streams. The paper does not disclose the number or proportion of tactile-equipped episodes.
- The arXiv abstract describes the dataset as open-sourced, while the [official project page](https://tengbo-yu.github.io/PRISM/) still labels its Dataset control `soon`. The [official GitHub repository](https://github.com/Tengbo-Yu/PRISM) exposed no dataset files or dataset-file license when checked on 2026-08-22.
- RoboSkin records the release as announced and download pending until an official host exposes the files and reuse terms.

### Saved Gmail draft

Subject: `PRISM dataset record — factual review and release-status clarification`

The message links the live record, lists the four boundaries above, asks for corrections and the canonical dataset URL, version, license, and tactile-subset coverage, and offers a prompt update. It asks about an optional project-page or README resource listing only after correction and explicitly says that no endorsement, payment, or reciprocal link is requested.

## R22 — The Missing Touch

### Live asset

- https://roboskin.ai/research/missing-touch-spatial-tactile-feedback-teleoperation-2026

### Public contact basis

- The [arXiv HTML](https://arxiv.org/html/2608.19372v1) lists Rohan Kota, Gregory Reardon, and J. Edward Colgate but does not identify a corresponding author.
- The [Northwestern Haptics Lab official team page](https://sites.northwestern.edu/hapticsgroup/our-team/) publishes `rohankota2026@u.northwestern.edu` and `gregory.reardon@northwestern.edu`.
- Rohan Kota's [author-controlled site](https://www.rohankota.com/) independently confirms his address. Gregory Reardon's [ORCID record](https://orcid.org/0000-0002-1401-8450) independently confirms his Northwestern address.
- Recipient choice: first author Rohan Kota; copy Gregory Reardon. Do not copy J. Edward Colgate or the center inbox on the first message.
- The [Northwestern CRB contact page](https://robotics.northwestern.edu/contact/index.html) publishes `robotics@northwestern.edu`, but that address is a routing fallback, not the first outreach route.

### Evidence boundary being reviewed

- The study uses a 2-DoF bilateral teleoperation device, a physical GelSight Mini, and a 32-DoF spatially programmable cutaneous fingertip display.
- The button task has 12 participants, while peg rolling uses a separate 10-person group.
- The abstract's 29–79% range concerns study-specific dynamic-time-warping comparisons of deviation between teleoperated and natural trajectories.
- The paper did not train or evaluate an autonomous policy. The range must not be presented as an autonomous-policy, robot-dexterity, throughput, or universal manipulation gain.

### Saved Gmail draft

Subject: `The Missing Touch technical record — factual review invitation`

The message links the live record, asks the authors to check the hardware, participants, tasks, trials, and statistical interpretation, and asks for any canonical project, code, data, or media page. It asks about an optional lab publications, news, or resources listing only if the corrected explainer helps readers and explicitly says that no endorsement, payment, or reciprocal link is requested.

### Conditional official placement paths

- The [Northwestern CRB News & Events page](https://robotics.northwestern.edu/news-events/) is the strongest institutional route after author review. The center's [official contact page](https://robotics.northwestern.edu/contact/index.html) invites collaboration and publishes `robotics@northwestern.edu`; its news feed has included third-party robotics media coverage. Ask whether an accurate explainer belongs in external coverage, tagged to the paper's authors. This is an editorial request, not a promised placement.
- The [HAND Engineering Research Center News & Events page](https://hand-erc.org/news-and-events/) is a secondary route because the paper acknowledges HAND ERC support under NSF award 2330040 and J. Edward Colgate directs the center. Its [official contact page](https://hand-erc.org/contact-us/) publishes `hand@northwestern.edu`. Use this only after the authors have had a chance to correct the record; do not contact CRB, HAND, all authors, and the university news desk simultaneously.
- Northwestern Now accepts story tips through its official newsroom, but it should receive a research-news pitch only when there is a distinct news angle. Do not present that route as an external-link submission mechanism.

### PRISM placement sequence

If the PRISM authors confirm the analysis and welcome a resource entry, offer a minimal one-line pull request to the official project-page repository. Do not open an unsolicited link-only pull request or try to bypass the repository's restricted Issue route. A Peking University research-news placement should be proposed by the authors through their institutional channel rather than pitched to an unrelated feedback mailbox.

## Send and logging gate

Before sending either draft:

1. Open the saved Gmail draft and manually review the exact recipients, subject, facts, links, and signature.
2. Send each message individually; do not merge the two teams into a bulk campaign.
3. Confirm the message appears in Gmail Sent Mail.
4. Only then append `R21` or `R22` to `outreach-log.csv` with status `awaiting response` and the actual send date.
5. Follow up once after ten business days only if there is no response. A reply, sent message, or draft remains outreach activity; count a result only after a third-party page publishes a crawlable editorial link.
