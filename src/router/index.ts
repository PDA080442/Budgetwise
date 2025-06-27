import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'



// TODO: Разбить роуты на модули
const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/HomePage.vue'),
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('@/views/RegisterPage.vue'),
  },
  {
    path: '/entrance',
    name: 'Entrance',
    component: () => import('@/views/EntrancePage.vue'),
  },

  {
    path: '/tttt',
    name: 'Tttt',
    component: () => import('@/views/Tttt.vue'),
  },
  // {
  //   path: '/home',
  //   name: 'Home',
  //   component: () => import('@/views/HomePage.vue'),
  // },
  // {
  //   path: '/upcoming',
  //   name: 'Upcoming',
  //   component: () => import('@/views/UpcomingPage.vue'),
  // },
  // {
  //   path: '/today',
  //   name: 'Today',
  //   component: () => import('@/views/TodayPage.vue'),
  // },
  // {
  //   path: '/calendar',
  //   name: 'Calendar',
  //   component: () => import('@/views/CalendarPage.vue'),
  // },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
