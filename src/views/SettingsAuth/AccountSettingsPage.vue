<template>
  <!-- <v-btn class="cros" icon="$close" size="25px" variant="text" variant-size="15px"> -->
  <!-- </v-btn> -->
   <NewLayout>
  <div class="bigBox">

    <div class="boxPerson">
      <div class="avatar">

      </div>
      <div>
        <v-card-text class="nameHEADER"> {{ infoProfiles.first_name }} {{ infoProfiles.last_name }} </v-card-text>
        <div class="emailHEADER">
          <v-card-text class="emailHEADER">{{ infoProfiles.email }}</v-card-text>
        </div>

      </div>
      <div>

      </div>

    </div>

    <div class="boxForm">
      <div class="settOf">
        Параметры личных данных пользователя
      </div>


      <!-- <div class="forms form1"> -->
        <v-form @submit.prevent="submitForm">
          <!-- <v-col > -->
          <v-text-field class="inputName form" v-model="infoProfiles.first_name" label="Имя" required
            :rules="[rules.require]"></v-text-field>
          <!-- </v-col>
        <v-col class="font"> -->
          <v-text-field class="inputLastname form" v-model="infoProfiles.last_name" label="Фамилия" required
            :rules="[rules.require]"></v-text-field>
          <!-- </v-col> -->

          <div>
            <v-btn @click="postInfo(infoProfiles)">Cохранить</v-btn>
            <v-btn type="reset">сброс</v-btn>
          </div>
        </v-form>
      <!-- </div> -->
      <div class="settOf">
        Изменение пароля
      </div>


      <div class="forms">
        <v-form>
          <v-col class="font">
            <v-text-field class="inputOldPassword form" v-model="changePasswords.old_password" label="Пароль"
              type="password" required :rules="[rules.require]"></v-text-field>
          </v-col>

          <v-col class="font">
            <v-text-field class="inputNewPassword form" v-model="changePasswords.new_password" label="Новый пароль"
              type="password" required :rules="[rules.require, rules.passwordmin]"></v-text-field>
          </v-col>
          <v-col class="font">
            <v-text-field class="inputNewPassword2 form" v-model="initialState.new_password2"
              label="Подтвердите новый пароль" type="password" required
              :rules="[rules.require, rules.passsame]"></v-text-field>
          </v-col>
          <div>
            <v-btn @click="postPassword(changePasswords)">Cохранить</v-btn>
            <v-btn type="reset">сброс</v-btn>
          </div>
        </v-form>
      </div>

    </div>

    <!-- <v-btn @click="$router.push('/')">На главную</v-btn> -->



    <!-- <AccountSetttingsHeader></AccountSetttingsHeader> -->
  </div>
  </NewLayout>

</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { isEmail } from 'validator'
import type { LoginData } from '@/types/auth.type'
import { accountSettings } from '@/stores/accountSettings'
import { storeToRefs } from 'pinia'
import { getInfo } from '@/composables/auth.request'
import { postInfo } from '@/composables/auth.request'
import type { infoProfile } from '@/types/auth.type'
import type { changePassword } from '@/types/auth.type'
import { postPassword } from '@/composables/auth.request'
import NewLayout from '@/layouts/NewLayout.vue'



const infoProfiles = ref<infoProfile>({
  id: 0,
  email: '',
  first_name: '',
  last_name: ''
})

const changePasswords = ref<changePassword>({
  old_password: '',
  new_password: ''
})




// import AccountSetttingsHeader from './AccountSetttingsHeader.vue'
// import { emitKeypressEvents } from 'readline'

// const call = useApi('')

//   export async function getEmail(): Promise<LoginData> {
//   const response = await call('/profile/', {}, 'GET')
//   return response as LoginData
// }


// const names = async () =>{
//   const response = await getInfo()
//   infoProfiles.value = response
// }

onMounted(async () => {
  try {
    const result = await getInfo()
    infoProfiles.value = result
  } catch (error) {
    console.error(error)
  }
})

const accSet = accountSettings()

const { userData, myEmail } = storeToRefs(accSet)
const { myName } = storeToRefs(accSet)


const initialState = ref<LoginData>({ ...userData.value })



