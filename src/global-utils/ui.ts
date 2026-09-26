import { ref, type Component } from "vue";

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

export class UI {
  private static instance: UI | null = null;  

  private constructor() {}
  private popupQueue = ref<Array<TPopup>>([]);

  public static getInstance(): UI {
    if (!UI.instance) {
        UI.instance = new UI();
    }
    return UI.instance;
  }

  public initialize(): void {}
  private popCommon = async <T>(type: TPopType, target: TTarget, params?: TParams): Promise<T | undefined> => {
    if (typeof target === 'object' && 'close' in target) {
        const index = this.popupQueue.value.findLastIndex(a => a.type === type);
        const findFromQueue = this.popupQueue.value[index];
        if (index > -1) {
            this.popupQueue.value.splice(index, 1);
        }
        return findFromQueue ? findFromQueue?.resolve(target.close) as T : undefined;
    }
    return new Promise<T>((resolve: (result: T)=>void) =>{
        this.popupQueue.value.push({
            type,
            resolve,
            target,
            props: params?.props,
            title: params?.title
        });
    });
  }
  public alert = async <T>(target: TTarget, params?: TParams): Promise<T | undefined> =>  this.popCommon('alert', target, params);
  public confirm = async <T>(target: TTarget, params?: TParams): Promise<T | undefined> =>  this.popCommon('confirm', target, params);
  public dialog = async <T>(target: TTarget, params?: TParams): Promise<T | undefined> =>  this.popCommon('dialog', target, params);
  public bottomsheet = async <T>(target: TTarget, params?: TParams): Promise<T | undefined> =>  this.popCommon('bottomsheet', target, params);
}

// ⭐️ 전역에서 바로 쓸 수 있도록 싱글톤 인스턴스를 내보냅니다.
export const ui = UI.getInstance();
