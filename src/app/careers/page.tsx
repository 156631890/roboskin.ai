import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Careers",
  description: "Join RoboSkin.ai and work on breakthrough tactile robotics technology. Open positions in engineering, research, and operations.",
  keywords: ["careers", "jobs", "open positions", "hiring", "work at roboskin"],
};

export default function CareersPage() {
  const benefits = [
    { icon: "💰", title: "Competitive Salary", desc: "Top-tier compensation + equity" },
    { icon: "🏥", title: "Health Benefits", desc: "Premium medical, dental, vision" },
    { icon: "🌴", title: "Unlimited PTO", desc: "Flexible time-off policy" },
    { icon: "🏠", title: "Remote First", desc: "Work from anywhere" },
    { icon: "📚", title: "Learning Budget", desc: "$5,000 annual education allowance" },
    { icon: "🤖", title: "Cutting-Edge Tech", desc: "Latest in robotics, AI, materials" }
  ];

  const openings = [
    {
      title: "Senior Robotics Engineer",
      department: "Engineering",
      location: "Remote / San Francisco, CA",
      type: "Full-time",
      experience: "5+ years",
      description: "Lead development of next-generation tactile sensing systems for robotic applications.",
      requirements: [
        "PhD or MS in Robotics, CS, or related field",
        "Experience with sensor integration and signal processing",
        "Proficiency in C++, Python, ROS/ROS2",
        "Published research in robotics or haptics"
      ]
    },
    {
      title: "Materials Scientist",
      department: "Materials Science",
      location: "Austin, TX",
      type: "Full-time",
      experience: "3+ years",
      description: "Develop novel self-healing polymer composites and graphene-based sensor materials.",
      requirements: [
        "PhD in Materials Science, Chemistry, or Chemical Engineering",
        "Experience with polymer synthesis and characterization",
        "Knowledge of nanomaterials and composites",
        "Background in flexible electronics preferred"
      ]
    },
    {
      title: "Machine Learning Engineer",
      department: "AI Research",
      location: "Remote / Cambridge, MA",
      type: "Full-time",
      experience: "4+ years",
      description: "Build self-supervised learning systems for tactile perception and robotic manipulation.",
      requirements: [
        "MS or PhD in Computer Science, ML, or related",
        "Experience with deep learning frameworks (PyTorch, TensorFlow)",
        "Publications at NeurIPS, ICML, ICLR, or similar",
        "Background in spiking neural networks or neuromorphic computing"
      ]
    },
    {
      title: "Clinical Research Coordinator",
      department: "Clinical Affairs",
      location: "Boston, MA",
      type: "Full-time",
      experience: "2+ years",
      description: "Manage clinical trials for FDA approval of neural interface prosthetic systems.",
      requirements: [
        "BSN or BA in life sciences or related field",
        "Experience with medical device clinical trials",
        "Knowledge of FDA regulations and ISO standards",
        "CCRC certification preferred"
      ]
    },
    {
      title: "Technical Product Manager",
      department: "Product",
      location: "San Francisco, CA",
      type: "Full-time",
      experience: "5+ years",
      description: "Drive product strategy and roadmap for robotic skin platforms across multiple industries.",
      requirements: [
        "MBA or MS in Engineering + product management experience",
        "Background in robotics, medical devices, or deep tech",
        "Experience with B2B enterprise sales and customer discovery",
        "Technical depth to collaborate with R&D teams"
      ]
    },
    {
      title: "Manufacturing Engineer",
      department: "Operations",
      location: "Austin, TX",
      type: "Full-time",
      experience: "3+ years",
      description: "Scale up roll-to-roll manufacturing processes for high-volume sensor production.",
      requirements: [
        "BS in Mechanical, Chemical, or Industrial Engineering",
        "Experience with roll-to-roll, printing, or coating processes",
        "Knowledge of process optimization and quality control",
        "Background in cleanroom or semiconductor manufacturing"
      ]
    }
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 relative">
          <div className="text-center">
            <div className="inline-flex items-center px-4 py-2 bg-cyan-500/10 backdrop-blur-sm rounded-full text-sm font-semibold mb-8 border border-cyan-400/30">
              <svg className="w-4 h-4 mr-2 text-cyan-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
              </svg>
              We're Hiring
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Build the Future of <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">Tactile Robotics</span>
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-8">
              Join our world-class team pushing the boundaries of what robots can feel. Work on breakthrough technology published in Nature, Science, and IEEE.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <div className="bg-slate-800/50 px-4 py-2 rounded-full border border-cyan-500/30">
                <span className="text-cyan-400 font-bold">115+</span>
                <span className="text-gray-300 ml-2">Team Members</span>
              </div>
              <div className="bg-slate-800/50 px-4 py-2 rounded-full border border-purple-500/30">
                <span className="text-purple-400 font-bold">$12M</span>
                <span className="text-gray-300 ml-2">NASA Funding</span>
              </div>
              <div className="bg-slate-800/50 px-4 py-2 rounded-full border border-pink-500/30">
                <span className="text-pink-400 font-bold">8+</span>
                <span className="text-gray-300 ml-2">Peer-Reviewed Papers</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24 bg-gradient-to-b from-slate-800 to-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Why Work With Us</h2>
            <p className="text-gray-400 text-lg">Competitive benefits and exceptional growth opportunities</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700 hover:border-cyan-500/50 transition-all">
                <div className="text-4xl mb-4">{benefit.icon}</div>
                <h3 className="text-xl font-bold text-white mb-2">{benefit.title}</h3>
                <p className="text-gray-400">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section className="py-24 bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Open Positions</h2>
            <p className="text-gray-400 text-lg">Find your perfect role and join our mission</p>
          </div>

          <div className="space-y-6">
            {openings.map((job, index) => (
              <div key={index} className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-8 border border-gray-700 hover:border-cyan-500/50 transition-all group">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
                  <div className="flex-grow">
                    <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors">{job.title}</h3>
                    <div className="flex flex-wrap gap-3 text-sm">
                      <span className="bg-cyan-500/10 text-cyan-400 px-3 py-1 rounded-full border border-cyan-500/30">{job.department}</span>
                      <span className="bg-purple-500/10 text-purple-400 px-3 py-1 rounded-full border border-purple-500/30">{job.location}</span>
                      <span className="bg-pink-500/10 text-pink-400 px-3 py-1 rounded-full border border-pink-500/30">{job.type}</span>
                      <span className="bg-blue-500/10 text-blue-400 px-3 py-1 rounded-full border border-blue-500/30">{job.experience}</span>
                    </div>
                  </div>
                  <a
                    href={`mailto:careers@roboskin.ai?subject=Application: ${encodeURIComponent(job.title)}`}
                    className="flex-shrink-0 inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-lg hover:from-cyan-400 hover:to-blue-500 transition-all"
                  >
                    Apply Now
                    <svg className="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </a>
                </div>

                <div className="border-t border-gray-700 pt-4">
                  <p className="text-gray-300 mb-4">{job.description}</p>
                  <div className="bg-slate-800/50 rounded-lg p-4">
                    <h4 className="text-sm font-bold text-cyan-400 mb-2">Requirements:</h4>
                    <ul className="space-y-1">
                      {job.requirements.map((req, i) => (
                        <li key={i} className="text-sm text-gray-400 flex items-start">
                          <svg className="w-4 h-4 text-cyan-400 mr-2 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          {req}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Culture Section */}
      <section className="py-24 bg-gradient-to-b from-slate-900 to-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Our Culture</h2>
            <p className="text-gray-400 text-lg">Innovation, collaboration, and impact</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-slate-800/30 backdrop-blur-sm rounded-xl p-8 border border-gray-700">
              <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-xl flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Innovation First</h3>
              <p className="text-gray-400">Push boundaries in science and engineering. Published in Nature, Science, and IEEE journals.</p>
            </div>

            <div className="bg-slate-800/30 backdrop-blur-sm rounded-xl p-8 border border-gray-700">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Diverse & Inclusive</h3>
              <p className="text-gray-400">50% of leadership are women or underrepresented minorities. We value all perspectives.</p>
            </div>

            <div className="bg-slate-800/30 backdrop-blur-sm rounded-xl p-8 border border-gray-700">
              <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-orange-500 rounded-xl flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Move Fast</h3>
              <p className="text-gray-400">From concept to publication in 6 months. Agile development meets rigorous science.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <h2 className="text-4xl font-bold mb-6">Ready to Make History?</h2>
          <p className="text-xl text-blue-100 mb-10 max-w-3xl mx-auto">
            Don't see a role that fits? We're always looking for exceptional talent. Reach out!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:careers@roboskin.ai"
              className="inline-flex items-center justify-center px-10 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold rounded-lg hover:from-cyan-400 hover:to-blue-500 transition-all transform hover:scale-105 shadow-lg"
            >
              Send General Application
              <svg className="w-5 h-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
