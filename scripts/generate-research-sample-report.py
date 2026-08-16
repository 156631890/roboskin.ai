from __future__ import annotations

from pathlib import Path
from typing import Iterable

from reportlab.lib import colors
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import mm
from reportlab.platypus import (
    BaseDocTemplate,
    Frame,
    HRFlowable,
    Image,
    KeepTogether,
    PageBreak,
    PageTemplate,
    Paragraph,
    Spacer,
    Table,
    TableStyle,
)


ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / "output" / "pdf" / "roboskin-tactile-ai-robot-skin-sample-report-2026.pdf"
PUBLIC_COPY = ROOT / "public" / "reports" / "roboskin-tactile-ai-robot-skin-sample-report-2026.pdf"
COVER_IMAGE = ROOT / "public" / "generated" / "authority" / "roboskin-index-cover.webp"

PAGE_W, PAGE_H = A4
MARGIN_X = 17 * mm
MARGIN_TOP = 18 * mm
MARGIN_BOTTOM = 17 * mm

INK = colors.HexColor("#171714")
GRAPHITE = colors.HexColor("#11110F")
PAPER = colors.HexColor("#F2EDE1")
MUTED = colors.HexColor("#6D685F")
LINE = colors.HexColor("#C9C2B5")
ORANGE = colors.HexColor("#F25B35")
SOFT_ORANGE = colors.HexColor("#FFE0D5")
SOFT_GRAY = colors.HexColor("#E8E2D6")
WHITE = colors.white


DATASETS = [
    {
        "name": "HT-Bench",
        "year": "2026",
        "sensor": "Full-hand tactile array",
        "scale": "10M RGB frames; 7.8M tactile frames; 226 tasks",
        "access": "Paper verified; no dedicated download verified",
        "license": "Not stated on reviewed paper page",
        "source": "https://arxiv.org/abs/2606.19161",
    },
    {
        "name": "RCT: Robotic Contact Tactile",
        "year": "2026",
        "sensor": "3 DIGIT sensors",
        "scale": "29,279 frames; 1,832 sequences; 122 materials",
        "access": "Public dataset, splits, and evaluation code",
        "license": "CC BY 4.0 data; Apache-2.0 code",
        "source": "https://arxiv.org/abs/2606.31694",
    },
    {
        "name": "TactiDex",
        "year": "2026",
        "sensor": "Whole-hand tactile glove",
        "scale": "Scale not stated on reviewed project page",
        "access": "Project documented; download not verified",
        "license": "Not stated on reviewed project page",
        "source": "https://arxiv.org/abs/2607.09190",
    },
    {
        "name": "FreeTacMan",
        "year": "2025",
        "sensor": "Modular LED visuo-tactile sensor",
        "scale": ">3M image pairs; >10K trajectories; 50 tasks",
        "access": "Public dataset, code, and hardware guide",
        "license": "MIT",
        "source": "https://arxiv.org/abs/2506.01941",
    },
    {
        "name": "Humanoid Visual-Tactile-Action",
        "year": "2025",
        "sensor": "1,062 tactile sensors per hand",
        "scale": "101.9K synchronized samples; 4 soft-object tasks",
        "access": "Paper verified; public download not verified",
        "license": "Access terms not stated",
        "source": "https://arxiv.org/abs/2510.25725",
    },
    {
        "name": "Sparsh-X multisensory resource",
        "year": "2025",
        "sensor": "Digit 360",
        "scale": "Approximately 1M unlabeled interactions",
        "access": "Training resource described; download not verified",
        "license": "Not stated on reviewed paper page",
        "source": "https://arxiv.org/abs/2506.14754",
    },
]


