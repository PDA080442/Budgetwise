import { useApi } from '@/composables/useApi'
import type { AuthTokens, FormData, LoginData } from '@/types/auth.type'
import axios from 'axios'
import  type { infoProfile } from '@/types/auth.type'
import type { changePassword } from '@/types/auth.type'



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

//запрос на профиль
export async function getInfo(): Promise <infoProfile> {
  const respons = await call('/profile/', {}, 'GET')
  return respons as infoProfile
}


//отправка ред данных профиля
export async function postInfo(info: infoProfile): Promise<infoProfile> {
  try {
    const response = await call('/profile/', info, 'PUT')

    return response as infoProfile
  } catch (error) {
    console.error('Ошибка сохранения:', error)
    throw new Error('Не удалось сохранить')
  }
}


//запрос пароля
export async function getPassword(): Promise <changePassword> {
  const respons = await call('/profile/change-password/', {}, 'GET')
  return respons as changePassword
}

//отправка и сохранение пароля
export async function postPassword(info: changePassword): Promise<changePassword> {
  try{
    const response = await call('/profile/change-password/', info, 'POST')
    return response as changePassword
  } catch (error) {
    console.error('Ошибка сохранения:', error)
    throw new Error('Не удалось сохранить')
  }

}
