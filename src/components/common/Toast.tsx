import React, { createContext, useContext, useState, useCallback, useRef, useEffect } from 'react';
import { colors, radii, spacing } from '../../theme';

export type ToastType = 'info' | 'success' | 'error' | 'warning';

export interface Toast {
  id: number;
  message: string;
  type?: ToastType;
  duration?: number;
}

interface ToastContextType {
  showToast: (message: string, type?: ToastType, duration?: number) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used within ToastProvider');
  return ctx;
}


export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [fadeIds, setFadeIds] = useState<number[]>([]); // 페이드아웃용 id
  const timers = useRef<{[id: number]: ReturnType<typeof setTimeout>}>({});

  const showToast = useCallback((message: string, type: ToastType = 'info', duration = 3000) => {
    const id = Date.now() + Math.random();
    setToasts(ts => [...ts, { id, message, type, duration }]);
    timers.current[id] = setTimeout(() => {
      setFadeIds(fade => [...fade, id]);
      setTimeout(() => {
        setToasts(ts => ts.filter(t => t.id !== id));
        setFadeIds(fade => fade.filter(fid => fid !== id));
        delete timers.current[id];
      }, 400); // 페이드아웃 시간
    }, duration);
  }, []);

  // 언마운트시 타이머 정리
  useEffect(() => () => { Object.values(timers.current).forEach(clearTimeout); }, []);

  // keyframes를 동적으로 주입 (최초 1회)
  useEffect(() => {
    if (document.getElementById('toast-anim-style')) return;
    const style = document.createElement('style');
    style.id = 'toast-anim-style';
    style.innerHTML = `
      @keyframes toast-fade-in { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: none; } }
      @keyframes toast-fade-out { from { opacity: 1; transform: none; } to { opacity: 0; transform: translateY(16px); } }
    `;
    document.head.appendChild(style);
    return () => { document.head.removeChild(style); };
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div
        aria-live="polite"
        aria-atomic="true"
        style={{
          position: 'fixed',
          top: spacing.lg,
          right: spacing.lg,
          zIndex: 1000,
          display: 'flex',
          flexDirection: 'column',
          gap: spacing.sm,
        }}
      >
        {toasts.map(({ id, message, type }) => (
          <div
            key={id}
            role="status"
            style={{
              minWidth: 220,
              maxWidth: 320,
              background: toastBg(type),
              color: toastColor(type),
              borderRadius: radii.md,
              boxShadow: '0 2px 8px 0 rgba(0,0,0,0.10)',
              padding: `${spacing.md} ${spacing.lg}`,
              fontWeight: 600,
              fontSize: 16,
              outline: 'none',
              opacity: fadeIds.includes(id) ? 0 : 1,
              animation: fadeIds.includes(id)
                ? 'toast-fade-out 0.4s forwards'
                : 'toast-fade-in 0.4s',
              transition: 'opacity 0.4s',
            }}
            tabIndex={0}
          >
            {message}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

function toastBg(type?: ToastType) {
  switch (type) {
    case 'success': return '#22c55e';
    case 'error': return colors.danger;
    case 'warning': return '#facc15';
    default: return '#23232a';
  }
}
function toastColor(type?: ToastType) {
  switch (type) {
    case 'warning': return '#23232a';
    default: return '#fff';
  }
}
