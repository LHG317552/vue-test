import { ref, type Ref } from "vue";

// AppRouter.ts
export class AppRouter {
  private static instance: AppRouter | null = null;
  private router: any = null;
  /* 'slide-left' | 'slide-right' | 'fade' */
  public transitionName: Ref<string> = ref<string>('slide-left');
  public menuSkip: boolean = false;

  private constructor() {}

  public static getInstance(): AppRouter {
    if (!AppRouter.instance) {
      AppRouter.instance = new AppRouter();
    }
    return AppRouter.instance;
  }

  // 실제 프레임워크의 라우터 인스턴스 주입
  public initialize(routerInstance: any): void {
    if (!this.router) {
      this.router = routerInstance;
    }
  }

  // 요구하신 $vRouter.push 형태로 매핑될 핵심 메서드
  public push = (location: any): void => {
    this.transitionName.value = 'slide-left';
    let to:Record<string, any> = {};
    if (typeof location === 'string') {
      to.path = location;
    } else {
      to = location;
    }
    if (to.name === 'card/menu' || to.path?.includes('menu')) {
      this.menuSkip = false;
    }
    this.router.push(to);
  }

  // 2. replace 메서드 (히스토리를 남기지 않고 이동)
  public replace = (location: any): void => {    
    this.transitionName.value = 'slide-left';
    let to:Record<string, any> = {};
    if (typeof location === 'string') {
      to.path = location;
    } else {
      to = location;
    }
    if (to.name === 'card/menu' || to.path?.includes('menu')) {
      this.menuSkip = false;
    }
    if (typeof this.router.replace === 'function') {
      this.router.replace(location);
    } else {
      // 프레임워크 호환용 예외 처리 (e.g. react-router 등은 push 옵션으로 처리하기도 함)
      this.router.push(location, { replace: true });
    }
  }

  // 3. goBack 메서드 (이전 페이지로 이동)
  public goBack = (): void => {    
    this.transitionName.value = 'slide-right';    
    if (window.history.state.current === '/card/menu') {
      this.menuSkip = true;
    }
    if (typeof this.router.back === 'function') {
      this.router.back(); // Vue Router v4 기준
    } else if (typeof this.router.go === 'function') {
      this.router.go(-1); // Vue Router v3 기준
    } else {
      window.history.back(); // 폴백 데이터
    }
  }   
}

// ⭐️ 전역에서 바로 쓸 수 있도록 싱글톤 인스턴스를 내보냅니다.
export const vRouter = AppRouter.getInstance();
  