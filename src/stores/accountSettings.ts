import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import type { LoginData } from '@/types/auth.type'
import type { infoProfile } from '@/types/auth.type'

export const accountSettings = defineStore('user', () => {
  const userData = ref<infoProfile>({
    email: 'x@mail.ru',
    name: 'oleg',
    lastname: 'kacherga',
  })

  const infoProfiles = ref<infoProfile>({
    id: 0,
    email: '',
    first_name: '',
    last_name: '',
  })

  const myName = computed(() => {
    return `${infoProfiles.value.first_name} ${infoProfiles.value.last_name}`
  })

  const myEmail = computed(() => {
    return `${userData.value.email}`
  })

  function setUserData(payload: LoginData) {
    infoProfiles.value = payload
  }

  return {
    userData,
    setUserData,
    myEmail,
    myName,
    infoProfiles,
  }
})
