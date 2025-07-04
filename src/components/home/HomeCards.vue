<template>
  <div>
    <div>
      <div class="card" v-for="i in 3" :key="i">
        <div class="card__img"></div>

        <div>sdfsdfsdfsdf</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// images [

// ]
</script>

<style scoped>
.card {
  width: 310px;
  height: 400px;
  background-color: white;
  border-width: 3px;
  border-style: solid;
  display: inline-block;
  display: flex;
  flex-direction: column;
  border-radius: 40px;
  box-shadow: 15px 15px 38px rgba(230, 230, 230, 0.9);

  &__img {
    border: 1px solid red;
    margin: 20px auto;
    width: 200px;
    height: 200px;
    background: url('/@fs/C:/Users/kiras/Downloads/%D0%98%D0%BB%D0%BB%D1%8E%D1%81%D1%82%D1%80%D0%B0%D1%86%D0%B8%D1%8F.png');
    background-size: cover;
  }
}
</style>
