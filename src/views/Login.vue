<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="4">
        <v-card class="elevation-12">
          <v-toolbar color="primary" dark flat>
            <v-toolbar-title>Login</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <div class="text-center mb-4">
              <p>Si el backend está inactivo, presiona el botón para despertarlo.</p>
              <v-btn @click="wakeUpServer" :loading="isWakingUp" :disabled="isWakingUp" color="secondary">
                Despertar Servidor
              </v-btn>
              <p v-if="wakeUpMessage" class="mt-2" :class="wakeUpError ? 'text-error' : 'text-success'">{{ wakeUpMessage }}</p>
            </div>

            <v-form @submit.prevent="handleLogin">
              <v-text-field
                label="Username"
                v-model="username"
                prepend-icon="mdi-account"
                type="text"
                required
                :disabled="isLoading || isWakingUp"
              ></v-text-field>
              <v-text-field
                label="Password"
                v-model="password"
                prepend-icon="mdi-lock"
                type="password"
                required
                :disabled="isLoading || isWakingUp"
              ></v-text-field>
              
              <v-alert v-if="errorMessage" type="error" dense>{{ errorMessage }}</v-alert>

              <div v-if="isLoading" class="text-center my-4">
                <v-progress-circular indeterminate color="primary"></v-progress-circular>
                <p class="mt-2">Iniciando sesión...</p>
              </div>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" type="submit" :disabled="isLoading || isWakingUp">Login</v-btn>
              </v-card-actions>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref } from 'vue';
import { useAuthStore } from '../stores/auth';
import { useRouter } from 'vue-router';
import axios from 'axios';

const username = ref('');
const password = ref('');
const errorMessage = ref('');
const isLoading = ref(false);
const isWakingUp = ref(false);
const wakeUpMessage = ref('');
const wakeUpError = ref(false);

const authStore = useAuthStore();
const router = useRouter();

const API_URL = import.meta.env.VITE_API_URL;

const wakeUpServer = async () => {
  isWakingUp.value = true;
  wakeUpMessage.value = 'Despertando el servidor... Esto puede tardar hasta 2 minutos.';
  wakeUpError.value = false;
  try {
    const response = await axios.get(`${API_URL}/auth/`);
    if (response.data.status === 'UP') {
      wakeUpMessage.value = '¡El servidor está listo! Ya puedes iniciar sesión.';
    } else {
      wakeUpMessage.value = 'El servidor respondió, pero no está listo. Inténtalo de nuevo.';
      wakeUpError.value = true;
    }
  } catch (error) {
    wakeUpMessage.value = 'Error al conectar con el servidor. Por favor, inténtalo de nuevo más tarde.';
    wakeUpError.value = true;
  } finally {
    isWakingUp.value = false;
  }
};

const handleLogin = async () => {
  isLoading.value = true;
  errorMessage.value = '';
  try {
    await authStore.login(username.value, password.value);
    router.push('/');
  } catch (error) {
    errorMessage.value = error.message;
  } finally {
    isLoading.value = false;
  }
};
</script>