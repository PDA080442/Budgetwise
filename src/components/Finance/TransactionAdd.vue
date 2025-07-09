<template>
  <div class="pa-4 text-center">
    <v-dialog v-model="dialog" max-width="600">
      <template v-slot:activator="{ props: activatorProps }">
        <v-btn
          class="text-none font-weight-regular"
          prepend-icon="mdi-pencil"
          text="Добавить транзакцию"
          variant="tonal"
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

export default defineComponent({
  name: 'TranzForm',
  props: {
    onSave: {
      type: Function,
      required: true,
    },
  },
  setup(props) {
    const dialog = ref(false)
    const date = ref('')
    const amount = ref('')
    const category = ref('')
    const type = ref('')

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
      dateFormat: (u: string) => {
        const datePattern = /^(0[1-9]|[12][0-9]|3[01])\.(0[1-9]|1[0-2])\.(\d{4})$/
        return datePattern.test(u) || 'Неверный формат даты. Пример: 25.06.2025'
      },
    }

    // Проверка валидности всей формы
    const formValid = computed(() => {
      return (
        rules.require(amount.value) === true &&
        rules.require(date.value) === true &&
        rules.require(category.value) === true &&
        rules.require(type.value) === true &&
        rules.negative(amount.value) === true &&
        rules.dateFormat(date.value) === true
      )
    })

    const saveTransaction = () => {
      if (!formValid.value) {
        alert('Пожалуйста, заполните все поля корректно')
        return
      }

      props.onSave({
        amount: amount.value,
        date: date.value,
        category: category.value,
        type: type.value,
      })

      amount.value = ''
      date.value = ''
      category.value = ''
      type.value = ''
      dialog.value = false
    }

    return {
      categories,
      dialog,
      date,
      amount,
      category,
      type,
      rules,
      formValid,
      saveTransaction,
      types,
    }
  },
})

const dialog = ref(false)
const amount = ref('')
const category = ref('')
const type = ref('')
const date = ref<Date | null>(null)

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
