<template>
  <v-card flat class="pa-0 flex-grow-1 search-card" elevation="0">
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

const props = defineProps<{ modelValue: string }>()
const emit = defineEmits<{ (e: 'update:modelValue', value: string): void }>()

const searchLocal = ref(props.modelValue)

watch(searchLocal, (val) => emit('update:modelValue', val))
watch(
  () => props.modelValue,
  (val) => (searchLocal.value = val),
)
</script>

<style scoped>
.search-card {
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(4px);
}
</style>
