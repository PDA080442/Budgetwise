import type { Ref } from 'vue'
import type { Products } from '@/types/product.type'
import type { Category } from '@/types/category.type'
import { addProducts, saveEditProduct, deleteProduct } from '@/composables/transaction.request'

export interface ProductActions {
  propsTransactionId: number
  localProducts: Ref<Products[]>
  dialog: Ref<boolean>
  editingProduct: Ref<boolean>
  record: Ref<Products>
  categories: Ref<Category[]>
}

export function useProductActions({
  propsTransactionId,
  localProducts,
  dialog,
  editingProduct,
  record,
  categories,
}: ProductActions) {
  function addProduct() {
    editingProduct.value = false
    record.value = {
      id: 0,
      transaction: propsTransactionId,
      category: 1,
      name: '',
      quantity: 1,
      price: 1,
      sum: 1,
    }
    dialog.value = true
  }

  function editProduct(id: number) {
    const found = localProducts.value.find((product) => product.id === id)
    if (!found) return
    editingProduct.value = true
    record.value = {
      id: found.id,
      transaction: found.transaction,
      category: found.category,
      name: found.name,
      quantity: found.quantity,
      price: found.price,
      sum: found.sum,
    }
    dialog.value = true
  }

  const delProduct = async (id: number) => {
    await deleteProduct(propsTransactionId, id)
    const index = localProducts.value.findIndex((product) => product.id === id)
    localProducts.value.splice(index, 1)
  }

  async function saveProduct() {
    if (editingProduct.value) {
      const updated = await saveEditProduct(propsTransactionId, record.value.id, record.value)
      const index = localProducts.value.findIndex((product) => product.id === updated.id)
      localProducts.value.splice(index, 1, updated)
    } else {
      const payload = {
        id: record.value.id,
        transaction: record.value.transaction,
        category: record.value.category,
        name: record.value.name,
        quantity: record.value.quantity,
        price: record.value.price,
        sum: record.value.sum,
      }
      const created = await addProducts(propsTransactionId, payload)
      localProducts.value.unshift(created)
    }
    dialog.value = false
  }

  const getCategoryText = (value: number): string => {
    const found = categories.value.find((category) => category.id === value)
    return found ? found.name : String(value)
  }

  return {
    addProduct,
    editProduct,
    delProduct,
    saveProduct,
    getCategoryText,
  }
}
