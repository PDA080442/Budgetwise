<!-- src/App.vue -->
<script setup lang="ts">
import { RouterView, RouterLink } from 'vue-router'
</script>

<template>
  <v-app>
    <header>
      <div class="wrapper">
        <nav>
          <RouterLink to="/"></RouterLink>
          <RouterLink to="/about"></RouterLink>
          <RouterLink to="/register"></RouterLink>
        </nav>
      </div>
    </header>
    <v-main>
      <RouterView />
    </v-main>
  </v-app>
</template>

<style scoped>
.wrapper {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
}
nav a {
  margin-left: 16px;
  text-decoration: none;
  color: inherit;
}
</style>
