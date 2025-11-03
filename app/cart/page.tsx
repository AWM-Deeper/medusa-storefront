'use client';
import { useEffect } from 'react';
import { useStore } from '../../lib/store';
import Link from 'next/link';

export default function CartPage() {
  const { cartItems, orders, ordersLoading, fetchOrders } = useStore();
  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  // Use cart items from store, fall back to recent orders
  const displayItems = cartItems.length > 0 ? cartItems : [];
  const displayOrders = orders.slice(0, 5);

  const subtotal = displayItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
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
              <Link href="/" className="text-black hover:underline font-semibold">
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
                <div className="mb-8">
                  <h2 className="text-2xl font-bold mb-4 text-black">Recent Orders</h2>
                  <div className="space-y-4">
                    {displayOrders.map((order) => (
                      <div
                        key={order.id}
                        className="border border-gray-200 rounded-lg p-4 hover:shadow-lg transition-shadow"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-semibold text-gray-600">Order #{order.id}</span>
                          <span className={`text-xs px-2 py-1 rounded ${
                            order.status === 'fulfilled' ? 'bg-green-100 text-green-700' :
                            order.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                            'bg-red-100 text-red-700'
                          }`}>
                            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                          </span>
                        </div>
                        <p className="text-gray-600 text-sm mb-1">Date: {new Date(order.created_at).toLocaleDateString()}</p>
                        <p className="text-gray-600 text-sm mb-3">Items: {order.items?.length || 0}</p>
                        <p className="text-black font-semibold">Total: £{(order.total / 100).toFixed(2)}</p>
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
          <div className="border border-gray-200 rounded-lg p-6 sticky top-6 bg-white">
            <h2 className="text-2xl font-bold mb-6 text-black">Order Summary</h2>
            <div className="space-y-4 mb-6 border-b border-gray-200 pb-4">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span>£{subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Shipping</span>
                <span className={shipping === 0 ? 'text-green-600 font-semibold' : ''}>
                  £{shipping.toFixed(2)}
                  {shipping === 0 && <span className="ml-2 text-sm">(Free shipping)</span>}
                </span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Tax</span>
                <span>£{tax.toFixed(2)}</span>
              </div>
            </div>
            <div className="flex justify-between mb-6">
              <span className="text-xl font-bold text-black">Total</span>
              <span className="text-2xl font-bold text-black">£{total.toFixed(2)}</span>
            </div>
            <Link href="/checkout" className="block w-full bg-black text-white py-3 text-center font-semibold hover:bg-gray-800 transition-colors mb-3 rounded">
              Proceed to Checkout
            </Link>
            <Link href="/" className="block w-full text-center text-black hover:underline font-semibold py-2">
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
