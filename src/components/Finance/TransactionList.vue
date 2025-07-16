<template>
  <v-container>
    <div class="d-flex justify-center mb-10">
      <PopupCategory />
    </div>
    <v-card border rounded="lg" style="border: 2px solid primary">
      <v-data-table
        :headers="headers"
        :items="localTransactions"
        show-expand
        item-key="id"
        class="elevation-24"
        v-model:sort-by="sortOrder"
      >
        <template v-slot:top>
          <v-toolbar class="d-flex">
            <v-toolbar-title style="max-width: 300px"> Транзакции </v-toolbar-title>
            <v-spacer />
            <AddCheck />
            <v-spacer />
            <v-btn @click="addTransaction" border>
              <v-icon size="large">mdi-plus</v-icon>
            </v-btn>
          </v-toolbar>
          <v-toolbar>
            <v-text-field
              v-model="search"
              clearable
              label="Поиск"
              prepend-inner-icon="mdi-magnify"
              variant="outlined"
              hide-details
              rounded="lg"
              class="mx-4"
            />
          </v-toolbar>
          <v-divider></v-divider>
          <v-toolbar>
            <v-text-field
              v-model="dateAfter"
              label="Начало"
              type="date"
              style="max-width: 200px"
              clearable
              class="ml-4"
            />
            <v-text-field
              v-model="dateBefore"
              label="Конец"
              type="date"
              style="max-width: 200px"
              clearable
            />
            <v-select
              v-model="selectCategories"
              label="Выберите категории"
              style="max-width: 343px"
              :items="categories"
              item-title="name"
              item-value="id"
              multiple
              class="ml-2"
              clearable
            />
            <v-select
              v-model="selectTypes"
              :items="types"
              item-title="name"
              item-value="id"
              label="Доход/Расход"
              clearable
              style="max-width: 343px"
              class="ml-2"
            />
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
        <template v-slot:[`item.type`]="{ item }">
          <span :style="{ color: getTypeColor(item.type), fontWeight: '700' }">
            {{ getTypeText(item.type) }}
          </span>
        </template>
        <template v-slot:[`item.category`]="{ item }">
          <div class="d-flex align-center">
            <v-chip class="mr-2" rounded="xl" :color="getCategoryColor(item.category)" small tile />
            <span>{{ getCategoryText(item.category) }}</span>
          </div>
        </template>
        <template v-slot:[`item.amount`]="{ item }">
          <span class="text-primary font-weight-bold">
            {{ formatCurrency(item.amount) }}
          </span>
        </template>
        <template v-slot:[`item.actions`]="{ item }">
          <div class="d-flex ga-2 justify-start">
            <v-icon
              color="primary"
              icon="mdi-pencil"
              size="large"
              @click="edTransaction(item.id)"
            ></v-icon>
            <v-icon
              color="red"
              icon="mdi-delete"
              size="large"
              @click="delTransaction(item.id)"
            ></v-icon>
          </div>
        </template>
        <template v-slot:expanded-row="{ columns, item }">
          <tr border>
            <td :colspan="columns.length" class="pa-4">
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
            item-title="name"
            item-value="id"
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
import { ref, defineProps, watch, onMounted } from 'vue'
import ProductsList from '@/components/Finance/ProductList.vue'
import type { Transaction } from '@/types/transaction.type'
import { getCategories } from '@/composables/category.request'
import { getTypes } from '@/composables/type.request'
import type { Category } from '@/types/category.type'
import PopupCategory from './PopupCategory.vue'
import type { Types } from '@/types/types.type'
import AddCheck from './AddCheck.vue'
import {
  getTransaction,
  searchTransaction,
  filterTransactionDate,
  filterTransactionCategory,
  filterTransactionType,
  orderTransaction,
} from '@/composables/transaction.request'

import { useTransactionActions } from '@/services/Actions/Finance/TransactionListActions'
import { useTransactionRules } from '@/services/Rules/Finance/TransactionListRules'
// import { useTransactionFilters } from '@/services/Filters/Finance/TransactionListFilters'

const props = defineProps<{ transactions: Transaction[] }>()
const localTransactions = ref<Transaction[]>([...props.transactions])

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
const types = ref<Types[]>([])
const search = ref<string>('')
const dateBefore = ref<string>('')
const dateAfter = ref<string>('')
const selectCategories = ref<[]>([])
const selectTypes = ref<number | null>(null)
const sortOrder = ref<{ key: string; order: 'asc' | 'desc' }[]>([])

const categoryColors: Record<number, string> = {
  1: '#F44336', // красный
  2: '#2196F3', // синий
  3: '#4CAF50', // зелёный
  4: '#FF9800', // оранжевый
  5: '#9C27B0', // фиолетовый
}

function getCategoryColor(categoryId: number): string {
  return categoryColors[categoryId] || '#000000' // серый по умолчанию
}

const typeColors: Record<number, string> = {
  0: '#00b909', // доход
  1: 'red', // расход
}

function getTypeColor(typeId: number): string {
  return typeColors[typeId] || 'inherit'
}

function formatCurrency(val: number): string {
  return new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB' }).format(val)
}

const {
  addTransaction,
  edTransaction,
  delTransaction,
  saveTransaction,
  getTypeText,
  getCategoryText,
} = useTransactionActions({
  localTransactions,
  dialog,
  editingTransaction,
  record,
  categories,
  types,
})

const { rules, formValid } = useTransactionRules(record)

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
    const resulttype = await getTypes()
    types.value = resulttype
  } catch (error) {
    console.error(error)
  }
})

watch(search, async (newValue) => {
  if (newValue) {
    localTransactions.value = await searchTransaction(newValue)
  } else {
    localTransactions.value = await getTransaction()
  }
})

watch([dateAfter, dateBefore], async ([after, before]) => {
  if (after && before) {
    localTransactions.value = await filterTransactionDate(after, before)
  } else {
    localTransactions.value = await getTransaction()
  }
})

watch(selectCategories, async (selectCategory) => {
  if (selectCategory.length > 0) {
    localTransactions.value = await filterTransactionCategory(selectCategory)
  } else {
    localTransactions.value = await getTransaction()
  }
})

watch(selectTypes, async (selectType) => {
  if (selectType != null) {
    localTransactions.value = await filterTransactionType(selectType)
  } else {
    localTransactions.value = await getTransaction()
  }
})

watch(sortOrder, async (newSortOrder) => {
  if (newSortOrder.length > 0) {
    const headerName = newSortOrder[0].key
    const direction = newSortOrder[0].order
    if (headerName === 'amount' || headerName === 'date') {
      if (direction === 'asc') {
        localTransactions.value = await orderTransaction(headerName, 'asc')
      } else {
        localTransactions.value = await orderTransaction(headerName, 'desc')
      }
    }
  } else {
    localTransactions.value = await getTransaction()
  }
})

const headers = [
  { title: 'Сумма', value: 'amount', sortable: true },
  { title: 'Дата', value: 'date', sortable: true },
  { title: 'Категория', value: 'category', sortable: false },
  { title: 'Тип операции', value: 'type', sortable: false },
  { title: 'Редактирование', value: 'actions', sortable: false },
]
</script>

<style scoped>
* {
}
</style>
