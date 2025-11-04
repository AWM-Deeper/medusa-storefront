'use client';
import {
  useEffect
} from 'react';
import {
  useStore
} from '../../lib/store';
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
  const {
    kpiData,
    kpiLoading,
    fetchKPIData,
    orders,
    fetchOrders
  } = useStore();

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
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Statistics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="bg-white rounded-lg shadow p-6 border border-gray-200 hover:border-gray-300 transition"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm font-medium">
                    {stat.label}
                  </p>
                  <p className="text-2xl font-bold text-gray-900 mt-2">
                    {stat.value}
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    {stat.delta}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Recent Orders */}
        <div className="bg-white rounded-lg shadow border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">
              Recent Orders
            </h2>
          </div>
          {displayOrders.length > 0 ? (
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50">
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                    Order ID
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                    Customer
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                    Amount
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                    Date
                  </th>
                </tr>
              </thead>
              <tbody>
                {displayOrders.map((order: any) => (
                  <tr
                    key={order.id}
                    className="border-b border-gray-200 hover:bg-gray-50 transition"
                  >
                    <td className="px-6 py-4 text-sm font-medium text-blue-600">
                      <Link href={`/order/${order.id}`}>
                        {order.id?.slice(-8).toUpperCase() || 'N/A'}
                      </Link>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {order.customer?.name || 'Guest'}
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">
                      {formatCurrency(order.total || 0)}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                          getStatusColor(order.status)
                        }`}
                      >
                        {order.status ? order.status.charAt(0).toUpperCase() + order.status.slice(1).toLowerCase() : ''}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {order.created_at
                        ? new Date(order.created_at).toLocaleDateString('en-GB')
                        : 'N/A'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="px-6 py-8 text-center">
              <p className="text-gray-500">No recent orders</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
