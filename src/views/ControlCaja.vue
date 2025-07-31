<template>
  <v-container>
    <h2 class="text-h4 mb-4">Control de Caja y Gastos</h2>

    <v-card class="mb-6">
      <v-card-title class="text-h5">Balance Actual</v-card-title>
      <v-card-text>
        <p class="text-h3 text-success">S/ {{ balance.toFixed(2) }}</p>
      </v-card-text>
    </v-card>

    <v-card class="mb-6">
      <v-card-title>Registrar Nuevo Gasto</v-card-title>
      <v-card-text>
        <v-form @submit.prevent="handleRegisterGasto">
          <v-text-field
            v-model="newGasto.description"
            label="Descripción del Gasto"
            required
          ></v-text-field>
          <v-text-field
            v-model.number="newGasto.amount"
            label="Monto"
            type="number"
            step="0.01"
            required
          ></v-text-field>
          <v-btn type="submit" color="primary">Registrar Gasto</v-btn>
          <v-alert v-if="errorMessage" type="error" class="mt-2">{{ errorMessage }}</v-alert>
        </v-form>
      </v-card-text>
    </v-card>

    <v-card>
      <v-card-title>Historial de Gastos</v-card-title>
      <v-card-text>
        <v-table>
          <thead>
            <tr>
              <th class="text-left">Fecha</th>
              <th class="text-left">Descripción</th>
              <th class="text-left">Monto</th>
              <th class="text-left">Registrado por</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="gasto in gastos" :key="gasto.id">
              <td>{{ new Date(gasto.timestamp).toLocaleString() }}</td>
              <td>{{ gasto.description }}</td>
              <td>S/ {{ gasto.amount.toFixed(2) }}</td>
              <td>{{ gasto.userName }}</td>
            </tr>
          </tbody>
        </v-table>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useCajaStore } from '../stores/caja';

const cajaStore = useCajaStore();
const newGasto = ref({ description: '', amount: null });
const errorMessage = ref('');

const balance = computed(() => cajaStore.balance);
const gastos = computed(() => cajaStore.gastos);

const handleRegisterGasto = async () => {
  if (!newGasto.value.description || !newGasto.value.amount || newGasto.value.amount <= 0) {
    errorMessage.value = 'Por favor, complete todos los campos correctamente.';
    return;
  }
  try {
    await cajaStore.registrarGasto(newGasto.value);
    newGasto.value = { description: '', amount: null };
    errorMessage.value = '';
  } catch (error) {
    errorMessage.value = error;
  }
};

onMounted(() => {
  cajaStore.fetchBalance();
  cajaStore.fetchGastos();
});
</script>
