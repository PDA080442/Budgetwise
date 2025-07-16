<template>
  <v-app style="height: 100vh; display: flex">
    <v-navigation-drawer
      app
      permanent
      :rail="true"
      expand-on-hover
      width="280"
      rail-width="55"
      class="elevation-2"
    >
      <v-list>
        <v-list-item
          prepend-avatar="https://randomuser.me/api/portraits/men/85.jpg"
          title="John Leider"
          class="sticky-section"
        />
      </v-list>

      <v-divider class="sticky-section" />

      <v-list density="compact" nav class="menu-list sticky-section">
        <v-list-item
          v-for="item in menuItems"
          :key="item.title"
          :prepend-icon="item.icon"
          :title="item.title"
          :to="item.routeName"
          class="nav-item"
        />
      </v-list>
    </v-navigation-drawer>

    <div class="app-content-wrapper">
      <v-app-bar app color="primary" dark class="sticky-section">
        <v-toolbar-title>
          <v-btn prepend-icon="mdi-home" @click="homepage" class="toolbar-text">BudgetWise</v-btn>
        </v-toolbar-title>
        <v-spacer />

        <!-- Account Menu -->
        <v-menu offset-y>
          <template v-slot:activator="{ props }">
            <v-btn icon v-bind="props">
              <v-icon>mdi-account-circle</v-icon>
            </v-btn>
          </template>
          <v-list>
            <v-list-item @click="goToProfile">
              <v-list-item-title>Настройки профиля</v-list-item-title>
            </v-list-item>
            <v-list-item @click="logout">
              <v-list-item-title>Выйти из аккаунта</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-app-bar>

      <v-main class="main-scrollable">
        <v-container fluid class="d-flex justify-center pa-4">
          <div class="content-wrapper">
            <slot />
          </div>
        </v-container>

        <v-footer padless>
          <v-col class="text-center footer-text" cols="12">
            © {{ new Date().getFullYear() }} Финучет
          </v-col>
        </v-footer>
      </v-main>
    </div>
  </v-app>
</template>

<script setup lang="ts">
import { logoutReq } from '@/composables/auth.request'
import router from '@/router'
import axios from 'axios'

const homepage = () => {
  router.push('/')
}

const goToProfile = () => {
  router.push('/profile')
}

const logout = async () => {
  const refreshToken = localStorage.getItem('refreshToken')
  const accessToken = localStorage.getItem('accessToken')
  if (refreshToken && accessToken) {
    await logoutReq(refreshToken, accessToken)
    // localStorage.removeItem('refreshToken')
    // localStorage.removeItem('accessToken')
    // delete axios.defaults.headers.common['Authorization']
    // router.push({ path: '/entrance' })
    // console.log(localStorage)
  }
}

const menuItems = [
  { title: 'Главная', icon: 'mdi-home', routeName: '/' },
  { title: 'Финансы', icon: 'mdi-currency-usd', routeName: '/finance' },
  { title: 'О нас', icon: 'mdi-information', routeName: '/about' },
  { title: 'Тест', icon: 'mdi-flask', routeName: '/test' },
]
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap');

html,
body,
#app {
  height: 100%;
  margin: 0;
}

.v-application {
  font-family: 'Roboto', sans-serif;
  height: 100%;
}

.app-content-wrapper {
  flex: 1;
  display: flex;
  flex-direction: column;
  height: 100%;
}

.sticky-section {
  position: sticky;
  top: 0;
  z-index: 1;
  background: white;
}

.menu-list {
  flex: 1;
  overflow-y: auto;
}

.main-scrollable {
  flex: 1 1 auto;
  overflow-y: auto;
}

.toolbar-text {
  font-size: 20px;
  font-weight: 700;
  letter-spacing: 1px;
}

.content-wrapper {
  width: 100%;
  max-width: 1920px;
}

.nav-item {
  border-radius: 8px;
  transition: background-color 0.2s;
}
.nav-item:hover,
.nav-item.v-list-item--active {
  background-color: #cae9ff;
}

.footer-text {
  font-size: 14px;
  color: rgba(0, 0, 0, 0.6);
}
</style>