const rules = {
  require: (u: string) => !!u || 'Поле нужно заполнить',
  email: (u: string) => isEmail(u) || 'Введен неправильный mail',
  passwordmin: (u: string) => u?.length >= 6 || 'Минимальная длина - 6 символов',
  passsame: (u: string) => u === changePasswords.value.new_password || 'Пароли не совпадают',
  // truePassword: (u: string) => u === changePasswords.value.old_password || 'Введен неверный пароль'
}


function sendForm() {
  console.log(initialState.value)

  accSet.setUserData({ ...initialState.value })
}

function submitForm() {
  const formEl = this.$refs.myForm;
  if (!formEl.checkValidity()) {
    formEl.reportValidity();
    return;




  }
}



</script>

<style scoped lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap');


.settOf {
  font-family: 'Roboto';
  font-size: 35px;
  font-weight: 600;
  margin: 50px;
}

.form1 {
  margin-top: 70px;
  border-bottom: 2px solid;
}

.inputName::before {
  content: 'ИМЯ ПОЛЬЗОВАТЕЛЯ';
  margin-top: auto;
  margin-bottom: auto;
  margin-right: 30px;
  font-size: 25px;
  // font-weight: 600;
  // font-family: monospace;
}

.inputName {
  // font-family: monospace;
}

.inputLastname::before {
  content: 'ФАМИЛИЯ ПОЛЬЗОВАТЕЛЯ';
  margin-top: auto;
  margin-bottom: auto;
  margin-right: 30px;
  font-size: 25px;
  // font-weight: 600;
}

.inputOldPassword::before {
  content: 'ПАРОЛЬ ОТ АККАУНТА';
  margin-top: auto;
  margin-bottom: auto;
  margin-right: 30px;
  font-size: 25px;
  // font-weight: 600;
}

.inputNewPassword::before {
  content: 'НОВЫЙ ПАРОЛЬ';
  margin-top: auto;
  margin-bottom: auto;
  margin-right: 30px;
  font-size: 25px;
  // font-weight: 600;
}

.inputNewPassword2::before {
  content: 'ПОВТОРИТЕ НОВЫЙ ПАРОЛЬ';
  margin-top: auto;
  margin-bottom: auto;
  margin-right: 30px;
  font-size: 25px;
  // font-weight: 600;
}

.form {
  height: 50px;
}

/* .font {
  height: 150px;
} */

.v-input {
  height: 120px;
}

.v-field__input {
  height: 40px;
  font-size: 50px;
}

.v-field__overlay {
  font-size: 50px;
}

.bigBox {
  background-color: aliceblue;
  width: 2000px;
  height: 1250px;
  margin: auto;
  margin-top: 90px;
  box-shadow: 15px 15px 30px rgb(214, 214, 214);
  // border-radius: 30px;
  /* display: inline-block; */
  display: flex;
  border-radius: 25px;
  box-shadow: 20px 20px 38px rgb(180, 178, 178);
}

.boxPerson {
  width: 30%;
  height: 100%;
  // border-bottom: 1px solid rgb(174, 174, 174);
  /* padding: 20px; */
  /* position: relative; */
  /* display: flex; */
  // background-color: rgb(212, 120, 120);
  border-top-left-radius: 25px;
  border-bottom-left-radius: 25px;
  border-right: 2px solid black;
  box-shadow: 10px 10px 38px rgb(180, 178, 178);
}

.boxForm {
  /* display: flex; */
  height: 100%;
  width: 70%;
  // background-color: rgb(100, 100, 198);
  border-top-right-radius: 25px;
  border-bottom-right-radius: 25px;
}

.avatar {
  width: 110px;
  height: 110px;
  margin-left: auto;
  margin-right: auto;
  margin-top: 60px;
  margin-left: 30px;
  /* background-image: url(https://i.pinimg.com/736x/27/f3/ae/27f3aed3ecf3a325cd4107b0326722d1.jpg); */
  opacity: 0.9;
  background-size: cover;
  position: relative;
  display: inline-block;
  background-color: antiquewhite;
  border-radius: 50%;
}


.forms {
  height: 30%;
  width: 77%;
  margin-left: auto;
  margin-right: auto;
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
  /* position: absolute; */
  bottom: 0;
  left: 0;
  margin-left: 20px;
  font-family: Roboto;
  font-weight: 600;
  font-size: 45px;
}

.emailHEADER {
  font-family: Monsserrat;
  font-size: 30px;
  color: grey;
  margin-top: -25px;
  margin-left: 20px;
  padding: 0;
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
</style>
