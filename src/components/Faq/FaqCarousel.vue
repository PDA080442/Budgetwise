<template>
  <v-carousel height="400" show-arrows="hover" cycle hide-delimiter-background>
    <v-carousel-item v-for="(slide, i) in slides" :key="i">
      <v-sheet :color="colors[i]" height="100%">
        <div class="d-flex fill-height justify-center align-center">
          <div class="text-h1">
            {{ slide }}
          </div>
        </div>
      </v-sheet>
    </v-carousel-item>
  </v-carousel>
</template>

<script setup lang="ts">
const colors = ['indigo', 'warning', 'pink darken-2', 'red lighten-1', 'deep-purple accent-4']
const slides = ['Тут', 'Могла', 'Быть', 'Ваша', 'Реклама)))']
</script>
