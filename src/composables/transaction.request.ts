import { useApi } from '@/composables/useApi'
import type { Transaction } from '@/types/transaction.type'

const { call } = useApi('/api/transactions')

export async function getTransaction(): Promise<Transaction[]> {
  const response = await call('/', {}, 'GET')
  return response as Transaction[]
}

export async function createTransaction(data: Omit<Transaction, 'id'>): Promise<Transaction> {
  try {
    // Убедимся, что отправляем category, а не category_id
    const payload = {
      ...data,
      category: data.category
    }
    
    const response = await call('/', payload, 'POST')
    return response as Transaction
  } catch (error) {
    console.error('Ошибка создания транзакции:', error)
    throw new Error('Не удалось создать транзакцию')
  }
}