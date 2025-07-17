<template>
  <v-app style="height: 100vh; display: flex">
    <v-navigation-drawer app permanent :rail="true" expand-on-hover width="280" rail-width="55" class="elevation-2">
      <v-list>
        <v-list-item 
          :title="isAuthenticated ? `${infoProfiles.first_name} ${infoProfiles.last_name}` || 'Пользователь' : 'Гость'"
          :subtitle="isAuthenticated ? userStore.userData.email || 'Почта не указана' : 'Войдите в аккаунт'" 
          class="sticky-section"
        >
          <template v-slot:prepend>
            <v-avatar v-if="isAuthenticated" :color="getRandomColor()">
              <span class="text-white">{{ avatarText }}</span>
            </v-avatar>
            <v-avatar v-else color="grey-lighten-1">
              <v-icon color="white">mdi-account</v-icon>
            </v-avatar>
          </template>
        </v-list-item>
      </v-list>

      <v-divider class="sticky-section" />

      <template v-slot:append>
        <v-list density="compact" nav>
          <v-list-item v-for="item in setItems" :key="item.title" :prepend-icon="item.icon" :title="item.title" :to="item.routeName"
            v-if="isAuthenticated" class="nav-item" />

          <v-list-item v-for="item in outItems" :key="item.title" :prepend-icon="item.icon" :title="item.title"
            v-if="isAuthenticated" @click="confirmLogout" class="nav-item" />
        </v-list>

        <v-list density="compact" nav>
          <v-list-item v-for="item in inItems" :key="item.title" :prepend-icon="item.icon" :to="item.routeName"
            v-if="!isAuthenticated" :title="item.title" class="nav-item" />
        </v-list>
      </template>

      <v-list density="compact" nav class="menu-list sticky-section">
        <v-list-item v-for="item in menuItems" :key="item.title" :prepend-icon="item.icon" :title="item.title"
          :to="item.routeName" class="nav-item" />
      </v-list>
      <v-spacer></v-spacer>

      <v-dialog v-model="logoutDialog" max-width="400">
        <v-card>
          <v-card-title class="text-h5"> Подтверждение </v-card-title>
          <v-card-text> Вы точно хотите выйти из аккаунта? </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="grey" @click="logoutDialog = false"> Нет </v-btn>
            <v-btn color="primary" @click="performLogout"> Да </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-navigation-drawer>

    <div class="app-content-wrapper">
      <v-app-bar app color="primary" dark class="sticky-section">
        <v-toolbar-title>
          <v-btn prepend-icon="mdi-home" @click="homepage" class="toolbar-text">BudgetWise</v-btn>
        </v-toolbar-title>
        <v-spacer />
      </v-app-bar>

      <v-main class="main-scrollable">
        <v-container fluid class="d-flex justify-center pa-4">
          <div class="content-wrapper">
            <slot />
          </div>
        </v-container>

        <v-footer class="text-center d-flex flex-column ga-2 py-4" color="primary" style="height: auto; padding: 0px;">
          <div class="d-flex ga-3">
            <v-btn v-for="icon in icons" :key="icon" :icon="icon" density="comfortable" variant="text"></v-btn>
          </div>

          <v-divider class="my-2" thickness="2" width="50"></v-divider>

          <div class="text-caption font-weight-regular opacity-60">
            Пишите! Звоните! С радостью, сломаем ваш проект!
          </div>

          <v-divider></v-divider>

          <div>
            {{ new Date().getFullYear() }} — <strong>Хацкеры 2.0</strong>
          </div>
        </v-footer>
      </v-main>
    </div>
  </v-app>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import axios from 'axios'
import { logoutReq } from '@/composables/auth.request'
import { useUserStore } from '@/stores/userStore'
import { useRouter } from 'vue-router'
import type { infoProfile } from '@/types/auth.type'
import { getInfo } from '@/composables/auth.request'

const userStore = useUserStore()
const router = useRouter()

onMounted(() => {
  userStore.loadUserEmail();
});

const infoProfiles = ref<infoProfile>({
  id: 0,
  email: '',
  first_name: '',
  last_name: ''
})

const avatarText = computed(() => {
  if (infoProfiles.value.first_name && infoProfiles.value.last_name) {
    return `${infoProfiles.value.first_name[0]}${infoProfiles.value.last_name[0]}`.toUpperCase()
  }
  return '-'
})

const getRandomColor = () => {
  const colors = [
    'primary', 
    'secondary', 
    'error', 
    'warning', 
    'info', 
    'success',
    'purple',
    'teal',
    'orange'
  ]
  return colors[Math.floor(Math.random() * colors.length)]
}

onMounted(async () => {
  try {
    const result = await getInfo()
    infoProfiles.value = result
  } catch (error) {
    console.error(error)
  }
})

const isAuthenticated = computed(() => {
  return !!localStorage.getItem('accessToken')
})
const logoutDialog = ref(false)
const confirmLogout = () => {
  logoutDialog.value = true
}

const performLogout = async () => {
  try {
    const refreshToken = localStorage.getItem('refresh_Token');
    
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refresh_Token');
    delete axios.defaults.headers.common['Authorization'];
    
    if (refreshToken) {
      try {
        await logoutReq(refreshToken);
      } catch (error) {
        console.error('Ошибка при выходе на сервере:', error);
      }
    }
    logoutDialog.value = false;

    await router.push('/');
    window.location.reload();
    
  } catch (error) {
    console.error('Критическая ошибка при выходе:', error);
    window.location.href = '/';
  }
}


const homepage = () => {
  router.push('/')
}

const menuItems = computed(() => {
  const baseItems = [
    { title: 'Главная', icon: 'mdi-home', routeName: '/' },
    { title: 'Советы', icon: 'mdi-flask', routeName: '/faq' },
    { title: 'О нас', icon: 'mdi-information', routeName: '/about' },
  ]
  if (isAuthenticated.value) {
    return [...baseItems,
    { title: 'Финансы', icon: 'mdi-currency-usd', routeName: '/finance' }]
  }
  return baseItems
})

const outItems = [
  { title: 'Выйти', icon: 'mdi-logout' },
]

const setItems = [
  { title: 'Настройки аккаунта', icon: 'mdi-wrench', routeName: '/accountsettings' },
]

const inItems =  [
    { title: 'Вход', icon: 'mdi-account', routeName: '/entrance' },
  ] 

const icons = [
  'mdi-instagram',
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
  background-color: aliceblue;
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
  color: rgb(24, 103, 192);
  transition: .25s;
}

.nav-item:hover,
.nav-item.v-list-item--active {
  background-color: rgb(24, 103, 192);
  color: #fff
}

.footer-text {
  font-size: 14px;
  color: rgba(0, 0, 0, 0.6);
}

.bottom-menu {
  margin-top: auto;
}
</style>