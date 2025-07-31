<template>
  <v-container>
    <h2 class="text-h4 mb-4">Admin Dashboard</h2>

    <v-card class="mb-4">
      <v-card-title>Create New User</v-card-title>
      <v-card-text>
        <v-form @submit.prevent="handleRegister">
          <v-text-field v-model="username" label="Username" required></v-text-field>
          <v-text-field v-model="password" label="Password" type="password" required></v-text-field>
          <v-select v-model="role" :items="['user', 'admin']" label="Role"></v-select>
          <v-btn type="submit" color="primary">Create User</v-btn>
          <v-alert v-if="successMessage" type="success" class="mt-2">{{ successMessage }}</v-alert>
          <v-alert v-if="errorMessage" type="error" class="mt-2">{{ errorMessage }}</v-alert>
        </v-form>
      </v-card-text>
    </v-card>

    <v-card class="mb-4">
      <v-card-title>Products</v-card-title>
      <v-card-text>
        <v-form @submit.prevent="handleAddProduct">
          <v-row>
            <v-col cols="12" md="6">
              <v-text-field v-model="newProduct.name" label="Product Name" required></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field v-model="newProduct.description" label="Description"></v-text-field>
            </v-col>
            <v-col cols="12" md="4">
              <v-text-field v-model.number="newProduct.purchasePrice" label="Purchase Price" type="number" step="0.01" required></v-text-field>
            </v-col>
            <v-col cols="12" md="4">
              <v-text-field v-model.number="newProduct.sellingPrice" label="Selling Price" type="number" step="0.01" required></v-text-field>
            </v-col>
            <v-col cols="12" md="4">
              <v-text-field v-model.number="newProduct.stock" label="Stock" type="number" required></v-text-field>
            </v-col>
          </v-row>
          <v-btn type="submit" color="primary">Add Product</v-btn>
          <v-alert v-if="productSuccessMessage" type="success" class="mt-2">{{ productSuccessMessage }}</v-alert>
          <v-alert v-if="productErrorMessage" type="error" class="mt-2">{{ productErrorMessage }}</v-alert>
        </v-form>
      </v-card-text>
    </v-card>

    <v-card>
      <v-card-title>Registered Users</v-card-title>
      <v-card-text>
        <v-responsive>
          <v-table>
            <thead>
              <tr>
                <th class="text-left">Username</th>
                <th class="text-left">Role</th>
                <th class="text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="user in users" :key="user.id">
                <td>{{ user.userName }}</td>
                <td>{{ user.role.name }}</td>
                <td>
                  <v-btn @click="deleteUser(user.id)" color="error">Delete</v-btn>
                </td>
              </tr>
            </tbody>
          </v-table>
        </v-responsive>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useAuthStore } from '../stores/auth';
import { useProductStore } from '../stores/product';

const username = ref('');
const password = ref('');
const role = ref('user');
const successMessage = ref('');
const errorMessage = ref('');
const users = ref([]);
const authStore = useAuthStore();
const productStore = useProductStore();

const productSuccessMessage = ref('');
const productErrorMessage = ref('');

const newProduct = ref({
  name: '',
  description: '',
  purchasePrice: 0,
  sellingPrice: 0,
  stock: 0,
});

const products = ref([]);

const handleRegister = async () => {
  try {
    await authStore.register(username.value, password.value, role.value);
    successMessage.value = 'User created successfully!';
    errorMessage.value = '';
    productSuccessMessage.value = '';
    productErrorMessage.value = '';
    fetchUsers();
  } catch (error) {
    errorMessage.value = error.message;
    successMessage.value = '';
  }
};

const fetchUsers = async () => {
  try {
    users.value = await authStore.getAllUsers();
  } catch (error) {
    errorMessage.value = error.message;
  }
};

const deleteUser = async (id) => {
  try {
    await authStore.deleteUser(id);
    fetchUsers();
  } catch (error) {
    errorMessage.value = error.message;
  }
};

const fetchProducts = async () => {
  try {
    await productStore.fetchProducts();
    products.value = productStore.products;
  } catch (error) {
    errorMessage.value = error.message;
  }
};

const handleAddProduct = async () => {
  try {
    await productStore.createProduct(newProduct.value);
    fetchProducts();
    newProduct.value = {
      name: '',
      description: '',
      purchasePrice: 0,
      sellingPrice: 0,
      stock: 0,
    };
    productSuccessMessage.value = 'Producto agregado exitosamente!';
    productErrorMessage.value = '';
    successMessage.value = '';
    errorMessage.value = '';
  } catch (error) {
    productErrorMessage.value = error.message;
    productSuccessMessage.value = '';
  }
};

onMounted(() => {
  fetchUsers();
  fetchProducts();
});
</script>
