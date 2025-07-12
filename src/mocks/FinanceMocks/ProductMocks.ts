import type { Products } from '@/types/product.type'

export const ProductsMocks: Products[] = [
  {
    id: 1,
    transaction: 1,
    category: 1,
    name: 'Молоко',
    quantity: 2,
    price: 100,
    sum: 200,
  },
  {
    id: 2,
    transaction: 2,
    category: 2,
    name: 'Творог',
    quantity: 3,
    price: 120,
    sum: 360,
  },
  {
    id: 3,
    transaction: 3,
    category: 3,
    name: 'Пиво',
    quantity: 8,
    price: 90,
    sum: 560,
  },
]
