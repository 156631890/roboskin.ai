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
          <path strokeLinecap="round" strokeLinejoin="round" d="M8 10l2 2 4-4" />
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
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-700 via-blue-600 to-blue-800 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
              <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeWidth="0.5"/>
              </pattern>
            </defs>
            <rect width="100" height="100" fill="url(#grid)"/>
          </svg>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-28 md:py-36 relative">
          <div className="text-center">
            <div className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium mb-6 border border-white/20">
              <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M13 10V3L4 14h7v7l9-11h-7z"/>
              </svg>
              Pioneering Tactile Intelligence Since 2023
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight">
              Next-Generation<br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-cyan-200">
                Robotic Tactile Systems
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 max-w-4xl mx-auto mb-12 leading-relaxed">
              Revolutionary bio-inspired artificial skin technology that equips robots with human-level tactile perception,
              enabling unprecedented capabilities in manipulation, exploration, and human-robot interaction.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/technology"
                className="inline-flex items-center justify-center px-10 py-4 bg-white text-blue-700 font-bold rounded-lg hover:bg-blue-50 transition-all transform hover:scale-105 shadow-xl"
              >
                Explore Technology
                <svg className="w-5 h-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-10 py-4 bg-transparent border-2 border-white text-white font-bold rounded-lg hover:bg-white/10 transition-all"
              >
                Request Technical Brief
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center group">
                <div className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-blue-600 to-blue-800 mb-3 group-hover:scale-110 transition-transform">
                  {stat.value}
                </div>
                <div className="text-gray-700 font-medium text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold mb-4">
              Core Technology
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Three Pillars of Tactile Intelligence
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Our proprietary architecture integrates advanced materials science, neuromorphic computing,
              and smart polymers to deliver the world's most sophisticated robotic tactile sensing platform.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-10 border border-gray-200 shadow-lg hover:shadow-2xl transition-all group"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform shadow-lg">
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-14">
            <Link
              href="/technology"
              className="inline-flex items-center justify-center px-10 py-4 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-all transform hover:scale-105 shadow-lg"
            >
              Explore Technical Specifications
              <svg className="w-5 h-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-blue-700 via-blue-600 to-blue-800 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
              <pattern id="grid2" width="10" height="10" patternUnits="userSpaceOnUse">
                <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeWidth="0.5"/>
              </pattern>
            </defs>
            <rect width="100" height="100" fill="url(#grid2)"/>
          </svg>
        </div>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Transform Your Robotic Systems Today
          </h2>
          <p className="text-xl text-blue-100 mb-10 max-w-3xl mx-auto leading-relaxed">
            Join leading robotics companies and research institutions leveraging RoboSkin technology
            to achieve breakthrough capabilities in autonomous manipulation, human-robot collaboration,
            and unstructured environment interaction.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-10 py-4 bg-white text-blue-700 font-bold rounded-lg hover:bg-blue-50 transition-all transform hover:scale-105 shadow-xl"
            >
              Schedule Technical Consultation
            </Link>
            <Link
              href="/applications"
              className="inline-flex items-center justify-center px-10 py-4 bg-transparent border-2 border-white text-white font-bold rounded-lg hover:bg-white/10 transition-all"
            >
              Explore Use Cases
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
