<template>
  <div class="pa-4 text-center">
    <v-dialog v-model="dialog" max-width="600">
      <template v-slot:activator="{ props: activatorProps }">
        <v-btn
          prepended-icon="mdi-plus"
              text="Добавить транзакцию"
              prepend-icon="mdi-plus"
              border
              class="px-4"
          v-bind="activatorProps"
        ></v-btn>
      </template>

      <v-card prepend-icon="mdi-pencil" title="Добавление транзакции">
        <v-container>
          <v-row>
            <v-col cols="12" md="6" sm="6">
              <v-text-field
                v-model="amount"
                label="Сумма*"
                :rules="[rules.require, rules.negative]"
                required
              ></v-text-field>
            </v-col>

            <v-col cols="12" md="6" sm="6">
              <v-date-input
                v-model="date"
                :display-format="formatDate"
                label="Дата*"
                required
                clearable
                
              ></v-date-input>
            </v-col>

            <v-col cols="12" sm="6">
              <v-select
                v-model="category"
                :items="categories"
                label="Категория*"
                :rules="[rules.require]"
                required
              ></v-select>
            </v-col>

            <v-col cols="12" sm="6">
              <v-select
                v-model="type"
                :items="types"
                item-title="title"
                item-value="value"
                label="Тип операции*"
                :rules="[rules.require]"
                required
              ></v-select>
            </v-col>
          </v-row>

          <small class="text-caption text-medium-emphasis">*Обязательное поле</small>
        </v-container>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn text="Закрыть" variant="plain" @click="dialog = false"></v-btn>

          <v-btn
            color="primary"
            text="Сохранить"
            variant="tonal"
            @click="saveTransaction"
            :disabled="!formValid"
          ></v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const props = defineProps({
  onSave: {
    type: Function,
    required: true,
  },
})

const dialog = ref(false)
const amount = ref('')
const category = ref('')
const type = ref('')
const date = ref<Date | null>(null)

const categories = ref([
  'Обязательные расходы',
  'Расходы на питание',
  'Расходы на хозяйственно-бытовые нужды',
  'Расходы на предметы личного пользования',
  'Расходы на предметы быта',
  'Прочее',
])

const types = [
  { title: 'Доход', value: 'income' },
  { title: 'Расход', value: 'expense' },
]

const rules = {
  require: (u: string) => !!u || 'Обязательное поле',
  negative: (u: string) => {
    const value = parseFloat(u)
    return (!isNaN(value) && value > 0) || 'Сумма должна быть положительной'
  },
}

const formatDate = (date: Date | null): string => {
  if (!date) return ''
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

// Проверка валидности всей формы
const formValid = computed(() => {
  return (
    rules.require(amount.value) === true &&
    date.value !== null &&
    rules.require(category.value) === true &&
    rules.require(type.value) === true &&
    rules.negative(amount.value) === true
  )
})

const saveTransaction = () => {
  if (!formValid.value) {
    alert('Пожалуйста, заполните все поля корректно')
    return
  }

  props.onSave({
    amount: amount.value,
    date: formatDate(date.value),
    category: category.value,
    type: type.value,
  })

  amount.value = ''
  date.value = null
  category.value = ''
  type.value = ''
  dialog.value = false
}
</script>
