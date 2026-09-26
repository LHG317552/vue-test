import { createRouter, createWebHistory, type NavigationGuardNext, type RouteLocationNormalizedGeneric, type RouteLocationNormalizedLoadedGeneric } from 'vue-router';
import Home from '../views/Home.vue';

import { CreditCard } from '@lucide/vue';
import { CardAppRouters } from '../domains/card-app/router/index.js';
import CardApp from '../domains/card-app/views/CardApp.vue';

export type TRouterTo = RouteLocationNormalizedGeneric;
export type TRouterFrom = RouteLocationNormalizedLoadedGeneric;
export type TRouterNext = NavigationGuardNext;

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      meta: { title: '안내페이지' },
      component: Home,
    },    
    {
      path: '/card',
      name: 'card',
      component: CardApp,      
      meta: { title: '카드앱', desc: '금융권 카드앱 샘플페이지', icon: CreditCard, }, 
      redirect: { name: 'card/main' },
      children: CardAppRouters,
    },    
  ],
});

const isCardDomain = (to:TRouterTo, from: TRouterFrom) => {
  return to.matched[0]?.name === 'card' || from.matched[0]?.name === 'card'
}

router.beforeEach((to, from, next) => {    
  const currentBrowserPosition = window.history.state?.position || 0;  
  if (currentBrowserPosition < $vRouter.lastSavedPosition) {
    //  뒤로가기
    if (to.name === 'home') {
      $cardApp.transitionName.value = 'fade';
    } else if (isCardDomain(to, from)) {
      // 카드 도메인에서 뒤로가기 라우팅은 slide-left
      $cardApp.transitionName.value = 'slide-right';
      if (from.name === 'card/menu') {
        // 메뉴에서부터 한번 뒤로가기 처리되면 메뉴로 새로 라우팅 되기 전까지는 menuSkip
        $cardApp.menuSkip = true;
      } else if (to.name === 'card/menu') {
        // 메뉴로 뒤로갈때 menuSkip이면 한번 더 뒤로가고, return 처리
        if ($cardApp.menuSkip) {
          $vRouter.goBack();
          return;
        }
      }      
    }
  } else {
    // 라우팅
    if (to.name === 'home') {
      $cardApp.transitionName.value = 'fade';
    } else if (isCardDomain(to, from)){
      // 카드 도메인에서 신규 라우팅은 slide-left
      $cardApp.transitionName.value = 'slide-left';
      if (to.name === 'card/menu') {
        // 메뉴로 신규 라우팅 시에는 menuSkip 해제
        $cardApp.menuSkip = false;
      }
    }
  }            
  next();
});

router.beforeResolve((to, from, next) => {
  next();
});

router.afterEach((to, from) => {  
  $vRouter.lastSavedPosition = window.history.state?.position || 0;
});


export default router;

