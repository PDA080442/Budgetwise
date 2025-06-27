<template>
  <v-container class="d-flex justify-center">
    <v-card class="pa-6">
      <v-card-title class="titleform">Регистрация</v-card-title>

      <v-card-text>
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-text-field
            v-model="formdata.email"
            label="Email"
            :rules="[rules.require, rules.email]"
            required
            hide-details="auto"
          />

          <v-text-field
            label="Пароль"
            type="password"
            v-model="formdata.password"
            :rules="[rules.require, rules.passwordmin]"
            required
          />

          <v-text-field
            label="Подтвердите пароль"
            type="password"
            v-model="formdata.password2"
            :rules="[rules.require, rules.passsame]"
            required
          />
        </v-form>
      </v-card-text>

      <v-divider />
      <v-card-actions>
        <v-spacer />
        <v-btn class="reg__btn d-flex justify-center" @click="submit">Зарегистрироваться </v-btn>
      </v-card-actions>
      <v-card-text clas>Есть аккаунт?</v-card-text>
      <v-btn class="log__btn d-flex justify-center" @click="login">Войти в аккаунт</v-btn>
    </v-card>
  </v-container>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { isEmail } from 'validator'
import { regdata } from '@/composables/usePromise'
import type { FormData } from '@/composables/usePromise'

const form = ref()
const valid = ref(form)
const router = useRouter()
// const value = ref(0)

const formdata = reactive<FormData>({
  email: '',
  password: '',
  password2: '',
})

const rules = {
  require: (u: string) => !!u || 'Поле нужно заполнить',
  email: (u: string) => isEmail(u) || 'Введен неправильный mail',
  passwordmin: (u: string) => u?.length >= 6 || 'Минимальная длина - 6 символов',
  passsame: (u: string) => u === formdata.password || 'Пароли не совпадают',
}

const submit = async () => {
  if (!form.value.validate()) return
  try {
    await regdata(formdata)

    router.push({ path: '/entrance' })
  } catch (err) {
    console.error(err)
  }
}

const login = () => {
  router.push({ path: '/entrance' })
}
</script>

<style scoped lang="scss">
.v-card {
  border-radius: 25px;
  font-family: 'Montserrat', sans-serif;
}

.titleform {
  text-align: center;
  font-size: 25px;
  font-weight: 300;
  color: #0171bc;
}

.reg__btn {
  color: #ffffff;
  background-color: #0171bc;
  font-size: 15px;
}

.log__btn {
  color: #ffffff;
  background-color: #0171bc;
  opacity: 1;
  font-size: 15px;
  margin-left: 15px;
}

// .v-btn:hover {
//   color: #ffffff;
//   background-color: #0171bc;
// }
</style>
