import type { User } from 'firebase/auth';
import { createContext, useContext, useEffect, useState } from 'react';

interface AuthContextType {
  user: User | null;
  role: string | null;
  loading: boolean;
  signout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  role: null,
  loading: false,
  signout: async () => {},
});

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  // TODO: 실제 연동 시 Firebase Auth 상태 구독 및 role fetch 구현
  const [user, setUser] = useState<User | null>(null);
  const [role, setRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // 예시: 추후 onAuthStateChanged로 대체
    setUser(null);
    setRole(null);
  }, []);

  // (구현 제거됨: 실제 인증은 AuthContext에서 처리)
  const signout = async () => {
    setLoading(true);
    setUser(null);
    setRole(null);
    setLoading(false);
  };

  return (
  <AuthContext.Provider value={{ user, role, loading, signout }}>
      {children}
    </AuthContext.Provider>
  );
}
