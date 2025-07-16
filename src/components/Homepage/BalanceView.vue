<template>
  <v-card
    class="mx-auto my-6 pa-6"
    max-width="500"
    elevation="24"
    rounded="xl"
    color="light-blue lighten-5"
  >
    <v-row align="center">
      <v-col cols="auto">
        <v-avatar size="56" color="primary">
          <v-icon size="32" dark>mdi-wallet</v-icon>
        </v-avatar>
      </v-col>
      <v-col>
        <div class="text-h6 font-weight-bold">Ваш баланс:</div>
      </v-col>
    </v-row>

    <v-row class="mt-6 mb-6" justify="center">
      <div class="text-h2 font-weight-bold">
        {{ formatBalance(balance?.balance) }}
      </div>
    </v-row>
  </v-card>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import type { Balance } from '@/types/balance.type'
import { getBalance } from '@/composables/transaction.request'

const balance = ref<Balance | null>(null)
const loading = ref(false)
const lastUpdated = ref('—')

async function fetchBalance() {
  loading.value = true
  const data = await getBalance()
  balance.value = data
  lastUpdated.value = new Date().toLocaleString('ru-RU', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
  loading.value = false
}

function formatBalance(amount?: number | string): string {
  if (amount == null) return '0 ₽'
  const num = typeof amount === 'string' ? parseFloat(amount) : amount
  return num.toLocaleString('ru-RU', { style: 'currency', currency: 'RUB' })
}

onMounted(fetchBalance)
</script>

<style scoped>
.v-card {
  border-radius: 20px;
}
</style>
