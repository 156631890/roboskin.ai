import { robotAiModelEntries } from '@/lib/robot-ai-models';

export const researchOrganizationKinds = ['university', 'research lab', 'company'] as const;

export const organizationModelRelationTypes = [
  'developedBy',
  'coDevelopedBy',
  'contributedBy',
] as const;

export type ResearchOrganizationKind = (typeof researchOrganizationKinds)[number];
export type OrganizationModelRelationType = (typeof organizationModelRelationTypes)[number];

export type ResearchOrganizationEntry = {
  id: string;
  name: string;
  aliases: string[];
  kind: ResearchOrganizationKind;
  officialUrl: string;
  identitySources: {
    label: string;
    url: string;
  }[];
  evidenceBoundary: string;
  sourceReviewed: string;
};

export type RobotAiOrganizationRelation = {
  modelId: string;
  organizationId: string;
  sourceOrganizationLabel: string;
  relation: OrganizationModelRelationType;
  evidenceUrls: string[];
  evidenceBoundary: string;
  sourceReviewed: string;
};

export const researchOrganizationEntries: ResearchOrganizationEntry[] = [
  {
    id: 'peking-university',
    name: 'Peking University',
    aliases: ['PKU'],
    kind: 'university',
    officialUrl: 'https://english.pku.edu.cn/',
    identitySources: [
      { label: 'Peking University official about page', url: 'https://english.pku.edu.cn/about.html' },
      { label: 'Peking University School of Intelligence Science and Technology profile', url: 'https://sai.pku.edu.cn/znxyenglish/About/Dean_s_Message.htm' },
    ],
    evidenceBoundary: 'The university identity and its School of Intelligence Science and Technology are verified from official PKU pages. A source-listed research affiliation does not establish university-wide ownership, funding, endorsement, or participation.',
    sourceReviewed: '2026-08-22',
  },
  {
    id: 'northwestern-university',
    name: 'Northwestern University',
    aliases: ['Northwestern'],
    kind: 'university',
    officialUrl: 'https://www.northwestern.edu/',
    identitySources: [
      { label: 'Northwestern University official about page', url: 'https://www.northwestern.edu/about/' },
    ],
    evidenceBoundary: 'The official university identity is separate from any paper author affiliation. A source-listed relationship does not establish university-wide ownership, funding, endorsement, or participation.',
    sourceReviewed: '2026-08-22',
  },
  {
    id: 'northwestern-center-for-robotics-and-biosystems',
    name: 'Center for Robotics and Biosystems',
    aliases: ['Northwestern Center for Robotics and Biosystems', 'CRB'],
    kind: 'research lab',
    officialUrl: 'https://robotics.northwestern.edu/',
    identitySources: [
      { label: 'Northwestern Center for Robotics and Biosystems official site', url: 'https://robotics.northwestern.edu/' },
    ],
    evidenceBoundary: 'Modeled as Northwestern University’s named interdisciplinary robotics center from its official site, not as a separate company or legal entity. A paper affiliation does not imply center-wide participation, ownership, or endorsement.',
    sourceReviewed: '2026-08-22',
  },
  {
    id: 'google-deepmind',
    name: 'Google DeepMind',
    aliases: [],
    kind: 'research lab',
    officialUrl: 'https://deepmind.google/',
    identitySources: [
      { label: 'Google DeepMind about page', url: 'https://deepmind.google/about/' },
    ],
    evidenceBoundary: 'Modeled as a research organization from its official site. This record does not infer a separate legal entity, headquarters, endorsement, or ownership of every affiliated project.',
    sourceReviewed: '2026-08-22',
  },
  {
    id: 'google-research',
    name: 'Google Research',
    aliases: [],
    kind: 'research lab',
    officialUrl: 'https://research.google/',
    identitySources: [
      { label: 'Google Research official site', url: 'https://research.google/' },
    ],
    evidenceBoundary: 'Modeled as Google\'s named research organization from its official site, not as a separate company or legal entity.',
    sourceReviewed: '2026-08-22',
  },
  {
    id: 'technische-universitaet-berlin',
    name: 'Technische Universität Berlin',
    aliases: ['TU Berlin'],
    kind: 'university',
    officialUrl: 'https://www.tu.berlin/en/',
    identitySources: [
      { label: 'Technische Universität Berlin official site', url: 'https://www.tu.berlin/en/' },
    ],
    evidenceBoundary: 'The official German university name is preserved. A project relationship means that source-listed authors used this affiliation; it does not imply institution-wide endorsement.',
    sourceReviewed: '2026-08-22',
  },
  {
    id: 'stanford-university',
    name: 'Stanford University',
    aliases: ['Stanford'],
    kind: 'university',
    officialUrl: 'https://www.stanford.edu/',
    identitySources: [
      { label: 'Stanford University official site', url: 'https://www.stanford.edu/' },
    ],
    evidenceBoundary: 'A project relationship records a source-listed author affiliation. It does not imply ownership, funding, institutional endorsement, or participation by the university as a whole.',
    sourceReviewed: '2026-08-22',
  },
  {
    id: 'university-of-california-berkeley',
    name: 'University of California, Berkeley',
    aliases: ['UC Berkeley', 'Berkeley'],
    kind: 'university',
    officialUrl: 'https://www.berkeley.edu/',
    identitySources: [
      { label: 'UC Berkeley about page', url: 'https://www.berkeley.edu/about/' },
    ],
    evidenceBoundary: 'A project relationship records a source-listed author affiliation. It does not imply ownership, funding, institutional endorsement, or participation by the university as a whole.',
    sourceReviewed: '2026-08-22',
  },
  {
    id: 'toyota-research-institute',
    name: 'Toyota Research Institute',
    aliases: ['TRI'],
    kind: 'company',
    officialUrl: 'https://www.tri.global/',
    identitySources: [
      { label: 'Toyota Research Institute about page', url: 'https://www.tri.global/about-us' },
    ],
    evidenceBoundary: 'The organization identity comes from its official site. A project relationship records a source-listed author affiliation and does not establish ownership, funding, or endorsement.',
    sourceReviewed: '2026-08-22',
  },
  {
    id: 'physical-intelligence',
    name: 'Physical Intelligence',
    aliases: ['π'],
    kind: 'company',
    officialUrl: 'https://www.pi.website/',
    identitySources: [
      { label: 'Physical Intelligence official site', url: 'https://www.pi.website/' },
    ],
    evidenceBoundary: 'The public brand name is used without inventing a legal suffix, headquarters, funding record, or commercial availability claim.',
    sourceReviewed: '2026-08-22',
  },
  {
    id: 'massachusetts-institute-of-technology',
    name: 'Massachusetts Institute of Technology',
    aliases: ['MIT'],
    kind: 'university',
    officialUrl: 'https://www.mit.edu/',
    identitySources: [
      { label: 'Massachusetts Institute of Technology official site', url: 'https://www.mit.edu/' },
    ],
    evidenceBoundary: 'A project relationship records a source-listed author affiliation. It does not imply ownership, funding, institutional endorsement, or participation by the university as a whole.',
    sourceReviewed: '2026-08-22',
  },
  {
    id: 'carnegie-mellon-university',
    name: 'Carnegie Mellon University',
    aliases: ['Carnegie Mellon', 'CMU'],
    kind: 'university',
    officialUrl: 'https://www.cmu.edu/',
    identitySources: [
      { label: 'Carnegie Mellon University official site', url: 'https://www.cmu.edu/' },
    ],
    evidenceBoundary: 'A project relationship records a source-listed author affiliation. It does not imply ownership, funding, institutional endorsement, or participation by the university as a whole.',
    sourceReviewed: '2026-08-22',
  },
  {
    id: 'nvidia',
    name: 'NVIDIA',
    aliases: [],
    kind: 'company',
    officialUrl: 'https://www.nvidia.com/',
    identitySources: [
      { label: 'NVIDIA about page', url: 'https://www.nvidia.com/en-us/about-nvidia/' },
    ],
    evidenceBoundary: 'The official brand name is used without inferring headquarters, a specific legal entity, employment status, or ownership beyond the cited model source.',
    sourceReviewed: '2026-08-22',
  },
  {
    id: 'meta-fundamental-ai-research',
    name: 'Meta Fundamental AI Research (FAIR)',
    aliases: ['FAIR at Meta', 'Meta FAIR', 'FAIR'],
    kind: 'research lab',
    officialUrl: 'https://ai.meta.com/research/',
    identitySources: [
      { label: 'Meta AI research page', url: 'https://ai.meta.com/research/' },
    ],
    evidenceBoundary: 'Modeled as Meta\'s named Fundamental AI Research team. This does not infer a separate company, legal entity, or ownership of every source-listed project.',
    sourceReviewed: '2026-08-22',
  },
  {
    id: 'university-of-washington',
    name: 'University of Washington',
    aliases: ['UW', 'Washington'],
    kind: 'university',
    officialUrl: 'https://www.washington.edu/',
    identitySources: [
      { label: 'University of Washington about page', url: 'https://www.washington.edu/about/' },
    ],
    evidenceBoundary: 'A project relationship records a source-listed author affiliation. It does not imply ownership, funding, institutional endorsement, or participation by the university as a whole.',
    sourceReviewed: '2026-08-22',
  },
  {
    id: 'shanghaitech-university',
    name: 'ShanghaiTech University',
    aliases: ['ShanghaiTech'],
    kind: 'university',
    officialUrl: 'https://www.shanghaitech.edu.cn/en/main.htm',
    identitySources: [
      { label: 'ShanghaiTech University official profile', url: 'https://www.shanghaitech.edu.cn/en/997/main.psp' },
    ],
    evidenceBoundary: 'The official university identity is separate from any source-listed author affiliation. A research relationship does not establish university-wide ownership, funding, endorsement, or participation.',
    sourceReviewed: '2026-08-22',
  },
  {
    id: 'tsinghua-university',
    name: 'Tsinghua University',
    aliases: ['Tsinghua'],
    kind: 'university',
    officialUrl: 'https://www.tsinghua.edu.cn/en/',
    identitySources: [
      { label: 'Tsinghua University general information', url: 'https://www.tsinghua.edu.cn/en/About/General_Information.htm' },
    ],
    evidenceBoundary: 'The official university identity is separate from any source-listed author affiliation. A research relationship does not establish university-wide ownership, funding, endorsement, or participation.',
    sourceReviewed: '2026-08-22',
  },
  {
    id: 'tu-dresden',
    name: 'TU Dresden',
    aliases: ['TUD Dresden University of Technology', 'Technische Universität Dresden', 'TUD'],
    kind: 'university',
    officialUrl: 'https://tu-dresden.de/tu-dresden?set_language=en',
    identitySources: [
      { label: 'TU Dresden official university profile', url: 'https://tu-dresden.de/tu-dresden?set_language=en' },
      { label: 'TU Dresden official publication affiliation guideline', url: 'https://tu-dresden.de/forschung-transfer/forschungsinformationen/publikationsrichtlinie?set_language=en' },
    ],
    evidenceBoundary: 'TU Dresden is normalized separately from TU Berlin. Source-listed affiliations do not establish university-wide ownership, funding, endorsement, or participation.',
    sourceReviewed: '2026-08-22',
  },
  {
    id: 'scads-ai-dresden-leipzig',
    name: 'ScaDS.AI Dresden/Leipzig',
    aliases: ['ScaDS.AI', 'ScaDS'],
    kind: 'research lab',
    officialUrl: 'https://scads.ai/',
    identitySources: [
      { label: 'ScaDS.AI Dresden/Leipzig official site', url: 'https://scads.ai/' },
    ],
    evidenceBoundary: 'Modeled as the named Center for Scalable Data Analytics and Artificial Intelligence from its official site. This does not infer a separate legal entity, exclusive ownership, or endorsement of every affiliated project.',
    sourceReviewed: '2026-08-22',
  },
  {
    id: 'lasr-lab',
    name: 'Learning Adaptive Systems and Robotics (LASR) Lab',
    aliases: ['LASR Lab'],
    kind: 'research lab',
    officialUrl: 'https://lasr.org/',
    identitySources: [
      { label: 'Learning Adaptive Systems and Robotics official site', url: 'https://lasr.org/' },
      { label: 'TU Dresden Faculty of Computer Science LASR profile', url: 'https://tu-dresden.de/ing/informatik/forschung?set_language=en' },
    ],
    evidenceBoundary: 'Modeled as the LASR Lab named by TU Dresden, not as a university alias, separate company, or legal entity. Its parent relationship does not imply ownership of every source-listed project.',
    sourceReviewed: '2026-08-22',
  },
  {
    id: 'beihang-university',
    name: 'Beihang University',
    aliases: ['Beihang', 'BUAA'],
    kind: 'university',
    officialUrl: 'https://global.buaa.edu.cn/',
    identitySources: [
      { label: 'Beihang University official quick facts', url: 'https://global.buaa.edu.cn/en/About_Beihang/Quick_Facts.htm' },
    ],
    evidenceBoundary: 'The official university identity is separate from any source-listed author affiliation. A research relationship does not establish university-wide ownership, funding, endorsement, or participation.',
    sourceReviewed: '2026-08-22',
  },
  {
    id: 'zhejiang-university',
    name: 'Zhejiang University',
    aliases: ['ZJU'],
    kind: 'university',
    officialUrl: 'https://www.zju.edu.cn/english/',
    identitySources: [
      { label: 'Zhejiang University official profile', url: 'https://www.zju.edu.cn/english/about/list.htm' },
    ],
    evidenceBoundary: 'The official university identity is separate from any source-listed author affiliation. A research relationship does not establish university-wide ownership, funding, endorsement, or participation.',
    sourceReviewed: '2026-08-22',
  },
  {
    id: 'university-of-michigan',
    name: 'University of Michigan',
    aliases: ['University of Michigan, Ann Arbor', 'U-M', 'UMich'],
    kind: 'university',
    officialUrl: 'https://umich.edu/',
    identitySources: [
      { label: 'University of Michigan about page', url: 'https://umich.edu/about/' },
    ],
    evidenceBoundary: 'The official university identity is separate from any source-listed author affiliation. A research relationship does not establish university-wide ownership, funding, endorsement, or participation.',
    sourceReviewed: '2026-08-22',
  },
  {
    id: 'mmint-lab',
    name: 'MMint Lab',
    aliases: ['Manipulation and Machine Intelligence Lab', 'MMint'],
    kind: 'research lab',
    officialUrl: 'https://www.mmintlab.com/',
    identitySources: [
      { label: 'MMint Lab official site', url: 'https://www.mmintlab.com/' },
      { label: 'MMint Lab director profile at the University of Michigan', url: 'https://www.mmintlab.com/people/nima-fazeli/' },
    ],
    evidenceBoundary: 'Modeled as the Manipulation and Machine Intelligence lab identified by its official site, not as a University of Michigan alias, separate company, or legal entity.',
    sourceReviewed: '2026-08-22',
  },
  {
    id: 'university-of-bristol',
    name: 'University of Bristol',
    aliases: [],
    kind: 'university',
    officialUrl: 'https://www.bristol.ac.uk/',
    identitySources: [
      { label: 'University of Bristol about page', url: 'https://www.bristol.ac.uk/university/' },
    ],
    evidenceBoundary: 'The official university identity is separate from any source-listed author affiliation. A research relationship does not establish university-wide ownership, funding, endorsement, or participation.',
    sourceReviewed: '2026-08-22',
  },
  {
    id: 'bristol-robotics-laboratory',
    name: 'Bristol Robotics Laboratory',
    aliases: ['Bristol Robotics Lab', 'BRL'],
    kind: 'research lab',
    officialUrl: 'https://www.bristolroboticslab.com/',
    identitySources: [
      { label: 'Bristol Robotics Laboratory official site', url: 'https://www.bristolroboticslab.com/' },
      { label: 'University of Bristol BRL organization profile', url: 'https://research-information.bris.ac.uk/en/organisations/bristol-robotics-laboratory/' },
    ],
    evidenceBoundary: 'Bristol Robotics Laboratory is modeled as a joint research partnership of UWE Bristol and the University of Bristol. It is not a University of Bristol alias, and no exclusive ownership by either partner is inferred.',
    sourceReviewed: '2026-08-22',
  },
  {
    id: 'gelsight',
    name: 'GelSight',
    aliases: [],
    kind: 'company',
    officialUrl: 'https://www.gelsight.com/',
    identitySources: [
      { label: 'GelSight official site', url: 'https://www.gelsight.com/' },
    ],
    evidenceBoundary: 'The official site establishes the public GelSight organization identity. This record does not infer a legal suffix, product availability, performance, or ownership beyond separately cited product sources.',
    sourceReviewed: '2026-08-22',
  },
  {
    id: 'xela-robotics',
    name: 'XELA Robotics',
    aliases: ['XELA Robotics Co., Ltd', 'XELA Robotics Co., Ltd.'],
    kind: 'company',
    officialUrl: 'https://xelarobotics.com/',
    identitySources: [
      { label: 'XELA Robotics official about page', url: 'https://xelarobotics.com/about/' },
      { label: 'XELA Robotics official commercial disclosure', url: 'https://xelarobotics.com/commercial-disclosure/' },
    ],
    evidenceBoundary: 'The official company pages establish the XELA Robotics organization identity. This record does not transfer product claims, specifications, availability, or performance to any sensor without separate product evidence.',
    sourceReviewed: '2026-08-22',
  },
  {
    id: 'syntouch',
    name: 'SynTouch',
    aliases: ['SynTouch, LLC', 'SynTouch LLC', 'SynTouch, Inc.'],
    kind: 'company',
    officialUrl: 'https://www.syntouchinc.com/',
    identitySources: [
      { label: 'SynTouch issuer filing in the SEC EDGAR archive', url: 'https://www.sec.gov/Archives/edgar/data/1728560/000172856019000002/FormC1.pdf' },
    ],
    evidenceBoundary: 'The company-filed SEC record establishes the SynTouch corporate identity and its relationship to the former SynTouch, LLC name. This record does not treat the redirected legacy syntouchllc.com domain as current evidence or establish current product availability.',
    sourceReviewed: '2026-08-22',
  },
  {
    id: '1x',
    name: '1X',
    aliases: ['1X Technologies'],
    kind: 'company',
    officialUrl: 'https://www.1x.tech/',
    identitySources: [
      { label: '1X official about page', url: 'https://www.1x.tech/about' },
    ],
    evidenceBoundary: 'The official site establishes the public 1X organization identity. This record does not resolve an unspecified 1X humanoid reference to a particular robot model, revision, capability, or availability state.',
    sourceReviewed: '2026-08-22',
  },
  {
    id: 'apptronik',
    name: 'Apptronik',
    aliases: ['Apptronik, Inc.'],
    kind: 'company',
    officialUrl: 'https://apptronik.com/',
    identitySources: [
      { label: 'Apptronik official leadership page', url: 'https://apptronik.com/company/leadership' },
      { label: 'Apptronik official terms of use', url: 'https://apptronik.com/terms-of-use' },
    ],
    evidenceBoundary: 'The official company pages establish the Apptronik organization identity. This record does not establish the specifications, availability, deployment status, or performance of any robot without a separate product source.',
    sourceReviewed: '2026-08-22',
  },
  {
    id: 'fourier-intelligence',
    name: 'Fourier Intelligence',
    aliases: ['Fourier'],
    kind: 'company',
    officialUrl: 'https://www.fftai.com/',
    identitySources: [
      { label: 'Fourier official site', url: 'https://www.fftai.com/' },
    ],
    evidenceBoundary: 'The official site establishes the Fourier public brand identity, with “Fourier” retained as the exact manufacturer label used in current robot records. This record does not infer product specifications, availability, model performance, or corporate structure.',
    sourceReviewed: '2026-08-22',
  },
  {
    id: 'franka-robotics',
    name: 'Franka Robotics',
    aliases: ['Franka Robotics GmbH'],
    kind: 'company',
    officialUrl: 'https://franka.de/',
    identitySources: [
      { label: 'Franka Robotics official company page', url: 'https://franka.de/company' },
      { label: 'Franka Robotics official imprint', url: 'https://franka.de/imprint' },
    ],
    evidenceBoundary: 'The official company pages establish the Franka Robotics organization identity. This record does not conflate the organization with the former Franka Emika name or transfer evidence between Panda, Franka Research 3, and other platforms.',
    sourceReviewed: '2026-08-22',
  },
  {
    id: 'trossen-robotics',
    name: 'Trossen Robotics',
    aliases: [],
    kind: 'company',
    officialUrl: 'https://www.trossenrobotics.com/',
    identitySources: [
      { label: 'Trossen Robotics official about page', url: 'https://www.trossenrobotics.com/about' },
      { label: 'Trossen Robotics official terms and conditions', url: 'https://www.trossenrobotics.com/terms-conditions' },
    ],
    evidenceBoundary: 'The official company pages establish the Trossen Robotics organization identity. This record does not establish product specifications, compatibility, support terms, availability, or research outcomes without separate evidence.',
    sourceReviewed: '2026-08-22',
  },
  {
    id: 'unitree-robotics',
    name: 'Unitree Robotics',
    aliases: ['Unitree'],
    kind: 'company',
    officialUrl: 'https://www.unitree.com/',
    identitySources: [
      { label: 'Unitree Robotics official about page', url: 'https://www.unitree.com/about/' },
    ],
    evidenceBoundary: 'The official site establishes the Unitree Robotics organization identity. This record does not adopt promotional rankings or transfer product specifications, performance, availability, or safety claims to a robot entity.',
    sourceReviewed: '2026-08-22',
  },
  {
    id: 'universal-robots',
    name: 'Universal Robots',
    aliases: [],
    kind: 'company',
    officialUrl: 'https://www.universal-robots.com/',
    identitySources: [
      { label: 'Universal Robots official about page', url: 'https://www.universal-robots.com/about-us/' },
    ],
    evidenceBoundary: 'The official site establishes the Universal Robots organization identity. This record keeps UR5 and UR5e as separate robot entities and does not infer product equivalence, specifications, availability, or performance.',
    sourceReviewed: '2026-08-22',
  },
  {
    id: 'new-york-university',
    name: 'New York University',
    aliases: ['NYU'],
    kind: 'university',
    officialUrl: 'https://www.nyu.edu/',
    identitySources: [
      { label: 'New York University official about page', url: 'https://www.nyu.edu/about.html' },
    ],
    evidenceBoundary: 'The official university page establishes the institutional identity. A source-listed research affiliation does not establish university-wide ownership, funding, endorsement, or participation.',
    sourceReviewed: '2026-08-22',
  },
  {
    id: 'columbia-university',
    name: 'Columbia University',
    aliases: ['Columbia University in the City of New York', 'Columbia'],
    kind: 'university',
    officialUrl: 'https://www.columbia.edu/',
    identitySources: [
      { label: 'Columbia University official about page', url: 'https://www.columbia.edu/content/about-columbia-university' },
    ],
    evidenceBoundary: 'The official university page establishes the institutional identity. A source-listed research affiliation does not establish university-wide ownership, funding, endorsement, or participation.',
    sourceReviewed: '2026-08-22',
  },
  {
    id: 'max-planck-institute-for-intelligent-systems',
    name: 'Max Planck Institute for Intelligent Systems',
    aliases: ['MPI-IS'],
    kind: 'research lab',
    officialUrl: 'https://is.mpg.de/en',
    identitySources: [
      { label: 'Max Planck Institute for Intelligent Systems official about page', url: 'https://is.mpg.de/en/pages/about' },
    ],
    evidenceBoundary: 'The official institute page establishes the research-organization identity. A source-listed affiliation does not establish institute-wide ownership, funding, endorsement, or participation.',
    sourceReviewed: '2026-08-22',
  },
  {
    id: 'ben-gurion-university-of-the-negev',
    name: 'Ben-Gurion University of the Negev',
    aliases: ['Ben-Gurion University', 'BGU'],
    kind: 'university',
    officialUrl: 'https://www.bgu.ac.il/en/',
    identitySources: [
      { label: 'Ben-Gurion University official about page', url: 'https://www.bgu.ac.il/en/u/vps/pa-rd/about-bgu/' },
    ],
    evidenceBoundary: 'The official university page establishes the institutional identity. A source-listed research-team affiliation does not establish university-wide ownership, funding, endorsement, or participation.',
    sourceReviewed: '2026-08-22',
  },
  {
    id: 'shanghai-qi-zhi-institute',
    name: 'Shanghai Qi Zhi Institute',
    aliases: ['Shanghai Qizhi Institute'],
    kind: 'research lab',
    officialUrl: 'https://www.sqz.ac.cn/en/',
    identitySources: [
      { label: 'Shanghai Qi Zhi Institute official introduction', url: 'https://www.sqz.ac.cn/en/introduction' },
    ],
    evidenceBoundary: 'The official institute page establishes the research-organization identity. A source-listed affiliation does not establish institute-wide ownership, funding, endorsement, or participation.',
    sourceReviewed: '2026-08-22',
  },
  {
    id: 'panasonic',
    name: 'Panasonic',
    aliases: ['Panasonic Group', 'Panasonic Holdings Corporation'],
    kind: 'company',
    officialUrl: 'https://holdings.panasonic/global/',
    identitySources: [
      { label: 'Panasonic Holdings official corporate profile', url: 'https://holdings.panasonic/global/corporate/about.html' },
    ],
    evidenceBoundary: 'The official corporate page establishes the Panasonic Holdings identity. The T-Rex paper lists “Panasonic” as an author affiliation but does not identify a specific business unit, legal employer, funding relationship, project ownership, or company-wide endorsement.',
    sourceReviewed: '2026-08-22',
  },
  {
    id: 'sapienza-university-of-rome',
    name: 'Sapienza University of Rome',
    aliases: ['La Sapienza University', 'Sapienza Università di Roma'],
    kind: 'university',
    officialUrl: 'https://www.uniroma1.it/en',
    identitySources: [
      { label: 'Sapienza University of Rome official about page', url: 'https://www.uniroma1.it/en/pagina/about-us' },
    ],
    evidenceBoundary: 'The official university page establishes the Sapienza University of Rome identity. A source-listed author affiliation does not establish university-wide ownership, funding, endorsement, exclusive development, or participation beyond the listed authors.',
    sourceReviewed: '2026-08-22',
  },
  {
    id: 'italai-labs',
    name: 'ItalAI Labs',
    aliases: ['ItalAI'],
    kind: 'research lab',
    officialUrl: 'https://italailabs.com/',
    identitySources: [
      { label: 'ItalAI Labs official site', url: 'https://italailabs.com/' },
    ],
    evidenceBoundary: 'The official site establishes the ItalAI Labs public identity. The T-Rex paper’s author affiliation does not establish that ItalAI Labs independently owns, funded, endorsed, or solely developed T-Rex or its released artifacts.',
    sourceReviewed: '2026-08-22',
  },
  {
    id: 'beijing-institute-of-technology',
    name: 'Beijing Institute of Technology',
    aliases: ['BIT'],
    kind: 'university',
    officialUrl: 'https://english.bit.edu.cn/',
    identitySources: [
      { label: 'Beijing Institute of Technology official site', url: 'https://english.bit.edu.cn/' },
    ],
    evidenceBoundary: 'The official site establishes the university identity. The ViTaR paper lists this author affiliation; it does not establish university-wide ownership, funding, endorsement, or responsibility for a future artifact release.',
    sourceReviewed: '2026-08-22',
  },
  {
    id: 'university-of-science-and-technology-of-china',
    name: 'University of Science and Technology of China',
    aliases: ['USTC'],
    kind: 'university',
    officialUrl: 'https://en.ustc.edu.cn/',
    identitySources: [
      { label: 'University of Science and Technology of China official site', url: 'https://en.ustc.edu.cn/' },
    ],
    evidenceBoundary: 'The official site establishes the university identity. The ReTouch author affiliation records contributor association only, not institution-wide ownership, funding, endorsement, or responsibility for the unreleased artifacts.',
    sourceReviewed: '2026-08-22',
  },
  {
    id: 'iflytek',
    name: 'iFLYTEK',
    aliases: ['IFLYTEK'],
    kind: 'company',
    officialUrl: 'https://www.iflytek.com/en/',
    identitySources: [
      { label: 'iFLYTEK official site', url: 'https://www.iflytek.com/en/' },
    ],
    evidenceBoundary: 'The official site establishes the public company identity. The ReTouch paper lists authors with this affiliation; it does not establish company-wide ownership, funding, endorsement, a product relationship, or commercial availability.',
    sourceReviewed: '2026-08-22',
  },
  {
    id: 'the-chinese-university-of-hong-kong',
    name: 'The Chinese University of Hong Kong',
    aliases: ['CUHK'],
    kind: 'university',
    officialUrl: 'https://www.cuhk.edu.hk/english/index.html',
    identitySources: [
      { label: 'The Chinese University of Hong Kong official site', url: 'https://www.cuhk.edu.hk/english/index.html' },
    ],
    evidenceBoundary: 'The official site establishes the university identity. The ReTouch paper lists one author affiliation; it does not establish university-wide ownership, funding, endorsement, or responsibility for the reported results.',
    sourceReviewed: '2026-08-22',
  },
  {
    id: 'beijing-jiaotong-university',
    name: 'Beijing Jiaotong University',
    aliases: ['BJTU'],
    kind: 'university',
    officialUrl: 'https://en.bjtu.edu.cn/',
    identitySources: [
      { label: 'Beijing Jiaotong University official site', url: 'https://en.bjtu.edu.cn/' },
    ],
    evidenceBoundary: 'The official site establishes the university identity. The τ paper lists author affiliations; that supports contributor association only and does not establish ownership, funding, endorsement, acceptance at a venue, or responsibility for future releases.',
    sourceReviewed: '2026-08-22',
  },
  {
    id: 'beijing-institute-for-general-artificial-intelligence',
    name: 'Beijing Institute for General Artificial Intelligence',
    aliases: ['BIGAI'],
    kind: 'research lab',
    officialUrl: 'https://www.bigai.ai/about/',
    identitySources: [
      { label: 'Beijing Institute for General Artificial Intelligence official about page', url: 'https://www.bigai.ai/about/' },
    ],
    evidenceBoundary: 'Modeled as a research organization from its official page. The τ paper lists an author affiliation; that does not prove institute-wide ownership, funding, endorsement, or responsibility for the promised code or TacAura release.',
    sourceReviewed: '2026-08-22',
  },
  {
    id: 'harbin-institute-of-technology',
    name: 'Harbin Institute of Technology',
    aliases: ['HIT'],
    kind: 'university',
    officialUrl: 'https://en.hit.edu.cn/',
    identitySources: [
      { label: 'Harbin Institute of Technology official site', url: 'https://en.hit.edu.cn/' },
    ],
    evidenceBoundary: 'The official site establishes the university identity. UniTacVLA author affiliations support contributor association only, not university-wide ownership, funding, endorsement, venue acceptance, or artifact availability.',
    sourceReviewed: '2026-08-22',
  },
  {
    id: 'great-bay-university',
    name: 'Great Bay University',
    aliases: ['GBU'],
    kind: 'university',
    officialUrl: 'https://www.gbu.edu.cn/?lang=en',
    identitySources: [
      { label: 'Great Bay University official site', url: 'https://www.gbu.edu.cn/?lang=en' },
    ],
    evidenceBoundary: 'The official site establishes the university identity. UniTacVLA author affiliations support contributor association only and do not establish ownership, funding, endorsement, venue acceptance, or release responsibility.',
    sourceReviewed: '2026-08-22',
  },
  {
    id: 'shanghai-jiao-tong-university',
    name: 'Shanghai Jiao Tong University',
    aliases: ['SJTU'],
    kind: 'university',
    officialUrl: 'https://en.sjtu.edu.cn/',
    identitySources: [
      { label: 'Shanghai Jiao Tong University official site', url: 'https://en.sjtu.edu.cn/' },
    ],
    evidenceBoundary: 'The official site establishes the university identity. UniTacVLA author affiliations support contributor association only and do not establish institution-wide ownership, funding, endorsement, or artifact availability.',
    sourceReviewed: '2026-08-22',
  },
  {
    id: 'fudan-university',
    name: 'Fudan University',
    aliases: ['Fudan'],
    kind: 'university',
    officialUrl: 'https://www.fudan.edu.cn/en/',
    identitySources: [
      { label: 'Fudan University official site', url: 'https://www.fudan.edu.cn/en/' },
    ],
    evidenceBoundary: 'The official site establishes the university identity. UniTacVLA author affiliations support contributor association only and do not establish institution-wide ownership, funding, endorsement, or artifact availability.',
    sourceReviewed: '2026-08-22',
  },
  {
    id: 'nanjing-university',
    name: 'Nanjing University',
    aliases: ['NJU'],
    kind: 'university',
    officialUrl: 'https://www.nju.edu.cn/en/',
    identitySources: [
      { label: 'Nanjing University official site', url: 'https://www.nju.edu.cn/en/' },
    ],
    evidenceBoundary: 'The official site establishes the university identity. UniTacVLA author affiliations support contributor association only and do not establish institution-wide ownership, funding, endorsement, or artifact availability.',
    sourceReviewed: '2026-08-22',
  },
  {
    id: 'daimon-robotics',
    name: 'Daimon Robotics',
    aliases: [],
    kind: 'company',
    officialUrl: 'https://www.dmrobot.com/en/about/',
    identitySources: [
      { label: 'Daimon Robotics official about page', url: 'https://www.dmrobot.com/en/about/' },
    ],
    evidenceBoundary: 'The official page establishes the public company identity. UniTacVLA author affiliations support contributor association only and do not establish model ownership, funding, endorsement, product readiness, or released artifacts.',
    sourceReviewed: '2026-08-22',
  },
  {
    id: 'national-university-of-singapore',
    name: 'National University of Singapore',
    aliases: ['NUS'],
    kind: 'university',
    officialUrl: 'https://www.nus.edu.sg/',
    identitySources: [
      { label: 'National University of Singapore official site', url: 'https://www.nus.edu.sg/' },
    ],
    evidenceBoundary: 'The official site establishes the university identity. VLA-Touch author affiliations support contributor association only, not institution-wide ownership, funding, endorsement, completeness of the release, or licensing of hosted data and checkpoints.',
    sourceReviewed: '2026-08-22',
  },
  {
    id: 'the-university-of-hong-kong',
    name: 'The University of Hong Kong',
    aliases: ['HKU'],
    kind: 'university',
    officialUrl: 'https://www.hku.hk/',
    identitySources: [
      { label: 'The University of Hong Kong official site', url: 'https://www.hku.hk/' },
    ],
    evidenceBoundary: 'The official site establishes the university identity. The vision-based tactile intelligence review lists this institution among its author affiliations; that records source affiliation only, not university-wide ownership, funding, endorsement, or responsibility for the review.',
    sourceReviewed: '2026-08-22',
  },
  {
    id: 'nanyang-technological-university',
    name: 'Nanyang Technological University',
    aliases: ['NTU Singapore'],
    kind: 'university',
    officialUrl: 'https://www.ntu.edu.sg/',
    identitySources: [
      { label: 'Nanyang Technological University official site', url: 'https://www.ntu.edu.sg/' },
    ],
    evidenceBoundary: 'The official site establishes the university identity. The vision-based tactile intelligence review lists this institution among its author affiliations; that records source affiliation only, not university-wide ownership, funding, endorsement, or responsibility for the review.',
    sourceReviewed: '2026-08-22',
  },
  {
    id: 'the-hong-kong-polytechnic-university',
    name: 'The Hong Kong Polytechnic University',
    aliases: ['PolyU'],
    kind: 'university',
    officialUrl: 'https://www.polyu.edu.hk/',
    identitySources: [
      { label: 'The Hong Kong Polytechnic University official site', url: 'https://www.polyu.edu.hk/' },
    ],
    evidenceBoundary: 'The official site establishes the university identity. The vision-based tactile intelligence review lists this institution among its author affiliations; that records source affiliation only, not university-wide ownership, funding, endorsement, or responsibility for the review.',
    sourceReviewed: '2026-08-22',
  },
  {
    id: 'south-china-university-of-technology',
    name: 'South China University of Technology',
    aliases: ['SCUT'],
    kind: 'university',
    officialUrl: 'https://www.scut.edu.cn/en/main.htm',
    identitySources: [
      { label: 'South China University of Technology official English site', url: 'https://www.scut.edu.cn/en/main.htm' },
    ],
    evidenceBoundary: 'The official site establishes the university identity. The vision-based tactile intelligence review lists this institution among its author affiliations; that records source affiliation only, not university-wide ownership, funding, endorsement, or responsibility for the review.',
    sourceReviewed: '2026-08-22',
  },
  {
    id: 'kth-royal-institute-of-technology',
    name: 'KTH Royal Institute of Technology',
    aliases: ['KTH'],
    kind: 'university',
    officialUrl: 'https://www.kth.se/en',
    identitySources: [
      { label: 'KTH Royal Institute of Technology official site', url: 'https://www.kth.se/en' },
    ],
    evidenceBoundary: 'The official site establishes the university identity. The vision-based tactile intelligence review lists this institution among its author affiliations; that records source affiliation only, not university-wide ownership, funding, endorsement, or responsibility for the review.',
    sourceReviewed: '2026-08-22',
  },
  {
    id: 'kings-college-london',
    name: "King's College London",
    aliases: ['KCL'],
    kind: 'university',
    officialUrl: 'https://www.kcl.ac.uk/',
    identitySources: [
      { label: "King's College London official site", url: 'https://www.kcl.ac.uk/' },
    ],
    evidenceBoundary: 'The official site establishes the university identity. The vision-based tactile intelligence review lists this institution among its author affiliations; that records source affiliation only, not university-wide ownership, funding, endorsement, or responsibility for the review.',
    sourceReviewed: '2026-08-22',
  },
];

