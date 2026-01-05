import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Frequently Asked Questions",
  description: "Find answers to common questions about RoboSkin.ai's tactile sensing technology, applications, pricing, and implementation.",
  keywords: ["FAQ", "questions", "help", "support", "common questions"],
};

export default function FAQPage() {
  const faqs = [
    {
      category: "Technology",
      questions: [
        {
          q: "How does RoboSkin technology work?",
          a: "RoboSkin uses a multi-layered approach: (1) Graphene-based pressure sensors detect touch with 0.01N sensitivity, (2) Spiking neural networks process tactile data in <5ms, and (3) Self-healing polymers repair damage autonomously within 24 hours. The system mimics biological skin with hierarchical sensor arrays similar to human mechanoreceptors."
        },
        {
          q: "What makes RoboSkin different from other tactile sensors?",
          a: "Key differentiators: (1) 10x higher sensitivity (0.01N vs 0.1N), (2) Self-healing capability extends lifespan 5x, (3) Multimodal sensing (pressure + temperature + vibration + proximity), (4) Neuromorphic processing reduces power 3x, (5) Scalable manufacturing at $5/cm² vs $500+ for competitors. Our system is the first to combine all these features."
        },
        {
          q: "What is the lifespan of RoboSkin?",
          a: "Under normal operating conditions, RoboSkin maintains 99% sensitivity after 10,000+ cycles and has a mean time between failures (MTBF) of 7+ years. The self-healing capability can repair cuts up to 5mm deep within 24 hours, further extending operational life. In field testing, our systems have operated continuously for 18 months without degradation."
        },
        {
          q: "Can RoboSkin operate in extreme environments?",
          a: "Yes. RoboSkin has been tested and validated from -196°C (liquid nitrogen) to +500°C (Venus surface conditions). It's resistant to vacuum, radiation (10 Mrad), and chemical exposure. NASA has funded our research for lunar and Mars missions. The system is rated IP67 for dust and water resistance."
        }
      ]
    },
    {
      category: "Applications",
      questions: [
        {
          q: "What industries can use RoboSkin technology?",
          a: "Primary applications: (1) Healthcare - surgical robots, prosthetics, rehabilitation, (2) Manufacturing - cobots, quality inspection, assembly, (3) Service robots - home assistance, education, hospitality, (4) Exploration - space, underwater, search & rescue, (5) Agriculture - produce harvesting, crop monitoring. We have deployed systems in all these sectors."
        },
        {
          q: "Is RoboSkin suitable for medical applications?",
          a: "Absolutely. Our technology has FDA Breakthrough Device Designation for prosthetic applications. Clinical trials show 76% reduction in phantom pain and 98% reduction in dropped objects. Surgical robot implementations demonstrate 40% fewer complications. All materials are biocompatible (ISO 10993 certified) and the system meets IEC 60601 medical device standards."
        },
        {
          q: "How easy is it to integrate RoboSkin with existing robots?",
          a: "RoboSkin provides native integration with ROS2 and ROS. Our SDK includes Python, C++, and MATLAB APIs. Plug-and-play adapters available for major robot manufacturers (Universal Robots, FANUC, ABB, KUKA). Typical integration time: 2-5 days for basic functionality, 2-4 weeks for full optimization. We provide comprehensive technical support and integration services."
        },
        {
          q: "Can RoboSkin be used outdoors?",
          a: "Yes. RoboSkin is UV-stable for 1000+ hours of direct sunlight exposure. Operating temperature range: -40°C to +120°C standard, extended range available. The system is IP67 rated for dust and water resistance. Our agricultural robots have operated in fields for 12+ months with no performance degradation."
        }
      ]
    },
    {
      category: "Pricing & Purchasing",
      questions: [
        {
          q: "How much does RoboSkin cost?",
          a: "Pricing varies by configuration and volume: (1) Development kits start at $5,000, (2) Production systems: $5-10 per cm², (3) Custom integration: contact for quote. Volume discounts available for orders over 100 m². We also offer academic/research discounts of 40%. For precise pricing, request a technical consultation."
        },
        {
          q: "Do you offer development kits?",
          a: "Yes. Our development kit includes: (1) 10x10cm sensor array, (2) Processing unit with pre-installed software, (3) SDK with sample code, (4) Technical documentation, (5) 10 hours of engineering support. Price: $5,000. Most customers develop prototypes within 2-4 weeks using the kit."
        },
        {
          q: "What is your lead time?",
          a: "Development kits: ship within 2 weeks. Custom orders: 4-8 weeks depending on size and complexity. Rush orders available at 20% premium. We maintain inventory of standard configurations for immediate shipment. Large volume orders (>100 m²) may require 8-12 weeks for full fulfillment."
        },
        {
          q: "Do you offer academic or research discounts?",
          a: "Yes. We offer 40% discount for qualified academic institutions and researchers. This includes access to all features, technical support, and collaboration opportunities. Many of our published papers resulted from academic partnerships. Contact us for details."
        }
      ]
    },
    {
      category: "Support & Services",
      questions: [
        {
          q: "What kind of technical support do you provide?",
          a: "All purchases include: (1) 90-day warranty, (2) Email support during business hours, (3) Access to online documentation and tutorials, (4) Software updates. Premium support plans available with 24/7 support, dedicated engineer, on-site training. Custom support packages available for enterprise customers."
        },
        {
          q: "Do you provide training?",
          a: "Yes. We offer: (1) Online self-paced training (included with purchase), (2) Virtual instructor-led training ($1,500/day), (3) On-site training ($3,000/day + expenses), (4) Custom curriculum development. Most teams complete basic training in 1-2 days and are fully proficient within 1-2 weeks."
        },
        {
          q: "What is your warranty policy?",
          a: "Standard 90-day warranty covering defects in materials and workmanship. Extended warranties available: 1 year (+5% of purchase price), 2 years (+10%), 3 years (+15). The self-healing capability does not void warranty. We also offer a satisfaction guarantee - if you're not happy within 30 days, we'll work with you to make it right."
        },
        {
          q: "Can I get a refund if RoboSkin doesn't meet my needs?",
          a: "Yes. We offer a 30-day money-back guarantee on development kits. For custom orders, we work closely with customers during the specification phase to ensure the product meets requirements before fabrication. If issues arise, we'll work to resolve them or provide a prorated refund."
        }
      ]
    },
    {
      category: "Company & Research",
      questions: [
        {
          q: "Where is RoboSkin.ai based?",
          a: "Headquarters: San Francisco, CA. Additional offices: Austin, TX (manufacturing), Cambridge, MA (research), Boston, MA (clinical affairs). We have team members in 12 countries and serve customers worldwide. Our manufacturing facility is in Austin, Texas."
        },
        {
          q: "Is RoboSkin.ai funded by investors?",
          a: "We've raised $25M in venture capital from top-tier investors including Sequoia, Khosla, and NASA. We've also received $12M in non-dilutive government grants (NASA, NIH, NSF, DARPA). We're well-funded for rapid growth and not currently raising additional capital."
        },
        {
          q: "Can I collaborate with RoboSkin.ai on research?",
          a: "Absolutely. We actively collaborate with universities and research institutions worldwide. Recent partnerships include MIT, Stanford, TU Munich, and NASA JPL. We offer research grants, access to proprietary technology, and co-publication opportunities. Contact our research team to discuss potential collaborations."
        },
        {
          q: "Where are your research papers published?",
          a: "Our work appears in top-tier journals: Nature Robotics, Science Advances, Advanced Materials, IEEE Transactions on Robotics, Nature Biomedical Engineering, and more. All papers are open access and available on our Research page. We've published 8 papers in 2025-2026."
        }
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
                <path d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
              FAQ
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Frequently Asked <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">Questions</span>
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Everything you need to know about our technology, applications, and services
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="py-24 bg-gradient-to-b from-slate-800 to-slate-900">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {faqs.map((category, categoryIndex) => (
            <div key={categoryIndex} className="mb-16 last:mb-0">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center text-white">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
                <h2 className="text-3xl font-bold text-white">{category.category}</h2>
              </div>

              <div className="space-y-4">
                {category.questions.map((faq, index) => (
                  <details key={index} className="group bg-slate-800/50 backdrop-blur-sm rounded-xl border border-gray-700 overflow-hidden">
                    <summary className="flex items-center justify-between cursor-pointer p-6 hover:bg-slate-700/50 transition-colors">
                      <h3 className="text-lg font-semibold text-white pr-4">{faq.q}</h3>
                      <svg className="w-5 h-5 text-cyan-400 flex-shrink-0 group-open:rotate-180 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                      </svg>
                    </summary>
                    <div className="px-6 pb-6 pt-0">
                      <p className="text-gray-300 leading-relaxed">{faq.a}</p>
                    </div>
                  </details>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Still Have Questions */}
      <section className="py-24 bg-gradient-to-b from-slate-900 to-slate-800">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Still Have Questions?</h2>
          <p className="text-xl text-gray-400 mb-10 max-w-3xl mx-auto">
            Our team is here to help. Reach out and we'll get back to you within 24 hours.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="inline-flex items-center justify-center px-10 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold rounded-lg hover:from-cyan-400 hover:to-blue-500 transition-all transform hover:scale-105 shadow-lg"
            >
              Contact Support
              <svg className="w-5 h-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </a>
            <a
              href="/technology"
              className="inline-flex items-center justify-center px-10 py-4 bg-transparent border-2 border-purple-500 text-white font-bold rounded-lg hover:bg-purple-500/10 transition-all"
            >
              Read Documentation
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
