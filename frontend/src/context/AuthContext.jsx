/* eslint-disable react-refresh/only-export-components */
import { createContext, useState, useEffect, useCallback } from 'react';
import apiClient from '../services/apiClient';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize auth state from token/localStorage
  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem('employeeToken');
      if (token) {
        try {
          const res = await apiClient.get('/auth/me');
          setUser(res.data.data);
          setIsAuthenticated(true);
        } catch (error) {
          console.error('Session expired or invalid token', error);
          localStorage.removeItem('employeeToken');
          setUser(null);
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
      
      // We only want employees to log in here
      if (data.role !== 'employee') {
         return { success: false, message: 'Invalid credentials or unauthorized access.' };
      }

      localStorage.setItem('employeeToken', data.token);
      
      setUser(data);
      setIsAuthenticated(true);
      return { success: true };
    } catch (error) {
      console.error('Login error', error);
      const message = error.response?.data?.message || error.response?.data?.errors?.[0] || 'An error occurred during login';
      return { success: false, message };
    }
  }, []);

  const signup = useCallback(async (userData) => {
    try {
      const res = await apiClient.post('/auth/register', userData);
      const { data } = res.data;
      
      // Assume newly registered user is an employee
      localStorage.setItem('employeeToken', data.token);
      
      setUser(data);
      setIsAuthenticated(true);
      return { success: true };
    } catch (error) {
      console.error('Signup error', error);
      const message = error.response?.data?.message || error.response?.data?.errors?.[0] || 'An error occurred during signup';
      return { success: false, message };
    }
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('employeeToken');
    setUser(null);
    setIsAuthenticated(false);
  }, []);

  const updateProfile = useCallback(async (data) => {
    // Usually there would be a PUT /api/auth/me endpoint here.
    // Since backend only has GET /me right now, we just simulate updating local state
    // In a real scenario, we'd hit the API and await the response.
    setUser(prev => ({ ...prev, ...data }));
  }, []);

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, isLoading, login, signup, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
}
