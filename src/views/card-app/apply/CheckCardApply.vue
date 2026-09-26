<!-- src/views/card-app/apply/CreditCardApply.vue -->
<template>
    <div class="sub-page">
      <header class="page-header">
        <button @click="$vRouter.goBack" class="back-btn">⬅️</button>
        <h2>신용 카드 신청</h2>
      </header>
      <main class="page-content">
        <p class="info-text">원하시는 신용카드 상품을 선택해 주세요.</p>
        <div class="product-card">✨ 초이스 신용카드 (연회비 무제한 캐시백)</div>
        <div class="product-card">✈️ 스카이패스 마일리지 카드</div>
      </main>
    </div>
  </template>
  
  <style scoped>  
  .page-header { display: flex; align-items: center; gap: 15px; margin-bottom: 20px; }
  .back-btn { background: none; border: none; font-size: 20px; cursor: pointer; }
  .info-text { margin-bottom: 15px; color: #666; }
  .product-card { background: white; padding: 20px; border-radius: 8px; margin-bottom: 12px; border: 1px solId #ddd; }
  </style>
  