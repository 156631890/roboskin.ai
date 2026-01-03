'use client';

import { useState } from 'react';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <>
      <section className="bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Contact Us</h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Get in touch with our team to discuss your robotic skin needs
            </p>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg p-8 border border-gray-200">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Send Us a Message</h2>

                {submitted && (
                  <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded">
                    <p className="text-green-800 text-sm">Thank you! We'll get back to you soon.</p>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                      <input type="text" id="name" required className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="John Doe" />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
                      <input type="email" id="email" required className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="john@example.com" />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">Subject *</label>
                    <select id="subject" required className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                      <option value="">Select a topic</option>
                      <option value="general">General Inquiry</option>
                      <option value="sales">Sales & Pricing</option>
                      <option value="technical">Technical Support</option>
                      <option value="partnership">Partnership Opportunities</option>
                      <option value="research">Research Collaboration</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">Message *</label>
                    <textarea id="message" required rows={6} className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none" placeholder="Tell us about your project or inquiry..."></textarea>
                  </div>

                  <button type="submit" className="w-full bg-blue-600 text-white font-medium py-3 rounded hover:bg-blue-700 transition-colors">
                    Send Message
                  </button>
                </form>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-white rounded-lg p-6 border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-3">Email Us</h3>
                <a href="mailto:messigoat147@gmail.com" className="text-blue-600 hover:text-blue-700 break-all">
                  messigoat147@gmail.com
                </a>
                <p className="text-gray-600 text-sm mt-2">We typically respond within 24-48 hours</p>
              </div>

              <div className="bg-white rounded-lg p-6 border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-3">Headquarters</h3>
                <p className="text-gray-600 text-sm">
                  RoboSkin.ai Inc.<br />
                  1234 Innovation Drive<br />
                  San Francisco, CA 94102<br />
                  United States
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
