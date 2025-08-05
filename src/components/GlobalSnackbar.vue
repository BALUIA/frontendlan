<template>
  <v-snackbar
    v-model="notification.visible"
    :color="notification.color"
    :timeout="4000"
    location="top right"
  >
    {{ notification.message }}
    <template v-slot:actions>
      <v-btn variant="text" @click="notification.hide">
        Cerrar
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script setup>
import { useNotificationStore } from '@/stores/notification';

const notification = useNotificationStore();
</script>
