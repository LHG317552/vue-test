<template>
  <div
    ref="cardSlider"
    class="stacked-card-slider"
    @pointermove="onPointerMove"
    @pointerup="finishDrag"
    @pointercancel="finishDrag"
    >
    <!-- :style="{height: `${height}px`}" -->
    <div
      v-for="(item, index) in items"
      :key="item.id"
      class="stacked-card"
      :class="{
        'is-selected': dragIndex === index,
        'is-dragging': dragIndex === index,
        'is-front-card': dragIndex !== null && index < dragIndex,
      }"
      :style="getCardStyle(index)"
      @pointerdown="startDrag($event, index)"
    >    
      <slot :card="item" :index="index" />
    </div>
  </div>
</template>

<script setup lang="ts" generic="T extends { id: string | number }">
import { computed, nextTick, onBeforeUnmount, ref, type CSSProperties } from 'vue'

const props = defineProps<{ modelValue: T[], height: number; cardHeight: number }>();

const emit = defineEmits<{ 'update:modelValue': [items: T[]] }>();

const LONG_PRESS_TIME = 350;
const dragIndex = ref<number | null>(null);
const deltaY = ref<number>(0);
let startY = 0;
let pressTimer: ReturnType<typeof setTimeout> | null = null;

const cardSlider = ref<HTMLDivElement>();

const items = computed({
  get: () => props.modelValue,
  set: (value: T[]) => emit('update:modelValue', value),
});

const stackGap = computed(() => Math.max(24, props.height / items.value.length));

const onceSlided = ref<boolean>(false);
const directionOfMomentAgo = ref<string>('none');
const startDrag = (event: PointerEvent, index: number) => {
  if (event.pointerType === 'mouse' && event.button !== 0) return

  const target = event.currentTarget as HTMLElement
  startY = event.clientY
  deltaY.value = 0
  clearPressTimer()
  pressTimer = setTimeout(() => {
    dragIndex.value = index
    target.setPointerCapture?.(event.pointerId)
  }, LONG_PRESS_TIME)
}

const onPointerMove = (event: PointerEvent) => {
  const currentIndex = dragIndex.value
  if (currentIndex === null) {
    if (Math.abs(event.clientY - startY) > 8) clearPressTimer()
    return
  }

  event.preventDefault();
  deltaY.value = event.clientY - startY;  
  const flag = !onceSlided && Math.sign(deltaY.value) < 0 ? props.cardHeight + (stackGap.value / 2) - 50 : stackGap.value;
  const offset = Math.abs(deltaY.value) >= flag ? Math.sign(deltaY.value) : 0;
  const targetIndex = currentIndex - offset;
  directionOfMomentAgo.value = targetIndex === currentIndex ? 'none' : targetIndex > currentIndex ? 'up' : 'down';
  if (targetIndex < 0 || targetIndex >= items.value.length || targetIndex === currentIndex) return;
  const reorderedItems = [...items.value];
  const [movedItem] = reorderedItems.splice(currentIndex, 1);
  reorderedItems.splice(targetIndex, 0, movedItem);
  items.value = reorderedItems;
  dragIndex.value = targetIndex;
  startY = event.clientY;
  deltaY.value = 0;
  if (targetIndex < currentIndex) {      
      nextTick().then(() => {
        if (cardSlider.value) {
          cardSlider.value.getElementsByClassName('stacked-card').item(currentIndex)?.classList.add('is-back-card');
        }
      });
    }
}

const finishDrag = () => {
  directionOfMomentAgo.value = 'none';
  clearPressTimer();
  dragIndex.value = null;
  deltaY.value = 0;
}

const clearPressTimer = () => {
  if (pressTimer !== null) clearTimeout(pressTimer);
  pressTimer = null;
}

const getCardStyle = (index: number): CSSProperties => {
  const isDragging = dragIndex.value === index;
  let top = (items.value.length - 1 - index) * stackGap.value + (isDragging ? deltaY.value : 0);
  if (isDragging && onceSlided.value && directionOfMomentAgo.value === 'up') {    
    top = deltaY.value + ((items.value.length - index) * stackGap.value) - (props.cardHeight + (stackGap.value / 2) - 50);
  }
  return {
    top: `${top}px`,
    zIndex: isDragging ? 200 : items.value.length - index,
    transform: isDragging ? 'translateY(-10px) scale(0.8)' : '',
  }
}

onBeforeUnmount(clearPressTimer);
</script>

<style scoped>
.stacked-card-slider { position: relative; margin-top: 10px; perspective: 900px; touch-action: none; }
.stacked-card { position: absolute; left: 0; width: 100%; cursor: grab; touch-action: none; transform-origin: center; will-change: transform; }
.stacked-card.is-dragging { cursor: grabbing; transition: none !important; }
.stacked-card.is-selected :deep(.pay-card) { box-shadow: 0 25px 50px rgba(0, 0, 0, .45); filter: brightness(1.1); }
.stacked-card.is-front-card { z-index: 100 !important; }

.stacked-card.is-front-card {
  animation: front-card-tilt-in 0.2s linear forwards;
}
.stacked-card.is-back-card {
  animation: front-card-tilt-out 0.2s linear forwards;
}

@keyframes front-card-tilt-in {
  0% {
    transform: translate3d(0, 0, 0) rotateX(0deg);
  }
  100% {
    transform: translate3d(0, 10px, 0) rotateX(-15deg);
  }
}

@keyframes front-card-tilt-out {
  0% {
    transform: translate3d(0, 10px, 0) rotateX(-15deg);
  }
  1000% {
    transform: translate3d(0, 0, 0) rotateX(0deg);
  }
}
</style>
