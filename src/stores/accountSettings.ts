import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import type { LoginData } from '@/types/auth.type'


export const accountSettings = defineStore('user', () => {

  const userData = ref<LoginData>({
    email: 'x@mail.ru',
    password: '123456',
    name: 'oleg',
    lastname: 'kacherga',
    password2: '123456'
  })


  const myName = computed(() => {
    return `${userData.value.name} ${userData.value.lastname}`
  })

  const myEmail = computed(() => {
    return `${userData.value.email}`
  })


  function setUserData(payload: LoginData) {
    userData.value = payload
  }

  

  // function getUser() {
  //   send request to back
  //   get user

  //   setUserData
  // }




  return {
    setUserData,
    userData,
    myEmail,
    myName,
  }
})

