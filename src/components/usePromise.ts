import axios from 'axios'

export interface FormData {
  name: string
  description: string
}

const formdata: FormData = {
  name: 'Test Name',
  description: 'test description',
}

export async function testdata(formdata: FormData): Promise<void> {
  const response = await axios.post(
    'http://localhost:8000/api/items/', // Тим даст ссылку
    {
      name: formdata.name,
      description: formdata.description,
    },
    {
      headers: { 'Content-Type': 'application/json' },
    },
  )
  console.log('Сервер:', response.data)
}

testdata(formdata)
