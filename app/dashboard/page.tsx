'use client';

import { useEffect } from 'react';
import { useStore } from '@/lib/store';
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
      return 'bg-emerald-100 text-emerald-700';
    case 'pending':
    case 'on hold':
      return 'bg-amber-100 text-amber-700';
    case 'refunded':
    case 'cancelled':
      return 'bg-rose-100 text-rose-700';
    default:
      return 'bg-gray-100 text-gray-700';
  }
}

export default function DashboardPage() {
  const { kpiData, kpiLoading, fetchKPIData, orders, fetchOrders } = useStore();

  useEffect(() => {
    fetchKPIData();
    fetchOrders();
  }, [fetchKPIData, fetchOrders]);

  const stats = [
    { label: 'Total Inventory', value: kpiData?.totalInventory || 0, delta: 'Units in stock' },
    { label: 'Total Orders', value: kpiData?.totalOrders || 0, delta: 'All time' },
    { label: 'Total Sales', value: formatCurrency(kpiData?.totalSales || 0), delta: 'All time' },
    { label: 'Avg Order Value', value: formatCurrency((kpiData?.totalSales || 0) / (kpiData?.totalOrders || 1)), delta: 'Per order' },
  ];

  const displayOrders = (kpiData?.recentOrders || orders || []).slice(0, 5);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top bar */}
      <div className="sticky top-0 z-30 bg-white/90 backdrop-blur border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-xl sm:text-2xl font-bold tracking-tight">Merchant Dashboard</span>
            <span className="hidden sm:inline-flex text-xs px-2 py-1 rounded bg-gray-100 text-gray-600">v2.0</span>
          </div>
          <div className="flex items-center gap-2">
            <Link className="text-sm font-semibold text-gray-700 hover:text-gray-900 px-3 py-2" href="/">
              Storefront
            </Link>
            <button className="text-sm font-semibold bg-gray-900 text-white hover:bg-black px-3 py-2 rounded-md">
              New Product
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
        {/* KPI cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6">
          {stats.map((s) => (
            <div
              key={s.label}
              className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6 shadow-sm"
            >
              <div className="text-xs uppercase tracking-wide text-gray-500 mb-1">
                {s.label}
              </div>
              <div className="text-lg sm:text-2xl font-bold text-gray-900">
                {typeof s.value === 'number' ? s.value.toLocaleString() : s.value}
              </div>
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
              {kpiLoading ? (
                <div className="p-4 text-center text-gray-500">
                  Loading orders...
                </div>
              ) : displayOrders.length > 0 ? (
                <table className="min-w-full text-sm">
                  <thead className="bg-gray-50 text-gray-600">
                    <tr>
                      <th className="px-4 sm:px-6 py-3 text-left font-semibold">Order ID</th>
                      <th className="px-4 sm:px-6 py-3 text-left font-semibold">Total</th>
                      <th className="px-4 sm:px-6 py-3 text-left font-semibold">Status</th>
                      <th className="px-4 sm:px-6 py-3 text-left font-semibold">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {displayOrders.map((order) => (
                      <tr key={order.id} className="border-t border-gray-100">
                        <td className="px-4 sm:px-6 py-3 font-semibold text-gray-900">
                          {order.order_number || order.id?.slice(0, 8)}
                        </td>
                        <td className="px-4 sm:px-6 py-3 text-gray-900">
                          {formatCurrency(order.total || 0)}
                        </td>
                        <td className="px-4 sm:px-6 py-3">
                          <span
                            className={`inline-flex font-medium items-center px-2 py-1 rounded text-xs ${
                              getStatusColor(order.status)
                            }`}
                          >
                            {order.status || 'Unknown'}
                          </span>
                        </td>
                        <td className="px-4 sm:px-6 py-3 text-gray-600">
                          {order.created_at
                            ? new Date(order.created_at).toLocaleDateString('en-GB')
                            : 'N/A'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <div className="p-4 text-center text-gray-500">No orders found</div>
              )}
            </div>
          </div>

          {/* Right rail: actions and info */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
              <h3 className="text-base font-bold mb-4">System Status</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                  <span className="text-sm text-gray-700">API Connected</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                  <span className="text-sm text-gray-700">Data Synced</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                  <span className="text-sm text-gray-700">Live</span>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
              <h3 className="text-base font-bold mb-2">Integration</h3>
              <p className="text-sm text-gray-600 mb-3">
                Connected to Digital Ocean backend for real-time product and order data.
              </p>
              <p className="text-xs text-gray-500">
                Last updated: {new Date().toLocaleTimeString('en-GB')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
