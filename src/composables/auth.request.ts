import { useApi } from '@/composables/useApi'
import type { AuthTokens, LoginData } from '@/types/auth.type'
import axios from 'axios'

const { call } = useApi('/reg')

export async function regdata(formdata: LoginData): Promise<void> {
  const payload = {
    email: formdata.email,
    password: formdata.password,
  }
  await call('/register/', payload, 'POST')
}

export async function logdata(logindata: LoginData): Promise<AuthTokens> {
  // const tokens: AuthTokens = await call('/login/', logindata, 'POST')
  const tokens = (await call('/login/', logindata, 'POST')) as AuthTokens

  localStorage.setItem('accessToken', tokens.access)
  localStorage.setItem('refreshToken', tokens.refresh)

  axios.defaults.headers.common['Authorization'] = `Bearer ${tokens.access}`

  return tokens as AuthTokens
}

export async function logoutReq(refresh_token: string): Promise<void> {
  await call(
    '/logout/',
    {
      refresh: refresh_token
    },
    'POST',
  )
}
