<template>
  <MainLayout />
  <Pie
    ref="chartRef"
    :data="chartData"
    :options="chartOptions"
  />
</template>


<script setup lang="ts">
import MainLayout from '@/layouts/MainLayout.vue'
import { ref, onMounted } from 'vue'
import { Pie } from 'vue-chartjs'
import { 
  Chart as ChartJS,
  type ChartData,
  type ChartOptions,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js'

// Регистрируем необходимые элементы Chart.js
ChartJS.register(ArcElement, Tooltip, Legend)

// Определяем тип для данных
type PieChartData = ChartData<'pie', number[], string>

const chartData = ref<PieChartData>({
  labels: ['Red', 'Blue', 'Yellow'],
  datasets: [
    {
      data: [33, 33, 33],
      backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
      hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56']
    }
  ]
})

const chartOptions = ref<ChartOptions<'pie'>>({
  responsive: true,
  maintainAspectRatio: false
})

const chartRef = ref<InstanceType<typeof Pie> | null>(null)

onMounted(() => {
  // График автоматически рендерится при монтировании
  // через пропсы data и options
})
</script>

