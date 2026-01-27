import type { Metadata } from "next";
import Link from 'next/link';

export const metadata: Metadata = {
  title: "Applications",
  description: "Discover how RoboSkin.ai transforms healthcare, manufacturing, service robotics, and exploration with advanced tactile sensing technology.",
  keywords: ["applications", "use cases", "healthcare", "manufacturing", "service robots", "exploration"],
};

export default function ApplicationsPage() {
  const applications = [
    {
      title: "Healthcare & Medical Robotics",
      subtitle: "Precision Surgical Assistance",
      description: "Revolutionizing patient care with sensitive surgical assistants, rehabilitation robots, and diagnostic systems that require precise tactile feedback for safe human interaction.",
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
        </svg>
      ),
      color: "cyan",
      useCases: [
        "Minimally invasive surgical robots with haptic feedback",
        "Robotic-assisted rehabilitation and physical therapy",
        "Elderly care assistance with adaptive grip control",
        "Diagnostic palpation and tissue characterization",
        "Prosthetic limb integration with sensory feedback"
      ]
    },
    {
      title: "Industrial Automation & Manufacturing",
      subtitle: "Smart Factory Integration",
      description: "Enhancing manufacturing efficiency and workplace safety with intelligent tactile robots capable of delicate assembly, quality inspection, and safe human collaboration.",
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z" />
        </svg>
      ),
      color: "purple",
      useCases: [
        "Precision assembly of microelectronics and delicate components",
        "Collaborative robots (cobots) for safe human-robot teamwork",
        "Automated quality control through tactile inspection",
        "Material handling with slip prevention and damage avoidance",
        "Adaptive gripping for irregular or fragile objects"
      ]
    },
    {
      title: "Service & Consumer Robotics",
      subtitle: "Everyday Automation",
      description: "Bringing intelligent, sensitive robots into daily life for home assistance, education, and commercial applications requiring safe human interaction and environmental adaptability.",
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
        </svg>
      ),
      color: "pink",
      useCases: [
        "Home assistance robots for elderly and disabled care",
        "Educational robotics platforms for STEM learning",
        "Hotel and hospitality service robots",
        "Restaurant and food service automation",
        "Interactive companions and entertainment robots"
      ]
    },
    {
      title: "Exploration & Field Robotics",
      subtitle: "Unstructured Environment Navigation",
      description: "Enabling autonomous exploration in extreme environments through advanced tactile perception for terrain adaptation, object manipulation, and safe navigation in unknown surroundings.",
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
        </svg>
      ),
      color: "blue",
      useCases: [
        "Space exploration rovers with surface interaction capabilities",
        "Search and rescue robots in disaster zones",
        "Underwater inspection and maintenance vehicles",
        "Agricultural robots for produce harvesting",
        "Mining and excavation equipment with terrain sensing"
      ]
    }
  ];

  const stats = [
    { value: "40%", label: "Fewer Surgical Complications" },
    { value: "76%", label: "Reduction in Phantom Pain" },
    { value: "98%", label: "Object Recognition Accuracy" },
    { value: "10x", label: "Longer Lifespan vs Competitors" }
  ];

  return (
    <>
      {/* Hero Section - Cyberpunk Enhanced */}
      <section className="bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white relative overflow-hidden">
        {/* Animated Grid Background */}
        <div className="absolute inset-0 opacity-20">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
              <pattern id="appgrid" width="5" height="5" patternUnits="userSpaceOnUse">
                <path d="M 5 0 L 0 0 0 5" fill="none" stroke="currentColor" strokeWidth="0.3" className="text-cyan-400"/>
              </pattern>
              <pattern id="appgrid-large" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-blue-500"/>
              </pattern>
            </defs>
            <rect width="100" height="100" fill="url(#appgrid)" />
            <rect width="100" height="100" fill="url(#appgrid-large)" />
          </svg>
        </div>

        {/* Neon Glowing Lines */}
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-pulse"></div>
        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-blue-500 to-transparent animate-pulse"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 relative">
          <div className="text-center">
            <div className="inline-flex items-center px-4 py-2 bg-cyan-500/10 backdrop-blur-sm rounded-full text-sm font-semibold mb-8 border border-cyan-400/30">
              <svg className="w-4 h-4 mr-2 text-cyan-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z"/>
              </svg>
              Industry Applications
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Transforming <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">Industries</span> Worldwide
            </h1>
            <p className="text-xl text-blue-100 max-w-4xl mx-auto leading-relaxed">
              Discover how leading organizations leverage RoboSkin technology to achieve
              breakthrough capabilities in autonomous manipulation and human-robot collaboration.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-b from-slate-900 to-slate-800 border-t border-b border-cyan-500/20 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center group">
                <div className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-cyan-400 via-blue-400 to-purple-400 mb-3">
                  {stat.value}
                </div>
                <div className="text-gray-300 font-medium text-sm uppercase tracking-wide">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Applications */}
      <section className="py-24 bg-gradient-to-b from-slate-800 via-slate-900 to-slate-800 relative overflow-hidden">
        {/* Hexagon Pattern */}
        <div className="absolute inset-0 opacity-5">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
              <pattern id="apphexagons" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M10 0 L20 5 L20 15 L10 20 L0 15 L0 5 Z" fill="none" stroke="currentColor" strokeWidth="0.5"/>
              </pattern>
            </defs>
            <rect width="100" height="100" fill="url(#apphexagons)"/>
          </svg>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          {applications.map((app, index) => (
            <div key={index} className="mb-20 last:mb-0">
              <div className="flex items-start gap-6 mb-8">
                <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-cyan-500/30">
                  {app.icon}
                </div>
                <div className="flex-grow">
                  <h2 className="text-4xl font-bold text-white mb-2">{app.title}</h2>
                  <p className="text-lg text-cyan-400 font-semibold mb-4">{app.subtitle}</p>
                  <p className="text-gray-300 text-base leading-relaxed">{app.description}</p>
                </div>
              </div>

              <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-cyan-500/20 overflow-hidden">
                <div className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 px-8 py-4 border-b border-cyan-500/20">
                  <h3 className="text-lg font-bold text-white">Implementation Use Cases</h3>
                </div>
                <div className="p-8">
                  <div className="grid md:grid-cols-2 gap-4">
                    {app.useCases.map((useCase, idx) => (
                      <div key={idx} className="flex items-start">
                        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-cyan-500/10 flex items-center justify-center mr-3 mt-0.5 border border-cyan-500/30">
                          <svg className="w-4 h-4 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                        <span className="text-gray-300 font-medium">{useCase}</span>
                      </div>
                    ))}
                  </div>
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
              <pattern id="appctagrid" width="10" height="10" patternUnits="userSpaceOnUse">
                <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeWidth="0.3"/>
              </pattern>
            </defs>
            <rect width="100" height="100" fill="url(#appctagrid)"/>
          </svg>
        </div>

        {/* Neon Lines */}
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-purple-400 to-transparent"></div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Explore <span className="text-cyan-400">Integration</span>?
          </h2>
          <p className="text-xl text-blue-100 mb-10 max-w-3xl mx-auto leading-relaxed">
            Discuss your specific requirements with our engineering team and discover
            how RoboSkin technology can enhance your robotic systems.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-10 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold rounded-lg hover:from-cyan-400 hover:to-blue-500 transition-all transform hover:scale-105 shadow-lg shadow-cyan-500/30"
            >
              Schedule Consultation
              <svg className="w-5 h-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <Link
              href="/technology"
              className="inline-flex items-center justify-center px-10 py-4 bg-transparent border-2 border-purple-500 text-white font-bold rounded-lg hover:bg-purple-500/10 transition-all"
            >
              View Technology
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
