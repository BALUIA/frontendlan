<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="10" md="8">
        <v-card class="elevation-12 text-center pa-5">
          <h1 class="text-h4 text-primary mb-4">¡Bienvenido, {{ authStore.username }}!</h1>
          <p class="text-body-1 text-grey-darken-1">
            Este es el aplicativo para la administración del LAN CENTER SUITEGAMING.
          </p>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { useAuthStore } from '@/stores/auth';
const authStore = useAuthStore();
</script>
