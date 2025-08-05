import { defineStore } from 'pinia';

export const useNotificationStore = defineStore('notification', {
  state: () => ({
    message: '',
    color: '',
    visible: false,
  }),
  actions: {
    show(message, color = 'success') {
      this.message = message;
      this.color = color;
      this.visible = true;
    },
    hide() {
      this.visible = false;
    },
  },
});
