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
        <v-toolbar flat dense class="awesome-toolbar styled-toolbar">
          <v-toolbar-title class="text-h6 font-weight-bold">Список товаров</v-toolbar-title>
          <v-spacer />
          <v-btn class="styled-add-btn" @click="addProduct">
            <v-icon size="24">mdi-plus</v-icon>
          </v-btn>
        </v-toolbar>
      </template>

      <template v-slot:[`item.category`]="{ item }">
        <v-chip
          :color="getCategoryColor(item.category)"
          :border="`${getCategoryColor(item.category)} thin opacity-25`"
          class="awesome-chip"
          small
        >
          {{ getCategoryText(item.category) }}
        </v-chip>
      </template>

      <template v-slot:[`item.sum`]="{ item }">
        <span class="sum-cell">{{ formatCurrency(item.sum) }}</span>
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
        <v-btn class="awesome-btn styled-add-btn" @click="saveProduct">Сохранить</v-btn>
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

const categoryColors: Record<number, string> = {
  1: '#F44336',
  2: '#2196F3',
  3: '#4CAF50',
  4: '#FF9800',
  5: '#9C27B0',
}

function getCategoryColor(categoryId: number): string {
  return categoryColors[categoryId] || '#000000'
}

function formatCurrency(val: number): string {
  return new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB' }).format(val)
}

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
  border-radius: 12px;
}

.awesome-toolbar.styled-toolbar {
  background-color: rgb(var(--v-theme-primary)) !important;
  border-radius: 12px;
  padding: 0 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.awesome-toolbar .v-toolbar-title {
  color: #fff;
}

.styled-add-btn {
  background-color: #fff;
  color: #764ba2;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  min-width: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  transition:
    background-color 0.2s,
    transform 0.2s;
}

.styled-add-btn:hover {
  background-color: #ececff;
  transform: translateY(-2px);
}

.awesome-table .v-data-table-header th {
  background-color: rgb(var(--v-theme-primary)) !important;
  color: #ffffff !important;
}

.awesome-table tbody tr:hover {
  background-color: #e3f2fd;
}

.awesome-chip {
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

.no-data {
  color: #757575;
  font-style: italic;
}
</style>
