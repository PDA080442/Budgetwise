<template>
  <v-card :height="70" :width="300" elevation="24" border rounded="lg" class="ma-auto">
    <v-card-text class="text-center align-center font-weight-bold">
      {{ balance?.balance ?? 'Загрузка Вашего Баланса' }}
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import type { Balance } from '@/types/balance.type'
import { getBalance } from '@/composables/transaction.request'

const balance = ref<Balance | null>(null)
onMounted(async () => {
  balance.value = await getBalance()
})
</script>
