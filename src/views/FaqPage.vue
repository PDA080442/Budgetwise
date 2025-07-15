<template>
  <MainLayout></MainLayout>
  <FaqLifeHack></FaqLifeHack>
    
  
</template>

<script lang="ts" setup>
import MainLayout from '@/layouts/MainLayout.vue'
import FaqLifeHack from '@/components/Faq/FaqLifeHack.vue'

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
