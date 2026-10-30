export const grippers = [
  { name: 'Robotiq 2F-85', type: 'Adaptive fingers', payload: '5 kg form-fit; verify the application load case', force: '20–235 N', interface: 'Modbus RTU (RS-485)', contacts: 'Two articulated fingers; optional tactile fingertips require compatible revision', price: 'Not published', source: 'https://robotiq.com/hubfs/Product-sheets/Adaptive%20Grippers/Product-sheet-Adaptive-Grippers-EN.pdf' },
  { name: 'OnRobot RG2-FT', type: 'Adaptive fingers', payload: '2 kg force-fit; 4 kg form-fit', force: '3–40 N', interface: 'Integrated robot software; protocol not published on the reviewed page', contacts: 'Two fingers; each has 6-axis force/torque and proximity sensing', price: 'Not published', source: 'https://onrobot.com/en/products/rg2-ft-finger-gripper' },
  { name: 'OnRobot VG10', type: 'Vacuum', payload: '10 kg rated; 15 kg maximum under manufacturer conditions', force: 'Not published as grip force; 80% maximum vacuum', interface: 'Integrated robot software; protocol not published on the reviewed page', contacts: 'Configurable suction cups on four arms; two independent vacuum channels', price: 'Not published', source: 'https://onrobot.com/en/products/vg10-vacuum-gripper' },
  { name: 'OnRobot Soft Gripper', type: 'Soft fingers', payload: 'Up to 2.2 kg; depends on shape, softness and friction', force: 'Not published', interface: 'Electric actuation; protocol not published on the reviewed page', contacts: 'Interchangeable silicone tools in star or finger configurations', price: 'Not published', source: 'https://onrobot.com/en/products/soft-gripper' },
];

export const humanoidCompanies = [
  { name: 'Agility Robotics', founded: '2015', location: 'Salem, Oregon, United States', model: 'Digit; Digit 5 announced, early access expected in 2027', tactile: 'Detailed tactile sensor architecture: Not published in the reviewed company and Digit 5 announcement', website: 'https://www.agilityrobotics.com/', verified: '2026-10-30', sources: [
    { label: 'Company history and locations', href: 'https://www.agilityrobotics.com/company-overview' },
    { label: 'Digit 5 announcement and availability scope', href: 'https://www.agilityrobotics.com/content/agility-unveils-digit-5-humanoid-robot-built-for-cooperatively-safe-work-at-scale' },
  ] },
  { name: 'Apptronik', founded: '2016', location: 'Austin, Texas, United States', model: 'Apollo', tactile: 'Tactile array specifications: Not published in the reviewed Apollo announcement', website: 'https://apptronik.com/', verified: '2026-10-30', sources: [
    { label: 'Apollo announcement and company origin', href: 'https://apptronik.com/news-collection/apptronik-unveils-apollo' },
  ] },
  { name: 'Figure', founded: '2022', location: 'Sunnyvale, California (2023 company announcement; current headquarters not verified)', model: 'Figure 03', tactile: 'Internally developed fingertip tactile sensors; compliant fingertips and separate palm cameras', website: 'https://www.figure.ai/', verified: '2026-10-30', sources: [
    { label: 'Figure company-issued founding announcement', href: 'https://www.prnewswire.com/news-releases/figure-emerges-from-stealth-and-unveils-figure-01--a-humanoid-robot-to-support-supply-chain-on-a-global-scale-301759983.html' },
    { label: 'Figure 03 hand and tactile design', href: 'https://www.figure.ai/news/introducing-figure-03' },
  ] },
  { name: '1X', founded: '2014 (originally Halodi Robotics)', location: 'Palo Alto, California, United States', model: 'NEO', tactile: 'Soft lattice covering and tendon-driven actuation described; detailed tactile array specifications: Not published on the reviewed page', website: 'https://www.1x.tech/', verified: '2026-10-30', sources: [
    { label: '1X history and location', href: 'https://www.1x.tech/about' }, { label: 'NEO product and body design', href: 'https://www.1x.tech/neo' },
  ] },
  { name: 'Unitree', founded: '2016', location: 'Hangzhou, China', model: 'G1 (selected model)', tactile: 'Dex3-1 hand can optionally include tactile sensor arrays; not standard on every G1 configuration', website: 'https://www.unitree.com/', verified: '2026-10-30', sources: [
    { label: 'Unitree registered company information', href: 'https://www.unitree.com/operate/company/' }, { label: 'G1 and optional Dex3-1 tactile arrays', href: 'https://www.unitree.com/g1/' },
  ] },
];
