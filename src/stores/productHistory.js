import { defineStore } from 'pinia';
import axios from 'axios';

const API_URL = (import.meta.env.VITE_API_URL || 'http://localhost:8080') + '/api/products';

export const useProductHistoryStore = defineStore('productHistory', {
  state: () => ({
    productsHistory: [],
  }),
  actions: {
    async fetchProductHistory() {
      try {
        const response = await axios.get(`${API_URL}/history`);
        this.productsHistory = response.data;
      } catch (error) {
        console.error('Error fetching product history:', error);
        throw error;
      }
    },
  },
});
