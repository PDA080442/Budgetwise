<template>
  <div class="pa-4 text-center">
    <v-dialog v-model="dialog" max-width="600">
      <template v-slot:activator="{ props: activatorProps }">
        <v-btn class="text-none font-weight-regular" prepend-icon="mdi-pencil" text="Добавить транзакцию"
          variant="tonal" v-bind="activatorProps"></v-btn>
      </template>

      <v-card prepend-icon="mdi-pencil" title="Добавление транзакции">
        <v-card-text>
          <v-row dense>
            <v-col cols="12" md="6" sm="6">
              <v-text-field v-model="amount" label="Сумма*" :rules="[rules.require, rules.negative]"
                required></v-text-field>
            </v-col>

            <v-col cols="12" md="6" sm="6">
              <v-text-field v-model="date" hint="Пример: 25.06.2025" label="Дата*"
                :rules="[rules.require, rules.dateFormat]" required></v-text-field>
            </v-col>

            <v-col cols="12" sm="6">
              <v-select v-model="category" :items="[
                'Накопления',
                'Супермаркеты',
                'Маркетплейсы',
                'Такси и каршеринг',
                'Образование',
                'Связь/Интернет',
                'Рестораны',
                'Подписки',
                'Бытовая техника',
                'Аптеки',
                'Хобби и развлечения'
              ]" label="Категория*" :rules="[rules.require]" required></v-select>
            </v-col>

            <v-col cols="12" sm="6">
              <v-select v-model="operationType" :items="['Доход', 'Расход']" label="Тип операции*"
                :rules="[rules.require]" required></v-select>
            </v-col>
          </v-row>

          <small class="text-caption text-medium-emphasis">*Обязательное поле</small>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn text="Закрыть" variant="plain" @click="dialog = false"></v-btn>

          <v-btn color="primary" text="Сохранить" variant="tonal" @click="dialog = false"></v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>


<script lang="ts">
import { defineComponent, ref } from 'vue';
import axios from 'axios';


export default defineComponent({
  name: 'Tranz',
  setup() {
    const dialog = ref(false);

    const date = ref('');
    const amount = ref('');
    const category = ref('');
    const operationType = ref('');

    const rules = {
      require: (u: string) => !!u || "",
      negative: (u: string) => {
        const value = parseFloat(u);
        return value < 0 || "Нельзя отрицательную сумму";
      },
      dateFormat: (u: string) => {
        const datePattern = /^(0[1-9]|[12][0-9]|3[01])\.(0[1-9]|1[0-2])\.(\d{4})$/;
        return datePattern.test(u) || "Неверный формат даты. Пример: 25.06.2025";
      }
    };

    const saveTransaction = async () => {
      try {
        // Получаем токены из localStorage (или другого источника)
        const accessToken = localStorage.getItem('accessToken');
        const refreshToken = localStorage.getItem('refreshToken');

        const response = await axios.post('/api/transactions', {
          amount: parseFloat(amount.value),
          date: date.value,
          category: category.value,
          operationType: operationType.value,
        }, {
          headers: {
            'Authorization': `Bearer ${accessToken}`, // Добавляем access токен
            'X-Refresh-Token': refreshToken // Добавляем refresh токен
          }
        });

        console.log('Transaction saved:', response.data);
        dialog.value = false;
      } catch (error) {
        console.error('Error saving transaction:', error);
      }
    };



    return {
      dialog,
      date,
      amount,
      category,
      operationType,
      rules,
      saveTransaction,
    };
  },
});
</script>