<template>

  <MainLayout></MainLayout>
      <div>
        <div>

          <AboutSection></AboutSection>
          <div class="advantages">
            <div class="advantages__box">

              <div class="advantages__text">
                ну короче мы можем вам предоставить или сделать следующие пункты и тп
              </div>
              <div class="box_for_cards">
                <cardsAbout v-for="(card, index) in items" :card="card" :key="index"></cardsAbout>
              </div>
            </div>
          </div>
          <div class="services">
    <topServices></topServices>

          </div>
        </div>


    </div>



</template>

<script setup lang="ts">
import AboutSection from '@/components/home/AboutSection.vue';
import cardsAbout from '@/components/home/cardsAbout.vue';
import { ref } from 'vue';
import topServices from '@/components/home/topServices.vue';
import MainLayout from '@/layouts/MainLayout.vue';

const items = ref([
  {
    img: 'https://i.pinimg.com/736x/23/1c/6a/231c6a787a2f2d4756bc64bf43b1e915.jpg',
    title: 'мы делаем это',
    description: 'какая-то информация о том, что мы там предоставляем, днлаем и ид и тп ну ю ноу короче'
  },

  {
    img: 'https://i.pinimg.com/originals/50/2c/d4/502cd454e26e17d2e44550ecfdbd944e.jpg',
    title: 'и еще это',
    description: 'краткая информаия о том что мы делаем, но уже для этого пункта'

  },
  {
    img: 'https://i.pinimg.com/736x/c0/27/db/c027db5c0ef0ee96149626c8fa82375e.jpg',
    title: 'и это',
    description: 'еще одно описание того, чем мы занимаемся, что предоставляем'
  }
])
</script>

<style lang="scss" scoped>

.advantages {
  // background-color: rgb(208, 208, 237);
  width: 95%;
  max-height: 900px;
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
    width: 60%;
    line-height: 40px;
    font-weight: 600;
  }

}



.services {
  // background-color: red;
  width: 1200px;
  height: 550px;
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


}
</style>
