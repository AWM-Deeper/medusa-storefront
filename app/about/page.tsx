import React from "react";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-black mb-6">
            About <span className="text-gray-800">HASTE</span>
          </h1>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Delivering the finest curated collection at lightning speed
          </p>
        </div>

        {/* Mission Section */}
        <div className="max-w-4xl mx-auto mb-16 p-8 bg-gray-50 rounded-lg border border-gray-200">
          <h2 className="text-3xl font-bold text-black mb-6">Our Mission</h2>
          <p className="text-lg text-gray-700 leading-relaxed mb-4">
            HASTE is revolutionizing e-commerce by combining multiple premium stores into one seamless marketplace. 
            We believe shopping should be fast, secure, and delightful.
          </p>
          <p className="text-lg text-gray-700 leading-relaxed">
            Our platform connects you with trusted merchants, ensuring every product meets our high standards 
            for quality and authenticity.
          </p>
        </div>

        {/* Values Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="p-8 bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="text-4xl mb-4">⚡</div>
            <h3 className="text-2xl font-bold text-black mb-4">Lightning Fast</h3>
            <p className="text-gray-700">
              Orders processed instantly with same-day dispatch and 24-hour delivery on most items.
            </p>
          </div>

          <div className="p-8 bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="text-4xl mb-4">🔒</div>
            <h3 className="text-2xl font-bold text-black mb-4">Secure Shopping</h3>
            <p className="text-gray-700">
              Bank-level encryption, secure payments, and buyer protection on every transaction.
            </p>
          </div>

          <div className="p-8 bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="text-4xl mb-4">✓</div>
            <h3 className="text-2xl font-bold text-black mb-4">Curated Quality</h3>
            <p className="text-gray-700">
              Every merchant is vetted and every product is checked for authenticity and quality.
            </p>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center py-12 bg-gray-50 rounded-lg border border-gray-200">
          <h2 className="text-3xl font-bold text-black mb-4">Ready to Experience HASTE?</h2>
          <p className="text-lg text-gray-700 mb-8">Start shopping from our curated collection of premium stores.</p>
          <Link 
            href="/" 
            className="inline-block px-8 py-3 bg-black text-white font-semibold rounded-lg hover:bg-gray-800 transition-colors"
          >
            Browse Products
          </Link>
        </div>
      </div>
    </div>
  );
}
