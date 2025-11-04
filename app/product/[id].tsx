import React, {
  useState,
  useEffect
} from 'react';
import {
  useRouter
} from 'next/navigation';
import { medusaClient } from '@/lib/medusa-client';

/**
 * Product Detail Page (Web)
 * 
 * Displays detailed product information including:
 * - Product images
 * - Description and specifications
 * - Pricing and availability
 * - Quantity selector
 * - Add to cart functionality
 * - Related products
 */
interface PageProps {
  params: {
    id: string;
  };
}

export default function ProductDetailPage(
  { params }: PageProps
) {
  const router = useRouter();
  const { id } = params;
  const [product, setProduct] = useState<any>(
    null
  );
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState<string | null>(
    null
  );

  useEffect(() => {
    loadProduct();
  }, [id]);

  const loadProduct = async () => {
    try {
      setLoading(true);
      if (id) {
        const product = await medusaClient.getProductById(
          id
        );
        setProduct(product);
      }
    } catch (err: any) {
      setError(
        err.message || 'Failed to load product'
      );
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = async () => {
    try {
      // TODO: Implement add to cart functionality
      // 1. Get cart ID from storage or create new cart
      // 2. Get selected variant
      // 3. Call medusaClient.addToCart()
      // 4. Show success message
      // 5. Navigate to cart or show toast
      console.log(
        `Adding ${
          quantity
        } item(s) to cart`
      );
    } catch (err) {
      console.error('Error adding to cart:', err);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          <p className="mt-4 text-gray-600">
            Loading product...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <p className="text-red-600 font-semibold">
            Error: {error}
          </p>
          <button
            onClick={() => router.push('/products')}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Back to Products
          </button>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <p className="text-gray-500">Product not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
        <div className="flex items-center gap-2 text-sm">
          <a href="/products" className="text-blue-600 hover:underline">
            Products
          </a>
          <span className="text-gray-400">/</span>
          <span className="text-gray-600">
            {product.name}
          </span>
        </div>
      </div>

      {/* Product Details */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Product Image */}
          <div className="flex items-center justify-center bg-white rounded-lg shadow p-6">
            <img
              src={
                product.images?.[0]?.url ||
                '/placeholder.png'
              }
              alt={product.name}
              className="w-full h-auto object-cover rounded"
            />
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                {product.name}
              </h1>
              <p className="mt-2 text-xl text-gray-600">
                {product.description}
              </p>
            </div>

            {/* Pricing */}
            <div className="border-t border-b border-gray-200 py-4">
              <div className="text-3xl font-bold text-gray-900">
                £{(product.variants?.[0]?.prices?.[0]?.amount || product.price || 0) / 100}
              </div>
              <p className="text-sm text-gray-500 mt-1">
                {product.variants?.[0]?.in_stock
                  ? 'In Stock'
                  : 'Out of Stock'}
              </p>
            </div>

            {/* Quantity Selector */}
            <div className="flex items-center gap-4">
              <label className="text-sm font-medium text-gray-700">
                Quantity:
              </label>
              <div className="flex items-center border border-gray-300 rounded">
                <button
                  onClick={() =>
                    setQuantity(Math.max(1, quantity - 1))
                  }
                  className="px-3 py-2 text-gray-600 hover:bg-gray-100"
                >
                  −
                </button>
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) =>
                    setQuantity(
                      Math.max(1, parseInt(e.target.value) || 1)
                    )
                  }
                  className="w-12 text-center border-0 py-2"
                />
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3 py-2 text-gray-600 hover:bg-gray-100"
                >
                  +
                </button>
              </div>
            </div>

            {/* Add to Cart Button */}
            <button
              onClick={handleAddToCart}
              disabled={
                !product.variants?.[0]?.in_stock ||
                quantity === 0
              }
              className="w-full px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition"
            >
              Add to Cart
            </button>

            {/* Product Meta */}
            <div className="pt-6 border-t border-gray-200 space-y-2 text-sm">
              {product.sku && (
                <div className="flex justify-between">
                  <span className="text-gray-600">SKU:</span>
                  <span className="font-medium text-gray-900">
                    {product.sku}
                  </span>
                </div>
              )}
              {product.collection && (
                <div className="flex justify-between">
                  <span className="text-gray-600">
                    Collection:
                  </span>
                  <span className="font-medium text-gray-900">
                    {product.collection.name}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
