<template>
  <Header />
  <main>
    <slot name="content"></slot>
  </main>
</template>

<script lang="ts" setup>
import Header from '@/layouts/components/Header.vue'
</script>