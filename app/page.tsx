'use client';
import { useEffect } from 'react';
import { useStore } from '../lib/store';
import Link from 'next/link';

const categories = [
  'All',
  'New Arrivals',
  'Women',
  'Men',
  'Accessories',
];

export default function HomePage() {
  const { products, productsLoading, fetchProducts } = useStore();

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return (
    <main className="flex h-full min-h-screen">
      {/* Left Sidebar */}
      <aside className="w-56 border-r border-white/30 hidden lg:block backdrop-blur-sm bg-white/30 sticky top-20 h-screen overflow-y-auto">
        <div className="p-6">
          <h3 className="text-xs font-bold mb-6 text-black/70 uppercase tracking-widest">Categories</h3>
          <nav className="space-y-2 text-sm">
            {categories.map((cat) => (
              <button
                key={cat}
                className={`w-full text-left px-3 py-2.5 rounded-lg transition-all duration-200 ${
                  cat === 'All'
                    ? 'bg-white/60 font-semibold text-black shadow-sm'
                    : 'text-gray-700 hover:bg-white/40 hover:text-black'
                }`}
              >
                {cat}
              </button>
            ))}
          </nav>

          <hr className="my-6 border-white/30" />

          <h3 className="text-xs font-bold mb-4 text-black/70 uppercase tracking-widest">Filters</h3>
          <div className="space-y-4 text-sm">
            <label className="flex items-center gap-3 cursor-pointer group">
              <input type="checkbox" className="w-4 h-4 accent-black" defaultChecked />
              <span className="text-gray-700 group-hover:text-black transition">In Stock Only</span>
            </label>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 overflow-hidden flex flex-col bg-gradient-to-br from-white/50 via-transparent to-white/30">
        {/* Header with search and filters */}
        <div className="border-b border-white/30 backdrop-blur-sm bg-white/40 p-6 sticky top-20 z-40">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-black via-gray-800 to-gray-600 bg-clip-text text-transparent">Discover</h1>
          </div>
          <div className="flex gap-4 items-center flex-wrap">
            <input
              type="text"
              placeholder="Search products..."
              className="flex-1 min-w-[200px] px-4 py-2.5 bg-white/40 backdrop-blur-md border border-white/50 rounded-lg text-sm focus:outline-none focus:border-white/80 focus:ring-1 focus:ring-black/10 placeholder-gray-500 transition-all duration-200 hover:bg-white/50"
            />
            <select className="px-4 py-2.5 bg-white/40 backdrop-blur-md border border-white/50 rounded-lg text-sm focus:outline-none focus:border-white/80 transition-all duration-200 hover:bg-white/50">
              <option>Sort: Newest</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
              <option>Best Sellers</option>
            </select>
          </div>
        </div>

        {/* Products Grid */}
        <div className="flex-1 overflow-auto p-6">
          {productsLoading ? (
            <div className="flex items-center justify-center h-full">
              <div className="text-gray-500 text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black/30 mx-auto mb-4"></div>
                <p>Loading products...</p>
              </div>
            </div>
          ) : products && products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 auto-rows-max">
              {products.map((product) => (
                <Link
                  key={product.id}
                  href={`/products/${product.id}`}
                  className="group"
                >
                  <div className="glass-card p-0 overflow-hidden h-full flex flex-col hover:shadow-2xl">
                    <div className="relative overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 aspect-square">
                      {product.thumbnail ? (
                        <img
                          src={product.thumbnail}
                          alt={product.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      ) : (
                        <div className="flex items-center justify-center h-full text-gray-400">
                          No Image
                        </div>
                      )}
                    </div>
                    <div className="p-4 flex flex-col flex-1">
                      <h3 className="font-semibold text-sm mb-2 group-hover:text-black/70 transition line-clamp-2">
                        {product.title}
                      </h3>
                      <p className="text-gray-600 text-xs mb-3 flex-1">Premium Quality</p>
                      <p className="text-lg font-bold text-black">
                        £{((product.variants?.[0]?.prices?.[0]?.amount || 0) / 100).toFixed(2)}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="flex items-center justify-center h-full">
              <div className="text-gray-500 text-center">
                <p className="text-lg mb-2">No products found</p>
                <p className="text-sm">Try adjusting your filters</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