type ModelRelationPolicy = {
  modelId: string;
  relation: OrganizationModelRelationType;
  evidenceUrls: string[];
  evidenceBoundary: string;
  sourceReviewed: string;
};

const modelRelationPolicies: ModelRelationPolicy[] = [
  {
    modelId: 'gemini-robotics-2',
    relation: 'developedBy',
    evidenceUrls: ['https://deepmind.google/models/gemini-robotics/vla/'],
    evidenceBoundary: 'The official Google DeepMind provider page directly presents Gemini Robotics 2. This does not imply public weights, independent validation, or support for unlisted modalities.',
    sourceReviewed: '2026-08-22',
  },
  {
    modelId: 'gemini-robotics-er-2',
    relation: 'developedBy',
    evidenceUrls: ['https://deepmind.google/models/gemini-robotics/embodied-reasoning/'],
    evidenceBoundary: 'The official Google DeepMind provider page directly presents Gemini Robotics ER 2. This does not imply public weights, independent validation, or low-level motor control.',
    sourceReviewed: '2026-08-22',
  },
  {
    modelId: 'rt-2',
    relation: 'developedBy',
    evidenceUrls: [
      'https://arxiv.org/abs/2307.15818',
      'https://deepmind.google/blog/rt-2-new-model-translates-vision-and-language-into-action/',
    ],
    evidenceBoundary: 'The primary paper and Google DeepMind release support the development relationship. They do not establish open availability or deployment reliability beyond the reported evaluation.',
    sourceReviewed: '2026-08-22',
  },
  {
    modelId: 'palm-e',
    relation: 'coDevelopedBy',
    evidenceUrls: [
      'https://arxiv.org/abs/2303.03378',
      'https://research.google/blog/palm-e-an-embodied-multimodal-language-model/',
    ],
    evidenceBoundary: 'The paper lists authors with Google Research and TU Berlin affiliations. This supports a joint research relationship, not exclusive ownership or institution-wide endorsement.',
    sourceReviewed: '2026-08-22',
  },
  {
    modelId: 'openvla-7b',
    relation: 'contributedBy',
    evidenceUrls: [
      'https://arxiv.org/abs/2406.09246',
      'https://openvla.github.io/',
    ],
    evidenceBoundary: 'The paper and official project page list authors under the connected affiliations. This proves contributor affiliation, not institutional ownership, funding, exclusive development, or endorsement.',
    sourceReviewed: '2026-08-22',
  },
  {
    modelId: 'octo',
    relation: 'contributedBy',
    evidenceUrls: [
      'https://arxiv.org/abs/2405.12213',
      'https://octo-models.github.io/',
    ],
    evidenceBoundary: 'The paper and official project page list authors under the connected affiliations. This proves contributor affiliation, not institutional ownership, funding, exclusive development, or endorsement.',
    sourceReviewed: '2026-08-22',
  },
  {
    modelId: 'pi0',
    relation: 'developedBy',
    evidenceUrls: [
      'https://www.pi.website/download/pi0.pdf',
      'https://www.pi.website/blog/pi0',
    ],
    evidenceBoundary: 'The official release states that Physical Intelligence developed π0 and the technical report lists the organization affiliation. This does not extend the evidence to later model versions or unrelated checkpoints.',
    sourceReviewed: '2026-08-22',
  },
  {
    modelId: 'isaac-gr00t-n1',
    relation: 'developedBy',
    evidenceUrls: [
      'https://arxiv.org/abs/2503.14734',
      'https://research.nvidia.com/publication/2025-03_nvidia-isaac-gr00t-n1-open-foundation-model-humanoid-robots',
    ],
    evidenceBoundary: 'The NVIDIA Research publication and primary paper support the development relationship for GR00T N1. They do not transfer evidence automatically to later GR00T versions.',
    sourceReviewed: '2026-08-22',
  },
  {
    modelId: 'adept',
    relation: 'contributedBy',
    evidenceUrls: [
      'https://arxiv.org/abs/2608.19182',
      'https://adept-dexterity.github.io/',
    ],
    evidenceBoundary: 'The primary paper and official project page list authors with NVIDIA and University of Michigan affiliations. This supports source-listed contributor relationships, not institutional ownership, funding, endorsement, exclusive development, or participation by either organization as a whole.',
    sourceReviewed: '2026-08-22',
  },
  {
    modelId: 't-rex',
    relation: 'contributedBy',
    evidenceUrls: [
      'https://arxiv.org/abs/2606.17055',
      'https://github.com/ZhuoyangLiu2005/T-Rex',
    ],
    evidenceBoundary: 'The paper and official repository list authors under the connected affiliations. This records source-listed contributor relationships only; it does not establish institutional ownership, funding, endorsement, exclusive development, or participation by each organization as a whole.',
    sourceReviewed: '2026-08-22',
  },
  {
    modelId: 'sparsh',
    relation: 'contributedBy',
    evidenceUrls: [
      'https://arxiv.org/abs/2410.24090',
      'https://sparsh-ssl.github.io/',
    ],
    evidenceBoundary: 'The primary paper and official project page list authors under the connected affiliations. This proves contributor affiliation, not institutional ownership, exclusive development, or endorsement.',
    sourceReviewed: '2026-08-22',
  },
  {
    modelId: 'vitar',
    relation: 'contributedBy',
    evidenceUrls: ['https://arxiv.org/abs/2608.15816'],
    evidenceBoundary: 'The primary paper lists all authors with Beijing Institute of Technology. This proves source-listed contributor affiliation, not institutional ownership, funding, endorsement, or responsibility for future artifacts.',
    sourceReviewed: '2026-08-22',
  },
  {
    modelId: 'retouch',
    relation: 'contributedBy',
    evidenceUrls: ['https://arxiv.org/abs/2608.01824'],
    evidenceBoundary: 'The primary paper lists authors with USTC, iFLYTEK, and CUHK affiliations. This records contributor association only, not institutional ownership, funding, endorsement, or responsibility for an unreleased dataset or implementation.',
    sourceReviewed: '2026-08-22',
  },
  {
    modelId: 'tau-touch-augmented-vla',
    relation: 'contributedBy',
    evidenceUrls: ['https://arxiv.org/abs/2607.24485'],
    evidenceBoundary: 'The primary paper lists authors with Beijing Jiaotong University and BIGAI affiliations. This records contributor association only, not institutional ownership, funding, endorsement, venue acceptance, or release responsibility.',
    sourceReviewed: '2026-08-22',
  },
  {
    modelId: 'unitacvla',
    relation: 'contributedBy',
    evidenceUrls: ['https://arxiv.org/abs/2606.31723'],
    evidenceBoundary: 'The primary paper lists authors with the connected university and company affiliations. This records contributor association only, not institutional ownership, funding, endorsement, CoRL acceptance, or artifact availability.',
    sourceReviewed: '2026-08-22',
  },
  {
    modelId: 'vla-touch',
    relation: 'contributedBy',
    evidenceUrls: ['https://arxiv.org/abs/2507.17294'],
    evidenceBoundary: 'The primary paper and official project list NUS author affiliations. This records contributor association only, not university-wide ownership, funding, endorsement, release completeness, or licensing of linked external artifacts.',
    sourceReviewed: '2026-08-22',
  },
];

