import CardAppMain from '../views/CardAppMain.vue';
import CardAppMenu from '../views/CardAppMenu.vue';

// 💡 새롭게 추가될 메뉴 컴포넌트들을 임포트합니다. (프로젝트 구조에 맞게 경로를 조정하세요)
import CardInquiry from '../views/info/CardInquiry.vue';
import PaymentExpected from '../views/info/PaymentExpected.vue';
import LimitInquiry from '../views/info/LimitInquiry.vue';
import CreditCardApply from '../views/apply/CreditCardApply.vue';
import CheckCardApply from '../views/apply/CheckCardApply.vue';
import DeliveryStatus from '../views/apply/DeliveryStatus.vue';
import type { NavigationGuardNext, RouteLocationNormalizedGeneric, RouteLocationNormalizedLoadedGeneric } from 'vue-router';
import type { TRouterFrom, TRouterNext, TRouterTo } from '../../../router/index.js';

export const CardAppRouters = [
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
  ];