'use client';

import React from 'react';
import Link from 'next/link';

const stats = [
  { label: 'Total Sales', value: '$12,480', delta: '+14% MoM' },
  { label: 'Orders', value: '284', delta: '+9% MoM' },
  { label: 'Units Sold', value: '1,063', delta: '+5% MoM' },
  { label: 'Conversion', value: '2.1%', delta: '+0.3pp' },
];

const recentOrders = [
  { id: 'ORD-10284', customer: 'Jane Doe', total: '$89.00', status: 'Paid', date: '2025-11-02' },
  { id: 'ORD-10283', customer: 'John Smith', total: '$149.00', status: 'Paid', date: '2025-11-02' },
  { id: 'ORD-10282', customer: 'Alice Brown', total: '$39.00', status: 'Pending', date: '2025-11-01' },
  { id: 'ORD-10281', customer: 'Mark Lee', total: '$219.00', status: 'Refunded', date: '2025-11-01' },
];

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top bar */}
      <div className="sticky top-0 z-30 bg-white/90 backdrop-blur border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-xl sm:text-2xl font-bold tracking-tight">Merchant Dashboard</span>
            <span className="hidden sm:inline-flex text-xs px-2 py-1 rounded bg-gray-100 text-gray-600">v1.0</span>
          </div>
          <div className="flex items-center gap-2">
            <Link href="/" className="text-sm font-semibold text-gray-700 hover:text-gray-900 px-3 py-2">Storefront</Link>
            <button className="text-sm font-semibold bg-gray-900 text-white hover:bg-black px-3 py-2 rounded-md">New Product</button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
        {/* KPI cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6">
          {stats.map((s) => (
            <div key={s.label} className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6 shadow-sm">
              <div className="text-xs uppercase tracking-wide text-gray-500 mb-1">{s.label}</div>
              <div className="text-lg sm:text-2xl font-bold text-gray-900">{s.value}</div>
              <div className="text-xs sm:text-sm text-emerald-600 mt-1">{s.delta}</div>
            </div>
          ))}
        </div>

        {/* Content grid */}
        <div className="mt-6 sm:mt-10 grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Orders table */}
          <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 shadow-sm">
            <div className="p-4 sm:p-6 border-b border-gray-100 flex items-center justify-between">
              <h2 className="text-base sm:text-lg font-bold">Recent Orders</h2>
              <button className="text-sm text-gray-600 hover:text-gray-900">View all</button>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead className="bg-gray-50 text-gray-600">
                  <tr>
                    <th className="px-4 sm:px-6 py-3 text-left font-semibold">Order</th>
                    <th className="px-4 sm:px-6 py-3 text-left font-semibold">Customer</th>
                    <th className="px-4 sm:px-6 py-3 text-left font-semibold">Total</th>
                    <th className="px-4 sm:px-6 py-3 text-left font-semibold">Status</th>
                    <th className="px-4 sm:px-6 py-3 text-left font-semibold">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {recentOrders.map((o) => (
                    <tr key={o.id} className="border-t border-gray-100">
                      <td className="px-4 sm:px-6 py-3 font-semibold text-gray-900">{o.id}</td>
                      <td className="px-4 sm:px-6 py-3 text-gray-700">{o.customer}</td>
                      <td className="px-4 sm:px-6 py-3 text-gray-900">{o.total}</td>
                      <td className="px-4 sm:px-6 py-3">
                        <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${
                          o.status === 'Paid' ? 'bg-emerald-100 text-emerald-700' :
                          o.status === 'Pending' ? 'bg-amber-100 text-amber-700' :
                          'bg-rose-100 text-rose-700'
                        }`}>{o.status}</span>
                      </td>
                      <td className="px-4 sm:px-6 py-3 text-gray-600">{o.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Right rail: actions and tips */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
              <h3 className="text-base font-bold mb-4">Quick Actions</h3>
              <div className="grid grid-cols-2 gap-3">
                <button className="h-10 rounded-md border border-gray-200 hover:bg-gray-50 text-sm font-semibold">Add Product</button>
                <button className="h-10 rounded-md border border-gray-200 hover:bg-gray-50 text-sm font-semibold">Create Discount</button>
                <button className="h-10 rounded-md border border-gray-200 hover:bg-gray-50 text-sm font-semibold">Manage Inventory</button>
                <button className="h-10 rounded-md border border-gray-200 hover:bg-gray-50 text-sm font-semibold">Configure Shipping</button>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
              <h3 className="text-base font-bold mb-2">Design Tips</h3>
              <ul className="text-sm text-gray-600 list-disc pl-5 space-y-1">
                <li>Use consistent spacing (4/6/8 spacing scale)</li>
                <li>Keep icons 16–20px for dense UIs</li>
                <li>Limit card shadows; rely on borders for clarity</li>
                <li>Use sm text in tables for compact density</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
