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
        const response = await axios.get(`${BACKEND_URL}/admin/products/${productId}`);
        const prod = response.data.product;
        setProduct(prod);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching product:', error);
        setLoading(false);
      }
    };

    if (productId) fetchProduct();
  }, [productId]);

  if (loading) return <div className="p-8 text-center">Loading...</div>;
  if (!product) return <div className="p-8 text-center">Product not found</div>;

  return (
    <main className="max-w-7xl mx-auto p-6 md:p-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Images */}
        <div className="flex flex-col">
          <div className="bg-gray-100 aspect-square mb-4 overflow-hidden mb-4">
            {product.images?.[mainImage]?.url && (
              <img
                src={product.images[mainImage].url}
                alt={product.title}
                className="w-full h-full object-cover"
              />
            )}
          </div>
          {/* Thumbnails */}
          <div className="flex gap-2 overflow-x-auto">
            {product.images?.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setMainImage(idx)}
                className={`w-20 h-20 flex-shrink-0 border-2 ${
                  mainImage === idx ? 'border-black' : 'border-gray-200'
                } overflow-hidden`}
              >
                <img src={img.url} alt="thumbnail" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div>
          <h1 className="text-3xl font-bold mb-2 text-black">{product.title}</h1>
          <p className="text-gray-600 mb-4">{product.description}</p>
          <p className="text-2xl font-bold mb-6 text-black">£{product.price}</p>

          {/* Variants */}
          {product.variants && product.variants.length > 0 && (
            <div className="mb-6">
              <label className="block text-sm font-semibold mb-3 text-black">Select Size</label>
              <select
                value={selectedVariant}
                onChange={(e) => setSelectedVariant(e.target.value)}
                className="w-full p-3 border border-gray-300 focus:border-black outline-none"
              >
                <option value="">Choose an option</option>
                {product.variants.map((v) => (
                  <option key={v.id} value={v.id}>
                    {v.title}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Quantity */}
          <div className="mb-6">
            <label className="block text-sm font-semibold mb-3 text-black">Quantity</label>
            <input
              type="number"
              min="1"
              max="10"
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value))}
              className="w-24 p-3 border border-gray-300 focus:border-black outline-none"
            />
          </div>

          {/* Add to Cart */}
          <button className="w-full bg-black text-white py-4 font-semibold hover:bg-gray-800 transition-colors mb-4">
            Add to Bag
          </button>
          <button className="w-full border-2 border-black text-black py-4 font-semibold hover:bg-gray-50 transition-colors">
            Wishlist
          </button>
        </div>
      </div>
    </main>
  );
}
