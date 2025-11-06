'use client';

import { useEffect, useState } from 'react';
import { useStore } from '../lib/store';
import Link from 'next/link';
import Image from 'next/image';

export default function HomePage() {
  const { products, productsLoading, fetchProducts } = useStore();
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('newest');

  const categories = [
    { id: 'all', label: 'All', icon: '🌟' },
    { id: 'new', label: 'New Arrivals', icon: '✨' },
    { id: 'trending', label: 'Trending', icon: '🔥' },
    { id: 'sale', label: 'On Sale', icon: '💰' },
  ];

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    let filtered = products;

    // Search filter
    if (searchQuery.trim()) {
      filtered = filtered.filter(p =>
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Sort
    if (sortBy === 'price-low') {
      filtered = [...filtered].sort((a, b) => (a.variants[0]?.prices[0]?.amount || 0) - (b.variants[0]?.prices[0]?.amount || 0));
    } else if (sortBy === 'price-high') {
      filtered = [...filtered].sort((a, b) => (b.variants[0]?.prices[0]?.amount || 0) - (a.variants[0]?.prices[0]?.amount || 0));
    } else if (sortBy === 'newest') {
      filtered = [...filtered].reverse();
    }

    setFilteredProducts(filtered);
  }, [searchQuery, selectedCategory, sortBy, products]);

  return (
    <main className="w-full min-h-screen bg-gradient-to-b from-white via-blue-50 to-white">
      {/* Hero Banner */}
      <section className="relative w-full h-[600px] bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 left-10 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-2000"></div>
        </div>

        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-7xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-purple-200 to-pink-200 mb-6 animate-fade-in">
            HASTE
          </h1>
          <p className="text-xl md:text-2xl text-white/80 mb-3 max-w-2xl">
            Discover the finest curated collection delivered at lightning speed
          </p>
          <p className="text-sm md:text-lg text-white/60 mb-8">
            ⚡ Fast shipping • 🎁 Curated selection • ✨ Premium quality
          </p>
          <Link
            href="#products"
            className="px-8 py-4 bg-white text-purple-900 font-bold rounded-full hover:shadow-2xl hover:scale-105 transition-all duration-300 text-lg"
          >
            Explore Collection
          </Link>
        </div>
      </section>

      {/* Trust Signals */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4 px-4 md:px-8 -mt-12 relative z-20 mb-16">
        {[
          { icon: '🚀', text: 'Fast Delivery', subtext: 'Within 24 hours' },
          { icon: '🛡️', text: 'Secure', subtext: '100% encrypted' },
          { icon: '↩️', text: 'Easy Returns', subtext: '30-day guarantee' },
          { icon: '⭐', text: 'Trusted', subtext: '4.9★ rating' },
        ].map((signal, i) => (
          <div key={i} className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 text-center shadow-lg hover:shadow-xl transition-all border border-white/20">
            <div className="text-4xl mb-2">{signal.icon}</div>
            <h3 className="font-bold text-gray-900">{signal.text}</h3>
            <p className="text-xs text-gray-600 mt-1">{signal.subtext}</p>
          </div>
        ))}
      </section>

      {/* Search & Filters Section */}
      <section id="products" className="px-4 md:px-8 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Search Bar */}
          <div className="mb-8">
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-6 py-4 bg-white/80 backdrop-blur-lg border-2 border-white/30 rounded-full focus:outline-none focus:border-purple-500 focus:shadow-xl focus:bg-white transition-all text-lg font-medium"
            />
          </div>

          {/* Category Pills */}
          <div className="flex gap-3 mb-8 overflow-x-auto pb-2">
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-6 py-3 rounded-full font-semibold whitespace-nowrap transition-all duration-300 flex items-center gap-2 ${
                  selectedCategory === cat.id
                    ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg'
                    : 'bg-white/60 backdrop-blur-lg text-gray-700 border border-white/40 hover:bg-white hover:shadow-md'
                }`}
              >
                <span>{cat.icon}</span>
                {cat.label}
              </button>
            ))}
          </div>

          {/* Sort & Results Header */}
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-black text-gray-900">
              {filteredProducts.length} Products Found
            </h2>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 bg-white/80 backdrop-blur-lg border-2 border-white/30 rounded-lg focus:outline-none focus:border-purple-500 font-medium text-gray-700 cursor-pointer"
            >
              <option value="newest">Newest</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>

          {/* Product Grid */}
          {productsLoading ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {Array(8).fill(null).map((_, i) => (
                <div key={i} className="bg-white/40 backdrop-blur-lg rounded-2xl h-64 md:h-72 animate-pulse border border-white/20"></div>
              ))}
            </div>
          ) : filteredProducts.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {filteredProducts.map(product => (
                <Link key={product.id} href={`/product/${product.id}`}>
                  <div className="group bg-white/70 backdrop-blur-xl rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-white/30 cursor-pointer h-full flex flex-col">
                    {/* Product Image */}
                    <div className="relative w-full aspect-square bg-gradient-to-br from-gray-100 to-gray-50 overflow-hidden group-hover:bg-gradient-to-br group-hover:from-purple-100 group-hover:to-blue-100 transition-all">
                      {product.thumbnail ? (
                        <Image
                          src={product.thumbnail}
                          alt={product.title}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-4xl">📦</div>
                      )}
                      {/* Badge */}
                      <div className="absolute top-3 right-3 bg-gradient-to-r from-red-500 to-pink-500 text-white px-3 py-1 rounded-full text-xs font-bold">Sale</div>
                    </div>

                    {/* Product Info */}
                    <div className="p-4 flex flex-col flex-grow">
                      <h3 className="font-bold text-sm md:text-base text-gray-900 line-clamp-2 mb-2 group-hover:text-purple-600 transition-colors">
                        {product.title}
                      </h3>
                      <p className="text-xs text-gray-600 line-clamp-2 mb-4 flex-grow">
                        {product.description || 'Premium quality product'}
                      </p>

                      {/* Price & Button */}
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-xs text-gray-500 line-through opacity-60">
                            ${((product.variants[0]?.prices[0]?.amount || 0) / 100 * 1.2).toFixed(2)}
                          </p>
                          <p className="text-lg font-black text-purple-600">
                            ${(product.variants[0]?.prices[0]?.amount || 0) / 100}
                          </p>
                        </div>
                        <button className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-3 rounded-full hover:shadow-lg hover:scale-110 transition-all duration-300">
                          ➕
                        </button>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-white/40 backdrop-blur-lg rounded-3xl border border-white/20">
              <p className="text-2xl font-bold text-gray-600 mb-2">No products found</p>
              <p className="text-gray-500">Try adjusting your search or filters</p>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="relative py-16 px-4 md:px-8 bg-gradient-to-r from-purple-600 to-blue-600">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-4xl font-black text-white mb-4">Get Exclusive Offers</h2>
          <p className="text-white/90 mb-8 text-lg">Subscribe to HASTE and get 20% off your first order</p>
          <div className="flex gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-6 py-3 rounded-full focus:outline-none focus:ring-2 focus:ring-white font-medium"
            />
            <button className="px-8 py-3 bg-white text-purple-600 font-bold rounded-full hover:shadow-lg hover:scale-105 transition-all duration-300">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
