import { useState } from 'react';
import { Search, Plus, Edit, Eye, Phone, MapPin, Calendar } from 'lucide-react';

interface Customer {
  id: string;
  name: string;
  phone: string;
  address: string;
  balance: number;
  lastPurchase: string;
  totalPurchases: number;
}

const sampleCustomers: Customer[] = [
  { id: '1', name: 'Rajesh Kumar', phone: '9876543210', address: 'Anna Nagar, Chennai', balance: 0, lastPurchase: '2026-05-05', totalPurchases: 25 },
  { id: '2', name: 'Priya Sharma', phone: '9876543211', address: 'T Nagar, Chennai', balance: 250, lastPurchase: '2026-05-03', totalPurchases: 18 },
  { id: '3', name: 'Vijay Singh', phone: '9876543212', address: 'Adyar, Chennai', balance: 0, lastPurchase: '2026-05-06', totalPurchases: 42 },
  { id: '4', name: 'Lakshmi Iyer', phone: '9876543213', address: 'Mylapore, Chennai', balance: 500, lastPurchase: '2026-04-28', totalPurchases: 35 },
  { id: '5', name: 'Arjun Reddy', phone: '9876543214', address: 'Velachery, Chennai', balance: 150, lastPurchase: '2026-05-04', totalPurchases: 12 },
];

export default function CustomerManagement() {
  const [searchQuery, setSearchQuery] = useState('');
  const [customers] = useState<Customer[]>(sampleCustomers);

  const filteredCustomers = customers.filter(c =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.phone.includes(searchQuery)
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Customer Management</h1>
          <p className="text-gray-600 mt-1">Manage your customer database</p>
        </div>
        <button className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700">
          <Plus className="w-5 h-5" />
          Add Customer
        </button>
      </div>

      {/* Search */}
      <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by name or phone number..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
          />
        </div>
      </div>

      {/* Customers Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contact
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Address
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Last Purchase
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total Orders
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Pending Balance
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredCustomers.map((customer) => (
                <tr key={customer.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-green-600 font-medium">
                        {customer.name.charAt(0)}
                      </div>
                      <div className="font-medium text-gray-900">{customer.name}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Phone className="w-4 h-4" />
                      {customer.phone}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <MapPin className="w-4 h-4" />
                      {customer.address}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Calendar className="w-4 h-4" />
                      {customer.lastPurchase}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {customer.totalPurchases} orders
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {customer.balance > 0 ? (
                      <span className="px-2 py-1 bg-orange-100 text-orange-800 text-sm font-medium rounded-full">
                        ₹{customer.balance}
                      </span>
                    ) : (
                      <span className="text-green-600 text-sm font-medium">Settled</span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                    <div className="flex justify-end gap-2">
                      <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-green-600 hover:bg-green-50 rounded-lg">
                        <Edit className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
