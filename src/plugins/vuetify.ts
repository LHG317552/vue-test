import 'vuetify/styles'
import { createVuetify, type IconSet, type IconProps } from 'vuetify'
import { h, type Component } from 'vue'

// @lucide/vue에서 Vuetify 내부 UI 렌더링에 매핑할 핵심 아이콘을 가져옵니다.
import { 
  ChevronDown, 
  ChevronUp, 
  ChevronLeft, 
  ChevronRight, 
  Check, 
  Square, 
  CheckSquare, 
  X,
  AlertTriangle,
  Info,
  XCircle,
  Star,
  StarHalf
} from '@lucide/vue'

/**
 * IconProps에 존재하지 않는 size, class 등의 속성을 허용하도록 인터페이스 확장
 */
interface ExtendedIconProps extends IconProps {
    [key: string]: any; // TypeScript가 size, class 등을 유연하게 허용하도록 설정
  }
  

/**
 * @lucide/vue 아이콘을 Vuetify의 v-icon 컴포넌트 규격에 맞춰 안전하게 변환해 주는 커스텀 아이콘 셋 정의
 */
const lucideIconSet: IconSet = {
  component: (props: ExtendedIconProps) => {
    // Vuetify가 넘겨주는 아이콘 객체(컴포넌트)를 안전하게 받아 Vue의 h() 함수로 처리합니다.
    const iconComponent = props.icon as Component
    
    return h(iconComponent, {
      size: props.size,
      class: props.class,
      // 스타일 충돌 완화 및 Lucide 기본 획 굵기 설정 (선택사항)
      'stroke-width': 2 
    })
  }
}

export default createVuetify({
  icons: {
    // 1. 기본 아이콘 인터페이스를 커스텀 정의한 'lucide' 세트로 지정합니다.
    defaultSet: 'lucide',
    
    // 2. Vuetify의 내부 컴포넌트가 사용하는 고유 가상 ID에 Lucide 컴포넌트를 직접 매핑합니다.
    aliases: {
      collapse: ChevronUp,
      expand: ChevronDown,
      next: ChevronRight,
      prev: ChevronLeft,
      checkboxOn: CheckSquare,
      checkboxOff: Square,
      checkboxIndeterminate: Square,
      delimiter: Check, // Carousel 등의 인디케이터
      clear: X,
      success: Check,
      info: Info,
      warning: AlertTriangle,
      error: XCircle,
      ratingEmpty: Star,     // v-rating 비어있을 때
      ratingFull: Star,      // v-rating 채워져있을 때 (색상은 Vuetify가 주입)
      ratingHalf: StarHalf,
    },
    
    // 3. 작성한 SVG 렌더링 로직 등록
    sets: {
      lucide: lucideIconSet,
    },
  },
})
