// addTransaction с ариной как то
<template>
  <v-container>
    <v-card border rounded="lg">
      <!-- <v-card-title>Список транзакций</v-card-title> -->
      <v-data-table
        :headers="headers"
        :items="localTransactions"
        show-expand
        item-key="id"
        class="elevation-24"
      >
        <template v-slot:top>
          <v-toolbar>
            <v-toolbar-title> Список транзакций </v-toolbar-title>
            <v-btn
              prepended-icon="mdi-plus"
              text="Добавить транзакцию"
              prepend-icon="mdi-plus"
              border
              class="px-4"
              @click="addTransaction"
            ></v-btn>
          </v-toolbar>
        </template>
        <template v-slot:[`item.data-table-expand`]="{ internalItem, isExpanded, toggleExpand }">
          <v-btn
            :append-icon="isExpanded(internalItem) ? 'mdi-chevron-up' : 'mdi-chevron-down'"
            :text="isExpanded(internalItem) ? 'Свернуть' : 'Подробнее'"
            class="text-none"
            size="small"
            variant="text"
            @click="toggleExpand(internalItem)"
          />
        </template>
        <template v-slot:[`item.type`]="{ item }">{{ getOperationTypeText(item.type) }}</template>
        <template v-slot:[`item.actions`]="{ item }">
          <div class="d-flex ga-2 justify-start">
            <v-icon icon="mdi-pencil" size="small" @click="edTransaction(item.id)"></v-icon>
            <v-icon icon="mdi-delete" size="small" @click="delTransaction(item.id)"></v-icon>
          </div>
        </template>
        <template v-slot:expanded-row="{ columns, item }">
          <tr border>
            <td :colspan="columns.length" class="py-4 font-italic">
              <v-sheet rounded="lg" border>
                <ProductsList :transactionId="item.id" :key="item.id" />
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
import { ref, defineProps, watch } from 'vue'
import ProductsList from '@/components/Finance/ProductList.vue'
// import TransactionAdd from './TransactionAdd.vue'
// import { TransactionMocks } from '@/mocks/FinanceMocks/TransactionMocks'
import type { Transaction } from '@/types/transaction.type'
import {
  deleteTransaction,
  saveEditTransaction,
  addTransactions,
} from '@/composables/transaction.request'

const props = defineProps<{ transactions: Transaction[] }>()
const localTransactions = ref<Transaction[]>([...props.transactions])

watch(
  () => props.transactions,
  (newList) => {
    localTransactions.value = [...newList]
  },
)
const getOperationTypeText = (type: string) => (type === 'income' ? 'Доход' : 'Расход')

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

function addTransaction() {
  editingTransaction.value = false
  record.value = { id: 0, amount: 0, date: '', category: '', type: 'income' }
  dialog.value = true
}

function edTransaction(id: number) {
  editingTransaction.value = true
  dialog.value = true
  const found = localTransactions.value.find((transaction) => transaction.id === id)
  if (!found) return
  record.value = {
    id: found.id,
    amount: found.amount,
    date: found.date,
    category: found.category,
    type: found.type,
  }
}

const delTransaction = async (id: number) => {
  await deleteTransaction(id)
  const index = localTransactions.value.findIndex((transanction) => transanction.id === id)
  localTransactions.value.splice(index, 1)
}

const saveTransaction = async () => {
  if (editingTransaction.value) {
    const result = await saveEditTransaction(record.value.id, record.value)
    const index = localTransactions.value.findIndex(
      (transaction) => transaction.id === record.value.id,
    )
    localTransactions.value.splice(index, 1, result)
  } else {
    const payload = {
      id: record.value.id,
      amount: record.value.amount,
      date: record.value.date,
      category: record.value.category,
      type: record.value.type,
    }
    const create = await addTransactions(payload)
    localTransactions.value.unshift(create)
  }
  dialog.value = false
}
</script>

<style scoped></style>
