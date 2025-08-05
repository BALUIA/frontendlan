<template>
  <v-app>
    <Navbar />
    <v-main>
      <v-container>
        <router-view />
      </v-container>
    </v-main>
    <GlobalSnackbar />
  </v-app>
</template>

<script setup>
import Navbar from './components/Navbar.vue';
import GlobalSnackbar from './components/GlobalSnackbar.vue';
</script>