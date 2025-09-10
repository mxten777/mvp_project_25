import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useState, useEffect } from 'react';
import { Toaster } from 'react-hot-toast';

const nav = [
  { to: '/dashboard', label: '대시보드', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
  { to: '/requests', label: '케어요청', icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01' },
  { to: '/caregivers', label: '요양보호사', icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z' },
  { to: '/org', label: '기관관리', icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4' },
];

import type { ReactNode } from 'react';

interface LayoutProps {
  children?: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  // PC인지 모바일인지 구분하는 상태 (768px 기준)
  const [width, setWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 0);
  const isMobile = width < 768;
  
  // 사이드바 표시 여부 (PC에서는 항상 true, 모바일에서는 토글 가능)
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  const location = useLocation();
  const navigate = useNavigate();
  const { user, role, logout, loading } = useAuth();
  
  // 화면 크기 변경 감지
  useEffect(() => {
    function handleResize() {
      setWidth(window.innerWidth);
    }
    
    // 초기화 및 이벤트 리스너 등록
    handleResize();
    window.addEventListener('resize', handleResize);
    
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  // 모바일일 때만 스크롤 처리
  useEffect(() => {
    if (isMobile && sidebarOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [isMobile, sidebarOpen]);
  
  // 다크모드 상태를 localStorage에 저장/불러오기
  const [dark, setDark] = useState(() => {
    if (typeof window !== 'undefined') {
      return document.documentElement.classList.contains('dark');
    }
    return false;
  });
  
  const toggleDark = () => {
    setDark((d) => {
      document.documentElement.classList.toggle('dark', !d);
      localStorage.setItem('theme', !d ? 'dark' : 'light');
      return !d;
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-800 flex">
      {/* PC 전용 사이드바 - 768px 이상에서만 표시 */}
      {!isMobile && (
        <aside
          className="w-28 bg-gradient-to-b from-indigo-700 to-indigo-900 dark:from-gray-800 dark:to-gray-950 shadow-xl flex flex-col items-center"
          aria-label="데스크톱 사이드바 네비게이션"
        >
          <div className="py-6 flex flex-col items-center border-b border-white/20 dark:border-gray-700/30 w-full">
            <div className="w-10 h-10 flex items-center justify-center bg-white/15 rounded-md mb-2">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                <path d="M12 22.5v-6"></path>
                <path d="M3.3 7l8.7 5 8.7-5"></path>
              </svg>
            </div>
            <h2 className="text-lg font-bold text-white tracking-tight">보살핌</h2>
          </div>
          <nav className="flex-1 flex flex-col items-center gap-8 py-8 w-full">
            {nav.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className={`flex flex-col items-center group transition-all duration-200 w-full py-1.5 ${location.pathname.startsWith(item.to)
                  ? 'bg-white/10 shadow-md' : 'hover:bg-white/5'} rounded-xl`}
              >
                <svg 
                  className={`w-12 h-12 mb-1 ${location.pathname.startsWith(item.to) ? 'text-indigo-200' : 'text-white/80 group-hover:text-indigo-100'} transition-colors`}
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24" 
                  strokeWidth="2.2"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
                </svg>
                <span className="text-xs font-semibold text-white mt-2 tracking-tight text-center whitespace-nowrap">{item.label}</span>
              </Link>
            ))}
          </nav>
          <div className="p-4 border-t border-white/20 dark:border-gray-700/30 w-full">
            <div className="flex items-center justify-center">
              <span className="text-xs text-white/80">© 2025 보살핌</span>
            </div>
          </div>
        </aside>
      )}
      
      {/* 모바일 전용 사이드바 - 768px 미만에서만 표시 */}
      {isMobile && (
        <aside
          className={`
            fixed top-6 left-0 w-3/5 max-w-[320px] h-[60vh] z-40
            bg-gradient-to-b from-indigo-700 to-indigo-900 dark:from-gray-800 dark:to-gray-950
            transition-transform duration-300 shadow-2xl flex flex-col
            ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          `}
          aria-label="모바일 사이드바 네비게이션"
        >
          <div className="px-6 py-3 border-b border-white/20 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 flex items-center justify-center bg-white/15 rounded-md">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                  <path d="M12 22.5v-6"></path>
                  <path d="M3.3 7l8.7 5 8.7-5"></path>
                </svg>
              </div>
              <h2 className="text-lg font-bold text-white tracking-tight">보살핌</h2>
            </div>
            <button 
              className="p-2 rounded-md bg-white/10 hover:bg-white/20 text-white transition-all ml-2" 
              onClick={() => setSidebarOpen(false)}
              aria-label="사이드바 닫기"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 6L6 18M6 6l12 12"></path>
              </svg>
            </button>
          </div>
          <nav className="flex flex-col gap-1 px-3 py-2">
            {nav.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className={`
                  flex flex-row items-center gap-3 px-3 py-3 rounded-lg text-base font-medium transition-all duration-200
                  ${location.pathname.startsWith(item.to)
                    ? 'bg-white/15 text-white font-semibold shadow-sm backdrop-blur-sm'
                    : 'text-indigo-100 hover:bg-indigo-800 hover:text-white'}
                `}
                onClick={() => setSidebarOpen(false)}
                tabIndex={0}
                aria-label={item.label}
              >
                <svg 
                  className="w-6 h-6 flex-shrink-0" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24" 
                  strokeWidth="1.5"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
                </svg>
                <span className="leading-tight text-base">{item.label}</span>
              </Link>
            ))}
          </nav>
          <div className="p-2 mt-auto border-t border-white/20">
            <div className="flex items-center justify-center">
              <span className="text-xs text-white/80">© 2025 보살핌</span>
            </div>
          </div>
        </aside>
      )}
      
      {/* Overlay for mobile - only show on mobile when sidebar is open */}
      {isMobile && (
        <div
          className={`fixed top-0 left-[60vw] w-[40vw] h-full z-20 bg-black/20 transition-opacity duration-300 ${sidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
          onClick={() => setSidebarOpen(false)}
          aria-label="사이드바 닫기 오버레이"
          tabIndex={-1}
        />
      )}
      
      {/* Main */}
  <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Header */}
        <header className="sticky top-0 z-10 bg-white dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600 shadow-sm backdrop-blur-sm bg-white/95 dark:bg-gray-700/95">
          <div className="max-w-7xl mx-auto px-4 py-3 md:py-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              {/* 햄버거 버튼은 모바일 화면에서만 표시 */}
              {isMobile && (
                <button
                  className="p-1.5 rounded-lg text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50/90 dark:hover:bg-gray-700/90 transition-colors"
                  onClick={() => setSidebarOpen(true)}
                  aria-label="사이드바 열기"
                >
                  <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.75" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16"/>
                  </svg>
                </button>
              )}
              {/* 모바일에서는 로고와 페이지 제목 함께 표시 */}
              {isMobile && !sidebarOpen && (
                <div className="flex items-center">
                  <div className="w-7 h-7 flex items-center justify-center bg-indigo-100 dark:bg-indigo-900/50 rounded-md mr-2">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-indigo-600 dark:text-indigo-300">
                      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                      <path d="M12 22.5v-6"></path>
                      <path d="M3.3 7l8.7 5 8.7-5"></path>
                    </svg>
                  </div>
                  <div className="text-base font-semibold text-gray-800 dark:text-gray-200">
                    {/* 현재 경로에 기반한 페이지 타이틀 */}
                    {location.pathname.includes('/dashboard') && '대시보드'}
                    {location.pathname.includes('/requests') && '케어요청'}
                    {location.pathname.includes('/caregivers') && '요양보호사'}
                    {location.pathname.includes('/org') && '기관관리'}
                    {!location.pathname.includes('/dashboard') && !location.pathname.includes('/requests') && 
                     !location.pathname.includes('/caregivers') && !location.pathname.includes('/org') && '보살핌'}
                  </div>
                </div>
              )}
              {!isMobile && (
                <div className="text-lg font-medium text-gray-800 dark:text-gray-200">
                  {/* 현재 경로에 기반한 페이지 타이틀 */}
                  {location.pathname.includes('/dashboard') && '대시보드'}
                  {location.pathname.includes('/requests') && '케어요청'}
                  {location.pathname.includes('/caregivers') && '요양보호사'}
                  {location.pathname.includes('/org') && '기관관리'}
                </div>
              )}
            </div>
            <div className="flex items-center gap-3 md:gap-4">
              {user ? (
                <div className="flex items-center gap-2 md:gap-4">
                  <div className="hidden md:flex items-center gap-2">
                    <div className="h-8 w-8 rounded-full bg-indigo-100 dark:bg-gray-700 flex items-center justify-center text-indigo-600 dark:text-indigo-400 text-sm font-medium">
                      {user.email.substring(0, 1).toUpperCase()}
                    </div>
                    <span className="text-sm text-gray-700 dark:text-gray-300">
                      {user.email} <span className="px-2 py-0.5 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 rounded text-xs font-medium">{role}</span>
                    </span>
                  </div>
                  <button
                    className="px-2 md:px-3 py-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 dark:bg-red-900/20 dark:hover:bg-red-900/30 dark:text-red-400 rounded-lg text-xs md:text-sm font-medium transition-colors"
                    onClick={async () => { await logout(); navigate('/signin'); }}
                    disabled={loading}
                  >
                    로그아웃
                  </button>
                </div>
              ) : (
                <>
                  <Link to="/signin" className="text-sm text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300 font-medium mx-2">로그인</Link>
                  <Link to="/signup" className="text-sm text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300 font-medium">회원가입</Link>
                </>
              )}
              <button
                className="p-1.5 md:p-2 rounded-lg bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 transition-colors"
                onClick={toggleDark}
                aria-label="다크모드 토글"
              >
                <span className="text-sm md:text-base">{dark ? '🌙' : '☀️'}</span>
              </button>
            </div>
          </div>
        </header>
        <main className={`flex-1 p-4 md:p-6 w-full bg-gray-50 dark:bg-gray-900 ${isMobile ? 'pb-16' : ''}`}>
          {children ? children : <Outlet />}
        </main>
        
        {/* 모바일 하단 네비게이션 바 */}
        {isMobile && (
          <nav className="fixed bottom-0 inset-x-0 bg-white dark:bg-gray-800 shadow-lg border-t border-gray-200 dark:border-gray-700 z-30">
            <div className="grid grid-cols-4 h-10">
              {nav.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  className={`
                    flex items-center justify-center text-xs
                    ${location.pathname.startsWith(item.to)
                      ? 'text-indigo-600 dark:text-indigo-400'
                      : 'text-gray-500 dark:text-gray-400'}
                  `}
                >
                  <svg
                    className="w-3.5 h-3.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
                  </svg>
                </Link>
              ))}
            </div>
          </nav>
        )}
      </div>
      <Toaster position="bottom-right" toastOptions={{
        className: 'rounded-lg shadow-md p-4',
        duration: 3000,
        style: {
          background: dark ? '#1f2937' : '#ffffff',
          color: dark ? '#f3f4f6' : '#1f2937',
          border: dark ? '1px solid #374151' : '1px solid #e5e7eb',
        },
        success: {
          iconTheme: {
            primary: '#10b981',
            secondary: 'white',
          },
        },
        error: {
          iconTheme: {
            primary: '#ef4444',
            secondary: 'white',
          },
        }
      }} />
    </div>
  );
}
