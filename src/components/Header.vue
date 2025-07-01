<template>
<!-- <v-container class="text"> Header bfghfgnbfxcfx</v-container> -->
    <header class="l-header-container">
        <!-- <v-layout justify-center align-center> -->
            <div class="nav">


                <v-flex>
                    <v-text-field v-model="search"
                                label="Поиск"
                                append-icon="search"
                                class="search-field">
                    </v-text-field>
                </v-flex>
    
                <a href="#"> Главная</a>
                <a href="#"> Финансы</a>
                <a href="#"> Вопросы</a>
                <a href="#"> О нас</a>
                

                <v-flex >
                    <template v-slot:activator="{ props: activatorProps }">
                        <v-btn
                            prepend-icon="mdi-calendar" 
                            size="small"
                            v-bind="activatorProps"
                        >
                            <v-card class="mx-auto" max-width="328" rounded="lg" border>
                                <v-confirm-edit v-model="date">
                                <template v-slot:default="{ model: proxyModel, actions }">
                                    <v-date-picker v-model="proxyModel.value">
                                    <template v-slot:actions>
                                        <component :is="actions"></component>
                                    </template>
                                    </v-date-picker>
                                </template>
                                </v-confirm-edit>
                            </v-card>                  
                    
                    
                        </v-btn>
                    </template>
                    <!-- <v-col cols="auto">
                        <v-btn icon="mdi-calendar" size="small"></v-btn>
                    </v-col> -->
                </v-flex>

                <v-flex >
                    <v-col cols="auto">
                        <v-btn icon="mdi-account" size="small"></v-btn>
                    </v-col>
                </v-flex>
            
            </div>
        <!-- </v-layout> -->
    </header>
</template>

<script lang="ts">
import { defineComponent, shallowRef, ref } from 'vue'

  
export default defineComponent ({
    name: 'Header',
        setup() {
            const date = shallowRef();
            return {
                date
            }
        },
        data () {
        return {
            search: '',
            status: '',
            // statusItems: [
            //   'All', 'Approved', 'Denied', 'Waiting', 'Writing', 'Editing'
            // ]
        }
        }

    //   }  
})
</script>

<style>
.nav {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #0171bc;
    font-family: 'Montserrat', sans-serif;
    color: aliceblue;
    max-width: 100%;
    
}
.nav a{
    font-size: 25px;
}
</style>
