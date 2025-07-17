<template>
  <div class="module3">
    <h2 class="module3__title">Топ услуг</h2>
    <p class="module3__text">
      Разработаем индивидуальную стратегию email маркетинга, подготовим корпоративный шаблон
      рассылки или возьмем весь канал email на себя
    </p>
    <div class="module3__cardsBox">
      <div class="card" v-for="(card, index) in items" :key="index">
        <h3 class="card__title">{{ card.title }}</h3>
        <img class="card__image" :src="card.image" alt="" />
        <p class="card__text">{{ card.text }}</p>
        <span class="card__price">{{ card.price }}</span>
        <button class="card__button">Заказать услугу</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { topservices, type TopServices } from '@/mocks/HomeMocks/TopServicesMocks'

const items = ref<TopServices[]>(topservices)
</script>

<style lang="scss" scoped>
.module3 {
  padding: 20px 68px;
  font-family: Montserrat;
  &__title {
    font-size: 36px;
    font-weight: 600;
    margin-bottom: 8px;
  }
  &__text {
    font-size: 16px;
    color: #555;
    margin-bottom: 32px;
    max-width: 800px;
    line-height: 1.4;
  }
  &__cardsBox {
    display: flex;
    gap: 24px;
    overflow-x: auto;
    padding-bottom: 20px;
  }

  .card {
    min-width: 420px;
    max-width: 420px;
    background: #fff;
    border-radius: 20px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
    padding: 24px;
    display: grid;
    grid-template-columns: 1fr auto;
    grid-template-rows: auto 1fr auto;
    row-gap: 16px;
    height: 100%;

    &__title {
      grid-column: 1 / span 1;
      margin: 0;
      font-size: 20px;
      font-weight: 600;
      line-height: 1.2;
      align-self: start;
    }

    &__image {
      grid-column: 2 / span 1;
      width: 80px;
      height: 80px;
      object-fit: cover;
      border-radius: 8px;
    }

    &__text {
      grid-column: 1 / -1;
      margin: 0;
      font-size: 14px;
      color: #777;
      line-height: 1.4;
      align-self: start;
    }

    &__price {
      grid-column: 1 / span 1;
      font-size: 18px;
      font-weight: 600;
      align-self: end;
    }

    &__button {
      grid-column: 2 / span 1;
      justify-self: end;
      align-self: end;
      background-color: #ff6871;
      color: #fff;
      border: none;
      border-radius: 10px;
      padding: 10px 16px;
      font-size: 14px;
      cursor: pointer;
      transition: background-color 0.2s;
      &:hover {
        background-color: #e95762;
      }
    }
  }
}
</style>
