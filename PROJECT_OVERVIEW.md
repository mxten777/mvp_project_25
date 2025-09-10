# 프로젝트 개요 및 구조 정리

## 1. 프로젝트 성격
- **Care SaaS**: 스마트 케어 매칭 플랫폼 (B2B/B2C)
- **기술스택**: React (TypeScript), React Router, Tailwind CSS, React Query
- **목표**: 모바일/데스크탑 반응형, 일관된 UI/UX, 확장성 있는 디자인 시스템, 클린코드

## 2. 주요 진행 내역
- **UI/UX 통일**: Tailwind CSS로 전체 스타일 통일, 인라인 스타일 제거
- **모바일/데스크탑 반응형**: Tailwind의 반응형 유틸리티 적극 활용
- **컴포넌트화**: Button, Input, Toast 등 공통 컴포넌트 분리 및 재사용
- **라우팅/네비게이션**: React Router 기반, NotFound/에러 바운더리 적용
- **디자인 시스템**: tailwind.config.js에 색상, 폰트, 그림자, 다크모드 등 토큰화
- **폴더/파일 구조 표준화**: components, pages, hooks, utils, contexts 등 분리
- **불필요한 코드/임포트 정리**: 클린코드 및 유지보수성 강화

## 3. 폴더 구조 예시
```
src/
  components/      # 공통 UI 컴포넌트(Button, Input, Layout 등)
  pages/           # 라우트별 페이지(SigninPage, DashboardPage 등)
  hooks/           # 커스텀 훅
  utils/           # 유틸리티 함수
  contexts/        # Context API 관련
  App.tsx          # 앱 엔트리포인트 및 라우터
  tailwind.config.js
```

## 4. 디자인 시스템(토큰)
- **색상**: primary, gray, background, accent, danger, success 등
- **폰트**: fontFamily 커스텀
- **그림자**: boxShadow 커스텀
- **다크모드**: Tailwind darkMode 지원

## 5. 코드 구조 예시(App.tsx)
```tsx
// library imports
import { createBrowserRouter, RouterProvider, useNavigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
// components, contexts, pages, ...
```

## 6. 남은 과제/고도화 방향
- react-error-boundary 등 외부 에러 바운더리 통합
- 디자인 토큰을 모든 컴포넌트에 일관 적용
- 테스트 코드 및 스토리북 도입
- 폴더 구조/네이밍 일관성 추가 강화

---

> **최종 목표:** 유지보수성과 확장성이 뛰어난, 일관된 UI/UX의 Care SaaS 플랫폼 구축
