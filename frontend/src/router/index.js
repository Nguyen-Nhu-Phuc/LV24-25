import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Recognition from '../views/Recognition.vue'
import gameDetail from '../views/gameDetail.vue'
import Footer from '../components/Footer.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/recognition',
      name: 'recognition',
      component: Recognition
    },
    {
      path: '/gameDetail/:id', // Nhận tham số id từ URL
      name: 'gameDetail',
      component: gameDetail,
      props: true // Để tự động truyền id vào props của component
    },
    {
      path: '/footer',
      name: 'footer',
      component: Footer
    }
  ]
})

export default router