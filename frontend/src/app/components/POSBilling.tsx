import { useState } from 'react';
import { Search, Plus, Minus, Trash2, Camera, X, IndianRupee, CreditCard, Smartphone, Banknote, Check } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  price: number;
  stock: number;
  category: string;
  sku: string;
}

interface CartItem extends Product {
  quantity: number;
}

interface Customer {
  id: string;
  name: string;
  phone: string;
  balance: number;
}

const sampleProducts: Product[] = [
  { id: '1', name: 'Rice - 5kg', price: 250, stock: 45, category: 'Grains', sku: 'RICE001' },
  { id: '2', name: 'Toor Dal - 1kg', price: 120, stock: 8, category: 'Pulses', sku: 'DAL001' },
  { id: '3', name: 'Cooking Oil - 1L', price: 180, stock: 5, category: 'Oil', sku: 'OIL001' },
  { id: '4', name: 'Atta Flour - 10kg', price: 380, stock: 30, category: 'Grains', sku: 'ATTA001' },
  { id: '5', name: 'Sugar - 1kg', price: 45, stock: 60, category: 'Essentials', sku: 'SUGAR001' },
  { id: '6', name: 'Tea Powder - 250g', price: 85, stock: 3, category: 'Beverages', sku: 'TEA001' },
  { id: '7', name: 'Milk - 500ml', price: 28, stock: 25, category: 'Dairy', sku: 'MILK001' },
  { id: '8', name: 'Biscuits', price: 20, stock: 100, category: 'Snacks', sku: 'BISC001' },
];

const sampleCustomers: Customer[] = [
  { id: '1', name: 'Rajesh Kumar', phone: '9876543210', balance: 0 },
  { id: '2', name: 'Priya Sharma', phone: '9876543211', balance: 250 },
  { id: '3', name: 'Vijay Singh', phone: '9876543212', balance: 0 },
];

const categories = ['All', 'Grains', 'Pulses', 'Oil', 'Essentials', 'Beverages', 'Dairy', 'Snacks'];

