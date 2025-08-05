<template>
  <v-container>
    <div v-if="isPageLoading" class="text-center">
      <v-progress-circular indeterminate color="primary"></v-progress-circular>
      <p>Cargando Historial de Productos...</p>
    </div>
    <div v-else>
      <h2 class="text-h4 mb-4">Historial de Productos</h2>
      <v-expansion-panels>
        <v-expansion-panel v-for="product in productsHistory" :key="product.productId">
          <v-expansion-panel-title>
            <v-row>
              <v-col cols="8">
                <strong>{{ product.productName }}</strong> - Stock Actual: {{ product.currentStock }}
              </v-col>
            </v-row>
          </v-expansion-panel-title>
          <v-expansion-panel-text>
            <v-table dense>
              <thead>
                <tr>
                  <th class="text-left">Fecha</th>
                  <th class="text-left">Tipo</th>
                  <th class="text-left">Cantidad</th>
                  <th class="text-left">Stock Resultante</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(movement, index) in product.movements" :key="index">
                  <td>{{ new Date(movement.timestamp).toLocaleString() }}</td>
                  <td>
                    <v-chip :color="movement.type === 'IN' ? 'success' : 'error'" small>
                      {{ movement.type === 'IN' ? 'ENTRADA' : 'SALIDA' }}
                    </v-chip>
                  </td>
                  <td>{{ movement.quantity }}</td>
                  <td>{{ movement.stockAfterMovement }}</td>
                </tr>
              </tbody>
            </v-table>
          </v-expansion-panel-text>
        </v-expansion-panel>
      </v-expansion-panels>
    </div>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useProductHistoryStore } from '../stores/productHistory';
import { useNotificationStore } from '../stores/notification';

const productHistoryStore = useProductHistoryStore();
const notificationStore = useNotificationStore();
const productsHistory = ref([]);
const isPageLoading = ref(true);

const fetchHistory = async () => {
  isPageLoading.value = true;
  try {
    await productHistoryStore.fetchProductHistory();
    productsHistory.value = productHistoryStore.productsHistory;
  } catch (error) {
    notificationStore.show('Error al cargar el historial.', 'error');
  } finally {
    isPageLoading.value = false;
  }
};

onMounted(() => {
  fetchHistory();
});
</script>
