<template>
  <v-btn class="logout__btn" @click="logout">Выйти из аккаунта</v-btn>
</template>

<script lang="ts" setup>
import axios from 'axios'
import { useRouter } from 'vue-router'
import { logoutReq } from '@/composables/auth.request'

const router = useRouter()

const logout = async () => {
  const refreshToken = localStorage.getItem('refreshToken')
  if (refreshToken) {
    try {
      await logoutReq(refreshToken)
    } catch {}
  }

  localStorage.removeItem('refreshToken')
  localStorage.removeItem('accessToken')
  delete axios.defaults.headers.common['Authorization']
  router.push({ path: '/entrance' })
  console.log(localStorage)
}
</script>
