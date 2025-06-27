<template>
  <v-btn class="logout__btn" @click="logout">Выйти из аккаунта</v-btn>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router'
import { logoutReq } from '@/composables/usePromise'

const router = useRouter()

const logout = async () => {
  const refreshToken = localStorage.getItem('refreshToken')
  if (!refreshToken) return router.push({ path: '/login' })

  try {
    await logoutReq(refreshToken)
  } catch (err) {
    alert('Ошибка выхода' + err)
  }

  localStorage.removeItem('refreshToken')
  router.push({ path: '/login' })
}
</script>
