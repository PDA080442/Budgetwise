<template>
  <v-sheet
    class="pa-0"
    style="
      --v-navigation-drawer-width: 400px;
      border-top-left-radius: 8px;
      border-bottom-left-radius: 8px;
    "
  >
    <v-toolbar flat dense class="px-4" style="background-color: #1867c0; color: white">
      <v-toolbar-title class="text-h6">Фильтры</v-toolbar-title>
      <v-spacer />
    </v-toolbar>

    <v-card flat class="pa-4" style="box-shadow: none; background: transparent">
      <v-text-field
        v-model="dateAfterLocal"
        prepend-inner-icon="mdi-calendar-start"
        label="Начало"
        type="date"
        clearable
        class="mb-4"
        density="comfortable"
        variant="outlined"
      />

      <v-text-field
        v-model="dateBeforeLocal"
        prepend-inner-icon="mdi-calendar-end"
        label="Конец"
        type="date"
        clearable
        class="mb-4"
        density="comfortable"
        variant="outlined"
      />

      <v-select
        v-model="selectCategoriesLocal"
        :items="categories"
        item-title="name"
        item-value="id"
        label="Категории"
        multiple
        clearable
        class="mb-4"
        density="comfortable"
        variant="outlined"
      />

      <v-select
        v-model="selectTypesLocal"
        :items="types"
        item-title="name"
        item-value="id"
        label="Доход/Расход"
        clearable
        class="mb-4"
        density="comfortable"
        variant="outlined"
      />

      <div class="d-flex justify-center mt-6">
        <v-btn text @click="onReset">Сбросить</v-btn>
      </div>
    </v-card>
  </v-sheet>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import type { Category } from '@/types/category.type'
import type { Types } from '@/types/types.type'

const props = defineProps<{
  dateAfter: string
  dateBefore: string
  selectCategories: number[]
  selectTypes: number | null
  categories: Category[]
  types: Types[]
}>()

const emit = defineEmits<{
  (e: 'update:dateAfter', v: string): void
  (e: 'update:dateBefore', v: string): void
  (e: 'update:selectCategories', v: number[]): void
  (e: 'update:selectTypes', v: number | null): void
  (e: 'reset'): void
  (e: 'apply'): void
  (e: 'close'): void
}>()

const dateAfterLocal = ref(props.dateAfter)
const dateBeforeLocal = ref(props.dateBefore)
const selectCategoriesLocal = ref(props.selectCategories)
const selectTypesLocal = ref(props.selectTypes)

watch(dateAfterLocal, (v) => emit('update:dateAfter', v))
watch(dateBeforeLocal, (v) => emit('update:dateBefore', v))
watch(selectCategoriesLocal, (v) => emit('update:selectCategories', v))
watch(selectTypesLocal, (v) => emit('update:selectTypes', v))

watch(
  () => props.dateAfter,
  (v) => (dateAfterLocal.value = v),
)
watch(
  () => props.dateBefore,
  (v) => (dateBeforeLocal.value = v),
)
watch(
  () => props.selectCategories,
  (v) => (selectCategoriesLocal.value = v),
)
watch(
  () => props.selectTypes,
  (v) => (selectTypesLocal.value = v),
)

function onReset() {
  dateAfterLocal.value = ''
  dateBeforeLocal.value = ''
  selectCategoriesLocal.value = []
  selectTypesLocal.value = null
  emit('update:dateAfter', '')
  emit('update:dateBefore', '')
  emit('update:selectCategories', [])
  emit('update:selectTypes', null)
  emit('reset')
}
</script>

<style scoped></style>
