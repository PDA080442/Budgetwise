<template>
  <div class="advantages">
    <div class="advantages__box">
      <h2 class="advantages__title">
        Email рассылка для интернет магазинов<br />
        в чем преимущества?
      </h2>
      <div class="advantages__cards">
        <CardsAbout v-for="(card, index) in items" :key="index" :card="card" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import CardsAbout from '@/components/Home/HomeCardsAbout.vue'
import { homecarditems, type HomeCardsItems } from '@/mocks/HomeMocks/CardItemsMocks'

const items = ref<HomeCardsItems[]>(homecarditems)
</script>

<style lang="scss" scoped>
.advantages {
  width: 100%;
  margin: 100px 0 0;
  padding: 0;
  height: 700px;
}

.advantages__box {
  position: relative;
  background-color: #f3f3f3;
  border-radius: 30px 0 0 30px;
  height: 500px;
  padding: 80px 0 60px 130px;
}

.advantages__title {
  font-family: 'Montserrat', sans-serif;
  font-size: 36px;
  font-weight: 600;
  line-height: 40px;
  color: #2e2e2e;
  margin: 0 0 50px 0;
}

.advantages__cards {
  position: absolute;
  margin-top: 90px;
  display: flex;
  gap: 30px;
  justify-content: flex-start;
  margin: 0;
}
</style>
