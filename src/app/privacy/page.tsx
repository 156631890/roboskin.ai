export default function PrivacyPolicyPage() {
  return (
    <>
      <section className="bg-gradient-to-br from-blue-700 via-blue-600 to-blue-800 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
              <pattern id="privacygrid" width="10" height="10" patternUnits="userSpaceOnUse">
                <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeWidth="0.5"/>
              </pattern>
            </defs>
            <rect width="100" height="100" fill="url(#privacygrid)"/>
          </svg>
        </div>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <div>
              <h1 className="text-4xl md:text-5xl font-bold">Privacy Policy</h1>
              <p className="text-blue-100 mt-1">Last Updated: January 5, 2026</p>
            </div>
          </div>
        </div>
      </section>

      <article className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none">
            <div className="bg-blue-50 border-l-4 border-blue-600 p-6 rounded-r-lg mb-12">
              <p className="text-gray-800 m-0 leading-relaxed">
                <strong className="text-blue-900">RoboSkin.ai</strong> is committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy outlines how we collect, use, and safeguard your data when you interact with our website and services.
              </p>
            </div>

            <section className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
                <span className="w-10 h-10 bg-blue-100 text-blue-700 rounded-xl flex items-center justify-center mr-3 font-bold">1</span>
                Information We Collect
              </h2>

              <div className="bg-white border-2 border-gray-200 rounded-2xl overflow-hidden mb-6">
                <div className="bg-gradient-to-r from-blue-50 to-blue-100 px-8 py-4 border-b-2 border-blue-200">
                  <h3 className="text-xl font-bold text-gray-900">Information You Provide</h3>
                </div>
                <div className="p-8">
                  <ul className="space-y-3">
                    {["Contact form submissions (name, email, organization, inquiry details)", "Email communications and correspondence", "Newsletter subscriptions (if applicable)", "Research collaboration inquiries", "Partnership proposals"].map((item, idx) => (
                      <li key={idx} className="flex items-start">
                        <svg className="w-5 h-5 text-blue-600 mr-3 flex-shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                        </svg>
                        <span className="text-gray-700 font-medium">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="bg-white border-2 border-gray-200 rounded-2xl overflow-hidden">
                <div className="bg-gradient-to-r from-blue-50 to-blue-100 px-8 py-4 border-b-2 border-blue-200">
                  <h3 className="text-xl font-bold text-gray-900">Automatically Collected Information</h3>
                </div>
                <div className="p-8">
                  <ul className="space-y-3">
                    {["IP address and geolocation data", "Browser type and version", "Operating system information", "Referring website and traffic sources", "Pages viewed and time spent on site", "Device fingerprint and screen resolution"].map((item, idx) => (
                      <li key={idx} className="flex items-start">
                        <svg className="w-5 h-5 text-blue-600 mr-3 flex-shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                        </svg>
                        <span className="text-gray-700 font-medium">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>

            <section className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
                <span className="w-10 h-10 bg-blue-100 text-blue-700 rounded-xl flex items-center justify-center mr-3 font-bold">2</span>
                How We Use Your Information
              </h2>
              <div className="bg-white border-2 border-gray-200 rounded-2xl p-8">
                <ul className="space-y-4">
                  {["Respond to technical and sales inquiries", "Improve website functionality and user experience", "Analyze usage patterns and trends", "Develop new features and services", "Comply with legal obligations", "Prevent fraudulent activities and ensure security"].map((item, idx) => (
                    <li key={idx} className="flex items-start bg-blue-50 p-4 rounded-xl">
                      <svg className="w-6 h-6 text-blue-600 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="text-gray-800 font-semibold">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            <section className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
                <span className="w-10 h-10 bg-blue-100 text-blue-700 rounded-xl flex items-center justify-center mr-3 font-bold">3</span>
                Data Sharing & Disclosure
              </h2>
              <div className="bg-yellow-50 border-2 border-yellow-200 rounded-2xl p-6 mb-6">
                <div className="flex items-start">
                  <svg className="w-6 h-6 text-yellow-600 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  <div>
                    <h4 className="font-bold text-yellow-800 mb-2">Important Notice</h4>
                    <p className="text-yellow-700 m-0 text-sm">We do not sell, trade, or rent your personal information to third parties. Your data is shared only as described below.</p>
                  </div>
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                {[
                  { title: "Service Providers", desc: "Trusted third parties who assist in operating our platform" },
                  { title: "Business Transfers", desc: "In connection with mergers, acquisitions, or asset sales" },
                  { title: "Legal Requirements", desc: "When required by law or to protect our rights" },
                  { title: "Affiliated Companies", desc: "With our corporate affiliates for business purposes" }
                ].map((item, idx) => (
                  <div key={idx} className="bg-white border-2 border-gray-200 rounded-xl p-6">
                    <h4 className="font-bold text-gray-900 mb-2">{item.title}</h4>
                    <p className="text-gray-600 text-sm m-0">{item.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
                <span className="w-10 h-10 bg-blue-100 text-blue-700 rounded-xl flex items-center justify-center mr-3 font-bold">4</span>
                Google AdSense & Advertising
              </h2>
              <div className="bg-white border-2 border-gray-200 rounded-2xl p-8">
                <p className="text-gray-700 leading-relaxed mb-4">
                  We use Google AdSense to display advertisements. Google may use cookies to serve ads based on your prior visits to our website or other websites.
                </p>
                <div className="bg-blue-50 p-6 rounded-xl">
                  <h4 className="font-bold text-gray-900 mb-3">Your Advertising Choices</h4>
                  <p className="text-gray-700 m-0">
                    You may opt out of personalized advertising by visiting{" "}
                    <a href="https://www.google.com/settings/ads" className="text-blue-600 hover:text-blue-700 font-semibold underline" target="_blank" rel="noopener noreferrer">
                      Google's Ads Settings
                    </a>{" "}
                    or the{" "}
                    <a href="http://www.aboutads.info/choices/" className="text-blue-600 hover:text-blue-700 font-semibold underline" target="_blank" rel="noopener noreferrer">
                      Network Advertising Initiative opt-out page
                    </a>.
                  </p>
                </div>
              </div>
            </section>

            <section className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
                <span className="w-10 h-10 bg-blue-100 text-blue-700 rounded-xl flex items-center justify-center mr-3 font-bold">5</span>
                Data Security Measures
              </h2>
              <div className="bg-white border-2 border-green-200 rounded-2xl p-8">
                <p className="text-gray-700 leading-relaxed mb-6">
                  We implement industry-standard security measures to protect your information:
                </p>
                <div className="grid md:grid-cols-3 gap-4">
                  {[
                    { icon: "🔒", text: "SSL/TLS Encryption" },
                    { icon: "🛡️", text: "Secure Data Centers" },
                    { icon: "🔐", text: "Access Controls" },
                    { icon: "📊", text: "Regular Security Audits" },
                    { icon: "⚡", text: "Intrusion Detection" },
                    { icon: "🔄", text: "Data Backup Systems" }
                  ].map((item, idx) => (
                    <div key={idx} className="bg-green-50 p-4 rounded-xl text-center">
                      <div className="text-3xl mb-2">{item.icon}</div>
                      <div className="font-semibold text-gray-800 text-sm">{item.text}</div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            <section className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
                <span className="w-10 h-10 bg-blue-100 text-blue-700 rounded-xl flex items-center justify-center mr-3 font-bold">6</span>
                Your Privacy Rights
              </h2>
              <div className="bg-white border-2 border-gray-200 rounded-2xl p-8">
                <p className="text-gray-700 leading-relaxed mb-6">
                  Depending on your location, you may have the following rights:
                </p>
                <ul className="space-y-3">
                  {["Access to your personal data", "Correction of inaccurate data", "Deletion of your information", "Data portability", "Opt-out of marketing communications", "Object to processing of your data"].map((item, idx) => (
                    <li key={idx} className="flex items-center">
                      <svg className="w-5 h-5 text-green-600 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-700 font-semibold">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            <section className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
                <span className="w-10 h-10 bg-blue-100 text-blue-700 rounded-xl flex items-center justify-center mr-3 font-bold">7</span>
                Contact & Inquiries
              </h2>
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-200 rounded-2xl p-8">
                <p className="text-gray-800 leading-relaxed mb-4">
                  For questions, concerns, or requests regarding your privacy and personal information, please contact our Data Protection Officer:
                </p>
                <div className="bg-white p-6 rounded-xl">
                  <p className="text-gray-900 m-0">
                    <strong>Email:</strong>{" "}
                    <a href="mailto:privacy@roboskin.ai" className="text-blue-600 hover:text-blue-700 font-semibold">
                      privacy@roboskin.ai
                    </a>
                  </p>
                  <p className="text-gray-700 mt-3 mb-0 text-sm">
                    We will respond to your inquiry within 30 business days.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <div className="bg-gray-50 border-2 border-gray-200 rounded-2xl p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Policy Updates</h3>
                <p className="text-gray-700 leading-relaxed m-0">
                  We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new policy on this page and updating the "Last Updated" date. We encourage you to review this policy periodically to stay informed about how we protect your information.
                </p>
              </div>
            </section>
          </div>
        </div>
      </article>
    </>
  );
}
