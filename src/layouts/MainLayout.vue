<template>
  <Header />
  <main>
    <slot name="content"></slot>
  </main>
  <MainFooter />
</template>

<script lang="ts" setup>
import Header from '@/layouts/components/MainHeader.vue'
import MainFooter from './components/MainFooter.vue'
</script>
