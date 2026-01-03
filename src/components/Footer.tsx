import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white border-t border-gray-800 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center">
                <span className="text-white font-bold text-sm">RS</span>
              </div>
              <span className="text-lg font-semibold">RoboSkin.ai</span>
            </div>
            <p className="text-gray-400 text-sm max-w-md">
              Pioneering the future of robotic sensing technology through advanced artificial skin systems.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="/technology" className="text-gray-400 hover:text-white transition-colors text-sm">Technology</Link></li>
              <li><Link href="/applications" className="text-gray-400 hover:text-white transition-colors text-sm">Applications</Link></li>
              <li><Link href="/research" className="text-gray-400 hover:text-white transition-colors text-sm">Research</Link></li>
              <li><Link href="/contact" className="text-gray-400 hover:text-white transition-colors text-sm">Contact</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-sm font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li><Link href="/privacy" className="text-gray-400 hover:text-white transition-colors text-sm">Privacy Policy</Link></li>
              <li><Link href="/terms" className="text-gray-400 hover:text-white transition-colors text-sm">Terms of Service</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 text-sm">
          <p>&copy; {new Date().getFullYear()} RoboSkin.ai. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
