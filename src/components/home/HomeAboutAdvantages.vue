<template>
  <div class="content">
    <div class="box2">
      <div class="advantages__list">
        <ul class="advantages__list__box" v-for="(advantage, index) in advantages" :key="index">
          <div class="liBox">
            <li class="advantage">
              <div>{{ advantage }}</div>
            </li>
          </div>
        </ul>
      </div>
    </div>
    <div>
      <div class="message">
        <div class="box_message">
          <div class>в нашей компании вы сможете сделать/получить тото тоьто и nl b ng</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const advantages = ref([
  'делаем это для того',
  'делаем то, чтобы работало это',
  'занимаемся этим',
  'вааававвавав',
  'ааававааааапрпр',
])
</script>

<style lang="scss" scoped>
.content {
  display: flex;
  justify-content: space-between;
}

.advantages {
  &__list {
    font-size: 18px;
    font-family: Montserrat;
    display: inline-block;
    width: 100%;

    li ::before {
      content: '✓';
      margin-right: 20px;
    }

    &__box {
      max-width: 275px;
      min-width: 265px;

      .advantage {
        list-style: none;
        padding: 7px;
        max-width: 500px;
        min-width: 295px;

        &:hover {
          background-color: rgb(234, 232, 232);
          border-radius: 15px;
          border: 2px;
        }
      }
    }
  }
}

.box2 {
  gap: 10px;
  width: 100%;
}

.message {
  width: 250px;
  min-width: 250px;
  min-height: 150px;
  height: fit-content;
  background-color: rbg(250 250 250);
  display: flex;
  border-radius: 15px;
  box-shadow: 13px 13px 38px rgba(230, 230, 230, 0.9);
}

.traingle {
  width: 30px;
  height: 30px;
  background-color: white;
  transform: rotate(45deg);
  border-radius: 5px;
  display: flex;
  position: absolute;
  margin-top: 130px;
  margin-left: 35px;
  z-index: 2;
}

.box_message {
  padding: 30px;
  max-width: 260px;
  word-break: break-all;
}
</style>
