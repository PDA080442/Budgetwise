<!-- <template>
  <v-dialog v-model="dialog" max-width="1260">
    <template v-slot:activator="{ props: activatorProps }">
      <v-btn
        text="О категориях"
        v-bind="activatorProps"
        border
        class="mr-20"
        color="primary"
      ></v-btn>
    </template>
    <template v-slot:default="{ isActive }">
      <v-card class="pa-5" rounded="lg">
        <v-card-title class="d-flex justify-space-between text-black">
          <span>О категориях</span>
          <v-btn icon @click="dialog = isActive.value = false"> <v-icon>mdi-close</v-icon> </v-btn>
        </v-card-title>
        <v-card-text>
          <v-list two-line>
            <v-list-item v-for="category in categories" :key="category.id" border>
              <v-list-item-title class="font-weight-black">
                {{ category.name }}
              </v-list-item-title>
              <v-card-text class="font-weight-medium">
                {{ category.description }}
              </v-card-text>
            </v-list-item>
          </v-list>
        </v-card-text>
        <v-card-actions> </v-card-actions>
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
</script> -->

<template>
  <v-dialog v-model="dialog" max-width="1260" transition="dialog-transition">
    <template #activator="{ props }">
      <v-btn color="primary" text border class="mr-20" v-bind="props"> О категориях </v-btn>
    </template>

    <v-card class="pa-5 elevation-10 category-card" rounded="lg">
      <v-card-title class="d-flex justify-space-between align-center">
        <span class="headline text-primary font-weight-bold">О категориях</span>
        <v-btn icon @click="dialog = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>

      <v-card-text>
        <v-list two-line>
          <v-list-item v-for="category in categories" :key="category.id" class="category-item">
            <div class="color-label"></div>
            <v-list-item-content>
              <v-list-item-title class="font-weight-bold mb-1">
                {{ category.name }}
              </v-list-item-title>
              <v-list-item-subtitle class="body-1 text-black">
                {{ category.description }}
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { getCategories } from '@/composables/category.request'
import type { Category } from '@/types/category.type'

const dialog = ref(false)
const categories = ref<Category[]>([])

onMounted(async () => {
  categories.value = await getCategories()
})
</script>

<style scoped>
/* Акцентная палитра: Primary border */
.category-card {
  border: 2px solid var(--v-primary-base);
}

/* Карточный дизайн и интервалы */
.category-item {
  display: flex;
  align-items: flex-start;
  padding: 16px;
  margin-bottom: 16px;
  border-radius: 8px;
  transition:
    transform 0.2s,
    background-color 0.2s;
}

/* Анимация открытия/закрытия диалога */
.dialog-transition-enter-active,
.dialog-transition-leave-active {
  transition: all 0.3s ease;
}

.dialog-transition-enter-from,
.dialog-transition-leave-to {
  opacity: 0;
  transform: scale(0.9);
}

.dialog-transition-enter-to,
.dialog-transition-leave-from {
  opacity: 1;
  transform: scale(1);
}
</style>
