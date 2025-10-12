/**
 * API Configuration and Base Setup
 * This file contains the axios instance and API base URL configuration
 */

import axios from 'axios';

// API Base URL - Change this for production
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api';

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token (optional)
apiClient.interceptors.request.use(
  (config) => {
    try {
      const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (e) {
      // Ignore localStorage errors
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid - only redirect if we had a token
      if (typeof window !== 'undefined') {
        const hadToken = localStorage.getItem('token');
        if (hadToken) {
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          // Don't redirect to login automatically for public pages
          // window.location.href = '/login';
        }
      }
    }
    return Promise.reject(error);
  }
);

export default apiClient;



