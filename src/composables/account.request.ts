import { useApi } from '@/composables/useApi'
import type { LoginData } from '@/types/auth.type'


const { call } = useApi('/reg')

export async function getEmail(): Promise<LoginData> {
  const response = await call('/acc', {}, 'GET')
  return response as LoginData
}