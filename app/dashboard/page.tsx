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
  const { orders = [], kpiData, fetchOrders } = useStore();
  const [displayOrders, setDisplayOrders] = useState<any[]>([]);

  useEffect(() => {
    fetchOrders?.();
  }, [fetchOrders]);

  useEffect(() => {
    if (orders && Array.isArray(orders)) {
      setDisplayOrders(orders.slice(0, 10));
    }
  }, [orders]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-white/50 via-transparent to-white/30 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-black via-gray-800 to-gray-600 bg-clip-text text-transparent mb-2">
            Merchant Dashboard
          </h1>
          <p className="text-gray-600">Manage your HASTE store with real-time insights</p>
        </div>

        {/* KPI Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {/* Total Inventory */}
          <div className="glass-card p-6 group hover:shadow-xl transition-all duration-300">
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-gray-600 text-sm font-medium uppercase tracking-wide">Total Inventory</p>
                <p className="text-3xl md:text-4xl font-bold text-black mt-2">
                  {kpiData?.totalInventory || 0}
                </p>
              </div>
              <div className="text-4xl opacity-20 group-hover:opacity-40 transition-opacity">📦</div>
            </div>
            <div className="text-xs text-green-600 font-semibold">✓ In Stock</div>
          </div>

          {/* Total Orders */}
          <div className="glass-card p-6 group hover:shadow-xl transition-all duration-300">
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-gray-600 text-sm font-medium uppercase tracking-wide">Total Orders</p>
                <p className="text-3xl md:text-4xl font-bold text-black mt-2">
                  {kpiData?.totalOrders || 0}
                </p>
              </div>
              <div className="text-4xl opacity-20 group-hover:opacity-40 transition-opacity">📊</div>
            </div>
            <div className="text-xs text-blue-600 font-semibold">↗ All Time</div>
          </div>

          {/* Total Sales */}
          <div className="glass-card p-6 group hover:shadow-xl transition-all duration-300">
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-gray-600 text-sm font-medium uppercase tracking-wide">Total Sales</p>
                <p className="text-3xl md:text-4xl font-bold text-black mt-2">
                  {formatCurrency(kpiData?.totalSales || 0)}
                </p>
              </div>
              <div className="text-4xl opacity-20 group-hover:opacity-40 transition-opacity">💰</div>
            </div>
            <div className="text-xs text-emerald-600 font-semibold">✓ Revenue</div>
          </div>

          {/* Average Order Value */}
          <div className="glass-card p-6 group hover:shadow-xl transition-all duration-300">
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-gray-600 text-sm font-medium uppercase tracking-wide">Avg Order Value</p>
                <p className="text-3xl md:text-4xl font-bold text-black mt-2">
                  {formatCurrency(kpiData?.avgOrderValue || 0)}
                </p>
              </div>
              <div className="text-4xl opacity-20 group-hover:opacity-40 transition-opacity">⭐</div>
            </div>
            <div className="text-xs text-purple-600 font-semibold">Per Order</div>
          </div>
        </div>

        {/* Recent Orders Section */}
        <div className="glass-card overflow-hidden shadow-lg">
          <div className="px-6 py-5 border-b border-white/30 bg-white/40 backdrop-blur-sm">
            <h2 className="text-xl font-bold text-black flex items-center gap-3">
              <span className="text-2xl">📋</span>
              Recent Orders
            </h2>
          </div>

          {displayOrders.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/30 bg-white/30 backdrop-blur-sm">
                    <th className="px-6 py-4 text-left text-sm font-semibold text-black/80 uppercase tracking-wide">Order ID</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-black/80 uppercase tracking-wide">Customer</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-black/80 uppercase tracking-wide">Amount</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-black/80 uppercase tracking-wide">Status</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-black/80 uppercase tracking-wide">Date</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-black/80 uppercase tracking-wide">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {displayOrders.map((order: any, idx) => (
                    <tr
                      key={order.id || idx}
                      className="border-b border-white/30 hover:bg-white/30 transition-all duration-200"
                    >
                      <td className="px-6 py-4 text-sm font-mono font-semibold text-blue-600">
                        {order.id?.slice(-8).toUpperCase() || 'N/A'}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-700 font-medium">
                        {order.customer?.name || 'Guest'}
                      </td>
                      <td className="px-6 py-4 text-sm font-bold text-black">
                        {formatCurrency(order.total || 0)}
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <span
                          className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold backdrop-blur-sm ${getStatusColor(
                            order.status
                          )}`}
                        >
                          <span className="text-lg">{getStatusIcon(order.status)}</span>
                          {order.status
                            ? order.status.charAt(0).toUpperCase() +
                              order.status.slice(1).toLowerCase()
                            : 'Unknown'}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {order.created_at
                          ? new Date(order.created_at).toLocaleDateString('en-GB')
                          : 'N/A'}
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <Link
                          href={`/order/${order.id}`}
                          className="inline-flex px-3 py-1.5 bg-blue-600/80 text-white rounded-lg text-xs font-semibold hover:bg-blue-700 transition-all duration-200 backdrop-blur-sm"
                        >
                          View
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="px-6 py-12 text-center">
              <div className="text-5xl mb-4">📭</div>
              <p className="text-gray-600 font-medium">No recent orders</p>
              <p className="text-sm text-gray-500 mt-2">Your orders will appear here once customers make purchases</p>
            </div>
          )}
        </div>

        {/* Footer Info */}
        <div className="mt-8 text-center text-sm text-gray-600">
          <p>🚀 HASTE Merchant Dashboard • Real-time Order Management</p>
        </div>
      </div>
    </div>
  );
}
