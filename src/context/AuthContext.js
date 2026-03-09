import React, { createContext, useState, useEffect } from "react";
import axios from "../api/api";

// Create context
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(
    localStorage.getItem("token") || null
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Persist token in localStorage whenever it changes
  useEffect(() => {
    if (token) localStorage.setItem("token", token);
    else localStorage.removeItem("token");
  }, [token]);

  // Login function
  const login = async (email, password) => {
    setLoading(true);
    setError("");
    try {
      const res = await axios.post("/auth/login", { email, password });
      const { token, user } = res.data;
      setUser(user);
      setToken(token);
      return { success: true }; // return to let page handle navigation
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
      return { success: false };
    } finally {
      setLoading(false);
    }
  };

  // Logout function
  const logout = () => {
    setUser(null);
    setToken(null);
  };

  // Register function
  const register = async (name, email, password) => {
    setLoading(true);
    setError("");
    try {
      await axios.post("/auth/register", { name, email, password });
      return { success: true };
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
      return { success: false };
    } finally {
      setLoading(false);
    }
  };

  // Verify email function
  const verifyEmail = async (email, code) => {
    setLoading(true);
    setError("");
    try {
      await axios.post("/auth/verify-email", { email, code });
      return { success: true };
    } catch (err) {
      setError(err.response?.data?.message || "Verification failed");
      return { success: false };
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, token, loading, error, login, logout, register, verifyEmail }}
    >
      {children}
    </AuthContext.Provider>
  );
};