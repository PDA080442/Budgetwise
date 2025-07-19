<template>
  <v-container fluid class="register-page d-flex align-center justify-center">
    <v-card class="register-card elevation-5 pa-10">
      <v-card-title class="titleform">Вход</v-card-title>

      <v-alert v-if="serverErrors.main" type="error" class="mb-4">
        {{ serverErrors.main }}
      </v-alert>

      <v-card-text>
        <v-form ref="form" v-model="valid" lazy-validation @submit.prevent="submit">
          <v-text-field
            v-model="logindata.email"
            label="Email"
            variant="outlined"
            type="email"
            :rules="[rules.require, rules.email]"
            required
            class="mb-6"
            prepend-inner-icon="mdi-email-outline"
          />
          <v-text-field
            v-model="logindata.password"
            label="Пароль"
            type="password"
            variant="outlined"
            :rules="[rules.require, rules.passwordmin]"
            required
            prepend-inner-icon="mdi-lock-outline"
          />
        </v-form>
      </v-card-text>

      <v-divider class="my-6" />

      <v-card-actions class="d-flex flex-column">
        <v-btn class="reg__btn mb-4" block height="56" @click="submit">Войти</v-btn>
        <v-btn class="log__btn" block height="56" variant="text" @click="goToRegistration">
          Ещё нет аккаунта? Регистрация
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script lang="ts" setup>
import { useEntranceRules } from '@/services/Rules/Entrance/EntranceFormRules'
import { useLoginActions } from '@/services/Actions/Entrance/EntranceFormActions'

const { form, valid, logindata, serverErrors, submit, goToRegistration } = useLoginActions()

const { rules } = useEntranceRules()
</script>

<style scoped lang="scss">
.register-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  padding: 24px;
  font-family: 'Montserrat', sans-serif;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: url('/images/mesh-gradient.svg') center/cover no-repeat;
    opacity: 0.15;
    pointer-events: none;
  }
}

.register-card {
  width: 100%;
  max-width: 520px;
  border-radius: 24px;
  backdrop-filter: blur(6px);
  background: rgba(255, 255, 255, 0.95);
}

.titleform {
  text-align: center;
  font-size: 32px;
  font-weight: 800;
  color: #0171bc;
  margin-bottom: 20px;
}

.v-input__control,
.v-input__slot {
  transition: background-color 0.25s ease;
}

.v-input--focused .v-input__slot {
  background-color: #e3f2fd !important;
}

.v-input__slot {
  background-color: #f5f8fb !important;
  border-radius: 12px !important;
  padding-left: 4px !important;
}

.reg__btn,
.log__btn {
  background: linear-gradient(135deg, #0171bc 0%, #29b6f6 100%) !important;
  color: #fff !important;
  font-size: 18px;
  font-weight: 700;
  border-radius: 12px;
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(1, 113, 188, 0.3);
  }
}

.log__btn {
  background: transparent !important;
  color: #0171bc !important;
  font-size: 14px;
}
</style>
