<template>
    <header class="l-header-container">
        <v-layout align-center justify-space-between>
            <div class="nav">
                <v-flex>
                    <v-text-field class="search"  min-width="250" :hide-details="true" density="compact" v-model="search" label="Поиск">
                    </v-text-field>
                </v-flex>

                <v-flex>
                    <div class="d-flex">
                        <template v-for="item in navItems">
                            <RouterLink :to="item.href">{{ item.name }}</RouterLink>
                        </template>
                    </div>
                </v-flex>

                <v-flex>
                    <v-col cols="auto">
                        <v-btn @click.prevent="confirmLogout" icon="mdi-account" color="blue" size="small">
                        </v-btn>

                    </v-col>
                </v-flex>
            </div>
        </v-layout>

        <v-dialog v-model="logoutDialog" max-width="400">
            <v-card>
                <v-card-title class="text-h5">
                    Подтверждение
                </v-card-title>
                <v-card-text>
                    Вы точно хотите выйти из аккаунта?
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="grey" @click="logoutDialog = false">
                        Нет
                    </v-btn>
                    <v-btn color="primary" @click="performLogout">
                        Да
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </header>
</template>


<script setup lang="ts">
import { ref, shallowRef } from 'vue';
import { useRouter } from 'vue-router';

const date = shallowRef();
const router = useRouter();

const logoutDialog = ref(false);

const navItems = ref([
    {
        name: 'Главная',
        href: '/'
    },
    {
        name: 'Финансы',
        href: '/finance'
    },
    {
        name: 'О нас',
        href: '/about'
    },


])


const search = ref('')


const confirmLogout = () => {
    logoutDialog.value = true;
};

const performLogout = () => {

    localStorage.removeItem('accessToken'); //AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA sprosi
    localStorage.removeItem('refreshToken');
    
    logoutDialog.value = false;
    router.push({ name: 'Entrance' });
};
</script>

<style lang="scss" scoped>
.nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #0171bc;
    font-family: 'Montserrat', sans-serif;
    width: 100%;

    a {
        font-size: 25px;
        color: white;
        text-decoration: none;
        padding: 8px 16px;
        border-radius: 4px;
        transition: background-color 0.5s;
        
        &:hover {
            background-color: rgba(255, 255, 255, 0.1);
        }

        &.router-link-active, &.router-link-exact-active {
            background-color: rgba(255, 255, 255, 0.2);
            font-weight: bold;
        }
    }
}
.search {
    color: white;
}
</style>


