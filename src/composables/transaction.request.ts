import { useApi } from '@/composables/useApi'
import type { Transaction } from '@/types/transaction.type'

const { call } = useApi('/api/transactions')

export async function getTransaction(): Promise<Transaction[]> {
  const response = await call('/', {}, 'GET')

  return response as Transaction[]
}

export async function createTransaction(data: Transaction): Promise<Transaction> {
  try {
    const response = await call('/', data, 'POST')

    return response as Transaction
  } catch (error) {
    console.error('Ошибка создания транзакции:', error)
    throw new Error('Не удалось создать транзакцию')
  }
}

export async function deleteTransaction(id: number) {
  await call(`/${id}/`, {}, 'DELETE')
}

export async function saveEditTransaction(id: number, data: Transaction): Promise<Transaction> {
  const response = await call(`/${id}/`, data, 'PUT')
  return response as Transaction
}

export async function addTransactions(data: Transaction): Promise<Transaction> {
  const response = await call('/', data, 'POST')
  return response as Transaction
}
