<template>
  <header class="l-header-container">
    <v-layout align-center justify-space-between>
      <div class="nav">
        <v-flex>
          <v-text-field
            class="search"
            min-width="250"
            :hide-details="true"
            density="compact"
            v-model="search"
            label="Поиск"
          >
          </v-text-field>
        </v-flex>

        <v-flex>
          <div class="d-flex">
            <template v-for="item in navItems">
              <RouterLink :to="item.href">{{ item.name }}</RouterLink>
            </template>
          </div>
        </v-flex>
        <v-flex>
          <v-col cols="auto">
            <MainUserButton v-if="isAuthenticated" @logout="confirmLogout" />
            <v-icon
              v-else
              @click="goToLogin"
              icon="mdi-account"
              color="white"
              size="small"
            ></v-icon>
          </v-col>
        </v-flex>
      </div>
    </v-layout>
  </header>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import MainUserButton from '@/layouts/components/MainUserButton.vue'

const router = useRouter()
const logoutDialog = ref(false)

const isAuthenticated = computed(() => {
  return !!localStorage.getItem('accessToken')
})

const navItems = computed(() => {
  const baseItems = [
    { name: 'Главная', href: '/' },
    { name: 'Советы', href: '/faq' },
  ]

  if (isAuthenticated.value) {
    return [
      ...baseItems,
      {
        name: 'Мои финансы',
        href: '/finance',
      },
    ]
  }
  return baseItems
})

const goToLogin = () => {
  router.push({ path: '/entrance' })
}

const search = ref('')

const confirmLogout = () => {
  logoutDialog.value = true
}
</script>

<style lang="scss" scoped>
.nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #0171bc;
  font-family: 'Montserrat', sans-serif;
  width: 100%;
  padding-left: 20px;
  padding-right: 10px;

  a {
    font-size: 25px;
    color: white;
    text-decoration: none;
    padding: 8px 16px;
    border-radius: 4px;
    transition: background-color 0.5s;

    &:hover {
      background-color: rgba(255, 255, 255, 0.1);
    }

    &.router-link-active,
    &.router-link-exact-active {
      background-color: rgba(255, 255, 255, 0.2);
      font-weight: bold;
    }
  }
}
.search {
  color: white;
}

.l-header-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
}
</style>
