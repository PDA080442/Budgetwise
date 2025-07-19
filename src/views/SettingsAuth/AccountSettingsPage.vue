<template>
  <NewLayout>
    <v-card class="profile-card">
      <v-row no-gutters>
        <v-col cols="12" md="4" class="left-column">
          <v-card flat class="profile-info">
            <v-list lines="two" style="padding-bottom: 0; padding-top: 0">
              <v-list-item style="background-color: #f5f7fa">
                <template v-slot:prepend>
                  <v-avatar size="80" :color="getRandomColor()">
                    <span class="text-white">{{ avatarText }}</span>
                  </v-avatar>
                </template>

                <v-list-item-title class="user-name">
                  {{ infoProfiles.first_name }} {{ infoProfiles.last_name }}
                </v-list-item-title>
                <v-list-item-subtitle class="user-email">
                  {{ infoProfiles.email }}
                </v-list-item-subtitle>
              </v-list-item>
            </v-list>
          </v-card>
        </v-col>

        <v-col cols="12" md="8" class="right-column">
          <v-card flat class="form-section">
            <v-card-title class="section-title" style="padding-left: 16px; padding-top: 16px">
              Параметры личных данных пользователя
            </v-card-title>

            <v-card-text>
              <v-form @submit.prevent="submitForm">
                <v-row>
                  <v-col cols="12" sm="6">
                    <div class="input-label">ИМЯ</div>
                    <v-text-field
                      v-model="infoProfiles.first_name"
                      variant="outlined"
                      density="comfortable"
                      hide-details="auto"
                      :rules="[rules.require]"
                    ></v-text-field>
                  </v-col>

                  <v-col cols="12" sm="6">
                    <div class="input-label">ФАМИЛИЯ</div>
                    <v-text-field
                      v-model="infoProfiles.last_name"
                      variant="outlined"
                      density="comfortable"
                      hide-details="auto"
                      :rules="[rules.require]"
                    ></v-text-field>
                  </v-col>
                </v-row>

                <v-row class="action-buttons">
                  <v-col>
                    <v-btn @click="postInfo(infoProfiles)" class="save-btn" size="large">
                      Сохранить
                    </v-btn>
                    <v-btn type="reset" class="reset-btn" size="large"> Сброс </v-btn>
                  </v-col>
                </v-row>
              </v-form>
            </v-card-text>
          </v-card>

          <v-card flat class="form-section">
            <v-card-title class="section-title" style="padding-left: 16px; padding-top: 16px">
              Изменение пароля
            </v-card-title>

            <v-card-text>
              <v-form>
                <v-row>
                  <v-col cols="12">
                    <div class="input-label">ТЕКУЩИЙ ПАРОЛЬ</div>
                    <v-text-field
                      v-model="changePasswords.old_password"
                      type="password"
                      variant="outlined"
                      density="comfortable"
                      :rules="[rules.require]"
                    ></v-text-field>
                  </v-col>

                  <v-col cols="12">
                    <div class="input-label">НОВЫЙ ПАРОЛЬ</div>
                    <v-text-field
                      v-model="changePasswords.new_password"
                      type="password"
                      variant="outlined"
                      density="comfortable"
                      :rules="[rules.require, rules.passwordmin]"
                    ></v-text-field>
                  </v-col>

                  <v-col cols="12">
                    <div class="input-label">ПОДТВЕРЖДЕНИЕ ПАРОЛЯ</div>
                    <v-text-field
                      v-model="initialState.new_password2"
                      type="password"
                      variant="outlined"
                      density="comfortable"
                      :rules="[rules.require, rules.passsame]"
                    ></v-text-field>
                  </v-col>
                </v-row>

                <v-row class="action-buttons">
                  <v-col>
                    <v-btn @click="postPassword(changePasswords)" class="save-btn" size="large">
                      Сохранить
                    </v-btn>
                    <v-btn type="reset" class="reset-btn" size="large"> Сброс </v-btn>
                  </v-col>
                </v-row>
              </v-form>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-card>
  </NewLayout>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import NewLayout from '@/layouts/NewLayout.vue'
import { isEmail } from 'validator'
import type { LoginData } from '@/types/auth.type'
import { accountSettings } from '@/stores/accountSettings'
import { storeToRefs } from 'pinia'
import { getInfo } from '@/composables/auth.request'
import { postInfo } from '@/composables/auth.request'
import type { infoProfile } from '@/types/auth.type'
import type { changePassword } from '@/types/auth.type'
import { postPassword } from '@/composables/auth.request'

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
    'orange',
  ]
  return colors[Math.floor(Math.random() * colors.length)]
}

const infoProfiles = ref<infoProfile>({
  id: 0,
  email: '',
  first_name: '',
  last_name: '',
})

const changePasswords = ref<changePassword>({
  old_password: '',
  new_password: '',
})

onMounted(async () => {
  try {
    const result = await getInfo()
    infoProfiles.value = result
  } catch (error) {
    console.error(error)
  }
})

const accSet = accountSettings()

const { userData, myEmail } = storeToRefs(accSet)
const { myName } = storeToRefs(accSet)

const initialState = ref<LoginData>({ ...userData.value })

const rules = {
  require: (u: string) => !!u || 'Поле нужно заполнить',
  email: (u: string) => isEmail(u) || 'Введен неправильный mail',
  passwordmin: (u: string) => u?.length >= 6 || 'Минимальная длина - 6 символов',
  passsame: (u: string) => u === changePasswords.value.new_password || 'Пароли не совпадают',
  // truePassword: (u: string) => u === changePasswords.value.old_password || 'Введен неверный пароль'
}

function sendForm() {
  console.log(initialState.value)

  accSet.setUserData({ ...initialState.value })
}

function submitForm() {
  const formEl = this.$refs.myForm
  if (!formEl.checkValidity()) {
    formEl.reportValidity()
    return
  }
}
</script>

<style scoped lang="scss">
.profile-card {
  margin: 24px;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1);
}

.left-column {
  background-color: #f5f7fa;
  padding: 24px;

  .profile-info {
    position: sticky;
    top: 24px;
  }

  .user-name {
    font-size: 1.5rem;
    font-weight: 600;
    line-height: 1.2;
    margin-bottom: 4px;
  }

  .user-email {
    font-size: 1rem;
    color: #64748b;
  }
}

.right-column {
  padding: 24px;

  .form-section {
    margin-bottom: 32px;

    &:last-child {
      margin-bottom: 0;
    }
  }

  .section-title {
    font-size: 1.25rem;
    font-weight: 600;
    padding: 0 0 16px 0;
    color: #3b1e1e;
  }

  .input-label {
    font-size: 0.875rem;
    font-weight: 500;
    color: #475569;
    margin-bottom: 8px;
  }

  .action-buttons {
    margin-top: 24px;

    .v-col {
      display: flex;
      gap: 16px;
    }
  }

  .save-btn {
    background-color: #3b82f6;
    color: white;
    text-transform: none;
    font-weight: 500;
  }

  .reset-btn {
    color: #64748b;
    text-transform: none;
    font-weight: 500;
    border: 1px solid #e2e8f0;
  }
}

@media (max-width: 960px) {
  .left-column {
    border-bottom: 1px solid #e2e8f0;
  }
}
</style>
