import { useApi } from '@/composables/useApi'
import type { AuthTokens, FormData, LoginData } from '@/types/auth.type'
import axios from 'axios'

const { call } = useApi('/reg')

export async function regdata(formdata: FormData): Promise<void> {
  await call('/register/', formdata, 'POST')
}

export async function logdata(logindata: LoginData): Promise<AuthTokens> {
  const tokens: AuthTokens = await call('/login/', logindata, 'POST')

  localStorage.setItem('accessToken', tokens.access)
  localStorage.setItem('refreshToken', tokens.refresh)

  axios.defaults.headers.common['Authorization'] = `Bearer ${tokens.access}`

  return tokens as AuthTokens
}

export async function logoutReq(refreshToken: string): Promise<void> {
  await call(
    '/logout/',
    {
      refreshToken,
    },
    'POST',
  )
}
