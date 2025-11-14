'use client';

import { useEffect, useState } from 'react';
import { useStore } from '../lib/store';
import Link from 'next/link';
import Image from 'next/image';

export default function HomePage() {
  const { products, productsLoading, fetchProducts } = useStore();
  const [filteredProducts, setFilteredProducts] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('newest');

  const categories = [
    { id: 'all', label: 'All', icon: '🏪' },
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
      filtered = filtered.filter((p) =>
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase())
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
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-20 px-4 bg-gray-50 border-b-2 border-gray-200">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-7xl md:text-8xl font-black text-black mb-6">
            HASTE
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 mb-8 max-w-2xl mx-auto">
            Discover the finest curated collection delivered at lightning speed
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/products"
              className="px-8 py-4 bg-black text-white hover:bg-gray-800 font-bold text-lg transition-colors"
            >
              Shop Now
            </Link>
            <Link
              href="/about"
              className="px-8 py-4 bg-white text-black border-2 border-black hover:bg-black hover:text-white font-bold text-lg transition-colors"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-12 px-4 bg-white border-b-2 border-gray-200">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-black mb-8 text-center">Shop by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`p-6 border-2 font-bold transition-colors ${
                  selectedCategory === cat.id
                    ? 'bg-black text-white border-black'
                    : 'bg-white text-black border-gray-300 hover:border-black'
                }`}
              >
                <div className="text-4xl mb-2">{cat.icon}</div>
                <div className="text-lg">{cat.label}</div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="py-8 px-4 bg-gray-50 border-b-2 border-gray-200">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="flex-1 w-full">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products..."
                className="w-full px-6 py-3 border-2 border-gray-300 focus:border-black focus:ring-2 focus:ring-black outline-none text-black bg-white"
              />
            </div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-6 py-3 border-2 border-gray-300 focus:border-black focus:ring-2 focus:ring-black outline-none text-black bg-white font-semibold"
            >
              <option value="newest">Newest</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-4xl font-bold text-black">Featured Products</h2>
            <span className="text-gray-700 font-semibold">
              {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'}
            </span>
          </div>

          {productsLoading ? (
            <div className="text-center py-20">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-black border-t-transparent"></div>
              <p className="mt-4 text-gray-700 font-semibold">Loading products...</p>
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="text-center py-20 bg-gray-50 border-2 border-gray-200">
              <p className="text-2xl text-gray-700 font-semibold">No products found</p>
              <p className="text-gray-600 mt-2">Try adjusting your search or filters</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <Link
                  key={product.id}
                  href={`/products/${product.id}`}
                  className="group border-2 border-gray-200 hover:border-black transition-all bg-white"
                >
                  <div className="aspect-square bg-gray-100 overflow-hidden relative">
                    {product.thumbnail ? (
                      <Image
                        src={product.thumbnail}
                        alt={product.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gray-200">
                        <span className="text-6xl">📦</span>
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-black text-lg mb-2 line-clamp-2">
                      {product.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                      {product.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-black">
                        ${((product.variants[0]?.prices[0]?.amount || 0) / 100).toFixed(2)}
                      </span>
                      <span className="text-sm text-gray-600 font-semibold">
                        View Details →
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 px-4 bg-black text-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4">Stay Updated</h2>
          <p className="text-gray-300 text-lg mb-8">
            Subscribe to get exclusive deals and early access to new products
          </p>
          <form className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-6 py-3 bg-white text-black border-2 border-white focus:ring-2 focus:ring-white outline-none"
            />
            <button
              type="submit"
              className="px-8 py-3 bg-white text-black hover:bg-gray-200 font-bold transition-colors"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}
