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





export interface CreateTransactionData {
  amount: number
  date: string // Ожидается в формате YYYY-MM-DD
  category: string
  operationType: string // На сервер отправляем как 'type'
}

export interface Transaction {
  id: number
  amount: number
  date: string
  category: string
  type: string // 'Доход' или 'Расход'
}


// export async function createTransaction(
//   token: string,
//   transactionData: CreateTransactionData
// ): Promise<Transaction> {
//   try {
//     // Преобразуем operationType в type для соответствия серверу
//     const { operationType, ...rest } = transactionData;
    
    
//     console.log("Отправка данных на сервер:", payload);

//     const response = await axios.post<Transaction>(
//       '/api/transactions/', // Убедитесь, что эндпоинт корректен
//       {
//         operationType:
//         category:
//         amount: 
//         date:
//       },
//       {
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${token}`
//         }
//       }
//     );

//     return response.data;
//   } catch (error) {
//     console.error('Ошибка создания транзакции:', error);
//     throw new Error('Не удалось создать транзакцию');
//   }
// }

export async function createTransaction(
  token: string,
  data: CreateTransactionData
): Promise<Transaction> {
  try {
    const response = await axios.post(
      '/api/transactions/',
      {
        amount: data.amount,
        date: data.date,
        category: data.category,
        type: data.operationType
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      }
    );
    
    return response.data as Transaction;
    
  } catch (error) {
    console.error('Ошибка создания транзакции:', error);
    throw new Error('Не удалось создать транзакцию');
  }
}


// Вспомогательная функция для преобразования даты
export function formatDateForServer(dateString: string): string {
  const parts = dateString.split('.');
  if (parts.length !== 3) return dateString;
  return `${parts[2]}-${parts[1]}-${parts[0]}`; // YYYY-MM-DD
}