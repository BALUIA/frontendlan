<template>
  <v-container>
    <h2 class="text-h4 mb-4">Resumen de Turnos</h2>
    <v-card>
      <v-card-text>
        <v-responsive>
          <v-table>
            <thead>
              <tr>
                <th class="text-left">Registrado por</th>
                <th class="text-left">Fecha</th>
                <th class="text-left">Hora Entrada</th>
                <th class="text-left">Hora Salida</th>
                <th class="text-left">Efectivo</th>
                <th class="text-left">Yape</th>
                <th class="text-left">Snacks</th>
                <th class="text-left">Ingreso Inventario</th>
                <th class="text-left">Consumo</th>
                <th class="text-left">Retiros</th>
                <th class="text-left">Dinero Pancafe</th>
                <th class="text-left">Usanza Pancafe</th>
                <th class="text-left">KW</th>
                <th class="text-left">Usuarios</th>
                <th class="text-left">Diferencia</th>
                <th v-if="authStore.isAdmin" class="text-left">Acciones</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="turno in turnos" :key="turno.id" @click="showTurnoSummary(turno.id)">
                <td>{{ turno.userName }}</td>
                <td>{{ turno.fecha }}</td>
                <td>{{ turno.horaEntrada }}</td>
                <td>{{ turno.horaSalida }}</td>
                <td>{{ turno.efectivo }}</td>
                <td>{{ turno.yape }}</td>
                <td>{{ turno.snacks }}</td>
                <td>{{ turno.ingresoInventario }}</td>
                <td>{{ turno.consumo }}</td>
                <td>{{ turno.retiros }}</td>
                <td>{{ turno.dineroPancafe }}</td>
                <td>{{ turno.usanzaPancafe }}</td>
                <td>{{ turno.kw }}</td>
                <td>{{ turno.usuarios }}</td>
                <td>{{ (turno.dineroPancafe + turno.snacks - turno.retiros - turno.consumo - turno.efectivo - turno.yape).toFixed(2) }}</td>
                <td v-if="authStore.isAdmin">
                  <v-btn @click.stop="deleteTurno(turno.id)" color="error">Eliminar</v-btn>
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
import { useTurnoStore } from '../stores/turno';
import { useAuthStore } from '../stores/auth';
import { useRouter } from 'vue-router';

const turnos = ref([]);
const turnoStore = useTurnoStore();
const authStore = useAuthStore();
const router = useRouter();

const fetchTurnos = async () => {
  try {
    turnos.value = await turnoStore.getTurnos();
  } catch (error) {
    console.error(error);
  }
};

const deleteTurno = async (id) => {
  try {
    await turnoStore.deleteTurno(id);
    fetchTurnos();
  } catch (error) {
    console.error(error);
  }
};

const showTurnoSummary = (id) => {
  router.push({ name: 'TurnoSummary', params: { id } });
};

onMounted(() => {
  fetchTurnos();
});
</script>
