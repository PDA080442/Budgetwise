<template>
  <div class="d-flex flex-column fill-height">
  <!-- <Header /> -->
  
  <v-main class="fill-height d-flex align-center justify-center">
    <EntranceForm />
  </v-main>
  </div>
</template>

<script lang="ts" >
import { defineComponent } from 'vue'
import EntranceForm from '@/components/EntranceForm.vue';
import Header from '@/components/Header.vue';

export default defineComponent({
  name: 'EntrancePage',
  components: { 
    EntranceForm, Header
  } 
})

</script>

<style scoped></style>