import api from './axiosConfig';

const BASE = import.meta.env.VITE_ORDER_API;

export const createOrder = (data) =>
  api.post(`${BASE}/orders`, data).then(res => res.data);

export const getOrder = (id) =>
  api.get(`${BASE}/orders/${id}`).then(res => res.data);

// 🔹 NEW
export const getOrdersByRestaurant = (restaurantId) =>
  api.get(`${BASE}/orders`, {
    params: { restaurantId }
  }).then(res => res.data);

export const updateOrderStatus = (orderId, status) =>
  api.put(`${BASE}/orders/${orderId}/status`, { status });
