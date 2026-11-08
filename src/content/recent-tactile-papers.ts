import type { SeoTopicPage } from '@/content/seo-topic-pages';

// Editorial collection, checked 2026-11-09 Asia/Shanghai. Dates describe sources,
// not this site's publication date. Keep prior version-specific briefs intact.
export const recentTactilePaperSections: SeoTopicPage['sections'] = [
  {
    id: 'recent-tactile-papers',
    heading: 'Recent tactile robotics papers: November 2026 source review',
    body: [
      'This selection was checked on November 9, 2026 (Asia/Shanghai), prioritizing October–November papers and substantive revisions about robot skin, tactile sensors, manipulation and visual-tactile learning. It also includes two older institutional references, clearly separated below. This is a curated reading list, not an exhaustive global census or a ranking of laboratories.',
      'Each entry separates source-listed affiliations, first submission, revision or announcement dates, publication status, and the question the work helps investigate. An author affiliation is not institutional endorsement. Results remain author-reported; RoboSkin has not reproduced these experiments. Follow the original source before transferring a result to another robot.',
    ],
    subsections: [
      {
        heading: 'TactileLab: Sim-to-Real Dexterous Robot Manipulation with Efficient Shear-Sensitive Tactile Simulation',
        body: [
          'Yijiong Lin and colleagues. The manuscript lists Beijing Institute of Technology, University of Bristol / Bristol Robotics Laboratory, and Xi’an Jiaotong-Liverpool University; it states that Lin conducted this work at Bristol. First submitted November 5, 2026; arXiv v1 preprint.',
          'Reading question: can simulated tactile flow supply useful tangential-motion observations without expensive deformable-body simulation? The paper combines contact-depth and flow representations with a real-to-sim observation mapping.',
          'Boundary: the translation assumes sticking contact in the relevant derivation; sensor observability matters. The official project still marks code as coming soon. A published manuscript does not establish a runnable release.',
        ],
        links: [
          { label: 'TactileLab v1 manuscript', href: 'https://arxiv.org/html/2611.07881v1' },
          { label: 'TactileLab official project and affiliations', href: 'https://yijionglin.github.io/tactilelab/' },
          { label: 'Read the TactileLab method and release analysis', href: '/news/tactilelab-shear-sensitive-simulation' },
        ],
      },
      {
        heading: 'VTAM: Efficient Visuo-Tactile World-Action Models for Contact-Rich Manipulation without Tactile Pretraining',
        body: [
          'Haoran Yuan and colleagues; source-listed institutions include UIUC, Stanford University and Shanghai Jiao Tong University. First submitted March 24, 2026; v2 revised November 5, 2026. Status: arXiv preprint.',
          'Reading question: how much task-level adaptation is needed when a video-pretrained model learns tactile futures and actions? The study evaluates simulated manipulation and physical tasks on two robot/sensor configurations.',
          'Boundary: no tactile pretraining does not mean no video pretraining or no task demonstrations. The optical-flow supervision is a force-related proxy, and encoder transfer is not evidence that an unchanged complete policy transfers to every robot.',
        ],
        links: [
          { label: 'VTAM v2 manuscript and methods', href: 'https://arxiv.org/html/2603.23481v2' },
          { label: 'VTAM first submission and revision record', href: 'https://arxiv.org/abs/2603.23481' },
          { label: 'Compare the VTAM world-model evidence record', href: '/robot-world-models#world-model-vtam' },
        ],
      },
      {
        heading: 'OpenTac: An Open Ecosystem for Customizable, Scalable, and Transferable 3D Tactile Sensing',
        body: [
          'Ariel Slepyan and colleagues; Johns Hopkins University and MIT are listed on the official project. First submitted October 22, 2026; v2 revised November 5, 2026. Status: arXiv preprint. A CoRL live-demo announcement is not by itself a conference-paper acceptance record.',
          'Reading question: how do sensor geometry, shear-sensitive covers, fabrication files and readout software fit together? OpenTac connects custom flex-PCB skins with design, simulation and transfer tools.',
          'Boundary: adaptive partial readouts and complete-array frames are different measurements. Keep array size, sampled taxels and board compatibility explicit. The existing RoboSkin detailed brief reviews v1 and a pinned October repository, not every v2 change.',
        ],
        links: [
          { label: 'OpenTac version history', href: 'https://arxiv.org/abs/2610.31661' },
          { label: 'OpenTac current project and readout definitions', href: 'https://opentac.github.io/' },
          { label: 'Read the earlier v1 hardware and license review', href: '/research/opentac-custom-tactile-skins-readout-limits-2026' },
        ],
      },
      {
        heading: 'Which Physical Tactile Cues Matter for Contact-Rich Imitation Learning? A Controlled Real-Robot Study',
        body: [
          'Xuhao Qin, Xiyan Huang, Haoyu Dong, Xi Zhang and Chenxi Xiao; ShanghaiTech University. First submitted November 4, 2026. The arXiv author comment reports acceptance to IEEE ROBIO 2026; this collection does not independently verify a proceedings record.',
          'Reading question: which cues from the same sensor stream help a policy? Under matched demonstrations and policy settings, Table I reports 71/90 successes with full tactile input versus 52/90 with vision alone, across three tasks. The 720 trials cover eight configurations, not 720 trials per method.',
          'Boundary: no direct force measurements; one sensor and a parallel-jaw setup. Encoding frontends differ, and three tabletop tasks do not establish general performance across sensors or dexterous hands.',
        ],
        links: [
          { label: 'Physical tactile cues: acceptance comment and date', href: 'https://arxiv.org/abs/2611.06673' },
          { label: 'Physical tactile cues: full v1 paper, Tables I–II and limitations', href: 'https://arxiv.org/pdf/2611.06673v1' },
          { label: 'Choose tactile observations for manipulation', href: '/tactile-manipulation' },
        ],
      },
      {
        heading: 'LumiTac: Compact, High-Rate Six-Axis Optical Tactile Sensing for Human-Robot Interaction',
        body: [
          'Hao Wu, Haotian Guo, Yu Feng, Yutong Wang and Jianshu Zhou; National University of Singapore. First submitted November 4, 2026; arXiv v1 preprint.',
          'Reading question: can a small camera-free optical sensor reconstruct a six-axis contact wrench? Twenty optical channels feed a learned force-and-moment estimator, with separate sensor tests and interaction demonstrations.',
          'Boundary: the approximately 304 Hz online update measurement and 0.722 ms median software-processing latency describe different timing quantities. One handheld-control demonstration uses a simulated arm; physical gripper guidance is a separate experiment. Component cost is not an installed system price.',
        ],
        links: [
          { label: 'LumiTac v1: design, timing and demonstrations', href: 'https://arxiv.org/html/2611.05936v1' },
          { label: 'LumiTac bibliographic record', href: 'https://arxiv.org/abs/2611.05936' },
          { label: 'Compare tactile sensing principles', href: '/sensors' },
        ],
      },
      {
        heading: 'PanoTac: A Dense Three-Axis Tactile Sensor for Robust Touch-Centric Manipulation',
        body: [
          'Binglin (Andre) Wang and colleagues; New York University, City University of New York and Columbia University. First submitted November 2, 2026; arXiv v1 preprint.',
          'Reading question: when do contact shape and shear-related signals provide complementary information? The paper combines a dense normal-contact array with sparse magnetic sensing in test-tube, scooping and pouring tasks.',
          'Boundary: the dense three-channel representation is not an independent calibrated three-axis force measurement at each location. Magnetic interference and parallel-jaw geometry limit transfer; task-specific success rates are not industrial reliability estimates.',
        ],
        links: [
          { label: 'PanoTac v1 manuscript', href: 'https://arxiv.org/html/2611.03520v1' },
          { label: 'Read the existing PanoTac representation and hardware review', href: '/research/panotac-spatial-pressure-shear-feedback-limits-2026' },
        ],
      },
      {
        heading: 'ToFTouch: Exploring Proximity and Tactile Sensing for Robotic Manipulation',
        body: [
          'Eric T. Chang and colleagues; Amazon Robotics and Columbia University. First submitted November 2, 2026; arXiv v1 preprint. The manuscript includes “ToFTouch” in its title; the arXiv abstract-page title omits that prefix.',
          'Reading question: what does proximity sensing add before a gripper makes contact? Three multizone time-of-flight sensors complement an optical pressure array in pre-grasp adjustment, clutter extraction and insertion experiments on a Franka FR3 with a Robotiq gripper.',
          'Boundary: pre-contact ranging and measured contact are separate channels. The reported cycle-time improvement belongs to the specific pre-grasp experiment; the insertion discussion is exploratory, not a general autonomous-insertion success benchmark.',
        ],
        links: [
          { label: 'ToFTouch v1 manuscript and experiments', href: 'https://arxiv.org/html/2611.03489v1' },
          { label: 'ToFTouch submission record', href: 'https://arxiv.org/abs/2611.03489' },
          { label: 'Follow the robot manipulation reading route', href: '/robot-manipulation' },
        ],
      },
      {
        heading: 'TouchScale: 500 Hours of Human Vision and Touch for Visual-Tactile Learning',
        body: [
          'Dayou Li and colleagues; the manuscript lists a multi-institution collaboration including Texas A&M, CMU, Stanford, UC Berkeley, Google DeepMind and NVIDIA. These are author affiliations, not a claim that every institution released the data. First submitted October 7, 2026; v3 revised November 2, 2026. Status: arXiv preprint.',
          'Reading question: how can synchronized human vision and touch support robot learning? The study scales recordings from one wearable acquisition setup and evaluates representation learning and downstream robot tasks.',
          'Boundary: the 500-hour study corpus differs from the 100-hour public data-card description checked November 8. Access is gated and the card lists noncommercial terms. Human observations do not supply robot action labels; no gated payload was downloaded.',
        ],
        links: [
          { label: 'TouchScale v3 manuscript', href: 'https://arxiv.org/html/2610.10288v3' },
          { label: 'TouchScale public dataset card', href: 'https://huggingface.co/datasets/2077AIDataFoundation/TouchScale' },
          { label: 'Check the TouchScale release and license record', href: '/datasets#dataset-touchscale' },
        ],
      },
      {
        heading: 'VisTacAlign: Co-Training Dexterous Policies on Tactile Human and Robot Demonstrations using Visual-Tactile Alignment',
        body: [
          'Julien Poffet and colleagues; ETH Zurich and Stanford University. First submitted September 25, 2026; v2 revised October 13, 2026. Status: arXiv preprint; Stanford ARM Lab also lists it as arXiv, not an accepted conference paper.',
          'Reading question: which observation mismatches must be addressed before mixing human and robot demonstrations? VisTacAlign retargets hand motion, adjusts visual observations and aligns tactile signal ranges for policy co-training.',
          'Boundary: alignment in sensor signal space is not absolute force calibration. The paper evaluates three tasks on a particular hand setup. The existing RoboSkin news analysis is explicitly a v1 review; consult v2 for the current wording.',
        ],
        links: [
          { label: 'VisTacAlign v2 and revision history', href: 'https://arxiv.org/abs/2609.30959v2' },
          { label: 'Stanford ARM Lab publication listing', href: 'https://arm.stanford.edu/' },
          { label: 'Read the earlier VisTacAlign v1 analysis', href: '/news/vistacalign-human-robot-tactile-demonstrations' },
        ],
      },
    ],
  },
  {
    id: 'publication-status-updates',
    heading: 'Recent publication and acceptance evidence',
    body: [
      'Publication status answers a different question from recency. Keep a publisher’s early-online article, an institutional acceptance announcement and a newly uploaded preprint distinguishable. None establishes independent replication.',
    ],
    subsections: [
      {
        heading: 'Tactile-Based Robotic Manipulation: From Mechanics-Driven to Data-Driven Perspectives',
        body: [
          'Jingyi Xiang, Yixuan Wang and Wenzhen Yuan; University of Illinois Urbana-Champaign. Annual Review of Control, Robotics, and Autonomous Systems: Review in Advance first posted October 21, 2026. The publisher describes the final volume as in press; do not substitute its 2027 copyright year for the online date.',
          'Reading question: how do contact-mechanics models relate to learned tactile representations, imitation learning, reinforcement learning and predictive models? This is a useful map for selecting original studies.',
          'Inspection scope: publisher metadata and abstract, not the full subscription text. A review organizes existing evidence; it is not a new sensor benchmark. No detailed result is inferred from unavailable sections.',
        ],
        links: [
          { label: 'Annual Reviews: official article, authors and early-online status', href: 'https://www.annualreviews.org/content/journals/10.1146/annurev-control-032125-030330' },
          { label: 'Connect the review to tactile manipulation methods', href: '/tactile-manipulation' },
        ],
      },
      {
        heading: 'T-Rex: Tactile-Reactive Dexterous Manipulation',
        body: [
          'Dantong Niu and colleagues. Panasonic’s November 5, 2026 announcement names collaborators at UC Berkeley, NVIDIA, Stanford, Sapienza and ItalAI and reports CoRL 2026 acceptance. The original arXiv submission is June 15, 2026; November 5 is the announcement date, not a new paper.',
          'Reading question: how can tactile reactions update more frequently than visual reasoning? T-Rex separates update paths for tactile-responsive manipulation.',
          'Boundary: reported task rubrics include partial credit, so their aggregate score is not a binary complete-task success rate. The public dataset subset and the reported training corpus have different sizes. The existing review preserves those distinctions.',
        ],
        links: [
          { label: 'T-Rex original paper record', href: 'https://arxiv.org/abs/2606.17055' },
          { label: 'Panasonic official acceptance announcement, November 5', href: 'https://news.panasonic.com/global/press/en261105-2' },
          { label: 'Read the T-Rex task-score and release analysis', href: '/research/t-rex-tactile-reactive-dexterous-manipulation-2026' },
        ],
      },
    ],
  },
  {
    id: 'institutional-reading-context',
    heading: 'Earlier institutional references for calibration and representation',
    body: [
      'These two references supply useful technical context but are not November releases. They are listed separately so an institution’s current website does not make an older manuscript appear new.',
    ],
    subsections: [
      {
        heading: 'TensorTouch: Calibration of Tactile Sensors for High Resolution Stress Tensor and Deformation for Dexterous Manipulation',
        body: [
          'Won Kyung Do, Matthew Strong, Aiden Swann, Boshu Lei and Monroe Kennedy III; Stanford University and University of Pennsylvania. The arXiv v1 date is June 9, 2025. Stanford ARM Lab currently lists IEEE Transactions on Robotics; that lab listing does not establish a new November publication date.',
          'Reading question: how can optical contact images be mapped to physically meaningful deformation and stress fields? The official project describes finite-element supervision combined with learned estimation.',
          'Inspection scope: original abstract, official project and lab publication listing. The IEEE page did not expose usable article text in this check. Sensor calibration and the project’s demonstrations do not establish universal cross-sensor force accuracy.',
        ],
        links: [
          { label: 'TensorTouch original preprint date', href: 'https://arxiv.org/abs/2506.08291' },
          { label: 'TensorTouch official project and paper links', href: 'https://tensor-touch.github.io/' },
          { label: 'Stanford ARM Lab journal-status listing', href: 'https://arm.stanford.edu/' },
        ],
      },
      {
        heading: 'Brain-Aligned Tactile Representations for Dexterous Robot Learning',
        body: [
          'Trinity Chung; Carnegie Mellon University. June 2026 master’s thesis, institutional report CMU-RI-TR-26-65. This is an official university repository record, not a peer-reviewed conference-paper designation.',
          'Reading question: how should tactile representations and sensor placement be evaluated for dexterous learning? The repository abstract connects biological representation analysis with simulated robot sensing.',
          'Inspection scope: institutional metadata and abstract only; the thesis experiments were not independently inspected or reproduced. Use this as a research lead, and read the full thesis before citing detailed quantitative conclusions.',
        ],
        links: [
          { label: 'CMU official thesis record and full-text access', href: 'https://publications.ri.cmu.edu/brain-aligned-tactile-representations-for-dexterous-robot-learning' },
          { label: 'Explore robot-learning evidence and evaluation', href: '/robot-learning' },
        ],
      },
    ],
  },
];
