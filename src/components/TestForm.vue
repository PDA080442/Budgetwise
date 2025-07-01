<!-- <template>
  <v-container class="d-flex justify-center">
    <v-card class="pa-6" max-width="500">
      <v-card-title class="text-h5">Тестовый запрос</v-card-title>

      <v-card-text>
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-text-field v-model="formdata.name" :rules="[rules.required]" label="Имя" required />

          <v-text-field
            v-model="formdata.description"
            :rules="[rules.required]"
            label="Описание"
            required
          />
        </v-form>
      </v-card-text>

      <v-divider />

      <v-card-actions>
        <v-spacer />
        <v-btn @click="submit"> Отправить запрос </v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue'
import { testdata } from '@/components/usePromise'
import type { FormData } from '@/components/usePromise'

const form = ref()
const valid = ref(false)

const formdata = reactive<FormData>({
  name: '',
  description: '',
})

const rules = {
  required: (v: string) => !!v || 'Поле обязательно.',
}

const submit = async () => {
  if (!form.value.validate()) return

  try {
    await testdata(formdata)
    alert('Запрос отправлен')
  } catch (err) {
    alert('Ошибка' + err)
  }
}
</script> -->
