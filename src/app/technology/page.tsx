import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Technology",
  description: "Explore RoboSkin.ai's core technology: nano-tactile sensors, neuromorphic processing, and self-healing materials for advanced robotic tactile perception.",
  keywords: ["technology", "graphene sensors", "neuromorphic computing", "self-healing materials", "technical specifications"],
};

export default function TechnologyPage() {
  const technologies = [
    {
      title: "Nano-Tactile Sensor Array",
      subtitle: "Proprietary Graphene-Based Transducers",
      description: "Our nano-tactile sensor arrays employ graphene-based pressure transducers achieving 0.01N force sensitivity with sub-millimeter spatial resolution. Each sensor node operates independently, creating a dense feedback matrix that rivals human mechanoreceptor density and performance.",
      features: [
        { spec: "0.01N - 50N", label: "Dynamic Force Range" },
        { spec: "<1ms", label: "Signal Latency" },
        { spec: "10,000+", label: "Sensor Nodes/m²" },
        { spec: "Auto", label: "Self-Calibration" },
        { spec: "-196°C to 500°C", label: "Operating Temperature" },
        { spec: "99.7%", label: "Measurement Accuracy" }
      ]
    },
    {
      title: "Neuromorphic Processing Engine",
      subtitle: "Spiking Neural Network Architecture",
      description: "At the core of RoboSkin lies our neural processing engine converting raw tactile data into meaningful perceptual information. Using spiking neural networks trained on millions of touch interactions, our system performs real-time texture classification, slip prediction, and object recognition.",
      features: [
        { spec: "<5ms", label: "Inference Time" },
        { spec: "SNN-CNN", label: "Hybrid Architecture" },
        { spec: "1M+", label: "Training Samples" },
        { spec: "Online", label: "Adaptive Learning" },
        { spec: "ROS2/ROS", label: "Integration Support" },
        { spec: "Edge/Cloud", label: "Deployment Options" }
      ]
    },
    {
      title: "Autonomous Self-Healing Matrix",
      subtitle: "Smart Polymer Composite",
      description: "RoboSkin's outer layer features a revolutionary self-healing polymer autonomously repairing micro-damage within 24 hours at ambient conditions. Bio-inspired material science delivers exceptional durability while maintaining precise tactile sensitivity over extended operational lifetimes.",
      features: [
        { spec: "24hr", label: "Repair Time" },
        { spec: "300%", label: "Elongation Capacity" },
        { spec: "IP67", label: "Ingress Protection" },
        { spec: "UV-Stable", label: "Outdoor Rating" },
        { spec: "10,000+", label: "Healing Cycles" },
        { spec: "7+ years", label: "Service Life" }
      ]
    }
  ];

  return (
    <>
      {/* Hero Section - Cyberpunk Enhanced */}
      <section className="bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white relative overflow-hidden">
        {/* Animated Grid Background */}
        <div className="absolute inset-0 opacity-20">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
              <pattern id="techgrid" width="5" height="5" patternUnits="userSpaceOnUse">
                <path d="M 5 0 L 0 0 0 5" fill="none" stroke="currentColor" strokeWidth="0.3" className="text-cyan-400"/>
              </pattern>
              <pattern id="techgrid-large" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-blue-500"/>
              </pattern>
            </defs>
            <rect width="100" height="100" fill="url(#techgrid)" />
            <rect width="100" height="100" fill="url(#techgrid-large)" />
          </svg>
        </div>

        {/* Neon Glowing Lines */}
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-pulse"></div>
        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-blue-500 to-transparent animate-pulse"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 relative">
          <div className="text-center">
            <div className="inline-flex items-center px-4 py-2 bg-cyan-500/10 backdrop-blur-sm rounded-full text-sm font-semibold mb-8 border border-cyan-400/30">
              <svg className="w-4 h-4 mr-2 text-cyan-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"/>
              </svg>
              Technical Specifications
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Core <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">Technology</span> Architecture
            </h1>
            <p className="text-xl text-blue-100 max-w-4xl mx-auto leading-relaxed">
              Explore the three groundbreaking innovations that enable RoboSkin to deliver
              human-equivalent tactile perception for next-generation robotic systems.
            </p>
          </div>
        </div>
      </section>

      {/* Technologies */}
      <section className="py-24 bg-gradient-to-b from-slate-800 via-slate-900 to-slate-800 relative overflow-hidden">
        {/* Hexagon Pattern */}
        <div className="absolute inset-0 opacity-5">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
              <pattern id="techhexagons" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M10 0 L20 5 L20 15 L10 20 L0 15 L0 5 Z" fill="none" stroke="currentColor" strokeWidth="0.5"/>
              </pattern>
            </defs>
            <rect width="100" height="100" fill="url(#techhexagons)"/>
          </svg>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          {technologies.map((tech, index) => (
            <div
              key={index}
              className={`flex flex-col ${
                index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
              } items-center gap-16 mb-24 last:mb-0`}
            >
              {/* Image/Illustration */}
              <div className="w-full md:w-1/2">
                <div className="h-96 rounded-2xl bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm border-2 border-cyan-500/30 flex items-center justify-center shadow-2xl shadow-cyan-500/10 relative overflow-hidden group">
                  {/* Animated Background */}
                  <div className="absolute inset-0 opacity-20">
                    <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                      <defs>
                        <pattern id={`techgrid${index}`} width="10" height="10" patternUnits="userSpaceOnUse">
                          <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-cyan-400"/>
                        </pattern>
                      </defs>
                      <rect width="100" height="100" fill={`url(#techgrid${index})`}/>
                    </svg>
                  </div>

                  <svg className="w-32 h-32 text-cyan-400 group-hover:scale-110 transition-transform duration-300 relative z-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                    {index === 0 && (
                      <>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9.348 14.952c-.527-.139-1.026-.386-1.47-.724-.736-.56-1.296-1.356-1.614-2.273a4.98 4.98 0 01-.086-2.662c.283-1.183.972-2.209 1.928-2.92.956-.71 2.125-1.09 3.32-1.08 1.196.01 2.354.415 3.293 1.143.94.729 1.61 1.77 1.869 2.96a4.992 4.992 0 01-.68 3.866 5.006 5.006 0 01-3.116 2.166" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.32 11.32l1.41 1.41M2 12h2m16 0h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
                      </>
                    )}
                    {index === 1 && (
                      <>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8 10l2 2 4-4M12 15l2 2 4-4" />
                      </>
                    )}
                    {index === 2 && (
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
                    )}
                  </svg>
                </div>
              </div>

              {/* Content */}
              <div className="w-full md:w-1/2">
                <div className="inline-flex items-center px-3 py-1 bg-cyan-500/10 text-cyan-400 rounded-full text-sm font-bold mb-4 border border-cyan-500/30">
                  Technology 0{index + 1}
                </div>
                <h2 className="text-4xl font-bold text-white mb-3">{tech.title}</h2>
                <p className="text-lg text-cyan-400 font-semibold mb-4">{tech.subtitle}</p>
                <p className="text-gray-300 text-base leading-relaxed mb-8">
                  {tech.description}
                </p>

                <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-5">Technical Specifications</h3>
                <div className="grid grid-cols-2 gap-4">
                  {tech.features.map((feature, idx) => (
                    <div key={idx} className="bg-slate-800/50 backdrop-blur-sm p-4 rounded-lg border border-cyan-500/20 hover:border-cyan-400/40 transition-all">
                      <div className="text-2xl font-bold text-cyan-400 mb-1">{feature.spec}</div>
                      <div className="text-sm text-gray-400">{feature.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white py-24 relative overflow-hidden">
        {/* Animated Grid */}
        <div className="absolute inset-0 opacity-20">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
              <pattern id="techctagrid" width="10" height="10" patternUnits="userSpaceOnUse">
                <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeWidth="0.3"/>
              </pattern>
            </defs>
            <rect width="100" height="100" fill="url(#techctagrid)"/>
          </svg>
        </div>

        {/* Neon Lines */}
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-purple-400 to-transparent"></div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Interested in <span className="text-cyan-400">Technical Integration</span>?
          </h2>
          <p className="text-xl text-blue-100 mb-10 max-w-3xl mx-auto leading-relaxed">
            Discover how RoboSkin technology can enhance your robotic systems.
            Explore real-world applications or review our latest research publications.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/applications"
              className="inline-flex items-center justify-center px-10 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold rounded-lg hover:from-cyan-400 hover:to-blue-500 transition-all transform hover:scale-105 shadow-lg shadow-cyan-500/30"
            >
              Explore Use Cases
              <svg className="w-5 h-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
            <a
              href="/research"
              className="inline-flex items-center justify-center px-10 py-4 bg-transparent border-2 border-purple-500 text-white font-bold rounded-lg hover:bg-purple-500/10 transition-all"
            >
              View Research
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
