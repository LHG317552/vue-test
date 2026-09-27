<template>
  <div class="wallet-container">    
    <router-view v-slot="{ Component, route: localRoute }">               
      <transition :name="transitionName" appear mode="out-in" :key="localRoute.fullPath" @after-enter="handleAfterEnter">
        <div class="router-view-area"  >
          <card-app-header />
          <component :is="Component" />
        </div>
        </transition>
      </router-view>
    </div>
</template>

<script setup lang="ts">
import '../../../assets/css/card-app-vuetify.css';
import { computed, provide, ref } from 'vue';
import CardAppHeader from '../components/CardAppHeader.vue';
const transitionName = computed<string>(() => $cardApp.transitionName.value);

// 💡 트랜지션 완료 여부를 트리거할 ref 선언
const transitionTrigger = ref<number>(0);
provide('pageTransitionTrigger', transitionTrigger);

const handleAfterEnter = () => {
  // 트랜지션이 끝날 때마다 값을 변경하여 자식들에게 알림
  transitionTrigger.value += 1;
};
</script>

<style scoped>
:global(#app) {
  width: 100%;
  max-width: none;
  margin: 0;
  text-align: left;
  border: none;
  display: block;
  min-height: 100svh;
}

.wallet-container {
  width: 100%;  
  margin: 0 auto;
  min-height: 100vh;
  background: #f5f7fb;
  color: #191f28;    
  box-sizing: border-box;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  display: flex;
  flex-direction: column;
}

:deep(.sub-page) { padding: 20px; background: #f8f9fa; min-height: 100vh; }

/* 💡 애니메이션 페이지들이 서로 겹쳐서 슬라이드될 수 있도록 배치 영역을 격리합니다. */
.router-view-area {
  flex: 1;
  position: relative;
  overflow: hidden; /* 영역 밖으로 나가는 페이지 숨김 */
  width: 100%;
}

.cursor-pointer { cursor: pointer; }
</style>
