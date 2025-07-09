// addTransaction с ариной как то
<template>
  <v-container>
    <v-card border rounded="lg">
      <!-- <v-card-title>Список транзакций</v-card-title> -->
      <v-data-table
        :headers="headers"
        :items="transactions"
        show-expand
        item-key="id"
        class="elevation-24"
      >
        <template v-slot:top>
          <v-toolbar>
            <v-toolbar-title> Список транзакций </v-toolbar-title>
            <!-- <v-btn
              prepended-icon="mdi-plus"
              text="Добавить транзакцию"
              prepend-icon="mdi-plus"
              border
              class="px-4"
              @click="TransactionAdd"
            ></v-btn> -->
            <TransactionAdd @save="handleTransactionAdded" />
          </v-toolbar>
        </template>
        <template
          v-slot:[`item.data-table-expand`]="{ item: internalItem, isExpanded, toggleExpand }"
        >
          <v-btn
            :append-icon="isExpanded(internalItem) ? 'mdi-chevron-up' : 'mdi-chevron-down'"
            :text="isExpanded(internalItem) ? 'Свернуть' : 'Подробнее'"
            class="text-none"
            size="small"
            variant="text"
            @click="toggleExpand(internalItem)"
          />
        </template>
        <template v-slot:item.actions="{ item }">
          <div class="d-flex ga-2 justify-start">
            <v-icon icon="mdi-pencil" size="small" @click="editTransaction(item.id)"></v-icon>
            <v-icon icon="mdi-delete" size="small" @click="delTransaction(item.id)"></v-icon>
          </div>
        </template>
        <template v-slot:expanded-row="{ columns, item }">
          <tr border>
            <td :colspan="columns.length" class="py-4 font-italic">
              <v-sheet rounded="lg" border>
                <ProductsList :products="getProductsForTransaction(item)" />
              </v-sheet>
            </td>
          </tr>
        </template>
      </v-data-table>
    </v-card>
    <v-dialog v-model="dialog" max-width="500">
      <v-card class="pa-5 text-center" border rounded="lg">
        <v-card-title> Редактировать транзакцию </v-card-title>
        <v-card-text>
          <v-number-input v-model="record.amount" label="Сумма"></v-number-input>
          <v-text-field v-model="record.date" label="Дата"></v-text-field>
          <v-text-field v-model="record.category" label="Категория"></v-text-field>
          <v-select
            v-model="record.type"
            :items="['income', 'expense']"
            label="Тип операции"
          ></v-select>
        </v-card-text>
        <v-card-actions>
          <v-btn text="Отмена" variant="plain" @click="dialog = false"> </v-btn>
          <v-spacer></v-spacer>
          <v-btn text="Сохранить" @click="saveTransaction"></v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script setup lang="ts">
import { ref } from 'vue'

import ProductsList from '@/components/Finance/ProductList.vue'
import { TransactionMocks } from '@/mocks/FinanceMocks/TransactionMocks'
import { ProductsMocks } from '@/mocks/FinanceMocks/ProductMocks'
import type { Transaction } from '@/types/transaction.type'
import type { Products } from '@/types/product.type'
import TransactionAdd from '@/components/Finance/TransactionAdd.vue'


const transactions = ref<Transaction[]>(TransactionMocks)

// const getOperationTypeText = (t: string) => (t === 'income' ? 'Доход' : 'Расход')

const dialog = ref(false)
const editingTransaction = ref(false)
const record = ref<Transaction>({
  id: 0,
  amount: 0,
  date: '',
  category: '',
  type: 'income',
})

const headers = [
  { title: 'Сумма', value: 'amount' },
  { title: 'Дата', value: 'date' },
  { title: 'Категория', value: 'category' },
  { title: 'Тип операции', value: 'type' },
  { title: 'Редактирование', value: 'actions' },
]

const getProductsForTransaction = (transaction: Transaction): Products[] =>
  transaction.category === 'Продукты' ? ProductsMocks : []

function editTransaction(id: number) {
  editingTransaction.value = true
  const found = transactions.value.find((transaction) => transaction.id === id)
  if (!found) return
  record.value = {
    id: found.id,
    amount: found.amount,
    date: found.date,
    category: found.category,
    type: found.type,
  }
  dialog.value = true
}

function handleTransactionAdded(newTransaction: Transaction) {
  const newId = Math.max(...transactions.value.map(t => t.id), 0) + 1
  transactions.value.push({
    ...newTransaction,
    id: newId
  })
}

function delTransaction(id: number) {
  const index = transactions.value.findIndex((transaction) => transaction.id === id)
  transactions.value.splice(index, 1)
}

function saveTransaction() {
  if (editingTransaction.value) {
    const index = transactions.value.findIndex((transaction) => transaction.id === record.value.id)
    transactions.value[index] = record.value
  }
  dialog.value = false
}
</script>

<style scoped></style>
