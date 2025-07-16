<template>
  <v-app>
    <!-- Sidebar Navigation -->
    <v-navigation-drawer v-model="drawer" :rail="rail" permanent @click="rail = false">
      <v-list>
        <v-list-item
          prepend-avatar="https://randomuser.me/api/portraits/men/85.jpg"
          title="John Leider"
        >
          <template v-slot:append>
            <v-btn icon="mdi-chevron-left" variant="text" @click.stop="rail = !rail"></v-btn>
          </template>
        </v-list-item>
      </v-list>

      <v-divider></v-divider>

      <v-list density="compact" nav>

        <template v-for="item in menuItems" :key="item.title">
          <v-list-item :prepend-icon="item.icon" :title="item.title" :value="item.routeName" :to="item.routeName"></v-list-item>
        </template>


      </v-list>
    </v-navigation-drawer>

    <!-- Top App Bar -->
    <v-app-bar app clipped-left color="primary" dark>
      <v-toolbar-title class="toolbar-text">BudgetWise</v-toolbar-title>
      <v-spacer />
      <v-btn icon>
        <v-icon>mdi-bell</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon>mdi-account-circle</v-icon>
      </v-btn>
    </v-app-bar>

    <!-- Main Content -->
    <v-main>
      <!-- Centered content container with max-width 1920px -->
      <v-container fluid class="d-flex justify-center pa-4">
        <div class="content-wrapper">
          <slot />
        </div>
      </v-container>
    </v-main>

    <!-- Footer -->
    <v-footer app padless>
      <v-col class="text-center footer-text" cols="12">
        © {{ new Date().getFullYear() }} Финучет
      </v-col>
    </v-footer>
  </v-app>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const drawer = ref(true)
const rail = ref(true)
const router = useRouter()

// Menu items
const menuItems = [
  { title: 'Home', icon: 'mdi-home', routeName: '/' },
  { title: 'Finance', icon: 'mdi-currency-usd', routeName: '/finance' },
  { title: 'About', icon: 'mdi-information', routeName: '/about' },
  { title: 'Test', icon: 'mdi-flask', routeName: '/test' },
]

function navigate(name) {
  drawer.value = false
  router.push({ name })
}

function goHome() {
  drawer.value = false
  router.push({ name: 'Home' })
}
</script>

<style scoped>
/* Global font import */
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap');

.v-application {
  font-family: 'Roboto', sans-serif;
}

/* Logo spacing */
.logo-item {
  display: flex;
  justify-content: center;
}

/* Navigation items styling */
.nav-item {
  border-radius: 8px;
  transition: background-color 0.2s;
}
.nav-item:hover {
  background-color: rgba(0, 0, 0, 0.04);
}

.nav-icon {
  font-size: 24px;
}

.nav-text {
  font-size: 16px;
  font-weight: 500;
  letter-spacing: 0.5px;
}

/* Toolbar title styling */
.toolbar-text {
  font-size: 20px;
  font-weight: 700;
  letter-spacing: 1px;
}

/* Content wrapper for max width */
.content-wrapper {
  width: 100%;
  max-width: 1920px;
}

/* Footer text styling */
.footer-text {
  font-size: 14px;
  color: rgba(0, 0, 0, 0.6);
}
</style>
