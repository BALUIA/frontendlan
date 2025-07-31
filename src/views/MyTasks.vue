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
              <v-btn @click="markAsCompleted(task.id)" color="success">Marcar como Realizada</v-btn>
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

const taskStore = useTaskStore();

const userTasks = computed(() => taskStore.userTasks);

const pendingTasks = computed(() => userTasks.value.filter(task => task.status === 'PENDIENTE'));
const completedTasks = computed(() => userTasks.value.filter(task => task.status === 'REALIZADO'));

const markAsCompleted = async (taskId) => {
  try {
    await taskStore.markAsCompleted(taskId);
  } catch (error) {
    console.error(error);
  }
};

onMounted(() => {
  taskStore.fetchMyTasks();
});
</script>
