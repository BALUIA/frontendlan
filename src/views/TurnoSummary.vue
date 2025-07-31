<template>
  <v-container>
    <v-btn @click="goBack" color="primary" class="mb-4">Volver a Resumen</v-btn>
    <v-card v-if="summary">
      <v-card-title class="text-h5">Resumen del Turno</v-card-title>
      <v-card-text>
        <h5 class="text-h6">Ventas Totales de Productos: S/ {{ summary.totalSales.toFixed(2) }}</h5>
        <v-table>
          <thead>
            <tr>
              <th class="text-left">Producto</th>
              <th class="text-left">Cantidad Vendida</th>
              <th class="text-left">Precio Unit.</th>
              <th class="text-left">Total</th>
              <th class="text-left">Stock Final</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(movement, index) in summary.movements" :key="index">
              <td>{{ movement.productName }}</td>
              <td>{{ movement.quantity }}</td>
              <td>S/ {{ movement.price.toFixed(2) }}</td>
              <td>S/ {{ movement.totalPrice.toFixed(2) }}</td>
              <td>{{ movement.stockAfterMovement }}</td>
            </tr>
          </tbody>
        </v-table>

        <h5 class="mt-4 text-h6">Detalle de Retiros</h5>
        <v-table>
          <thead>
            <tr>
              <th class="text-left">Descripción</th>
              <th class="text-left">Monto</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(retiro, index) in summary.retiros" :key="index">
              <td>{{ retiro.description }}</td>
              <td>S/ {{ retiro.amount.toFixed(2) }}</td>
            </tr>
          </tbody>
        </v-table>
      </v-card-text>
    </v-card>
    <v-alert v-if="error" type="error">{{ error }}</v-alert>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import axios from 'axios';

const route = useRoute();
const router = useRouter();
const summary = ref(null);
const error = ref(null);

const fetchTurnoSummary = async (id) => {
  try {
    const response = await axios.get(`http://localhost:8080/api/turnos/${id}/summary`);
    summary.value = response.data;
  } catch (err) {
    error.value = 'Failed to fetch turno summary.';
    console.error(err);
  }
};

const goBack = () => {
  router.push({ name: 'ResumenTurnos' });
};

onMounted(() => {
  const turnoId = route.params.id;
  if (turnoId) {
    fetchTurnoSummary(turnoId);
  }
});
</script>
