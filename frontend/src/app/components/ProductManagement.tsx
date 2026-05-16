import { useState } from 'react';
import { Search, Plus, Edit, Trash2, AlertTriangle, Package } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  category: string;
  sku: string;
  purchasePrice: number;
  sellingPrice: number;
  stock: number;
  threshold: number;
}

const sampleProducts: Product[] = [
  { id: '1', name: 'Rice - 5kg', category: 'Grains', sku: 'RICE001', purchasePrice: 220, sellingPrice: 250, stock: 45, threshold: 20 },
  { id: '2', name: 'Toor Dal - 1kg', category: 'Pulses', sku: 'DAL001', purchasePrice: 100, sellingPrice: 120, stock: 8, threshold: 20 },
  { id: '3', name: 'Cooking Oil - 1L', category: 'Oil', sku: 'OIL001', purchasePrice: 160, sellingPrice: 180, stock: 5, threshold: 15 },
  { id: '4', name: 'Atta Flour - 10kg', category: 'Grains', sku: 'ATTA001', purchasePrice: 350, sellingPrice: 380, stock: 30, threshold: 15 },
  { id: '5', name: 'Sugar - 1kg', category: 'Essentials', sku: 'SUGAR001', purchasePrice: 40, sellingPrice: 45, stock: 60, threshold: 30 },
  { id: '6', name: 'Tea Powder - 250g', category: 'Beverages', sku: 'TEA001', purchasePrice: 75, sellingPrice: 85, stock: 3, threshold: 10 },
];

export default function ProductManagement() {
  const [searchQuery, setSearchQuery] = useState('');
  const [products] = useState<Product[]>(sampleProducts);

  const filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Product Management</h1>
          <p className="text-gray-600 mt-1">Manage your inventory and product catalog</p>
        </div>
        <button className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700">
          <Plus className="w-5 h-5" />
          Add Product
        </button>
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
              placeholder="Search by name, SKU, or category..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
            />
          </div>
          <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none">
            <option>All Categories</option>
            <option>Grains</option>
            <option>Pulses</option>
            <option>Oil</option>
            <option>Essentials</option>
            <option>Beverages</option>
          </select>
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Product
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  SKU
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Purchase Price
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Selling Price
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Stock
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
              {filteredProducts.map((product) => {
                const isLowStock = product.stock < product.threshold;
                return (
                  <tr key={product.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                          <Package className="w-5 h-5 text-gray-600" />
                        </div>
                        <div className="font-medium text-gray-900">{product.name}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {product.sku}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                        {product.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      ₹{product.purchasePrice}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-green-600">
                      ₹{product.sellingPrice}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{product.stock} units</div>
                      <div className="text-xs text-gray-500">Min: {product.threshold}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {isLowStock ? (
                        <span className="flex items-center gap-1 text-red-600 text-sm font-medium">
                          <AlertTriangle className="w-4 h-4" />
                          Low Stock
                        </span>
                      ) : (
                        <span className="text-green-600 text-sm font-medium">In Stock</span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                      <div className="flex justify-end gap-2">
                        <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
