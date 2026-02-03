import type { Metadata } from "next";
import Link from 'next/link';

export const metadata: Metadata = {
  title: "Case Studies",
  description: "Customer success stories and real-world implementations",
};

export default function CaseStudiesPage() {
  const cases = [
    { company: 'Medtronic', logo: 'M', industry: 'Healthcare', title: 'Revolutionizing Surgery', summary: 'Integrated RoboSkin sensors into Hugo surgical robot.', results: [{metric: '40%', label: 'Faster ops'}, {metric: '73%', label: 'Less complications'}, {metric: '95%', label: 'Satisfaction'}], testimonial: 'Transformative for our teams.', author: 'CMO' },
    { company: 'Tesla', logo: 'T', industry: 'Manufacturing', title: 'Assembly Dexterity', summary: 'RoboSkin robots for battery assembly.', results: [{metric: '85%', label: 'Less damage'}, {metric: '3x', label: 'Throughput'}, {metric: '99.7%', label: 'Accuracy'}], testimonial: 'Production game-changer.', author: 'Engineering Lead' },
    { company: 'NASA JPL', logo: 'N', industry: 'Space', title: 'Mars Sample Handling', summary: 'Tactile intelligence for Mars missions.', results: [{metric: '24/7', label: 'Autonomous'}, {metric: '100%', label: 'Success'}, {metric: '0', label: 'Failures'}], testimonial: 'Only viable choice.', author: 'Mission Engineer' },
  ];

  return (
    <>
      <section className="bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white py-24">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">Real-World <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">Impact</span></h1>
          <p className="text-xl text-blue-100 max-w-4xl mx-auto">Discover how leading organizations transform with RoboSkin.</p>
        </div>
      </section>
      <section className="py-16 bg-slate-800 border-y border-cyan-500/20">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div><div className="text-4xl font-bold text-cyan-400">500+</div><div className="text-gray-300">Deployments</div></div>
          <div><div className="text-4xl font-bold text-purple-400">98%</div><div className="text-gray-300">Retention</div></div>
          <div><div className="text-4xl font-bold text-blue-400">40+</div><div className="text-gray-300">Countries</div></div>
          <div><div className="text-4xl font-bold text-pink-400">$2B+</div><div className="text-gray-300">Value</div></div>
        </div>
      </section>
      <section className="py-24 bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 space-y-20">
          {cases.map((c) => (
            <div key={c.company} className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center text-white text-2xl font-bold">{c.logo}</div>
                  <div><h3 className="text-2xl font-bold text-white">{c.company}</h3><span className="text-cyan-400">{c.industry}</span></div>
                </div>
                <h2 className="text-3xl font-bold text-white mb-4">{c.title}</h2>
                <p className="text-gray-300 mb-6">{c.summary}</p>
                <div className="grid grid-cols-3 gap-4 mb-6">
                  {c.results.map((r, i) => <div key={i} className="bg-slate-700/50 rounded-lg p-4 text-center"><div className="text-2xl font-bold text-cyan-400">{r.metric}</div><div className="text-xs text-gray-400">{r.label}</div></div>)}
                </div>
                <div className="bg-cyan-500/10 rounded-xl p-6 border border-cyan-500/20">
                  <p className="text-gray-300 italic mb-3">&ldquo;{c.testimonial}&rdquo;</p>
                  <p className="text-sm text-cyan-400">&mdash; {c.author}</p>
                </div>
              </div>
              <div className="aspect-square bg-slate-800 rounded-2xl flex items-center justify-center border border-cyan-500/20">
                <svg className="w-48 h-48 text-cyan-400/30" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
              </div>
            </div>
          ))}
        </div>
      </section>
      <section className="py-24 text-center">
        <Link href="/contact" className="inline-flex items-center px-10 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold rounded-lg">Schedule Consultation</Link>
      </section>
    </>
  );
}
