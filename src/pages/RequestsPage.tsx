import React, { useState, useEffect } from 'react';
// Caregiver 타입과 mockCaregivers 임포트
import type { Caregiver } from '../types/caregiver';
import { mockCaregivers } from '../mocks/mockCaregivers';
import type { CareRequest } from '../types/request';
import { mockRequests } from '../mocks/mockRequests';

export default function RequestsPage() {
  // 반응형 레이아웃 상태 (Tailwind로 대체, 불필요)
  // 로딩/에러 상태 추가
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState('');
  const [requests, setRequests] = useState<CareRequest[]>([]);
  useEffect(() => {
    setLoading(true);
    setLoadError('');
    // 데이터 fetch 시뮬레이션 (1초 후 mock 데이터)
    const timer = setTimeout(() => {
      // 에러 시뮬레이션: setLoadError('데이터를 불러오지 못했습니다.'); setLoading(false); return;
      setRequests(mockRequests);
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);
  const [selected, setSelected] = useState<CareRequest | null>(null);
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [location, setLocation] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!title || !date || !location) {
      setError('모든 항목을 입력하세요.');
      return;
    }
    setRequests([
      { id: Date.now().toString(), title, date, location, status: 'open', name: '', phone: '', address: '', createdAt: new Date().toISOString() },
      ...requests,
    ]);
    setTitle('');
    setDate('');
    setLocation('');
  };

  return (
    <main role="main" aria-label="케어요청 메인 영역" className="max-w-xl mx-auto py-8 px-2 w-full">
      <h2 className="text-[28px] font-extrabold mb-6 text-blue-600 tracking-tight leading-tight">케어요청</h2>
      <form onSubmit={handleSubmit} aria-label="케어요청 등록 폼" className="flex flex-col gap-5 mb-8 bg-white rounded-[18px] shadow-[0_2px_12px_0_rgba(59,130,246,0.08)] p-7 max-w-lg w-full mx-auto">
        <div className="flex flex-col md:flex-row gap-3 md:gap-2">
          <label htmlFor="req-title" className="sr-only">요청 제목</label>
          <input id="req-title" placeholder="요청 제목" value={title} onChange={e => setTitle(e.target.value)} aria-label="요청 제목" aria-required="true"
            className="flex-1 h-11 text-[16px] border border-gray-300 rounded-[8px] px-3 bg-white text-gray-900 outline-none shadow-sm min-w-0" />
          <label htmlFor="req-date" className="sr-only">요청 날짜</label>
          <input id="req-date" type="date" value={date} onChange={e => setDate(e.target.value)} aria-label="요청 날짜" aria-required="true"
            className="h-11 text-[16px] border border-gray-300 rounded-[8px] px-3 bg-white text-gray-900 outline-none shadow-sm min-w-0" />
        </div>
        <label htmlFor="req-location" className="sr-only">장소</label>
        <input id="req-location" placeholder="장소" value={location} onChange={e => setLocation(e.target.value)} aria-label="장소" aria-required="true"
          className="h-11 text-[16px] border border-gray-300 rounded-[8px] px-3 bg-white text-gray-900 outline-none shadow-sm min-w-0" />
        {error && <div className="text-red-500 text-[14px]">{error}</div>}
        <button type="submit" className="mt-1 w-full h-12 text-[18px] font-bold rounded-[10px] bg-blue-500 text-white border-none cursor-pointer shadow-[0_2px_8px_0_rgba(59,130,246,0.10)] transition-colors hover:bg-blue-600">요청 등록</button>
      </form>
      <section aria-label="요청 목록" className="flex flex-col gap-4 w-full">
        {loading ? (
          <div className="flex justify-center items-center min-h-[120px]">
            <div className="w-9 h-9 border-4 border-blue-100 border-t-blue-600 rounded-full animate-spin" />
          </div>
        ) : loadError ? (
          <div className="text-red-500 text-[16px] text-center py-8">{loadError}</div>
        ) : requests.length === 0 ? (
          <div className="text-gray-500 text-[15px] text-center py-8">등록된 요청이 없습니다.<br />새로운 요청을 등록해보세요!</div>
        ) : (
          requests.map((req) => (
            <button
              key={req.id}
              role="listitem"
              aria-label={`요청: ${req.title}, 날짜: ${req.date}`}
              tabIndex={0}
              className="w-full text-left bg-white rounded-[14px] shadow-[0_2px_8px_0_rgba(59,130,246,0.08)] px-5 py-5 flex flex-row items-center justify-between border border-gray-200 cursor-pointer focus:ring-2 focus:ring-blue-400 focus:outline-none min-h-[60px] transition-shadow hover:shadow-lg"
              onClick={() => setSelected(req)}
              onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') setSelected(req); }}
            >
              <div>
                <div className="font-bold text-[18px] mb-1 leading-tight">{req.title}</div>
                <div className="text-[14px] text-gray-500 leading-tight">{req.date} · {req.location}</div>
              </div>
              <div className="ml-4 flex items-center gap-2">
                <span className={req.status === 'open' ? 'text-blue-600 font-bold text-[15px]' : req.status === 'matched' ? 'text-yellow-500 font-bold text-[15px]' : 'text-green-600 font-bold text-[15px]'}>
                  {req.status === 'open' ? '모집중' : req.status === 'matched' ? '매칭중' : '완료'}
                </span>
                {req.status === 'matched' && req.matchedCaregiverId && (
                  <span className="ml-2 text-[13px] text-gray-500">(매칭: {mockCaregivers.find(cg => cg.id === req.matchedCaregiverId)?.name})</span>
                )}
              </div>
            </button>
          ))
        )}
      </section>
      {/* 요청 상세 모달 */}
      {selected && (
        <RequestDetailModal
          req={selected}
          caregivers={mockCaregivers}
          onClose={() => setSelected(null)}
          onStatusChange={status => {
            setRequests(reqs => reqs.map(r => r.id === selected.id ? { ...r, status } : r));
            setSelected(s => s ? { ...s, status } : s);
          }}
          onMatch={cgId => {
            setRequests(reqs => reqs.map(r => r.id === selected.id ? { ...r, status: 'matched', matchedCaregiverId: cgId } : r));
            setSelected(s => s ? { ...s, status: 'matched', matchedCaregiverId: cgId } : s);
          }}
        />
      )}
    </main>
  );
}


// 상세 모달 컴포넌트 구현


type RequestDetailModalProps = {
  req: CareRequest;
  caregivers: Caregiver[];
  onClose: () => void;
  onStatusChange: (status: CareRequest['status']) => void;
  onMatch: (caregiverId: string) => void;
};

export function RequestDetailModal({ req, caregivers, onClose, onStatusChange, onMatch }: RequestDetailModalProps) {
  const [showCandidates, setShowCandidates] = React.useState(false);
  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 40, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.40)' }}>
      <div style={{ background: '#fff', borderRadius: 18, boxShadow: '0 4px 32px 0 rgba(59,130,246,0.13)', padding: 36, width: '100%', maxWidth: 420, position: 'relative' }}>
        <button style={{ position: 'absolute', top: 12, right: 12, color: '#9ca3af', background: 'none', border: 'none', fontSize: 26, cursor: 'pointer', transition: 'color 0.18s' }} onClick={onClose} title="닫기">
          ×
        </button>
        <h3 style={{ fontSize: 22, fontWeight: 800, marginBottom: 14, color: '#2563eb', letterSpacing: '-0.01em' }}>요청 상세</h3>
        <div style={{ marginBottom: 8, fontSize: 16 }}><b>제목:</b> {req.title}</div>
        <div style={{ marginBottom: 8, fontSize: 16 }}><b>일자:</b> {req.date}</div>
        <div style={{ marginBottom: 8, fontSize: 16 }}><b>장소:</b> {req.location}</div>
        <div style={{ marginBottom: 18, fontSize: 16 }}><b>상태:</b> <span style={{ color: req.status === 'open' ? '#2563eb' : req.status === 'matched' ? '#eab308' : '#059669', fontWeight: 700 }}>
          {req.status === 'open' ? '모집중' : req.status === 'matched' ? '매칭중' : '완료'}
        </span></div>
        {req.status !== 'completed' && (
          <div style={{ display: 'flex', gap: 10, marginBottom: 18 }}>
            <button onClick={() => setShowCandidates(s => !s)} style={{ padding: '8px 16px', borderRadius: 8, background: '#3b82f6', color: '#fff', fontWeight: 700, fontSize: 15, border: 'none', cursor: 'pointer', boxShadow: '0 1px 4px 0 rgba(59,130,246,0.10)' }}>{showCandidates ? '후보 닫기' : '매칭 후보 보기'}</button>
            {req.status === 'open' && (
              <button onClick={() => onStatusChange('matched')} style={{ padding: '8px 16px', borderRadius: 8, background: '#eab308', color: '#fff', fontWeight: 700, fontSize: 15, border: 'none', cursor: 'pointer' }}>매칭중으로 변경</button>
            )}
            {req.status === 'matched' && (
              <button onClick={() => onStatusChange('completed')} style={{ padding: '8px 16px', borderRadius: 8, background: '#059669', color: '#fff', fontWeight: 700, fontSize: 15, border: 'none', cursor: 'pointer' }}>완료로 변경</button>
            )}
          </div>
        )}
        {showCandidates && (
          <div style={{ marginBottom: 18 }}>
            <div style={{ fontWeight: 700, marginBottom: 8, fontSize: 15 }}>매칭 후보</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {caregivers.filter(cg => cg.available).map(cg => (
                <div key={cg.id} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: 8, border: '1px solid #e5e7eb', borderRadius: 8, background: '#f1f5f9', transition: 'background 0.18s' }}>
                  <span style={{ fontWeight: 600 }}>{cg.name}</span>
                  <span style={{ fontSize: 13, color: '#6b7280' }}>경력 {cg.experience}년</span>
                  <button onClick={() => onMatch(cg.id)} style={{ marginLeft: 'auto', padding: '4px 10px', borderRadius: 6, background: '#2563eb', color: '#fff', fontWeight: 700, fontSize: 14, border: 'none', cursor: 'pointer' }}>매칭</button>
                </div>
              ))}
            </div>
          </div>
        )}
        <button onClick={onClose} style={{ marginTop: 8, width: '100%', height: 40, fontSize: 16, fontWeight: 700, borderRadius: 8, background: '#e5e7eb', color: '#222', border: 'none', cursor: 'pointer' }}>닫기</button>
      </div>
    </div>
  );
}