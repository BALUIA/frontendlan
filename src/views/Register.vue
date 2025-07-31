<template>
  <div class="row justify-content-center">
    <div class="col-md-6">
      <div class="card">
        <div class="card-header">Register</div>
        <div class="card-body">
          <form @submit.prevent="handleRegister">
            <div class="mb-3">
              <label for="username" class="form-label">Username</label>
              <input type="text" id="username" v-model="username" class="form-control" required>
            </div>
            <div class="mb-3">
              <label for="password" class="form-label">Password</label>
              <input type="password" id="password" v-model="password" class="form-control" required>
            </div>
            <div class="mb-3">
              <label for="role" class="form-label">Role</label>
              <select id="role" v-model="role" class="form-select">
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
            </div>
            <button type="submit" class="btn btn-primary">Register</button>
            <p v-if="successMessage" class="text-success mt-2">{{ successMessage }}</p>
            <p v-if="errorMessage" class="text-danger mt-2">{{ errorMessage }}</p>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useAuthStore } from '../stores/auth';

const username = ref('');
const password = ref('');
const role = ref('user');
const successMessage = ref('');
const errorMessage = ref('');
const authStore = useAuthStore();

const handleRegister = async () => {
  try {
    await authStore.register(username.value, password.value, role.value);
    successMessage.value = 'Registration successful! You can now log in.';
    errorMessage.value = '';
  } catch (error) {
    errorMessage.value = error.message;
    successMessage.value = '';
  }
};
</script>
