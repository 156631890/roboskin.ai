import type { SeoTopicPage } from '@/content/seo-topic-pages';

type Section = SeoTopicPage['sections'][number];
type Faq = SeoTopicPage['faqs'][number];

const dyninPaper = { label: 'Dynin-Robotics paper, sections 3.2.2 and 5: evaluated inputs and results', href: 'https://arxiv.org/html/2609.13053v1' };
const dyninProject = { label: 'Dynin-Robotics official project: shared tokens and prediction objectives', href: 'https://dynin.ai/robotics/' };
const snu = { label: 'Seoul National University statement via TechXplore, October 19, 2026', href: 'https://techxplore.com/news/2026-10-robot-ai-future-scenes.html' };
const neura = { label: 'NEURA Neuron AI announcement, October 14, 2026', href: 'https://neura-robotics.com/neura-robotics-introduces-neuron-ai/' };
const cosmos = { label: 'NVIDIA Cosmos 3 official announcement', href: 'https://nvidianews.nvidia.com/news/nvidia-launches-cosmos-3-the-open-frontier-foundation-model-for-physical-ai' };
const contactPaper = { label: 'Jang, Bae and Haninger: Soft Finger Grasp Force and Contact State Estimation', href: 'https://arxiv.org/html/2410.19684v1' };
const survey = { label: 'Learning Physical Interaction: tactile- and force-aware robot learning survey', href: 'https://cdfg.mit.edu/pdf/preprints/2026-shan-learning-physical-interaction-a-survey-of-tactile-and.pdf' };

export const omnimodalSection: Section = {
  id: 'what-is-an-omnimodal-vla',
  heading: 'What Is an Omnimodal VLA?',
  body: [
    'An omnimodal (or omni-modal) VLA brings multiple kinds of robot information into a shared model for understanding, prediction and action. The name is not a fixed sensor checklist. A common VLA consumes images and instructions to produce actions, sometimes with robot state; omnimodal designs can also make observations, goals or language prediction targets. Verify the actual inputs and objectives of each release.',
    'In the shared-token approach illustrated by Dynin-Robotics, text, visual observations, future states and actions become typed spans in one sequence. Robot state or other sensor context can occupy additional spans when supported. Modality-specific encoders preserve what each value means; a common sequence does not make a camera pixel interchangeable with a force measurement.',
  ],
  subsections: [
    {
      heading: 'How masked diffusion connects prediction and action',
      body: [
        'Masked diffusion hides selected target tokens, then reconstructs them from the visible context over successive decoding steps. The backbone can predict several masked positions together. Changing which spans are hidden lets a shared model answer different questions: what action to take, what the next scene may look like, or what instruction describes a trajectory.',
      ],
      links: [dyninProject],
    },
    {
      heading: 'What Dynin-Robotics demonstrates, and what remains unconfirmed',
      body: [
        'The paper reports continual pretraining on approximately 1.33 million trajectories from 48 Open X-Embodiment datasets and 78.4% average success across four Franka Research 3 manipulation conditions: fruit movement, color sorting, unordered stacking and ordered stacking. This is an author-reported result for that protocol, not a general robotics success rate.',
        'Section 3.2.2 reserves an optional interface for force/torque, proprioception and tactile streams, but explicitly says sensor-token training is inactive in the released Stage-1 checkpoint and reported Stage-2 policies do not use sensor-conditioned decoding. The October 19 university statement describes tactile-and-force contact-state recognition as ongoing development. It is not evidence that touch produced the reported success rate.',
      ],
      links: [dyninPaper, snu],
    },
    {
      heading: 'NEURA Neuron AI and NVIDIA Cosmos 3 use related ideas differently',
      body: [
        'NEURA calls Neuron AI a Perception-Language-Action model. Its October 14 announcement describes aligned 3D vision, touch, force, audio, robot state and language with memory. These are vendor-described capabilities, not a matched comparison with Dynin. The promised eleven-minute GTC Berlin laundry demonstration was prospective in that announcement; its completion and repeatability are unconfirmed here.',
        'NVIDIA describes Cosmos 3 as a world foundation model combining visual reasoning, world generation and action prediction, with text, image, video, ambient sound and action modalities. That provides another route toward unified prediction and control. The announcement does not establish tactile sensing for every Cosmos-based policy or the same architecture as Dynin-Omni.',
      ],
      links: [neura, cosmos],
    },
  ],
  contextLinks: [
    { before: 'For touch-specific representations, see ', label: 'tactile foundation models', href: '/tactile-foundation-models', after: '.' },
    { before: 'Follow measured contact into control in ', label: 'tactile manipulation', href: '/tactile-manipulation#what-is-contact-state-recognition', after: '.' },
  ],
};

