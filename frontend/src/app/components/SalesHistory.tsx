import { useState } from 'react';
import { Search, FileText, Eye, Download, AlertCircle } from 'lucide-react';

interface Sale {
  id: string;
  billId: string;
  customer: string;
  date: string;
  items: number;
  subtotal: number;
  discount: number;
  total: number;
  paymentMethod: string;
  lendingAmount: number;
  billingStaff: string;
}

const sampleSales: Sale[] = [
  { id: '1', billId: 'BILL-001234', customer: 'Rajesh Kumar', date: '2026-05-07', items: 5, subtotal: 850, discount: 50, total: 800, paymentMethod: 'Cash', lendingAmount: 0, billingStaff: 'Admin User' },
  { id: '2', billId: 'BILL-001233', customer: 'Priya Sharma', date: '2026-05-07', items: 3, subtotal: 420, discount: 0, total: 420, paymentMethod: 'UPI', lendingAmount: 0, billingStaff: 'Admin User' },
  { id: '3', billId: 'BILL-001232', customer: 'Vijay Singh', date: '2026-05-06', items: 8, subtotal: 1250, discount: 100, total: 1150, paymentMethod: 'Card', lendingAmount: 0, billingStaff: 'Admin User' },
  { id: '4', billId: 'BILL-001231', customer: 'Lakshmi Iyer', date: '2026-05-06', items: 4, subtotal: 680, discount: 30, total: 650, paymentMethod: 'Cash', lendingAmount: 150, billingStaff: 'Admin User' },
  { id: '5', billId: 'BILL-001230', customer: 'Arjun Reddy', date: '2026-05-05', items: 6, subtotal: 920, discount: 20, total: 900, paymentMethod: 'Mixed', lendingAmount: 0, billingStaff: 'Admin User' },
];

export default function SalesHistory() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterPeriod, setFilterPeriod] = useState('all');
  const [sales] = useState<Sale[]>(sampleSales);

  const filteredSales = sales.filter(s =>
    s.billId.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.customer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Sales History</h1>
        <p className="text-gray-600 mt-1">View and manage all sales transactions</p>
      </div>

      {/* Important Notice */}
      <div className="bg-blue-50 border border-blue-300 rounded-lg p-4 flex items-start gap-3">
        <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5" />
        <div>
          <p className="font-medium text-blue-900">Data Retention Policy</p>
          <p className="text-sm text-blue-800 mt-1">
            Only last 30 days of detailed purchase history is stored. Returns accepted only within 30 days.
          </p>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
        <div className="flex gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by Bill ID or Customer name..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
            />
          </div>
          <select
            value={filterPeriod}
            onChange={(e) => setFilterPeriod(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
          >
            <option value="all">All Time</option>
            <option value="today">Today</option>
            <option value="7days">Last 7 Days</option>
            <option value="30days">Last 30 Days</option>
          </select>
        </div>
      </div>

      {/* Sales Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Bill ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Items
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Subtotal
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Discount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Payment
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Credit
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredSales.map((sale) => (
                <tr key={sale.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4 text-gray-400" />
                      <span className="font-medium text-gray-900">{sale.billId}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {sale.customer}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {sale.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {sale.items} items
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    ₹{sale.subtotal}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-red-600">
                    {sale.discount > 0 ? `-₹${sale.discount}` : '-'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-green-600">
                    ₹{sale.total}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                      {sale.paymentMethod}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    {sale.lendingAmount > 0 ? (
                      <span className="text-orange-600 font-medium">₹{sale.lendingAmount}</span>
                    ) : (
                      <span className="text-green-600">Paid</span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                    <div className="flex justify-end gap-2">
                      <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-green-600 hover:bg-green-50 rounded-lg">
                        <Download className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
          <p className="text-sm text-gray-600 mb-1">Total Sales</p>
          <p className="text-2xl font-bold text-gray-900">₹{filteredSales.reduce((sum, s) => sum + s.total, 0)}</p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
          <p className="text-sm text-gray-600 mb-1">Total Discount</p>
          <p className="text-2xl font-bold text-red-600">₹{filteredSales.reduce((sum, s) => sum + s.discount, 0)}</p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
          <p className="text-sm text-gray-600 mb-1">Total Transactions</p>
          <p className="text-2xl font-bold text-gray-900">{filteredSales.length}</p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
          <p className="text-sm text-gray-600 mb-1">Total Credit</p>
          <p className="text-2xl font-bold text-orange-600">₹{filteredSales.reduce((sum, s) => sum + s.lendingAmount, 0)}</p>
        </div>
      </div>
    </div>
  );
}
