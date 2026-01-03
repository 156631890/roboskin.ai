export default function TechnologyPage() {
  const technologies = [
    {
      title: "Nano-Tactile Sensors",
      description: "Our proprietary nano-tactile sensor arrays employ graphene-based pressure transducers capable of detecting forces as low as 0.1 Newton with millimeter-scale spatial resolution. Each sensor node operates independently, creating a dense feedback matrix that mimics human mechanoreceptors.",
      features: [
        "Pressure sensitivity: 0.1N - 50N range",
        "Response time: <1ms latency",
        "10,000+ sensor nodes per square meter",
        "Self-calibrating algorithm",
        "Operating temperature: -40°C to 120°C"
      ]
    },
    {
      title: "Artificial Neural Integration",
      description: "At the core of RoboSkin lies our neural processing engine that converts raw tactile data into meaningful perceptual information. Using spiking neural networks trained on millions of touch interactions, our system can identify texture, temperature, and slip conditions in real-time.",
      features: [
        "Edge-based processing with <5ms inference",
        "Convolutional spike neural networks",
        "Transfer learning from human tactile data",
        "Adaptive plasticity for new surfaces",
        "Integration with major robot operating systems"
      ]
    },
    {
      title: "Self-Healing Polymer Matrix",
      description: "RoboSkin's outer layer consists of a revolutionary self-healing polymer that can repair cuts and abrasions autonomously within 24 hours at room temperature. Inspired by biological skin, this material maintains tactile sensitivity while providing unmatched durability.",
      features: [
        "Autonomous repair of cuts up to 3mm deep",
        "Stretchability: 300% elongation",
        "Chemical resistance to oils and solvents",
        "UV-stable for outdoor applications",
        "Lifespan: 5+ years with regular use"
      ]
    }
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Technology</h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Discover the three breakthrough innovations powering RoboSkin.ai
            </p>
          </div>
        </div>
      </section>

      {/* Technologies */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {technologies.map((tech, index) => (
            <div
              key={index}
              className={`flex flex-col ${
                index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
              } items-center gap-12 mb-16 last:mb-0`}
            >
              {/* Image Placeholder */}
              <div className="w-full md:w-1/2">
                <div className="h-80 rounded-lg bg-gray-100 border border-gray-200 flex items-center justify-center">
                  <svg className="w-20 h-20 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
              </div>

              {/* Content */}
              <div className="w-full md:w-1/2">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">{tech.title}</h2>
                <p className="text-gray-600 mb-6">
                  {tech.description}
                </p>

                <h3 className="text-lg font-semibold text-gray-900 mb-3">Key Specifications</h3>
                <ul className="space-y-2">
                  {tech.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start">
                      <svg className="w-5 h-5 text-blue-600 mr-3 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gray-50 py-16 border-t border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Ready to Learn More?</h2>
          <p className="text-gray-600 mb-6">
            Explore how our technology is being applied across industries or dive into our latest research.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/applications"
              className="inline-flex items-center justify-center px-8 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
            >
              View Applications
            </a>
            <a
              href="/research"
              className="inline-flex items-center justify-center px-8 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg bg-white hover:bg-gray-50 transition-colors"
            >
              Read Research
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
