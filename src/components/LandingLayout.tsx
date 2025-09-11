
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import type { ReactNode } from 'react';
import { Button } from './common/Button';

export function LandingHeader() {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  return (
    <header className="w-full flex items-center justify-between px-6 py-3 bg-white/85 shadow-sm backdrop-blur-md">
      <div
        className="flex items-center gap-2 cursor-pointer"
        onClick={() => navigate('/')}
        aria-label="홈으로 이동"
        tabIndex={0}
        onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') navigate('/'); }}
        role="link"
      >
        <span className="text-[1.5rem] font-extrabold text-blue-500 tracking-tight">Care SaaS</span>
        <span className="text-[0.9rem] text-blue-500 font-semibold ml-2 opacity-60 hidden sm:inline">스마트 케어 매칭</span>
      </div>
      <nav aria-label="주요 메뉴">
        <ul className="flex items-center gap-3 list-none m-0 p-0">
          <li>
            <button
              onClick={toggleTheme}
              aria-label="다크모드 토글"
              className="bg-none border-none text-[1.2rem] cursor-pointer mr-2 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              {theme === 'dark' ? '🌙' : '☀️'}
            </button>
          </li>
          <li>
            <Button
              variant="secondary"
              size="sm"
              className="min-w-[80px]"
              onClick={() => navigate('/signin')}
              ariaLabel="로그인 페이지로 이동"
            >
              로그인
            </Button>
          </li>
          <li>
            <Button
              variant="primary"
              size="sm"
              className="min-w-[80px]"
              onClick={() => navigate('/signup')}
              ariaLabel="회원가입 페이지로 이동"
            >
              회원가입
            </Button>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export function LandingFooter() {
  return (
    <footer className="w-full px-8 pt-8 pb-6 bg-gray-50 text-gray-400 text-center text-[0.95rem] border-t border-gray-200 mt-12">
      <div className="mb-2 text-gray-400 text-[0.95em]">
        © 2025 <span className="text-blue-500 font-bold">Care SaaS</span>. All rights reserved.
      </div>
      <div className="flex flex-col gap-1 items-center justify-center text-[0.95em]">
        <span className="text-blue-500 opacity-70 font-semibold">스마트 케어 매칭 플랫폼 MVP</span>
        <div className="flex gap-4 mt-1">
          <a href="#" className="text-gray-400 hover:underline" aria-label="이용약관">이용약관</a>
          <a href="#" className="text-gray-400 hover:underline" aria-label="문의">문의</a>
        </div>
      </div>
    </footer>
  );
}

export default function LandingLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-sky-100 via-white to-purple-100">
      <LandingHeader />
      <main className="flex-1 flex flex-col justify-center">{children}</main>
      <LandingFooter />
    </div>
  );
}
