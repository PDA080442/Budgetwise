import type { Products } from '@/types/product.type'
import { useApi } from '@/composables/useApi'

const { call } = useApi('/api/positions')

export async function getProduct(): Promise<Products[]> {
  const response = await call('/account/', {}, 'GET')
  return response as Products[]
}
