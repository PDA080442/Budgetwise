<template>
  <!-- <div class="about">
    <h1>This is an about page</h1>
  </div> -->
  <Header />
  <div class="pa-4 text-center">
    <Tranz/>

  </div>
  
</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}

.nav {
  align-items: center;
}
</style>

<script lang="ts">
import { defineComponent } from 'vue'
import Header from '@/components/Header.vue';
import Tranz from '@/components/Tranz.vue';

export default defineComponent({
  name: 'FinancePage',
  components: { 
    Tranz, Header
  } 
})
</script>
