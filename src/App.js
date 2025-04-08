import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import Home from './components/Home';
import Navbar from './components/Navbar';
import ProductCategories from './components/ProductCategories';
import ProductDetails from './components/ProductDetails';
import Customers from './components/Customers';
import Vendors from './components/Vendors';
import Sales from './components/Sales';
import Purchase from './components/Purchase';
import SalesReport from './components/SalesReport';
import PurchaseReport from './components/PurchaseReport';

function App() {
  const location = useLocation();
  const hideNavbar = location.pathname === '/login' || location.pathname === '/register';

  return (
    <>
      {!hideNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/ProductCategories" element={<ProductCategories />} />
        <Route path="/ProductDetails" element={<ProductDetails />} />
        <Route path="/Customers" element={<Customers />} />
        <Route path="/Vendors" element={<Vendors />} />
        <Route path="/Sales" element={<Sales />} />
        <Route path="/Purchase" element={<Purchase />} />
        <Route path="/SalesReport" element={<SalesReport />} />
        <Route path="/PurchaseReport" element={<PurchaseReport />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </>
  );
}

export default App;
