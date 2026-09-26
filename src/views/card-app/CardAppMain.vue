<template>
<!-- <transition appear :name="isEditMode ? 'slide-up' : 'slide-down'" :key="String(isEditMode)" mode="out-in">
</transition>   -->
<div class="card-app-main-container" :class="{'edit-mode': isEditMode}">
  <section v-if="!isEditMode" class="welcome-section">
    <p class="welcome-copy">오늘도 알뜰한 카드생활</p>
    <div class="welcome-row"><h1>내 카드</h1><button class="wallet-link" type="button">카드 관리 <span>›</span></button></div>
  </section>
  <!-- 상단 헤더 -->
  <div class="wallet-header">
    <span class="header-title">{{ isEditMode ? '빠른 실행 편집' : '카드 스와이프' }}</span>
    <button class="edit-toggle-btn" @click="toggleMode">
      {{ isEditMode ? '완료' : '편집' }}
    </button>
  </div>

  <!-- 1. 조회용 모드 (가로 Swiper) -->
  <div v-if="!isEditMode" class="swiper-view-wrapper">
    <Swiper
      :slides-per-view="1"
      :space-between="16"
      :pagination="{ clickable: true }"
      :modules="swiperModules"
      class="card-swiper"
    >
      <SwiperSlide v-for="card in cards" :key="card.id">
        <div class="pay-card" :style="{ background: card.gradient }">
          <div class="card-brand">{{ card.brand }}</div>
          <div class="card-number">•••• •••• •••• {{ card.lastFour }}</div>
        </div>
      </SwiperSlide>
    </Swiper>
  </div>

  <!-- 2. 순서변경 모드 (세로 Stacked 롱프레스 드래그) -->
  <StackedCardSlider v-else v-model="cards" :height="height" :card-height="200">
    <template #default="{ card }">
      <div class="pay-card" :style="{ background: card.gradient }">      
        <div class="card-brand">{{ card.brand }}</div>
        <div class="card-number">•••• {{ card.lastFour }}</div>
      </div>
    </template>
  </StackedCardSlider>
  <template v-if="!isEditMode">
    <section class="benefit-summary">
      <div><p>이번 달 카드 이용금액</p><strong>1,284,000<span>원</span></strong></div>
      <button type="button" class="summary-arrow" aria-label="이용금액 상세보기">›</button>
    </section>
    <section class="quick-menu-section">
      <h2>자주 찾는 메뉴</h2>
      <div class="quick-menu-grid">
        <button type="button"><span class="quick-icon icon-card">▰</span>이용내역</button>
        <button type="button"><span class="quick-icon icon-pay">₩</span>즉시결제</button>
        <button type="button"><span class="quick-icon icon-benefit">◎</span>혜택</button>
        <button type="button"><span class="quick-icon icon-customer" @click="$vRouter.push({name: 'card/inquiry'})">?</span>고객센터</button>
      </div>
    </section>
    <section class="event-banner">
      <div><span>카드 혜택</span><strong>나에게 딱 맞는<br />이번 달 혜택을 확인하세요</strong></div>
      <span class="banner-card">카드앱</span>
    </section>
  </template>
  <nav v-if="!isEditMode" class="bottom-nav" aria-label="하단 메뉴">
    <button type="button" class="is-active"><span>⌂</span>홈</button><button type="button"><span>▣</span>금융</button><button type="button"><span>◈</span>혜택</button><button type="button"><span>♙</span>MY</button>
  </nav>
</div>
</template>
  
