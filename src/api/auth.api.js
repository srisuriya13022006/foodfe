import axios from 'axios';

const BASE = import.meta.env.VITE_AUTH_API;

export const login = (credentials) =>
  axios.post(`${BASE}/auth/login`, credentials);

export const register = (data) =>
  axios.post(`${BASE}/auth/register`, data);
