'use client';

import { useEffect } from 'react';
import { useStore } from '@/lib/store';
import Link from 'next/link';

export default function CartPage() {
  const { cartItems, orders, ordersLoading, fetchOrders } = useStore();

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  // Use cart items from store, fall back to recent orders
  const displayItems = cartItems.length > 0 ? cartItems : [];
  const displayOrders = orders.slice(0, 5);

  const subtotal = displayItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal > 50 ? 0 : 10;
  const tax = subtotal * 0.1;
  const total = subtotal + shipping + tax;

  return (
    <main className="max-w-7xl mx-auto p-6 md:p-8">
      <h1 className="text-4xl font-bold mb-8 text-black">Shopping Bag & Recent Orders</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items / Orders */}
        <div className="lg:col-span-2">
          {displayItems.length === 0 && displayOrders.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 mb-4">Your bag is empty and no recent orders</p>
              <Link className="text-black hover:underline font-semibold" href="/">
                Continue Shopping
              </Link>
            </div>
          ) : (
            <>
              {/* Cart Items Section */}
              {displayItems.length > 0 && (
                <div className="mb-8">
                  <h2 className="text-2xl font-bold mb-4 text-black">Cart Items</h2>
                  <div className="space-y-4 border-b border-gray-200 pb-8">
                    {displayItems.map((item) => (
                      <div
                        key={item.id}
                        className="flex gap-4 pb-4 border-b border-gray-100"
                      >
                        <div className="w-24 h-24 bg-gray-100 flex-shrink-0">
                          {item.images?.[0]?.url && (
                            <img
                              src={item.images[0].url}
                              alt={item.title}
                              className="w-full h-full object-cover"
                            />
                          )}
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-black">{item.title}</h3>
                          <p className="text-gray-600 mt-1">£{item.price}</p>
                          <div className="flex items-center gap-3 mt-3">
                            <label className="text-sm text-gray-600">Quantity:</label>
                            <span className="w-12 p-1 border border-gray-200 text-center">
                              {item.quantity}
                            </span>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-black">
                            £{(item.price * item.quantity).toFixed(2)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Recent Orders Section */}
              {displayOrders.length > 0 && (
                <div>
                  <h2 className="text-2xl font-bold mb-4 text-black">Recent Orders</h2>
                  <div className="space-y-4">
                    {displayOrders.map((order) => (
                      <div
                        key={order.id}
                        className="border border-gray-200 p-4 rounded"
                      >
                        <div className="flex justify-between items-center mb-2">
                          <h3 className="font-semibold text-black">
                            Order {order.order_number || order.id}
                          </h3>
                          <span className="text-sm text-gray-600">
                            {order.status || 'Pending'}
                          </span>
                        </div>
                        <p className="text-gray-600 text-sm">
                          {order.created_at
                            ? new Date(order.created_at).toLocaleDateString()
                            : 'Date unknown'}
                        </p>
                        <p className="text-lg font-bold text-black mt-2">
                          £{(order.total || 0).toFixed(2)}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
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
            <Link
              className="w-full bg-black text-white py-3 font-semibold text-center block hover:bg-gray-800 transition-colors"
              href="/checkout"
            >
              Proceed to Checkout
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
