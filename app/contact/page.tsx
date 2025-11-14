"use client";

import React, { useState } from "react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-black mb-6">
            Get in <span className="text-gray-800">Touch</span>
          </h1>
          <p className="text-xl text-gray-700 max-w-2xl mx-auto">
            Have a question? We're here to help. Reach out and we'll get back to you within 24 hours.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-white rounded-lg border border-gray-200 p-8 shadow-sm">
            <h2 className="text-3xl font-bold text-black mb-6">Send us a Message</h2>

            {submitted && (
              <div className="mb-6 p-4 bg-green-50 border border-green-500/20 rounded-lg text-green-700">
                ✓ Message sent successfully! We'll get back to you soon.
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-black mb-2">Your Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                  placeholder="John Doe"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-black mb-2">Email Address *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                  placeholder="john@example.com"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-black mb-2">Subject *</label>
                <select
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                  required
                >
                  <option value="">Select a subject</option>
                  <option value="order">Order Inquiry</option>
                  <option value="product">Product Question</option>
                  <option value="returns">Returns & Refunds</option>
                  <option value="support">Technical Support</option>
                  <option value="merchant">Become a Merchant</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-black mb-2">Message *</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={6}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent resize-none"
                  placeholder="Tell us how we can help..."
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full px-6 py-3 bg-black text-white font-semibold rounded-lg hover:bg-gray-800 transition-colors"
              >
                Send Message
              </button>
            </form>
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            <div className="bg-gray-50 rounded-lg border border-gray-200 p-8">
              <h3 className="text-2xl font-bold text-black mb-6">Contact Information</h3>
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="text-2xl mr-4">📧</div>
                  <div>
                    <h4 className="font-semibold text-black mb-1">Email</h4>
                    <a href="mailto:support@gohaste.com" className="text-gray-700 hover:text-black">
                      support@gohaste.com
                    </a>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="text-2xl mr-4">💬</div>
                  <div>
                    <h4 className="font-semibold text-black mb-1">Live Chat</h4>
                    <p className="text-gray-700">Available Mon-Fri, 9am-5pm GMT</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="text-2xl mr-4">⏱️</div>
                  <div>
                    <h4 className="font-semibold text-black mb-1">Response Time</h4>
                    <p className="text-gray-700">Within 24 hours</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-8">
              <h3 className="text-2xl font-bold text-black mb-4">Frequently Asked Questions</h3>
              <p className="text-gray-700 mb-4">
                Looking for quick answers? Check out our FAQ section for common questions.
              </p>
              <button className="text-black font-semibold hover:underline">View FAQ →</button>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-8">
              <h3 className="text-2xl font-bold text-black mb-4">Merchant Inquiries</h3>
              <p className="text-gray-700 mb-4">
                Interested in selling on HASTE? We'd love to hear from you.
              </p>
              <a href="mailto:merchants@gohaste.com" className="text-black font-semibold hover:underline">
                merchants@gohaste.com →
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
