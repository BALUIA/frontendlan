<template>
  <v-container>
    <h2 class="text-h4 mb-4">Mis Tareas</h2>

    <v-card>
      <v-card-title>Tareas Pendientes</v-card-title>
      <v-card-text>
        <v-list>
          <v-list-item v-for="task in pendingTasks" :key="task.id">
            <v-list-item-title>{{ task.description }}</v-list-item-title>
            <v-list-item-subtitle>Creada por: {{ task.creadoPor }} el {{ new Date(task.fechaCreacion).toLocaleDateString() }}</v-list-item-subtitle>
            <template v-slot:append>
              <v-btn @click="markAsCompleted(task.id)" color="success" :loading="completingTaskId === task.id" :disabled="!!completingTaskId">Marcar como Realizada</v-btn>
            </template>
          </v-list-item>
        </v-list>
      </v-card-text>
    </v-card>

    <v-card class="mt-4">
      <v-card-title>Tareas Realizadas</v-card-title>
      <v-card-text>
        <v-list>
          <v-list-item v-for="task in completedTasks" :key="task.id">
            <v-list-item-title>{{ task.description }}</v-list-item-title>
            <v-list-item-subtitle>Realizada el {{ new Date(task.fechaRealizacion).toLocaleString() }}</v-list-item-subtitle>
          </v-list-item>
        </v-list>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useTaskStore } from '../stores/task';
import { useNotificationStore } from '../stores/notification';

const taskStore = useTaskStore();
const notificationStore = useNotificationStore();
const completingTaskId = ref(null);

const userTasks = computed(() => taskStore.userTasks);

const pendingTasks = computed(() => userTasks.value.filter(task => task.status === 'PENDIENTE'));
const completedTasks = computed(() => userTasks.value.filter(task => task.status === 'REALIZADO'));

const markAsCompleted = async (taskId) => {
  completingTaskId.value = taskId;
  try {
    await taskStore.markAsCompleted(taskId);
    notificationStore.show('Tarea completada exitosamente!');
  } catch (error) {
    notificationStore.show(error.message, 'error');
  } finally {
    completingTaskId.value = null;
  }
};

onMounted(() => {
  taskStore.fetchMyTasks();
});
</script>
