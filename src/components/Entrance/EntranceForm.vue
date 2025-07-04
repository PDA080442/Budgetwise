<template>
  <v-container class="d-flex justify-center">
    <v-card class="pa-6" width="400">
      <v-card-title class="titleform">Вход</v-card-title>

      <v-alert v-if="serverErrors.main" type="error">
        {{ serverErrors?.main }}
      </v-alert>

      <v-card-text>
        <v-form ref="form" @submit.prevent="submit">
          <v-text-field
            v-model="logindata.email"
            label="Email"
            :rules="[rules.require, rules.email]"
            required
          />

          <v-alert v-if="serverErrors.email" type="error">
            {{ serverErrors.email }}
          </v-alert>

          <v-text-field
            v-model="logindata.password"
            label="Пароль"
            type="password"
            :rules="[rules.require, rules.passwordmin]"
            required
          />
        </v-form>
      </v-card-text>

      <v-divider class="my-2" />

      <v-card-actions class="px-0">
        <v-btn block class="ent__btn" type="submit" @click="submit"> Войти </v-btn>
      </v-card-actions>

      <v-card-text class="coment py-2">Ещё нет аккаунта?</v-card-text>

      <v-card-actions class="px-0">
        <v-btn block class="log__btn" @click="goToRegistration">Регистрация</v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { isEmail } from 'validator'
import axios from 'axios'
import { logdata } from '@/composables/auth.request'
import type { LoginData } from '@/types/auth.type'

const form = ref()
const router = useRouter()

const logindata = reactive<LoginData>({
  email: '',
  password: '',
})

const serverErrors = reactive<{ email?: string; main?: string }>({})

const rules = {
  require: (u: string) => !!u || 'Поле нужно заполнить',
  email: (u: string) => isEmail(u) || 'Введен неправильный mail',
  passwordmin: (u: string) => u?.length >= 6 || 'Минимальная длина - 6 символов',
}

const submit = async () => {
  console.log('submit')

  serverErrors.main = undefined
  serverErrors.email = undefined

  if (!form.value.validate()) return

  try {
    await logdata(logindata)
    router.push({ path: '/' })
  } catch (err) {
    if (axios.isAxiosError(err)) {
      serverErrors.main = err.response?.data?.message || 'Ошибка сервера'
    } else {
      serverErrors.main = 'Неизвестная ошибка'
    }
  }
}

const goToRegistration = () => {
  router.push({ path: '/register' })
}
</script>

<style scoped lang="scss">
.v-card {
  border-radius: 25px;
  font-family: 'Montserrat', sans-serif;
}

.titleform {
  text-align: center;
  font-size: 40px;
  font-weight: 300;
  color: #0171bc;
  padding-bottom: 16px;
}

.ent__btn {
  color: #ffffff;
  background-color: #0171bc;
  opacity: 1;
  font-size: 20px;
  letter-spacing: normal;
}

.log__btn {
  color: #2f9be3;
  opacity: 1;
  font-size: 15px;
  letter-spacing: normal;
}

.coment {
  text-align: center;
  font-size: 14px;
  color: rgba(0, 0, 0, 0.6);
  padding-bottom: 4px;
}

.v-card__actions {
  padding-top: 0;
}
</style>
