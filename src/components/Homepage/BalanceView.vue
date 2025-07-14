<template>
  <v-card :height="70" :width="300" elevation="24" border rounded="lg" class="ma-auto">
    <v-card-text> {{}} </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import type { Balance } from '@/types/balance.type'
import { getBalance } from '@/composables/transaction.request'
</script>
