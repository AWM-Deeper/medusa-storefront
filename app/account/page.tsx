"use client";

import { useState } from "react";

export default function AccountPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLogin, setShowLogin] = useState(true);
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [signupData, setSignupData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate login
    console.log("Login attempted with:", loginData);
    setIsLoggedIn(true);
  };

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate signup
    console.log("Signup attempted with:", signupData);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setLoginData({ email: "", password: "" });
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-black to-cyan-900 py-20 px-4">
        <div className="max-w-md mx-auto">
          <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20">
            <h1 className="text-4xl font-bold text-white mb-8 text-center">
              {showLogin ? "Welcome Back" : "Create Account"}
            </h1>

            {showLogin ? (
              <form onSubmit={handleLogin} className="space-y-6">
                <div>
                  <label className="block text-white mb-2">Email</label>
                  <input
                    type="email"
                    value={loginData.email}
                    onChange={(e) =>
                      setLoginData({ ...loginData, email: e.target.value })
                    }
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                    placeholder="your@email.com"
                    required
                  />
                </div>

                <div>
                  <label className="block text-white mb-2">Password</label>
                  <input
                    type="password"
                    value={loginData.password}
                    onChange={(e) =>
                      setLoginData({ ...loginData, password: e.target.value })
                    }
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                    placeholder="••••••••"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full px-6 py-3 bg-gradient-to-r from-purple-600 to-cyan-600 text-white font-semibold rounded-xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
                >
                  Sign In
                </button>

                <p className="text-center text-white/70">
                  Don't have an account?{" "}
                  <button
                    type="button"
                    onClick={() => setShowLogin(false)}
                    className="text-cyan-400 hover:text-cyan-300 font-semibold"
                  >
                    Sign Up
                  </button>
                </p>
              </form>
            ) : (
              <form onSubmit={handleSignup} className="space-y-6">
                <div>
                  <label className="block text-white mb-2">Full Name</label>
                  <input
                    type="text"
                    value={signupData.name}
                    onChange={(e) =>
                      setSignupData({ ...signupData, name: e.target.value })
                    }
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                    placeholder="John Doe"
                    required
                  />
                </div>

                <div>
                  <label className="block text-white mb-2">Email</label>
                  <input
                    type="email"
                    value={signupData.email}
                    onChange={(e) =>
                      setSignupData({ ...signupData, email: e.target.value })
                    }
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                    placeholder="your@email.com"
                    required
                  />
                </div>

                <div>
                  <label className="block text-white mb-2">Password</label>
                  <input
                    type="password"
                    value={signupData.password}
                    onChange={(e) =>
                      setSignupData({ ...signupData, password: e.target.value })
                    }
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                    placeholder="••••••••"
                    required
                  />
                </div>

                <div>
                  <label className="block text-white mb-2">Confirm Password</label>
                  <input
                    type="password"
                    value={signupData.confirmPassword}
                    onChange={(e) =>
                      setSignupData({
                        ...signupData,
                        confirmPassword: e.target.value,
                      })
                    }
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                    placeholder="••••••••"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full px-6 py-3 bg-gradient-to-r from-purple-600 to-cyan-600 text-white font-semibold rounded-xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
                >
                  Create Account
                </button>

                <p className="text-center text-white/70">
                  Already have an account?{" "}
                  <button
                    type="button"
                    onClick={() => setShowLogin(true)}
                    className="text-cyan-400 hover:text-cyan-300 font-semibold"
                  >
                    Sign In
                  </button>
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Account Dashboard
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-black to-cyan-900 py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-white">My Account</h1>
          <button
            onClick={handleLogout}
            className="px-6 py-2 bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl text-white hover:bg-white/20 transition-all duration-300"
          >
            Logout
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Card */}
          <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-6 border border-white/20">
            <h2 className="text-2xl font-bold text-white mb-4">Profile</h2>
            <div className="space-y-4">
              <div>
                <p className="text-white/70 mb-1">Name</p>
                <p className="text-white font-semibold">John Doe</p>
              </div>
              <div>
                <p className="text-white/70 mb-1">Email</p>
                <p className="text-white font-semibold">john@example.com</p>
              </div>
              <button className="w-full px-4 py-2 bg-gradient-to-r from-purple-600 to-cyan-600 text-white rounded-xl hover:shadow-xl transition-all duration-300">
                Edit Profile
              </button>
            </div>
          </div>

          {/* Orders Card */}
          <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-6 border border-white/20">
            <h2 className="text-2xl font-bold text-white mb-4">Recent Orders</h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-white font-semibold">Order #12345</p>
                  <p className="text-white/70 text-sm">Delivered</p>
                </div>
                <p className="text-cyan-400 font-bold">$89.99</p>
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-white font-semibold">Order #12344</p>
                  <p className="text-white/70 text-sm">In Transit</p>
                </div>
                <p className="text-cyan-400 font-bold">$124.50</p>
              </div>
              <button className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-xl text-white hover:bg-white/20 transition-all duration-300">
                View All Orders
              </button>
            </div>
          </div>

          {/* Addresses Card */}
          <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-6 border border-white/20">
            <h2 className="text-2xl font-bold text-white mb-4">Addresses</h2>
            <div className="space-y-4">
              <div>
                <p className="text-white font-semibold mb-1">Default Address</p>
                <p className="text-white/70 text-sm">
                  123 Main Street<br />
                  New York, NY 10001<br />
                  United States
                </p>
              </div>
              <button className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-xl text-white hover:bg-white/20 transition-all duration-300">
                Manage Addresses
              </button>
            </div>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="mt-6 bg-white/10 backdrop-blur-lg rounded-3xl p-6 border border-white/20">
          <h2 className="text-2xl font-bold text-white mb-4">Payment Methods</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center justify-between p-4 bg-white/5 border border-white/10 rounded-xl">
              <div>
                <p className="text-white font-semibold">Visa ending in 4242</p>
                <p className="text-white/70 text-sm">Expires 12/25</p>
              </div>
              <span className="text-cyan-400 text-sm font-semibold">Default</span>
            </div>
            <button className="flex items-center justify-center p-4 bg-white/5 border border-white/10 border-dashed rounded-xl text-white hover:bg-white/10 transition-all duration-300">
              + Add Payment Method
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
