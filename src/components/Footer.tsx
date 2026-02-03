import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white border-t border-gray-800 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-12">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-3 mb-5">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center shadow-lg">
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0-4a2 2 0 100-4 2 2 0 000 4z" />
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold">RoboSkin</span>
                <span className="text-xs text-gray-400 font-medium tracking-wide">TACTILE INTELLIGENCE</span>
              </div>
            </div>
            <p className="text-gray-400 text-base max-w-md leading-relaxed mb-6">
              Pioneering the future of robotic sensing technology through advanced artificial skin systems.
            </p>
            <div className="flex space-x-4">
              <a href="https://github.com/roboskin-ai" className="w-10 h-10 bg-gray-800 hover:bg-blue-600 rounded-lg flex items-center justify-center transition-colors">
                <svg className="w-5 h-5 text-gray-300" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
              </a>
              <a href="https://x.com/L89155W" className="w-10 h-10 bg-gray-800 hover:bg-blue-600 rounded-lg flex items-center justify-center transition-colors">
                <svg className="w-5 h-5 text-gray-300" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              </a>
              <a href="https://linkedin.com/company/roboskin-ai" className="w-10 h-10 bg-gray-800 hover:bg-blue-600 rounded-lg flex items-center justify-center transition-colors">
                <svg className="w-5 h-5 text-gray-300" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              </a>
            </div>
          </div>

          {/* Products & Tech */}
          <div>
            <h3 className="text-sm font-bold mb-5 uppercase tracking-wider text-gray-300">Products</h3>
            <ul className="space-y-3">
              <li><Link href="/products" className="text-gray-400 hover:text-white transition-colors text-base">Product Catalog</Link></li>
              <li><Link href="/technology" className="text-gray-400 hover:text-white transition-colors text-base">Technology</Link></li>
              <li><Link href="/applications" className="text-gray-400 hover:text-white transition-colors text-base">Applications</Link></li>
              <li><Link href="/resources" className="text-gray-400 hover:text-white transition-colors text-base">Resources</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-sm font-bold mb-5 uppercase tracking-wider text-gray-300">Company</h3>
            <ul className="space-y-3">
              <li><Link href="/research" className="text-gray-400 hover:text-white transition-colors text-base">Research</Link></li>
              <li><Link href="/case-studies" className="text-gray-400 hover:text-white transition-colors text-base">Case Studies</Link></li>
              <li><Link href="/news" className="text-gray-400 hover:text-white transition-colors text-base">News</Link></li>
              <li><Link href="/partners" className="text-gray-400 hover:text-white transition-colors text-base">Partners</Link></li>
              <li><Link href="/team" className="text-gray-400 hover:text-white transition-colors text-base">Team</Link></li>
              <li><Link href="/careers" className="text-gray-400 hover:text-white transition-colors text-base">Careers</Link></li>
            </ul>
          </div>

          {/* Legal & Contact */}
          <div>
            <h3 className="text-sm font-bold mb-5 uppercase tracking-wider text-gray-300">Contact</h3>
            <ul className="space-y-3">
              <li><Link href="/contact" className="text-gray-400 hover:text-white transition-colors text-base">Contact Us</Link></li>
              <li><Link href="/privacy" className="text-gray-400 hover:text-white transition-colors text-base">Privacy Policy</Link></li>
              <li><Link href="/terms" className="text-gray-400 hover:text-white transition-colors text-base">Terms of Service</Link></li>
            </ul>
            <div className="mt-6 p-4 bg-slate-800 rounded-lg border border-cyan-500/20">
              <p className="text-sm text-gray-300 mb-2"><span className="font-semibold text-white">Email:</span><br/><a href="mailto:messigoat147@gmail.com" className="text-cyan-400">messigoat147@gmail.com</a></p>
              <p className="text-sm text-gray-300"><span className="font-semibold text-white">WhatsApp:</span> 15755596955</p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center text-gray-400 text-sm">
            <p>&copy; {new Date().getFullYear()} RoboSkin.ai. All rights reserved.</p>
            <p className="mt-2 md:mt-0">Advancing robotic tactile perception worldwide.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
