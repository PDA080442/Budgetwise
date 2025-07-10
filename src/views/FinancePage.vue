<template>
  <MainLayout>
    <template #content>
      <v-container>
        <TransactionList :transactions="transactions" />
        <!-- <Tranz :onSave="saveTransaction" /> -->
        <!-- <ProductsList v-if="transactions.length" :transactionId="transactions[0].id" /> -->
      </v-container>
    </template>
  </MainLayout>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'
// import ProductsList from '@/components/Finance/ProductList.vue'
import TransactionList from '@/components/Finance/TransactionList.vue'
// import Tranz from '@/components/Finance/TransactionAdd.vue'
import axios from 'axios'
import { useRouter } from 'vue-router'
import { type Transaction } from '@/types/transaction.type'
import { getTransaction, createTransaction } from '@/composables/transaction.request'
import MainLayout from '@/layouts/MainLayout.vue'

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

const router = useRouter()

const saveTransaction = async (transactionData: Transaction) => {
  try {
    const token = localStorage.getItem('accessToken') || ''
    if (!token) {
      router.push({ path: '/entrance' })
      throw new Error('Токен не найден')
    }
    const payload: Transaction = {
      amount: Number(transactionData.amount),
      date: formatDateForServer(transactionData.date),
      category: transactionData.category,
      type: transactionData.type,
    }

    const newTransaction = await createTransaction(payload)

    transactions.value = [newTransaction, ...transactions.value]
    console.log('Транзакция успешно сохранена', newTransaction)
  } catch (err) {
    console.error('Ошибка сохранения транзакции', err)

    if (axios.isAxiosError(err) && err.response?.status === 401) {
      localStorage.removeItem('accessToken')
      router.push('/login')
    } else {
      alert('Ошибка сохранения транзакции: ' + (err as Error).message)
    }
  }
}
</script>
