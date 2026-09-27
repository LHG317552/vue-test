/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./index.html",
      "./src/**/*.{vue,js,ts,jsx,tsx}",
    ],
    // 중요: Vuetify 스타일보다 Tailwind 스타일이 우선 적용되도록 만듭니다.
    // 이 설정을 켜면 Tailwind 클래스들이 #app 자식 요소 안에서 높은 우선순위를 갖습니다.
    important: '#app', 
    theme: {
      extend: {},
    },
    plugins: [],
  }
  