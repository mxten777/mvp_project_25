import { createContext, useContext, useEffect, useState } from 'react';
// import { onAuthStateChanged, signOut, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
// import type { User } from 'firebase/auth';
// import { auth } from '../firebase';

interface AuthContextType {
  user: { email: string } | null;
  loading: boolean;
  role: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<{ email: string } | null>(null);
  const [loading, setLoading] = useState(true);
  const [role, setRole] = useState<string | null>(() => localStorage.getItem('role'));

  useEffect(() => {
    // mock: localStorage에 userEmail 있으면 로그인 상태로 간주
    const email = localStorage.getItem('userEmail');
    if (email) {
      setUser({ email });
      setRole(localStorage.getItem('role'));
    }
    setLoading(false);
  }, []);

  const login = async (email: string, _password: string) => {
    setLoading(true);
    // mock: 이메일에 따라 role 지정
    const role = email.startsWith('admin') ? 'admin' : email.startsWith('org') ? 'org' : 'client';
    setUser({ email });
    setRole(role);
    localStorage.setItem('userEmail', email);
    localStorage.setItem('role', role);
    setLoading(false);
  };

  const register = async (email: string, _password: string) => {
    setLoading(true);
    setUser({ email });
    setRole('client');
    localStorage.setItem('userEmail', email);
    localStorage.setItem('role', 'client');
    setLoading(false);
  };

  const logout = async () => {
    setLoading(true);
    setUser(null);
    setRole(null);
    localStorage.removeItem('userEmail');
    localStorage.removeItem('role');
    setLoading(false);
  };

  return (
    <AuthContext.Provider value={{ user, loading, role, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
