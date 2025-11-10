'use client';

import { useState } from 'react';
import { useStore } from '../../lib/store';

function formatCurrency(value: number) {
  return new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP'
  }).format(value);
}

export default function DashboardPage() {
  const { orders = [] } = useStore();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100/50 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-slate-900 mb-2">Dashboard</h1>
        <p className="text-slate-600 mb-8">Real-time insights and store management</p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white/80 backdrop-blur-sm border border-white/20 rounded-lg p-6">
            <p className="text-sm font-medium text-slate-600 mb-2">Total Sales</p>
            <p className="text-3xl font-bold text-slate-900">£0</p>
          </div>
          <div className="bg-white/80 backdrop-blur-sm border border-white/20 rounded-lg p-6">
            <p className="text-sm font-medium text-slate-600 mb-2">Total Orders</p>
            <p className="text-3xl font-bold text-slate-900">{orders?.length || 0}</p>
          </div>
          <div className="bg-white/80 backdrop-blur-sm border border-white/20 rounded-lg p-6">
            <p className="text-sm font-medium text-slate-600 mb-2">Status</p>
            <p className="text-3xl font-bold text-emerald-600">Active</p>
          </div>
        </div>
        
        <div className="bg-white/80 backdrop-blur-sm border border-white/20 rounded-lg p-6">
          <h2 className="text-xl font-semibold text-slate-900 mb-4">Recent Orders</h2>
          <p className="text-slate-600">Dashboard is loading. Check back soon for more insights.</p>
        </div>
      </div>
    </div>
  );
}
