export default function ApplicationsPage() {
  const applications = [
    {
      title: "Healthcare Robotics",
      description: "Revolutionizing patient care with sensitive surgical assistants and rehabilitation robots.",
      useCases: [
        "Surgical assistants with real-time tactile feedback",
        "Rehabilitation robotics for patient recovery",
        "Elderly care assistants with gentle grip control"
      ]
    },
    {
      title: "Industrial Automation",
      description: "Enhancing manufacturing efficiency and safety with intelligent tactile robots.",
      useCases: [
        "Assembly line automation with delicate handling",
        "Collaborative robots (cobots) for safe human interaction",
        "Quality control through tactile inspection"
      ]
    },
    {
      title: "Consumer Robotics",
      description: "Bringing intelligent, sensitive robots into everyday life.",
      useCases: [
        "Home assistance robots",
        "Educational robotics for STEM learning",
        "Interactive companions and entertainment"
      ]
    }
  ];

  return (
    <>
      <section className="bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Applications</h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Transforming industries with intelligent tactile robotics
            </p>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {applications.map((app, index) => (
            <div key={index} className="mb-16 last:mb-0">
              <h2 className="text-3xl font-bold text-gray-900 mb-3">{app.title}</h2>
              <p className="text-gray-600 mb-6">{app.description}</p>
              <ul className="space-y-2">
                {app.useCases.map((useCase, idx) => (
                  <li key={idx} className="flex items-start">
                    <svg className="w-5 h-5 text-blue-600 mr-3 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-gray-700">{useCase}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-gray-50 py-16 border-t border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Interested in a Custom Solution?</h2>
          <a
            href="/contact"
            className="inline-flex items-center justify-center px-8 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
          >
            Contact Our Team
          </a>
        </div>
      </section>
    </>
  );
}
