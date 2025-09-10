import React from 'react';
import { Button } from '../components/common/Button';
import { useToast } from '../components/common/Toast';

export default function ToastDemoPage() {
  const { showToast } = useToast();
  return (
    <div style={{ padding: 32 }}>
      <h2>Toast 알림 테스트</h2>
      <div style={{ display: 'flex', gap: 12, marginTop: 16 }}>
        <Button onClick={() => showToast('정보 메시지입니다.', 'info')}>Info</Button>
        <Button onClick={() => showToast('성공적으로 처리되었습니다!', 'success')}>Success</Button>
        <Button onClick={() => showToast('문제가 발생했습니다.', 'error')}>Error</Button>
        <Button onClick={() => showToast('경고: 확인이 필요합니다.', 'warning')}>Warning</Button>
      </div>
    </div>
  );
}
