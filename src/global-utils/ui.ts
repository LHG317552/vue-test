import { shallowRef, markRaw, type Component, watch, inject, ref } from "vue";

type TPopType = 'alert' | 'confirm' | 'dialog' | 'bottomsheet';

/** 팝업을 "열 때" 넘기는 대상: 경로 문자열 또는 Vue 컴포넌트 */
type TOpenTarget = string | Component;

/** 팝업을 "닫을 때" 넘기는 신호. id를 주면 해당 팝업만, 안 주면 같은 type 중 최신(LIFO) 팝업을 닫음 */
type TCloseSignal<T = any> = {
  close: T;
  id?: string;
};

type TPopup = {
  id: string;
  type: TPopType;
  target: TOpenTarget;
  resolve: (result: any) => void;
  props?: Record<string, any>;
  title?: string;
};

type TParams = Omit<TPopup, 'id' | 'target' | 'type' | 'resolve'>;

/** target이 "닫기 신호"인지 판별하는 타입가드 (open/close 두 경로를 명확히 분리) */
function isCloseSignal(target: TOpenTarget | TCloseSignal): target is TCloseSignal {
  return typeof target === 'object' && target !== null && 'close' in target;
}

let uid = 0;
function nextId(): string {
  uid += 1;
  return `popup_${uid}`;
}


export class UI {
  private static instance: UI | null = null;

  private constructor() {}
  // ref -> shallowRef: 배열 안의 컴포넌트/큐 아이템이 재귀적으로 reactive화되지 않도록
  private popupQueue = shallowRef<Array<TPopup>>([]);

  public static getInstance(): UI {
    if (!UI.instance) {
      UI.instance = new UI();
    }
    return UI.instance;
  }

  public initialize(): void {}

  public get queue() {
    return this.popupQueue;
  }

  private open<T>(type: TPopType, target: TOpenTarget, params?: TParams): { id: string; promise: Promise<T | undefined> } {
    const id = nextId();
    const promise = new Promise<T | undefined>((resolve) => {
      // 컴포넌트 객체는 markRaw로 감싸서 reactive 대상에서 제외
      const safeTarget: TOpenTarget = typeof target === "string" ? target : markRaw(target);

      // shallowRef는 push 같은 mutation을 감지 못 하므로 새 배열로 교체
      this.popupQueue.value = [
        ...this.popupQueue.value,
        {
          id,
          type,
          resolve,
          target: safeTarget,
          props: params?.props,
          title: params?.title,
        },
      ];
    });
    return { id, promise };
  }

  private close<T>(type: TPopType, signal: TCloseSignal<T>): void {
    const { close: closeValue, id } = signal;

    const index = id
      ? this.popupQueue.value.findIndex((p) => p.id === id)
      : this.popupQueue.value.findLastIndex((p) => p.type === type);

    if (index === -1) return;

    const popup = this.popupQueue.value[index];
    // 여기도 shallowRef라 mutation 대신 새 배열로 교체
    this.popupQueue.value = this.popupQueue.value.filter((_, i) => i !== index);
    popup.resolve(closeValue);
  }

  public closeAll(type?: TPopType, result?: any): void {
    const remaining: TPopup[] = [];
    for (const popup of this.popupQueue.value) {
      if (!type || popup.type === type) {
        popup.resolve(result);
      } else {
        remaining.push(popup);
      }
    }
    this.popupQueue.value = remaining;
  }

  private call<T>(type: TPopType, target: TOpenTarget | TCloseSignal<T>, params?: TParams): Promise<T | undefined> {
    if (isCloseSignal(target)) {
      this.close<T>(type, target);
      return Promise.resolve(undefined); // 닫기 호출 자체의 반환값은 의미가 없으므로 명확히 undefined
    }
    return this.open<T>(type, target, params).promise;
  }

  public alert = async <T>(target: TOpenTarget | TCloseSignal<T>, params?: TParams): Promise<T | undefined> =>
    this.call<T>('alert', target, params);
  public confirm = async <T>(target: TOpenTarget | TCloseSignal<T>, params?: TParams): Promise<T | undefined> =>
    this.call<T>('confirm', target, params);
  public dialog = async <T>(target: TOpenTarget | TCloseSignal<T>, params?: TParams): Promise<T | undefined> =>
    this.call<T>('dialog', target, params);
  public bottomsheet = async <T>(target: TOpenTarget | TCloseSignal<T>, params?: TParams): Promise<T | undefined> =>
    this.call<T>('bottomsheet', target, params);
}

export const ui = UI.getInstance();

export const afterEnterTransition = (func: (val?: any) =>void) => {
  const transitionTrigger = inject('pageTransitionTrigger', ref(0));
  watch(transitionTrigger, func, { once: true });
}