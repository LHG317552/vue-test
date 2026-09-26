import type { AppRouter } from "./global-utils/app-router";
import type { CardAppGlobal } from "./global-utils/card-app";
import type { UI } from "./global-utils/ui";

declare global {
  // 1. window.$vRouter 전역 객체 타입 정의
  interface Window {
    $vRouter: AppRouter;
    $ui: UI;
    $cardApp: CardAppGlobal;
  }

  // 2. 일반 스크립트에서 import 없이 $vRouter만 쓸 때를 위한 정의
  const $vRouter: AppRouter;
  const $ui: UI;
  const $cardApp: CardAppGlobal;
}

// 3. Vue 컴포넌트 템플릿(this.$vRouter) 내 인식을 위한 정의
declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $vRouter: AppRouter;
    $ui: UI;
    $cardApp: CardAppGlobal;
  }
}

export {};