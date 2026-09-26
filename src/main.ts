import { createApp } from 'vue';
import './assets/css/style.css';
import './assets/css/transition.css';
import App from './App.vue';
import router from './router';
import { vRouter } from './global-utils/app-router';
import { ui } from './global-utils/ui';
import { cardApp } from './global-utils/card-app';

const app = createApp(App);

vRouter.initialize(router); // 1. 싱글톤에 실제 라우터 주입
(window as any).$vRouter = vRouter;
(window as any).$ui = ui;
(window as any).$cardApp = cardApp;

app.config.globalProperties.$vRouter = vRouter;
app.config.globalProperties.$ui = ui;
app.config.globalProperties.$cardApp = cardApp;

app.use(router).mount('#app');
