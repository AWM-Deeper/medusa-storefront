'use client';
import { useEffect } from 'react';
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
    {
      label: 'Total Inventory',
      value: kpiData?.totalInventory || 0,
      delta: 'Units in stock',
    },
    {
      label: 'Total Orders',
      value: kpiData?.totalOrders || 0,
      delta: 'All time',
    },
    {
      label: 'Total Sales',
      value: formatCurrency(kpiData?.totalSales || 0),
      delta: 'All time',
    },
    {
      label: 'Avg Order Value',
      value: formatCurrency(
        (kpiData?.totalSales || 0) / (kpiData?.totalOrders || 1)
      ),
      delta: 'Per order',
    },
  ];

  const displayOrders = (kpiData?.recentOrders || orders || []).slice(0, 5);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top bar */}
      <div className="sticky top-0 z-30 bg-white/90 backdrop-blur border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-xl sm:text-2xl font-bold tracking-tight">
              Merchant Dashboard
            </span>
            <span className="hidden sm:inline-flex text-xs px-2 py-1 rounded bg-gray-100 text-gray-600">
              v2.0
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Link
              className="text-sm font-semibold text-gray-700 hover:text-gray-900 px-3 py-2"
              href="/"
            >
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
              <div className="text-2xl sm:text-3xl font-bold text-black mb-1">
                {s.value}
              </div>
              <div className="text-xs text-gray-600">{s.delta}</div>
            </div>
          ))}
        </div>

        {/* Recent Orders */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold text-black mb-6">Recent Orders</h2>
          <div className="space-y-2">
            {kpiLoading ? (
              <div className="text-center py-12">
                <div className="text-gray-500">Loading dashboard data...</div>
              </div>
            ) : displayOrders && displayOrders.length > 0 ? (
              displayOrders.map((order) => (
                <div
                  key={order.id}
                  className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-2 flex-wrap">
                        <span className="text-sm font-semibold text-gray-900">
                          Order #{order.id}
                        </span>
                        <span
                          className={`text-xs px-2 py-1 rounded font-semibold ${
                            getStatusColor(order.status)
                          }`}
                        >
                          {order.status?.charAt(0).toUpperCase() +
                            order.status?.slice(1).toLowerCase()}
                        </span>
                      </div>
                      <div className="text-xs text-gray-600 space-y-1">
                        <div>
                          {new Date(order.created_at).toLocaleDateString('en-GB', {
                            dateStyle: 'medium',
                          })}
                        </div>
                        <div>
                          {order.items?.length || 0} item
                          {(order.items?.length || 0) !== 1 ? 's' : ''}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-black text-lg">
                        £{((order.total || 0) / 100).toFixed(2)}
                      </div>
                      <div className="text-xs text-gray-600">
                        {order.customer_name || 'Guest'}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-12">
                <div className="text-gray-500">No orders yet</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
