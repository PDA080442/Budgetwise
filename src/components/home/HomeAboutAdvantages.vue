<template>
  <div class="advantages">
    <ul class="advantages__list">
      <li
        v-for="(advantage, index) in advantages"
        :key="index"
        :class="{ 'advantages__item--active': index === activeIndex }"
        class="advantages__item"
        @mouseenter="activeIndex = index"
      >
        {{ advantage }}
        <div v-if="index === activeIndex" class="advantages__tooltip">
          <div class="tooltip-triangle"></div>
          <div class="tooltip-box">Подготовка писем и анализ результатов рассылки</div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const advantages = ref<string[]>([
  'Разработка стратегии',
  'Верстка адаптивного шаблона',
  'Ежемесячное ведение рассылки',
  'Настройка триггерных кампаний',
  'Welcome серии писем и автоворонки',
])

const activeIndex = ref<number>(3)
</script>

<style lang="scss" scoped>
.advantages__list {
  list-style: none;
  margin: 0;
  padding: 0;
  margin-bottom: 30px;
}

.advantages__item {
  position: relative;
  padding: 12px 16px 12px 40px;
  border-radius: 12px;
  font-family: Montserrat, sans-serif;
  font-size: 16px;
  cursor: default;

  &::before {
    content: '✓';
    position: absolute;
    left: 16px;
    top: 50%;
    transform: translateY(-50%);
    font-weight: bold;
    color: #0066ff;
  }

  &:hover {
    background-color: #f5f5f5;
  }
}

.advantages__item--active {
  background: #ffffff;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

.advantages__tooltip {
  position: absolute;
  top: 50%;
  left: 60%;
  transform: translate(16px, -50%);
  display: flex;
  align-items: center;
}

.tooltip-triangle {
  width: 16px;
  height: 16px;
  background: #ffffff;
  transform: rotate(45deg);
  box-shadow: 13px 13px 38px rgba(230, 230, 230, 0.9);
  border-radius: 3px;
}

.tooltip-box {
  background: #ffffff;
  padding: 16px;
  margin-left: -4px;
  border-radius: 15px;
  box-shadow: 13px 13px 38px rgba(230, 230, 230, 0.9);
  font-size: 16px;
  font-family: Montserrat, sans-serif;
  line-height: 1.4;
}
</style>