const organizationByAlias = new Map<string, ResearchOrganizationEntry>();
for (const organization of researchOrganizationEntries) {
  for (const alias of [organization.name, ...organization.aliases]) {
    if (organizationByAlias.has(alias)) {
      throw new Error(`Duplicate research-organization alias: ${alias}`);
    }
    organizationByAlias.set(alias, organization);
  }
}

const policyByModel = new Map(modelRelationPolicies.map((policy) => [policy.modelId, policy]));
if (policyByModel.size !== modelRelationPolicies.length) {
  throw new Error('Robot AI organization relation policies must have unique model IDs.');
}

export function getResearchOrganizationByAlias(alias: string) {
  return organizationByAlias.get(alias);
}

export const robotAiOrganizationRelations: RobotAiOrganizationRelation[] = robotAiModelEntries.flatMap((model) => {
  if (model.creatorOrganizations.length === 0) return [];

  const policy = policyByModel.get(model.id);
  if (!policy) throw new Error(`Missing organization relation policy for model ${model.id}.`);

  const primarySourceUrls = new Set(model.primarySources.map((source) => source.url));
  for (const evidenceUrl of policy.evidenceUrls) {
    if (!primarySourceUrls.has(evidenceUrl)) {
      throw new Error(`Organization relation evidence ${evidenceUrl} is not a primary source for model ${model.id}.`);
    }
  }

  return model.creatorOrganizations.map((sourceOrganizationLabel) => {
    const organization = getResearchOrganizationByAlias(sourceOrganizationLabel);
    if (!organization) {
      throw new Error(`Unresolved robot AI organization label: ${sourceOrganizationLabel}`);
    }

    return {
      modelId: model.id,
      organizationId: organization.id,
      sourceOrganizationLabel,
      relation: policy.relation,
      evidenceUrls: policy.evidenceUrls,
      evidenceBoundary: policy.evidenceBoundary,
      sourceReviewed: policy.sourceReviewed,
    };
  });
});

const knownModelIds = new Set(robotAiModelEntries.map((entry) => entry.id));
for (const policy of modelRelationPolicies) {
  if (!knownModelIds.has(policy.modelId)) {
    throw new Error(`Organization relation policy references missing model ${policy.modelId}.`);
  }
}
