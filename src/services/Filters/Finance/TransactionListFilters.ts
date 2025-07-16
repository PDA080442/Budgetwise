import { watch } from 'vue'
import type { Ref } from 'vue'
import type { Transaction } from '@/types/transaction.type'
import {
  getTransaction,
  searchTransaction,
  filterTransactionDate,
  filterTransactionCategory,
  filterTransactionType,
  orderTransaction,
} from '@/composables/transaction.request'

interface TransactionFilters {
  propsTransactions: Ref<Transaction[]>
  localTransactions: Ref<Transaction[]>
  search: Ref<string>
  dateAfter: Ref<string>
  dateBefore: Ref<string>
  selectCategories: Ref<[]>
  selectTypes: Ref<number | null>
  sortOrder: Ref<{ key: string; order: 'asc' | 'desc' }[]>
}

export function useTransactionFilters({
  propsTransactions,
  localTransactions,
  search,
  dateAfter,
  dateBefore,
  selectCategories,
  selectTypes,
  sortOrder,
}: TransactionFilters) {
  watch(
    () => propsTransactions.value,
    (newList) => {
      localTransactions.value = [...newList]
    },
  )

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
}
