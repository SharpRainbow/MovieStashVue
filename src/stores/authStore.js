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
      this.token = loginResponse.data.token;
      localStorage.setItem('token', this.token);
      const payload = JSON.parse(atob(this.token.split('.')[1]));
      this.user = { userId: payload.sub, role: payload.aud[0] };
      return null;
    } catch (error) {
      return error;
    }
  }

  function logout() {
    this.token = null;
    this.user = null;
    localStorage.removeItem('token');
  }

  function hasRole(role) {
    return this.user.value?.role === role
  }

  function checkToken() {
    if (!this.token)
      return;

    try {
      const payload = JSON.parse(atob(this.token.split('.')[1]));
      const currentTime = Math.floor(Date.now() / 1000);

      if (payload.exp && payload.exp < currentTime) {
        console.log('Token expired');
        this.logout();
      } else {
        this.user = { userId: payload.sub, role: payload.aud[0] };
      }
    } catch (e) {
      console.error('Invalid token', e);
      this.logout();
    }
  }

  return { token, user, isLoggedIn, hasRole, login, logout, checkToken };
});