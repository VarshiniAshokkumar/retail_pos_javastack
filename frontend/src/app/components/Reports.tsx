import { useState } from 'react';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Download, Calendar, TrendingUp, TrendingDown } from 'lucide-react';

const monthlySalesData = [
  { month: 'Jan', sales: 45000, profit: 12000 },
  { month: 'Feb', sales: 52000, profit: 14500 },
  { month: 'Mar', sales: 48000, profit: 13200 },
  { month: 'Apr', sales: 61000, profit: 16800 },
  { month: 'May', sales: 55000, profit: 15100 },
  { month: 'Jun', sales: 67000, profit: 18500 },
];

const categoryData = [
  { name: 'Grains', value: 35 },
  { name: 'Pulses', value: 20 },
  { name: 'Oil', value: 15 },
  { name: 'Essentials', value: 18 },
  { name: 'Others', value: 12 },
];

const COLORS = ['#16a34a', '#3b82f6', '#f59e0b', '#ef4444', '#8b5cf6'];

export default function Reports() {
  const [reportPeriod, setReportPeriod] = useState('monthly');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Reports & Analytics</h1>
          <p className="text-gray-600 mt-1">Comprehensive business insights and analytics</p>
        </div>
        <div className="flex gap-2">
          <select
            value={reportPeriod}
            onChange={(e) => setReportPeriod(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
          >
            <option value="daily">Daily</option>
            <option value="monthly">Monthly</option>
            <option value="yearly">Yearly</option>
          </select>
          <button className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700">
            <Download className="w-5 h-5" />
            Export PDF
          </button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
            <span className="text-green-600 text-sm font-medium">+15%</span>
          </div>
          <h3 className="text-gray-600 text-sm mb-1">Total Revenue</h3>
          <p className="text-2xl font-bold text-gray-900">₹3,28,000</p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-blue-600" />
            </div>
            <span className="text-blue-600 text-sm font-medium">+12%</span>
          </div>
          <h3 className="text-gray-600 text-sm mb-1">Total Profit</h3>
          <p className="text-2xl font-bold text-gray-900">₹90,100</p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
              <Calendar className="w-6 h-6 text-purple-600" />
            </div>
            <span className="text-purple-600 text-sm font-medium">+8%</span>
          </div>
          <h3 className="text-gray-600 text-sm mb-1">Transactions</h3>
          <p className="text-2xl font-bold text-gray-900">1,245</p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
              <TrendingDown className="w-6 h-6 text-orange-600" />
            </div>
            <span className="text-red-600 text-sm font-medium">-5%</span>
          </div>
          <h3 className="text-gray-600 text-sm mb-1">Avg. Order Value</h3>
          <p className="text-2xl font-bold text-gray-900">₹263</p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Trend */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Revenue & Profit Trend</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={monthlySalesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip formatter={(value) => `₹${value}`} />
              <Legend />
              <Line type="monotone" dataKey="sales" stroke="#16a34a" strokeWidth={2} name="Revenue" />
              <Line type="monotone" dataKey="profit" stroke="#3b82f6" strokeWidth={2} name="Profit" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Category Distribution */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Sales by Category</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Top Products */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Top Selling Products</h3>
          <div className="space-y-3">
            {[
              { name: 'Rice - 5kg', sales: 450, revenue: 112500 },
              { name: 'Toor Dal - 1kg', sales: 380, revenue: 45600 },
              { name: 'Cooking Oil', sales: 320, revenue: 57600 },
              { name: 'Atta Flour', sales: 290, revenue: 110200 },
              { name: 'Sugar - 1kg', sales: 250, revenue: 11250 },
            ].map((product, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <div className="font-medium text-gray-900">{product.name}</div>
                  <div className="text-sm text-gray-600">{product.sales} units sold</div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-green-600">₹{product.revenue.toLocaleString()}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Worst Selling Products</h3>
          <div className="space-y-3">
            {[
              { name: 'Tea Powder - 250g', sales: 45, revenue: 3825 },
              { name: 'Biscuits Special', sales: 38, revenue: 1520 },
              { name: 'Coffee Powder', sales: 32, revenue: 4800 },
              { name: 'Dry Fruits Mix', sales: 28, revenue: 8400 },
              { name: 'Instant Noodles', sales: 25, revenue: 750 },
            ].map((product, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <div className="font-medium text-gray-900">{product.name}</div>
                  <div className="text-sm text-gray-600">{product.sales} units sold</div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-orange-600">₹{product.revenue.toLocaleString()}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Lending Summary</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-orange-50 rounded-lg">
            <p className="text-sm text-orange-800 mb-1">Total Pending Amount</p>
            <p className="text-2xl font-bold text-orange-600">₹12,500</p>
          </div>
          <div className="p-4 bg-green-50 rounded-lg">
            <p className="text-sm text-green-800 mb-1">Collected This Month</p>
            <p className="text-2xl font-bold text-green-600">₹8,750</p>
          </div>
          <div className="p-4 bg-red-50 rounded-lg">
            <p className="text-sm text-red-800 mb-1">Overdue Accounts</p>
            <p className="text-2xl font-bold text-red-600">5</p>
          </div>
        </div>
      </div>
    </div>
  );
}
