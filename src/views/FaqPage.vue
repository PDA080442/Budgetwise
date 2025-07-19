<template>
  <NewLayout>
    <FaqLifeHack></FaqLifeHack>
  </NewLayout>
</template>

<script lang="ts" setup>
import MainLayout from '@/layouts/MainLayout.vue'
import FaqLifeHack from '@/components/Faq/FaqLifeHack.vue'
import NewLayout from '@/layouts/NewLayout.vue'
</script>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
