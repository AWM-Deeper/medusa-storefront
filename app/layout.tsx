import type { Metadata } from 'next';
import './globals.css';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'HASTE - Modern E-Commerce',
  description: 'Premium e-commerce platform with modern glassmorphism design and seamless shopping experience',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gradient-to-b from-white via-blue-50 to-white text-gray-900">
        {/* Sticky Navigation */}
        <nav className="sticky top-0 z-50 bg-white/70 backdrop-blur-xl border-b border-white/20 shadow-lg">
          <div className="max-w-7xl mx-auto px-4 md:px-8 py-3 flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2">
              <div className="text-3xl font-black bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                HASTE
              </div>
            </Link>

            {/* Center Navigation */}
            <div className="hidden md:flex items-center gap-8 text-sm font-semibold">
              <Link href="/" className="hover:text-purple-600 transition-colors">Shop</Link>
              <Link href="#" className="hover:text-purple-600 transition-colors">About</Link>
              <Link  className="hover:text-purple-600 transition-colors">Contact</Link>
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-4">
              <Link href="/account" className="px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors font-medium text-sm">
                Account
              </Link>
              <Link href="/cart" className="relative px-4 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold text-sm hover:shadow-lg hover:scale-105 transition-all flex items-center gap-2">
                <span>🛒 Bag</span>
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">0</span>
              </Link>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="min-h-screen">
          {children}
        </main>

        {/* Footer */}
        <footer className="bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 text-white mt-20">
          <div className="max-w-7xl mx-auto px-4 md:px-8 py-16">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
              {/* Brand */}
              <div>
                <h3 className="text-2xl font-black mb-4 bg-gradient-to-r from-blue-300 to-purple-300 bg-clip-text text-transparent">HASTE</h3>
                <p className="text-white/60 text-sm">Premium e-commerce delivered at lightning speed.</p>
              </div>

              {/* Shop */}
              <div>
                <h4 className="font-bold mb-4 text-lg">Shop</h4>
                <ul className="space-y-2 text-white/60 text-sm">
                  <li><Link href="/contact" className="hover:text-white transition-colors">All Products</Link></li>
                  <li><Link href="#" className="hover:text-white transition-colors">New Arrivals</Link></li>
                  <li><Link href="#" className="hover:text-white transition-colors">On Sale</Link></li>
                  <li><Link href="#" className="hover:text-white transition-colors">Trending</Link></li>
                </ul>
              </div>

              {/* Company */}
              <div>
                <h4 className="font-bold mb-4 text-lg">Company</h4>
                <ul className="space-y-2 text-white/60 text-sm">
                  <li><Link href="#" className="hover:text-white transition-colors">About Us</Link></li>
                  <li><Link href="#" className="hover:text-white transition-colors">Blog</Link></li>
                  <li><Link href="#" className="hover:text-white transition-colors">Careers</Link></li>
                  <li><Link href="#" className="hover:text-white transition-colors">Press</Link></li>
                </ul>
              </div>

              {/* Support */}
              <div>
                <h4 className="font-bold mb-4 text-lg">Support</h4>
                <ul className="space-y-2 text-white/60 text-sm">
                  <li><Link href="#" className="hover:text-white transition-colors">Help Center</Link></li>
                  <li><Link href="#" className="hover:text-white transition-colors">Contact Us</Link></li>
                  <li><Link href="#" className="hover:text-white transition-colors">Terms & Conditions</Link></li>
                  <li><Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link></li>
                </ul>
              </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-white/60 text-sm">
              <p>&copy; 2025 HASTE. All rights reserved.</p>
              <div className="flex gap-6 mt-4 md:mt-0">
                <Link href="#" className="hover:text-white transition-colors">🐦 Twitter</Link>
                <Link href="#" className="hover:text-white transition-colors">📘 Facebook</Link>
                <Link href="#" className="hover:text-white transition-colors">📷 Instagram</Link>
                <Link href="#" className="hover:text-white transition-colors">💼 LinkedIn</Link>
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
