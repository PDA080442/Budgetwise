<template>
  <div class="bigBox">
    <div class="person">
      <div class="avatar">
        <img src="https://i.pinimg.com/736x/27/f3/ae/27f3aed3ecf3a325cd4107b0326722d1.jpg" alt="Original"
          class="original">
        <img src="@/assets/img/header/add_a_photo_42dp_000000.png" alt="Hover" class="hover">
      </div>
      <!-- <div class="avatarIcon"> -->

      <!-- </div> -->
      <div>
        <v-card-text class="nameHEADER">{{ myName }}</v-card-text>
        <div class="emailHEADER">
          <v-card-text >{{ myEmail }}</v-card-text>
          <!-- {{ initialState.email }} -->
        </div>
      </div>
      <div>

      </div>
      <v-btn class="cros" icon="$close" size="25px" variant="text" variant-size="15px">
      </v-btn>
    </div>

    <div>

      <!-- {{ initialState }} -->


      <v-form  @submit.prevent="submitForm">
        <v-col class="font">
          <v-text-field v-model="initialState.name" label="Имя" required
          :rules="[rules.require]"></v-text-field>
        </v-col>
        <v-col class="font">
          <v-text-field v-model="initialState.lastname" label="Фамилия" required
          :rules="[rules.require]"></v-text-field>
        </v-col>
        <v-col class="font">
          <v-text-field v-model="initialState.email" label="Email" required
          :rules="[rules.require, rules.email]"></v-text-field>
        </v-col>

        <v-col class="font">
          <v-text-field v-model="initialState.password" label="Пароль" type="password" required
            :rules="[rules.require, rules.passwordmin]"></v-text-field>
        </v-col>

        <v-col class="font">
          <v-text-field v-model="initialState.password2" label="Подтвердите пароль" type="password" required
            :rules="[rules.require, rules.passsame]"></v-text-field>
        </v-col>

        <div>
          <v-btn type="submitForm">Cохранить</v-btn>
          <v-btn type="reset">сброс</v-btn>
        </div>
      </v-form>
    </div>

    <!-- <v-btn @click="$router.push('/')">На главную</v-btn> -->

    <!-- <AccountSetttingsHeader></AccountSetttingsHeader> -->
  </div>

</template>

<script setup lang="ts">
import { ref } from 'vue'
import { isEmail } from 'validator'
import type { LoginData } from '@/types/auth.type'

import { accountSettings } from '@/stores/accountSettings'
import { storeToRefs } from 'pinia'
// import AccountSetttingsHeader from './AccountSetttingsHeader.vue'
// import { emitKeypressEvents } from 'readline'

  export async function getEmail(): Promise<LoginData> {
  const response = await call('/profile/', {}, 'GET')
  return response as LoginData
}

const accSet = accountSettings()
const { userData, myEmail } = storeToRefs(accSet)
const { myName } = storeToRefs(accSet)


const initialState = ref<LoginData>({...userData.value})



const rules = {
  require: (u: string) => !!u || 'Поле нужно заполнить',
  email: (u: string) => isEmail(u) || 'Введен неправильный mail',
  passwordmin: (u: string) => u?.length >= 6 || 'Минимальная длина - 6 символов',
  passsame: (u: string) => u === initialState.value.password || 'Пароли не совпадают',
}


// function sendForm() {
//   console.log(initialState.value)

//   accSet.setUserData({...initialState.value})
// }

function submitForm() {
      const formEl = this.$refs.myForm;
      if (!formEl.checkValidity()) {
        formEl.reportValidity();
        return;




      }}



</script>

<style scoped>
.bigBox {
  background-color: aliceblue;
  width: 500px;
  height: 850px;
  margin: auto;
  margin-top: 90px;
  box-shadow: 15px 15px 30px rgb(214, 214, 214);
  border-radius: 30px;
}

.person {
  width: 100%;
  min-height: 200px;
  border-bottom: 1px solid rgb(174, 174, 174);
  padding: 20px;
  position: relative;
  display: flex;
}

.avatar {
  width: 70px;
  height: 70px;
  margin-left: auto;
  margin-right: auto;
  margin-top: 20px;
  /* background-image: url(https://i.pinimg.com/736x/27/f3/ae/27f3aed3ecf3a325cd4107b0326722d1.jpg); */
  opacity: 0.9;
  background-size: cover;
  position: relative;
  display: inline-block;
}

/* .avatarIcon{
  font-weight: 100%;
  height: 100%;
  border-radius: 50%;
} */
/* .avatarIcon:hover {background-color: red;
  background-image: url(https://ru.pinterest.com/pin/203436108163899364/);
  opacity: 0.9;
} */

.nameHEADER {
  position: absolute;
  bottom: 0;
  left: 0;
  margin: 0 0 13px 15px;
  font-family: Monsserrat;
  font-weight: 600;
  font-size: 23px;
}


.v-btn::before {
  font-size: 10px;
  width: 10px;
  height: 10px;
}

.v-field__outline {
  --v-field-border-width: 1px;
  --v-field-border-opacity: 0.38;
  align-items: stretch;
  contain: layout;
  display: flex;
  height: 100%;
  left: 0;
  pointer-events: none;
  position: absolute;
  right: 0;
  width: 100%;
}

.cros {
  font-size: 13px;
  margin-left: -25px;
}

.button {
  font-family: Monsserrat;
  min-width: 110px;
}

.boxButton {
  margin-left: 25px;
}

.font {
  font-family: Monsserrat;

}

.original {
  height: 100%;
  border-radius: 50%;
  border-radius: 50%;
  border: 1px solid;
}

.hover {
  position: absolute;
  top: 0;
  left: 0;
  opacity: 0;
  transition: opacity 0.3s ease;
  height: 46%;
  /* border-radius: 50%; */
  text-align: center;
  align-content: center;
  margin: 19px;
}

.avatar:hover .hover {
  opacity: 1;
  opacity: 0.6;
}

.emailHEADER {
  position: absolute;
  bottom: 0;
  left: 0;
  margin: 0px 0 0px 17px;
  font-family: Monsserrat;
  font-weight: 400;
  font-size: 15px;
  color: rgb(142, 142, 142);
}
</style>