SIGNALS = [
    {
        "topic": "Full-hand benchmark scale",
        "work": "HT-Bench",
        "evidence": "Preprint",
        "signal": "Large synchronized RGB and tactile corpus across 226 tasks.",
        "limit": "Embodiment and transfer claims require independent validation.",
        "source": "https://arxiv.org/abs/2606.19161",
    },
    {
        "topic": "Action-conditioned touch",
        "work": "FeelWorld",
        "evidence": "Preprint",
        "signal": "Predicts visual futures, contact, tactile latent state, and slip for planning.",
        "limit": "Evidence is tied to reported tasks, sensors, and planning protocol.",
        "source": "https://arxiv.org/abs/2607.24267",
    },
    {
        "topic": "Tactile world-action model",
        "work": "Dream-Tac",
        "evidence": "Preprint",
        "signal": "Uses action-conditioned tactile prediction for contact-rich manipulation.",
        "limit": "Cross-sensor and cross-task transfer remains an evaluation question.",
        "source": "https://arxiv.org/abs/2606.08737",
    },
    {
        "topic": "Multisensory representation",
        "work": "Sparsh-X",
        "evidence": "Preprint",
        "signal": "Combines tactile image, audio, motion, and pressure from Digit 360.",
        "limit": "Downstream results depend on sensor coverage and task protocol.",
        "source": "https://arxiv.org/abs/2506.14754",
    },
    {
        "topic": "Cross-sensor force",
        "work": "GenForce",
        "evidence": "Peer-reviewed",
        "signal": "Maps shared marker representations across GelSight, TacTip, and uSkin.",
        "limit": "Equivalent performance is not established for every geometry or environment.",
        "source": "https://www.nature.com/articles/s41467-026-68753-1",
    },
    {
        "topic": "Full-hand tactile coverage",
        "work": "Nature Machine Intelligence study",
        "evidence": "Peer-reviewed",
        "signal": "Uses 17 vision-based tactile sensors across 70% of a custom hand's palmar surface.",
        "limit": "Results come from one hand and one task family; coverage is not whole-body.",
        "source": "https://www.nature.com/articles/s42256-025-01053-3",
    },
]


REFERENCES = [
    ("HT-Bench paper", "https://arxiv.org/abs/2606.19161"),
    ("RCT paper", "https://arxiv.org/abs/2606.31694"),
    ("RCT project", "https://faerber-lab.github.io/RCT/"),
    ("RCT code", "https://github.com/faerber-lab/RCT"),
    ("RCT dataset", "https://figshare.com/s/a5ed417ba6602ccad0f6"),
    ("TactiDex paper", "https://arxiv.org/abs/2607.09190"),
    ("TactiDex project", "https://tactidex.github.io/"),
    ("FreeTacMan paper", "https://arxiv.org/abs/2506.01941"),
    ("FreeTacMan project", "https://opendrivelab.com/FreeTacMan"),
    ("FreeTacMan code", "https://github.com/OpenDriveLab/FreeTacMan"),
    ("FreeTacMan dataset", "https://huggingface.co/datasets/OpenDriveLab/FreeTacMan"),
    ("Humanoid Visual-Tactile-Action paper", "https://arxiv.org/abs/2510.25725"),
    ("Sparsh-X paper", "https://arxiv.org/abs/2506.14754"),
    ("FeelWorld paper", "https://arxiv.org/abs/2607.24267"),
    ("Dream-Tac paper", "https://arxiv.org/abs/2606.08737"),
    ("GenForce paper", "https://www.nature.com/articles/s41467-026-68753-1"),
    ("Full-hand tactile sensing paper", "https://www.nature.com/articles/s42256-025-01053-3"),
]


def make_styles():
    base = getSampleStyleSheet()
    return {
        "body": ParagraphStyle(
            "Body",
            parent=base["BodyText"],
            fontName="Helvetica",
            fontSize=9.2,
            leading=14,
            textColor=INK,
            spaceAfter=7,
        ),
        "body_muted": ParagraphStyle(
            "BodyMuted",
            parent=base["BodyText"],
            fontName="Helvetica",
            fontSize=8.3,
            leading=12.5,
            textColor=MUTED,
        ),
        "kicker": ParagraphStyle(
            "Kicker",
            parent=base["BodyText"],
            fontName="Helvetica-Bold",
            fontSize=7.5,
            leading=10,
            textColor=ORANGE,
            tracking=1.1,
            spaceAfter=8,
        ),
        "h1": ParagraphStyle(
            "H1",
            parent=base["Heading1"],
            fontName="Helvetica-Bold",
            fontSize=28,
            leading=29,
            textColor=GRAPHITE,
            spaceAfter=12,
        ),
        "h2": ParagraphStyle(
            "H2",
            parent=base["Heading2"],
            fontName="Helvetica-Bold",
            fontSize=20,
            leading=22,
            textColor=GRAPHITE,
            spaceAfter=10,
        ),
        "h3": ParagraphStyle(
            "H3",
            parent=base["Heading3"],
            fontName="Helvetica-Bold",
            fontSize=11,
            leading=13,
            textColor=GRAPHITE,
            spaceAfter=5,
        ),
        "table": ParagraphStyle(
            "Table",
            parent=base["BodyText"],
            fontName="Helvetica",
            fontSize=6.7,
            leading=9,
            textColor=INK,
        ),
        "table_head": ParagraphStyle(
            "TableHead",
            parent=base["BodyText"],
            fontName="Helvetica-Bold",
            fontSize=6.6,
            leading=8.5,
            textColor=WHITE,
        ),
        "source": ParagraphStyle(
            "Source",
            parent=base["BodyText"],
            fontName="Helvetica",
            fontSize=7.1,
            leading=10.2,
            textColor=MUTED,
            allowWidows=0,
            allowOrphans=0,
        ),
        "number": ParagraphStyle(
            "Number",
            parent=base["BodyText"],
            fontName="Helvetica-Bold",
            fontSize=22,
            leading=22,
            textColor=ORANGE,
        ),
    }


