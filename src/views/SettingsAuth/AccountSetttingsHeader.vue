<template>
  <div>
    {{ userData }}
  </div>
</template>

<script setup lang="ts">
import { accountSettings } from '@/stores/accountSettings';
import { storeToRefs } from 'pinia';



const accountSettingsStore = accountSettings()

const { userData } = storeToRefs(accountSettingsStore)


</script>

<style scoped></style>
