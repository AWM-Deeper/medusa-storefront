'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

type CartItem = {
  product_id: string;
  title: string;
  price: number;
  quantity: number;
  image_url?: string;
};

const CartPage = () => {
  const router = useRouter();
  const [cartItems, setCartItems] = useState<CartItem>([
    {
      product_id: '1',
      title: 'Premium Headphones',
      price: 19999,
      quantity: 1,
    },
    {
      product_id: '2',
      title: 'Wireless Mouse',
      price: 4999,
      quantity: 2,
    },
  ]);

  const updateQuantity = (productId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeItem(productId);
    } else {
      setCartItems(
        cartItems.map((item) =>
          item.product_id === productId
            ? { ...item, quantity: newQuantity }
            : item
        )
      );
    }
  };

  const removeItem = (productId: string) => {
    setCartItems(cartItems.filter((item) => item.product_id !== productId));
  };

  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const tax = Math.round(subtotal * 0.1);
  const total = subtotal + tax;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-3 sm:px-6 sm:py-4">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <Link
              href="/"
              className="text-blue-500 hover:text-blue-700 text-sm sm:text-base font-semibold"
            >
              ← Back
            </Link>
          </div>
          <h1 className="text-lg sm:text-2xl font-bold text-gray-900 text-center flex-1">
            Shopping Cart
          </h1>
          <div className="flex-1"></div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 sm:py-8">
        {cartItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16">
            <p className="text-gray-600 text-lg mb-6">Your cart is empty</p>
            <Link
              href="/"
              className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map((item) => (
                <div
                  key={item.product_id}
                  className="bg-white rounded-lg border border-gray-200 p-4 flex items-center gap-4"
                >
                  <div className="flex-1">
                    <h3 className="text-base sm:text-lg font-semibold text-gray-900 line-clamp-2 mb-1">
                      {item.title}
                    </h3>
                    <p className="text-sm sm:text-base text-green-600 font-semibold">
                      ${(item.price / 100).toFixed(2)}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => updateQuantity(item.product_id, item.quantity - 1)}
                      className="w-9 h-9 sm:w-10 sm:h-10 rounded-md bg-gray-100 hover:bg-gray-200 text-gray-900 font-bold flex items-center justify-center transition-colors"
                    >
                      −
                    </button>
                    <span className="w-8 text-center text-sm font-semibold text-gray-900">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.product_id, item.quantity + 1)}
                      className="w-9 h-9 sm:w-10 sm:h-10 rounded-md bg-gray-100 hover:bg-gray-200 text-gray-900 font-bold flex items-center justify-center transition-colors"
                    >
                      +
                    </button>
                  </div>
                  <button
                    onClick={() => removeItem(item.product_id)}
                    className="w-9 h-9 sm:w-10 sm:h-10 rounded-md bg-red-100 hover:bg-red-200 text-red-600 font-bold flex items-center justify-center transition-colors ml-2"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="bg-white rounded-lg border border-gray-200 p-6 h-fit sticky top-4">
              <h2 className="text-lg font-bold text-gray-900 mb-6">Order Summary</h2>
              <div className="space-y-4 mb-6 pb-6 border-b border-gray-200">
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Subtotal</span>
                  <span>${(subtotal / 100).toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Tax (10%)</span>
                  <span>${(tax / 100).toFixed(2)}</span>
                </div>
              </div>
              <div className="flex justify-between text-lg font-bold text-gray-900 mb-6">
                <span>Total</span>
                <span className="text-green-600">${(total / 100).toFixed(2)}</span>
              </div>
              <Link
                href="/checkout"
                className="block w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold text-center transition-colors mb-3"
              >
                Proceed to Checkout
              </Link>
              <Link
                href="/"
                className="block w-full bg-gray-100 hover:bg-gray-200 text-gray-900 py-3 rounded-lg font-semibold text-center transition-colors"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;
