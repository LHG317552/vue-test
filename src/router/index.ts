import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import CardApp from '../views/card-app/CardApp.vue';
import CardAppMain from '../views/card-app/CardAppMain.vue';
import CardAppMenu from '../views/card-app/CardAppMenu.vue';

// 💡 새롭게 추가될 메뉴 컴포넌트들을 임포트합니다. (프로젝트 구조에 맞게 경로를 조정하세요)
import CardInquiry from '../views/card-app/info/CardInquiry.vue';
import PaymentExpected from '../views/card-app/info/PaymentExpected.vue';
import LimitInquiry from '../views/card-app/info/LimitInquiry.vue';
import CreditCardApply from '../views/card-app/apply/CreditCardApply.vue';
import CheckCardApply from '../views/card-app/apply/CheckCardApply.vue';
import DeliveryStatus from '../views/card-app/apply/DeliveryStatus.vue';

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
      meta: { title: '카드앱', desc: '금융권 카드앱 샘플페이지' }, 
      redirect: { name: 'card/main' },
      children: [
        {
          path: 'main',
          name: 'card/main',
          meta: { title: '카드앱 메인'}, 
          component: CardAppMain,
        },
        {
          path: 'menu',
          name: 'card/menu',
          meta: { title: '카드앱 전체메뉴' }, 
          component: CardAppMenu,
        },
        
        // ==========================================
        // 1. 내 카드 정보 메뉴 그룹
        // ==========================================
        {
          path: 'inquiry',
          name: 'card/inquiry',
          meta: { title: '보유 카드 조회' },
          component: CardInquiry,
        },
        {
          path: 'payment-expected',
          name: 'card/payment-expected',
          meta: { title: '카드 결제 예정 금액' },
          component: PaymentExpected,
        },
        {
          path: 'limit-inquiry',
          name: 'card/limit-inquiry',
          meta: { title: '이용 한도 조회/증액' },
          component: LimitInquiry,
        },

        // ==========================================
        // 2. 카드 발급/신청 메뉴 그룹
        // ==========================================
        {
          path: 'apply-credit',
          name: 'card/apply-credit',
          meta: { title: '신용 카드 신청' },
          component: CreditCardApply,
        },
        {
          path: 'apply-check',
          name: 'card/apply-check',
          meta: { title: '체크 카드 신청' },
          component: CheckCardApply,
        },
        {
          path: 'delivery-status',
          name: 'card/delivery-status',
          meta: { title: '발급 상황 조회' },
          component: DeliveryStatus,
        },
      ]
    },    
  ],
});

router.beforeEach((to, _, next) => {  
  if (to.name === 'card/menu' && $vRouter.menuSkip) {
    $vRouter.goBack();
    return;
  }
  next();
});

export default router
