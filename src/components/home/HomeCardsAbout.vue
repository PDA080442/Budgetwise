<template>
  <div class="card">
    <div class="card__img">
      <!-- {{ card.img }} -->
      <img class="card_img" :src="card.img" alt="" />
    </div>

    <div class="card__title">
      {{ card.title }}
    </div>

    <div class="card__text">
      {{ card.description }}
    </div>
  </div>
</template>

<script setup lang="ts">
interface CardInfo {
  img: string
  title: string
  description: string
}

interface CardProps {
  card: CardInfo
}

const { card } = defineProps<CardProps>()
</script>

<style lang="scss" scoped>
.card {
  width: 300px;
  background-color: white;
  display: flex;
  flex-direction: column;
  border-radius: 40px;
  box-shadow: 15px 15px 38px rgba(230, 230, 230, 0.9);
  padding: 35px;
  gap: 5px;

  &__img {
    margin: 0 auto;
    width: 170px;
    height: 170px;
    margin-bottom: 10px;
  }

  &__text {
    font-family: Montserrat;
    font-size: 18px;
    font-weight: 400;
    line-height: 20px;
  }

  &__title {
    font-family: Montserrat;
    font-weight: 600;
    font-size: 25px;
  }
}
.card_img {
  width: 100%;
}
</style>
