<template>

  <div class='module3'>
    <div class="module3__title">
      Топ услуг
    </div>
    <div class="module3__text">
      any информация про то, что мы модем сделать\предоставить или чо там по плану и тд
    </div>
    <div class="cardsBox">


      <div class="card" v-for="(card, index) in  items" :card="card" :key="index" >
        <div class="gridBox box1"> {{ card.title }}</div>
        <div class="gridBox box2-2">
          <!-- <img class="gridBox box2" : src="card.image"> -->
          <img class="gridBox box2" :src="card.image " alt="">
        </div>
        <div class="gridBox box3"> очень длинный текст, который описывает, что и зачем мы делаем, касаеио этого пункта</div>
        <div class="gridBox box4"> Цена</div>
        <div class="gridBox box5">
          <div class="button">
Заказать корнсультацию
          </div>
        </div>

      </div>
    </div>
  </div>

</template>

<script setup lang="ts" src="">
// import { createTypeReferenceDirectiveResolutionCache } from 'typescript';
import { ref } from 'vue';


const items = ref([
  {
    title: 'первый заголовок',
    image: 'https://i.pinimg.com/736x/15/15/90/1515904d03ff21633f6ce5d147016203.jpg',
    text: 'первый текст ббсьцьлйдыл ЦЙЧ2сучцуа уцчк5йсуец4ку як4ч3есц',
    price: 'стоимость: 1.000.000 $'
  },

  {
    title: 'второй заголовок',
    image: 'https://i.pinimg.com/736x/86/21/28/8621283dc04cb66a3a5c62ef25c6e20d.jpg',
    text: 'первый текст ббсьцьлйдыл ЦЙЧ2сучцуа уцчк5йсуец4ку як4ч3есц',
    price: 'стоимость: 1.000.000 $'
  },

  {
    title: 'третий заголовок',
    image: 'https://i.pinimg.com/736x/79/ce/b5/79ceb57fa2aeaea835fd895626a7f15f.jpg',
    text: 'первый текст ббсьцьлйдыл ЦЙЧ2сучцуа уцчк5йсуец4ку як4ч3есц',
    price: 'стоимость: 1.000.000 $'
  },

  {
    title: 'четвертый заголовок',
    image: 'https://i.pinimg.com/736x/ac/1c/ad/ac1cad88b6804caa1d2957e250145dcb.jpg',
    text: 'первый текст ббсьцьлйдыл ЦЙЧ2сучцуа уцчк5йсуец4ку як4ч3есц',
    price: 'стоимость: 1.000.000 $'
  }
])


// interface CardInfo {
//   image: string,
//   title: string,
//   price: string,
//   text: string
// }

interface CardProps {
  card: `CardInfo`
}



const { card } = defineProps<CardProps>()

</script>






<style scoped>
.module3 {
  padding: 5px 68px;
  display: grid;
  gap: 25px;
  /* background-color: ; */

}

.module3__title {
  font-family: Montserrat;
  font-size: 36px;
  width: 50%;
  line-height: 40px;
  font-weight: 600;
  /* display: flex; */
  /* gap: 200px; */

}

.module3__text {
  font-family: Montserrat;
  font-weight: 400;
  font-size: 18px;
  /* display: flex; */


}

.cardsBox {
  max-width: 2050px;
  height: 500px;
  /* background-color: blue; */
  display: flex;
  gap: 30px;
  overflow: auto;
    /* align-content: center; */
  /* justify-content: center; */
  padding-top: 50px ;
}

.card {
  /* background-color: aqua; */
  width: 540px;
  min-width: 540px;
  height: 360px;
  border-radius: 30px;
  box-shadow: 15px 15px 38px rgba(230, 230, 230, 0.9);
  box-shadow: 15px -15px 30px rgba(230, 230, 230, 0.9);
  display: grid;
  grid-template-columns: 1fr 1fr  ;
  grid-template-rows: 5fr 4fr 3fr;
  /* grid-column-start: 2;
  grid-column-end: 3; */
  /* gap: 7px; */
  padding: 30px;



}

.box1 {
  font-family: Montserrat;
  font-weight: 600;
  font-size: 28px;
  /* justify-content: center; */
  align-content: center;
  text-align: center;


}

.box2 {
  max-width: 200px;
  max-height: 120px;
  align-content: center;
  justify-content: center;

}

.box2-2 {
    /* align-content: center;
  justify-content: center;
  padding: 0 50px; */
      align-content: center;
  text-align: center;
}

.box3 {
  grid-column-start: 1;
  grid-column-end: 3;
  /* background-color: aliceblue; */
  padding-left: 15px;
  font-family: Montserrat;
  font-weight: 400;
  font-size: 16px;
  line-height: 130%;
      align-content: center;
  /* text-align: center; */
}

.box4 {
  font-family: Montserrat;
  font-weight: 600;
  font-size: 25px;
  /* vertical-align: middle; */
  align-content: center;
  text-align: center;
  padding-right: 27px;

}

.box5 {
    align-content: center;
  text-align: center;
}

.button {
  height: 56px;
  width: 218px;
  background-color: rgba(255, 104, 113, 1);
  border-radius: 15px;
  /* height: 60px; */
    /* width: 300px; */
    /* border-radius: 20px; */
    text-align: center;
    color: white;
    /* font-family: Montserrat; */
    /* font-size: 18px; */
    padding: 15px;
    /* margin-bottom: 50px; */

    background-color: rgba(255, 104, 113, 1);

}

.titleImgBox {
background-color: rgb(8, 96, 25);
width: 100%;
min-height: 150px;
display: flex;
}

.title {
  background-color: antiquewhite;
  width: 63%;
  /* min-height: 40%; */
}
.img {
  background-color: aliceblue;
  width: 37%;
  /* height: 40%; */
}

.text {
  background-color: bisque;
  width: 100%;
  height: 34%;
}

.buttonPriceBox {
  background-color: aquamarine;
  width: 100%;
  height: 26%;
}

.price {
  background-color: azure;
  width: 50%;
  /* height: 100%; */
  font-family: Montserrat;
  font-weight: 600;
  font-size: 25px;
  text-align: center;
  /* margin-top: 20px; */
    /* display: grid;
  justify-content: center;
  align-items: center; */
  margin: 0 auto; width: 100px;
}

/* .gridBox {
  background-color: blue;
  border: solid 3px;
} */

.box4 {
/* grid-column-start: 1; */
/* grid-column-end: ; */
}
</style>
