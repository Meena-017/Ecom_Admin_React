import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import AdminLayout from "./components/admin/AdminLayout";
import Dashboard from "./components/admin/Dashboard";
import ProductList from "./components/admin/Products/ProductList";
import AddProduct from "./components/admin/Products/AddProduct";
import UserList from "./components/admin/users/UserList";
import AddUser from "./components/admin/users/UserForm";
import LoginPage from "./components/auth/LoginPage";
import SignupPage from "./components/auth/SignupPage";
import PrivateRoute from "./components/common/PrivateRoute";

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Always start at /login */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* Public routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />

        {/* Protected routes */}
        <Route
          path="/dashboard/*"
          element={
            <PrivateRoute>
              <AdminLayout />
            </PrivateRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="products" element={<ProductList />} />
          <Route path="products/add" element={<AddProduct />} />
          <Route path="users" element={<UserList />} />
          <Route path="users/add" element={<AddUser />} />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<h2 className="text-center mt-5">Page Not Found</h2>} />
      </Routes>
    </Router>
  );
}
