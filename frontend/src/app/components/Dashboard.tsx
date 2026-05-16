import { TrendingUp, TrendingDown, IndianRupee, ShoppingCart, Package, Users, AlertTriangle, Plus } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useNavigate } from 'react-router';

const salesData = [
  { month: 'Jan', sales: 45000 },
  { month: 'Feb', sales: 52000 },
  { month: 'Mar', sales: 48000 },
  { month: 'Apr', sales: 61000 },
  { month: 'May', sales: 55000 },
  { month: 'Jun', sales: 67000 },
];

const topProducts = [
  { name: 'Rice - 5kg', sold: 450 },
  { name: 'Toor Dal - 1kg', sold: 380 },
  { name: 'Cooking Oil', sold: 320 },
  { name: 'Atta Flour', sold: 290 },
  { name: 'Sugar - 1kg', sold: 250 },
];

const lowStockAlerts = [
  { product: 'Toor Dal - 1kg', stock: 8, threshold: 20 },
  { product: 'Cooking Oil', stock: 5, threshold: 15 },
  { product: 'Tea Powder', stock: 3, threshold: 10 },
];

export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-1">Welcome back! Here's what's happening today.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <IndianRupee className="w-6 h-6 text-green-600" />
            </div>
            <span className="text-green-600 text-sm font-medium flex items-center gap-1">
              <TrendingUp className="w-4 h-4" />
              +12%
            </span>
          </div>
          <h3 className="text-gray-600 text-sm mb-1">Today's Sales</h3>
          <p className="text-2xl font-bold text-gray-900">₹8,450</p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <ShoppingCart className="w-6 h-6 text-blue-600" />
            </div>
            <span className="text-blue-600 text-sm font-medium flex items-center gap-1">
              <TrendingUp className="w-4 h-4" />
              +8%
            </span>
          </div>
          <h3 className="text-gray-600 text-sm mb-1">Monthly Sales</h3>
          <p className="text-2xl font-bold text-gray-900">₹67,230</p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
              <Users className="w-6 h-6 text-orange-600" />
            </div>
            <span className="text-red-600 text-sm font-medium flex items-center gap-1">
              <TrendingDown className="w-4 h-4" />
              5 overdue
            </span>
          </div>
          <h3 className="text-gray-600 text-sm mb-1">Pending Lending</h3>
          <p className="text-2xl font-bold text-gray-900">₹12,500</p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
              <Package className="w-6 h-6 text-red-600" />
            </div>
            <span className="text-red-600 text-sm font-medium flex items-center gap-1">
              <AlertTriangle className="w-4 h-4" />
              Alert
            </span>
          </div>
          <h3 className="text-gray-600 text-sm mb-1">Low Stock Items</h3>
          <p className="text-2xl font-bold text-gray-900">3</p>
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Sales Chart */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Monthly Sales Trend</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip formatter={(value) => `₹${value}`} />
              <Line type="monotone" dataKey="sales" stroke="#16a34a" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Top Selling Products */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Top Selling Products</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={topProducts}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" angle={-45} textAnchor="end" height={80} />
              <YAxis />
              <Tooltip />
              <Bar dataKey="sold" fill="#16a34a" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Quick Actions and Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Quick Actions */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => navigate('/billing')}
              className="flex flex-col items-center gap-2 p-4 border-2 border-green-600 rounded-xl hover:bg-green-50 transition-colors"
            >
              <ShoppingCart className="w-6 h-6 text-green-600" />
              <span className="font-medium text-gray-900">Start Billing</span>
            </button>
            <button
              onClick={() => navigate('/products')}
              className="flex flex-col items-center gap-2 p-4 border-2 border-blue-600 rounded-xl hover:bg-blue-50 transition-colors"
            >
              <Plus className="w-6 h-6 text-blue-600" />
              <span className="font-medium text-gray-900">Add Product</span>
            </button>
            <button
              onClick={() => navigate('/customers')}
              className="flex flex-col items-center gap-2 p-4 border-2 border-purple-600 rounded-xl hover:bg-purple-50 transition-colors"
            >
              <Users className="w-6 h-6 text-purple-600" />
              <span className="font-medium text-gray-900">Add Customer</span>
            </button>
            <button
              onClick={() => navigate('/reports')}
              className="flex flex-col items-center gap-2 p-4 border-2 border-orange-600 rounded-xl hover:bg-orange-50 transition-colors"
            >
              <Package className="w-6 h-6 text-orange-600" />
              <span className="font-medium text-gray-900">View Reports</span>
            </button>
          </div>
        </div>

        {/* Notifications */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Low Stock Alerts</h3>
          <div className="space-y-3">
            {lowStockAlerts.map((alert, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 bg-red-50 rounded-lg border border-red-200">
                <div className="flex items-center gap-3">
                  <AlertTriangle className="w-5 h-5 text-red-600" />
                  <div>
                    <p className="font-medium text-gray-900">{alert.product}</p>
                    <p className="text-sm text-gray-600">
                      Only {alert.stock} left (Min: {alert.threshold})
                    </p>
                  </div>
                </div>
                <button className="px-3 py-1 bg-red-600 text-white text-sm rounded-lg hover:bg-red-700">
                  Restock
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
