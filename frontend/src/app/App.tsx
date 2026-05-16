import { BrowserRouter, Routes, Route, Navigate } from 'react-router';
import Login from './components/Login';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import POSBilling from './components/POSBilling';
import ProductManagement from './components/ProductManagement';
import CustomerManagement from './components/CustomerManagement';
import LendingManagement from './components/LendingManagement';
import SalesHistory from './components/SalesHistory';
import Reports from './components/Reports';
import UserManagement from './components/UserManagement';
import Settings from './components/Settings';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Layout><Dashboard /></Layout>} />
        <Route path="/billing" element={<Layout><POSBilling /></Layout>} />
        <Route path="/products" element={<Layout><ProductManagement /></Layout>} />
        <Route path="/customers" element={<Layout><CustomerManagement /></Layout>} />
        <Route path="/lending" element={<Layout><LendingManagement /></Layout>} />
        <Route path="/sales" element={<Layout><SalesHistory /></Layout>} />
        <Route path="/reports" element={<Layout><Reports /></Layout>} />
        <Route path="/users" element={<Layout><UserManagement /></Layout>} />
        <Route path="/settings" element={<Layout><Settings /></Layout>} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}