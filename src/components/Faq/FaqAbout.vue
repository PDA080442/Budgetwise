<template>
    <v-row dense class="align-center">
        <v-col cols="12" md="8" sm="8">
            <v-card class="card">
                <v-card-title class="title">{{ items[0].title }}</v-card-title>
                <v-card-text class="content">{{ items[0].text }}</v-card-text>
            </v-card>
        </v-col>

        <v-col cols="12" md="4" sm="4" class="d-flex justify-center">
            <v-img :src="items[0].img" height="300px" contain class="mt-2" alt="">
            </v-img>
        </v-col>
    </v-row>
</template>


<script lang="ts" setup>
import { topfaq, type TopFaq } from '@/mocks/FaqMocks/FaqMocks';
import { ref } from 'vue';

const items = ref<TopFaq[]>(topfaq)

</script>

<style lang="scss" scoped>
.card {
    background-color: rgba(231, 255, 255, 0.763);
    text-align: center;
    border-radius: 20px;
    margin: 30px;
    margin-left: 60px;
    font-family: 'Montserrat';

    .title {
        white-space: normal;
        word-wrap: break-word;
        padding: 16px;
        line-height: 1.5;
        font-weight: 600;
        font-size: 1.7rem;
    }

    .content {
        font-size: 1.4rem;
        line-height: 1.6;
        padding: 0 16px 16px;
    }
}
</style>
