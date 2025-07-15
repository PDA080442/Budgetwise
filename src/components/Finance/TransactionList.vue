<template>
  <v-container>
    <v-card border rounded="lg">
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
            <PopupCategory />
            <v-spacer />
            <v-btn
              text="Добавить транзакцию"
              prepend-icon="mdi-plus"
              border
              class="px-4"
              @click="addTransaction"
            ></v-btn>
            <v-spacer />
            <AddCheck />
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
import { ref, defineProps, onMounted, type Ref } from 'vue'
import ProductsList from '@/components/Finance/ProductList.vue'
import type { Transaction } from '@/types/transaction.type'
import { getCategories } from '@/composables/category.request'
import { getTypes } from '@/composables/type.request'
import type { Category } from '@/types/category.type'
import PopupCategory from './PopupCategory.vue'
import type { Types } from '@/types/types.type'
import AddCheck from './AddCheck.vue'

import { useTransactionActions } from '@/services/Actions/Finance/TransactionListActions'
import { useTransactionRules } from '@/services/Rules/Finance/TransactionListRules'
import { useTransactionFilters } from '@/services/Filters/Finance/TransactionListFilters'

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

useTransactionFilters({
  propsTransactions: props.transactions as unknown as Ref<Transaction[]>,
  localTransactions,
  search,
  dateAfter,
  dateBefore,
  selectCategories,
  selectTypes,
  sortOrder,
})

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

const headers = [
  { title: 'Сумма', value: 'amount', sortable: true },
  { title: 'Дата', value: 'date', sortable: true },
  { title: 'Категория', value: 'category', sortable: false },
  { title: 'Тип операции', value: 'type', sortable: false },
  { title: 'Редактирование', value: 'actions', sortable: false },
]
</script>

<style scoped></style>
