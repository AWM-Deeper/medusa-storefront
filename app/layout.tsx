import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'HASTE - Modern E-Commerce',
  description: 'Premium e-commerce platform with modern glassmorphism design and seamless shopping experience',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gradient-to-br from-white via-gray-50 to-gray-100 text-gray-900">
        <header className="border-b border-white/30 backdrop-blur-md bg-white/70 sticky top-0 z-50 shadow-lg shadow-black/5">
          <nav className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
            <div className="text-2xl font-bold bg-gradient-to-r from-black to-gray-700 bg-clip-text text-transparent hover:from-gray-700 hover:to-black transition-all duration-300">
              HASTE
            </div>
            <div className="flex-1 mx-8 hidden md:block">
              <input
                type="text"
                placeholder="Search products..."
                className="w-full px-4 py-2.5 bg-white/40 backdrop-blur-md border border-white/50 rounded-lg focus:outline-none focus:border-white/80 focus:ring-1 focus:ring-black/10 placeholder-gray-500 transition-all duration-200 hover:bg-white/50"
              />
            </div>
            <div className="flex gap-6 text-sm font-medium">
              <a className="px-3 py-2 rounded-lg hover:bg-white/40 backdrop-blur-sm transition-all duration-200 text-gray-700 hover:text-black" href="/account">
                Account
              </a>
              <a className="px-3 py-2 rounded-lg hover:bg-black/5 backdrop-blur-sm transition-all duration-200 text-gray-700 hover:text-black relative group" href="/cart">
                <span>Bag</span>
                <span className="absolute -top-1 -right-2 bg-gradient-to-r from-black to-gray-700 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center group-hover:shadow-md transition-all">0</span>
              </a>
            </div>
          </nav>
        </header>
        <main className="min-h-screen">
          {children}
        </main>
        <footer className="border-t border-white/30 bg-white/50 backdrop-blur-md text-center py-8 mt-16 text-gray-600">
          <p>&copy; 2025 HASTE. All rights reserved.</p>
        </footer>
      </body>
    </html>
  );
}
