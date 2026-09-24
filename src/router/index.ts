import { createRouter, createWebHistory } from 'vue-router'
import CardApp from '../views/card-app/CardApp.vue'
import CardAppMain from '../views/card-app/CardAppMain.vue'
import Home from '../views/Home.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      meta: {title: '안내페이지'},
      component: Home,
    },    
    {
      path: '/cards',
      name: 'cards',
      meta: {title: '카드앱', desc: '카드앱 쇼케이스'},
      component: CardApp,
      children: [
        {
          path: '',
          name: 'cards/main',
          meta: {title: '카드앱', desc: '카드 조회 및 순서 편집'},
          component: CardAppMain,
        }
      ]
    },    
  ],
})

export default router
