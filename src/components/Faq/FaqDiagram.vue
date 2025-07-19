<template>
  <v-container class="diagram">
    <Pie ref="chartRef" :data="chartData" :options="chartOptions" />
  </v-container>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { Pie } from 'vue-chartjs'
import {
  Chart as ChartJS,
  type ChartData,
  type ChartOptions,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js'

ChartJS.register(ArcElement, Tooltip, Legend)

type PieChartData = ChartData<'pie', number[], string>

const chartData = ref<PieChartData>({
  labels: ['50%', '30%', '20%'],
  datasets: [
    {
      data: [50, 30, 20],
      backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
      hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
    },
  ],
})

const chartOptions = ref<ChartOptions<'pie'>>({
  responsive: true,
  maintainAspectRatio: false,
})

const chartRef = ref<InstanceType<typeof Pie> | null>(null)

onMounted(() => {})
</script>

<style lang="scss" scoped>
.diagram {
  margin: 40px;
}
</style>
