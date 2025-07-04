<template>
  <div class="about">
    <div class="about__fashions">
      <h1 class="about__header">{{ title }}</h1>


      <AboutAdvantages></AboutAdvantages>

      <div class="buy_service">
        заказать консультацию
      </div>
    </div>

    <div class="about__image">
      <img src="" alt="программист с ноутбуком" class="image">
    </div>

  </div>
</template>

<script setup lang="ts">

import AboutAdvantages from './AboutAdvantages.vue';

import { ref } from 'vue';
const title = ref("Email маркетинг под ключ")


</script>

<style lang="scss" scoped>
.about {

  display: grid;
  grid-template-columns: 1.2fr 1fr;
  // background-color: rgb(208, 208, 237);
  width: 100%;
  // height: px;
  max-height: 600px;
  margin-top: 50px;
  margin-left: auto;
  margin-right: auto;
  // display: flex;
  gap: 20px;

  &__image {
    height: 50px img // max-height: 400px;
  }

  &__fashions {
    background-color: rgb(350, 350, 350);
    height: 90%;
    max-height: 600px;
    border-radius: 20px;
    box-shadow: 15px 15px 38px rgba(230, 230, 230, 0.9);
    min-width: 600px;
    max-width: 900px;
    padding: 65px;
    display: flex;
    flex-direction: column;
    gap: 20px;
    z-index: 1;
    // display: flex;
    // grid-template-columns: 9fr 5fr;
    // grid-template-rows: 1fr 1fr 1fr;

  }

  &__header {
    font-size: 40px;
    font-weight: 600;
    font-family: Montserrat;
    // background-color: red;
    // width: 105%;
    text-align: center;
  }




  .buy_service {
    height: 60px;
    width: 300px;
    border-radius: 20px;
    text-align: center;
    color: white;
    font-family: Montserrat;
    font-size: 18px;
    padding: 15px;
    margin-bottom: 50px;

    background-color: rgba(255, 104, 113, 1);
  }

}
</style>
