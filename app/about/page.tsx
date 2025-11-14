import React from 'react';
import Link from 'next/link';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h1 className="text-6xl font-bold text-white mb-6">
            About <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">HASTE</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Delivering the finest curated collection at lightning speed
          </p>
        </div>

        <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-12 mb-12 border border-white/20">
          <h2 className="text-3xl font-bold text-white mb-6">Our Mission</h2>
          <p className="text-lg text-gray-300 leading-relaxed mb-4">
            HASTE is revolutionizing e-commerce by combining multiple premium stores into one seamless marketplace. 
            We believe shopping should be fast, secure, and delightful.
          </p>
          <p className="text-lg text-gray-300 leading-relaxed">
            Our platform connects you with trusted merchants, ensuring every product meets our high standards 
            for quality and authenticity.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
            <div className="text-4xl mb-4">⚡</div>
            <h3 className="text-2xl font-bold text-white mb-3">Lightning Fast</h3>
            <p className="text-gray-300">
              Orders processed instantly with same-day dispatch and 24-hour delivery on most items.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
            <div className="text-4xl mb-4">🔒</div>
            <h3 className="text-2xl font-bold text-white mb-3">Secure Shopping</h3>
            <p className="text-gray-300">
              Bank-level encryption, secure payments, and buyer protection on every transaction.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
            <div className="text-4xl mb-4">✨</div>
            <h3 className="text-2xl font-bold text-white mb-3">Curated Quality</h3>
            <p className="text-gray-300">
              Every merchant is verified and every product is checked for authenticity and quality.
            </p>
          </div>
        </div>

        <div className="bg-gradient-to-r from-purple-600/20 to-cyan-600/20 backdrop-blur-lg rounded-3xl p-12 mb-12 border border-white/20">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-white mb-2">50K+</div>
              <div className="text-gray-300">Happy Customers</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-white mb-2">100+</div>
              <div className="text-gray-300">Merchant Partners</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-white mb-2">10K+</div>
              <div className="text-gray-300">Products</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-white mb-2">4.9★</div>
              <div className="text-gray-300">Average Rating</div>
            </div>
          </div>
        </div>

        <div className="text-center">
          <Link
            href="/"
            className="inline-block px-12 py-4 bg-gradient-to-r from-purple-600 to-cyan-600 text-white text-lg font-semibold rounded-full hover:shadow-2xl hover:scale-105 transition-all duration-300"
          >
            Start Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}
