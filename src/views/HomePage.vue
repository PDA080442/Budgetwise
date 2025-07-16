<template>
  <NewLayout>
    <div>
      <div>
        <HomeAboutSection></HomeAboutSection>
        <BalanceView />
        <HomeAdvantages />
        <div class="services">
          <HomeTopServices></HomeTopServices>
        </div>
      </div>
    </div>
  </NewLayout>
</template>

<script setup lang="ts">
import HomeAboutSection from '@/components/Home/HomeAboutSection.vue'

import HomeTopServices from '@/components/Home/HomeTopServices.vue'
import NewLayout from '@/layouts/NewLayout.vue'
import BalanceView from '@/components/Homepage/BalanceView.vue'
import HomeAdvantages from '@/components/Home/HomeAdvantages.vue'
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
