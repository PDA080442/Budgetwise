// HomeAboutSection.vue
<template>
  <div class="about">
    <div class="about__container">
      <div class="about__box">
        <div class="about__info">
          <div class="about__info__title">{{ title }}</div>
          <div class="about__info__col1">
            <HomeAboutAdvantages />
            <button class="about__info__btn">Заказать консультацию</button>
          </div>
          <div class="about__info__col2"></div>
        </div>
        <div class="about__image">
          <img src="@/assets/img/header/progger.png" alt="Illustration" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import HomeAboutAdvantages from '@/components/Home/HomeAboutAdvantages.vue'

const title = ref('Email маркетинг под ключ')
</script>

<style lang="scss" scoped>
.about {
  width: 100%;
  max-width: 1920px;
  margin: 50px auto 0;
  padding: 0 20px;

  &__container {
    max-width: 1515px;
    margin: 0 auto;
  }

  &__box {
    display: flex;
    gap: 12px;
  }

  &__info {
    flex: 1;
    background: #fff;
    border-radius: 30px;
    box-shadow: 15px 15px 38px rgba(230, 230, 230, 0.9);
    padding: 40px 45px 40px 80px;
    display: flex;
    flex-direction: column;

    &__title {
      font-family: Montserrat, sans-serif;
      font-size: 30px;
      font-weight: 600;
      margin-left: 10px;
      margin-bottom: 30px;
    }

    &__col1 {
      flex: 1.4;
      display: flex;
      flex-direction: column;
    }

    &__btn {
      align-self: self-start;
      background-color: rgba(255, 104, 113, 1);
      color: #fff;
      font-family: Montserrat, sans-serif;
      font-size: 16px;
      font-weight: bold;
      padding: 15px 30px;
      border-radius: 20px;
      cursor: pointer;

      &:hover {
        background-color: rgba(235, 90, 98, 1);
      }
    }
  }
}
</style>
