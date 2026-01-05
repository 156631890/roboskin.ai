import Link from 'next/link';

export default function Home() {
  const features = [
    {
      title: "Nano-Tactile Sensor Array",
      description: "Graphene-based pressure transducers delivering 0.1N sensitivity with sub-millimeter spatial resolution, rivaling human mechanoreceptor performance.",
      icon: (
        <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.348 14.952c-.527-.139-1.026-.386-1.47-.724-.736-.56-1.296-1.356-1.614-2.273a4.98 4.98 0 01-.086-2.662c.283-1.183.972-2.209 1.928-2.92.956-.71 2.125-1.09 3.32-1.08 1.196.01 2.354.415 3.293 1.143.94.729 1.61 1.77 1.869 2.96a4.992 4.992 0 01-.68 3.866 5.006 5.006 0 01-3.116 2.166" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.32 11.32l1.41 1.41M2 12h2m16 0h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
        </svg>
      )
    },
    {
      title: "Neuromorphic Processing",
      description: "Spiking neural networks process tactile stimuli with <5ms latency, enabling real-time texture classification and slip prediction.",
      icon: (
        <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M8 10l2 2 4-4M12 15l2 2 4-4" />
        </svg>
      )
    },
    {
      title: "Autonomous Self-Healing",
      description: "Smart polymer matrix repairs micro-damage autonomously within 24 hours, maintaining 99% tactile sensitivity after 10,000+ cycles.",
      icon: (
        <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
        </svg>
      )
    }
  ];

  const stats = [
    { value: "10,000+", label: "Sensor Density (nodes/m²)" },
    { value: "<1ms", label: "Neural Response Time" },
    { value: "99.7%", label: "Object Recognition Accuracy" },
    { value: "7+ years", label: "Mean Time Between Failures" }
  ];

  return (
    <>
      {/* Hero Section - Cyberpunk Enhanced */}
      <section className="bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white relative overflow-hidden">
        {/* Animated Grid Background */}
        <div className="absolute inset-0 opacity-20">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
              <pattern id="cybergrid" width="5" height="5" patternUnits="userSpaceOnUse">
                <path d="M 5 0 L 0 0 0 5" fill="none" stroke="currentColor" strokeWidth="0.3" className="text-cyan-400"/>
              </pattern>
              <pattern id="cybergrid-large" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-blue-500"/>
              </pattern>
            </defs>
            <rect width="100" height="100" fill="url(#cybergrid)" />
            <rect width="100" height="100" fill="url(#cybergrid-large)" />
          </svg>
        </div>

        {/* Floating Particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute w-2 h-2 bg-cyan-400 rounded-full top-20 left-10 animate-pulse" style={{ animationDuration: '3s' }}></div>
          <div className="absolute w-3 h-3 bg-blue-500 rounded-full top-40 right-20 animate-ping" style={{ animationDuration: '4s' }}></div>
          <div className="absolute w-2 h-2 bg-purple-500 rounded-full bottom-40 left-1/4 animate-pulse" style={{ animationDuration: '2.5s' }}></div>
          <div className="absolute w-1 h-1 bg-pink-400 rounded-full top-1/3 right-1/3 animate-ping" style={{ animationDuration: '5s' }}></div>
        </div>

        {/* Neon Glowing Lines */}
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-pulse"></div>
        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-blue-500 to-transparent animate-pulse"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-28 md:py-36 relative">
          <div className="text-center">
            {/* Badge */}
            <div className="inline-flex items-center px-4 py-2 bg-cyan-500/10 backdrop-blur-sm rounded-full text-sm font-semibold mb-8 border border-cyan-400/30 shadow-lg shadow-cyan-500/20">
              <svg className="w-4 h-4 mr-2 text-cyan-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M13 10V3L4 14h7v7l9-11h-7z"/>
              </svg>
              Pioneering Tactile Intelligence Since 2023
            </div>

            {/* Main Title with Glow Effect */}
            <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight">
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 animate-pulse">
                Next-Generation
              </span>
              <span className="block mt-2">Robotic Tactile Systems</span>
            </h1>

            {/* Subtitle with enhanced styling */}
            <p className="text-xl md:text-2xl text-blue-100 max-w-4xl mx-auto mb-12 leading-relaxed">
              Revolutionary bio-inspired artificial skin technology that equips robots with human-level
              <span className="text-cyan-400 font-semibold"> tactile perception</span>,
              enabling unprecedented capabilities in manipulation, exploration, and
              <span className="text-purple-400 font-semibold"> human-robot interaction</span>.
            </p>

            {/* CTA Buttons with Neon Effects */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <Link
                href="/technology"
                className="group relative inline-flex items-center justify-center px-10 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold rounded-lg hover:from-cyan-400 hover:to-blue-500 transition-all transform hover:scale-105 shadow-lg shadow-cyan-500/30 overflow-hidden"
              >
                <span className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></span>
                <span className="relative flex items-center">
                  Explore Technology
                  <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
              </Link>
              <Link
                href="/contact"
                className="group relative inline-flex items-center justify-center px-10 py-4 bg-transparent border-2 border-purple-500 text-white font-bold rounded-lg hover:bg-purple-500/10 transition-all overflow-hidden"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-pink-600/20 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                <span className="relative">Request Technical Brief</span>
              </Link>
            </div>

            {/* Robot Skin Visual Illustration */}
            <div className="relative max-w-4xl mx-auto">
              <div className="bg-gradient-to-br from-slate-800/50 to-blue-900/50 backdrop-blur-sm rounded-3xl p-8 border border-cyan-500/30 shadow-2xl shadow-cyan-500/10">
                <svg className="w-full h-auto" viewBox="0 0 800 400" fill="none">
                  {/* Background Grid */}
                  <defs>
                    <pattern id="smallGrid" width="20" height="20" patternUnits="userSpaceOnUse">
                      <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(34, 211, 238, 0.1)" strokeWidth="0.5"/>
                    </pattern>
                  </defs>
                  <rect width="800" height="400" fill="url(#smallGrid)" />

                  {/* Central Robot Hand */}
                  <g transform="translate(400, 200)">
                    {/* Palm */}
                    <circle cx="0" cy="0" r="80" fill="none" stroke="url(#palmGradient)" strokeWidth="2">
                      <animate attributeName="stroke" values="rgba(34,211,238,0.3);rgba(168,85,247,0.3);rgba(34,211,238,0.3)" dur="3s" repeatCount="indefinite"/>
                    </circle>

                    {/* Sensor Nodes on Palm */}
                    {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => {
                      const x = Math.cos(angle * Math.PI / 180) * 60;
                      const y = Math.sin(angle * Math.PI / 180) * 60;
                      return (
                        <g key={i}>
                          <circle cx={x} cy={y} r="4" fill="#22d3ee">
                            <animate attributeName="r" values="4;6;4" dur="2s" begin={`${i * 0.2}s`} repeatCount="indefinite"/>
                            <animate attributeName="opacity" values="1;0.5;1" dur="2s" begin={`${i * 0.2}s`} repeatCount="indefinite"/>
                          </circle>
                          <circle cx={x} cy={y} r="8" fill="none" stroke="#22d3ee" strokeWidth="1" opacity="0.3">
                            <animate attributeName="r" values="8;12;8" dur="2s" begin={`${i * 0.2}s`} repeatCount="indefinite"/>
                          </circle>
                        </g>
                      );
                    })}

                    {/* Fingers */}
                    {[-1, -0.5, 0, 0.5, 1].map((offset, i) => (
                      <g key={i} transform={`translate(${offset * 100}, -120)`}>
                        {/* Finger segments */}
                        <rect x="-8" y="0" width="16" height="40" rx="4" fill="url(#fingerGradient)" opacity="0.3"/>
                        <rect x="-8" y="45" width="16" height="40" rx="4" fill="url(#fingerGradient)" opacity="0.3"/>
                        <rect x="-8" y="90" width="16" height="35" rx="4" fill="url(#fingerGradient)" opacity="0.3"/>

                        {/* Sensor dots on fingers */}
                        {[10, 55, 100].map((y, j) => (
                          <circle key={j} cx="0" cy={y} r="3" fill="#a855f7">
                            <animate attributeName="opacity" values="1;0.3;1" dur="1.5s" begin={`${(i * 0.3) + (j * 0.2)}s`} repeatCount="indefinite"/>
                          </circle>
                        ))}

                        {/* Neural connection lines */}
                        <line x1="0" y1="100" x2="0" y2="140" stroke="url(#lineGradient)" strokeWidth="2" opacity="0.5">
                          <animate attributeName="opacity" values="0.3;0.7;0.3" dur="2s" begin={`${i * 0.4}s`} repeatCount="indefinite"/>
                        </line>
                      </g>
                    ))}
                  </g>

                  {/* Neural Network Lines */}
                  <g opacity="0.4">
                    {[
                      {x1: 200, y1: 100, x2: 350, y2: 150},
                      {x1: 600, y1: 100, x2: 450, y2: 150},
                      {x1: 200, y1: 300, x2: 350, y2: 250},
                      {x1: 600, y1: 300, x2: 450, y2: 250},
                    ].map((line, i) => (
                      <line key={i} x1={line.x1} y1={line.y1} x2={line.x2} y2={line.y2} stroke="url(#lineGradient)" strokeWidth="1">
                        <animate attributeName="opacity" values="0.2;0.6;0.2" dur="3s" begin={`${i * 0.5}s`} repeatCount="indefinite"/>
                      </line>
                    ))}
                  </g>

                  {/* Data Flow Particles */}
                  {[...Array(20)].map((_, i) => (
                    <circle key={i} r="2" fill="#22d3ee">
                      <animateMotion dur="4s" repeatCount="indefinite" begin={`${i * 0.2}s`}>
                        <mpath href={`#flowPath${i % 4}`}/>
                      </animateMotion>
                      <animate attributeName="opacity" values="0;1;0" dur="4s" repeatCount="indefinite"/>
                    </circle>
                  ))}

                  {/* Hidden paths for animation */}
                  <defs>
                    <path id="flowPath0" d="M 200 100 Q 300 50 400 100" fill="none"/>
                    <path id="flowPath1" d="M 600 100 Q 500 50 400 100" fill="none"/>
                    <path id="flowPath2" d="M 200 300 Q 300 350 400 300" fill="none"/>
                    <path id="flowPath3" d="M 600 300 Q 500 350 400 300" fill="none"/>
                  </defs>

                  {/* Labels */}
                  <g fontSize="12" fontWeight="bold">
                    <text x="100" y="50" fill="#22d3ee" textAnchor="middle">PRESSURE</text>
                    <text x="700" y="50" fill="#a855f7" textAnchor="middle">TEMPERATURE</text>
                    <text x="100" y="370" fill="#ec4899" textAnchor="middle">VIBRATION</text>
                    <text x="700" y="370" fill="#3b82f6" textAnchor="middle">PROXIMITY</text>
                  </g>

                  {/* Gradients */}
                  <defs>
                    <linearGradient id="palmGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#22d3ee"/>
                      <stop offset="100%" stopColor="#a855f7"/>
                    </linearGradient>
                    <linearGradient id="fingerGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.5"/>
                      <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.3"/>
                    </linearGradient>
                    <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#22d3ee"/>
                      <stop offset="50%" stopColor="#a855f7"/>
                      <stop offset="100%" stopColor="#22d3ee"/>
                    </linearGradient>
                  </defs>
                </svg>

                {/* Caption */}
                <div className="mt-6 text-center">
                  <p className="text-sm text-cyan-400 font-semibold">MULTIMODAL SENSOR ARRAY ARCHITECTURE</p>
                  <p className="text-xs text-blue-300 mt-1">10,000+ taxels • <1ms response • Self-healing substrate</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section - Enhanced */}
      <section className="py-20 bg-gradient-to-b from-slate-900 to-slate-800 border-t border-b border-cyan-500/20 relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <pattern id="statsgrid" width="10" height="10" patternUnits="userSpaceOnUse">
              <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeWidth="0.5"/>
            </pattern>
            <rect width="100" height="100" fill="url(#statsgrid)"/>
          </svg>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center group">
                <div className="relative inline-block">
                  {/* Glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500 blur-xl opacity-30 group-hover:opacity-60 transition-opacity"></div>
                  <div className="relative text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-cyan-400 via-blue-400 to-purple-400 mb-3 group-hover:scale-110 transition-transform duration-300">
                    {stat.value}
                  </div>
                </div>
                <div className="text-gray-300 font-medium text-sm uppercase tracking-wide">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section - Cyberpunk Style */}
      <section className="py-24 bg-gradient-to-b from-slate-800 via-slate-900 to-slate-800 relative overflow-hidden">
        {/* Hexagon Pattern */}
        <div className="absolute inset-0 opacity-5">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
              <pattern id="hexagons" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M10 0 L20 5 L20 15 L10 20 L0 15 L0 5 Z" fill="none" stroke="currentColor" strokeWidth="0.5"/>
              </pattern>
            </defs>
            <rect width="100" height="100" fill="url(#hexagons)"/>
          </svg>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-3 py-1 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 text-cyan-400 rounded-full text-sm font-bold mb-4 border border-cyan-500/30">
              Core Technology
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Three Pillars of <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">Tactile Intelligence</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Our proprietary architecture integrates advanced materials science, neuromorphic computing,
              and smart polymers to deliver the world's most sophisticated robotic tactile sensing platform.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group relative bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm rounded-2xl p-10 border border-cyan-500/20 hover:border-cyan-400/40 shadow-2xl hover:shadow-cyan-500/10 transition-all duration-300 overflow-hidden"
              >
                {/* Hover Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>

                {/* Corner Accents */}
                <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-cyan-400 rounded-tl-lg"></div>
                <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-purple-400 rounded-tr-lg"></div>
                <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-purple-400 rounded-bl-lg"></div>
                <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-cyan-400 rounded-br-lg"></div>

                <div className="relative">
                  <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-cyan-500/30">
                    {feature.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-cyan-300 transition-colors">{feature.title}</h3>
                  <p className="text-gray-300 leading-relaxed">{feature.description}</p>

                  {/* Tech Specs */}
                  <div className="mt-6 pt-6 border-t border-gray-700">
                    <div className="flex items-center text-xs text-cyan-400 font-mono">
                      <span className="w-2 h-2 bg-cyan-400 rounded-full mr-2 animate-pulse"></span>
                      ACTIVE
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-14">
            <Link
              href="/technology"
              className="group inline-flex items-center justify-center px-10 py-4 bg-gradient-to-r from-cyan-600 to-blue-700 text-white font-bold rounded-lg hover:from-cyan-500 hover:to-blue-600 transition-all transform hover:scale-105 shadow-lg shadow-cyan-500/30"
            >
              Explore Technical Specifications
              <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Latest Research Section - New */}
      <section className="py-24 bg-gradient-to-b from-slate-900 to-slate-800 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-3 py-1 bg-purple-500/10 text-purple-400 rounded-full text-sm font-bold mb-4 border border-purple-500/30">
              Latest Publications
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Peer-Reviewed <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">Research 2026</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Our latest breakthroughs published in leading scientific journals
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { journal: 'Nature Robotics', title: '0.01N Sensitivity Barrier', date: 'Jan 2026', color: 'cyan' },
              { journal: 'Science Advances', title: 'Quantum Tunneling Sensors', date: 'Dec 2025', color: 'purple' },
              { journal: 'Advanced Materials', title: '24-Hour Self-Healing', date: 'Nov 2025', color: 'pink' }
            ].map((paper, index) => (
              <div key={index} className="group relative bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700 hover:border-${paper.color}-500/50 transition-all">
                <div className="absolute top-4 right-4">
                  <span className={`px-3 py-1 bg-${paper.color}-500/10 text-${paper.color}-400 text-xs font-bold rounded-full border border-${paper.color}-500/30`}>
                {paper.date}
                </span>
                </div>
                <div className="text-${paper.color}-400 font-bold text-sm mb-3">{paper.journal}</div>
                <h3 className="text-xl font-bold text-white mb-4 group-hover:text-${paper.color}-300 transition-colors">{paper.title}</h3>
                <Link href="/research" className="inline-flex items-center text-${paper.color}-400 hover:text-${paper.color}-300 font-semibold text-sm">
                  Read Paper
                  <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - Cyberpunk Enhanced */}
      <section className="py-24 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white relative overflow-hidden">
        {/* Animated Grid */}
        <div className="absolute inset-0 opacity-20">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
              <pattern id="ctagrid" width="10" height="10" patternUnits="userSpaceOnUse">
                <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeWidth="0.3"/>
              </pattern>
            </defs>
            <rect width="100" height="100" fill="url(#ctagrid)"/>
          </svg>
        </div>

        {/* Neon Lines */}
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-purple-400 to-transparent"></div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Transform Your Robotic Systems <span className="text-cyan-400">Today</span>
          </h2>
          <p className="text-xl text-blue-100 mb-10 max-w-3xl mx-auto leading-relaxed">
            Join leading robotics companies and research institutions leveraging RoboSkin technology
            to achieve breakthrough capabilities in autonomous manipulation and human-robot collaboration.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="group relative inline-flex items-center justify-center px-10 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold rounded-lg hover:from-cyan-400 hover:to-blue-500 transition-all transform hover:scale-105 shadow-xl shadow-cyan-500/30 overflow-hidden"
            >
              <span className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></span>
              <span className="relative flex items-center">
                Schedule Technical Consultation
                <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
            </Link>
            <Link
              href="/applications"
              className="group relative inline-flex items-center justify-center px-10 py-4 bg-transparent border-2 border-purple-500 text-white font-bold rounded-lg hover:bg-purple-500/10 transition-all overflow-hidden"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-pink-600/20 opacity-0 group-hover:opacity-100 transition-opacity"></span>
              <span className="relative">Explore Use Cases</span>
            </Link>
          </div>

          {/* Stats Badge */}
          <div className="mt-12 inline-flex items-center px-6 py-3 bg-slate-800/50 backdrop-blur-sm rounded-xl border border-gray-700">
            <div className="flex items-center space-x-8">
              <div className="text-center">
                <div className="text-2xl font-bold text-cyan-400">8+</div>
                <div className="text-xs text-gray-400">Peer-Reviewed Papers</div>
              </div>
              <div className="w-px h-8 bg-gray-700"></div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-400">50+</div>
                <div className="text-xs text-gray-400">Patents Filed</div>
              </div>
              <div className="w-px h-8 bg-gray-700"></div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-400">$12M</div>
                <div className="text-xs text-gray-400">NASA Funding</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
