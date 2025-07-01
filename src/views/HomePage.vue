<template>
  <v-container>
    <v-btn @click="finance">Страница финансов</v-btn>
    <LogoutButton />
  </v-container>
</template>

<script lang="ts" setup>
import LogoutButton from '@/components/LogoutButton.vue'
import router from '@/router'

const finance = () => {
  router.push({ path: '/finance' })
}
</script>

<style scoped>
/* Стили для компонента */
h1 {
  color: blue;
}
</style>
