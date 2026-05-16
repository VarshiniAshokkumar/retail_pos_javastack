import { useState } from 'react';
import { Search, AlertTriangle, Calendar, IndianRupee, Plus } from 'lucide-react';

interface Lending {
  id: string;
  customerName: string;
  customerPhone: string;
  totalAmount: number;
  paidAmount: number;
  remainingAmount: number;
  lastRepayment: string;
  dueDate: string;
  isOverdue: boolean;
}

const sampleLendings: Lending[] = [
  { id: '1', customerName: 'Priya Sharma', customerPhone: '9876543211', totalAmount: 1200, paidAmount: 950, remainingAmount: 250, lastRepayment: '2026-04-25', dueDate: '2026-05-10', isOverdue: false },
  { id: '2', customerName: 'Lakshmi Iyer', customerPhone: '9876543213', totalAmount: 800, paidAmount: 300, remainingAmount: 500, lastRepayment: '2026-04-15', dueDate: '2026-04-30', isOverdue: true },
  { id: '3', customerName: 'Arjun Reddy', customerPhone: '9876543214', totalAmount: 600, paidAmount: 450, remainingAmount: 150, lastRepayment: '2026-05-01', dueDate: '2026-05-15', isOverdue: false },
];

export default function LendingManagement() {
  const [searchQuery, setSearchQuery] = useState('');
  const [lendings] = useState<Lending[]>(sampleLendings);

  const filteredLendings = lendings.filter(l =>
    l.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    l.customerPhone.includes(searchQuery)
  );

  const totalPending = lendings.reduce((sum, l) => sum + l.remainingAmount, 0);
  const overdueCount = lendings.filter(l => l.isOverdue).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Lending / Credit Management</h1>
        <p className="text-gray-600 mt-1">Track and manage customer credit and repayments</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
              <IndianRupee className="w-6 h-6 text-orange-600" />
            </div>
          </div>
          <h3 className="text-gray-600 text-sm mb-1">Total Pending Amount</h3>
          <p className="text-2xl font-bold text-gray-900">₹{totalPending}</p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
              <AlertTriangle className="w-6 h-6 text-red-600" />
            </div>
          </div>
          <h3 className="text-gray-600 text-sm mb-1">Overdue Accounts</h3>
          <p className="text-2xl font-bold text-gray-900">{overdueCount}</p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <Calendar className="w-6 h-6 text-blue-600" />
            </div>
          </div>
          <h3 className="text-gray-600 text-sm mb-1">Active Accounts</h3>
          <p className="text-2xl font-bold text-gray-900">{lendings.length}</p>
        </div>
      </div>

      {/* Search */}
      <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by customer name or phone..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
          />
        </div>
      </div>

      {/* Lending Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Paid Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Remaining
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Last Repayment
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Due Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredLendings.map((lending) => (
                <tr key={lending.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="font-medium text-gray-900">{lending.customerName}</div>
                      <div className="text-sm text-gray-500">{lending.customerPhone}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    ₹{lending.totalAmount}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600">
                    ₹{lending.paidAmount}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-orange-600">
                    ₹{lending.remainingAmount}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {lending.lastRepayment}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {lending.dueDate}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {lending.isOverdue ? (
                      <span className="flex items-center gap-1 px-2 py-1 bg-red-100 text-red-800 text-xs font-medium rounded-full">
                        <AlertTriangle className="w-3 h-3" />
                        Overdue
                      </span>
                    ) : (
                      <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs font-medium rounded-full">
                        Pending
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                    <button className="flex items-center gap-1 px-3 py-1 bg-green-600 text-white rounded-lg hover:bg-green-700 ml-auto">
                      <Plus className="w-4 h-4" />
                      Add Repayment
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Warning Note */}
      <div className="bg-yellow-50 border border-yellow-300 rounded-lg p-4 flex items-start gap-3">
        <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5" />
        <div>
          <p className="font-medium text-yellow-900">Repayment Reminder</p>
          <p className="text-sm text-yellow-800 mt-1">
            Follow up with customers who have overdue payments. Maintain good relationships while ensuring timely collections.
          </p>
        </div>
      </div>
    </div>
  );
}
