<template>
  <v-container>
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
  </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useProductHistoryStore } from '../stores/productHistory';

const productHistoryStore = useProductHistoryStore();
const productsHistory = ref([]);

const fetchHistory = async () => {
  try {
    await productHistoryStore.fetchProductHistory();
    productsHistory.value = productHistoryStore.productsHistory;
  } catch (error) {
    console.error(error);
  }
};

onMounted(() => {
  fetchHistory();
});
</script>
