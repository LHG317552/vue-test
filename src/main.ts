import { createApp } from 'vue';
import './style.css';
import './transition.css';
import App from './App.vue';
import router from './router';
import { vRouter } from './router/app-router';

// 1. 싱글톤에 실제 라우터 주입
vRouter.initialize(router);

// 2. window 전역 객체에 $vRouter로 등록 (일반 스크립트 파일용)
(window as any).$vRouter = vRouter;

const app = createApp(App);
app.config.globalProperties.$vRouter = vRouter;
app.use(router).mount('#app');
