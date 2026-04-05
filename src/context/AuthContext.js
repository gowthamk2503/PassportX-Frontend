import React, { createContext, useState, useCallback } from 'react';
import { authService } from '../services/api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const signup = useCallback(async (data) => {
    setLoading(true);
    setError(null);
    try {
      const response = await authService.signup(data);
      setToken(response.data.token);
      setUser(response.data.user);
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      return response.data;
    } catch (err) {
      const errorMsg = err.response?.data?.message || 'Signup failed';
      setError(errorMsg);
      throw new Error(errorMsg);
    } finally {
      setLoading(false);
    }
  }, []);

  const login = useCallback(async (data) => {
    setLoading(true);
    setError(null);
    try {
      const response = await authService.login(data);
      setToken(response.data.token);
      setUser(response.data.user);
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      return response.data;
    } catch (err) {
      const errorMsg = err.response?.data?.message || 'Login failed';
      setError(errorMsg);
      throw new Error(errorMsg);
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }, []);

  const isAuthenticated = !!token;

  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        token, 
        isAuthenticated, 
        loading, 
        error,
        signup, 
        login, 
        logout 
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
