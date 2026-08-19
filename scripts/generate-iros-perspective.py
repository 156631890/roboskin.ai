from pathlib import Path

from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER, TA_JUSTIFY, TA_LEFT
from reportlab.lib.pagesizes import letter
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import inch
from reportlab.platypus import (
    BaseDocTemplate,
    Flowable,
    Frame,
    FrameBreak,
    KeepTogether,
    NextPageTemplate,
    PageBreak,
    PageTemplate,
    Paragraph,
    Spacer,
    Table,
    TableStyle,
)


ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / "output" / "pdf" / "roboskin-iros-2026-touch-to-action-perspective.pdf"

PAGE_WIDTH, PAGE_HEIGHT = letter
MARGIN_X = 0.58 * inch
MARGIN_TOP = 0.46 * inch
MARGIN_BOTTOM = 0.48 * inch
GUTTER = 0.22 * inch
CONTENT_WIDTH = PAGE_WIDTH - 2 * MARGIN_X
COLUMN_WIDTH = (CONTENT_WIDTH - GUTTER) / 2

INK = colors.HexColor("#172033")
MUTED = colors.HexColor("#4E5C70")
ACCENT = colors.HexColor("#C74928")
ACCENT_DARK = colors.HexColor("#8F2F19")
ACCENT_PALE = colors.HexColor("#F7E8E1")
PANEL = colors.HexColor("#F4F6F8")
RULE = colors.HexColor("#CFD5DC")


class EvidenceChainDiagram(Flowable):
    def __init__(self, width: float):
        super().__init__()
        self.width = width
        self.height = 0.56 * inch

    def draw(self):
        labels = [
            ("Failure state", "occlusion / slip"),
            ("Tactile stream", "calibration / timing"),
            ("Representation", "split / transfer"),
            ("Policy", "closed-loop action"),
            ("Evidence", "success / recovery"),
        ]
        gap = 5
        box_width = (self.width - gap * (len(labels) - 1)) / len(labels)
        y = 3
        box_height = self.height - 6
        canvas = self.canv
        canvas.setLineWidth(0.7)
        for index, (title, subtitle) in enumerate(labels):
            x = index * (box_width + gap)
            canvas.setFillColor(ACCENT_PALE if index in (0, 4) else PANEL)
            canvas.setStrokeColor(ACCENT if index in (0, 4) else RULE)
            canvas.roundRect(x, y, box_width, box_height, 4, fill=1, stroke=1)
            canvas.setFillColor(ACCENT_DARK if index in (0, 4) else INK)
            canvas.setFont("Helvetica-Bold", 6.7)
            canvas.drawCentredString(x + box_width / 2, y + box_height - 12, title)
            canvas.setFillColor(MUTED)
            canvas.setFont("Helvetica", 5.8)
            canvas.drawCentredString(x + box_width / 2, y + 8, subtitle)
            if index < len(labels) - 1:
                arrow_x = x + box_width
                arrow_y = y + box_height / 2
                canvas.setStrokeColor(ACCENT)
                canvas.line(arrow_x + 1, arrow_y, arrow_x + gap - 1, arrow_y)
                canvas.line(arrow_x + gap - 3, arrow_y + 2, arrow_x + gap - 1, arrow_y)
                canvas.line(arrow_x + gap - 3, arrow_y - 2, arrow_x + gap - 1, arrow_y)


def page_decoration(canvas, doc):
    canvas.saveState()
    canvas.setStrokeColor(RULE)
    canvas.setLineWidth(0.6)
    canvas.line(MARGIN_X, 0.34 * inch, PAGE_WIDTH - MARGIN_X, 0.34 * inch)
    canvas.setFont("Helvetica", 6.5)
    canvas.setFillColor(MUTED)
    canvas.drawString(MARGIN_X, 0.20 * inch, "IROS 2026 Touch-to-Action Workshop - Mini-Review / Perspective")
    canvas.drawRightString(PAGE_WIDTH - MARGIN_X, 0.20 * inch, f"{doc.page} / 2")
    canvas.restoreState()


