<template>
  <v-container>
    <h2 class="text-h4 mb-4">Gestionar Tareas</h2>

    <v-card class="mb-4">
      <v-card-title>Crear Nueva Tarea</v-card-title>
      <v-card-text>
        <v-form @submit.prevent="handleCreateTask">
          <v-textarea v-model="newTask.description" label="Descripción de la Tarea" required></v-textarea>
          <v-select
            v-model="newTask.assignedToUserId"
            :items="users"
            item-title="userName"
            item-value="id"
            label="Asignar a"
            required
          ></v-select>
          <v-btn type="submit" color="primary">Crear Tarea</v-btn>
          <v-alert v-if="successMessage" type="success" class="mt-2">{{ successMessage }}</v-alert>
          <v-alert v-if="errorMessage" type="error" class="mt-2">{{ errorMessage }}</v-alert>
        </v-form>
      </v-card-text>
    </v-card>

    <v-card>
      <v-card-title>Todas las Tareas</v-card-title>
      <v-card-text>
        <v-table>
          <thead>
            <tr>
              <th class="text-left">Descripción</th>
              <th class="text-left">Asignado a</th>
              <th class="text-left">Creado por</th>
              <th class="text-left">Fecha Creación</th>
              <th class="text-left">Fecha Realización</th>
              <th class="text-left">Estado</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="task in allTasks" :key="task.id">
              <td>{{ task.description }}</td>
              <td>{{ task.asignadoA }}</td>
              <td>{{ task.creadoPor }}</td>
              <td>{{ new Date(task.fechaCreacion).toLocaleString() }}</td>
              <td>{{ task.fechaRealizacion ? new Date(task.fechaRealizacion).toLocaleString() : '--' }}</td>
              <td>
                <v-chip :color="task.status === 'PENDIENTE' ? 'warning' : 'success'">{{ task.status }}</v-chip>
              </td>
            </tr>
          </tbody>
        </v-table>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useTaskStore } from '../stores/task';
import { useAuthStore } from '../stores/auth';

const taskStore = useTaskStore();
const authStore = useAuthStore();

const newTask = ref({ description: '', assignedToUserId: null });
const successMessage = ref('');
const errorMessage = ref('');

const users = ref([]);
const allTasks = computed(() => taskStore.allTasks);

const handleCreateTask = async () => {
  try {
    await taskStore.createTask(newTask.value);
    successMessage.value = 'Tarea creada exitosamente!';
    errorMessage.value = '';
    newTask.value.description = '';
    newTask.value.assignedToUserId = null;
    await taskStore.fetchAllTasks();
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

onMounted(() => {
  fetchUsers();
  taskStore.fetchAllTasks();
});
</script>
