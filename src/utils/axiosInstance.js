import axios from 'axios';
import { useAuthStore } from '../stores/authStore.js';
import { notifyError } from '@/utils/notifications.js'

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
    if (error.response) {
      if (error.response.status === 401) {
        authStore.logout();
      } else if (error.response.data.error === 'user is banned') {
        notifyError('Ваша учетная запись заблокирована!')
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
