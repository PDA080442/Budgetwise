<template>
  <v-card class="awesome-card" rounded="lg">
    <v-data-table
      :headers="headers"
      :items="localProducts"
      item-key="id"
      class="awesome-table elevation-5"
      hide-default-footer
    >
      <template v-slot:top>
        <v-toolbar flat class="awesome-toolbar">
          <v-toolbar-title>Список товаров</v-toolbar-title>
          <v-spacer />
          <v-btn border @click="addProduct">
            <v-icon size="large">mdi-plus</v-icon>
          </v-btn>
        </v-toolbar>
      </template>

      <template v-slot:[`item.category`]="{ item }">
        <v-chip class="awesome-chip" small>{{ getCategoryText(item.category) }}</v-chip>
      </template>

      <template v-slot:[`item.sum`]="{ item }">
        <span class="sum-cell">{{ item.sum }}</span>
      </template>

      <template v-slot:[`item.actions`]="{ item }">
        <div class="d-flex ga-2 justify-start">
          <v-icon
            class="icon-hover"
            icon="mdi-pencil"
            size="large"
            color="primary"
            @click="editProduct(item.id)"
          />
          <v-icon
            class="icon-hover"
            icon="mdi-delete"
            size="large"
            color="red"
            @click="delProduct(item.id)"
          />
        </div>
      </template>

      <template v-slot:no-data>
        <div class="no-data">В транзакции нет товаров</div>
      </template>
    </v-data-table>
  </v-card>

  <v-dialog v-model="dialog" max-width="500" transition="dialog-bottom-transition">
    <v-card class="dialog-card pa-5 text-center" border rounded="lg">
      <v-card-title class="dialog-title">
        {{ editingProduct ? 'Редактировать продукт' : 'Добавить продукт' }}
      </v-card-title>
      <v-card-text>
        <v-text-field v-model="record.name" label="Наименование" class="awesome-input" />
        <v-select
          v-model="record.category"
          label="Тип товара"
          :items="categories"
          item-title="name"
          item-value="id"
          :rules="[rules.require]"
          required
          class="awesome-input"
        />
        <v-number-input v-model="record.quantity" label="Количество" class="awesome-input" />
        <v-number-input v-model="record.price" label="Цена за ед." class="awesome-input" />
        <v-number-input v-model="record.sum" label="Сумма" class="awesome-input" />
      </v-card-text>
      <v-card-actions>
        <v-btn text @click="dialog = false">Отмена</v-btn>
        <v-spacer />
        <v-btn class="awesome-btn" @click="saveProduct">Сохранить</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { ref, defineProps, onMounted } from 'vue'
import type { Products } from '@/types/product.type'
import { getProduct } from '@/composables/transaction.request'
import { getCategories } from '@/composables/category.request'
import type { Category } from '@/types/category.type'
import { useProductActions } from '@/services/Actions/Finance/ProductListActions'
import { useProductRules } from '@/services/Rules/Finance/ProductListRules'

const props = defineProps<{ transactionId: number }>()

const localProducts = ref<Products[]>([])
const categories = ref<Category[]>([])
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

const { addProduct, editProduct, delProduct, saveProduct, getCategoryText } = useProductActions({
  propsTransactionId: props.transactionId,
  localProducts,
  dialog,
  editingProduct,
  record,
  categories,
})

const { rules } = useProductRules()

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

const headers = [
  { title: 'Наименование', value: 'name' },
  { title: 'Тип продукта', value: 'category' },
  { title: 'Кол-во товаров', value: 'quantity' },
  { title: 'Цена за ед.', value: 'price' },
  { title: 'Сумма', value: 'sum' },
  { title: 'Редактирование', value: 'actions' },
]
</script>

<style scoped>
.awesome-card {
  background: linear-gradient(135deg, #ffffff 0%, #f0f4ff 100%);
  border: 2px solid #3f51b5;
}
.awesome-toolbar {
  background-color: transparent;
  padding: 0 16px;
}

.awesome-table .v-data-table-header th {
  background-color: primary !important;
  color: #ffffff !important;
}
.awesome-table tbody tr:hover {
  background-color: #e3f2fd;
}
.awesome-chip {
  background-color: #e8eaf6;
  border-radius: 12px;
  font-weight: 500;
}
.sum-cell {
  font-weight: bold;
  color: #1e88e5;
}
.icon-hover:hover {
  transform: scale(1.2);
  transition: transform 0.2s;
  cursor: pointer;
}
.dialog-card {
  border: 2px solid #3f51b5;
}
.dialog-title {
  font-size: 1.25rem;
  font-weight: bold;
  color: #3f51b5;
}
.awesome-input >>> .v-input__control {
  border-bottom: 2px solid #3f51b5 !important;
}
.no-data {
  color: #757575;
  font-style: italic;
}
</style>
