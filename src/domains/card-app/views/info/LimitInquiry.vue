<!-- src/views/card-app/info/LimitInquiry.vue -->
<template>
    <div class="sub-page">
      <header class="page-header">
        <button @click="$vRouter.goBack" class="back-btn">⬅️</button>
        <h2>이용 한도 조회/증액</h2>
      </header>
      <main class="page-content">
        <div class="limit-status">
          <p>총 한도: 5,000,000원</p>
          <p>남은 한도: 3,945,455원</p>
        </div>
        <button class="action-btn">한도 증액 신청하기</button>
      </main>
    </div>
  </template>
  
  <style scoped>
  .page-header { display: flex; align-items: center; gap: 15px; margin-bottom: 20px; }
  .back-btn { background: none; border: none; font-size: 20px; cursor: pointer; }
  .limit-status { background: white; padding: 20px; border-radius: 8px; margin-bottom: 20px; }
  .action-btn { wIdth: 100%; padding: 12px; background: #1a73e8; color: white; border: none; border-radius: 6px; font-weight: bold; cursor: pointer; }
  </style>
  