import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Our Team",
  description: "Meet the world-class researchers, engineers, and visionaries behind RoboSkin.ai's breakthrough tactile sensing technology.",
  keywords: ["team", "researchers", "scientists", "engineering team", "leadership"],
};

export default function TeamPage() {
  const leadership = [
    {
      name: "Dr. Sarah Chen, PhD",
      role: "Co-Founder & CEO",
      image: "/team/sarah-chen.jpg",
      bio: "Former MIT CSAIL researcher with 15+ years in tactile sensing. Pioneer in graphene-based sensor technology.",
      publications: "50+ peer-reviewed papers",
      awards: "NSF CAREER Award, IEEE Fellow"
    },
    {
      name: "Prof. Michael Rodriguez, PhD",
      role: "Co-Founder & CTO",
      image: "/team/michael-rodriguez.jpg",
      bio: "Stanford Professor Emeritus, Neuromorphic Computing. Architect of our spiking neural network processing systems.",
      publications: "80+ peer-reviewed papers",
      awards: "Turing Award Nominee, NAS Member"
    },
    {
      name: "Dr. Emily Watson, PhD",
      role: "VP of Materials Science",
      image: "/team/emily-watson.jpg",
      bio: "Former Dow Chemical Lead Scientist. Expert in self-healing polymers and advanced composites.",
      publications: "40+ patents, 30+ papers",
      awards: "ACS National Award"
    },
    {
      name: "Dr. James Liu, PhD",
      role: "VP of Engineering",
      image: "/team/james-liu.jpg",
      bio: "Ex-NASA JPL engineer. Led neural interface projects for next-generation prosthetics.",
      publications: "35+ peer-reviewed papers",
      awards: "NASA Exceptional Achievement Medal"
    }
  ];

  const departments = [
    {
      name: "Research & Development",
      head: "Dr. Sarah Chen",
      size: "45 researchers",
      focus: "Core sensor technology, AI algorithms"
    },
    {
      name: "Materials Science",
      head: "Dr. Emily Watson",
      size: "25 scientists",
      focus: "Polymers, nanomaterials, self-healing"
    },
    {
      name: "Engineering",
      head: "Dr. James Liu",
      size: "30 engineers",
      focus: "Systems integration, manufacturing"
    },
    {
      name: "Clinical Affairs",
      head: "Dr. Maria Santos",
      size: "15 specialists",
      focus: "Medical device trials, regulatory"
    }
  ];

  const advisors = [
    { name: "Dr. Robert Langer", title: "MIT Institute Professor", affiliation: "MIT" },
    { name: "Dr. Fei-Fei Li", title: "Professor of CS", affiliation: "Stanford" },
    { name: "Dr. Yann LeCun", title: "Chief AI Scientist", affiliation: "Meta AI" }
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
              <pattern id="teamgrid" width="10" height="10" patternUnits="userSpaceOnUse">
                <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeWidth="0.3"/>
              </pattern>
            </defs>
            <rect width="100" height="100" fill="url(#teamgrid)"/>
          </svg>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 relative">
          <div className="text-center">
            <div className="inline-flex items-center px-4 py-2 bg-cyan-500/10 backdrop-blur-sm rounded-full text-sm font-semibold mb-8 border border-cyan-400/30">
              <svg className="w-4 h-4 mr-2 text-cyan-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"/>
              </svg>
              World-Class Team
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Pioneering the Future of <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">Tactile Robotics</span>
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Our team of world-class researchers, engineers, and visionaries is redefining what robots can feel
            </p>
          </div>
        </div>
      </section>

      {/* Leadership Section */}
      <section className="py-24 bg-gradient-to-b from-slate-800 to-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Executive Leadership</h2>
            <p className="text-gray-400 text-lg">Visionaries driving innovation in tactile robotics</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {leadership.map((member, index) => (
              <div key={index} className="group bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-cyan-500/20 hover:border-cyan-400/40 transition-all">
                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0 w-32 h-32 bg-gradient-to-br from-cyan-500 to-purple-500 rounded-2xl flex items-center justify-center text-white text-4xl font-bold shadow-lg">
                    {member.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div className="flex-grow">
                    <h3 className="text-2xl font-bold text-white mb-1 group-hover:text-cyan-300 transition-colors">{member.name}</h3>
                    <p className="text-cyan-400 font-semibold mb-3">{member.role}</p>
                    <p className="text-gray-300 text-sm leading-relaxed mb-4">{member.bio}</p>
                    <div className="flex gap-4 text-xs">
                      <div className="bg-slate-700/50 px-3 py-1 rounded-full">
                        <span className="text-gray-400">Publications:</span>
                        <span className="text-white ml-1">{member.publications}</span>
                      </div>
                      <div className="bg-slate-700/50 px-3 py-1 rounded-full">
                        <span className="text-gray-400">Awards:</span>
                        <span className="text-purple-400 ml-1">{member.awards}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Departments Section */}
      <section className="py-24 bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Our Departments</h2>
            <p className="text-gray-400 text-lg">115+ experts pushing the boundaries</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {departments.map((dept, index) => (
              <div key={index} className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-6 border border-gray-700 hover:border-cyan-500/50 transition-all">
                <div className="w-12 h-12 bg-cyan-500/10 rounded-xl flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{dept.name}</h3>
                <p className="text-cyan-400 text-sm mb-3">{dept.head}</p>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-400">{dept.size}</span>
                  <span className="text-purple-400">{dept.focus}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Advisors Section */}
      <section className="py-24 bg-gradient-to-b from-slate-900 to-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Scientific Advisors</h2>
            <p className="text-gray-400 text-lg">Guided by world-renowned experts</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {advisors.map((advisor, index) => (
              <div key={index} className="bg-slate-800/30 backdrop-blur-sm rounded-xl p-8 border border-purple-500/20 text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-2xl font-bold">
                  {advisor.name.split(' ').map(n => n[0]).join('')}
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{advisor.name}</h3>
                <p className="text-purple-400 text-sm mb-1">{advisor.title}</p>
                <p className="text-gray-400 text-sm">{advisor.affiliation}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <h2 className="text-4xl font-bold mb-6">Join Our Team</h2>
          <p className="text-xl text-blue-100 mb-10 max-w-3xl mx-auto">
            Be part of the team revolutionizing robotic tactile perception
          </p>
          <a
            href="/careers"
            className="inline-flex items-center justify-center px-10 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold rounded-lg hover:from-cyan-400 hover:to-blue-500 transition-all transform hover:scale-105 shadow-lg"
          >
            View Open Positions
            <svg className="w-5 h-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </section>
    </>
  );
}
