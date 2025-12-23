import api from './axiosConfig';

const BASE = import.meta.env.VITE_DELIVERY_API;

export const assignDelivery = (orderId) =>
  api.post(`${BASE}/delivery/assign`, { orderId });

export const getMyDeliveries = () =>
  api.get(`${BASE}/delivery/my-deliveries`).then(res => res.data);
