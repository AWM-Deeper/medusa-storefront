'use client';
import React, { useState } from 'react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h1 className="text-6xl font-bold text-white mb-6">
            Get in <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">Touch</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Have a question? We're here to help. Reach out and we'll get back to you within 24 hours.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20">
            <h2 className="text-3xl font-bold text-white mb-6">Send us a Message</h2>
            
            {submitted && (
              <div className="mb-6 p-4 bg-green-500/20 border border-green-500/50 rounded-xl text-green-300">
                ✓ Message sent successfully! We'll get back to you soon.
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Your Name *</label>
                <input type="text" name="name" required value={formData.name} onChange={handleChange}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="John Doe" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Email Address *</label>
                <input type="email" name="email" required value={formData.email} onChange={handleChange}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="john@example.com" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Subject *</label>
                <select name="subject" required value={formData.subject} onChange={handleChange}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-500">
                  <option value="" className="bg-slate-800">Select a subject</option>
                  <option value="order" className="bg-slate-800">Order Inquiry</option>
                  <option value="product" className="bg-slate-800">Product Question</option>
                  <option value="return" className="bg-slate-800">Returns & Refunds</option>
                  <option value="technical" className="bg-slate-800">Technical Support</option>
                  <option value="merchant" className="bg-slate-800">Become a Merchant</option>
                  <option value="other" className="bg-slate-800">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Message *</label>
                <textarea name="message" required value={formData.message} onChange={handleChange} rows={6}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
                  placeholder="Tell us how we can help..." />
              </div>

              <button type="submit"
                className="w-full px-8 py-4 bg-gradient-to-r from-purple-600 to-cyan-600 text-white font-semibold rounded-xl hover:shadow-2xl hover:scale-105 transition-all duration-300">
                Send Message
              </button>
            </form>
          </div>

          <div className="space-y-8">
            <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20">
              <h3 className="text-2xl font-bold text-white mb-6">Contact Information</h3>
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="text-3xl mr-4">📧</div>
                  <div>
                    <div className="font-semibold text-white mb-1">Email</div>
                    <a href="mailto:support@gohaste.com" className="text-cyan-400 hover:text-cyan-300">support@gohaste.com</a>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="text-3xl mr-4">💬</div>
                  <div>
                    <div className="font-semibold text-white mb-1">Live Chat</div>
                    <div className="text-gray-300">Available Mon-Fri, 9am-6pm GMT</div>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="text-3xl mr-4">⏱️</div>
                  <div>
                    <div className="font-semibold text-white mb-1">Response Time</div>
                    <div className="text-gray-300">Within 24 hours</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-purple-600/20 to-cyan-600/20 backdrop-blur-lg rounded-3xl p-8 border border-white/20">
              <h3 className="text-2xl font-bold text-white mb-4">Frequently Asked Questions</h3>
              <p className="text-gray-300 mb-4">Looking for quick answers? Check out our FAQ section for common questions.</p>
              <button className="text-cyan-400 hover:text-cyan-300 font-semibold">View FAQ →</button>
            </div>

            <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20">
              <h3 className="text-2xl font-bold text-white mb-4">Merchant Inquiries</h3>
              <p className="text-gray-300 mb-4">Interested in selling on HASTE? We'd love to hear from you.</p>
              <a href="mailto:merchants@gohaste.com" className="text-cyan-400 hover:text-cyan-300 font-semibold">merchants@gohaste.com →</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
