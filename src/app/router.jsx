import { BrowserRouter, Routes, Route } from "react-router-dom";
import DashboardLayout from "../components/layout/DashboardLayout";
import Login from "../features/auth/Login";
import Register from "../features/auth/RegisterComponent";
import ProtectedRoute from "../components/layout/ProtectedRoute";
import ProductList from "../features/products/ProductList";
import CreateProduct from "../features/products/CreateProduct";
import OrderHistory from "../features/orders/OrderHistory";
import Dashboard from "../features/dashboard/dashboard";
const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Routes */}

        <Route element={<ProtectedRoute />}>
          <Route element={<DashboardLayout />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/products" element={<ProductList />} />
            <Route path="/products/create" element={<CreateProduct />} />
            <Route path="/orders/" element={<OrderHistory />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
