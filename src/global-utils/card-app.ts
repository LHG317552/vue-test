import { ref, type Component, type Ref } from "vue";

type TTarget = string | Component | {close: any};
type TPopType = 'alert' | 'confirm' | 'dialog' | 'bottomsheet';

type TPopup = {
    type: TPopType;
    target: TTarget;
    resolve: (result: any) => void;
    props?: Record<string, any>;
    title?: string;
}

type TParams = Omit<TPopup, 'target' | 'type' | 'resolve'>;

export class CardAppGlobal {
  private static instance: CardAppGlobal | null = null;  
  private constructor() {}

  /* 'slide-left' | 'slide-right' | 'fade' */
  public transitionName: Ref<string> = ref<string>('slide-left');
  public menuSkip: boolean = false;

  public static getInstance(): CardAppGlobal {
    if (!CardAppGlobal.instance) {
        CardAppGlobal.instance = new CardAppGlobal();
    }
    return CardAppGlobal.instance;
  }

  public initialize(): void {}
}

// ⭐️ 전역에서 바로 쓸 수 있도록 싱글톤 인스턴스를 내보냅니다.
export const cardApp = CardAppGlobal.getInstance();
