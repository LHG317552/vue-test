<!-- src/views/card-app/info/PaymentExpected.vue -->
<template>
    <div class="sub-page">
      <header class="page-header">
        <button @click="$vRouter.goBack" class="back-btn">⬅️</button>
        <h2>카드 결제 예정 금액</h2>
      </header>
      <main class="page-content">
        <div class="amount-box">
          <p class="label">다음 달 결제 예정 금액</p>
          <h3 class="amount">1,054,545 원</h3>
        </div>
      </main>
    </div>
  </template>
  
  <style scoped>
  .sub-page { padding: 20px; background: #f8f9fa; }
  .page-header { display: flex; align-items: center; gap: 15px; margin-bottom: 20px; }
  .back-btn { background: none; border: none; font-size: 20px; cursor: pointer; }
  .amount-box { background: #e8f0fe; padding: 25px; border-radius: 12px; text-align: center; }
  .label { color: #555; margin-bottom: 5px; }
  .amount { color: #1a73e8; font-size: 24px; margin: 0; }
  </style>
  