<template>
  <v-footer
    class="text-center d-flex flex-column ga-2 py-4"
    color="primary"
    style="height: auto; padding: 0px"
  >
    <div class="d-flex ga-3">
      <v-btn
        v-for="icon in icons"
        :key="icon"
        :icon="icon"
        density="comfortable"
        variant="text"
      ></v-btn>
    </div>

    <v-divider class="my-2" thickness="2" width="50"></v-divider>

    <div class="text-caption font-weight-regular opacity-60">
      Пишите! Звоните! С радостью, сломаем ваш проект!
    </div>

    <v-divider></v-divider>

    <div>{{ new Date().getFullYear() }} — <strong>Хацкеры 2.0</strong></div>
  </v-footer>
</template>
<script setup lang="ts">
const icons = ['mdi-telegram', 'mdi-vk', 'mdi-instagram']
</script>