def styles():
    base = getSampleStyleSheet()
    return {
        "kicker": ParagraphStyle(
            "Kicker",
            parent=base["Normal"],
            fontName="Helvetica-Bold",
            fontSize=7.2,
            leading=8.4,
            textColor=ACCENT,
            alignment=TA_CENTER,
            spaceAfter=3,
        ),
        "title": ParagraphStyle(
            "Title",
            parent=base["Title"],
            fontName="Helvetica-Bold",
            fontSize=15.2,
            leading=16.8,
            textColor=INK,
            alignment=TA_CENTER,
            spaceAfter=5,
        ),
        "author": ParagraphStyle(
            "Author",
            parent=base["Normal"],
            fontName="Helvetica",
            fontSize=8.1,
            leading=9.4,
            textColor=MUTED,
            alignment=TA_CENTER,
            spaceAfter=4,
        ),
        "abstract": ParagraphStyle(
            "Abstract",
            parent=base["Normal"],
            fontName="Helvetica",
            fontSize=7.4,
            leading=8.7,
            textColor=INK,
            alignment=TA_JUSTIFY,
            spaceAfter=4,
        ),
        "keyword": ParagraphStyle(
            "Keyword",
            parent=base["Normal"],
            fontName="Helvetica",
            fontSize=6.8,
            leading=7.8,
            textColor=MUTED,
            alignment=TA_LEFT,
            spaceAfter=4,
        ),
        "heading": ParagraphStyle(
            "Heading",
            parent=base["Heading2"],
            fontName="Helvetica-Bold",
            fontSize=9.2,
            leading=10.5,
            textColor=ACCENT_DARK,
            spaceBefore=5,
            spaceAfter=3,
            keepWithNext=True,
        ),
        "body": ParagraphStyle(
            "Body",
            parent=base["BodyText"],
            fontName="Helvetica",
            fontSize=7.55,
            leading=9.15,
            textColor=INK,
            alignment=TA_JUSTIFY,
            spaceAfter=4.2,
        ),
        "bullet": ParagraphStyle(
            "Bullet",
            parent=base["BodyText"],
            fontName="Helvetica",
            fontSize=7.35,
            leading=8.9,
            textColor=INK,
            leftIndent=9,
            firstLineIndent=-6,
            bulletIndent=1,
            spaceAfter=2.5,
        ),
        "caption": ParagraphStyle(
            "Caption",
            parent=base["Normal"],
            fontName="Helvetica-Oblique",
            fontSize=6.5,
            leading=7.5,
            textColor=MUTED,
            alignment=TA_CENTER,
            spaceAfter=4,
        ),
        "ref": ParagraphStyle(
            "Reference",
            parent=base["Normal"],
            fontName="Helvetica",
            fontSize=6.35,
            leading=7.45,
            textColor=INK,
            leftIndent=10,
            firstLineIndent=-10,
            spaceAfter=2.1,
        ),
        "table_head": ParagraphStyle(
            "TableHead",
            parent=base["Normal"],
            fontName="Helvetica-Bold",
            fontSize=6.35,
            leading=7.2,
            textColor=colors.white,
        ),
        "table_body": ParagraphStyle(
            "TableBody",
            parent=base["Normal"],
            fontName="Helvetica",
            fontSize=6.15,
            leading=7.15,
            textColor=INK,
        ),
    }


