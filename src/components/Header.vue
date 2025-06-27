<template>
<!-- <v-container class="text"> Header bfghfgnbfxcfx</v-container> -->
    <header class="l-header-container">
        <v-layout justify-center align-center>
            <div class="nav">
                <v-flex>
                    <v-text-field v-model="search"
                                label="Поиск"
                                append-icon="search"
                                class="search-field">
                    </v-text-field>
                </v-flex>
    
                <a href="#" class="white lighten-1 white--text"> Home</a>
                <a href="#"> Add</a>
                
                <v-flex >
                    <v-btn block color="white lighten-1 white--text">
                        <v-icon left>mdi-account</v-icon>
                    </v-btn>
                </v-flex>
            </div>
        </v-layout>
    </header>
</template>



<script lang="ts">
import { defineComponent } from 'vue'
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

export default defineComponent ({
    name: 'Header',

    data () {
      return {
        search: '',
        status: '',
        statusItems: [
          'All', 'Approved', 'Denied', 'Waiting', 'Writing', 'Editing'
        ]
      }
    }
})
</script>



<style >

.nav {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #0171bc;
    font-family: 'Montserrat', sans-serif;
    color: aliceblue;
    font-size: 30px;
    margin-top: none;
    margin-bottom: none;
    /* min-width: 100%; */
    width: 1470;
    
}
</style>