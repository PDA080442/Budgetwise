/* addProduct с ариной как то. Наименьшее колво товаров 1. Наименьшая цена 1. Наименьшая сумма 1 */

<template>
  <v-card>
    <v-data-table :headers="headers" :items="localProducts" item-key="name" class="elevation-5">
      <template v-slot:top>
        <v-toolbar class="d-flex">
          <v-toolbar-title>Список товаров</v-toolbar-title>
          <!-- <v-btn
            prepended-icon="mdi-plus"
            text="Добавить товар"
            prepend-icon="mdi-plus"
            border
            class="px-4"
            @click="addProduct"
          ></v-btn> -->
        </v-toolbar>
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
    <v-card>
      <v-card-title> Редактировать продукт </v-card-title>
      <v-card-text>
        <v-text-field v-model="record.name" label="Наименование"></v-text-field>
        <v-text-field v-model="record.product_type" label="Тип товара"></v-text-field>
        <v-number-input v-model="record.quantity" label="Количество"></v-number-input>
        <v-number-input v-model="record.price" label="Цена за ед."></v-number-input>
        <v-number-input v-model="record.sum" label="Сумма"></v-number-input>
      </v-card-text>
      <v-card-actions>
        <v-btn text="Отмена" @click="dialog = false"> </v-btn>
        <v-spacer></v-spacer>
        <v-btn text="Сохранить" @click="saveProduct"></v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import type { Products } from '@/types/product.type'
import { addProducts, getProduct, saveEditProduct } from '@/composables/product.request'
import { ref, defineProps, onMounted } from 'vue'
import { deleteProduct } from '@/composables/product.request'

const props = defineProps<{ transactionId: number }>()

const localProducts = ref<Products[]>([])

onMounted(async () => {
  try {
    const result = await getProduct(props.transactionId)
    localProducts.value = result.filter((product) => product.transaction == props.transactionId)
  } catch (error) {
    console.error('Ошибка:', error)
  }
})

const dialog = ref(false)
const editingProduct = ref(false)
const record = ref<Products>({
  id: 0,
  transaction: 0,
  category: 0,
  name: '',
  product_type: '',
  quantity: 0,
  price: 0,
  sum: 0,
})

const headers = [
  { title: 'Наименование', value: 'name' },
  { title: 'Тип продукта', value: 'product_type' },
  { title: 'Кол-во товаров', value: 'quantity' },
  { title: 'Цена за ед.', value: 'price' },
  { title: 'Сумма', value: 'sum' },
  { title: 'Редактирование', value: 'actions' },
]

function editProduct(id: number) {
  editingProduct.value = true
  dialog.value = true
  const found = localProducts.value.find((product) => product.id === id)
  if (!found) return
  record.value = {
    id: found.id,
    transaction: found.transaction,
    category: found.category,
    name: found.name,
    product_type: found.product_type,
    quantity: found.quantity,
    price: found.price,
    sum: found.sum,
  }
}

const delProduct = async (id: number) => {
  await deleteProduct(id)
  const index = localProducts.value.findIndex((product) => product.id === id)
  localProducts.value.splice(index, 1)
}

const saveProduct = async (id: number) => {
  if (editingProduct.value) {
    const result = await saveEditProduct(record.value.id, record.value)
    const index = localProducts.value.findIndex((transaction) => transaction.id === record.value.id)
    localProducts.value.splice(index, 1, result)
  } else {
    const payload = {
      id: record.value.id,
      transaction: record.value.transaction,
      category: record.value.category,
      name: record.value.name,
      product_type: record.value.product_type,
      quantity: record.value.quantity,
      price: record.value.price,
      sum: record.value.sum,
    }
    const create = await addProducts(id, payload)
    localProducts.value.unshift(create)
  }
  dialog.value = false
}
</script>
