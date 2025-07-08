import type { Products } from '@/types/product.type'
import { useApi } from '@/composables/useApi'

const { call } = useApi('/api/positions')

export async function getProduct(transactionId: number): Promise<Products[]> {
  const response = await call(`/?transaction=${transactionId}`, {}, 'GET')
  return response as Products[]
}

// export async function name(params:type) {

// }
