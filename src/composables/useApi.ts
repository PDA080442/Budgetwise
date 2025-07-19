import axios from 'axios'
import type { Method } from 'axios'

export function useApi(url = '') {
  const instance: string = url

  const getToken = () => {
    return localStorage.getItem('accessToken')
  }
  async function call(url: string, data: object, method: Method = 'get'): Promise<unknown> {
    const fullUrl = `http://localhost:8000${instance}${url}`
    console.log(fullUrl, getToken())

    const response = await axios.request({
      method, // e.g. 'get', 'post', 'put', 'delete', etc.
      url: fullUrl, // e.g. '/api/users'
      data, // for request body on POST/PUT/PATCH
      headers: {
        'Content-Type': 'application/json',
      },
    })
    if (response && response.data) {
      console.log('Ответ бэка:', response.data)
    }
    return response.data
  }
  return { call }
}