<script setup lang="ts">
  import { ref } from 'vue';
  import { Swiper, SwiperSlide } from 'swiper/vue';
  import { Pagination } from 'swiper/modules';
  import 'swiper/css';
  import 'swiper/css/pagination';
  import StackedCardSlider from '../../components/card-app/StackedCardSlider.vue';
  
  interface Card {
    id: number
    brand: string
    lastFour: string
    gradient: string
  }

  const height = ref<number>(window.innerHeight - 300);
  const swiperModules = [Pagination];
  const isEditMode = ref<boolean>(false);
  
  // 삼성페이 느낌의 그라데이션 카드 데이터
  const cards = ref<Card[]>([
    { id: 1, brand: 'IBK i-ALL 카드', lastFour: '1234', gradient: 'linear-gradient(135deg, #0d4ca3, #1672cf)' },
    { id: 2, brand: 'IBK i-ALL 체크카드', lastFour: '5678', gradient: 'linear-gradient(135deg, #1857a6, #4bb6e8)' },
    { id: 3, brand: 'IBK B-RETAIL 카드', lastFour: '9012', gradient: 'linear-gradient(135deg, #152b57, #315b9f)' },
    { id: 4, brand: 'IBK B-F&B 카드', lastFour: '3456', gradient: 'linear-gradient(135deg, #0a685e, #25a493)' },
    { id: 5, brand: 'IBK I-포켓몬 체크카드', lastFour: '7890', gradient: 'linear-gradient(135deg, #f4c12d, #ed7a35)' },
    { id: 6, brand: 'IBK 국민행복카드', lastFour: '2468', gradient: 'linear-gradient(135deg, #7a51b5, #bd78ca)' },
  ])
  
  const toggleMode = () => {
    isEditMode.value = !isEditMode.value;  
  }
  </script>
  
  <style scoped>  
  .card-app-main-container {
    padding: 0 20px 102px;
  }
  .welcome-section { padding: 14px 2px 2px; }
  .welcome-copy { margin: 0 0 4px; color: #697586; font-size: 13px; }
  .welcome-row { display: flex; align-items: center; justify-content: space-between; }
  .welcome-row h1 { margin: 0; font-size: 27px; letter-spacing: -1.6px; }
  .wallet-link { border: 0; background: transparent; color: #697586; font-size: 13px; cursor: pointer; }
  .wallet-link span { font-size: 19px; vertical-align: -1px; }
  
  .wallet-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 20px 0 12px;
  }
  
  .header-title {
    font-size: 0.95rem;
    font-weight: 700;
    letter-spacing: -0.5px;
    color: #354052;
  }
  
  .edit-toggle-btn {
    background: #e9effb;
    border: 0;
    color: #2454a6;
    padding: 7px 13px;
    border-radius: 30px;
    font-size: 0.85rem;
    font-weight: 700;
    cursor: pointer;
  }
  
  /* 1. 조회 모드 (기본 카드 레이아웃) */
  .swiper-view-wrapper {
    padding: 0;
  }
  .card-swiper {
    width: 100%;
    padding-bottom: 34px;
  }
  
  .pay-card {
    height: 200px;
    border-radius: 20px;
    padding: 24px;
    position: relative;
    box-sizing: border-box;
    box-shadow: 0 11px 22px rgba(28, 50, 92, 0.18);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    user-select: none;
  }
  
  .card-brand {
    font-size: 1.1rem;
    font-weight: bold;
    letter-spacing: -0.3px;
  }
  
  .card-number {
    font-size: 1.05rem;
    letter-spacing: 2px;
    opacity: 0.85;
  }
  
  .benefit-summary { display: flex; align-items: center; justify-content: space-between; margin: 0 -2px 22px; padding: 18px 19px; border-radius: 17px; background: #fff; box-shadow: 0 5px 18px rgba(34, 59, 99, .06); }
  .benefit-summary p { margin: 0 0 5px; color: #6b7685; font-size: 13px; }
  .benefit-summary strong { font-size: 21px; letter-spacing: -.8px; }
  .benefit-summary strong span { margin-left: 2px; font-size: 14px; font-weight: 600; }
  .summary-arrow { border: 0; background: transparent; color: #8c96a5; font-size: 28px; cursor: pointer; }
  .quick-menu-section { margin-bottom: 24px; }
  .quick-menu-section h2 { margin: 0 0 14px; font-size: 17px; letter-spacing: -.8px; }
  .quick-menu-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 8px; }
  .quick-menu-grid button { display: flex; flex-direction: column; align-items: center; gap: 8px; padding: 0; border: 0; background: transparent; color: #3e4857; font-size: 12px; cursor: pointer; }
  .quick-icon { width: 47px; height: 47px; display: grid; place-items: center; border-radius: 16px; font-size: 21px; font-weight: 700; }
  .icon-card { background: #e7efff; color: #2460c9; }.icon-pay { background: #e8f7f3; color: #13836f; }.icon-benefit { background: #fff2de; color: #df8b17; }.icon-customer { background: #f0ebff; color: #7658bd; }
  .event-banner { display: flex; justify-content: space-between; align-items: center; min-height: 96px; padding: 0 19px; border-radius: 18px; background: linear-gradient(110deg, #183d8d, #2867ca); color: #fff; overflow: hidden; }
  .event-banner span { display: block; margin-bottom: 6px; color: #bcd7ff; font-size: 12px; }.event-banner strong { font-size: 16px; line-height: 1.35; letter-spacing: -.7px; }
  .banner-card { display: grid !important; place-items: center; width: 68px; height: 44px; margin: 0 !important; border-radius: 8px; background: linear-gradient(135deg, #7dd0f3, #d5f0f9); color: #135094 !important; font-size: 15px !important; font-weight: 800; transform: rotate(-12deg); }
  .bottom-nav { position: fixed; z-index: 10; bottom: 0; left: 50%; display: flex; width: min(480px, 100%); height: 72px; padding: 9px 20px 8px; box-sizing: border-box; justify-content: space-between; transform: translateX(-50%); border-top: 1px solid #edf0f5; background: rgba(255,255,255,.96); backdrop-filter: blur(10px); }
  .bottom-nav button { display: flex; flex-direction: column; align-items: center; gap: 3px; min-width: 45px; border: 0; background: transparent; color: #8b95a4; font-size: 10px; cursor: pointer; }.bottom-nav span { font-size: 21px; line-height: 23px; }.bottom-nav .is-active { color: #1958be; font-weight: 700; }
  .edit-mode { position: fixed; width: 100%; top: 0; z-index: 200000; background: white; }
  </style>
  