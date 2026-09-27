<template>
  <v-sheet class="event-sheet" rounded="t-xl">
    <div class="drag-handle" />

    <!-- 배너 -->
    <div class="banner">
      <span class="period-chip">{{ period }}</span>
      <p class="banner-headline">{{ headline }}</p>
      <p class="banner-sub">{{ subline }}</p>
    </div>

    <!-- 본문 -->
    <div class="content">
      <ul class="benefit-list">
        <li v-for="(benefit, i) in benefits" :key="i" class="benefit-row">
          <span class="benefit-label">{{ benefit.label }}</span>
          <span class="benefit-amount">{{ benefit.amount }}</span>
        </li>
      </ul>

      <p class="fine-print">{{ finePrint }}</p>
    </div>

    <!-- 하단 액션 -->
    <div class="actions">
      <v-btn
        class="cta"
        color="#3D2FE0"
        height="52"
        rounded="lg"
        elevation="0"
        block
        @click="$emit('close', 'participate')"
      >
        {{ ctaLabel }}
      </v-btn>
      <button class="dismiss" @click="$emit('close', 'dismiss')">
        다음에 볼게요
      </button>
    </div>
  </v-sheet>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    period?: string;
    headline?: string;
    subline?: string;
    benefits?: { label: string; amount: string }[];
    finePrint?: string;
    ctaLabel?: string;
  }>(),
  {
    period: "10.1 ~ 10.31",
    headline: "가을맞이 캐시백",
    subline: "이번 달 결제하면 최대 3만원 돌려드려요",
    benefits: () => [
      { label: "첫 결제 캐시백", amount: "5,000원" },
      { label: "10만원 이상 결제 시", amount: "15,000원" },
      { label: "전월 실적 달성 시", amount: "10,000원" },
    ],
    finePrint: "캐시백은 익월 15일 카드 청구금액에서 자동 차감됩니다. 이벤트 세부 조건은 카드 상세 페이지에서 확인하세요.",
    ctaLabel: "이벤트 참여하기",
  }
);

defineEmits<{
  close: [result: "participate" | "dismiss"];
}>();
</script>

<style scoped>
.event-sheet {
  font-family: "Pretendard", -apple-system, BlinkMacSystemFont, sans-serif;
  overflow: hidden;
  background: #ffffff;
}

.drag-handle {
  width: 36px;
  height: 4px;
  border-radius: 999px;
  background: rgba(23, 23, 31, 0.16);
  margin: 12px auto 0;
}

/* 배너: 카드 모서리를 연상시키는 대각선 그라디언트 */
.banner {
  position: relative;
  margin: 16px 20px 0;
  padding: 24px 20px 28px;
  border-radius: 20px;
  background: linear-gradient(135deg, #3d2fe0 0%, #5b3ff0 55%, #e8a33d 130%);
  color: #ffffff;
  overflow: hidden;
}

.period-chip {
  display: inline-block;
  padding: 4px 10px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.18);
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.2px;
}

.banner-headline {
  margin: 14px 0 4px;
  font-size: 22px;
  font-weight: 700;
  line-height: 1.35;
}

.banner-sub {
  margin: 0;
  font-size: 14px;
  font-weight: 400;
  color: rgba(255, 255, 255, 0.86);
  line-height: 1.5;
}

.content {
  padding: 20px 20px 4px;
}

.benefit-list {
  list-style: none;
  margin: 0;
  padding: 0;
}

.benefit-row {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  padding: 14px 0;
  border-bottom: 1px solid rgba(23, 23, 31, 0.08);
}

.benefit-row:last-child {
  border-bottom: none;
}

.benefit-label {
  font-size: 15px;
  color: #17171f;
}

.benefit-amount {
  font-size: 16px;
  font-weight: 700;
  color: #3d2fe0;
}

.fine-print {
  margin: 16px 0 0;
  padding: 12px 14px;
  border-radius: 12px;
  background: #f0eeff;
  font-size: 12px;
  line-height: 1.6;
  color: rgba(23, 23, 31, 0.64);
}

.actions {
  padding: 18px 20px calc(20px + env(safe-area-inset-bottom, 0px));
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}

.cta {
  text-transform: none;
  font-size: 16px;
  font-weight: 700;
  letter-spacing: -0.2px;
}

.dismiss {
  background: none;
  border: none;
  font-size: 13px;
  color: rgba(23, 23, 31, 0.5);
  padding: 4px;
  cursor: pointer;
}

.dismiss:focus-visible,
.cta:focus-visible {
  outline: 2px solid #3d2fe0;
  outline-offset: 2px;
}

@media (prefers-reduced-motion: no-preference) {
  .event-sheet {
    animation: rise 0.25s ease-out;
  }
}

@keyframes rise {
  from {
    transform: translateY(12px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}
</style>
