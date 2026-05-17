import { createContext, useState, useEffect, useCallback } from 'react';
import apiClient from '../services/apiClient';

export const AdminAuthContext = createContext();

export function AdminAuthProvider({ children }) {
  const [adminUser, setAdminUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Check token on mount
  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem('adminToken');
      if (token) {
        try {
          const res = await apiClient.get('/auth/me');
          setAdminUser(res.data.data);
          setIsAuthenticated(true);
        } catch (error) {
          console.error('Session expired or invalid token', error);
          localStorage.removeItem('adminToken');
          setAdminUser(null);
          setIsAuthenticated(false);
        }
      }
      setIsLoading(false);
    };

    initAuth();
  }, []);

  const login = useCallback(async (email, password) => {
    try {
      const res = await apiClient.post('/auth/login', { email, password });
      const { data } = res.data;
      
      // Enforce admin only
      if (data.role !== 'admin') {
         return { success: false, message: 'Unauthorized. Admin access only.' };
      }

      localStorage.setItem('adminToken', data.token);
      setAdminUser(data);
      setIsAuthenticated(true);
      return { success: true };
    } catch (error) {
      console.error('Admin login error', error);
      const message = error.response?.data?.message || error.response?.data?.errors?.[0] || 'Invalid credentials';
      return { success: false, message };
    }
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('adminToken');
    setAdminUser(null);
    setIsAuthenticated(false);
  }, []);

  const updateProfile = useCallback((data) => {
    setAdminUser((prev) => ({ ...prev, ...data }));
  }, []);

  return (
    <AdminAuthContext.Provider value={{ adminUser, isAuthenticated, isLoading, login, logout, updateProfile }}>
      {children}
    </AdminAuthContext.Provider>
  );
}
