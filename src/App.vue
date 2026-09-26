<template>
  <router-view />    
</template>

<style scoped>
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
h1 { margin: 0; font-size: 32px; letter-spacing: -1.5px; }
.description { margin: 12px 0 30px; color: #66758a; line-height: 1.55; }
.page-list { display: grid; gap: 12px; margin-bottom: 1rem; }
.page-link { display: flex; align-items: center; gap: 14px; padding: 18px; border: 1px solid #e2e9f5; border-radius: 16px; color: inherit; text-decoration: none; transition: border-color .2s, box-shadow .2s, transform .2s; }
.page-link:hover { border-color: #79a6eb; box-shadow: 0 8px 18px rgba(45, 98, 184, .12); transform: translateY(-2px); }
.page-icon { display: grid; width: 40px; height: 40px; place-items: center; border-radius: 12px; background: #e9f1ff; color: #2862bf; font-size: 22px; }
.page-link strong, .page-link small { display: block; }
.page-link small { margin-top: 3px; color: #748196; font-size: 13px; }
.arrow { margin-left: auto; color: #2862bf; font-size: 22px; }
</style>
