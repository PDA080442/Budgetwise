<template>
  <div class="module3">
    <div class="module3__title">Топ услуг</div>
    <div class="module3__text">
      any информация про то, что мы модем сделать\предоставить или чо там по плану и тд
    </div>
    <div class="module3__cardsBox">
      <div class="card" v-for="(card, index) in items" :card="card" :key="index">
        <div class="gridBox box1">{{ card.title }}</div>
        <div class="gridBox box2-2">
          <!-- <img class="gridBox box2" : src="card.image"> -->
          <img class="gridBox box2" :src="card.image" alt="" />
        </div>
        <div class="gridBox box3">
          очень длинный текст, который описывает, что и зачем мы делаем, касаеио этого пункта
        </div>
        <div class="gridBox box4">Цена</div>
        <div class="gridBox box5">
          <!-- <div class="button">Заказать корнсультацию</div> -->
          <button class="button">Заказать консультацию</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts" src="">
import { ref } from 'vue';
import { topservices, type TopServices } from '@/mocks/HomeMocks/TopServicesMocks';

const items = ref<TopServices[]>(topservices)
</script>

<style lang="scss" scoped>
.module3 {
  padding: 5px 68px;
  display: grid;
  gap: 25px;

  &__title {
    font-family: Montserrat;
    font-size: 36px;
    width: 50%;
    line-height: 40px;
    font-weight: 600;
    width: 63%;
  }

  &__text {
    font-family: Montserrat;
    font-weight: 400;
    font-size: 18px;
  }

  &__cardsBox {
    max-width: 2050px;
    height: 500px;
    display: flex;
    gap: 30px;
    overflow: auto;
    padding-top: 50px;

    .card {
      width: 540px;
      min-width: 540px;
      height: 360px;
      border-radius: 30px;
      box-shadow: 15px 15px 38px rgba(230, 230, 230, 0.9);
      box-shadow: 15px -15px 30px rgba(230, 230, 230, 0.9);
      display: grid;
      grid-template-columns: 1fr 1fr;
      grid-template-rows: 5fr 4fr 3fr;
      padding: 30px;

      & .box1 {
        font-family: Montserrat;
        font-weight: 600;
        font-size: 28px;
        align-content: center;
        text-align: center;
      }

      & .box2-2 {
        justify-content: center;
        padding: 0 50px;
        align-content: center;
        text-align: center;

        & .box2 {
          max-width: 200px;
          max-height: 120px;
          align-content: center;
          justify-content: center;
        }
      }

      & .box3 {
        grid-column-start: 1;
        grid-column-end: 3;
        padding-left: 15px;
        font-family: Montserrat;
        font-weight: 400;
        font-size: 16px;
        line-height: 130%;
        align-content: center;
      }

      & .box4 {
        font-family: Montserrat;
        font-weight: 600;
        font-size: 25px;
        align-content: center;
        text-align: center;
        padding-right: 27px;
      }

      & .box5 {
        align-content: center;
        text-align: center;

        & .button {
          height: 56px;
          width: 218px;
          background-color: rgba(255, 104, 113, 1);
          border-radius: 15px;
          text-align: center;
          color: white;
          padding: 15px;
          background-color: rgba(255, 104, 113, 1);
        }
      }
    }
  }
}

// .module3__title {
//   font-family: Montserrat;
//   font-size: 36px;
//   width: 50%;
//   line-height: 40px;
//   font-weight: 600;
// }

// .module3__text {
//   font-family: Montserrat;
//   font-weight: 400;
//   font-size: 18px;
// }

// .cardsBox {
//   max-width: 2050px;
//   height: 500px;
//   display: flex;
//   gap: 30px;
//   overflow: auto;
//   padding-top: 50px;
// }

// .card {
//   width: 540px;
//   min-width: 540px;
//   height: 360px;
//   border-radius: 30px;
//   box-shadow: 15px 15px 38px rgba(230, 230, 230, 0.9);
//   box-shadow: 15px -15px 30px rgba(230, 230, 230, 0.9);
//   display: grid;
//   grid-template-columns: 1fr 1fr;
//   grid-template-rows: 5fr 4fr 3fr;
//   padding: 30px;
// }

// .box1 {
//   font-family: Montserrat;
//   font-weight: 600;
//   font-size: 28px;
//   align-content: center;
//   text-align: center;
// }

// .box2 {
//   max-width: 200px;
//   max-height: 120px;
//   align-content: center;
//   justify-content: center;
// }

// .box2-2 {
//   justify-content: center;
//   padding: 0 50px;
//   align-content: center;
//   text-align: center;
// }

// .box3 {
//   grid-column-start: 1;
//   grid-column-end: 3;
//   padding-left: 15px;
//   font-family: Montserrat;
//   font-weight: 400;
//   font-size: 16px;
//   line-height: 130%;
//   align-content: center;
// }

// .box4 {
//   font-family: Montserrat;
//   font-weight: 600;
//   font-size: 25px;
//   align-content: center;
//   text-align: center;
//   padding-right: 27px;
// }

// .box5 {
//   align-content: center;
//   text-align: center;
// }

// .button {
//   height: 56px;
//   width: 218px;
//   background-color: rgba(255, 104, 113, 1);
//   border-radius: 15px;
//   text-align: center;
//   color: white;
//   padding: 15px;
//   background-color: rgba(255, 104, 113, 1);
// }

// .titleImgBox {
//   background-color: rgb(8, 96, 25);
//   width: 100%;
//   min-height: 150px;
//   display: flex;
// }

// .img {
//   background-color: aliceblue;
//   width: 37%;
// }

// .buttonPriceBox {
//   background-color: aquamarine;
//   width: 100%;
//   height: 26%;
// }

// .price {
//   background-color: azure;
//   width: 50%;
//   font-family: Montserrat;
//   font-weight: 600;
//   font-size: 25px;
//   text-align: center;
//   justify-content: center;
//   align-items: center;
//   margin: 0 auto;
//   width: 100px;
// }
</style>
