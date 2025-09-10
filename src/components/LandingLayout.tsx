import { Button } from './common/Button';

import { useNavigate } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';

export function LandingHeader() {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  return (
    <header
      style={{
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '12px 32px',
        background: 'rgba(255,255,255,0.85)',
        boxShadow: '0 2px 8px 0 rgba(0,0,0,0.04)',
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 40,
        backdropFilter: 'blur(8px)'
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          cursor: 'pointer',
        }}
        onClick={() => navigate('/')}
        aria-label="홈으로 이동"
        tabIndex={0}
        onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') navigate('/'); }}
        role="link"
      >
        <span style={{
          fontSize: '1.5rem',
          fontWeight: 800,
          color: '#3b82f6',
          letterSpacing: '-0.02em',
        }}>
          Care SaaS
        </span>
        <span style={{
          fontSize: '0.9rem',
          color: '#3b82f6',
          fontWeight: 600,
          marginLeft: 8,
          opacity: 0.6,
          display: 'none',
        }}
        className="sm:inline"
        >
          스마트 케어 매칭
        </span>
      </div>
      <nav aria-label="주요 메뉴">
        <ul style={{ display: 'flex', alignItems: 'center', gap: 12, listStyle: 'none', margin: 0, padding: 0 }}>
          <li>
            <button
              onClick={toggleTheme}
              aria-label="다크모드 토글"
              style={{
                background: 'none',
                border: 'none',
                fontSize: '1.2rem',
                cursor: 'pointer',
                marginRight: 8,
                color: theme === 'dark' ? '#f3f4f6' : '#23232a',
                outline: 'none',
              }}
              onFocus={e => e.currentTarget.style.boxShadow = '0 0 0 2px #3b82f6'}
              onBlur={e => e.currentTarget.style.boxShadow = 'none'}
            >
              {theme === 'dark' ? '🌙' : '☀️'}
            </button>
          </li>
          <li>
            <Button
              variant="secondary"
              size="sm"
              style={{ minWidth: 80 }}
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
              style={{ minWidth: 80 }}
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
    <footer
      style={{
        width: '100%',
        padding: '32px 32px 24px 32px',
        background: '#f9fafb',
        color: '#6b7280',
        textAlign: 'center',
        fontSize: '0.95rem',
        marginTop: 48,
        borderTop: '1px solid #e5e7eb',
      }}
      aria-label="사이트 정보 및 링크"
    >
      <div style={{ marginBottom: 8, color: '#9ca3af', fontSize: '0.95em' }}>
        © 2025 <span style={{ color: '#3b82f6', fontWeight: 700 }}>Care SaaS</span>. All rights reserved.
      </div>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 4,
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '0.95em',
      }}>
        <span style={{ color: '#3b82f6', opacity: 0.7, fontWeight: 600 }}>스마트 케어 매칭 플랫폼 MVP</span>
        <div style={{ display: 'flex', gap: 16, marginTop: 4 }}>
          <a href="#" style={{ color: '#6b7280', textDecoration: 'none' }} aria-label="이용약관">이용약관</a>
          <a href="#" style={{ color: '#6b7280', textDecoration: 'none' }} aria-label="문의">문의</a>
        </div>
      </div>
    </footer>
  );
}
