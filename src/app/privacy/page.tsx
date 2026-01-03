export default function PrivacyPolicyPage() {
  return (
    <>
      <section className="bg-blue-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Privacy Policy</h1>
          <p className="text-blue-100">Last Updated: January 3, 2026</p>
        </div>
      </section>

      <article className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-600 mb-8">
              RoboSkin.ai is committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your information.
            </p>

            <section className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Information We Collect</h2>
              <h3 className="text-lg font-semibold text-gray-800 mb-3 mt-6">1.1 Information You Provide</h3>
              <ul className="list-disc list-inside space-y-1 text-gray-700 mb-4">
                <li>Contact form submissions</li>
                <li>Email communications</li>
                <li>Newsletter subscriptions</li>
              </ul>

              <h3 className="text-lg font-semibold text-gray-800 mb-3 mt-6">1.2 Automatically Collected Information</h3>
              <ul className="list-disc list-inside space-y-1 text-gray-700">
                <li>IP address and browser type</li>
                <li>Operating system</li>
                <li>Referring website</li>
                <li>Pages viewed and time spent</li>
              </ul>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">2. How We Use Your Information</h2>
              <ul className="list-disc list-inside space-y-1 text-gray-700">
                <li>Respond to your inquiries</li>
                <li>Improve our website and services</li>
                <li>Analyze website usage and trends</li>
                <li>Comply with legal obligations</li>
              </ul>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Google AdSense</h2>
              <p className="text-gray-700">
                We use Google AdSense to serve ads. You may opt out of personalized advertising by visiting{" "}
                <a href="https://www.google.com/settings/ads" className="text-blue-600 hover:underline">Google's Ads Settings</a>.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Contact Us</h2>
              <div className="bg-gray-50 rounded p-4 border border-gray-200">
                <p className="text-gray-700">
                  <strong>Email:</strong>{" "}
                  <a href="mailto:messigoat147@gmail.com" className="text-blue-600 hover:underline">
                    messigoat147@gmail.com
                  </a>
                </p>
              </div>
            </section>
          </div>
        </div>
      </article>
    </>
  );
}
