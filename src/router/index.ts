import { createRouter, createWebHistory } from 'vue-router'
import CardApp from '../views/CardApp.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/cards',
      name: 'cards',
      meta: {title: '카드앱', desc: '카드 조회 및 순서 편집'},
      component: CardApp,
    },    
  ],
})

export default router
