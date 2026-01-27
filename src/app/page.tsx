import Link from 'next/link';

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white py-24">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
              RoboSkin.ai
            </span>
          </h1>
          <p className="text-xl text-blue-100 max-w-4xl mx-auto mb-12">
            Revolutionary artificial skin technology for next-generation robotics
          </p>
          <div className="flex gap-4 justify-center">
            <Link
              href="/contact"
              className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold rounded-lg hover:from-cyan-400 hover:to-blue-500"
            >
              Contact Us
            </Link>
            <Link
              href="/technology"
              className="px-8 py-4 border-2 border-purple-500 text-white font-bold rounded-lg hover:bg-purple-500/10"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-slate-800">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-white text-center mb-12">
            Our Technology
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-slate-900 p-8 rounded-xl border border-cyan-500/20">
              <h3 className="text-2xl font-bold text-cyan-400 mb-4">Nano-Tactile Sensors</h3>
              <p className="text-gray-300">
                Graphene-based pressure transducers with 0.01N sensitivity
              </p>
            </div>
            <div className="bg-slate-900 p-8 rounded-xl border border-purple-500/20">
              <h3 className="text-2xl font-bold text-purple-400 mb-4">Neuromorphic Processing</h3>
              <p className="text-gray-300">
                Spiking neural networks for real-time tactile perception
              </p>
            </div>
            <div className="bg-slate-900 p-8 rounded-xl border border-blue-500/20">
              <h3 className="text-2xl font-bold text-blue-400 mb-4">Self-Healing Materials</h3>
              <p className="text-gray-300">
                Autonomous repair within 24 hours for extended lifespan
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
