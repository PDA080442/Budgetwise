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

export interface AuthTokens {
  accessToken: string
  refreshToken: string
}

export interface FormData {
  email: string
  password: string
  passwordConfirm: string
}


export interface LoginData {
  email: string
  password: string
}

export async function regdata(formdata: FormData): Promise<void> {
  const response = await axios.post(
    '/reg/register/', // Тим даст ссылку
    {
      email: formdata.email,
      password: formdata.password,
      passwordConfirm: formdata.passwordConfirm,
    },
    {
      headers: { 'Content-Type': 'application/json' },
    },
  )
  // console.log('Сервер:', response.data)
  // return response.data as AuthTokens
}

export async function logdata(logindata: LoginData): Promise<void> {
  const response = await axios.post(
    '/reg/register/', // Тим даст ссылку
    {
      email: logindata.email,
      password: logindata.password,
    },
    {
      headers: { 'Content-Type': 'application/json' },
    },
    
  )
}
/*  запрос с login form */
