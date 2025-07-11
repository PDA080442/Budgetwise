<template>
  <v-dialog v-model="dialog" max-width="800">
    <template v-slot:activator="{ props: activatorProps }">
      <v-btn text="О категориях" v-bind="activatorProps" border class="mr-20"></v-btn>
    </template>
    <template v-slot:default="{ isActive }">
      <v-card>
        <v-card-title class="text-black text-center">О категориях</v-card-title>
        <v-card-text>
          <v-list two-line>
            <v-list-item v-for="category in categories" :key="category.id">
              <v-list-item-title>
                {{ category.name }}
              </v-list-item-title>
              <v-list-item-subtitle>
                {{ category.description }}
              </v-list-item-subtitle>
            </v-list-item>
          </v-list>
        </v-card-text>
        <v-card-actions>
          <v-btn text="Закрыть окно" @click="isActive.value = false" />
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>
</template>

<script setup lang="ts">
import { getCategories } from '@/composables/category.request'
import { ref, onMounted } from 'vue'
import type { Category } from '@/types/category.type'

const dialog = ref(false)
const categories = ref<Category[]>([])

onMounted(async () => {
  categories.value = await getCategories()
})
</script>
