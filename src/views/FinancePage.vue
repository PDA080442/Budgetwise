<template>
  <NewLayout>
    <v-container>
      <TransactionList :transactions="transactions" />
    </v-container>
  </NewLayout>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'
// import ProductsList from '@/components/Finance/ProductList.vue'
import TransactionList from '@/components/Finance/TransactionList.vue'
import { type Transaction } from '@/types/transaction.type'
import { getTransaction } from '@/composables/transaction.request'

import NewLayout from '@/layouts/NewLayout.vue'

const transactions = ref<Transaction[]>([])

onMounted(async () => {
  try {
    const result = await getTransaction()
    transactions.value = result
    console.log('Траназакции -', result)
  } catch (error) {
    console.error('Ошибка:', error)
  }
})
</script>
