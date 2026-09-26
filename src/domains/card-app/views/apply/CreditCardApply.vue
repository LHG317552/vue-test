<!-- src/views/card-app/apply/CheckCardApply.vue -->
<template>
    <div class="sub-page">
      <header class="page-header">
        <button @click="$vRouter.goBack" class="back-btn">⬅️</button>
        <h2>체크 카드 신청</h2>
      </header>
      <main class="page-content">
        <p class="info-text">연회비 없는 실속형 체크카드 라인업입니다.</p>
        <div class="product-card">🌱 그린 체크카드 (대중교통 할인)</div>
        <div class="product-card">🎮 넥슨 메이플스토리 체크카드</div>
      </main>
    </div>
  </template>
  
  <style scoped>
  .sub-page { padding: 20px; background: #f8f9fa; }
  .page-header { display: flex; align-items: center; gap: 15px; margin-bottom: 20px; }
  .back-btn { background: none; border: none; font-size: 20px; cursor: pointer; }
  .info-text { margin-bottom: 15px; color: #666; }
  .product-card { background: white; padding: 20px; border-radius: 8px; margin-bottom: 12px; border: 1px solId #ddd; }
  </style>
  