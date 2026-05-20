import axios from 'axios';
import { API_URL } from '@utils/constants';
import { storage } from '@utils/helpers';
import { STORAGE_KEYS, ERROR_MESSAGES } from '@utils/constants';

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000,
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    const token = storage.get(STORAGE_KEYS.TOKEN);
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    let errorMessage = ERROR_MESSAGES.NETWORK_ERROR;
    
    if (error.response) {
      // Server responded with error
      errorMessage = error.response.data?.message || error.response.statusText;
      
      // Handle authentication errors
      if (error.response.status === 401) {
        storage.remove(STORAGE_KEYS.TOKEN);
        storage.remove(STORAGE_KEYS.USER);
        window.location.href = '/login';
        errorMessage = ERROR_MESSAGES.SESSION_EXPIRED;
      }
      
      // Handle authorization errors
      if (error.response.status === 403) {
        errorMessage = ERROR_MESSAGES.UNAUTHORIZED;
      }
    } else if (error.request) {
      // Request made but no response
      errorMessage = ERROR_MESSAGES.NETWORK_ERROR;
    } else {
      // Error in request setup
      errorMessage = error.message;
    }
    
    return Promise.reject({
      message: errorMessage,
      status: error.response?.status,
      data: error.response?.data,
    });
  }
);

export default api;