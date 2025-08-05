<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="4">
        <v-card class="elevation-12">
          <v-toolbar color="primary" dark flat>
            <v-toolbar-title>Login</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-form @submit.prevent="handleLogin">
              <v-text-field
                label="Username"
                v-model="username"
                prepend-icon="mdi-account"
                type="text"
                required
                :disabled="isLoading"
              ></v-text-field>
              <v-text-field
                label="Password"
                v-model="password"
                prepend-icon="mdi-lock"
                type="password"
                required
                :disabled="isLoading"
              ></v-text-field>

              <div v-if="isLoading" class="text-center my-4">
                <v-progress-circular indeterminate color="primary"></v-progress-circular>
                <p class="mt-2">Iniciando sesión...</p>
              </div>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" type="submit" :disabled="isLoading">Login</v-btn>
              </v-card-actions>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, nextTick } from 'vue';
import { useAuthStore } from '../stores/auth';
import { useRouter } from 'vue-router';
import { useNotificationStore } from '../stores/notification';

const username = ref('');
const password = ref('');
const isLoading = ref(false);
const authStore = useAuthStore();
const router = useRouter();
const notificationStore = useNotificationStore();

const handleLogin = async () => {
  isLoading.value = true;
  await nextTick(); // Espera a que el DOM se actualice

  try {
    await authStore.login(username.value, password.value);
    router.push('/');
  } catch (error) {
    notificationStore.show(error.message, 'error');
  } finally {
    isLoading.value = false;
  }
};
</script>
