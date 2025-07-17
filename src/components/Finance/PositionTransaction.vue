<template>
  <div class="pa-4 text-center">
    <v-dialog
      v-model="dialog"
      max-width="600"
    >
      <template v-slot:activator="{ props: activatorProps }">
        <v-btn
          prepended-icon="mdi-plus"
            text="Добавить товар"
            prepend-icon="mdi-plus"
            border
            class="px-4"
            v-bind="activatorProps"
        ></v-btn>
      </template>

      <v-card
        prepend-icon="mdi-pencil"
        title="Добавление позиций транзакции"
      >
        <v-card-text>
          <v-row dense>
            <v-col
              cols="12"

            >
              <v-text-field
                label="Наименование товара"
                required
                v-model="product.name"
              ></v-text-field>
            </v-col>

            <v-col
              cols="12"
              sm="6"
            >
              <v-text-field
                label="Тип продукта"
                v-model="product.product_type"
              ></v-text-field>
            </v-col>

            <v-col
              cols="12"
              sm="6"
            >
              <v-text-field
                label="Кол-во товаров"
                persistent-hint
                required
                type="number"
                min="0"
                v-model.number="product.quantity"
                @input="validateQuantity"
                :rules="[rules.negative]"
              ></v-text-field>
            </v-col>

            <v-col
              cols="12"
              sm="6"
            >
              <v-text-field
                label="Цена за единицу"
                required
                type="number"
                min="0"
                v-model.number="product.price"
                @input="validatePrice"
                :rules="[rules.negative]"
              ></v-text-field>
            </v-col>

            <v-col
              cols="12"
              sm="6"
            >
              <v-text-field
                label="Общая сумма"
                required
                readonly
                hint="Заполняется автоматически"
                v-model="product.sum"
              ></v-text-field>
            </v-col>
            
          </v-row>
          
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
            text="Закрыть"
            variant="plain"
            @click="dialog = false"
          ></v-btn>

          <v-btn
            color="primary"
            text="Сохранить"
            prepend-icon="mdi-check"
            variant="tonal"
            @click="saveProduct"
            :disabled="quantityError || priceError || !isFormValid"
          ></v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup lang="ts">
import { shallowRef, ref, computed } from 'vue'

const dialog = shallowRef(false)
const product = ref({
  name: '',
  product_type: '', 
  quantity: 0,
  price: 0,
  sum: 0
})

const quantityError = ref(false)
const priceError = ref(false)

const isFormValid = computed(() => {
  return product.value.name && 
         product.value.product_type && 
         product.value.quantity > 0 && 
         product.value.price > 0
})

const validateQuantity = () => {
  quantityError.value = product.value.quantity < 0
  if (!quantityError.value) {
    calculateSum()
  }
}

const validatePrice = () => {
  priceError.value = product.value.price < 0
  if (!priceError.value) {
    calculateSum()
  }
}

const rules = {
  negative: (u: string) => {
    const value = parseFloat(u)
    return (!isNaN(value) && value > 0) || 'Число должно быть положительным'
  },
}

const calculateSum = () => {
  if (!quantityError.value && !priceError.value) {
    product.value.sum = Number((product.value.quantity * product.value.price).toFixed(2))
  } else {
    product.value.sum = 0
  }
}

const saveProduct = () => {
  if (quantityError.value || priceError.value) return
  
  console.log('Сохраненный продукт:', product.value)
  dialog.value = false
  
  product.value = {
    name: '',
    product_type: '',
    quantity: 0,
    price: 0,
    sum: 0
  }
}
</script>