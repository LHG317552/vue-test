<template>
  <!-- 모바일 기기 프레임 크기 고정 (리스트 확인용) -->
  <div class="card-menu max-w-md w-full bg-slate-100 min-h-screen flex justify-center items-start font-sans antialiased">
    <!-- 전체메뉴 사이드바 본체 -->      
    <aside class="w-full bg-[#f8fafc] shadow-lg overflow-hidden flex flex-col h-[100vh] border border-slate-200">
      <!-- 1. 유저 프로필 및 정보 영역 -->
      <div class="p-6 bg-white border-b border-slate-100 flex flex-col gap-3">
        <div class="flex justify-between items-center">            
          <span class="text-[11px] text-slate-400">최근 접속: 오늘 11:24</span>
          <!-- 💡 X 버튼 클릭 시 이전 화면(메인)으로 돌아갑니다. -->
          <X @click="$vRouter.goBack" class="cursor-pointer" />
        </div>
        <div class="flex justify-between items-center mt-1">
          <div>
            <h2 class="text-lg text-slate-800">
              카드앱 <span class="text-sm font-normal text-slate-500">고객님</span>
            </h2>
          </div>
          <button class="px-3 py-1.5 bg-[#eef4fa] text-[#00539C] text-xs font-bold rounded-lg hover:bg-blue-100 transition-colors">
            로그아웃
          </button>
        </div>

        <!-- 간편 바로가기 단축 버튼 -->
        <div class="grid grid-cols-3 gap-2 mt-2">
          <button class="py-2 bg-slate-50 rounded-xl text-center text-xs font-bold text-slate-700 hover:bg-slate-100">
            고객센터
          </button>
          <button class="py-2 bg-slate-50 rounded-xl text-center text-xs font-bold text-slate-700 hover:bg-slate-100">
            인증/보안
          </button>
          <button class="py-2 bg-slate-50 rounded-xl text-center text-xs font-bold text-slate-700 hover:bg-slate-100">
            이벤트
          </button>
        </div>
      </div>

      <!-- 2. 메인 2열 분할 메뉴 바디 -->
      <div class="flex-1 flex overflow-hidden">          
        <!-- [왼쪽] 대메뉴 카테고리 고정 열 -->
        <nav class="w-[35%] bg-[#eef2f6] flex flex-col border-r border-slate-200">
          <button class="px-4 py-4 text-left text-xs font-black text-[#00539C] bg-white border-l-4 border-[#00539C]">
            MY 카드
          </button>
          <button class="px-4 py-4 text-left text-xs font-bold text-slate-500 hover:bg-slate-200/60">
            조회/이용
          </button>
          <button class="px-4 py-4 text-left text-xs font-bold text-slate-500 hover:bg-slate-200/60">
            국내/해외결제
          </button>
          <button class="px-4 py-4 text-left text-xs font-bold text-slate-500 hover:bg-slate-200/60">
            카드금융
          </button>
          <button class="px-4 py-4 text-left text-xs font-bold text-slate-500 hover:bg-slate-200/60">
            라이프/편의
          </button>
        </nav>

        <!-- [오른쪽] 상세 소메뉴 스크롤 리스트 -->
        <div class="w-[65%] bg-white p-5 overflow-y-auto flex flex-col gap-6">
          
          <!-- 섹션 1: 내 카드 정보 -->
          <div>
            <h3 class="text-[11px] font-black text-slate-400 uppercase tracking-wider mb-2">
              내 카드 정보
            </h3>
            <ul class="flex flex-col">
              <li @click="moveToPage('card/inquiry')" class="text-sm font-bold text-slate-700 py-2.5 border-b border-slate-50 hover:text-[#00539C] cursor-pointer flex justify-between items-center">
                <span>보유 카드 조회</span>
                <ChevronRightIcon class="w-4 h-4 text-slate-300" />
              </li>
              <li @click="moveToPage('card/payment-expected')" class="text-sm font-bold text-slate-700 py-2.5 border-b border-slate-50 hover:text-[#00539C] cursor-pointer flex justify-between items-center">
                <span>카드 결제 예정 금액</span>
                <ChevronRightIcon class="w-4 h-4 text-slate-300" />
              </li>
              <li @click="moveToPage('card/limit-inquiry')" class="text-sm font-bold text-slate-700 py-2.5 hover:text-[#00539C] cursor-pointer flex justify-between items-center">
                <span>이용 한도 조회/증액</span>
                <ChevronRightIcon class="w-4 h-4 text-slate-300" />
              </li>
            </ul>
          </div>

          <!-- 섹션 2: 카드 발급/신청 -->
          <div>
            <h3 class="text-[11px] font-black text-slate-400 uppercase tracking-wider mb-2">
              카드 발급/신청
            </h3>
            <ul class="flex flex-col">
              <li @click="moveToPage('card/apply-credit')" class="text-sm font-bold text-slate-700 py-2.5 border-b border-slate-50 hover:text-[#00539C] cursor-pointer flex justify-between items-center">
                <span class="flex items-center gap-1">
                  신용 카드 신청
                  <span class="w-1.5 h-1.5 rounded-full bg-red-500"></span>
                </span>
                <ChevronRightIcon class="w-4 h-4 text-slate-300" />
              </li>
              <li @click="moveToPage('card/apply-check')" class="text-sm font-bold text-slate-700 py-2.5 border-b border-slate-50 hover:text-[#00539C] cursor-pointer flex justify-between items-center">
                <span>체크 카드 신청</span>
                <ChevronRightIcon class="w-4 h-4 text-slate-300" />
              </li>
              <li @click="moveToPage('card/delivery-status')" class="text-sm font-bold text-slate-700 py-2.5 hover:text-[#00539C] cursor-pointer flex justify-between items-center">
                <span>발급 상황 조회</span>
                <ChevronRightIcon class="w-4 h-4 text-slate-300" />
              </li>
            </ul>
          </div>

        </div>
      </div>

      <!-- 3. 하단 설정 바 -->
      <footer class="p-4 bg-slate-50 border-t border-slate-200 flex justify-between items-center text-xs text-slate-500 font-medium">
        <button class="flex items-center gap-1 hover:text-slate-800">
          <SettingsIcon class="w-4 h-4 text-slate-400" /> App 환경설정
        </button>
        <span class="text-[10px] text-slate-400">V 4.2.0</span>
      </footer>

    </aside>

  </div>
</template>

<script lang="ts" setup>
import { ChevronRight, Settings, X } from 'lucide-vue-next'
  
const ChevronRightIcon = ChevronRight;
const SettingsIcon = Settings;

// 💡 지정한 라우터 name으로 안전하게 push 이동하는 전용 메서드입니다.
const moveToPage = (routeName: string) => {
  $vRouter.push({ name: routeName });
};
</script>

<style lang="css" scoped>
.card-menu {
    position: fixed;
    height: 100vh;
    top: 0;
    z-index: 100;
}
</style>
