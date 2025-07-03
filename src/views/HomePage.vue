<template>
  <MainLayout>
    <template #content>
      <v-container>
        <v-btn @click="finance">Страница финансов</v-btn>
        <LogoutButton />
      </v-container>
    </template>
  </MainLayout>

</template>

<script lang="ts" setup>
import LogoutButton from '@/components/LogoutButton.vue'
import MainLayout from '@/layouts/MainLayout.vue'
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
