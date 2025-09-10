
import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { Spinner } from '../components/Spinner';
import { Button } from '../components/common/Button';
import { Input } from '../components/common/Input';

export default function SignupPage() {
  const { register, loading } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      // 실제 회원가입 로직은 추후 구현
  await register(email, password);
      navigate('/dashboard');
    } catch (err) {
      setError('회원가입 실패');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 to-white p-4 sm:p-6">
      <div className="w-full max-w-sm sm:max-w-md bg-white rounded-2xl shadow-[0_8px_32px_0_rgba(59,130,246,0.10)] p-5 sm:p-9 flex flex-col items-center relative border border-gray-200">
        {loading && (
          <div className="absolute inset-0 bg-white/70 flex items-center justify-center z-10 rounded-[16px]">
            <Spinner />
          </div>
        )}
        <h2 className="text-2xl sm:text-[28px] font-extrabold mb-2 sm:mb-2 text-blue-500 text-center tracking-tight leading-tight">회원가입</h2>
        <p className="mb-5 sm:mb-6 text-gray-500 text-center text-base sm:text-[16px]">이메일과 비밀번호를 입력해 회원가입을 진행하세요.</p>
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
            autoComplete="new-password"
            error={error && !email ? error : undefined}
          />
          {error && <div className="text-red-500 text-[13px] sm:text-[14px] text-center mt-1">{error}</div>}
          <button type="submit" disabled={loading} className="mt-2 sm:mt-3 w-full h-11 sm:h-12 text-base sm:text-[18px] font-bold rounded-[10px] bg-blue-500 text-white border-none cursor-pointer shadow-[0_2px_8px_0_rgba(59,130,246,0.10)] transition-colors hover:bg-blue-600 disabled:opacity-60">
            {loading ? '가입 중...' : '회원가입'}
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
        <div className="mt-5 sm:mt-6 text-gray-500 text-[13px] sm:text-[14px] text-center">
          이미 계정이 있으신가요?{' '}
          <Link to="/signin" className="text-blue-600 underline font-semibold hover:text-blue-800 ml-1">
            로그인
          </Link>
        </div>
      </div>
    </div>
  );
}
