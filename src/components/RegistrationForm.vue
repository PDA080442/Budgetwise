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
            v-model="formdata.passwordConfirm"
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
import { regdata } from '@/components/usePromise'
import type { FormData, AuthTokens } from '@/components/usePromise'

const form = ref()
const valid = ref(form)
const router = useRouter()
// const value = ref(0)

const formdata = reactive<FormData>({
  email: '',
  password: '',
  passwordConfirm: '',
})

// const serverErrors = reactive<{ email?: string; main?: string }>({})

const rules = {
  require: (u: string) => !!u || 'Поле нужно заполнить',
  email: (u: string) => isEmail(u) || 'Введен неправильный mail',
  passwordmin: (u: string) => u?.length >= 6 || 'Минимальная длина - 6 символов',
  passsame: (u: string) => u === formdata.password || 'Пароли не совпадают',
}

// function a() {
//   value.value += 1
// }

// const submit = async () => {
//   // serverErrors.main = undefined
//   // serverErrors.email = undefined

//   if (!form.value.validate()) return
//   try {
//     await axios.post(
//       'api/items/', // Тим даст ссылку
//       {
//         email: formdata.email,
//         password: formdata.password,
//         passwordConfirm: formdata.passwordConfirm,
//       },
//       {
//         headers: { 'Content-Type': 'application/json' },
//       },
//     )
//     alert('Запрос отправлен')
//     // router.push({ path: '/login' })
//   } catch (err) {
//     alert('Ошибка:' + err)
//   }
// }

const submit = async () => {
  if (!form.value.validate()) return
  try {
    const tokens: AuthTokens = await regdata(formdata)
    localStorage.setItem('accessToken', tokens.accessToken)
    localStorage.setItem('refreshToken', tokens.refreshToken)
    alert('Вы зарегистрировались. Токены хранятся')
    console.log(localStorage)
    alert('Запрос отправлен')
  } catch (err) {
    alert('Ошибка' + err)
  }
}

const login = () => {
  router.push({ path: '/login' })
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
