<template>
  <v-container>
    <v-card>
      <v-card-title>Список транзакций</v-card-title>
      <v-data-table :headers="headers" :items="transactions">
        <template v-slot:item="props">
          <tr :key="props.item.id">
            <td>{{ props.item.id }}</td>
            <td>{{ props.item.amount }}</td>
            <td>{{ props.item.date }}</td>
            <td>{{ props.item.category }}</td>
            <td>{{ getOperationTypeText(props.item.type) }}</td>
          </tr>
        </template>
      </v-data-table>
    </v-card>
  </v-container>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue'

interface Trans {
  id: number
  amount: number
  date: string
  category: string
  type: string
}

interface TransProps {
  transactions: Trans[]
}

const { transactions } = defineProps<TransProps>()

const getOperationTypeText = (type: string) => {
  return type === 'income' ? 'Доход' : 'Расход'
}

const headers = [
  { title: 'ID', value: 'id' },
  { title: 'Сумма', value: 'amount' },
  { title: 'Дата', value: 'date' },
  { title: 'Категория', value: 'category' },
  { title: 'Тип операции', value: 'type' },
]
// const transactions = [
//   {
//     id: 1,
//     amount: 1000,
//     date: '22.11.2000',
//     category: 'text',
//     type: 'расход',
//   },
// ]
</script>
