import { defineStore } from 'pinia';
import axios from 'axios';

const API_URL = `${import.meta.env.VITE_API_URL}/api/caja`;

export const useCajaStore = defineStore('caja', {
  state: () => ({
    balance: 0,
    gastos: [],
  }),
  actions: {
    async fetchBalance() {
      try {
        const response = await axios.get(API_URL);
        this.balance = response.data.balance;
      } catch (error) {
        console.error('Error fetching caja balance:', error);
        throw error;
      }
    },
    async fetchGastos() {
      try {
        const response = await axios.get(`${API_URL}/gastos`);
        this.gastos = response.data;
      } catch (error) {
        console.error('Error fetching gastos:', error);
        throw error;
      }
    },
    async registrarGasto(gasto) {
      try {
        await axios.post(`${API_URL}/gastos`, gasto);
        // After registering, refresh balance and gastos list
        await this.fetchBalance();
        await this.fetchGastos();
      } catch (error) {
        console.error('Error registering gasto:', error);
        throw error.response?.data?.message || 'Failed to register gasto';
      }
    },
  },
});
