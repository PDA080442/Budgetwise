export interface Transaction {
  id: number
  amount: number
  date: string
  category: string
  type: 'income' | 'expense'
}


