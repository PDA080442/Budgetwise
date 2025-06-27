<template>
<!-- <v-container class="text"> Header bfghfgnbfxcfx</v-container> -->
<div class="nav">
    <a href="#"> Home</a>
    <a href="#"> Add</a>
    <a href="#"> Sallary</a>
    <a href="#"> Budget</a>
    <a href="#"> BlaBla</a>
</div>
</template>



<script lang="ts">
import { defineComponent } from 'vue'
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

export default defineComponent ({
    name: 'Header'
})
</script>



<style >

.nav {
    background-color: #0171bc;
    font-family: 'Montserrat', sans-serif;
    font-size: 30px;
    margin-top: none;
    margin-bottom: none;
}
</style>