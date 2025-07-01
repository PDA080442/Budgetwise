<template>
  <v-container>
    <TransactionList :transactions="transactions" />
    <v-btn>Обновить транзакции</v-btn>
  </v-container>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import TransactionList from '@/components/TransactionList.vue'
import { getTransaction, type Transaction } from '@/composables/usePromise'

const transactions = ref<Transaction[]>([])

onMounted(async () => {
  try {
    const token = localStorage.getItem('accessToken')
    if (!token) {
      throw new Error('Токен не найден в localStorage')
    }
    transactions.value = await getTransaction(token)
    console.log('Загрузка транзакций', transactions.value)
  } catch (err) {
    alert('Ошибка загрузки платежей' + err)
  }
}

.nav {
  align-items: center;
}
</style>

<script lang="ts">
import { defineComponent } from 'vue'
import Header from '@/components/Header.vue';
import Tranz from '@/components/Tranz.vue';

export default defineComponent({
  name: 'FinancePage',
  components: { 
    Tranz, Header
  } 
})
</script>
