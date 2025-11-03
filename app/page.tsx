'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';

interface Product {
  id: string;
  title: string;
  description: string;
  images: Array<{ url: string }>;
  price: number;
}

const BACKEND_URL = 'https://stingray-app-yitsm.ondigitalocean.app';

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState(['All', 'New Arrivals', 'Women', 'Men', 'Accessories']);
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/admin/products`);
        setProducts(response.data.products || []);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching products:', error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

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
                onClick={() => setSelectedCategory(cat)}
                className={`block w-full text-left hover:underline ${
                  selectedCategory === cat ? 'font-bold text-black' : 'text-gray-700'
                }`}
              >
                {cat}
              </button>
            ))}
          </nav>
          <hr className="my-6" />
          <h3 className="text-sm font-bold mb-4 text-black">FILTERS</h3>
          <div className="space-y-4 text-sm">
            <div>
              <label className="block font-semibold mb-2">Price Range</label>
              <input type="range" className="w-full" min="0" max="1000" />
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <section className="flex-1 p-6 md:p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 text-black">New Arrivals</h1>
          <p className="text-gray-600">Discover our latest collection</p>
        </div>

        {/* Product Grid */}
        {loading ? (
          <div className="text-center py-12">
            <p className="text-gray-500">Loading products...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <a
                key={product.id}
                href={`/products/${product.id}`}
                className="group"
              >
                <div className="bg-gray-100 aspect-square mb-3 overflow-hidden">
                  {product.images?.[0]?.url && (
                    <img
                      src={product.images[0].url}
                      alt={product.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  )}
                </div>
                <h3 className="text-sm font-semibold text-black group-hover:underline">
                  {product.title}
                </h3>
                <p className="text-sm text-gray-600 mt-1">£{product.price}</p>
              </a>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
