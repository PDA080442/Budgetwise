<template>

  <div class="box">
    <div class="about">
    <div class="about__fashions">
      <h1 class="header">наименование услуг</h1>
    </div>
    <div class="box_image">
      <img src="C:\Users\kiras\Downloads\Иллюстрация.png" alt="программист с ноутбуком" class="image">
    </div>
  </div>

  <div class="advantages">

  </div>

  </div>
  <div class="services">

  </div>
</template>

<script setup lang="ts">

</script>

<style lang="scss" scoped>
.about {

  background-color: rgb(208, 208, 237);
  width: 100%;
  height: 480px;
  margin-top: 50px;
  margin-left: auto;
  margin-right: auto;
  display: flex;
  gap: 20px;

  &__fashions {
    background-color: green;
    width: 55%;
    height: 85%;
    border-radius: 20px;
  }
}
.box_image {
  width: 45%;
}
.image {
    width: 95%;

}


.advantages {
  background-color: rgb(208, 208, 237);
  width: 95%;
  height: 490px;
  margin-top: 50px;
  margin-left: auto;
}

.services {
  background-color: rgb(208, 208, 237);
  width: 900px;
  height: 400px;
  margin-top: 100px;
  margin-left: auto;
  margin-right: auto;
}
.header {
  font-size: 50px;


}
</style>
