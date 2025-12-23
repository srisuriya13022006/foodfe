import api from './axiosConfig';

const BASE = import.meta.env.VITE_RESTAURANT_API;

export const getRestaurantsByCity = (city) =>
  api.get(`${BASE}/restaurants?city=${city}`).then(res => res.data);

export const getMenu = (restaurantId) =>
  api.get(`${BASE}/menu/${restaurantId}`).then(res => res.data);

export const addRestaurant = (data) =>
  api.post(`${BASE}/restaurants`, data);

export const addMenuItem = (data) =>
  api.post(`${BASE}/menu`, data);
