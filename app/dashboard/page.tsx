'use client';
import { useEffect, useState } from 'react';
import { useStore } from '../../lib/store';
import Link from 'next/link';

function formatCurrency(value: number) {
  return new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP',
  }).format(value);
}

function getStatusColor(status?: string) {
  switch (status?.toLowerCase()) {
    case 'paid':
    case 'completed':
    case 'processing':
      return 'bg-emerald-100/60 text-emerald-700 border border-emerald-200';
    case 'pending':
    case 'on hold':
      return 'bg-amber-100/60 text-amber-700 border border-amber-200';
    case 'refunded':
    case 'cancelled':
      return 'bg-rose-100/60 text-rose-700 border border-rose-200';
    default:
      return 'bg-gray-100/60 text-gray-700 border border-gray-200';
  }
}

function getStatusIcon(status?: string) {
  switch (status?.toLowerCase()) {
    case 'completed':
      return '✓';
    case 'processing':
      return '⟳';
    case 'pending':
      return '○';
    case 'cancelled':
      return '✕';
    default:
      return '•';
  }
}

export default function DashboardPage() {
  const { orders = [], kpiData } = useStore();
  const [displayOrders, setDisplayOrders] = useState<any[]>([]);

  useEffect(() => {
    if (orders && Array.isArray(orders)) {
      setDisplayOrders(orders.slice(0, 10));
    }
  }, [orders]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100/50">
      {/* Sidebar Navigation */}
      <div className="fixed left-0 top-0 h-screen w-64 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 backdrop-blur-xl border-r border-white/10 p-6">
        <div className="space-y-8">
          {/* Logo & Branding */}
          <div>
            <h1 className="text-2xl font-bold text-white">HASTE</h1>
            <p className="text-xs text-slate-400 mt-1">Merchant Console</p>
          </div>

          {/* Navigation Sections */}
          <nav className="space-y-8">
            {/* Main Section */}
            <div>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4">Main</p>
              <div className="space-y-3">
                <div className="flex items-center gap-3 px-4 py-2 rounded-lg bg-white/10 text-white">
                  <span className="text-sm">📊</span>
                  <span className="text-sm font-medium">Dashboard</span>
                </div>
                <Link href="#" className="flex items-center gap-3 px-4 py-2 rounded-lg text-slate-300 hover:bg-white/5 transition-colors">
                  <span className="text-sm">📦</span>
                  <span className="text-sm font-medium">Orders</span>
                </Link>
                <Link href="#" className="flex items-center gap-3 px-4 py-2 rounded-lg text-slate-300 hover:bg-white/5 transition-colors">
                  <span className="text-sm">📈</span>
                  <span className="text-sm font-medium">Analytics</span>
                </Link>
              </div>
            </div>

            {/* Products Section */}
            <div>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4">Products</p>
              <div className="space-y-3">
                <Link href="#" className="flex items-center gap-3 px-4 py-2 rounded-lg text-slate-300 hover:bg-white/5 transition-colors">
                  <span className="text-sm">🛍️</span>
                  <span className="text-sm font-medium">Catalog</span>
                </Link>
                <Link href="#" className="flex items-center gap-3 px-4 py-2 rounded-lg text-slate-300 hover:bg-white/5 transition-colors">
                  <span className="text-sm">📋</span>
                  <span className="text-sm font-medium">Inventory</span>
                </Link>
              </div>
            </div>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="ml-64 p-8">
        {/* Top Header */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-slate-900 mb-2">Dashboard</h2>
          <p className="text-slate-600">Real-time insights and store management</p>
        </div>

        {/* KPI Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
          {/* Total Sales Card */}
          <div className="group relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-lg blur opacity-0 group-hover:opacity-20 transition duration-300"></div>
            <div className="relative bg-white/80 backdrop-blur-sm border border-white/20 rounded-lg p-6 hover:shadow-lg transition-all duration-300">
              <div className="flex items-center justify-between mb-4">
                <p className="text-sm font-medium text-slate-600">Total Sales</p>
                <span className="text-lg">💷</span>
              </div>
              <div className="space-y-1">
                <p className="text-2xl font-bold text-slate-900">{formatCurrency(kpiData?.totalSales || 0)}</p>
                <p className="text-xs text-emerald-600 font-medium">↑ 12% vs last month</p>
              </div>
            </div>
          </div>

          {/* Total Orders Card */}
          <div className="group relative">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 rounded-lg blur opacity-0 group-hover:opacity-20 transition duration-300"></div>
            <div className="relative bg-white/80 backdrop-blur-sm border border-white/20 rounded-lg p-6 hover:shadow-lg transition-all duration-300">
              <div className="flex items-center justify-between mb-4">
                <p className="text-sm font-medium text-slate-600">Total Orders</p>
                <span className="text-lg">📦</span>
              </div>
              <div className="space-y-1">
                <p className="text-2xl font-bold text-slate-900">{orders?.length || 0}</p>
                <p className="text-xs text-emerald-600 font-medium">↑ 8% vs last month</p>
              </div>
            </div>
          </div>

          {/* Avg Order Value Card */}
          <div className="group relative">
            <div className="absolute inset-0 bg-gradient-to-r from-amber-400 to-orange-400 rounded-lg blur opacity-0 group-hover:opacity-20 transition duration-300"></div>
            <div className="relative bg-white/80 backdrop-blur-sm border border-white/20 rounded-lg p-6 hover:shadow-lg transition-all duration-300">
              <div className="flex items-center justify-between mb-4">
                <p className="text-sm font-medium text-slate-600">Avg Order Value</p>
                <span className="text-lg">📊</span>
              </div>
              <div className="space-y-1">
                <p className="text-2xl font-bold text-slate-900">{formatCurrency((kpiData?.totalSales || 0) / Math.max(orders?.length || 1, 1))}</p>
                <p className="text-xs text-emerald-600 font-medium">↑ 5% vs last month</p>
              </div>
            </div>
          </div>

          {/* Pending Orders Card */}
          <div className="group relative">
            <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-400 rounded-lg blur opacity-0 group-hover:opacity-20 transition duration-300"></div>
            <div className="relative bg-white/80 backdrop-blur-sm border border-white/20 rounded-lg p-6 hover:shadow-lg transition-all duration-300">
              <div className="flex items-center justify-between mb-4">
                <p className="text-sm font-medium text-slate-600">Pending Orders</p>
                <span className="text-lg">⏳</span>
              </div>
              <div className="space-y-1">
                <p className="text-2xl font-bold text-slate-900">{(orders?.filter((o: any) => o?.status === 'pending'))?.length || 0}</p>
                <p className="text-xs text-amber-600 font-medium">Need attention</p>
              </div>
            </div>
          </div>
        </div>

        {/* Section Divider */}
        <div className="my-8">
          <div className="flex items-center gap-4">
            <h3 className="text-lg font-semibold text-slate-900">Recent Orders</h3>
            <div className="flex-1 h-px bg-gradient-to-r from-slate-200 to-transparent"></div>
          </div>
        </div>

        {/* Orders Table */}
        <div className="bg-white/80 backdrop-blur-sm border border-white/20 rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-200/50 bg-slate-50/50">
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Order ID</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Customer</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Amount</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Date</th>
                </tr>
              </thead>
              <tbody>
                {displayOrders && displayOrders.length > 0 ? (
                  displayOrders.map((order: any, index: number) => (
                    <tr key={index} className="border-b border-slate-100/50 hover:bg-slate-50/50 transition-colors">
                      <td className="px-6 py-4 text-sm font-medium text-slate-900">{order?.id || 'N/A'}</td>
                      <td className="px-6 py-4 text-sm text-slate-600">{order?.customer?.name || 'Unknown'}</td>
                      <td className="px-6 py-4 text-sm font-semibold text-slate-900">{formatCurrency(order?.total || 0)}</td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order?.status)}`}>
                          <span className="text-xs">{getStatusIcon(order?.status)}</span>
                          {order?.status || 'pending'}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-600">{order?.created_at ? new Date(order.created_at).toLocaleDateString() : 'N/A'}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center">
                      <p className="text-slate-500 text-sm">No orders yet. Start selling!</p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-sm text-slate-500">
          <p>HASTE Merchant Dashboard • Always up to date</p>
        </div>
      </div>
    </div>
  );
}
