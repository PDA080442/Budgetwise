<template>
  <v-container>
    <v-card>
      <v-card-title>Список транзакций</v-card-title>

      <v-data-table
        :headers="headers"
        :items="transactions"
        show-expand
        item-key="id"
        class="elevation-24"
      >
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
        <template v-slot:expanded-row="{ columns, item }">
          <tr>
            <td :colspan="columns.length" class="py-2">
              <v-sheet rounded="lg" border class="pa-4">
                <ProductsList :products="getProductsForTransaction(item)" />
              </v-sheet>
            </td>
          </tr>
        </template>
      </v-data-table>
    </v-card>
  </v-container>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import ProductsList from '@/components/Finance/ProductList.vue'
import { TransactionMocks } from '@/mocks/FinanceMocks/TransactionMocks'
import { ProductsMocks } from '@/mocks/FinanceMocks/ProductMocks'
import type { Transaction, Products } from '@/types/transaction.type'

const transactions = ref<Transaction[]>(TransactionMocks)

// const getOperationTypeText = (t: string) => (t === 'income' ? 'Доход' : 'Расход')

const getProductsForTransaction = (tx: Transaction): Products[] =>
  tx.category === 'Продукты' ? ProductsMocks : []

const headers = [
  { title: 'Сумма', value: 'amount', class: 'header__amount' },
  { title: 'Дата', value: 'date' },
  { title: 'Категория', value: 'category' },
  { title: 'Тип операции', value: 'type' },
]
</script>

<style scoped></style>
