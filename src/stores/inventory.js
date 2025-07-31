import { defineStore } from 'pinia';
import axios from 'axios';

const API_URL = 'https://backendlan.onrender.com/api/inventory';

export const useInventoryStore = defineStore('inventory', {
  state: () => ({
    movements: [],
  }),
  actions: {
    async fetchMovements() {
      try {
        const response = await axios.get(API_URL);
        this.movements = response.data;
      } catch (error) {
        console.error('Error fetching movements:', error);
      }
    },
    async createMovement(movement) {
      try {
        await axios.post(API_URL, movement);
      } catch (error) {
        console.error('Error creating movement:', error);
        throw error;
      }
    },
  },
});
