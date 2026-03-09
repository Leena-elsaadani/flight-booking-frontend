// src/api/api.js
import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "http://localhost:5000/api",
});

// Request interceptor to attach JWT token
api.interceptors.request.use(config => {
  const token = localStorage.getItem("token"); // must match your AuthContext key
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Optional: handle 401 errors globally
api.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token"); // auto logout
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default api;