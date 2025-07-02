<template>
  <v-container class="d-flex">
    <TransactionList :transactions="transactions" />
    <!-- <v-btn @click="reloadPage">Обновить транзакции</v-btn> -->
  </v-container>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import TransactionList from '@/components/TransactionList.vue'
import { getTransaction, type Transaction } from '@/composables/usePromise'
import router from '@/router'

const transactions = ref<Transaction[]>([])

onMounted(async () => {
  try {
    const token = localStorage.getItem('accessToken')
    if (!token) {
      router.push({ path: '/entrance' })
      throw new Error('Токен не найден')
    }
    transactions.value = await getTransaction(token)
  } catch (err) {
    alert('Ошибка загрузки платежей' + err)
    router.push({ path: '/entrance' })
  }
})

// const reloadPage = () => {
//   location.reload()
// }
</script>