def build_story(style):
    p = lambda text, name="body": Paragraph(text, style[name])
    story = [
        p("THEME V - TACTILE SENSING IN ROBOT LEARNING AND MANIPULATION", "kicker"),
        p("When Is Touch Necessary? A Capability-First Evidence Standard for Tactile Robot Manipulation", "title"),
        p("Steven Yang - RoboSkin.ai, independent research intelligence platform - messigoat147@gmail.com", "author"),
        p(
            "<b>Abstract -</b> Tactile manipulation is often evaluated from the sensor outward: resolution, sensitivity, data scale, and downstream task scores. This Perspective argues for the reverse direction. Evaluation should begin with a contact failure that vision or proprioception cannot reliably resolve, then trace the evidence chain from tactile stream and calibration through representation, policy response, and capability change. Recent datasets and models show both the promise and the weakness of current practice: large multimodal corpora can support representation learning, while contact-sequence leakage, sensor-specific splits, and task-specific world-model metrics can overstate generalization. We propose a compact reporting protocol centered on sensory necessity, causal ablation, split integrity, cross-sensor transfer, recovery, and deployment constraints. The goal is not a universal tactile leaderboard; it is comparable evidence for when touch changes what a robot can do.",
            "abstract",
        ),
        p("<b>Keywords:</b> tactile sensing; visuo-tactile learning; sensory sufficiency; evaluation; contact-rich manipulation", "keyword"),
        EvidenceChainDiagram(CONTENT_WIDTH),
        p("Fig. 1. Capability-first evaluation starts with the failure state and ends with behavior evidence; sensor specifications are one link, not the conclusion.", "caption"),
        FrameBreak(),
        p("1. The Evaluation Unit Should Be a Capability", "heading"),
        p(
            "Touch matters after contact, when appearance alone can hide slip, local force, compliance, incipient jamming, or load redistribution. Yet tactile papers are difficult to compare because sensors, embodiments, data units, and task protocols differ. A higher-resolution tactile image is not automatically a stronger manipulation result; a larger dataset is not automatically a cleaner test of generalization.",
        ),
        p(
            "Recent evidence makes this concrete. HT-Bench pairs 10M RGB frames with 7.8M full-hand tactile frames across 226 tasks and evaluates contact geometry, cross-modal alignment, and unseen-task transfer [2]. RCT instead exposes a split-integrity problem: when contact-sequence overlap is removed, tactile-to-text Recall@1 falls by 17.7 percentage points; under held-out materials it reports 25.1 +/- 6.1% Recall@1 [3]. These results are not contradictory. They show that data scale and evaluation independence answer different questions.",
        ),
        p(
            "The same distinction applies to models. Sparsh-X combines image, audio, motion, and pressure from about one million interactions [5]. Dream-Tac and FeelWorld predict tactile futures for contact-rich planning [6], [7]. Their reported gains are useful within the authors' tasks and baselines, but model accuracy or perceptual similarity alone does not establish robust recovery, cross-sensor transfer, or safe deployment.",
        ),
        p("2. A Five-Link Evidence Chain", "heading"),
        p(
            "We propose reporting tactile manipulation through five linked questions. A claim is strong only when the chain is explicit enough to reproduce and challenge.",
        ),
    ]

    table_data = [
        [p("Link", "table_head"), p("Minimum evidence", "table_head")],
        [p("1. Failure state", "table_body"), p("Name the hidden physical variable and the vision-only failure mode.", "table_body")],
        [p("2. Tactile stream", "table_body"), p("Report modality, placement, calibration, rate, latency, synchronization, and replacement state.", "table_body")],
        [p("3. Representation", "table_body"), p("Define the data unit and train/test grouping; prevent sequence, object, operator, or sensor leakage.", "table_body")],
        [p("4. Policy response", "table_body"), p("Show how tactile input changes an action, prediction, uncertainty estimate, or recovery decision.", "table_body")],
        [p("5. Capability", "table_body"), p("Measure success, robustness, recovery, safety proxy, and transfer under controlled perturbations.", "table_body")],
    ]
    table = Table(table_data, colWidths=[0.88 * inch, COLUMN_WIDTH - 0.88 * inch], repeatRows=1, hAlign="LEFT")
    table.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, 0), ACCENT_DARK),
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
                ("GRID", (0, 0), (-1, -1), 0.35, RULE),
                ("BACKGROUND", (0, 1), (-1, -1), colors.white),
                ("ROWBACKGROUNDS", (0, 1), (-1, -1), [colors.white, PANEL]),
                ("LEFTPADDING", (0, 0), (-1, -1), 4),
                ("RIGHTPADDING", (0, 0), (-1, -1), 4),
                ("TOPPADDING", (0, 0), (-1, -1), 3),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 3),
            ]
        )
    )
    story.extend(
        [
            KeepTogether([table, Spacer(1, 3), p("Table 1. Minimum evidence for a capability-first tactile manipulation claim.", "caption")]),
            FrameBreak(),
            NextPageTemplate("Later"),
            p("3. Test Necessity, Not Just Addition", "heading"),
            p(
                "A tactile channel is necessary for a task condition when it changes capability after plausible alternatives are controlled. The core comparison should therefore include vision-only, vision plus proprioception, and vision plus the relevant tactile or force stream, with matched training budgets where feasible. Evaluation should perturb the physical conditions that motivate touch: occlusion, friction, compliance, contact geometry, object material, sensor instance, timing noise, and calibration drift.",
            ),
            p(
                "This design separates three claims that are often blurred: <b>informativeness</b> (touch predicts a label), <b>control utility</b> (touch improves action selection), and <b>capability necessity</b> (touch preserves success or recovery when visual assumptions fail). A representation benchmark may establish the first claim. A closed-loop ablation under contact perturbations is needed for the latter two.",
            ),
            p("4. Split Integrity Is Part of the Sensor", "heading"),
            p(
                "Tactile observations arrive as correlated sequences, not independent images. Random frame splits can leak nearly identical contact events across training and test sets [3]. Dataset reports should declare the physical unit held out: press, trajectory, object, material, operator, sensor instance, robot, or task. For robot-free collection systems such as FreeTacMan, which reports more than 3M paired visuo-tactile images and more than 10K trajectories across 50 tasks [4], embodiment transfer should be evaluated separately from collection scale.",
            ),
            p(
                "Cross-sensor evidence is equally important. GenForce demonstrates transferable force sensing across heterogeneous tactile sensors [8], but deployment still requires reporting how accuracy changes with geometry, material, wear, and replacement. Sensor identity should be a first-class split variable, not hidden metadata.",
            ),
            PageBreak(),
            p("5. A Minimal Reporting Protocol", "heading"),
            p("- <b>Task claim:</b> identify the contact failure and the hidden state that tactile sensing should resolve.", "bullet"),
            p("- <b>Signal provenance:</b> report sensing principle, placement, calibration, sample rate, latency, synchronization, filtering, and missing-data handling.", "bullet"),
            p("- <b>Evaluation unit:</b> state which sequences, objects, materials, operators, sensors, embodiments, and tasks are held out.", "bullet"),
            p("- <b>Causal ablation:</b> compare matched policies without touch, with touch, and with corrupted or delayed touch.", "bullet"),
            p("- <b>Capability metrics:</b> include success, recovery, robustness, and contact-relevant failure counts; do not rely only on representation loss or visual similarity.", "bullet"),
            p("- <b>Transfer and maintenance:</b> test new sensor instances, recalibration, wear or drift where the deployment claim depends on them.", "bullet"),
            p("- <b>Reproducible artifacts:</b> publish split definitions, timestamps, calibration metadata, and licenses alongside code and data.", "bullet"),
            p("6. Research Direction", "heading"),
            p(
                "The field does not need one universal tactile score. It needs a family of capability-conditioned tests with shared evidence fields. A useful benchmark should ask: under which contact failures does a specific tactile stream change success, recovery, or safety-relevant behavior, and does that change survive new materials, sensors, embodiments, and timing conditions? This framing connects tactile hardware, datasets, representations, world models, and policies without pretending they are interchangeable.",
            ),
            p(
                "Machine-readable evidence records can make these comparisons cumulative. Each result should connect task, sensor, modality, data unit, split, model, metric, limitation, and source. Such records would let future surveys and AI retrieval systems distinguish a sensor demonstration from a representation benchmark, a policy ablation, or a deployment result.",
            ),
            p("7. Conclusion", "heading"),
            p(
                "Touch should be evaluated as a causal part of robot capability, not as an accessory stream or a hardware specification. Starting from the failure state, preserving split integrity, testing sensory necessity, and reporting transfer constraints would make tactile manipulation evidence more comparable and more useful for real systems.",
            ),
            FrameBreak(),
            p("References", "heading"),
            p("[1] P. Zhou et al., 'Vision-Based Tactile Intelligence for Robotics: Sensing, Learning, and Embodied Manipulation,' arXiv:2608.15490, 2026.", "ref"),
            p("[2] Y. Huang et al., 'HT-Bench: Benchmarking and Learning Dexterous Full-Hand Tactile Representations with Egocentric Vision,' arXiv:2606.19161, 2026.", "ref"),
            p("[3] J. He, M. Farber, and R. Calandra, 'RCT: A Robot-Collected Touch-Vision-Language Dataset for Tactile Generalization,' arXiv:2606.31694, 2026.", "ref"),
            p("[4] L. Wu et al., 'FreeTacMan: Robot-free Visuo-Tactile Data Collection System for Contact-rich Manipulation,' arXiv:2506.01941, rev. 2026.", "ref"),
            p("[5] C. Higuera et al., 'Tactile Beyond Pixels: Multisensory Touch Representations for Robot Manipulation,' arXiv:2506.14754, 2025.", "ref"),
            p("[6] Y. Lou et al., 'Dream-Tac: A Unified Tactile World Action Model for Contact-Rich Robot Manipulation,' arXiv:2606.08737, 2026.", "ref"),
            p("[7] W. Ma et al., 'FeelWorld: Visuo-Tactile World Model for Hierarchical Contact Prediction and Planning,' arXiv:2607.24267, 2026.", "ref"),
            p("[8] Z. Chen et al., 'Training tactile sensors to learn force sensing from each other,' Nature Communications, vol. 17, art. 2101, 2026.", "ref"),
        ]
    )
    evidence_card_data = [
        [p("Field", "table_head"), p("Required record", "table_head")],
        [p("Claim", "table_body"), p("Capability and contact failure", "table_body")],
        [p("System", "table_body"), p("Robot, task, object and environment", "table_body")],
        [p("Touch", "table_body"), p("Sensor, modality, placement and calibration", "table_body")],
        [p("Timing", "table_body"), p("Rate, latency, synchronization and filtering", "table_body")],
        [p("Split", "table_body"), p("Held-out sequence, object, material, sensor and task", "table_body")],
        [p("Ablation", "table_body"), p("Without touch, with touch, corrupted or delayed touch", "table_body")],
        [p("Outcome", "table_body"), p("Success, recovery, robustness and failure counts", "table_body")],
        [p("Boundary", "table_body"), p("Known limitations, transfer conditions and license", "table_body")],
    ]
    evidence_card = Table(
        evidence_card_data,
        colWidths=[0.72 * inch, COLUMN_WIDTH - 0.72 * inch],
        repeatRows=1,
        hAlign="LEFT",
    )
    evidence_card.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, 0), ACCENT_DARK),
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
                ("GRID", (0, 0), (-1, -1), 0.35, RULE),
                ("ROWBACKGROUNDS", (0, 1), (-1, -1), [colors.white, PANEL]),
                ("LEFTPADDING", (0, 0), (-1, -1), 4),
                ("RIGHTPADDING", (0, 0), (-1, -1), 4),
                ("TOPPADDING", (0, 0), (-1, -1), 3),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 3),
            ]
        )
    )
    story.extend(
        [
            p("Reusable Evidence Card", "heading"),
            KeepTogether(
                [
                    evidence_card,
                    Spacer(1, 3),
                    p("Table 2. Minimum machine-readable fields for a tactile manipulation evidence record.", "caption"),
                ]
            ),
        ]
    )
    return story


