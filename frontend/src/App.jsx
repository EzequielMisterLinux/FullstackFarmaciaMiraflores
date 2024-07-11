import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './components/Home';
import StoreC from './components/StoreC';
import Providers from './components/Providers';
import Productos from './components/ProductsShops';
import Dashboard from './vendor/Dashboard';
import HeaderHome from './HeaderHome';
import EmployeeNavbar from './HeaderEmployee';
import Login from './Login';
import './style.css';
import DashboardOrders from './vendor/DashboardOrders';
import { CartProvider } from './components/context/CartContext'; // Importa el CartProvider

const App = () => {
  return (
    <CartProvider>
      <Router>
        <Routes>
          {/* Client routes */}
          <Route path="/" element={<ClientLayout />}>
            <Route index element={<Home />} />
            <Route path="store" element={<StoreC />} />
            <Route path="providers" element={<Providers />} />
            <Route path="productos/:storeId" element={<Productos />} />
          </Route>
          {/* Employee routes */}
          <Route path="/dashboard/*" element={<ProtectedRoute />}>
            {/* You can add more employee routes here */}
          </Route>
          <Route path="/login" element={<Login />} /> {/* Login route */}
        </Routes>
      </Router>
    </CartProvider>
  );
};

// Layout for clients
const ClientLayout = () => (
  <div>
    <HeaderHome />
    <Routes>
      <Route index element={<Home />} />
      <Route path="store" element={<StoreC />} />
      <Route path="providers" element={<Providers />} />
      <Route path="productos/:storeId" element={<Productos />} />
    </Routes>
  </div>
);

// Layout for employees
const EmployeeLayout = () => (
  <div>
    <EmployeeNavbar />
    <Routes>
      <Route index element={<Dashboard />} />
      <Route path='orders' element={<DashboardOrders />} />
      {/* You can add more employee routes here */}
    </Routes>
  </div>
);

// Protected route component
const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('isAuthenticated');

  return isAuthenticated ? (
    <EmployeeLayout />
  ) : (
    <Navigate to="/login" />
  );
};

export default App;
