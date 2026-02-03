import type { Metadata } from "next";
import Link from 'next/link';

export const metadata: Metadata = {
  title: "Resources",
  description: "Developer resources, documentation, white papers, and SDK downloads",
};

export default function ResourcesPage() {
  const resources = [
    {
      category: "Documentation",
      items: [
        { title: "Getting Started Guide", desc: "Quick start tutorial for RS-1000 integration", type: "PDF", size: "2.3 MB", link: "/docs/getting-started.pdf" },
        { title: "API Reference", desc: "Complete API documentation for all products", type: "HTML", size: "Online", link: "/docs/api" },
        { title: "ROS/ROS2 Integration", desc: "Node packages and examples", type: "PDF", size: "1.8 MB", link: "/docs/ros-integration.pdf" },
      ]
    },
    {
      category: "SDK & Tools",
      items: [
        { title: "Python SDK v2.1", desc: "Full-featured Python library", type: "ZIP", size: "15 MB", link: "/sdk/python-sdk-v2.1.zip" },
        { title: "C++ SDK v2.1", desc: "High-performance C++ library", type: "ZIP", size: "22 MB", link: "/sdk/cpp-sdk-v2.1.zip" },
        { title: "Firmware Updates", desc: "Latest firmware for all products", type: "ZIP", size: "8 MB", link: "/firmware/latest.zip" },
      ]
    },
    {
      category: "White Papers",
      items: [
        { title: "Tactile Sensing in Healthcare", desc: "Medical applications overview", type: "PDF", size: "4.2 MB", link: "/whitepapers/healthcare.pdf" },
        { title: "Industrial Automation Guide", desc: "Manufacturing implementation best practices", type: "PDF", size: "3.1 MB", link: "/whitepapers/industrial.pdf" },
        { title: "Safety Standards Compliance", desc: "ISO 13849-1 implementation guide", type: "PDF", size: "2.8 MB", link: "/whitepapers/safety.pdf" },
      ]
    },
    {
      category: "Datasheets",
      items: [
        { title: "RS-1000 Datasheet", desc: "Complete specifications", type: "PDF", size: "1.2 MB", link: "/datasheets/RS-1000.pdf" },
        { title: "RS-2000 Datasheet", desc: "High-performance specifications", type: "PDF", size: "1.5 MB", link: "/datasheets/RS-2000.pdf" },
        { title: "RPU-100 Datasheet", desc: "Processing unit specifications", type: "PDF", size: "1.1 MB", link: "/datasheets/RPU-100.pdf" },
      ]
    },
  ];

  return (
    <>
      <section className="bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white py-24">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">Developer <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">Resources</span></h1>
          <p className="text-xl text-blue-100 max-w-4xl mx-auto">Documentation, SDKs, white papers, and tools to help you integrate RoboSkin technology.</p>
        </div>
      </section>

      <section className="py-24 bg-slate-800">
        <div className="max-w-7xl mx-auto px-4">
          {resources.map((section, idx) => (
            <div key={idx} className="mb-16">
              <h2 className="text-2xl font-bold text-white mb-6">{section.category}</h2>
              <div className="grid md:grid-cols-3 gap-6">
                {section.items.map((item, i) => (
                  <a key={i} href={item.link} className="bg-slate-700/50 rounded-xl p-6 border border-cyan-500/20 hover:border-cyan-400/40 transition-all group">
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-12 h-12 bg-cyan-500/10 rounded-lg flex items-center justify-center">
                        <svg className="w-6 h-6 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                      </div>
                      <span className="text-xs font-bold bg-slate-600 px-2 py-1 rounded">{item.type}</span>
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2 group-hover:text-cyan-400">{item.title}</h3>
                    <p className="text-gray-400 text-sm mb-4">{item.desc}</p>
                    <div className="text-xs text-gray-500">{item.size}</div>
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="py-20 bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Need Help?</h2>
          <p className="text-gray-400 mb-8">Our engineering team is ready to assist with your integration.</p>
          <div className="flex gap-4 justify-center">
            <Link href="/contact" className="px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold rounded-lg">Contact Support</Link>
            <a href="https://github.com/roboskin-ai" className="px-8 py-3 bg-slate-700 text-white font-bold rounded-lg">View on GitHub</a>
          </div>
        </div>
      </section>
    </>
  );
}
