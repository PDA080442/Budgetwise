import { useApi } from '@/composables/useApi'
import type { Transaction } from '@/types/transaction.type'
import type { Products } from '@/types/product.type'

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

/* Запрос на фильтры */
export async function searchTransaction(query: string): Promise<Transaction[]> {
  const response = await call(`/?search=${query}`, {}, 'GET')
  return response as Transaction[]
}

export async function filterTransactionDate(
  dateAfter: string,
  dateBefore: string,
): Promise<Transaction[]> {
  const response = await call(`/?date_after=${dateAfter}&date_before=${dateBefore}`, {}, 'GET')
  return response as Transaction[]
}

export async function filterTransactionCategory(categoryId: []): Promise<Transaction[]> {
  const response = await call(`/?category=${categoryId.join(',')}`, {}, 'GET')
  return response as Transaction[]
}

export async function filterTransactionType(typeId: number): Promise<Transaction[]> {
  const response = await call(`/?type=${typeId}`, {}, 'GET')
  return response as Transaction[]
}

export async function orderTransaction(orderName: string): Promise<Transaction[]> {
  const response = await call(`/ordering=${orderName}`, {}, 'GET')
  return response as Transaction[]
}

/* Запросы на продукты */

export async function getProduct(transactionId: number): Promise<Products[]> {
  const response = await call(`/${transactionId}/positions/`, {}, 'GET')
  return response as Products[]
}

export async function deleteProduct(transactionId: number, id: number) {
  await call(`/${transactionId}/positions/${id}/`, {}, 'DELETE')
}

export async function saveEditProduct(
  transactionId: number,
  id: number,
  data: Products,
): Promise<Products> {
  const response = await call(`/${transactionId}/positions/${id}/`, data, 'PUT')
  return response as Products
}

export async function addProducts(transactionId: number, data: Products): Promise<Products> {
  const response = await call(`/${transactionId}/positions/`, data, 'POST')
  return response as Products
}