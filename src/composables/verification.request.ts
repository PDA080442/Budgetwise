import { useApi } from '@/composables/useApi'

const { call } = useApi('/api')

export async function verifyToken(): Promise<boolean> {
  const token = localStorage.getItem('accessToken')
  await call('/token/verify/', { token }, 'POST')
  return true
}
