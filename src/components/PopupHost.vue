<template>
    <template v-for="popup in $ui.queue.value" :key="popup.id">
      <!-- bottomsheet -->
      <v-bottom-sheet
        v-if="popup.type === 'bottomsheet'"
        :model-value="true"
        @update:model-value="(v) => !v && dismiss(popup)"
      >
        <v-sheet rounded="t-xl">
          <div class="d-flex justify-end mt-3 mx-3">        
            <X @click="close(popup, false)" class="cursor-pointer" />
          </div>
          <component
            :is="popup.target"
            v-if="isComponent(popup.target)"
            v-bind="popup.props"
            @close="(result: any) => close(popup, result)"
          />
          <v-card v-else>
            <v-card-text>{{ popup.target }}</v-card-text>
          </v-card>
        </v-sheet>
      </v-bottom-sheet>
  
      <!-- alert / confirm / dialog -->
      <v-dialog
        v-else
        :model-value="true"
        max-width="400"
        @update:model-value="(v) => !v && dismiss(popup)"
      >
        <v-card>
          <v-card-title v-if="popup.title">{{ popup.title }}</v-card-title>
  
          <template v-if="isComponent(popup.target)">
            <component
              :is="popup.target"
              v-bind="popup.props"
              @close="(result: any) => close(popup, result)"
            />
          </template>
  
          <template v-else>
            <v-card-text>{{ popup.target }}</v-card-text>
            <v-card-actions>
              <v-spacer />
              <v-btn v-if="popup.type === 'confirm'" variant="text" @click="close(popup, false)">
                취소
              </v-btn>
              <v-btn color="primary" variant="text" @click="close(popup, true)">
                확인
              </v-btn>
            </v-card-actions>
          </template>
        </v-card>
      </v-dialog>
    </template>
  </template>
  
  <script setup lang="ts">
  import { type Component } from "vue";
  import { X } from '@lucide/vue';
  
  function isComponent(target: unknown): target is Component {
    return typeof target !== "string";
  }
  
  // X 버튼 없이 바깥 클릭/ESC로 닫힐 때: confirm은 취소(false)로, 나머지는 undefined로 처리
  function dismiss(popup: any) {
    close(popup, popup.type === "confirm" ? false : undefined);
  }
  
  // 실제 닫기: 기존 공개 API(alert/confirm/dialog/bottomsheet)를 그대로 재사용
  function close(popup: any, result: any) {
    ($ui[popup.type as "alert" | "confirm" | "dialog" | "bottomsheet"] as any)({
      close: result,
      id: popup.id,
    });
  }
  </script>