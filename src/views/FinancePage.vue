<template>
  <v-container>
    <Header />
    <TransactionList :transactions="transactions" />
    <!-- <v-btn @click="loadTransactions" class="mt-4">Обновить транзакции</v-btn> -->
    <Tranz :onSave="saveTransaction" />
  </v-container>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import TransactionList from '@/components/TransactionList.vue'
import { getTransaction, type Transaction, createTransaction,type CreateTransactionData } from '@/composables/usePromise' // Добавьте createTransaction
import Header from '@/components/Header.vue';
import Tranz from '@/components/Tranz.vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

const transactions = ref<Transaction[]>([])

// Функция загрузки транзакций (вынесена для переиспользования)
const loadTransactions = async () => {
  try {
    const token = localStorage.getItem('accessToken')
    if (!token) throw new Error('Токен не найден')
    transactions.value = await getTransaction(token)
  } catch (err) {
    console.error('Ошибка загрузки платежей', err)
    alert('Ошибка загрузки платежей: ' + (err as Error).message)
  }
}

// Функция сохранения новой транзакции
const router = useRouter();
const saveTransaction = async (transactionData: any) => {
  try {
    const token = localStorage.getItem('accessToken') || '';
    if (!token) throw new Error('Токен не найден');
    
    // Преобразование данных перед отправкой
    const payload: CreateTransactionData = {
      amount: Number(transactionData.amount), // Конвертируем в число
      date: formatDateForServer(transactionData.date),
      category: transactionData.category,
      operationType: transactionData.operationType
    };
    
    // Вызов с правильным порядком аргументов: сначала токен, затем данные
    const newTransaction = await createTransaction(token, payload);
    
    transactions.value = [newTransaction, ...transactions.value];
    console.log('Транзакция успешно сохранена', newTransaction);
    alert('Транзакция успешно добавлена!');
  } catch (err) {
    console.error('Ошибка сохранения транзакции', err);
    
    // Добавляем обработку 401 ошибки
    if (axios.isAxiosError(err) && err.response?.status === 401) {
      alert('Сессия истекла. Пожалуйста, войдите снова.');
      // Дополнительные действия: очистка хранилища, редирект и т.д.
      localStorage.removeItem('accessToken');
      router.push('/login');
    } else {
      alert('Ошибка сохранения транзакции: ' + (err as Error).message);
    }
  }
}

// Преобразование даты из DD.MM.YYYY в YYYY-MM-DD
const formatDateForServer = (dateString: string) => {
  const parts = dateString.split('.')
  if (parts.length !== 3) return dateString
  return `${parts[2]}-${parts[1]}-${parts[0]}`
}

onMounted(() => {
  loadTransactions()
})
</script>