export default function POSBilling() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [customerSearchQuery, setCustomerSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [discount, setDiscount] = useState(0);
  const [paidAmount, setPaidAmount] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState('cash');
  const [showCustomerModal, setShowCustomerModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  const filteredProducts = sampleProducts.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         p.sku.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const filteredCustomers = sampleCustomers.filter(c =>
    c.name.toLowerCase().includes(customerSearchQuery.toLowerCase()) ||
    c.phone.includes(customerSearchQuery)
  );

  const addToCart = (product: Product) => {
    const existing = cart.find(item => item.id === product.id);
    if (existing) {
      setCart(cart.map(item =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const updateQuantity = (id: string, change: number) => {
    setCart(cart.map(item => {
      if (item.id === id) {
        const newQty = Math.max(1, item.quantity + change);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const removeFromCart = (id: string) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const total = subtotal - discount;
  const balance = total - paidAmount;

  const handleCompleteOrder = () => {
    if (!selectedCustomer) {
      alert('Please select a customer first!');
      return;
    }
    setShowPaymentModal(true);
  };

  const processPayment = () => {
    alert('Order completed successfully!');
    setCart([]);
    setSelectedCustomer(null);
    setDiscount(0);
    setPaidAmount(0);
    setShowPaymentModal(false);
  };

  return (
    <div className="h-[calc(100vh-136px)] flex gap-4">
      {/* Left Panel - Products */}
      <div className="w-1/3 bg-white rounded-xl shadow-sm border border-gray-200 flex flex-col">
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900 mb-3">Products</h2>

          {/* Search */}
          <div className="relative mb-3">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name, SKU, or scan barcode..."
              className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
            />
            <button className="absolute right-2 top-1/2 -translate-y-1/2 p-1 hover:bg-gray-100 rounded">
              <Camera className="w-5 h-5 text-gray-600" />
            </button>
          </div>

          {/* Categories */}
          <div className="flex gap-2 overflow-x-auto pb-2">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1 rounded-lg text-sm whitespace-nowrap ${
                  selectedCategory === cat
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Product List */}
        <div className="flex-1 overflow-y-auto p-2">
          <div className="grid grid-cols-2 gap-2">
            {filteredProducts.map(product => (
              <button
                key={product.id}
                onClick={() => addToCart(product)}
                className="p-3 border border-gray-200 rounded-lg hover:border-green-500 hover:bg-green-50 transition-all text-left"
              >
                <div className="font-medium text-gray-900 mb-1">{product.name}</div>
                <div className="text-green-600 font-bold mb-1">₹{product.price}</div>
                <div className="text-xs text-gray-500">Stock: {product.stock}</div>
                <div className="text-xs text-gray-400">SKU: {product.sku}</div>
              </button>
            ))}
          </div>
        </div>

        <div className="p-3 bg-blue-50 border-t border-blue-200 text-sm text-blue-800 text-center">
          💡 No physical barcode scanner required - Use mobile camera
        </div>
      </div>

      {/* Center Panel - Cart */}
      <div className="flex-1 bg-white rounded-xl shadow-sm border border-gray-200 flex flex-col">
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">Cart</h2>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          {cart.length === 0 ? (
            <div className="h-full flex items-center justify-center text-gray-400">
              Add products to cart to start billing
            </div>
          ) : (
            <div className="space-y-2">
              {cart.map(item => (
                <div key={item.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <div className="font-medium text-gray-900">{item.name}</div>
                    <div className="text-sm text-gray-600">₹{item.price} each</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => updateQuantity(item.id, -1)}
                      className="w-8 h-8 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 flex items-center justify-center"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-12 text-center font-medium">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, 1)}
                      className="w-8 h-8 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 flex items-center justify-center"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="w-24 text-right font-bold text-gray-900">
                    ₹{item.price * item.quantity}
                  </div>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Bill Summary */}
        <div className="border-t border-gray-200 p-4 space-y-3">
          <div className="flex justify-between text-gray-700">
            <span>Subtotal:</span>
            <span className="font-medium">₹{subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-700">Discount:</span>
            <input
              type="number"
              value={discount}
              onChange={(e) => setDiscount(Number(e.target.value))}
              className="w-24 px-2 py-1 border border-gray-300 rounded-lg text-right"
              placeholder="0"
            />
          </div>
          <div className="flex justify-between text-xl font-bold text-gray-900 pt-2 border-t border-gray-200">
            <span>Total:</span>
            <span className="text-green-600">₹{total.toFixed(2)}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="p-4 border-t border-gray-200 grid grid-cols-3 gap-2">
          <button className="py-2 border border-gray-300 rounded-lg hover:bg-gray-50 font-medium">
            Hold Bill
          </button>
          <button
            onClick={() => setCart([])}
            className="py-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 font-medium"
          >
            Cancel
          </button>
          <button
            onClick={handleCompleteOrder}
            disabled={cart.length === 0}
            className="py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Complete
          </button>
        </div>
      </div>

      {/* Right Panel - Customer */}
      <div className="w-80 bg-white rounded-xl shadow-sm border border-gray-200 flex flex-col">
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900 mb-3">Customer</h2>

          {selectedCustomer ? (
            <div className="bg-green-50 border border-green-200 rounded-lg p-3">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <div className="font-bold text-gray-900">{selectedCustomer.name}</div>
                  <div className="text-sm text-gray-600">{selectedCustomer.phone}</div>
                </div>
                <button
                  onClick={() => setSelectedCustomer(null)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              {selectedCustomer.balance > 0 && (
                <div className="text-sm text-orange-600 font-medium">
                  Pending: ₹{selectedCustomer.balance}
                </div>
              )}
            </div>
          ) : (
            <div className="bg-yellow-50 border border-yellow-300 rounded-lg p-3 text-center">
              <p className="text-yellow-800 font-medium mb-2">⚠️ Customer Required</p>
              <button
                onClick={() => setShowCustomerModal(true)}
                className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700"
              >
                Select Customer
              </button>
            </div>
          )}
        </div>

        <div className="flex-1 p-4">
          <h3 className="font-medium text-gray-900 mb-3">Payment Details</h3>

          <div className="space-y-3">
            <div>
              <label className="block text-sm text-gray-700 mb-1">Paid Amount</label>
              <div className="relative">
                <IndianRupee className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="number"
                  value={paidAmount}
                  onChange={(e) => setPaidAmount(Number(e.target.value))}
                  className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg"
                  placeholder="0.00"
                />
              </div>
            </div>

            {balance > 0 && (
              <div className="bg-orange-50 border border-orange-200 rounded-lg p-3">
                <div className="text-sm text-orange-800 mb-1">Remaining (Credit)</div>
                <div className="text-xl font-bold text-orange-600">₹{balance.toFixed(2)}</div>
              </div>
            )}

            <div>
              <label className="block text-sm text-gray-700 mb-2">Payment Method</label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: 'cash', label: 'Cash', icon: Banknote },
                  { id: 'upi', label: 'UPI', icon: Smartphone },
                  { id: 'card', label: 'Card', icon: CreditCard },
                  { id: 'mixed', label: 'Mixed', icon: Check },
                ].map(method => (
                  <button
                    key={method.id}
                    onClick={() => setPaymentMethod(method.id)}
                    className={`p-2 border rounded-lg flex flex-col items-center gap-1 ${
                      paymentMethod === method.id
                        ? 'border-green-600 bg-green-50 text-green-600'
                        : 'border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    <method.icon className="w-5 h-5" />
                    <span className="text-xs">{method.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Customer Selection Modal */}
      {showCustomerModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl w-full max-w-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-gray-900">Select Customer</h3>
              <button
                onClick={() => setShowCustomerModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={customerSearchQuery}
                onChange={(e) => setCustomerSearchQuery(e.target.value)}
                placeholder="Search customer by name or phone..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg"
              />
            </div>

            <div className="space-y-2 max-h-80 overflow-y-auto">
              {filteredCustomers.map(customer => (
                <button
                  key={customer.id}
                  onClick={() => {
                    setSelectedCustomer(customer);
                    setShowCustomerModal(false);
                    setCustomerSearchQuery('');
                  }}
                  className="w-full p-3 border border-gray-200 rounded-lg hover:border-green-500 hover:bg-green-50 text-left"
                >
                  <div className="font-medium text-gray-900">{customer.name}</div>
                  <div className="text-sm text-gray-600">{customer.phone}</div>
                  {customer.balance > 0 && (
                    <div className="text-sm text-orange-600 mt-1">Pending: ₹{customer.balance}</div>
                  )}
                </button>
              ))}
            </div>

            <button className="w-full mt-4 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">
              + Add New Customer
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
