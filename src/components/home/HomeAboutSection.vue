<template>
  <div class="about">
    <div class="about__fashions">
      <h1 class="about__header">{{ title }}</h1>

      <HomeAboutAdvantages></HomeAboutAdvantages>

      <div class="buy_service">Заказать консультацию</div>
    </div>

    <div class="about__image">
      <img src="@/assets/img/header/proger.jpg" alt="" />
    </div>
  </div>
</template>

<script setup lang="ts">
import HomeAboutAdvantages from '@/components/Home/HomeAboutAdvantages.vue'

import { ref } from 'vue'
const title = ref('Email маркетинг под ключ')
</script>

<style lang="scss" scoped>
.about {
  display: grid;
  grid-template-columns: 1.2fr 1fr;
  width: 100%;
  max-height: 600px;
  margin-top: 50px;
  margin-left: auto;
  margin-right: auto;
  gap: 20px;

  &__image {
    height: 50px img;
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
  }

  &__header {
    font-size: 40px;
    font-weight: 600;
    font-family: Montserrat;
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
