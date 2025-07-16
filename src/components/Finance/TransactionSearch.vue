```vue
<!-- src/components/Finance/TransactionSearch.vue -->
<template>
  <!-- Обёртка с приятной карточкой и полупрозрачным фоном -->
  <v-card
    flat
    class="pa-2 mx-4 mb-4"
    elevation="2"
    style="border-radius: 8px; backdrop-filter: blur(4px); background: rgba(255, 255, 255, 0.8)"
  >
    <!-- Стилизованное текстовое поле поиска -->
    <v-text-field
      v-model="searchLocal"
      clearable
      placeholder="Поиск транзакций..."
      prepend-inner-icon="mdi-magnify"
      hide-details
      rounded="lg"
      density="comfortable"
      variant="outlined"
    />
  </v-card>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

// Принимаем v-model
const props = defineProps<{
  modelValue: string
}>()
const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

// Локальная копия, чтобы не мутировать props напрямую
const searchLocal = ref(props.modelValue)

// Следим за изменениями локальной копии и эмитим наружу
watch(searchLocal, (val) => {
  emit('update:modelValue', val)
})

// Синхронизируем, если изменили модель сверху
watch(
  () => props.modelValue,
  (newVal) => {
    searchLocal.value = newVal
  },
)
</script>

<style scoped>
/* Дополнительные мелкие правки */
</style>
```
