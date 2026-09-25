<template>    
    <main class="router-guide">
      <section class="guide-router" :style="{height: `${height}px`}">
        <p class="eyebrow">VUE ROUTER</p>
        <h1>페이지 안내</h1>
        <p class="description">
          이 프로젝트에서 구현된 화면과 각 페이지의 경로를 확인할 수 있습니다.
        </p>
  
        <nav class="page-list" aria-label="페이지 목록" v-for="router in routers">
          <RouterLink to="/cards" class="page-link">
            <span class="page-icon" aria-hidden="true">▣</span>
            <span>
              <strong v-text="router.meta.title" />
              <small>{{ router.path }} · {{ router.meta.desc }}</small>
            </span>
            <span class="arrow" aria-hidden="true">→</span>
          </RouterLink>
        </nav>
      </section>
    </main>
  </template>
  
<script setup lang="ts">
import { ref } from 'vue';
import {  useRouter } from 'vue-router'
    
 const routers = useRouter().getRoutes().filter(a => a.children?.length);  
 const height = ref<number>(window.innerHeight - 58);
 </script>
 
 <style scoped>
 .router-guide {
   display: grid;
   min-height: 100svh;
   padding: 24px;
   place-items: center;
   box-sizing: border-box;
   background: linear-gradient(135deg, #f3f7ff 0%, #eef4ff 100%);
   color: #1d2a44;
   font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
 }
 
 .guide-router {
   height: calc(100vh - 3rem);
   width: min(100%, 520px);
   padding: 38px;
   border: 1px solid #dfe8fa;
   border-radius: 24px;
   box-sizing: border-box;
   background: rgba(255, 255, 255, 0.92);
   box-shadow: 0 18px 50px rgba(38, 77, 140, 0.12);
   overflow-y: auto;
 }
 
 .eyebrow { margin: 0 0 8px; color: #2862bf; font-size: 12px; font-weight: 800; letter-spacing: 1.4px; }
 h1 { margin: 0; font-size: 24px; letter-spacing: -1.5px; color: #1d2a44; }
 .description { margin: 12px 0 30px; color: #66758a; line-height: 1.55; }
 .page-list { display: grid; gap: 12px; margin-bottom: 1rem; }
 .page-link { display: flex; align-items: center; gap: 14px; padding: 18px; border: 1px solid #e2e9f5; border-radius: 16px; color: inherit; text-decoration: none; transition: border-color .2s, box-shadow .2s, transform .2s; }
 .page-link:hover { border-color: #79a6eb; box-shadow: 0 8px 18px rgba(45, 98, 184, .12); transform: translateY(-2px); }
 .page-icon { display: grid; width: 40px; height: 40px; place-items: center; border-radius: 12px; background: #e9f1ff; color: #2862bf; font-size: 22px; }
 .page-link strong, .page-link small { display: block; }
 .page-link small { margin-top: 3px; color: #748196; font-size: 13px; }
 .arrow { margin-left: auto; color: #2862bf; font-size: 22px; }
 </style>
 