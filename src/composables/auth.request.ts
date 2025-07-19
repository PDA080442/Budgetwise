import { useApi } from '@/composables/useApi'
import type { AuthTokens, LoginData } from '@/types/auth.type'
import axios from 'axios'
import type { infoProfile } from '@/types/auth.type'
import type { changePassword } from '@/types/auth.type'

const { call } = useApi('/reg')

export async function regdata(formdata: LoginData): Promise<void> {
  const payload = {
    email: formdata.email,
    password: formdata.password,
  }
  await call('/register/', payload, 'POST')
}

export async function logdata(logindata: LoginData): Promise<AuthTokens> {
  const tokens = (await call('/login/', logindata, 'POST')) as AuthTokens

  localStorage.setItem('accessToken', tokens.access)
  localStorage.setItem('refreshToken', tokens.refresh)

  axios.defaults.headers.common['Authorization'] = `Bearer ${tokens.access}`

  return tokens as AuthTokens
}

export async function logoutReq(refresh_token: string): Promise<void> {
  await call('/logout/', { refresh: refresh_token }, 'POST')
}

export async function getInfo(): Promise<infoProfile> {
  const respons = await call('/profile/', {}, 'GET')
  return respons as infoProfile
}

export async function postInfo(info: infoProfile): Promise<infoProfile> {
  try {
    const response = await call('/profile/', info, 'PUT')

    return response as infoProfile
  } catch (error) {
    console.error('Ошибка сохранения:', error)
    throw new Error('Не удалось сохранить')
  }
}

export async function getPassword(): Promise<changePassword> {
  const respons = await call('/profile/change-password/', {}, 'GET')
  return respons as changePassword
}

export async function postPassword(info: changePassword): Promise<changePassword> {
  try {
    const response = await call('/profile/change-password/', info, 'POST')
    return response as changePassword
  } catch (error) {
    console.error('Ошибка сохранения:', error)
    throw new Error('Не удалось сохранить')
  }
}

export async function getEmail(): Promise<LoginData> {
  const response = await call('/profile/', {}, 'GET')
  return response as LoginData
}
