<template>
  <div>
    <div class="card">
      <div class="card-header">
        Movimientos de Inventario
      </div>
      <div class="card-body">
        <InventoryMovementForm @movement-registered="onMovementRegistered" />
      </div>
    </div>
    <div class="card mt-4">
      <div class="card-header">
        Historial de Movimientos
      </div>
      <div class="card-body">
        <table class="table">
          <thead>
            <tr>
              <th>Producto</th>
              <th>Cantidad</th>
              <th>Tipo</th>
              <th>Fecha</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="movement in movements" :key="movement.id">
              <td>{{ movement.product.name }}</td>
              <td>{{ movement.quantity }}</td>
              <td>{{ movement.type }}</td>
              <td>{{ new Date(movement.timestamp).toLocaleString() }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import InventoryMovementForm from '../components/InventoryMovementForm.vue';
import { useInventoryStore } from '../stores/inventory';
import { useNotificationStore } from '../stores/notification';

const inventoryStore = useInventoryStore();
const notificationStore = useNotificationStore();
const movements = ref([]);
const isPageLoading = ref(true);

const fetchMovements = async () => {
  isPageLoading.value = true;
  try {
    await inventoryStore.fetchMovements();
    movements.value = inventoryStore.movements;
  } catch (error) {
    notificationStore.show('Error al cargar los movimientos de inventario.', 'error');
  } finally {
    isPageLoading.value = false;
  }
};

const onMovementRegistered = () => {
  fetchMovements();
};

onMounted(() => {
  fetchMovements();
});
</script>
