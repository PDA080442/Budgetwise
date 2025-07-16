<template>
  <NewLayout>
      <v-container>
        <TransactionList :transactions="transactions" />
        <Tranz :onSave="saveTransaction" />
      </v-container>
  </NewLayout>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'
// import ProductsList from '@/components/Finance/ProductList.vue'
import TransactionList from '@/components/Finance/TransactionList.vue'
import Tranz from '@/components/Finance/TransactionAdd.vue'
import axios from 'axios'
import { useRouter } from 'vue-router'
import { type Transaction } from '@/types/transaction.type'
import { getTransaction } from '@/composables/transaction.request'
import MainLayout from '@/layouts/MainLayout.vue'

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