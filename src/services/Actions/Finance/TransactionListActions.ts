import type { Ref } from 'vue'
import type { Transaction } from '@/types/transaction.type'
import type { Category } from '@/types/category.type'
import type { Types } from '@/types/types.type'

import {
  deleteTransaction,
  saveEditTransaction,
  addTransactions,
} from '@/composables/transaction.request'

export interface TransactionActions {
  localTransactions: Ref<Transaction[]>
  dialog: Ref<boolean>
  editingTransaction: Ref<boolean>
  record: Ref<Transaction>
  categories: Ref<Category[]>
  types: Ref<Types[]>
}

export function useTransactionActions({
  localTransactions,
  dialog,
  editingTransaction,
  record,
  categories,
}: TransactionActions) {
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
    const found = localTransactions.value.find((transaction: Transaction) => transaction.id === id)
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
    const index = localTransactions.value.findIndex(
      (transaction: Transaction) => transaction.id === id,
    )
    localTransactions.value.splice(index, 1)
  }

  const saveTransaction = async () => {
    if (editingTransaction.value) {
      const result = await saveEditTransaction(record.value.id, record.value)
      const index = localTransactions.value.findIndex(
        (transaction: Transaction) => transaction.id === record.value.id,
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

  const getTypeText = (type: string | number) => (type === '0' || type === 0 ? 'Доход' : 'Расход')

  const getCategoryText = (value: number) => {
    const result = categories.value.find((category: Category) => category.id === value)
    return result ? result.name : value
  }

  return {
    addTransaction,
    edTransaction,
    delTransaction,
    saveTransaction,
    getTypeText,
    getCategoryText,
  }
}
