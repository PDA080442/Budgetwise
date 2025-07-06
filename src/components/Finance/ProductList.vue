<template>
  <div v-if="products.length">
    <v-table density="compact">
      <thead class="bg-surface-light">
        <tr>
          <th>Наименование</th>
          <th>Тип продукта</th>
          <th>Кол-во ед. продукта</th>
          <th>Цена за ед. продукта</th>
          <th>Общая сумма</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(prod, idx) in products" :key="idx">
          <td>{{ prod.name }}</td>
          <td>{{ prod.Product_type }}</td>
          <td>{{ prod.Quantity }}</td>
          <td>{{ prod.Price }}</td>
          <td>{{ prod.Sum }}</td>
        </tr>
      </tbody>
    </v-table>
  </div>
  <div v-else class="pa-4">В транзакции не добавлены товары.</div>
</template>

<script setup lang="ts">
import type { Products } from '@/types/transaction.type'
defineProps<{ products: Products[] }>()
</script>
