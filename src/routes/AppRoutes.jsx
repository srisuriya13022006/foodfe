import { Routes, Route } from 'react-router-dom';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Home from '../pages/Home';
import RestaurantMenu from '../pages/RestaurantMenu';
import Cart from '../pages/Cart';
import OrderTracking from '../pages/OrderTracking';
import AdminDashboard from '../pages/AdminDashboard';
import AddRestaurant from '../pages/AddRestaurant';
import AddMenu from '../pages/AddMenu';
import AdminOrders from '../pages/AdminOrders';
import DeliveryDashboard from '../pages/DeliveryDashboard';
import ProtectedRoute from './ProtectedRoute';

const AppRoutes = () => (
  <Routes>
    {/* Public Routes */}
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />
    <Route path="/" element={<Home />} />
    <Route path="/restaurant/:id" element={<RestaurantMenu />} />

    {/* Protected Customer Routes (User must be logged in to checkout) */}
    <Route 
      path="/cart" 
      element={<ProtectedRoute><Cart /></ProtectedRoute>} 
    />
    <Route 
      path="/order/:id" 
      element={<ProtectedRoute><OrderTracking /></ProtectedRoute>} 
    />

    {/* Delivery Routes */}
    <Route
      path="/delivery"
      element={
        <ProtectedRoute role="DELIVERY">
          <DeliveryDashboard />
        </ProtectedRoute>
      }
    />

    {/* Admin Routes */}
    <Route
      path="/admin"
      element={
        <ProtectedRoute role="ADMIN">
          <AdminDashboard />
        </ProtectedRoute>
      }
    />
    <Route 
      path="/admin/orders" 
      element={<ProtectedRoute role="ADMIN"><AdminOrders /></ProtectedRoute>} 
    />
    <Route 
      path="/admin/add-restaurant" 
      element={<ProtectedRoute role="ADMIN"><AddRestaurant /></ProtectedRoute>} 
    />
    <Route 
      path="/admin/add-menu" 
      element={<ProtectedRoute role="ADMIN"><AddMenu /></ProtectedRoute>} 
    />
  </Routes>
);

export default AppRoutes;