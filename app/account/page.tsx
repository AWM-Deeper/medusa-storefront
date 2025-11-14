'use client';

import { useState } from 'react';

export default function AccountPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLogin, setShowLogin] = useState(true);
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [signupData, setSignupData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Login attempted with:', loginData);
    setIsLoggedIn(true);
  };

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Signup attempted with:', signupData);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setLoginData({ email: '', password: '' });
  };

  if (isLoggedIn) {
    return (
      <div className="min-h-screen bg-white py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-4xl font-bold text-black">My Account</h1>
            <button
              onClick={handleLogout}
              className="px-6 py-2 bg-white text-black border-2 border-black hover:bg-black hover:text-white transition-colors font-semibold"
            >
              Sign Out
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Account Overview */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-gray-50 border border-gray-200 p-6">
                <h2 className="text-2xl font-bold text-black mb-6">Account Details</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-black mb-2">Name</label>
                    <input
                      type="text"
                      value="John Merchant"
                      className="w-full px-4 py-3 border-2 border-gray-300 focus:border-black focus:ring-2 focus:ring-black outline-none bg-white text-black"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-black mb-2">Email</label>
                    <input
                      type="email"
                      value="john@store.com"
                      className="w-full px-4 py-3 border-2 border-gray-300 focus:border-black focus:ring-2 focus:ring-black outline-none bg-white text-black"
                    />
                  </div>
                  <button className="w-full py-3 bg-black text-white hover:bg-gray-800 font-semibold transition-colors">
                    Update Profile
                  </button>
                </div>
              </div>

              <div className="bg-gray-50 border border-gray-200 p-6">
                <h2 className="text-2xl font-bold text-black mb-6">Order History</h2>
                <div className="space-y-4">
                  <div className="bg-white border border-gray-300 p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold text-black">Order #12345</span>
                      <span className="text-sm text-gray-600">Delivered</span>
                    </div>
                    <p className="text-sm text-gray-700 mb-2">Ordered on Nov 15, 2024</p>
                    <p className="text-black font-semibold">$125.00</p>
                  </div>
                  <div className="bg-white border border-gray-300 p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold text-black">Order #12344</span>
                      <span className="text-sm text-gray-600">In Transit</span>
                    </div>
                    <p className="text-sm text-gray-700 mb-2">Ordered on Nov 10, 2024</p>
                    <p className="text-black font-semibold">$89.00</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <div className="bg-gray-50 border border-gray-200 p-6">
                <h3 className="text-xl font-bold text-black mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  <button className="w-full py-3 bg-white text-black border-2 border-black hover:bg-black hover:text-white transition-colors font-semibold">
                    View Orders
                  </button>
                  <button className="w-full py-3 bg-white text-black border-2 border-black hover:bg-black hover:text-white transition-colors font-semibold">
                    Saved Items
                  </button>
                  <button className="w-full py-3 bg-white text-black border-2 border-black hover:bg-black hover:text-white transition-colors font-semibold">
                    Addresses
                  </button>
                </div>
              </div>

              <div className="bg-gray-50 border border-gray-200 p-6">
                <h3 className="text-xl font-bold text-black mb-4">Account Stats</h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-700">Total Orders</p>
                    <p className="text-2xl font-bold text-black">24</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-700">Total Spent</p>
                    <p className="text-2xl font-bold text-black">$2,456</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-700">Member Since</p>
                    <p className="text-lg font-semibold text-black">Jan 2024</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-black mb-2">
            {showLogin ? 'Welcome Back' : 'Create Account'}
          </h1>
          <p className="text-gray-700">
            {showLogin ? 'Sign in to your account' : 'Join HASTE today'}
          </p>
        </div>

        {showLogin ? (
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-black mb-2">Email</label>
              <input
                type="email"
                value={loginData.email}
                onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                className="w-full px-4 py-3 border-2 border-gray-300 focus:border-black focus:ring-2 focus:ring-black outline-none bg-white text-black"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-black mb-2">Password</label>
              <input
                type="password"
                value={loginData.password}
                onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                className="w-full px-4 py-3 border-2 border-gray-300 focus:border-black focus:ring-2 focus:ring-black outline-none bg-white text-black"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full py-3 bg-black text-white hover:bg-gray-800 font-semibold transition-colors"
            >
              Sign In
            </button>
            <div className="text-center">
              <button
                type="button"
                onClick={() => setShowLogin(false)}
                className="text-black hover:underline font-semibold"
              >
                Don't have an account? Sign up
              </button>
            </div>
          </form>
        ) : (
          <form onSubmit={handleSignup} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-black mb-2">Name</label>
              <input
                type="text"
                value={signupData.name}
                onChange={(e) => setSignupData({ ...signupData, name: e.target.value })}
                className="w-full px-4 py-3 border-2 border-gray-300 focus:border-black focus:ring-2 focus:ring-black outline-none bg-white text-black"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-black mb-2">Email</label>
              <input
                type="email"
                value={signupData.email}
                onChange={(e) => setSignupData({ ...signupData, email: e.target.value })}
                className="w-full px-4 py-3 border-2 border-gray-300 focus:border-black focus:ring-2 focus:ring-black outline-none bg-white text-black"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-black mb-2">Password</label>
              <input
                type="password"
                value={signupData.password}
                onChange={(e) => setSignupData({ ...signupData, password: e.target.value })}
                className="w-full px-4 py-3 border-2 border-gray-300 focus:border-black focus:ring-2 focus:ring-black outline-none bg-white text-black"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-black mb-2">Confirm Password</label>
              <input
                type="password"
                value={signupData.confirmPassword}
                onChange={(e) => setSignupData({ ...signupData, confirmPassword: e.target.value })}
                className="w-full px-4 py-3 border-2 border-gray-300 focus:border-black focus:ring-2 focus:ring-black outline-none bg-white text-black"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full py-3 bg-black text-white hover:bg-gray-800 font-semibold transition-colors"
            >
              Create Account
            </button>
            <div className="text-center">
              <button
                type="button"
                onClick={() => setShowLogin(true)}
                className="text-black hover:underline font-semibold"
              >
                Already have an account? Sign in
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
