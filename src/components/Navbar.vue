<template>
  <v-app-bar app color="primary" dark>
    <v-toolbar-title>
      <router-link to="/" class="white--text text-decoration-none">Auth App</router-link>
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn to="/login" text v-if="!authStore.isAuthenticated">Login</v-btn>
    <v-btn to="/admin" text v-if="authStore.isAdmin">Admin Dashboard</v-btn>
    <v-btn to="/manage-products" text v-if="authStore.isAdmin">Manage Products</v-btn>
    <v-btn to="/product-history" text v-if="authStore.isAuthenticated">Historial de Productos</v-btn>
    <v-btn to="/registrar-turno" text v-if="authStore.isAuthenticated">Registrar Turno</v-btn>
    <v-btn to="/resumen-turnos" text v-if="authStore.isAuthenticated">Resumen</v-btn>
    <v-btn to="/control-caja" text v-if="authStore.isAuthenticated">Control de Caja</v-btn>
    <v-btn to="/my-tasks" text v-if="authStore.isAuthenticated && !authStore.isAdmin">Mis Tareas</v-btn>
    <v-btn to="/admin/tasks" text v-if="authStore.isAdmin">Gestionar Tareas</v-btn>
    <v-btn @click="authStore.logout()" text v-if="authStore.isAuthenticated">Logout</v-btn>
  </v-app-bar>
</template>

<script setup>
import { useAuthStore } from '../stores/auth';

const authStore = useAuthStore();
</script>

<style scoped>
.white--text {
  color: white !important;
}
.text-decoration-none {
  text-decoration: none;
}
</style>