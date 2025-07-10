// addTransaction с ариной как то
<template>
  <v-container>
    <v-card border rounded="lg">
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
            <v-spacer></v-spacer>
            <v-text-field
              v-model="search"
              clearable
              label="Поиск"
              prepend-inner-icon="mdi-magnify"
              variant="outlined"
              hide-details
              single-line
              class="mx-4"
            />
            <v-btn
              text="Добавить транзакцию"
              prepend-icon="mdi-plus"
              border
              class="px-4"
              @click="addTransaction"
            ></v-btn>
          </v-toolbar>
          <v-divider></v-divider>
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
        <template v-slot:[`item.type`]="{ item }">{{ getTypeText(item.type) }}</template>
        <template v-slot:[`item.category`]="{ item }">{{
          getCategoryText(item.category)
        }}</template>
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
        <v-card-title>
          {{ editingTransaction ? 'Редактировать транзакцию' : 'Добавление транзакции' }}
        </v-card-title>
        <v-card-text>
          <v-number-input
            v-model="record.amount"
            label="Сумма"
            :rules="[rules.require, rules.negative]"
            required
          ></v-number-input>
          <v-text-field
            v-model="record.date"
            label="Дата"
            prepend-icon=""
            type="date"
            :rules="[rules.require]"
            required
          />
          <v-select
            v-model="record.category"
            label="Категория"
            :items="categories"
            :rules="[rules.require]"
            item-title="name"
            item-value="id"
            required
          ></v-select>
          <v-select
            v-model="record.type"
            :items="types"
            label="Тип операции"
            item-title="title"
            item-value="value"
            :rules="[rules.require]"
            required
          ></v-select>
        </v-card-text>
        <v-card-actions>
          <v-btn text="Отмена" variant="plain" @click="dialog = false"> </v-btn>
          <v-spacer></v-spacer>
          <v-btn text="Сохранить" @click="saveTransaction" :disabled="!formValid"></v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script setup lang="ts">
import { ref, defineProps, watch, computed, onMounted } from 'vue'
import ProductsList from '@/components/Finance/ProductList.vue'
import type { Transaction } from '@/types/transaction.type'
import { getCategories } from '@/composables/category.request'
import type { Category } from '@/types/category.type'
// import { VDateInput } from 'vuetify/labs/VDateInput'
import {
  deleteTransaction,
  saveEditTransaction,
  addTransactions,
  getTransaction,
  searchTransaction,
} from '@/composables/transaction.request'

const props = defineProps<{ transactions: Transaction[] }>()
const localTransactions = ref<Transaction[]>([...props.transactions])

watch(
  () => props.transactions,
  (newList) => {
    localTransactions.value = [...newList]
  },
)

onMounted(async () => {
  try {
    const result = await getCategories()
    categories.value = result
  } catch (error) {
    console.error(error)
  }
})

const dialog = ref(false)
const editingTransaction = ref(false)
const record = ref<Transaction>({
  id: 0,
  amount: 0,
  date: '',
  category: 1,
  type: 0,
})

const categories = ref<Category[]>([])

const types = computed(() => {
  const unique = Array.from(new Set(localTransactions.value.map((transaction) => transaction.type)))
  return unique.map((value) => ({
    value,
    title: getTypeText(value),
  }))
})

const search = ref<string>('')

watch(search, async (newValue) => {
  if (newValue) {
    localTransactions.value = await searchTransaction(newValue)
  } else {
    localTransactions.value = await getTransaction()
  }
})

const getTypeText = (type: string | number) => (type === '0' || type === 0 ? 'Доход' : 'Расход')

const getCategoryText = (value: number) => {
  const result = categories.value.find((category) => category.id === value)
  return result ? result.name : value
}

const rules = {
  require: (u: string) => !!u || 'Обязательное поле',
  negative: (u: string) => {
    const value = parseFloat(u)
    return (!isNaN(value) && value > 0) || 'Сумма должна быть положительной'
  },
}

const formValid = computed(() => {
  return (
    rules.require(String(record.value.amount)) === true &&
    rules.require(record.value.date) === true &&
    rules.require(String(record.value.category)) === true &&
    rules.require(String(record.value.type)) === true &&
    rules.negative(String(record.value.amount)) === true &&
    rules.require(String(record.value.date)) === true
  )
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
  record.value = {
    id: 0,
    amount: 0,
    date: '',
    category: 1,
    type: 0,
  }
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
      amount: Number(record.value.amount),
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
