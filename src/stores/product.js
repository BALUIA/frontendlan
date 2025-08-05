import { defineStore } from 'pinia';
import axios from 'axios';

const API_URL = `${import.meta.env.VITE_API_URL}/api/products`;

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
        throw error;
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
    async updateProduct(product) {
      try {
        await axios.put(`${API_URL}/${product.id}`, product);
      } catch (error) {
        console.error('Error updating product:', error);
        throw error;
      }
    },
    async deleteProduct(id) {
      try {
        await axios.delete(`${API_URL}/${id}`);
      } catch (error) {
        console.error('Error deleting product:', error);
        throw error;
      }
    },
  },
});