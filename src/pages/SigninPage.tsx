
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '../components/common/Toast';
import { Spinner } from '../components/Spinner';
import LandingLayout from '../components/LandingLayout';
import { Button } from '../components/common/Button';
import { Input } from '../components/common/Input';

export default function SigninPage() {
  const { login, loading } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { showToast } = useToast();

  function validateEmail(email: string) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!email || !password) {
      setError('이메일과 비밀번호를 모두 입력하세요.');
      showToast('이메일과 비밀번호를 모두 입력하세요.', 'warning');
      return;
    }
    if (!validateEmail(email)) {
      setError('올바른 이메일 형식을 입력하세요.');
      showToast('올바른 이메일 형식을 입력하세요.', 'error');
      return;
    }
    try {
      await login(email, password);
      showToast('로그인 성공!', 'success');
      navigate('/dashboard');
    } catch (err) {
      setError('로그인 실패: 이메일 또는 비밀번호를 확인하세요.');
      showToast('로그인 실패: 이메일 또는 비밀번호를 확인하세요.', 'error');
    }
  };

  return (
    <LandingLayout>
      <div className="w-full max-w-sm sm:max-w-md bg-white rounded-2xl shadow-[0_8px_32px_0_rgba(59,130,246,0.10)] p-5 sm:p-9 flex flex-col items-center relative border border-gray-200 mx-auto">
          {loading && (
            <div className="absolute inset-0 bg-white/70 flex items-center justify-center z-10 rounded-[16px]">
              <Spinner />
            </div>
          )}
          <h2 className="text-2xl sm:text-[28px] font-extrabold mb-2 sm:mb-2 text-blue-500 text-center tracking-tight leading-tight">로그인</h2>
          <p className="mb-5 sm:mb-6 text-gray-500 text-center text-base sm:text-[16px]">이메일과 비밀번호로 로그인하거나, 게스트로 둘러볼 수 있습니다.</p>
          <form onSubmit={handleSubmit} className="w-full flex flex-col gap-3 sm:gap-4 mt-2">
            <Input
              type="email"
              placeholder="이메일"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              autoComplete="email"
              error={error && !password ? error : undefined}
            />
            <Input
              type="password"
              placeholder="비밀번호 (8자 이상)"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              minLength={8}
              autoComplete="current-password"
              error={error && !email ? error : undefined}
            />
            {error && <div className="text-red-500 text-[13px] sm:text-[14px] text-center mt-1">{error}</div>}
            <button type="submit" disabled={loading} className="mt-2 sm:mt-3 w-full h-11 sm:h-12 text-base sm:text-[18px] font-bold rounded-[10px] bg-blue-500 text-white border-none cursor-pointer shadow-[0_2px_8px_0_rgba(59,130,246,0.10)] transition-colors hover:bg-blue-600 disabled:opacity-60">
              {loading ? '로그인 중...' : '로그인'}
            </button>
            <button
              type="button"
              className="mt-2 w-full h-10 sm:h-11 text-[15px] sm:text-[16px] font-semibold rounded-[10px] bg-indigo-100 text-blue-700 border-none cursor-pointer flex items-center justify-center shadow-[0_1px_2px_0_rgba(59,130,246,0.04)] hover:bg-indigo-200"
              onClick={async () => {
                try {
                  await login('guest@guest.com', 'guest');
                  showToast('게스트로 로그인되었습니다.', 'success');
                  navigate('/dashboard');
                } catch (err) {
                  showToast('게스트 로그인 실패', 'error');
                }
              }}
            >
              <svg width="20" height="20" className="mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 2L2 7l10 5 10-5-10-5z" />
              </svg>
              게스트로 둘러보기
            </button>
          </form>
          <Button
            variant="secondary"
            size="md"
            className="w-full mt-3 h-11 sm:h-12 text-base sm:text-[16px]"
            onClick={() => navigate('/')}
          >
            홈으로
          </Button>
          <div className="text-center mt-5 sm:mt-6 text-[13px] sm:text-[14px] text-gray-500">
            아직 계정이 없으신가요?{' '}
            <Link to="/signup" className="text-blue-600 underline font-semibold hover:text-blue-800 ml-1">
              회원가입
            </Link>
          </div>
      </div>
    </LandingLayout>
  );
}
