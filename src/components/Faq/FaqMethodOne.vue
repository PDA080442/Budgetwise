<template>
<v-container class="container">
            <h1 class="title">{{ item[0].title }}</h1>
            <v-text class="content">{{ item[0].text }}</v-text><br><br>
            <v-text class="content">{{ item[0].content }}</v-text>

            <v-row dense class="align-center">
                <v-col cols="12" md="9" sm="8">
                    <v-card class="card">
                        <v-list lines="two" class="jugs-list">
                            <v-list-item v-for="(itemlist, index) in itemlist" :key="index" class="jugs-item text-left">
                                <template v-slot:prepend>
                                    <v-chip color="primary" class="mr-2 mr-sm-4">{{ index + 1 }}</v-chip>
                                </template>

                                <v-list-item-title class="text-wrap text-h5">
                                    <strong>{{ itemlist.percentage }} – {{ itemlist.title }}.</strong>
                                </v-list-item-title>

                                <v-list-item-subtitle class="text-wrap text-body-1">
                                    {{ itemlist.description }}
                                </v-list-item-subtitle>
                            </v-list-item>
                        </v-list>
                    </v-card>
                </v-col>

                <v-col cols="12" md="3" sm="4" class="d-flex justify-center">
                    <v-img :src="item[0].img" height="300px" contain class="mt-2" alt="">
                    </v-img>
                </v-col>

            </v-row>

            <v-text class="content">{{ item[0].content2 }}</v-text><br><br>
            <v-text class="content">{{ item[0].content3 }}</v-text><br><br>
            <v-text class="content">{{ item[0].content4 }}</v-text>

        </v-container>

</template>

<script lang="ts" setup>
import { faq1, type Faq1, faqlist, type FaqList } from '@/mocks/FaqMocks/FaqMocks';
import { ref } from 'vue';


const item = ref<Faq1[]>(faq1)

const itemlist = ref<FaqList[]>(faqlist)
</script>

<style lang="scss">

.title {
    white-space: normal;
    word-wrap: break-word;
    padding: 16px;
    line-height: 1.5;
    font-weight: 600;
}

.content {
    font-size: 1.4rem;
    line-height: 1.6;
    padding: 0 16px 16px;
    text-align: center;
}

.container {
    margin: 50px;
}

.list {
    font-size: 1.1rem;
    font-family: 'Montserrat';

}

.jugs-container {
    max-width: 800px;
    margin: 0 auto;
}

.jugs-list {
    background: transparent;
}

.jugs-item {
    align-items: start;
    padding: 12px 0;
    margin-bottom: 8px;
}

@media (max-width: 600px) {
    .jugs-item {
        padding: 8px 0;
    }

    :deep(.v-chip) {
        height: 24px !important;
        width: 24px !important;
        font-size: 12px !important;
    }
}

.text-wrap {
    word-wrap: break-word;
    overflow-wrap: break-word;
    white-space: normal;
}

.card {
    background-color: rgba(231, 255, 255, 0.362);
    text-align: center;
    border-radius: 20px;
    margin: 30px;
    font-family: 'Montserrat';
}
</style>