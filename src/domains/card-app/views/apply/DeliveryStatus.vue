<!-- src/views/card-app/apply/DeliveryStatus.vue -->
<template>
    <div class="sub-page">
      <header class="page-header">
        <button @click="$vRouter.goBack" class="back-btn">⬅️</button>
        <h2>발급 상황 조회</h2>
      </header>
      <main class="page-content">
        <div class="status-timeline">
          <div class="step completed">1. 신청 완료 ✓</div>
          <div class="step completed">2. 심사 완료 ✓</div>
          <div class="step active">3. 카드 제작 및 배송 중 🚚</div>
          <div class="step">4. 배송 완료</div>
        </div>
      </main>
    </div>
  </template>
  
  <style scoped>
  .sub-page { padding: 20px; background: #f8f9fa; }
  .page-header { display: flex; align-items: center; gap: 15px; margin-bottom: 20px; }
  .back-btn { background: none; border: none; font-size: 20px; cursor: pointer; }
  .status-timeline { display: flex; flex-direction: column; gap: 15px; padding-left: 10px; }
  .step { padding: 10px; color: #999; font-weight: bold; }
  .step.completed { color: #4caf50; }
  .step.active { color: #1a73e8; border-left: 3px solId #1a73e8; padding-left: 7px; }
  </style>
  