export interface Transaction {
  amount: number
  date: string
  category: string
  type: 'income' | 'expense'
}

export interface Products {
  name: string
  Product_type: string
  Quantity: number
  Price: number
  Sum: number
}
