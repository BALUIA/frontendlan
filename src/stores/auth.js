import { defineStore } from 'pinia';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import router from '../router'; // Import the router

const API_URL = import.meta.env.VITE_API_URL;

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: localStorage.getItem('token') || null,
    user: null,
  }),
  getters: {
    isAuthenticated: (state) => !!state.token,
    isAdmin: (state) => {
      if (!state.token) return false;
      const decoded = jwtDecode(state.token);
      return decoded.roles?.includes('ROLE_ADMIN');
    },
  },
  actions: {
    async login(username, password) {
      try {
        const response = await axios.post(`${API_URL}/auth/login`, {
          userName: username,
          password: password,
        });
        this.token = response.data;
        localStorage.setItem('token', response.data);
        axios.defaults.headers.common['Authorization'] = `Bearer ${response.data}`;
        const decoded = jwtDecode(response.data);
        this.user = { roles: decoded.roles };
      } catch (error) {
        throw new Error(error.response?.data || 'Login failed');
      }
    },
    async register(username, password, role) {
      try {
        await axios.post(`${API_URL}/auth/register`, {
          userName: username,
          password: password,
          role: role,
        });
      } catch (error) {
        throw new Error(error.response?.data || 'Registration failed');
      }
    },
    logout() {
      this.token = null;
      this.user = null;
      localStorage.removeItem('token');
      delete axios.defaults.headers.common['Authorization'];
      router.push('/login'); // Redirect to login page
    },
    async getAllUsers() {
      try {
        const response = await axios.get(`${API_URL}/api/admin/users`);
        return response.data;
      } catch (error) {
        throw new Error(error.response?.data || 'Failed to fetch users');
      }
    },
    async deleteUser(id) {
      try {
        await axios.delete(`${API_URL}/api/admin/users/${id}`);
      } catch (error) {
        throw new Error(error.response?.data || 'Failed to delete user');
      }
    },
  },
});
