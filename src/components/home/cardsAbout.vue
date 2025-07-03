<template>
  <div class="card">

    <div class='card__img'>
      <!-- {{ card.img }} -->
      <img class="card_img" :src="card.img " alt="">
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

// import { defineComponent, DefineComponent, ref } from 'vue';
// import topServices from './topServices.vue';



// interface CardInfo {
//   img: string,
//   title: string,
//   description: string
// }

interface CardProps {
  card: `CardInfo`
}

const { card } = defineProps<CardProps>()

</script>

<style lang="scss" scoped>
.card {
  width: 310px;
  min-height: 400px;
  max-height: 500px;
  background-color: white;
  // border-width: 3px;
  // border-style: solid;
  // display: inline-block;
  display: flex;
  flex-direction: column;
  border-radius: 40px;
  box-shadow: 15px 15px 38px rgba(230, 230, 230, 0.9);
  padding: 35px;
  gap: 5px;
  // margin-top: 150px;

  &__img {
    // border: 1px white;
    // border-style: solid;
    margin: 0 auto;
    width: 170px;
    height: 170px;
    // background: url("/@fs/C:/Users/kiras/Downloads/%D0%98%D0%BB%D0%BB%D1%8E%D1%81%D1%82%D1%80%D0%B0%D1%86%D0%B8%D1%8F.png");
    // background-size: cover;
    // display: flex;
    margin-bottom: 10px;
  }

  &__text {
    font-family: Montserrat;
    font-size: 17px;
    font-weight: 400;
    line-height: 20px;
    // display: flex;
    // gap: 60px;
  }



  &__title {
    font-family: Montserrat;
    font-weight: 600;
    font-size: 23px;
    // display: flex;



  }

}
.card_img {
  width: 100%;
  // max-width: 150px;
}

</style>
