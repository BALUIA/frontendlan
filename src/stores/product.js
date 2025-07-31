import { defineStore } from 'pinia';
import axios from 'axios';

const API_URL = 'https://backendlan.onrender.com/api/products';

export const useProductStore = defineStore('product', {
  state: () => ({
    products: [],
  }),
  actions: {
    async fetchProducts() {
      try {
        const response = await axios.get(API_URL);
        this.products = response.data;
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    },
    async createProduct(product) {
      try {
        await axios.post(API_URL, product);
      } catch (error) {
        console.error('Error creating product:', error);
        throw error;
      }
    },
  },
});
