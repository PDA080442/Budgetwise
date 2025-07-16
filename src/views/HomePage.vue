<template>
  <NewLayout>
      <div>
        <HomeAboutSection></HomeAboutSection>
        <BalanceView />
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
          <HomeTopServices></HomeTopServices>
        </div>
      </div>
  </NewLayout>
</template>

<script setup lang="ts">
import HomeAboutSection from '@/components/Home/HomeAboutSection.vue'
import CardsAbout from '@/components/Home/HomeCardsAbout.vue'
import { ref } from 'vue'
import HomeTopServices from '@/components/Home/HomeTopServices.vue'
import NewLayout from '@/layouts/NewLayout.vue'
import { homecarditems, type HomeCardsItems } from '@/mocks/HomeMocks/CardItemsMocks'
import BalanceView from '@/components/Homepage/BalanceView.vue'

const items = ref<HomeCardsItems[]>(homecarditems)
</script>

<style lang="scss" scoped>
.advantages {
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
  width: 1200px;
  height: 550px;
  margin-top: 100px;
  margin-left: auto;
  margin-right: auto;
}

.box_for_cards {
  width: 100%;
  height: 100%;
  margin-top: 50px;
  display: flex;
  gap: 28px;
}
</style>
