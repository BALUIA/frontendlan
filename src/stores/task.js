import { defineStore } from 'pinia';
import axios from 'axios';

const API_URL = 'https://backendlan.onrender.com/api/tasks';

export const useTaskStore = defineStore('task', {
  state: () => ({
    userTasks: [],
    allTasks: [],
  }),
  actions: {
    async createTask(taskData) {
      try {
        await axios.post(API_URL, taskData);
      } catch (error) {
        throw new Error(error.response?.data?.message || 'Failed to create task');
      }
    },
    async fetchMyTasks() {
      try {
        const response = await axios.get(`${API_URL}/my-tasks`);
        this.userTasks = response.data;
      } catch (error) {
        console.error('Error fetching user tasks:', error);
        throw error;
      }
    },
    async fetchAllTasks() {
      try {
        const response = await axios.get(`${API_URL}/all`);
        this.allTasks = response.data;
      } catch (error) {
        console.error('Error fetching all tasks:', error);
        throw error;
      }
    },
    async markAsCompleted(taskId) {
      try {
        await axios.put(`${API_URL}/${taskId}/complete`);
        // Refresh tasks after marking one as complete
        await this.fetchMyTasks();
        await this.fetchAllTasks(); // Also refresh all tasks for admin view
      } catch (error) {
        console.error('Error marking task as completed:', error);
        throw error;
      }
    },
  },
});