def build_pdf():
    OUTPUT.parent.mkdir(parents=True, exist_ok=True)

    header_height = 3.20 * inch
    first_body_top = PAGE_HEIGHT - MARGIN_TOP - header_height
    first_header = Frame(
        MARGIN_X,
        first_body_top,
        CONTENT_WIDTH,
        header_height,
        leftPadding=0,
        rightPadding=0,
        topPadding=0,
        bottomPadding=4,
        id="first_header",
    )
    first_left = Frame(
        MARGIN_X,
        MARGIN_BOTTOM,
        COLUMN_WIDTH,
        first_body_top - MARGIN_BOTTOM,
        leftPadding=0,
        rightPadding=GUTTER / 2,
        topPadding=2,
        bottomPadding=0,
        id="first_left",
    )
    first_right = Frame(
        MARGIN_X + COLUMN_WIDTH + GUTTER,
        MARGIN_BOTTOM,
        COLUMN_WIDTH,
        first_body_top - MARGIN_BOTTOM,
        leftPadding=GUTTER / 2,
        rightPadding=0,
        topPadding=2,
        bottomPadding=0,
        id="first_right",
    )
    later_left = Frame(
        MARGIN_X,
        MARGIN_BOTTOM,
        COLUMN_WIDTH,
        PAGE_HEIGHT - MARGIN_TOP - MARGIN_BOTTOM,
        leftPadding=0,
        rightPadding=GUTTER / 2,
        topPadding=0,
        bottomPadding=0,
        id="later_left",
    )
    later_right = Frame(
        MARGIN_X + COLUMN_WIDTH + GUTTER,
        MARGIN_BOTTOM,
        COLUMN_WIDTH,
        PAGE_HEIGHT - MARGIN_TOP - MARGIN_BOTTOM,
        leftPadding=GUTTER / 2,
        rightPadding=0,
        topPadding=0,
        bottomPadding=0,
        id="later_right",
    )

    document = BaseDocTemplate(
        str(OUTPUT),
        pagesize=letter,
        leftMargin=MARGIN_X,
        rightMargin=MARGIN_X,
        topMargin=MARGIN_TOP,
        bottomMargin=MARGIN_BOTTOM,
        title="When Is Touch Necessary? A Capability-First Evidence Standard for Tactile Robot Manipulation",
        author="Steven Yang, RoboSkin.ai",
        subject="IROS 2026 Touch-to-Action Workshop mini-review and perspective",
    )
    document.addPageTemplates(
        [
            PageTemplate(id="First", frames=[first_header, first_left, first_right], onPage=page_decoration),
            PageTemplate(id="Later", frames=[later_left, later_right], onPage=page_decoration),
        ]
    )
    document.build(build_story(styles()))


if __name__ == "__main__":
    build_pdf()
    print(OUTPUT)
