<template>
    <v-card class="fact-card">
        <transition name="fade" mode="out-in">
            <v-card-title class="fact-title">{{ currentFact.title }}</v-card-title>
        </transition>

        <v-row>
            <v-col cols="12" md="6" sm="6">
                <transition name="fade" mode="out-in">
                    <v-card-text :key="currentFact.text" class="fact-text">
                        {{ currentFact.text }}
                    </v-card-text>
                </transition>
            </v-col>

            <v-col cols="12" md="6" sm="6" class="d-flex justify-center">
                <transition name="fade" mode="out-in">
                    <v-img :key="currentFact.img" :src="currentFact.img" height="180px" max-width="240px" cover
                        class="fact-image"></v-img>
                </transition>
            </v-col>
        </v-row>

        <v-btn @click="showNextFact" color="primary" append-icon="mdi-cached" class="mt-2 next-btn">
            Другой факт
        </v-btn>
    </v-card>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { faqfact, type FaqFact } from '@/mocks/FaqMocks/FaqFactMocks';

const currentIndex = ref(0);
const currentFact = ref<FaqFact>(faqfact[0]);

const showNextFact = () => {
    currentIndex.value = (currentIndex.value + 1) % faqfact.length;
    currentFact.value = faqfact[currentIndex.value];
};
</script>

<style lang="scss" scoped>
.fact-card {
    max-width: 750px;
    margin: auto;
    padding: 24px;
    background-color: rgb(255, 255, 255);
    min-height: 400px;
    position: relative;

    .fact-title {
        min-height: 70px;
        display: flex;
        font-size: 1.8rem !important;
        font-weight: 700 !important;
        color: #2c3e50;
        margin-bottom: 20px;
        text-align: center;
    }

    .fact-text {
        min-height: 150px;
        font-size: 1.2rem !important;
        line-height: 1.5;
        color: #34495e;
        text-align: justify;
        text-indent: 1.5em;
        /* Красная строка */
        padding-right: 16px;
    }

    .fact-image {
        border-radius: 8px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        transition: transform 0.3s ease;

        &:hover {
            transform: scale(1.05);
        }
    }

    .next-btn {
        position: absolute;
        bottom: 24px;
        left: 50%;
        transform: translateX(-50%);
        font-size: 1.1rem;
        padding: 10px 24px;
    }
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>