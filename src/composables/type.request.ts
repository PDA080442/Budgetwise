import { useApi } from '@/composables/useApi'
import type { Types } from '@/types/types.type'

const { call } = useApi('/api/operation-types')

export async function getTypes(): Promise<Types[]> {
  const response = await call('/', {}, 'GET')
  return response as Types[]
}
