<!-- src/views/card-app/info/CardInquiry.vue -->
<template>
    <div class="sub-page">
      <header class="page-header">
        <button @click="$vRouter.goBack" class="back-btn">⬅️</button>
        <h2>보유 카드 조회</h2>
      </header>
      <main class="page-content">
        <div class="card-item">💳 신한 Deep Dream 카드</div>
        <div class="card-item">💳 네이버페이 라인 체크카드</div>
      </main>
    </div>
  </template>
  
  <style scoped>
  .sub-page { padding: 20px; background: #f8f9fa; }
  .page-header { display: flex; align-items: center; gap: 15px; margin-bottom: 20px; }
  .back-btn { background: none; border: none; font-size: 20px; cursor: pointer; }
  .card-item { background: white; padding: 15px; border-radius: 8px; margin-bottom: 10px; box-shadow: 0 2px 4px rgba(0,0,0,0.05); }
  </style>
  