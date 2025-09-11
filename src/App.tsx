


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
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-sky-100 via-white to-purple-100 px-4">
      <h1 className="text-5xl font-extrabold text-blue-600 mb-4">404</h1>
      <p className="text-lg text-gray-600 mb-8">페이지를 찾을 수 없습니다.</p>
      <Button variant="primary" size="md" onClick={() => navigate('/')}>홈으로 이동</Button>
    </div>
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
          >
            <h1
              id="main-title"
              className="text-3xl sm:text-4xl font-extrabold mb-2 sm:mb-3 text-blue-700 tracking-tight drop-shadow-sm landing-title"
            >
              Care SaaS
            </h1>
            <p className="text-gray-500 mb-7 sm:mb-10 text-center text-base sm:text-lg">스마트 케어 매칭</p>
            <div className="flex flex-col gap-2 sm:gap-3 w-full">
              {/* 로그인/회원가입 버튼 그룹 */}
              <Button variant="primary" size="md" className="w-full h-12 sm:h-14 text-base sm:text-lg" onClick={() => navigate('/signin')}>로그인</Button>
              <Button variant="secondary" size="md" className="w-full h-12 sm:h-14 text-base sm:text-lg" onClick={() => navigate('/signup')}>회원가입</Button>
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
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ToastProvider>
          <RouterProvider router={router} />
        </ToastProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}