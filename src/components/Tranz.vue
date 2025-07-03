<template>
  <div class="pa-4 text-center">
    <v-dialog v-model="dialog" max-width="600">
      <template v-slot:activator="{ props: activatorProps }">
        <v-btn class="text-none font-weight-regular" prepend-icon="mdi-pencil" text="Добавить транзакцию"
          variant="tonal" v-bind="activatorProps"></v-btn>
      </template>

      <v-card prepend-icon="mdi-pencil" title="Добавление транзакции">
        <v-container>
          <v-row>
            <v-col cols="12" md="6" sm="6">
              <v-text-field v-model="amount" label="Сумма*" :rules="[rules.require, rules.negative]"
                required></v-text-field>
            </v-col>


            <v-col cols="12" md="6" sm="6">
              <v-date-input
                v-model="date"
                :display-format="formatDate"
                label="Дата*"
                required
                clearable
                prepend-icon=""
              ></v-date-input>
              <!-- <v-date-input 

              :display-format="format" 
              @update:model-value="(e) => inputDate(e)" 
              :value="date" 
              label="Дата*" 
              required 
              clearable
              prepend-icon="" ></v-date-input>

            >-->
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
              <v-select v-model="operationType" :items="operationTypes" item-title="title" item-value="value"
                label="Тип операции*" :rules="[rules.require]" required></v-select>
            </v-col>
          </v-row>

          <small class="text-caption text-medium-emphasis">*Обязательное поле</small>
        </v-container>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn text="Закрыть" variant="plain" @click="dialog = false"></v-btn>

          <v-btn color="primary" text="Сохранить" variant="tonal" @click="saveTransaction"
            :disabled="!formValid"></v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>


<script lang="ts">
import { defineComponent, ref, computed } from 'vue';

export default defineComponent({
  name: 'Tranz',
  props: {
    onSave: {
      type: Function,
      required: true
    }
  },
  setup(props) {
    const dialog = ref(false);
    const amount = ref('');
    const category = ref('');
    const operationType = ref('');
    const date = ref<Date | null>(null);

    const operationTypes = [
      { title: 'Доход', value: 'income' },
      { title: 'Расход', value: 'expense' }
    ];

    const rules = {
      require: (u: string) => !!u || "Обязательное поле",
      negative: (u: string) => {
        const value = parseFloat(u);
        return (!isNaN(value) && value > 0) || "Сумма должна быть положительной";
      }
    };

    const formatDate = (date: Date | null): string => {
      if (!date) return '';
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    };

    const formValid = computed(() => {
      return (
        rules.require(amount.value) === true &&
        date.value !== null &&
        rules.require(category.value) === true &&
        rules.require(operationType.value) === true &&
        rules.negative(amount.value) === true
      );
    });

    const saveTransaction = () => {
      if (!formValid.value) {
        alert('Пожалуйста, заполните все поля корректно');
        return;
      }

      props.onSave({
        amount: amount.value,
        date: formatDate(date.value),
        category: category.value,
        operationType: operationType.value
      });

      // Сброс формы
      amount.value = '';
      date.value = null;
      category.value = '';
      operationType.value = '';
      dialog.value = false;
    };

    return {
      dialog,
      date,
      amount,
      category,
      operationType,
      operationTypes,
      rules,
      formValid,
      formatDate,
      saveTransaction
    };
  }
});
</script>