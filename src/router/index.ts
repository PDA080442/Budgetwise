import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'

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
  // {
  //   path: '/login',
  //   name: 'Login',
  //   component: () => import('@/views/LoginPage.vue'),
  // },
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
