import axios from 'axios';
import { store } from '../store/store';

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_PRODUCTION_URL,
});

// Request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const { token } = store.getState().auth;
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    // Automatically set Content-Type based on data
    if (!config.headers['Content-Type']) {
      if (config.data instanceof FormData) {
        config.headers['Content-Type'] = 'multipart/form-data';
      } else {
        config.headers['Content-Type'] = 'application/json';
      }
    }
    
    config.headers['Accept'] = 'application/json';
    config.headers['X-Requested-With'] = 'XMLHttpRequest';
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle token expiration
      localStorage.removeItem('access_token');
      window.location.href = '/';
    }
    return Promise.reject(error);
  }
);
export default axiosInstance;