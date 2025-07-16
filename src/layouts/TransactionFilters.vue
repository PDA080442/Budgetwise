// src/components/Finance/FilterSidebar.vue
<template>
  <v-navigation-drawer v-model="visible" right temporary>
    <v-toolbar flat>
      <v-toolbar-title>Фильтры</v-toolbar-title>
      <v-spacer />
      <v-btn icon @click="emit('update:visible', false)">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-toolbar>
    <v-divider />
    <v-form>
      <v-text-field
        v-model="search"
        clearable
        label="Поиск"
        prepend-inner-icon="mdi-magnify"
        variant="outlined"
        hide-details
        rounded="lg"
        class="mx-4"
      />
      <v-text-field v-model="dateAfter" label="Начало" type="date" clearable class="mx-4" />
      <v-text-field v-model="dateBefore" label="Конец" type="date" clearable class="mx-4" />
      <v-select
        v-model="selectCategories"
        label="Выберите категории"
        :items="categories"
        item-title="name"
        item-value="id"
        multiple
        clearable
        class="mx-4"
      />
      <v-select
        v-model="selectTypes"
        :items="types"
        item-title="name"
        item-value="id"
        label="Доход/Расход"
        clearable
        class="mx-4"
      />
    </v-form>
  </v-navigation-drawer>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'

const props = defineProps({
  visible: Boolean,
  search: String,
  dateAfter: String,
  dateBefore: String,
  selectCategories: Array,
  selectTypes: [Number, null],
  categories: Array,
  types: Array,
})

const emit = defineEmits([
  'update:visible',
  'update:search',
  'update:dateAfter',
  'update:dateBefore',
  'update:selectCategories',
  'update:selectTypes',
])
</script>

<template v-slot:top>
  <template>
    <v-container>
      <div class="d-flex justify-center mb-10">
        <PopupCategory />
      </div>
      <v-card border rounded="lg">
        <v-data-table ...>
          <template v-slot:top>
            <v-toolbar class="d-flex">
              <v-toolbar-title style="max-width: 300px"> Транзакции </v-toolbar-title>
              <v-spacer />
              <AddCheck />
              <v-spacer />
              <v-btn @click="addTransaction" border>
                <v-icon size="large">mdi-plus</v-icon>
              </v-btn>
              <!-- Кнопка открытия сайдбара фильтров -->
              <v-btn icon @click="showFilters = true">
                <v-icon>mdi-filter-variant</v-icon>
              </v-btn>
            </v-toolbar>

            <!-- Удаляем здесь существующие блоки фильтров и <v-divider> -->

            <!-- Подключаем новый компонент сайдбара -->
            <FilterSidebar
              v-model:visible="showFilters"
              v-model:search="search"
              v-model:dateAfter="dateAfter"
              v-model:dateBefore="dateBefore"
              v-model:selectCategories="selectCategories"
              v-model:selectTypes="selectTypes"
              :categories="categories"
              :types="types"
            />
          </template>
          ...
        </v-data-table>
      </v-card>
      <!-- остальной код без изменений -->
    </v-container>
  </template>

  <script setup lang="ts">
    import { ref, defineProps, watch, onMounted } from 'vue'
    // ... другие импорты
    import FilterSidebar from '@/components/Finance/FilterSidebar.vue'

    const showFilters = ref(false)
    // остальные refs: search, dateAfter, dateBefore, selectCategories, selectTypes

    // остальная логика без изменений
  </script>
</template>
