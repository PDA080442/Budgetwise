<template>

  <div>
    <div>

      <AboutSection></AboutSection>

      <div class="advantages">
        <div class="advantages__box">

          <div class="advantages__text">
            бебебебебебебебюбюбю ме улюлюл перенос текста
          </div>
          <div class="box_for_cards">
            <div class="card" v-for="i in 3" :key="i">

              <div class='card__img'>

              </div>

              <div class="card__title">
                заголовок
              </div>

              <div class="card__text">
                основная информация карточки
              </div>

            </div>


          </div>
        </div>
      </div>
      <div class="services">

      </div>

    </div>
  </div>



</template>

<script setup lang="ts">
import AboutSection from '@/components/home/AboutSection.vue';
</script>

<style lang="scss" scoped>
.advantages {
  // background-color: rgb(208, 208, 237);
  width: 95%;
  height: 600px;
  margin-top: 100px;
  margin-left: auto;

  &__box {
    background-color: rgba(243, 243, 243, 1);
    width: 100%;
    height: 85%;
    border-radius: 30px 0 0 30px;
    padding-top: 80px;
    padding-left: 130px;
  }

  &__text {
    font-family: Montserrat;
    font-size: 36px;
    width: 50%;
    line-height: 40px;
    font-weight: 600;
  }
}



.services {
  width: 900px;
  height: 400px;
  margin-top: 100px;
  margin-left: auto;
  margin-right: auto;
}

.box_for_cards {
  width: 100%;
  height: 100%;
  // background-color: red;
  margin-top: 50px;
  display: flex;
  gap: 28px;

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
    gap: 3px;

    &__img {
      // border: 1px solid red;
      margin: 0 auto;
      width: 170px;
      height: 170px;
      background: url("/@fs/C:/Users/kiras/Downloads/%D0%98%D0%BB%D0%BB%D1%8E%D1%81%D1%82%D1%80%D0%B0%D1%86%D0%B8%D1%8F.png");
      background-size: cover;
      // display: flex;
    }

    &__text {
      font-family: Montserrat;
      font-size: 18px;
      font-weight: 400;
      // display: flex;
      // gap: 60px;
    }



    &__title {
      font-family: Montserrat;
      font-weight: 600;
      font-size: 25px;
      // display: flex;



    }

  }
}
</style>
