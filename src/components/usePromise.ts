import axios from 'axios'

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

export interface FormData {
  email: string
  password: string
  passwordConfirm: string
}

const formdata: FormData = {
  email: 'Test email',
  password: 'test password',
  passwordConfirm: 'test passwordConfirm',
}

export async function regdata(formdata: FormData): Promise<void> {
  const response = await axios.post(
    '/api/items/', // Тим даст ссылку
    {
      email: formdata.email,
      password: formdata.password,
      passwordConfirm: formdata.passwordConfirm,
    },
    {
      headers: { 'Content-Type': 'application/json' },
    },
  )
  console.log('Сервер:', response.data)
}

// testdata(formdata)
