'use client';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'next/navigation';

interface ProductImage {
  url: string;
}

interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  images: ProductImage[];
  variants: Array<{
    id: string;
    title: string;
    sku: string;
  }>;
}

const BACKEND_URL = 'https://stingray-app-yitsm.ondigitalocean.app';

export default function ProductPage() {
  const params = useParams();
  const productId = params.id as string;
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [mainImage, setMainImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState<string>('');

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `${BACKEND_URL}/store/products/${productId}`
        );
        setProduct(response.data.product);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch product', error);
        setLoading(false);
      }
    };

    if (productId) {
      fetchProduct();
    }
  }, [productId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-black/30 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading product details...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-600 text-lg">Product not found</p>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-white/50 via-transparent to-white/30 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {/* Image Gallery */}
          <div className="flex flex-col gap-4">
            {/* Main Image */}
            <div className="glass-card p-0 overflow-hidden aspect-square">
              {product.images && product.images[mainImage] ? (
                <img
                  src={product.images[mainImage].url}
                  alt={product.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="flex items-center justify-center h-full bg-gradient-to-br from-gray-100 to-gray-200 text-gray-400">
                  No Image
                </div>
              )}
            </div>

            {/* Thumbnails */}
            <div className="flex gap-2 overflow-x-auto pb-2">
              {product.images?.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setMainImage(idx)}
                  className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden transition-all duration-200 ${
                    mainImage === idx
                      ? 'ring-2 ring-black ring-offset-2 scale-105'
                      : 'opacity-60 hover:opacity-100 border border-white/50'
                  }`}
                >
                  <img
                    src={img.url}
                    alt="thumbnail"
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="flex flex-col gap-6">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-3 bg-gradient-to-r from-black via-gray-800 to-gray-600 bg-clip-text text-transparent">
                {product.title}
              </h1>
              <p className="text-gray-600 text-lg leading-relaxed mb-4">
                {product.description}
              </p>
              <div className="flex items-baseline gap-3 mb-6">
                <p className="text-4xl font-bold text-black">£{product.price.toFixed(2)}</p>
                <span className="text-sm text-gray-500">VAT included</span>
              </div>
            </div>

            {/* Variants */}
            {product.variants && product.variants.length > 0 && (
              <div className="glass-card p-4">
                <label className="block text-sm font-semibold mb-3 text-black/80 uppercase tracking-wide">
                  Select Size
                </label>
                <select
                  value={selectedVariant}
                  onChange={(e) => setSelectedVariant(e.target.value)}
                  className="w-full p-3 bg-white/40 backdrop-blur-md border border-white/50 rounded-lg focus:outline-none focus:border-white/80 focus:ring-1 focus:ring-black/10 transition-all duration-200 font-medium"
                >
                  <option value="">Choose a size...</option>
                  {product.variants.map((v) => (
                    <option key={v.id} value={v.id}>
                      {v.title}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Quantity */}
            <div className="glass-card p-4">
              <label className="block text-sm font-semibold mb-3 text-black/80 uppercase tracking-wide">
                Quantity
              </label>
              <input
                type="number"
                min="1"
                max="99"
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                className="w-full p-3 bg-white/40 backdrop-blur-md border border-white/50 rounded-lg focus:outline-none focus:border-white/80 focus:ring-1 focus:ring-black/10 transition-all duration-200 font-medium"
              />
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col gap-3">
              <button className="glass-button w-full bg-gradient-to-r from-black to-gray-800 text-white font-semibold py-4 rounded-lg hover:shadow-lg hover:from-gray-800 hover:to-black transition-all duration-300 transform hover:-translate-y-1">
                Add to Cart
              </button>
              <button className="glass-card p-4 font-semibold text-black hover:bg-white/70 transition-all duration-200 border border-white/50 rounded-lg">
                ♡ Add to Wishlist
              </button>
            </div>

            {/* Product Features */}
            <div className="glass-card p-6 mt-4">
              <h3 className="font-bold text-black mb-4 uppercase text-sm tracking-wide">Why Choose HASTE?</h3>
              <ul className="space-y-3 text-sm text-gray-700">
                <li className="flex gap-3">
                  <span className="text-lg">✓</span>
                  <span>Premium quality products curated for you</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-lg">✓</span>
                  <span>Fast & free shipping on orders over £50</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-lg">✓</span>
                  <span>Easy returns within 30 days</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-lg">✓</span>
                  <span>Secure checkout & buyer protection</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
