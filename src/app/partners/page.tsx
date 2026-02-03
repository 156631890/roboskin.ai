import type { Metadata } from "next";
import Link from 'next/link';

export const metadata: Metadata = {
  title: "Partners",
  description: "Our partners and collaborators in advancing tactile robotics",
};

export default function PartnersPage() {
  const partners = [
    { category: "Strategic Partners", list: [
      { name: "Medtronic", logo: "M", desc: "Surgical robotics integration", type: "Healthcare" },
      { name: "Intuitive Surgical", logo: "I", desc: "Da Vinci system partnership", type: "Healthcare" },
      { name: "Tesla", logo: "T", desc: "Manufacturing automation", type: "Manufacturing" },
      { name: "Bosch", logo: "B", desc: "Collaborative robot safety", type: "Industrial" },
    ]},
    { category: "Research Collaborations", list: [
      { name: "MIT CSAIL", logo: "M", desc: "Core sensor research", type: "Academic" },
      { name: "Stanford Bio-X", logo: "S", desc: "Neural interface studies", type: "Academic" },
      { name: "NASA JPL", logo: "N", desc: "Space applications", type: "Government" },
      { name: "Technical University Munich", logo: "T", desc: "Materials science", type: "Academic" },
    ]},
    { category: "Technology Partners", list: [
      { name: "NVIDIA", logo: "N", desc: "AI acceleration", type: "Technology" },
      { name: "Dow Chemical", logo: "D", desc: "Materials manufacturing", type: "Materials" },
      { name: "Flex", logo: "F", desc: "Mass production", type: "Manufacturing" },
      { name: "3M", logo: "3", desc: "Adhesive technology", type: "Materials" },
    ]},
    { category: "Investors", list: [
      { name: "Sequoia Capital", logo: "S", desc: "Series B lead", type: "VC" },
      { name: "Khosla Ventures", logo: "K", desc: "Early stage", type: "VC" },
      { name: "Intel Capital", logo: "I", desc: "Strategic investment", type: "Corporate" },
      { name: "NASA", logo: "N", desc: "SBIR grants", type: "Government" },
    ]},
  ];

  return (
    <>
      <section className="bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white py-24">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">Partners</span></h1>
          <p className="text-xl text-blue-100 max-w-4xl mx-auto">Collaborating with industry leaders, research institutions, and investors to advance tactile robotics.</p>
        </div>
      </section>

      <section className="py-24 bg-slate-800">
        <div className="max-w-7xl mx-auto px-4">
          {partners.map((section, idx) => (
            <div key={idx} className="mb-16">
              <h2 className="text-2xl font-bold text-white mb-8">{section.category}</h2>
              <div className="grid md:grid-cols-4 gap-6">
                {section.list.map((partner, i) => (
                  <div key={i} className="bg-slate-700/50 rounded-xl p-6 border border-cyan-500/20 text-center">
                    <div className="w-16 h-16 mx-auto bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center text-white text-2xl font-bold mb-4">
                      {partner.logo}
                    </div>
                    <h3 className="text-lg font-bold text-white mb-1">{partner.name}</h3>
                    <p className="text-gray-400 text-sm mb-2">{partner.desc}</p>
                    <span className="text-xs text-cyan-400">{partner.type}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="py-20 bg-slate-900">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Become a Partner</h2>
          <p className="text-gray-400 mb-8">Join our ecosystem of innovators advancing robotic tactile perception.</p>
          <Link href="/contact" className="inline-flex items-center px-10 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold rounded-lg">Explore Partnership</Link>
        </div>
      </section>
    </>
  );
}