export const omnimodalFaqs: Faq[] = [
  { question: 'What is an omnimodal VLA?', answer: 'It is a model design that brings multiple modalities into shared understanding, prediction and action generation. The term alone does not establish which sensors a particular policy actually uses.', sources: [dyninProject, neura, cosmos] },
  { question: 'How does an omnimodal VLA differ from a standard VLA?', answer: 'The distinction concerns the supported prediction tasks and modality interfaces, not simply the number of sensors. Conventional VLAs can already use robot state; a unified model may additionally predict future scenes or reconstruct task descriptions.', sources: [dyninProject] },
  { question: 'What does masked-diffusion backbone mean in Dynin-Omni?', answer: 'It is the shared network that reconstructs masked tokens using visible context through iterative prediction, rather than requiring every output to be generated strictly left to right.', sources: [dyninPaper] },
  { question: 'Is omnimodal the same as visuo-tactile VLA?', answer: 'No. Visuo-tactile specifies vision and touch as inputs. Omnimodal describes a broader modeling approach and does not guarantee a live tactile pathway. Check the evaluated configuration.', sources: [dyninPaper, neura] },
];

export const contactStateSection: Section = {
  id: 'what-is-contact-state-recognition',
  heading: 'What Is Contact State Recognition?',
  body: [
    'Contact state recognition, also called contact-state estimation, infers the interaction occurring at an interface from sensor observations over time. Depending on the task, the output may identify no contact, first touch, sustained pressing, sticking or slipping, together with contact location and a force regime. These are task-defined states, not a universal set of mutually exclusive labels.',
    'Force estimation asks how large a load is and in which direction it acts. Contact-state estimation asks what that load and its evolution mean for the interaction. Slip detection addresses one transition within that broader problem. An object can be pressed without slipping, and a similar force magnitude can occur before or after a seating event.',
  ],
  table: {
    headers: ['Illustrative state', 'Evidence to evaluate', 'Possible policy response'],
    rows: [
      ['No contact / first touch', 'Change from an unloaded baseline across successive samples', 'Change from approach to a contact-aware motion'],
      ['Sustained pressing / sticking', 'Persistent contact with load and relative-motion evidence', 'Maintain or regulate the intended contact'],
      ['Slip or contact loss', 'Relative motion, shear changes or disappearance of contact', 'Adjust the grasp or enter recovery'],
      ['Seated / blocked during insertion', 'Contact sequence, geometry and robot motion as well as load', 'Confirm completion or stop and realign'],
    ],
  },
  subsections: [
    {
      heading: 'Use contact events to select actions',
      body: [
        'The table is an engineering illustration, not a tested controller. A state can gate an action, such as switching from approach to insertion after contact, while continuous force feedback regulates the motion within that state. State labels complement force values; they do not replace them. Define transitions, confidence handling and recovery behavior before collecting evaluation trials.',
        'Jang, Bae and Haninger estimate force from integrated soft pressure and strain sensors, then examine contact, non-contact, sticking and slipping in a plug-in task. The paper reports limitations for slip detection and multi-finger interpretation. Its material-dependent rule should not be copied as a universal slip threshold.',
      ],
      links: [contactPaper],
    },
    {
      heading: 'Choose observations that can resolve the state',
      body: [
        'Optical deformation images, capacitive or resistive arrays, magnetic tactile signals and force/torque measurements can contribute different evidence. Combine the relevant signals with synchronized robot motion and, when useful, vision. A wrist resultant load does not by itself supply a detailed contact map. Report sensor coverage, calibration, latency and which states remain ambiguous.',
        'For Dynin-Robotics, the October 19 university statement names contact recognition using tactile and force sensors as work in development. The cited VLA paper does not establish a trained contact-state classifier or a tactile-conditioned policy result. Keep this research direction separate from demonstrated contact estimation.',
      ],
      links: [survey, snu, dyninPaper],
    },
  ],
  contextLinks: [
    { before: 'Compare policy interfaces in ', label: 'the omnimodal VLA explanation', href: '/robot-vla-models#what-is-an-omnimodal-vla', after: '.' },
    { before: 'For transferable touch representations, see ', label: 'tactile foundation models', href: '/tactile-foundation-models', after: '.' },
    { before: 'For flexible sensor hardware, read ', label: 'the Loomia Smart Skin profile', href: '/sensors/loomia-smart-skin', after: '.' },
  ],
};

export const contactStateFaqs: Faq[] = [
  { question: 'What is contact state recognition?', answer: 'It estimates the type or phase of physical interaction from observations, for example first touch, pressing, sticking or slipping. The useful state definition depends on the task and available measurements.', sources: [contactPaper, survey] },
  { question: 'How is contact-state estimation different from force estimation?', answer: 'Force estimation produces a load value or vector. Contact-state estimation interprets interaction, potentially using force together with motion, geometry and temporal evidence. The two outputs can support the same controller.', sources: [contactPaper] },
  { question: 'Why do manipulation policies need contact states?', answer: 'An estimated state can select when to approach, regulate contact, verify completion or recover. Not every policy requires explicit labels; learned policies can also use continuous contact representations.', sources: [survey] },
  { question: 'Which sensors support contact-state estimation?', answer: 'Tactile images, taxel arrays, magnetic signals, strain sensing and force/torque measurements can contribute. Suitability depends on the state to infer, sensor placement, calibration and timing; no modality establishes all states automatically.', sources: [survey] },
];

export const omnimodalSources = [dyninPaper, dyninProject, snu, neura, cosmos];
export const contactStateSources = [contactPaper, survey, dyninPaper, snu];
