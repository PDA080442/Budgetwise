import type { Products } from '@/types/product.type'
import { useApi } from '@/composables/useApi'

const { call } = useApi('/api/positions')

export async function getProduct(transactionId: number): Promise<Products[]> {
  const response = await call(`/?transaction=${transactionId}`, {}, 'GET')
  return response as Products[]
}

export async function deleteProduct(transactionId: number) {
  await call(`/${transactionId}/`, {}, 'DELETE')
}

export async function saveEditProduct(transactionId: number, data: Products): Promise<Products> {
  const response = await call(`/${transactionId}/`, data, 'PUT')
  return response as Products
}

export async function addProducts(transactionId: number, data: Products): Promise<Products> {
  const response = await call(`/?transaction=${transactionId}`, data, 'POST')
  return response as Products
}
