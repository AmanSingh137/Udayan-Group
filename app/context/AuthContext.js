"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import authService from '../services/authService';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in on mount
    const currentUser = authService.getCurrentUser();
    if (currentUser) {
      setUser(currentUser);
    }
    setLoading(false);
  }, []);

  const login = async (username, password) => {
    try {
      const userData = await authService.login(username, password);
      setUser(userData);
      return { success: true, data: userData };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Login failed. Please try again.',
      };
    }
  };

  const signup = async (userData) => {
    try {
      const newUser = await authService.signup(userData);
      setUser(newUser);
      return { success: true, data: newUser };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Signup failed. Please try again.',
      };
    }
  };

  const logout = () => {
    authService.logout();
    setUser(null);
  };

  const isAuthenticated = () => {
    return !!user;
  };

  const hasRole = (role) => {
    return user?.role === role;
  };

  const isEmployer = () => {
    return user?.role === 'ROLE_EMPLOYER' || user?.role === 'ROLE_ADMIN';
  };

  const isCandidate = () => {
    return user?.role === 'ROLE_CANDIDATE';
  };

  const isAdmin = () => {
    return user?.role === 'ROLE_ADMIN';
  };

  const value = {
    user,
    login,
    signup,
    logout,
    isAuthenticated,
    hasRole,
    isEmployer,
    isCandidate,
    isAdmin,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    // Don't throw error, return null to allow public access
    return null;
  }
  return context;
};

export default AuthContext;



