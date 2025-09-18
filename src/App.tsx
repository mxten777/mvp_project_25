import React from 'react';

// 다크모드 토글 커스텀 훅
function useDarkMode() {
  const [isDark, setIsDark] = React.useState(() => {
    if (typeof window === 'undefined') return false;
    const ls = localStorage.getItem('theme');
    if (ls) return ls === 'dark';
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });
  React.useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);
  return [isDark, setIsDark] as const;
}



// =====================
// library imports (always import libraries first)
import { createBrowserRouter, RouterProvider, useNavigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// =====================
// components
import Layout from './components/Layout';
import { ProtectedRoute } from './components/ProtectedRoute';
import { Button } from './components/common/Button';
import { LandingHeader, LandingFooter } from './components/LandingLayout';
import { ToastProvider } from './components/common/Toast';

// contexts
import { AuthProvider } from './contexts/AuthContext';

// pages
import SigninPage from './pages/SigninPage';
import SignupPage from './pages/SignupPage';
import DashboardPage from './pages/DashboardPage';
import RequestsPage from './pages/RequestsPage';
import CaregiversPage from './pages/CaregiversPage';
import OrgPage from './pages/OrgPage';
import ToastDemoPage from './pages/ToastDemoPage';

// test/pages (consider moving to __tests__ or pages/demo)
import TailwindTest from './TailwindTest';
import SimpleTailwindTest from './SimpleTailwindTest';
import InlineStyleTest from './InlineStyleTest';

// hooks (example, if you have custom hooks)
// import useAuth from './hooks/useAuth';

// utils (example, if you have utility functions)
// import { formatDate } from './utils/date';

// =====================
// 404 NotFound Page
function NotFound() {
  const navigate = useNavigate();
  return (
    <main
      role="main"
      aria-label="404 Not Found"
      className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-sky-100 via-white to-purple-100 px-4"
    >
      <h1 className="text-5xl font-extrabold text-blue-600 mb-4" tabIndex={0} aria-label="404">404</h1>
      <p className="text-lg text-gray-600 mb-8" tabIndex={0}>페이지를 찾을 수 없습니다.</p>
  <Button
    variant="primary"
    size="md"
    onClick={() => navigate('/')}
    aria-label="홈으로 이동"
    tabIndex={0}
    className="transition-transform duration-200 active:scale-95 focus:ring-2 focus:ring-primary-light"
  >
    홈으로 이동
  </Button>
    </main>
  );
}



// =====================
// Landing Page
function Landing() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-sky-100 via-white to-purple-100">
      <LandingHeader />
      <main
        role="main"
        aria-label="메인 콘텐츠"
        className="flex-1 flex justify-center items-center px-2 pt-12 pb-16 sm:px-4 sm:pt-16 sm:pb-20"
      >
        <section
          className="mx-auto w-full max-w-md px-2 sm:max-w-lg md:max-w-xl"
          aria-labelledby="main-title"
        >
          <article
            className="bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl p-5 sm:p-8 flex flex-col items-center border border-blue-100"
            role="region"
            aria-label="Care SaaS 소개"
          >
            <h1
              id="main-title"
              className="text-3xl sm:text-4xl font-extrabold mb-2 sm:mb-3 text-blue-700 tracking-tight drop-shadow-sm landing-title"
              tabIndex={0}
            >
              Care SaaS
            </h1>
            <p className="text-gray-500 mb-7 sm:mb-10 text-center text-base sm:text-lg" tabIndex={0}>스마트 케어 매칭</p>
            <div className="flex flex-col gap-2 sm:gap-3 w-full">
              {/* 로그인/회원가입 버튼 그룹 */}
              <Button variant="primary" size="md" className="w-full h-12 sm:h-14 text-base sm:text-lg" onClick={() => navigate('/signin')} aria-label="로그인" tabIndex={0}>로그인</Button>
              <Button variant="secondary" size="md" className="w-full h-12 sm:h-14 text-base sm:text-lg" onClick={() => navigate('/signup')} aria-label="회원가입" tabIndex={0}>회원가입</Button>
            </div>
          </article>
        </section>
      </main>
      <div className="mt-auto">
        <LandingFooter />
      </div>
    </div>
  );
}

// =====================
// Router
const router = createBrowserRouter([
  { path: '/', element: <Landing /> },
  { path: '/signin', element: <SigninPage /> },
  { path: '/signup', element: <SignupPage /> },
  { path: '/test', element: <TailwindTest /> },
  { path: '/simple-test', element: <SimpleTailwindTest /> },
  { path: '/inline', element: <InlineStyleTest /> },
  { path: '/toast-demo', element: <ToastDemoPage /> },
  {
    element: <Layout />, // 공통 레이아웃
    children: [
      { path: '/dashboard', element: <ProtectedRoute><DashboardPage /></ProtectedRoute> },
      { path: '/requests', element: <ProtectedRoute><RequestsPage /></ProtectedRoute> },
      { path: '/caregivers', element: <ProtectedRoute><CaregiversPage /></ProtectedRoute> },
      { path: '/org', element: <ProtectedRoute allowedRoles={['admin','org']}><OrgPage /></ProtectedRoute> },
    ],
  },
  { path: '*', element: <NotFound /> },
]);

// =====================
// QueryClient (react-query)
const queryClient = new QueryClient();

// =====================
// App Root
export default function App() {
  const [isDark, setIsDark] = useDarkMode();
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ToastProvider>
          {/* 다크모드 토글 버튼 (우상단 고정) */}
          <button
            aria-label={isDark ? '라이트모드로 전환' : '다크모드로 전환'}
            onClick={() => setIsDark(d => !d)}
            className="fixed top-4 right-4 z-50 p-2 rounded-full bg-white/80 dark:bg-gray-800/80 shadow-lg border border-gray-200 dark:border-gray-700 text-xl transition-colors hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-primary"
            type="button"
          >
            {isDark ? '🌙' : '☀️'}
          </button>
          <RouterProvider router={router} />
        </ToastProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}