import axios from 'axios';
import { useAuthStore } from '../stores/authStore.js';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});

axiosInstance.interceptors.request.use((config) => {
  const authStore = useAuthStore();
  if (authStore.isLoggedIn) {
    config.headers.Authorization = `Bearer ${authStore.token}`;
  }
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const authStore = useAuthStore();
    if (error.response && error.response.status === 401) {
      authStore.logout();
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
