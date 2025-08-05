<template>
  <v-container>
    <div v-if="isPageLoading" class="text-center">
      <v-progress-circular indeterminate color="primary"></v-progress-circular>
      <p>Loading Dashboard...</p>
    </div>
    <div v-else>
      <h2 class="text-h4 mb-4">Admin Dashboard</h2>

      <v-card class="mb-4">
        <v-card-title>Create New User</v-card-title>
        <v-card-text>
          <v-form @submit.prevent="handleRegister">
            <v-text-field v-model="username" label="Username" required :disabled="isRegistering"></v-text-field>
            <v-text-field v-model="password" label="Password" type="password" required :disabled="isRegistering"></v-text-field>
            <v-select v-model="role" :items="['user', 'admin']" label="Role" :disabled="isRegistering"></v-select>
            <v-btn type="submit" color="primary" :loading="isRegistering" :disabled="isRegistering">Create User</v-btn>
          </v-form>
        </v-card-text>
      </v-card>

      <v-card class="mb-4">
        <v-card-title>Products</v-card-title>
        <v-card-text>
          <v-form @submit.prevent="handleAddProduct">
            <v-row>
              <v-col cols="12" md="6">
                <v-text-field v-model="newProduct.name" label="Product Name" required :disabled="isAddingProduct"></v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field v-model="newProduct.description" label="Description" :disabled="isAddingProduct"></v-text-field>
              </v-col>
              <v-col cols="12" md="4">
                <v-text-field v-model.number="newProduct.purchasePrice" label="Purchase Price" type="number" step="0.01" required :disabled="isAddingProduct"></v-text-field>
              </v-col>
              <v-col cols="12" md="4">
                <v-text-field v-model.number="newProduct.sellingPrice" label="Selling Price" type="number" step="0.01" required :disabled="isAddingProduct"></v-text-field>
              </v-col>
              <v-col cols="12" md="4">
                <v-text-field v-model.number="newProduct.stock" label="Stock" type="number" required :disabled="isAddingProduct"></v-text-field>
              </v-col>
            </v-row>
            <v-btn type="submit" color="primary" :loading="isAddingProduct" :disabled="isAddingProduct">Add Product</v-btn>
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
                    <v-btn @click="deleteUser(user.id)" color="error" :loading="deletingUserId === user.id" :disabled="!!deletingUserId">Delete</v-btn>
                  </td>
                </tr>
              </tbody>
            </v-table>
          </v-responsive>
        </v-card-text>
      </v-card>
    </div>
  </v-container>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue';
import { useAuthStore } from '../stores/auth';
import { useProductStore } from '../stores/product';
import { useNotificationStore } from '../stores/notification';

const username = ref('');
const password = ref('');
const role = ref('user');
const users = ref([]);
const authStore = useAuthStore();
const productStore = useProductStore();
const notificationStore = useNotificationStore();

const isPageLoading = ref(true);
const isRegistering = ref(false);
const isAddingProduct = ref(false);
const deletingUserId = ref(null);

const newProduct = ref({
  name: '',
  description: '',
  purchasePrice: 0,
  sellingPrice: 0,
  stock: 0,
});

const products = ref([]);

const totalInventoryValue = computed(() => {
  return products.value.reduce((total, product) => {
    return total + (product.sellingPrice * product.stock);
  }, 0);
});

const handleRegister = async () => {
  isRegistering.value = true;
  await nextTick();
  try {
    await authStore.register(username.value, password.value, role.value);
    notificationStore.show('User created successfully!');
    fetchUsers();
  } catch (error) {
    notificationStore.show(error.message, 'error');
  } finally {
    isRegistering.value = false;
  }
};

const fetchUsers = async () => {
  try {
    users.value = await authStore.getAllUsers();
  } catch (error) {
    notificationStore.show(error.message, 'error');
  }
};

const deleteUser = async (id) => {
  deletingUserId.value = id;
  await nextTick();
  try {
    await authStore.deleteUser(id);
    notificationStore.show('User deleted successfully!');
    fetchUsers();
  } catch (error) {
    notificationStore.show(error.message, 'error');
  } finally {
    deletingUserId.value = null;
  }
};

const fetchProducts = async () => {
  try {
    await productStore.fetchProducts();
    products.value = productStore.products;
  } catch (error) {
    notificationStore.show(error.message, 'error');
  }
};

const handleAddProduct = async () => {
  isAddingProduct.value = true;
  await nextTick();
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
    notificationStore.show('Producto agregado exitosamente!');
  } catch (error) {
    notificationStore.show(error.message, 'error');
  } finally {
    isAddingProduct.value = false;
  }
};

onMounted(async () => {
  isPageLoading.value = true;
  try {
    await Promise.all([
      fetchUsers(),
      fetchProducts(),
    ]);
  } finally {
    isPageLoading.value = false;
  }
});
</script>
