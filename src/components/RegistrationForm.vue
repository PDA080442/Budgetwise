<template>
  <v-container class="d-flex justify-center">
    <v-card class="pa-6">
      <v-card-title class="titleform">Регистрация</v-card-title>
      <v-card-text>
        <v-form>
          <v-text-field label="Email" value="" />

          <v-text-field label="Пароль" type="password" value="" />

          <v-text-field label="Подтвердите пароль" type="password" value="" />
        </v-form>
      </v-card-text>

      <v-divider />

      <v-card-actions>
        <v-spacer />
        <v-btn class="reg__btn">Зарегистрироваться </v-btn>
      </v-card-actions>
      <v-card-text clas>Есть аккаунт?</v-card-text>
      <v-btn class="log__btn" href="../views/LoginPage.vue">Войти в аккаунт</v-btn>
    </v-card>
  </v-container>
</template>

<style scoped lang="scss">
.v-card {
  border-radius: 25px;
  font-family: 'Montserrat', sans-serif;
}

.titleform {
  text-align: center;
  font-size: 25px;
  font-weight: 300;
  color: #0171bc;
}

.reg__btn {
  color: #ffffff;
  background-color: #0171bc;
  opacity: 1;
  font-size: 15px;
  text-align: center;
}

.log__btn {
  color: #ffffff;
  background-color: #0171bc;
  opacity: 1;
  font-size: 15px;
  margin-left: 15px;
}

// .v-btn:hover {
//   color: #ffffff;
//   background-color: #0171bc;
// }
</style>
