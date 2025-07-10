<template>
  <v-card rounded="lg">
    <v-data-table :headers="headers" :items="localProducts" item-key="id" class="elevation-5">
      <template v-slot:top>
        <v-toolbar>
          <v-toolbar-title>Список товаров</v-toolbar-title>
          <v-btn prepend-icon="mdi-plus" border text="Добавить товар" @click="addProduct"> </v-btn>
        </v-toolbar>
      </template>
      <template v-slot:[`item.category`]="{ item }">
        {{ getCategoryText(item.category) }}
      </template>
      <template v-slot:[`item.actions`]="{ item }">
        <div class="d-flex ga-2 justify-start">
          <v-icon icon="mdi-pencil" size="small" @click="editProduct(item.id)"></v-icon>
          <v-icon icon="mdi-delete" size="small" @click="delProduct(item.id)"></v-icon>
        </div>
      </template>
      <template v-slot:no-data>
        <div class="pa-4">В транзакции нет товаров</div>
      </template>
    </v-data-table>
  </v-card>

  <v-dialog v-model="dialog" max-width="500">
    <v-card class="pa-5 text-center" border rounded="lg">
      <v-card-title>
        {{ editingProduct ? 'Редактировать продукт' : 'Добавить продукт' }}
      </v-card-title>
      <v-card-text>
        <v-text-field v-model="record.name" label="Наименование" />
        <v-select
          v-model="record.category"
          label="Тип товара"
          :items="categories"
          item-title="name"
          item-value="id"
          :rules="[rules.require]"
          required
        >
        </v-select>
        <v-number-input v-model="record.quantity" label="Количество"></v-number-input>
        <v-number-input v-model="record.price" label="Цена за ед."></v-number-input>
        <v-number-input v-model="record.sum" label="Сумма"></v-number-input>
      </v-card-text>
      <v-card-actions>
        <v-btn text="Отмена" @click="dialog = false"></v-btn>
        <v-spacer />
        <v-btn text="Сохранить" @click="saveProduct"></v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { ref, defineProps, onMounted } from 'vue'
import type { Products } from '@/types/product.type'
import {
  getProduct,
  addProducts,
  saveEditProduct,
  deleteProduct,
} from '@/composables/transaction.request'
import { getCategories } from '@/composables/category.request'
import type { Category } from '@/types/category.type'

const props = defineProps<{ transactionId: number }>()

const localProducts = ref<Products[]>([])
const categories = ref<Category[]>([])

onMounted(async () => {
  try {
    const result = await getProduct(props.transactionId)
    localProducts.value = result.filter((product) => product.transaction === props.transactionId)
  } catch (error) {
    console.error('Ошибка загрузки товаров:', error)
  }
  try {
    categories.value = await getCategories()
  } catch (err) {
    console.error('Ошибка загрузки категорий:', err)
  }
})

const getCategoryText = (value: number): string => {
  const found = categories.value.find((category) => category.id === value)
  return found ? found.name : String(value)
}

const dialog = ref(false)
const editingProduct = ref(false)

const record = ref<Products>({
  id: 0,
  transaction: props.transactionId,
  category: 1,
  name: '',
  quantity: 1,
  price: 1,
  sum: 1,
})

const headers = [
  { title: 'Наименование', value: 'name' },
  { title: 'Тип продукта', value: 'category' },
  { title: 'Кол-во товаров', value: 'quantity' },
  { title: 'Цена за ед.', value: 'price' },
  { title: 'Сумма', value: 'sum' },
  { title: 'Редактирование', value: 'actions' },
]

function addProduct() {
  editingProduct.value = false
  record.value = {
    id: 0,
    transaction: props.transactionId,
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
  await deleteProduct(props.transactionId, id)
  const index = localProducts.value.findIndex((product) => product.id === id)
  localProducts.value.splice(index, 1)
}

async function saveProduct() {
  if (editingProduct.value) {
    const updated = await saveEditProduct(props.transactionId, record.value.id, record.value)
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
    const created = await addProducts(props.transactionId, payload)
    localProducts.value.unshift(created)
  }
  dialog.value = false
}

const rules = {
  require: (u: unknown) => !!u || 'Обязательное поле',
}
</script>

<style scoped></style>
