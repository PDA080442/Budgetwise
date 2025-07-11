import type { Category } from '@/types/category.type'
import { useApi } from '@/composables/useApi'

const { call } = useApi('/api/categories')

export async function getCategories(): Promise<Category[]> {
  const response = await call('/', {}, 'GET')
  return response as Category[]
}
