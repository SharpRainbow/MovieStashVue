import { defineStore } from 'pinia';
import axios from 'axios'
import { computed, ref } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  const token = ref(localStorage.getItem('token') || null);
  const user = ref(null);
  const isLoggedIn = computed(() => {
    return !!token.value
  });

  async function login(login, password) {
    try {
      const loginResponse = await axios.post('https://168882.msk.web.highserver.ru/api/v1/login', { login, password });
      token.value = loginResponse.data.token;
      localStorage.setItem('token', token.value);
      const payload = JSON.parse(atob(token.value.split('.')[1]));
      user.value = { userId: payload.sub, role: payload.aud[0] };
      return null;
    } catch (error) {
      return error;
    }
  }

  function logout() {
    token.value = null;
    user.value = null;
    localStorage.removeItem('token');
  }

  function hasRole(role) {
    return user.value?.role === role
  }

  function checkToken() {
    if (!token.value)
      return;

    try {
      const payload = JSON.parse(atob(token.value.split('.')[1]));
      const currentTime = Math.floor(Date.now() / 1000);

      if (payload.exp && payload.exp < currentTime) {
        console.log('Token expired');
        logout();
      } else {
        user.value = { userId: payload.sub, role: payload.aud[0] };
      }
    } catch (e) {
      console.error('Invalid token', e);
      logout();
    }
  }

  return { token, user, isLoggedIn, hasRole, login, logout, checkToken };
});