import type { Metadata } from "next";
import Link from 'next/link';

export const metadata: Metadata = {
  title: "News",
  description: "Latest news, press releases, and media coverage",
};

export default function NewsPage() {
  const news = [
    { date: 'Jan 15, 2026', type: 'Press Release', title: 'RoboSkin Raises $100M Series C to Scale Manufacturing', summary: 'Funding will enable mass production of tactile sensor arrays for global robotics market.', source: 'Business Wire' },
    { date: 'Dec 20, 2025', type: 'Coverage', title: 'The Robot Skin That Can Feel', summary: 'Feature story on breakthrough neuromorphic tactile sensing technology.', source: 'MIT Technology Review' },
    { date: 'Dec 10, 2025', type: 'Press Release', title: 'NASA Selects RoboSkin for Mars 2028 Mission', summary: 'Extreme-environment sensors chosen for next-generation sample collection.', source: 'Company' },
    { date: 'Nov 5, 2025', type: 'Coverage', title: 'Giving Robots a Sense of Touch', summary: 'How RoboSkin is revolutionizing human-robot collaboration in factories.', source: 'Wired' },
    { date: 'Oct 18, 2025', type: 'Press Release', title: 'Medtronic Partnership Brings Touch to Surgical Robotics', summary: 'Multi-year deal to integrate tactile feedback into Hugo surgical system.', source: 'Company' },
    { date: 'Sep 30, 2025', type: 'Award', title: 'RoboSkin Named to Fast Company\'s Most Innovative Companies', summary: 'Recognized for breakthrough work in robotic tactile perception.', source: 'Fast Company' },
    { date: 'Aug 15, 2025', type: 'Coverage', title: 'This Startup Is Making Robots That Can Feel', summary: 'Inside the lab building the future of robotic sensing.', source: 'Forbes' },
    { date: 'Jul 22, 2025', type: 'Press Release', title: 'Open Source Release: Multimodal Fusion Framework', summary: 'Publishing core sensor fusion algorithms for research community.', source: 'Company' },
  ];

  return (
    <>
      <section className="bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white py-24">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">News & <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">Media</span></h1>
          <p className="text-xl text-blue-100 max-w-4xl mx-auto">Latest press releases, media coverage, and company updates.</p>
        </div>
      </section>

      <section className="py-24 bg-slate-800">
        <div className="max-w-4xl mx-auto px-4">
          <div className="space-y-8">
            {news.map((item, idx) => (
              <article key={idx} className="bg-slate-700/50 rounded-xl p-8 border border-cyan-500/20 hover:border-cyan-400/40 transition-all">
                <div className="flex items-center gap-4 mb-4">
                  <span className="px-3 py-1 bg-cyan-500/10 text-cyan-400 text-xs font-bold rounded-full">{item.type}</span>
                  <span className="text-gray-400 text-sm">{item.date}</span>
                  <span className="text-gray-500 text-sm">{item.source}</span>
                </div>
                <h2 className="text-2xl font-bold text-white mb-3">{item.title}</h2>
                <p className="text-gray-300">{item.summary}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Press Inquiries</h2>
          <p className="text-gray-400 mb-8">Media contact: press@roboskin.ai</p>
          <Link href="/contact" className="inline-flex items-center px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold rounded-lg">Contact PR Team</Link>
        </div>
      </section>
    </>
  );
}
