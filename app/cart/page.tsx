'use client';

import { useState } from 'react';
import Link from 'next/link';

interface CartItem {
  id: string;
  title: string;
  price: number;
  quantity: number;
  image: string;
}

export default function CartPage() {
  const [items, setItems] = useState<CartItem[]>([
    {
      id: '1',
      title: 'Premium Cotton T-Shirt',
      price: 49.99,
      quantity: 2,
      image: 'https://via.placeholder.com/100',
    },
    {
      id: '2',
      title: 'Classic Denim Jeans',
      price: 89.99,
      quantity: 1,
      image: 'https://via.placeholder.com/100',
    },
  ]);

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity === 0) {
      setItems(items.filter((item) => item.id !== id));
    } else {
      setItems(
        items.map((item) =>
          item.id === id ? { ...item, quantity } : item
        )
      );
    }
  };

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal > 50 ? 0 : 10;
  const tax = subtotal * 0.1;
  const total = subtotal + shipping + tax;

  return (
    <main className="max-w-7xl mx-auto p-6 md:p-8">
      <h1 className="text-4xl font-bold mb-8 text-black">Shopping Bag</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2">
          {items.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 mb-4">Your bag is empty</p>
              <Link href="/" className="text-black hover:underline font-semibold">
                Continue Shopping
              </Link>
            </div>
          ) : (
            <div className="space-y-4 border-b border-gray-200 pb-8">
              {items.map((item) => (
                <div key={item.id} className="flex gap-4 pb-4 border-b border-gray-100">
                  <div className="w-24 h-24 bg-gray-100 flex-shrink-0">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-black">{item.title}</h3>
                    <p className="text-gray-600 mt-1">£{item.price}</p>
                    <div className="flex items-center gap-3 mt-3">
                      <label className="text-sm text-gray-600">Quantity:</label>
                      <input
                        type="number"
                        min="1"
                        max="10"
                        value={item.quantity}
                        onChange={(e) =>
                          updateQuantity(item.id, parseInt(e.target.value))
                        }
                        className="w-12 p-1 border border-gray-200 text-center"
                      />
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-black">£{(item.price * item.quantity).toFixed(2)}</p>
                    <button
                      onClick={() => updateQuantity(item.id, 0)}
                      className="text-sm text-red-600 hover:underline mt-2"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="border border-gray-200 p-6 sticky top-4">
            <h2 className="text-lg font-bold mb-6 text-black">Order Summary</h2>
            <div className="space-y-3 text-sm mb-6">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span className="text-black font-semibold">£{subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping</span>
                <span className="text-black font-semibold">
                  {shipping === 0 ? 'FREE' : `£${shipping.toFixed(2)}`}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Tax</span>
                <span className="text-black font-semibold">£{tax.toFixed(2)}</span>
              </div>
              <hr className="my-3" />
              <div className="flex justify-between text-base font-bold">
                <span className="text-black">Total</span>
                <span className="text-black">£{total.toFixed(2)}</span>
              </div>
            </div>
            <Link href="/checkout" className="w-full bg-black text-white py-3 font-semibold text-center block hover:bg-gray-800 transition-colors">
              Proceed to Checkout
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
