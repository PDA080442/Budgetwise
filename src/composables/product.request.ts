import type { Products } from '@/types/transaction.type'
import { useApi } from '@/composables/useApi'

const { call } = useApi('/api/positions')

export async function getProduct(): Promise<Products[]> {
  const response = await call('/', {}, 'GET')
  return response as Products[]
}
