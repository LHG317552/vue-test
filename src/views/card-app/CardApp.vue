<template>
  <div class="wallet-container">    
    <router-view v-slot="{ Component, route: localRoute }">               
      <transition :name="transitionName" appear mode="out-in" :key="localRoute.fullPath">
        <div class="router-view-area"  >
          <card-app-header />
          <component :is="Component" />
        </div>
        </transition>
      </router-view>
    </div>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted } from 'vue';
import CardAppHeader from '../../components/card-app/CardAppHeader.vue';

const transitionName = computed<string>(() => $vRouter.transitionName.value);

// watch(transitionName, (val) => {console.log(val)}, {deep: true, immediate: true});

const onPopState = () => {  
  if (window.history.state.forward === '/card/menu') {
    $vRouter.menuSkip = true;
  }  
}
onMounted(() => {
  window.addEventListener('popstate', onPopState);
});
onUnmounted(() => {
  window.addEventListener('popstate', onPopState);
});
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
  max-width: 480px;
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