STYLES = make_styles()


class ReportDocTemplate(BaseDocTemplate):
    def __init__(self, filename: str):
        super().__init__(
            filename,
            pagesize=A4,
            rightMargin=MARGIN_X,
            leftMargin=MARGIN_X,
            topMargin=MARGIN_TOP,
            bottomMargin=MARGIN_BOTTOM,
            title="Tactile AI and Robot Skin Landscape: Sample Report 2026",
            author="RoboSkin.ai Editorial Team",
            subject="Source-backed sample research report on tactile AI and robot skin",
            creator="RoboSkin.ai",
        )
        frame = Frame(
            self.leftMargin,
            self.bottomMargin,
            self.width,
            self.height,
            id="body",
            leftPadding=0,
            rightPadding=0,
            topPadding=0,
            bottomPadding=0,
        )
        self.addPageTemplates([
            PageTemplate(
                id="main",
                frames=[frame],
                onPage=draw_background,
                onPageEnd=draw_page_marks,
            )
        ])


def draw_background(canvas, doc):
    canvas.saveState()
    canvas.setFillColor(PAPER)
    canvas.rect(0, 0, PAGE_W, PAGE_H, fill=1, stroke=0)
    canvas.restoreState()


def draw_page_marks(canvas, doc):
    page = canvas.getPageNumber()
    canvas.saveState()
    if page > 1:
        canvas.setFont("Helvetica", 7)
        canvas.setFillColor(MUTED)
        page_text = f"{page:02d}"
        canvas.drawRightString(PAGE_W - MARGIN_X, PAGE_H - 9.5 * mm, page_text)
    canvas.restoreState()


def p(text: str, style: str = "body"):
    return Paragraph(text, STYLES[style])


def section_header(kicker: str, title: str, summary: str):
    return [
        p(kicker.upper(), "kicker"),
        p(title, "h1"),
        p(summary, "body_muted"),
        Spacer(1, 5 * mm),
        HRFlowable(width="100%", thickness=0.7, color=GRAPHITE, spaceAfter=6 * mm),
    ]


def table_paragraph(value: str, header: bool = False):
    return Paragraph(value, STYLES["table_head" if header else "table"])


def dataset_table(rows: Iterable[dict]):
    header = ["Dataset", "Sensor", "Scale", "Access and license"]
    data = [[table_paragraph(cell, True) for cell in header]]
    for row in rows:
        name = f"<b>{row['name']}</b><br/><font color='#6D685F'>{row['year']}</font>"
        access = f"{row['access']}<br/><font color='#6D685F'>{row['license']}</font>"
        data.append([
            table_paragraph(name),
            table_paragraph(row["sensor"]),
            table_paragraph(row["scale"]),
            table_paragraph(access),
        ])

    table = Table(data, colWidths=[35 * mm, 35 * mm, 51 * mm, 46 * mm], repeatRows=1, hAlign="LEFT")
    table.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, 0), GRAPHITE),
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
                ("LEFTPADDING", (0, 0), (-1, -1), 5),
                ("RIGHTPADDING", (0, 0), (-1, -1), 5),
                ("TOPPADDING", (0, 0), (-1, -1), 6),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 6),
                ("LINEBELOW", (0, 1), (-1, -1), 0.35, LINE),
                ("BACKGROUND", (0, 1), (-1, -1), colors.HexColor("#F7F3EA")),
            ]
        )
    )
    return table


def source_link(label: str, url: str):
    return p(f"<b>{label}</b><br/><link href='{url}' color='#B83D20'>{url}</link>", "source")


