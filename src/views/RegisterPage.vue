<!-- <template>
  <v-main class="fill-height d-flex align-center justify-center">
    <RegistrationForm />
  </v-main>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import RegistrationForm from '@/components/RegistrationForm.vue'

export default defineComponent({
  name: 'RegisterPage',
  components: { RegistrationForm },
})
</script>

<style scoped></style> -->

<template>
  <v-main class="fill-height d-flex align-center justify-center">
    <TestForm />
  </v-main>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
// Импортируем новый компонент формы
import TestForm from '@/components/TestForm.vue'

export default defineComponent({
  name: 'RegisterPage',
  components: { TestForm },
})
</script>

<style scoped></style>
