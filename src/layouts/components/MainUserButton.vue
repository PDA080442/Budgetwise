<template>
  <v-container style="height: 50px" fluid>
    <v-row justify="center">
      <v-menu min-width="200px">
        <template v-slot:activator="{ props }">
          <v-btn icon v-bind="props">
            <v-icon size="large" icon="mdi-account">
              <!-- <span class="text-h5">{{ user.initials }}</span> -->
            </v-icon>
          </v-btn>
        </template>
        <v-card>
          <v-card-text>
            <div class="mx-auto text-center">
              <v-icon icon="mdi-account">
                <!-- <span class="text-h5">{{ userData.initials }}</span> -->

              </v-icon>
              <!-- <h3>{{ userData.fullName }}</h3> -->
              <p class="text-caption mt-1">{{ userStore.userData.email || 'Почта не указана' }}</p>
              <v-divider class="my-3"></v-divider>
              <v-btn variant="text" rounded> Настройки аккаунта </v-btn>
              <v-divider class="my-3"></v-divider>
              <!-- <v-btn variant="text" rounded> Выйти</v-btn> -->
              <v-btn variant="text" rounded v-if="isAuthenticated" @click="confirmLogout" text="Выйти"></v-btn>
            </div>
          </v-card-text>
        </v-card>
      </v-menu>
    </v-row>
  </v-container>

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

</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { getEmail, logoutReq } from '@/composables/auth.request'
import { useRouter } from 'vue-router'
import axios from 'axios'////
import { useUserStore } from '@/stores/userStore'

// const user = {
//   initials: 'JD',
//   fullName: 'John Doe',
//   email: 'john.doe@doe.com',
// }

const userStore = useUserStore()
onMounted(() => {
  userStore.loadUserEmail();
});

const router = useRouter()

const isAuthenticated = computed(() => {
  return !!localStorage.getItem('accessToken')
})

const logoutDialog = ref(false)
const confirmLogout = () => {
  logoutDialog.value = true
}

const performLogout = async () => {
  try {
    const refreshToken = localStorage.getItem('refresh_Token')
    if (refreshToken) {
      await logoutReq(refreshToken)
    }

    localStorage.removeItem('accessToken')
    localStorage.removeItem('refresh_Token')
    delete axios.defaults.headers.common['Authorization']

    logoutDialog.value = false
    router.push({ path: '/' })
  } catch (error) {
    console.error('Ошибка при выходе:', error)
    localStorage.removeItem('accessToken')
    localStorage.removeItem('refresh_Token')
    delete axios.defaults.headers.common['Authorization']
    logoutDialog.value = false
    router.push({ path: '/' })
  }
}
</script>
