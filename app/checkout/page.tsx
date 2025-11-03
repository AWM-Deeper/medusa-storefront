'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function CheckoutPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    street: '',
    city: '',
    postcode: '',
    country: '',
    cardNumber: '',
    cardExpiry: '',
    cardCVC: '',
  });

  const [orderPlaced, setOrderPlaced] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Send order to backend
      const response = await fetch('https://stingray-app-yitsm.ondigitalocean.app/admin/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      
      if (response.ok) {
        setOrderPlaced(true);
      }
    } catch (error) {
      console.error('Error placing order:', error);
    }
  };

  if (orderPlaced) {
    return (
      <main className="max-w-2xl mx-auto p-6 md:p-8 text-center">
        <div className="py-12">
          <h1 className="text-4xl font-bold mb-4 text-black">Order Confirmed!</h1>
          <p className="text-lg text-gray-600 mb-8">Thank you for your purchase. Your order has been placed successfully.</p>
          <Link href="/" className="inline-block bg-black text-white px-8 py-3 font-semibold hover:bg-gray-800 transition-colors">
            Continue Shopping
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="max-w-7xl mx-auto p-6 md:p-8">
      <h1 className="text-4xl font-bold mb-8 text-black">Checkout</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Checkout Form */}
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Delivery Address */}
            <section>
              <h2 className="text-xl font-bold mb-4 text-black">Delivery Address</h2>
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                  className="p-3 border border-gray-300 focus:border-black outline-none"
                />
                <input
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                  className="p-3 border border-gray-300 focus:border-black outline-none"
                />
              </div>
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full mt-4 p-3 border border-gray-300 focus:border-black outline-none"
              />
              <input
                type="tel"
                name="phone"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleChange}
                required
                className="w-full mt-4 p-3 border border-gray-300 focus:border-black outline-none"
              />
              <input
                type="text"
                name="street"
                placeholder="Street Address"
                value={formData.street}
                onChange={handleChange}
                required
                className="w-full mt-4 p-3 border border-gray-300 focus:border-black outline-none"
              />
              <div className="grid grid-cols-2 gap-4 mt-4">
                <input
                  type="text"
                  name="city"
                  placeholder="City"
                  value={formData.city}
                  onChange={handleChange}
                  required
                  className="p-3 border border-gray-300 focus:border-black outline-none"
                />
                <input
                  type="text"
                  name="postcode"
                  placeholder="Postcode"
                  value={formData.postcode}
                  onChange={handleChange}
                  required
                  className="p-3 border border-gray-300 focus:border-black outline-none"
                />
              </div>
            </section>

            {/* Payment */}
            <section>
              <h2 className="text-xl font-bold mb-4 text-black">Payment Details</h2>
              <input
                type="text"
                name="cardNumber"
                placeholder="Card Number"
                value={formData.cardNumber}
                onChange={handleChange}
                required
                className="w-full p-3 border border-gray-300 focus:border-black outline-none"
              />
              <div className="grid grid-cols-2 gap-4 mt-4">
                <input
                  type="text"
                  name="cardExpiry"
                  placeholder="MM/YY"
                  value={formData.cardExpiry}
                  onChange={handleChange}
                  required
                  className="p-3 border border-gray-300 focus:border-black outline-none"
                />
                <input
                  type="text"
                  name="cardCVC"
                  placeholder="CVC"
                  value={formData.cardCVC}
                  onChange={handleChange}
                  required
                  className="p-3 border border-gray-300 focus:border-black outline-none"
                />
              </div>
            </section>
          </form>
        </div>

        {/* Order Summary Sidebar */}
        <div className="lg:col-span-1">
          <div className="border border-gray-200 p-6 sticky top-4">
            <h2 className="text-lg font-bold mb-6 text-black">Order Summary</h2>
            <div className="space-y-3 text-sm mb-6">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span className="text-black font-semibold">£129.98</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping</span>
                <span className="text-black font-semibold">FREE</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Tax</span>
                <span className="text-black font-semibold">£13.00</span>
              </div>
              <hr className="my-3" />
              <div className="flex justify-between text-base font-bold">
                <span className="text-black">Total</span>
                <span className="text-black">£142.98</span>
              </div>
            </div>
            <button
              onClick={handleSubmit}
              className="w-full bg-black text-white py-3 font-semibold hover:bg-gray-800 transition-colors"
            >
              Place Order
            </button>
            <Link href="/cart" className="block text-center mt-3 text-black underline text-sm">
              Back to Cart
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
