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
  const { products, productsLoading, fetchProducts, selectedProduct } = useStore();
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);
  return (
    <main className="flex h-full">
      {/* Left Sidebar */}
      <aside className="w-48 border-r border-gray-200 hidden lg:block">
        <div className="p-6">
          <h3 className="text-sm font-bold mb-6 text-black">CATEGORIES</h3>
          <nav className="space-y-4 text-sm">
            {categories.map((cat) => (
              <button
                key={cat}
                className={`block w-full text-left hover:underline ${
                  'All' === cat ? 'font-bold text-black' : 'text-gray-700'
                }`}
              >
                {cat}
              </button>
            ))}
          </nav>
          <hr className="my-6" />
          <h3 className="text-sm font-bold mb-4 text-black">FILTERS</h3>
          <div className="space-y-4 text-sm">
            <div className="flex items-center gap-2">
              <input
                id="in-stock"
                type="checkbox"
                className="w-4 h-4"
                defaultChecked
              />
              <label className="cursor-pointer" htmlFor="in-stock">
                In Stock Only
              </label>
            </div>
          </div>
        </div>
      </aside>
      {/* Main Content */}
      <div className="flex-1 overflow-hidden flex flex-col">
        {/* Header with search and filters */}
        <div className="border-b border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold">Shop</h1>
          </div>
          <div className="flex gap-4 items-center">
            <input
              type="text"
              placeholder="Search products..."
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-sm"
            />
            <select className="px-4 py-2 border border-gray-300 rounded-lg text-sm bg-white">
              <option>Sort by: Newest</option>
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
              <div className="text-gray-500">Loading products...</div>
            </div>
          ) : products && products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {products.map((product) => (
                <Link
                  key={product.id}
                  href={`/products/${product.id}`}
                  className="group"
                >
                  <div className="relative overflow-hidden rounded-lg bg-gray-100 aspect-square mb-4">
                    {product.thumbnail ? (
                      <img
                        src={product.thumbnail}
                        alt={product.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full text-gray-400">
                        No Image
                      </div>
                    )}
                  </div>
                  <h3 className="font-medium text-sm mb-2 group-hover:underline">
                    {product.title}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    £{(product.variants?.[0]?.prices?.[0]?.amount || 0) / 100}
                  </p>
                </Link>
              ))}
            </div>
          ) : (
            <div className="flex items-center justify-center h-full">
              <div className="text-gray-500">No products found</div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