def build_story():
    story = []

    # Cover
    story.extend(
        [
            Spacer(1, 2 * mm),
            p("ROBOSKIN.AI / FREE SAMPLE EDITION / 2026", "kicker"),
            p("Tactile AI and<br/>Robot Skin Landscape", "h1"),
            p(
                "A source-backed field map of tactile intelligence layers, public robotics datasets, research signals, and evaluation questions.",
                "body",
            ),
            Spacer(1, 6 * mm),
            Image(str(COVER_IMAGE), width=176 * mm, height=92 * mm, kind="proportional"),
            Spacer(1, 8 * mm),
            Table(
                [
                    [p("6", "number"), p("6", "number"), p("17", "number")],
                    [p("Datasets reviewed", "body_muted"), p("Research signals", "body_muted"), p("Primary URLs", "body_muted")],
                ],
                colWidths=[58 * mm, 58 * mm, 58 * mm],
                style=TableStyle(
                    [
                        ("VALIGN", (0, 0), (-1, -1), "TOP"),
                        ("LEFTPADDING", (0, 0), (-1, -1), 0),
                        ("RIGHTPADDING", (0, 0), (-1, -1), 6),
                        ("LINEABOVE", (0, 0), (-1, 0), 0.5, LINE),
                        ("TOPPADDING", (0, 0), (-1, 0), 7),
                    ]
                ),
            ),
            Spacer(1, 7 * mm),
            p("Prepared by the RoboSkin.ai Editorial Team", "body_muted"),
            p("Published 17 August 2026 | roboskin.ai/research-services", "body_muted"),
            PageBreak(),
        ]
    )

    # Executive map
    story.extend(
        section_header(
            "Field map",
            "Touch becomes intelligence through a complete stack.",
            "Robot skin is the sensing surface. Tactile AI is the learning and decision layer. Physical AI is the broader embodied system in which touch changes action.",
        )
    )
    stack = [
        ("Physical contact", "Contact geometry, pressure, shear, slip, temperature, vibration, damage, or proximity."),
        ("Robot skin and sensors", "Flexible arrays, fingertip sensors, tactile gloves, electronic skin, and large-area body coverage."),
        ("Signal and data layer", "Calibration, synchronization, transforms, logging, access terms, and comparable task labels."),
        ("Tactile AI", "Representations, multimodal fusion, world models, policies, contact prediction, and corrective control."),
        ("Robot action", "Grasp stability, manipulation, collision awareness, human-robot interaction, and physical-world learning."),
    ]
    stack_rows = []
    for index, (title, body) in enumerate(stack, start=1):
        stack_rows.append([
            p(f"{index:02d}", "kicker"),
            p(title, "h3"),
            p(body, "body_muted"),
        ])
    stack_table = Table(stack_rows, colWidths=[14 * mm, 43 * mm, 110 * mm], hAlign="LEFT")
    stack_table.setStyle(TableStyle([
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("LEFTPADDING", (0, 0), (-1, -1), 0),
        ("RIGHTPADDING", (0, 0), (-1, -1), 8),
        ("TOPPADDING", (0, 0), (-1, -1), 8),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 8),
        ("LINEBELOW", (0, 0), (-1, -1), 0.4, LINE),
    ]))
    story.extend([
        stack_table,
        Spacer(1, 8 * mm),
        p("KEY TAKEAWAY", "kicker"),
        p(
            "A sensor specification is not a tactile intelligence result. Evidence must connect the physical interface, data pipeline, model, task, robot embodiment, and evaluation protocol.",
            "h2",
        ),
        PageBreak(),
    ])

    # Landscape observations
    story.extend(
        section_header(
            "Research landscape",
            "Five signals shaping tactile robotics in 2025-2026.",
            "These are evidence-backed research directions, not market-size forecasts. Each signal is bounded by the systems and protocols in its cited source.",
        )
    )
    observations = [
        ("Dataset scale is increasing", "HT-Bench reports millions of synchronized visual and tactile frames, while FreeTacMan reports more than 3M image pairs and more than 10K trajectories."),
        ("Access quality is uneven", "Some resources provide data, code, licenses, and split tools. Others describe a dataset without a verified public download or license."),
        ("Touch is becoming multimodal", "Sparsh-X combines tactile images with audio, motion, and pressure. Humanoid data can include vision, proprioception, actions, and dense pressure."),
        ("Coverage is moving beyond fingertips", "Recent work targets full-hand, high-coverage gripper, forearm, and large-area surfaces, but whole-body transfer remains a separate engineering problem."),
        ("Prediction is joining perception", "FeelWorld and Dream-Tac treat touch as a future state conditioned on robot action, connecting tactile sensing to planning and world-model research."),
    ]
    for idx, (title, body) in enumerate(observations, start=1):
        story.append(KeepTogether([
            Table(
                [[p(f"{idx:02d}", "kicker"), p(title, "h3"), p(body, "body_muted")]],
                colWidths=[14 * mm, 50 * mm, 103 * mm],
                style=TableStyle([
                    ("VALIGN", (0, 0), (-1, -1), "TOP"),
                    ("LEFTPADDING", (0, 0), (-1, -1), 0),
                    ("RIGHTPADDING", (0, 0), (-1, -1), 8),
                    ("TOPPADDING", (0, 0), (-1, -1), 7),
                    ("BOTTOMPADDING", (0, 0), (-1, -1), 9),
                    ("LINEBELOW", (0, 0), (-1, -1), 0.4, LINE),
                ]),
            )
        ]))
    story.extend([
        Spacer(1, 8 * mm),
        p("ANALYST NOTE", "kicker"),
        p(
            "Do not collapse these signals into one maturity claim. Public dataset access, sensor coverage, model transfer, latency, durability, and robot-control value need separate evidence.",
            "body",
        ),
        PageBreak(),
    ])

    # Dataset landscape
    story.extend(
        section_header(
            "Dataset intelligence",
            "Six public research resources, compared with access boundaries.",
            "The table separates reported scale from verified availability. A paper describing a dataset is not the same as a downloadable, licensed training resource.",
        )
    )
    story.extend([
        dataset_table(DATASETS),
        Spacer(1, 4 * mm),
        p("How to read this table", "h3"),
        p(
            "Reported counts follow the primary source. 'Not verified' means no dedicated public download was verified on the review date; private or request-based access may still exist.",
            "body_muted",
        ),
        Spacer(1, 1 * mm),
        p("Shortlist rule", "h3"),
        p(
            "Match embodiment, modalities, task distribution, labels, synchronization, format, license, and target robot. Scale alone is not fit.",
            "body_muted",
        ),
        PageBreak(),
    ])

    # Dataset decision routes
    story.extend(
        section_header(
            "Dataset selection",
            "Choose by decision route, not by headline size.",
            "The same resource can be valuable for one question and unusable for another. Start with the downstream decision and remove mismatched embodiments early.",
        )
    )
    routes = [
        ("Representation learning", "HT-Bench, RCT, and Sparsh-X expose different combinations of scale, material variety, and multimodal contact signals.", "Check public access, split definitions, modality synchronization, and sensor-domain shift."),
        ("Imitation learning", "FreeTacMan links contact-rich demonstrations to wrist video, tactile video, and trajectory data across 50 tasks.", "Check whether the robot-free collection geometry transfers to the target hand, gripper, and controller."),
        ("Humanoid hands", "The Humanoid Visual-Tactile-Action resource synchronizes dense hand pressure, vision, proprioception, action, and external pressure.", "Check the narrow soft-object task set, one embodiment, signal noise, and missing public access terms."),
        ("Human-to-robot skill transfer", "TactiDex combines whole-hand pressure, kinematics, object pose, language, and task-phase annotations.", "Check release status, license, task inventory, and mapping from glove to target robot hand."),
    ]
    route_data = []
    for title, value, check in routes:
        route_data.append([p(title, "h3"), p(value, "body_muted"), p(f"<b>Verify:</b> {check}", "body_muted")])
    route_table = Table(route_data, colWidths=[42 * mm, 63 * mm, 62 * mm])
    route_table.setStyle(TableStyle([
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("LEFTPADDING", (0, 0), (-1, -1), 6),
        ("RIGHTPADDING", (0, 0), (-1, -1), 8),
        ("TOPPADDING", (0, 0), (-1, -1), 9),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 10),
        ("LINEBELOW", (0, 0), (-1, -1), 0.4, LINE),
        ("BACKGROUND", (0, 0), (0, -1), SOFT_GRAY),
    ]))
    story.extend([
        route_table,
        Spacer(1, 8 * mm),
        p("FAST SCREEN", "kicker"),
        p("Reject a dataset early if its license, sensor domain, task labels, or synchronization structure cannot support the intended use.", "h2"),
        PageBreak(),
    ])

    # Research signals
    story.extend(
        section_header(
            "Research signals",
            "Six developments to track without overstating maturity.",
            "The evidence label distinguishes peer-reviewed publication from preprint evidence. The limit column prevents a result from being generalized beyond its reported setup.",
        )
    )
    signal_data = [[table_paragraph(x, True) for x in ["Theme and work", "Evidence", "Signal", "Boundary"]]]
    for item in SIGNALS:
        signal_data.append([
            table_paragraph(f"<b>{item['topic']}</b><br/><font color='#6D685F'>{item['work']}</font>"),
            table_paragraph(item["evidence"]),
            table_paragraph(item["signal"]),
            table_paragraph(item["limit"]),
        ])
    signals_table = Table(signal_data, colWidths=[37 * mm, 22 * mm, 55 * mm, 53 * mm], repeatRows=1)
    signals_table.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, 0), GRAPHITE),
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("LEFTPADDING", (0, 0), (-1, -1), 5),
        ("RIGHTPADDING", (0, 0), (-1, -1), 5),
        ("TOPPADDING", (0, 0), (-1, -1), 6),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 6),
        ("LINEBELOW", (0, 1), (-1, -1), 0.35, LINE),
        ("BACKGROUND", (0, 1), (-1, -1), colors.HexColor("#F7F3EA")),
    ]))
    story.extend([
        signals_table,
        Spacer(1, 7 * mm),
        p("Research interpretation rule", "h3"),
        p(
            "Compare a result only inside its reported task, robot, sensor, data, baseline, and metric context. A lower visual prediction loss is not automatically better force control, slip recovery, safety, or hardware transfer.",
            "body_muted",
        ),
        PageBreak(),
    ])

    # Evaluation checklist
    story.extend(
        section_header(
            "Evaluation checklist",
            "The twelve questions that prevent expensive category mistakes.",
            "Use this checklist before selecting a sensor, dataset, representation model, or research partner.",
        )
    )
    questions = [
        ("Task", "What contact event changes the decision or robot action?"),
        ("Embodiment", "Fingertip, full hand, gripper, forearm, or whole-body surface?"),
        ("Modality", "Normal force, shear, slip, vibration, temperature, proximity, image, audio, or damage?"),
        ("Coverage", "What surface area, blind spots, seams, and wiring routes matter?"),
        ("Dynamics", "What sampling rate, latency, bandwidth, and control deadline are required?"),
        ("Calibration", "How are drift, hysteresis, wear, replacement, and cross-unit variation handled?"),
        ("Data fit", "Does the training data match the target sensor, robot, objects, and contact distribution?"),
        ("Labels", "Which actions, poses, forces, contact states, and task phases are synchronized?"),
        ("License", "Can the data, code, weights, and derived outputs be used commercially?"),
        ("Benchmark", "Are metrics comparable under the same robot, sensor, split, baseline, and precision?"),
        ("Integration", "How will timestamps, transforms, logging, health checks, and failure states enter the stack?"),
        ("Evidence", "Which claims are peer-reviewed, preprint, vendor-reported, demonstrated, or still unknown?"),
    ]
    q_rows = []
    for index in range(0, len(questions), 2):
        pair = questions[index:index + 2]
        row = []
        for offset, (title, body) in enumerate(pair):
            number = index + offset + 1
            row.append([p(f"{number:02d} / {title.upper()}", "kicker"), p(body, "body")])
        q_rows.append(row)
    q_table = Table(q_rows, colWidths=[83.5 * mm, 83.5 * mm])
    q_table.setStyle(TableStyle([
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("LEFTPADDING", (0, 0), (-1, -1), 7),
        ("RIGHTPADDING", (0, 0), (-1, -1), 10),
        ("TOPPADDING", (0, 0), (-1, -1), 8),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 8),
        ("LINEBELOW", (0, 0), (-1, -1), 0.4, LINE),
        ("LINEAFTER", (0, 0), (0, -1), 0.4, LINE),
    ]))
    story.extend([q_table, PageBreak()])

    # Methodology
    story.extend(
        section_header(
            "Method and scope",
            "How RoboSkin.ai keeps claims inside their evidence.",
            "This sample is designed to demonstrate research structure. It is not a substitute for hardware testing, certification, patent review, legal advice, or investment due diligence.",
        )
    )
    method_rows = [
        ("Source order", "arXiv and publisher pages; conference proceedings; official university or lab pages; official repositories and datasets; official technical documentation; company primary material."),
        ("Access check", "Dataset, code, project, paper, and license links are recorded separately. Missing public access is labeled rather than assumed."),
        ("Evidence label", "Peer-reviewed, preprint, institutional, documentation, or company primary material. These labels describe source type, not automatic truth or quality."),
        ("Claim boundary", "Every summary retains the robot, sensor, task, data, metric, protocol, and transfer limits available in the primary source."),
        ("Review date", "Sources in this sample were checked against the RoboSkin.ai research index through 17 August 2026."),
        ("Corrections", "Readers can submit a source or correction at roboskin.ai/contact. Factual corrections do not require a commercial engagement."),
    ]
    method_data = []
    for title, body in method_rows:
        method_data.append([p(title, "h3"), p(body, "body_muted")])
    method_table = Table(method_data, colWidths=[42 * mm, 125 * mm])
    method_table.setStyle(TableStyle([
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("LEFTPADDING", (0, 0), (-1, -1), 0),
        ("RIGHTPADDING", (0, 0), (-1, -1), 8),
        ("TOPPADDING", (0, 0), (-1, -1), 8),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 8),
        ("LINEBELOW", (0, 0), (-1, -1), 0.4, LINE),
    ]))
    story.extend([
        method_table,
        Spacer(1, 8 * mm),
        Table(
            [[p("Need this structure applied to one decision?", "h2"), p("RoboSkin Research Sprint<br/><b>5 business days | Pilot fee US$1,500</b><br/><link href='https://roboskin.ai/research-services' color='#B83D20'>roboskin.ai/research-services</link>", "body")]],
            colWidths=[97 * mm, 70 * mm],
            style=TableStyle([
                ("BACKGROUND", (0, 0), (-1, -1), SOFT_ORANGE),
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
                ("LEFTPADDING", (0, 0), (-1, -1), 10),
                ("RIGHTPADDING", (0, 0), (-1, -1), 10),
                ("TOPPADDING", (0, 0), (-1, -1), 12),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 12),
            ]),
        ),
        PageBreak(),
    ])

    # References
    story.extend(
        section_header(
            "Primary-source register",
            "Seventeen direct URLs used in this sample.",
            "Links point to papers, official project pages, repositories, or dataset hosts. The live RoboSkin dataset directory may contain newer review dates.",
        )
    )
    ref_rows = []
    for index in range(0, len(REFERENCES), 2):
        pair = REFERENCES[index:index + 2]
        row = []
        for label, url in pair:
            row.append(source_link(f"{index + len(row) + 1:02d} / {label}", url))
        if len(row) == 1:
            row.append("")
        ref_rows.append(row)
    ref_table = Table(ref_rows, colWidths=[83.5 * mm, 83.5 * mm])
    ref_table.setStyle(TableStyle([
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("LEFTPADDING", (0, 0), (-1, -1), 7),
        ("RIGHTPADDING", (0, 0), (-1, -1), 10),
        ("TOPPADDING", (0, 0), (-1, -1), 7),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 7),
        ("LINEBELOW", (0, 0), (-1, -1), 0.35, LINE),
        ("LINEAFTER", (0, 0), (0, -1), 0.35, LINE),
    ]))
    story.extend([
        ref_table,
        Spacer(1, 7 * mm),
        p("Live research routes", "h3"),
        p("Dataset explorer: <link href='https://roboskin.ai/datasets' color='#B83D20'>roboskin.ai/datasets</link>", "body_muted"),
        p("Research index: <link href='https://roboskin.ai/research-index' color='#B83D20'>roboskin.ai/research-index</link>", "body_muted"),
        p("Editorial policy: <link href='https://roboskin.ai/editorial-policy' color='#B83D20'>roboskin.ai/editorial-policy</link>", "body_muted"),
        p("Research services: <link href='https://roboskin.ai/research-services' color='#B83D20'>roboskin.ai/research-services</link>", "body_muted"),
    ])
    return story


def main():
    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    PUBLIC_COPY.parent.mkdir(parents=True, exist_ok=True)
    doc = ReportDocTemplate(str(OUTPUT))
    doc.build(build_story())
    PUBLIC_COPY.write_bytes(OUTPUT.read_bytes())
    print(OUTPUT)
    print(PUBLIC_COPY)


if __name__ == "__main__":
    main()
