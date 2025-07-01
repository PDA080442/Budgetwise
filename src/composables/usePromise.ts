import axios from 'axios'

/* Тестовая форма */
// export interface FormData {
//   name: string
//   description: string
// }

// const formdata: FormData = {
//   name: 'Test Name',
//   description: 'test description',
// }

// export async function testdata(formdata: FormData): Promise<void> {
//   const response = await axios.post(
//     '/api/items/', // Тим даст ссылку
//     {
//       name: formdata.name,
//       description: formdata.description,
//     },
//     {
//       headers: { 'Content-Type': 'application/json' },
//     },
//   )
//   console.log('Сервер:', response.data)
// }

//  testdata(formdata)

// TODO: Это не Промисы это запросы авторизации
// TODO: Вынести логику запросов в отдельный модуль абстрагированный - делает только запросы
// TODO: Типы должны быть рахбиты по логике и хранится в отдельных файлах
export interface AuthTokens {
  access: string
  refresh: string
}

export interface FormData {
  email: string
  password: string
  password2: string
}

export interface LoginData {
  email: string
  password: string
}

export interface Transaction {
  id: number
  amount: number
  date: string
  category: string
  type: string
}

/* Запрос с reg form */
export async function regdata(formdata: FormData): Promise<void> {
  const response = await axios.post(
    '/reg/register/', // Тим даст ссылку
    {
      email: formdata.email,
      password: formdata.password,
      password2: formdata.password2,
    },
    {
      headers: { 'Content-Type': 'application/json' },
    },
  )
}

export async function logdata(logindata: LoginData): Promise<AuthTokens> {
  const response = await axios.post(
    '/reg/login/',
    {
      email: logindata.email,
      password: logindata.password,
    },
    {
      headers: { 'Content-Type': 'application/json' },
    },
  )

  // выводим в консоль только если действительно есть ответ
  if (response && response.data) {
    console.log('Ответ бэка:', response.data)
  }

  return response.data as AuthTokens
}

export async function verifyToken(token: string): Promise<boolean> {
  await axios.get('/api/token/verify/', {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })
  return true
}

/* запрос logout */
export async function logoutReq(refreshToken: string): Promise<void> {
  await axios.post(
    'reg/logout',
    {
      refreshToken,
    },
    {
      headers: { 'Content-Type': 'application/json' },
    },
  )
}

export async function getTransaction(token: string): Promise<Transaction[]> {
  const response = await axios.get<Transaction[]>('/api/transactions/', {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })
  return response.data
}
