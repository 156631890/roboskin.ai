import type { Metadata } from "next";
import Link from 'next/link';

export const metadata: Metadata = {
  title: "Products",
  description: "Explore RoboSkin.ai's complete product lineup: sensor arrays, processing units, development kits, and enterprise solutions for tactile robotics.",
  keywords: ["products", "tactile sensors", "robotic skin", "development kits", "specifications"],
};

export default function ProductsPage() {
  const productLines = [
    {
      category: "Sensor Arrays",
      description: "High-density tactile sensor arrays for various form factors and applications",
      products: [
        {
          name: "RS-1000 Tactile Matrix",
          subtitle: "Standard Duty Sensor Array",
          specs: {
            "Sensor Density": "100 taxels/cm²",
            "Force Range": "0.01N - 50N",
            "Response Time": "<1ms",
            "Interface": "I2C / SPI / USB",
            "Dimensions": "50mm × 50mm × 2mm",
            "Operating Temp": "-20°C to 80°C",
          },
          features: [
            "Self-calibrating with auto-zero",
            "IP67 rated for dust/water protection",
            "Flexible substrate for curved surfaces",
            "Plug-and-play with ROS/ROS2",
            "10,000+ hour lifespan",
          ],
          applications: ["Robotic grippers", "Prosthetic hands", "Manipulator arms"],
          price: "Contact for Pricing",
          datasheet: "/datasheets/RS-1000-datasheet.pdf",
          image: "sensor-matrix"
        },
        {
          name: "RS-2000 Pro Array",
          subtitle: "High-Performance Industrial Grade",
          specs: {
            "Sensor Density": "256 taxels/cm²",
            "Force Range": "0.005N - 100N",
            "Response Time": "<0.5ms",
            "Interface": "Ethernet / CAN FD",
            "Dimensions": "100mm × 100mm × 1.5mm",
            "Operating Temp": "-40°C to 120°C",
          },
          features: [
            "Enhanced sensitivity for micro-tasks",
            "Extended temperature range",
            "Self-healing polymer matrix",
            "Industrial vibration resistance",
            "50,000+ hour lifespan",
          ],
          applications: ["Surgical robots", "Precision assembly", "Quality inspection"],
          price: "Contact for Pricing",
          datasheet: "/datasheets/RS-2000-datasheet.pdf",
          image: "sensor-pro"
        },
        {
          name: "RS-500 Flex Patch",
          subtitle: "Ultra-Thin Flexible Sensor",
          specs: {
            "Sensor Density": "64 taxels/cm²",
            "Force Range": "0.02N - 20N",
            "Response Time": "<2ms",
            "Interface": "Flexible printed circuit",
            "Dimensions": "Custom sizes available",
            "Operating Temp": "-10°C to 60°C",
          },
          features: [
            "Ultra-thin profile (0.5mm)",
            "Highly stretchable (300% elongation)",
            "Conformal to complex geometries",
            "Low power consumption",
            "Disposable or reusable options",
          ],
          applications: ["Prosthetics", "Wearable robots", "Soft robotics"],
          price: "Contact for Pricing",
          datasheet: "/datasheets/RS-500-datasheet.pdf",
          image: "sensor-flex"
        },
      ]
    },
    {
      category: "Processing Units",
      description: "Neuromorphic processing engines for real-time tactile data interpretation",
      products: [
        {
          name: "RPU-100 Edge Processor",
          subtitle: "Compact Tactile Processing Unit",
          specs: {
            "Processing": "SNN + CNN hybrid",
            "Inference Speed": "<5ms",
            "Sensor Inputs": "Up to 16 arrays",
            "Connectivity": "USB-C, Ethernet, WiFi",
            "Power": "5W typical",
            "Dimensions": "60mm × 60mm × 15mm",
          },
          features: [
            "Real-time texture classification",
            "Slip prediction algorithms",
            "Object recognition models",
            "Pre-trained on 10,000+ objects",
            "Firmware over-the-air updates",
          ],
          applications: ["Edge computing", "Mobile robots", "Standalone systems"],
          price: "$899 MSRP",
          datasheet: "/datasheets/RPU-100-datasheet.pdf",
          image: "rpu-100"
        },
        {
          name: "RPU-500 Enterprise",
          subtitle: "High-Performance Processing Server",
          specs: {
            "Processing": "Multi-SNN cluster",
            "Inference Speed": "<1ms",
            "Sensor Inputs": "Up to 256 arrays",
            "Connectivity": "10GbE, CAN, Modbus",
            "Power": "45W typical",
            "Dimensions": "1U rack mount",
          },
          features: [
            "Multi-robot coordination",
            "Cloud connectivity for analytics",
            "Custom model training pipeline",
            "RESTful API for integration",
            "Enterprise security features",
          ],
          applications: ["Factory automation", "Robot fleets", "Cloud robotics"],
          price: "Contact for Pricing",
          datasheet: "/datasheets/RPU-500-datasheet.pdf",
          image: "rpu-500"
        },
      ]
    },
    {
      category: "Development Kits",
      description: "Complete starter kits for rapid prototyping and development",
      products: [
        {
          name: "RSK-100 Starter Kit",
          subtitle: "Entry-Level Development Platform",
          specs: {
            "Includes": "1x RS-1000 array, RPU-100",
            "Software": "SDK, ROS/ROS2 packages, demos",
            "Documentation": "Getting started guide, tutorials",
            "Support": "Community forum access",
          },
          features: [
            "Ready to use in minutes",
            "Python and C++ SDKs",
            "Jupyter notebook examples",
            "Simulation environment included",
            "30-day trial of cloud platform",
          ],
          applications: ["Research", "Education", "Prototyping"],
          price: "$1,499 MSRP",
          datasheet: "/datasheets/RSK-100-datasheet.pdf",
          image: "starter-kit"
        },
        {
          name: "RSK-500 Pro Kit",
          subtitle: "Professional Development Suite",
          specs: {
            "Includes": "4x RS-2000 arrays, RPU-500",
            "Software": "Full SDK, source code access",
            "Documentation": "Complete API reference",
            "Support": "Priority support (1 year)",
          },
          features: [
            "Everything in Starter Kit plus",
            "Source code licensing",
            "Onboarding session",
            "Custom model training",
            "NDA-covered collaboration",
          ],
          applications: ["Commercial development", "Product integration", "Advanced research"],
          price: "$9,999 MSRP",
          datasheet: "/datasheets/RSK-500-datasheet.pdf",
          image: "pro-kit"
        },
      ]
    },
    {
      category: "Enterprise Solutions",
      description: "End-to-end solutions for large-scale deployments",
      products: [
        {
          name: "RoboSkin Enterprise Platform",
          subtitle: "Complete Tactile Robotics Solution",
          specs: {
            "Deployment": "On-premise or cloud",
            "Scalability": "Unlimited sensor arrays",
            "Support": "24/7 enterprise support",
            "SLA": "99.9% uptime guarantee",
          },
          features: [
            "Full-stack tactile robotics platform",
            "Integration with existing systems",
            "Custom development services",
            "Training and certification programs",
            "Regular feature updates",
          ],
          applications: ["Manufacturing", "Healthcare systems", "Research institutions"],
          price: "Contact for Pricing",
          datasheet: "/datasheets/Enterprise-datasheet.pdf",
          image: "enterprise"
        },
      ]
    },
  ];

  const getIcon = (category: string) => {
    switch(category) {
      case 'Sensor Arrays':
        return (
          <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
          </svg>
        );
      case 'Processing Units':
        return (
          <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 10l2 2 4-4M12 15l2 2 4-4" />
          </svg>
        );
      case 'Development Kits':
        return (
          <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
          </svg>
        );
      default:
        return (
          <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
          </svg>
        );
    }
  };

  const getColor = (index: number) => {
    const colors = ['cyan', 'purple', 'blue', 'pink'];
    return colors[index % colors.length];
  };

  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
              <pattern id="prodgrid" width="5" height="5" patternUnits="userSpaceOnUse">
                <path d="M 5 0 L 0 0 0 5" fill="none" stroke="currentColor" strokeWidth="0.3" className="text-cyan-400"/>
              </pattern>
            </defs>
            <rect width="100" height="100" fill="url(#prodgrid)" />
          </svg>
        </div>

        <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-pulse"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 relative">
          <div className="text-center">
            <div className="inline-flex items-center px-4 py-2 bg-cyan-500/10 backdrop-blur-sm rounded-full text-sm font-semibold mb-8 border border-cyan-400/30">
              <svg className="w-4 h-4 mr-2 text-cyan-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/>
              </svg>
              Product Catalog
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              RoboSkin <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">Product Line</span>
            </h1>
            <p className="text-xl text-blue-100 max-w-4xl mx-auto leading-relaxed">
              From individual sensor arrays to complete enterprise platforms,
              find the right tactile sensing solution for your application.
            </p>
          </div>
        </div>
      </section>

      {/* Quick Navigation */}
      <section className="py-12 bg-slate-800 border-b border-cyan-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-4">
            {productLines.map((line, index) => (
              <a
                key={index}
                href={`#category-${index}`}
                className="px-6 py-3 bg-slate-700 text-white rounded-lg hover:bg-cyan-600 transition-colors font-medium border border-cyan-500/20"
              >
                {line.category}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Product Categories */}
      {productLines.map((line, lineIndex) => (
        <section key={lineIndex} id={`category-${lineIndex}`} className="py-24 bg-gradient-to-b from-slate-800 to-slate-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Category Header */}
            <div className="text-center mb-16">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl mb-6 shadow-lg shadow-cyan-500/30">
                {getIcon(line.category)}
              </div>
              <h2 className="text-4xl font-bold text-white mb-4">{line.category}</h2>
              <p className="text-gray-400 text-lg max-w-2xl mx-auto">{line.description}</p>
            </div>

            {/* Products Grid */}
            <div className="space-y-12">
              {line.products.map((product, productIndex) => (
                <div key={productIndex} className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-cyan-500/20 overflow-hidden hover:border-cyan-400/40 transition-all">
                  <div className="grid md:grid-cols-3 gap-0">
                    {/* Product Image */}
                    <div className="md:col-span-1 bg-gradient-to-br from-slate-700 to-slate-800 p-8 flex items-center justify-center">
                      <div className="w-full aspect-square bg-gradient-to-br from-cyan-500/10 to-purple-500/10 rounded-xl flex items-center justify-center">
                        <svg className="w-32 h-32 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                        </svg>
                      </div>
                    </div>

                    {/* Product Info */}
                    <div className="md:col-span-2 p-8">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <span className="inline-block px-3 py-1 bg-cyan-500/10 text-cyan-400 text-xs font-bold rounded-full mb-2 border border-cyan-500/30">
                            NEW
                          </span>
                          <h3 className="text-2xl font-bold text-white">{product.name}</h3>
                          <p className="text-cyan-400 font-semibold">{product.subtitle}</p>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
                            {product.price}
                          </div>
                        </div>
                      </div>

                      {/* Specs Grid */}
                      {product.specs && (
                        <div className="mb-6">
                          <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-3">Technical Specifications</h4>
                          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                            {Object.entries(product.specs).map(([key, value]) => (
                              <div key={key} className="bg-slate-700/50 rounded-lg p-3">
                                <div className="text-xs text-gray-400 mb-1">{key}</div>
                                <div className="text-sm font-semibold text-white">{value}</div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Features */}
                      {product.features && (
                        <div className="mb-6">
                          <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-3">Key Features</h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                            {product.features.map((feature, idx) => (
                              <div key={idx} className="flex items-center text-sm text-gray-300">
                                <svg className="w-4 h-4 text-cyan-400 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                {feature}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Applications */}
                      {product.applications && (
                        <div className="mb-6">
                          <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-3">Applications</h4>
                          <div className="flex flex-wrap gap-2">
                            {product.applications.map((app, idx) => (
                              <span key={idx} className="px-3 py-1 bg-purple-500/10 text-purple-400 text-sm rounded-full border border-purple-500/20">
                                {app}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Actions */}
                      <div className="flex flex-wrap gap-3 pt-4 border-t border-gray-700">
                        <a
                          href={product.datasheet}
                          className="inline-flex items-center px-5 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-lg hover:from-cyan-400 hover:to-blue-500 transition-all text-sm"
                        >
                          <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                          Download Datasheet
                        </a>
                        <Link
                          href="/contact"
                          className="inline-flex items-center px-5 py-2.5 bg-transparent border-2 border-purple-500 text-white font-semibold rounded-lg hover:bg-purple-500/10 transition-all text-sm"
                        >
                          <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                          Request Quote
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* CTA Section */}
      <section className="bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white py-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
              <pattern id="prodctagrid" width="10" height="10" patternUnits="userSpaceOnUse">
                <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeWidth="0.3"/>
              </pattern>
            </defs>
            <rect width="100" height="100" fill="url(#prodctagrid)"/>
          </svg>
        </div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Need a <span className="text-cyan-400">Custom Solution</span>?
          </h2>
          <p className="text-xl text-blue-100 mb-10 max-w-3xl mx-auto leading-relaxed">
            We offer custom sensor designs, form factor modifications, and specialized processing solutions
            tailored to your unique requirements.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-10 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold rounded-lg hover:from-cyan-400 hover:to-blue-500 transition-all transform hover:scale-105 shadow-lg shadow-cyan-500/30"
            >
              Discuss Custom Requirements
              <svg className="w-5 h-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <Link
              href="/resources"
              className="inline-flex items-center justify-center px-10 py-4 bg-transparent border-2 border-purple-500 text-white font-bold rounded-lg hover:bg-purple-500/10 transition-all"
            >
              View Developer Resources
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
