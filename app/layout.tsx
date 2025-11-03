import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'ASOS Inspired Storefront',
  description: 'Premium e-commerce platform with modern design and seamless shopping experience',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-white text-gray-900">
        <header className="border-b border-gray-100">
          <nav className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
            <div className="text-2xl font-bold text-black">ASOS</div>
            <div className="flex-1 mx-8 hidden md:block">
              <input
                type="text"
                placeholder="Search products..."
                className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded focus:outline-none focus:border-black"
              />
            </div>
            <div className="flex gap-6 text-sm">
              <a href="/account" className="hover:underline">Account</a>
              <a href="/cart" className="hover:underline">Bag (0)</a>
            </div>
          </nav>
        </header>
        {children}
      </body>
    </html>
  );
}
