import type { Transaction } from '@/types/transaction.type'

export const TransactionMocks: Transaction[] = [
  {
    amount: 1200,
    date: '04.07.2025',
    category: 'Обязательный платеж',
    type: 'expense',
  },
  {
    amount: 10567,
    date: '03.07.2025',
    category: 'Продукты',
    type: 'expense',
  },
  {
    amount: 2434,
    date: '02.07.2025',
    category: '-',
    type: 'income',
  },
]
