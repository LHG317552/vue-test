<template>
    <header class="app-header">
        <div class="brand-lockup">
            <!-- 💡 클릭 시 뒤로가기 메서드를 명시적으로 호출합니다. -->
            <ArrowLeft @click="$vRouter.goBack" ></ArrowLeft>
            <span class="brand-mark">i</span><strong class="text-[#123f9b]">카드앱</strong>
        </div>
        <div class="header-actions">
            <button class="icon-button alarm-button" type="button" aria-label="알림">
            <Bell />
            <span class="notification-dot"></span>
            </button>         
            <button class="icon-button" type="button" aria-label="전체 메뉴" @click="$vRouter.push({ name: 'card/menu' })">☰</button>
        </div>
    </header>
</template>
<script lang="ts" setup>
import { Bell, ArrowLeft } from '@lucide/vue'
</script>
<style lang="css" scoped>
.app-header { 
  padding: 0 20px; 
  height: 66px; 
  display: flex; 
  align-items: center; 
  justify-content: space-between;
  background: #f5f7fb;
  z-index: 10; /* 헤더가 밀려오는 페이지보다 항상 위에 있도록 보장 */
}
.header-actions { display: flex; gap: 4px; }
.brand-lockup { display: flex; gap: 6px; align-items: center; font-size: 18px; letter-spacing: -1px; }
.brand-mark { width: 21px; color: #123f9b; height: 21px; display: grid; place-items: center; border-radius: 7px 7px 7px 2px; background: #1755be; color: #fff; font-family: Georgia, serif; font-weight: 700; font-size: 18px; line-height: 1; }
.icon-button { position: relative; width: 36px; height: 36px; border: 0; border-radius: 50%; background: transparent; color: #273242; font-size: 20px; cursor: pointer; }
.notification-dot { position: absolute; top: 20px; right: 4px; width: 7px; height: 7px; border-radius: 50%; background: #f04a43; }
.alarm-button { display: flex; justify-content: end; align-items: center;}
</style>