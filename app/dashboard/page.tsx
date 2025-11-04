'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useStore } from '../../lib/store';

function formatCurrency(value: number) {
  return new Intl.NumberFormat('en-GB', {
    style: 'currency', currency: 'GBP'
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
    case 'completed': return '✓';
    case 'processing': return '⟳';
    case 'pending': return '○';
    case 'cancelled': return '✕';
    default: return '•';
  }
}
const TABS = [
  { key: 'dashboard', label: 'Dashboard', icon: '📊' },
  { key: 'orders', label: 'Orders', icon: '📦' },
  { key: 'analytics', label: 'Analytics', icon: '📈' },
  { key: 'catalog', label: 'Catalog', icon: '🛍️' },
  { key: 'inventory', label: 'Inventory', icon: '📋' },
  { key: 'stores', label: 'Connected Stores', icon: '🏪' },
];
export default function DashboardPage() {
  const {
    orders = [],
    kpiData,
    stores = [],
    fetchOrders,
    fetchStores,
    storeRevenues = {},
  } = useStore();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [displayOrders, setDisplayOrders] = useState<any[]>(orders || []);

  useEffect(() => {
    fetchStores();
    fetchOrders();
  }, [fetchStores, fetchOrders]);

  useEffect(() => {
    if (orders && Array.isArray(orders)) {
      setDisplayOrders(orders.slice(0, 10));
    }
  }, [orders]);

  // Use real stores with revenue, fall back to empty state
  const realStores = (stores.length ? stores : []).map(store => ({
    ...store,
    revenue: storeRevenues[store.id] || 0,
  }));

  const handleCardAction = (action: string) => {
    alert(`Action: ${action}`);
  };

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
          {/* Navigation Tabs */}
          <nav className="space-y-3">
            {TABS.map(tab => (
              <button key={tab.key} className={`flex gap-3 items-center px-4 py-2 rounded-lg text-white font-medium w-full hover:bg-white transition-colors`} onClick={() => setActiveTab(tab.key)}>
                {tab.icon}{tab.label}
              </button>
            ))}
          </nav>
        </div>
      </div>
      {/* Main Content */}
      <div className="ml-64 p-8">
        {/* Top Header */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-slate-900 mb-2">{TABS.find(t => t.key === activeTab)?.label}</h2>
          <p className="text-slate-600">{activeTab === 'dashboard' ? 'Real-time insights and store management' : activeTab === 'stores' ? 'All stores connected and their revenue' : ''}</p>
        </div>
        {/* Conditional Views */}
        {activeTab === 'dashboard' && (
          <>
            {/* KPI Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
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
                  <button className="absolute top-4 right-4 text-xs px-2 py-1 rounded bg-cyan-100 text-cyan-800 hover:bg-cyan-200" onClick={() => handleCardAction('total-sales')}>See details</button>
                </div>
              </div>
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
                  <button className="absolute top-4 right-4 text-xs px-2 py-1 rounded bg-pink-100 text-pink-800 hover:bg-pink-200" onClick={() => setActiveTab('orders')}>View orders</button>
                </div>
              </div>
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
                  <button className="absolute top-4 right-4 text-xs px-2 py-1 rounded bg-amber-100 text-amber-800 hover:bg-amber-200" onClick={() => setActiveTab('orders')}>Resolve</button>
                </div>
              </div>
            </div>
            {/* Recent Orders Table */}
            <div className="my-8">
              <div className="flex items-center gap-4">
                <h3 className="text-lg font-semibold text-slate-900">Recent Orders</h3>
                <div className="flex-1 h-px bg-gradient-to-r from-slate-200 to-transparent"></div>
              </div>
            </div>
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
                        <tr className="border-b border-slate-100/50 hover:bg-slate-50/50 transition-colors" key={index}>
                          <td className="px-6 py-4 text-sm font-medium text-slate-900">{order?.id || 'N/A'}</td>
                          <td className="px-6 py-4 text-sm text-slate-600">{order?.customer?.name || 'Unknown'}</td>
                          <td className="px-6 py-4 text-sm font-semibold text-slate-900">{formatCurrency(order?.total || 0)}</td>
                          <td className="px-6 py-4">
                            <span className={`inline-flex font-medium gap-1 items-center px-3 py-1 rounded-full text-xs`}>
                              <span className="text-xs">{getStatusIcon(order?.status)}</span>
                              {order?.status || 'pending'}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-sm text-slate-600">{order?.created_at ? new Date(order.created_at).toLocaleDateString() : 'N/A'}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td className="px-6 py-12 text-center" colSpan={5}>
                          <p className="text-slate-500 text-sm">No orders yet. Start selling!</p>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}
        {/* Orders Tab */}
        {activeTab === 'orders' && (
          <div className="bg-white/90 p-8 rounded-lg shadow-lg">
            <h3 className="text-xl font-bold mb-4">All Orders</h3>
            <table className="w-full">
              <thead>
                <tr>
                  <th className="text-left px-4 py-2">Order #</th>
                  <th className="text-left px-4 py-2">Customer</th>
                  <th className="text-left px-4 py-2">Amount</th>
                  <th className="text-left px-4 py-2">Status</th>
                  <th className="text-left px-4 py-2">Date</th>
                </tr>
              </thead>
              <tbody>
                {orders && orders.length > 0 ? (
                  orders.map((order: any, idx: number) => (
                    <tr className="border-b last:border-0" key={idx}>
                      <td className="px-4 py-2 font-bold">{order?.id}</td>
                      <td className="px-4 py-2">{order?.customer?.name || 'Unknown'}</td>
                      <td className="px-4 py-2">{formatCurrency(order?.total || 0)}</td>
                      <td className="px-4 py-2">
                        <span className={`inline-flex gap-1 items-center px-3 py-1 rounded text-xs ${getStatusColor(order?.status)}`}>{getStatusIcon(order?.status)} {order?.status}</span>
                      </td>
                      <td className="px-4 py-2">{order?.created_at ? new Date(order.created_at).toLocaleDateString() : 'N/A'}</td>
                    </tr>
                  ))
                ) : (
                  <td className="text-center py-8 text-slate-500" colSpan={5}>No orders found.</td>
                )}
              </tbody>
            </table>
          </div>
        )}
        {/* Stores Tab */}
        {activeTab === 'stores' && (
          <div className="bg-white/90 p-8 rounded-lg shadow-lg">
            <h3 className="text-xl font-bold mb-4">Connected Stores & Revenue</h3>
            <table className="w-full">
              <thead>
                <tr>
                  <th className="text-left px-4 py-2">Store</th>
                  <th className="text-left px-4 py-2">Store ID</th>
                  <th className="text-left px-4 py-2">Total Revenue</th>
                </tr>
              </thead>
              <tbody>
                {realStores.length === 0 ? (
                  <tr>
                    <td className="text-center py-8 text-slate-500" colSpan={3}>No connected stores found.</td>
                  </tr>
                ) : (
                  realStores.map((store: any, idx: number) => (
                    <tr className="border-b last:border-0" key={store.id}>
                      <td className="px-4 py-2 font-semibold">{store.name}</td>
                      <td className="px-4 py-2">{store.id}</td>
                      <td className="px-4 py-2">{formatCurrency(store.revenue)}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
        {/* Analytics, Catalog, Inventory Tabs (optional - placeholder
