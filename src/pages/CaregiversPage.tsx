
import type { Caregiver } from '../types/caregiver';
import { mockCaregivers } from '../mocks/mockCaregivers';
import { useState, useEffect } from 'react';


export default function CaregiversPage() {
  // 반응형 레이아웃 상태
  const [isMobile, setIsMobile] = useState(false);
  // useEffect로 화면 크기 감지
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 700px)');
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    setIsMobile(mq.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);
  // 로딩/에러 상태 추가
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState('');
  const [caregivers, setCaregivers] = useState<Caregiver[]>([]);
  useEffect(() => {
    setLoading(true);
    setLoadError('');
    // 데이터 fetch 시뮬레이션 (1초 후 mock 데이터)
    const timer = setTimeout(() => {
      // 에러 시뮬레이션: setLoadError('데이터를 불러오지 못했습니다.'); setLoading(false); return;
      setCaregivers(mockCaregivers);
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);
  const [selected, setSelected] = useState<Caregiver | null>(null);
  const [search, setSearch] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: '', phone: '', gender: '', age: '', experience: '', skills: '', rating: '', orgId: '', available: true });
  const filtered = caregivers.filter(cg =>
    cg.name.includes(search) || cg.skills.some(s => s.includes(search))
  );

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.experience || !form.rating) return;
    setCaregivers([
      { id: Date.now().toString(), name: form.name, phone: form.phone, gender: form.gender === '남' ? '남' : '여', age: Number(form.age), experience: Number(form.experience), orgId: form.orgId, skills: form.skills.split(','), rating: Number(form.rating), available: form.available },
      ...caregivers,
    ]);
    setForm({ name: '', phone: '', gender: '', age: '', experience: '', skills: '', rating: '', orgId: '', available: true });
    setShowForm(false);
  };

  return (
    <div style={{ maxWidth: 700, margin: '0 auto', padding: '32px 0' }}>
  <h2 style={{ fontSize: isMobile ? 24 : 28, fontWeight: 800, marginBottom: isMobile ? 14 : 20, color: '#2563eb', letterSpacing: '-0.02em', lineHeight: isMobile ? 1.25 : 1.1 }}>요양보호사</h2>
  <div style={{ display: 'flex', gap: isMobile ? 8 : 10, marginBottom: 18, flexDirection: isMobile ? 'column' : 'row' }}>
        <input placeholder="이름/스킬 검색" value={search} onChange={e => setSearch(e.target.value)} style={{ flex: 1, height: isMobile ? 44 : 38, fontSize: isMobile ? 17 : 15, border: '1px solid #d1d5db', borderRadius: 8, padding: isMobile ? '0 14px' : '0 12px', background: '#fff', color: '#222', outline: 'none' }} />
        <button onClick={() => setShowForm(true)} style={{ height: isMobile ? 44 : 38, fontSize: isMobile ? 18 : 16, fontWeight: 700, borderRadius: 8, background: '#3b82f6', color: '#fff', border: 'none', cursor: 'pointer', padding: isMobile ? '0 22px' : '0 18px', boxShadow: '0 1px 4px 0 rgba(59,130,246,0.10)', touchAction: 'manipulation' }}>+ 등록</button>
      </div>
      {showForm && (
        <form onSubmit={handleAdd} style={{ marginBottom: 24, background: '#fff', borderRadius: 16, boxShadow: '0 2px 12px 0 rgba(59,130,246,0.08)', padding: isMobile ? 16 : 24, display: 'flex', flexDirection: 'column', gap: isMobile ? 14 : 10, maxWidth: 420, width: '100%' }}>
          <input placeholder="이름" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} style={{ height: isMobile ? 44 : 36, fontSize: isMobile ? 17 : 15, border: '1px solid #d1d5db', borderRadius: 8, padding: isMobile ? '0 14px' : '0 12px', background: '#fff', color: '#222', outline: 'none' }} />
          <input placeholder="전화번호" value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} style={{ height: isMobile ? 44 : 36, fontSize: isMobile ? 17 : 15, border: '1px solid #d1d5db', borderRadius: 8, padding: isMobile ? '0 14px' : '0 12px', background: '#fff', color: '#222', outline: 'none' }} />
          <input placeholder="성별" value={form.gender} onChange={e => setForm(f => ({ ...f, gender: e.target.value }))} style={{ height: isMobile ? 44 : 36, fontSize: isMobile ? 17 : 15, border: '1px solid #d1d5db', borderRadius: 8, padding: isMobile ? '0 14px' : '0 12px', background: '#fff', color: '#222', outline: 'none' }} />
          <input placeholder="나이" type="number" value={form.age} onChange={e => setForm(f => ({ ...f, age: e.target.value }))} style={{ height: isMobile ? 44 : 36, fontSize: isMobile ? 17 : 15, border: '1px solid #d1d5db', borderRadius: 8, padding: isMobile ? '0 14px' : '0 12px', background: '#fff', color: '#222', outline: 'none' }} />
          <input placeholder="경력(년)" type="number" value={form.experience} onChange={e => setForm(f => ({ ...f, experience: e.target.value }))} style={{ height: isMobile ? 44 : 36, fontSize: isMobile ? 17 : 15, border: '1px solid #d1d5db', borderRadius: 8, padding: isMobile ? '0 14px' : '0 12px', background: '#fff', color: '#222', outline: 'none' }} />
          <input placeholder="스킬(쉼표구분)" value={form.skills} onChange={e => setForm(f => ({ ...f, skills: e.target.value }))} style={{ height: isMobile ? 44 : 36, fontSize: isMobile ? 17 : 15, border: '1px solid #d1d5db', borderRadius: 8, padding: isMobile ? '0 14px' : '0 12px', background: '#fff', color: '#222', outline: 'none' }} />
          <input placeholder="평점(0~5)" type="number" value={form.rating} onChange={e => setForm(f => ({ ...f, rating: e.target.value }))} style={{ height: isMobile ? 44 : 36, fontSize: isMobile ? 17 : 15, border: '1px solid #d1d5db', borderRadius: 8, padding: isMobile ? '0 14px' : '0 12px', background: '#fff', color: '#222', outline: 'none' }} />
          <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: isMobile ? 16 : 15, color: '#222' }}>
            <input type="checkbox" checked={form.available} onChange={e => setForm(f => ({ ...f, available: e.target.checked }))} style={{ accentColor: '#2563eb', width: 16, height: 16 }} />가용
          </label>
          <div style={{ display: 'flex', gap: isMobile ? 12 : 10 }}>
            <button type="submit" style={{ flex: 1, height: isMobile ? 44 : 38, fontSize: isMobile ? 18 : 16, fontWeight: 700, borderRadius: 8, background: '#3b82f6', color: '#fff', border: 'none', cursor: 'pointer', boxShadow: '0 1px 4px 0 rgba(59,130,246,0.10)', touchAction: 'manipulation' }}>저장</button>
            <button type="button" style={{ flex: 1, height: isMobile ? 44 : 38, fontSize: isMobile ? 18 : 16, fontWeight: 700, borderRadius: 8, background: '#e5e7eb', color: '#222', border: 'none', cursor: 'pointer', touchAction: 'manipulation' }} onClick={() => setShowForm(false)}>취소</button>
          </div>
        </form>
      )}
      <div style={{
        display: isMobile ? 'flex' : 'grid',
        flexDirection: isMobile ? 'column' : undefined,
        gap: isMobile ? 10 : 24,
        gridTemplateColumns: isMobile ? undefined : '1fr',
        marginTop: 10,
        width: '100%'
      }}>
        {loading ? (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 120 }}>
            <div style={{ width: 36, height: 36, border: '4px solid #dbeafe', borderTop: '4px solid #2563eb', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
            <style>{`@keyframes spin { 0%{transform:rotate(0deg);} 100%{transform:rotate(360deg);} }`}</style>
          </div>
        ) : loadError ? (
          <div style={{ color: '#ef4444', fontSize: 16, textAlign: 'center', padding: '32px 0' }}>{loadError}</div>
        ) : filtered.length === 0 ? (
          <div style={{ color: '#6b7280', fontSize: 15, textAlign: 'center', padding: '32px 0' }}>등록된 요양보호사가 없습니다.<br/>새로운 요양보호사를 등록해보세요!</div>
        ) : (
          filtered.map((cg) => (
            <div
              key={cg.id}
              style={{
                background: '#fff',
                borderRadius: 16,
                boxShadow: '0 2px 12px 0 rgba(59,130,246,0.08)',
                padding: isMobile ? 14 : 24,
                display: 'flex',
                flexDirection: 'column',
                gap: isMobile ? 6 : 10,
                cursor: 'pointer',
                border: '1px solid #e5e7eb',
                transition: 'box-shadow 0.18s',
                minHeight: isMobile ? 56 : undefined,
                touchAction: 'manipulation'
              }}
              onClick={() => setSelected(cg)}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: isMobile ? 8 : 14 }}>
                <div style={{ width: isMobile ? 36 : 48, height: isMobile ? 36 : 48, borderRadius: '50%', background: '#dbeafe', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: isMobile ? 18 : 26, fontWeight: 700, color: '#2563eb' }}>
                  {cg.name[0]}
                </div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: isMobile ? 15 : 18, lineHeight: isMobile ? 1.3 : 1.1 }}>{cg.name}</div>
                  <div style={{ fontSize: isMobile ? 13 : 15, color: '#6b7280', lineHeight: isMobile ? 1.3 : 1.1 }}>경력 {cg.experience}년 · 평점 {cg.rating}</div>
                </div>
                <span style={{ marginLeft: 'auto', color: cg.available ? '#059669' : '#9ca3af', fontWeight: 700, fontSize: isMobile ? 13 : 16, lineHeight: isMobile ? 1.2 : 1.1 }}>
                  {cg.available ? '가용' : '비가용'}
                </span>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: isMobile ? 4 : 8, marginTop: 2 }}>
                {cg.skills.map((s) => (
                  <span key={s} style={{ padding: isMobile ? '2px 6px' : '2px 8px', background: '#dbeafe', color: '#2563eb', borderRadius: 6, fontSize: isMobile ? 11 : 13, fontWeight: 500 }}>{s}</span>
                ))}
              </div>
            </div>
          ))
        )}
      </div>
      {selected && (
        <CaregiverDetailModal caregiver={selected} onClose={() => setSelected(null)} />
      )}
    </div>
  );
}

type CaregiverDetailModalProps = {
  caregiver: Caregiver;
  onClose: () => void;
};

export function CaregiverDetailModal({ caregiver, onClose }: CaregiverDetailModalProps) {
  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 40, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.40)' }}>
      <div style={{ background: '#fff', borderRadius: 18, boxShadow: '0 4px 32px 0 rgba(59,130,246,0.13)', padding: 36, width: '100%', maxWidth: 420, position: 'relative' }}>
        <button style={{ position: 'absolute', top: 12, right: 12, color: '#9ca3af', background: 'none', border: 'none', fontSize: 26, cursor: 'pointer', transition: 'color 0.18s' }} onClick={onClose} title="닫기">×</button>
        <h3 style={{ fontSize: 22, fontWeight: 800, marginBottom: 14, color: '#2563eb', letterSpacing: '-0.01em' }}>요양보호사 상세</h3>
        <div style={{ marginBottom: 8, fontSize: 16 }}><b>이름:</b> {caregiver.name}</div>
        <div style={{ marginBottom: 8, fontSize: 16 }}><b>전화번호:</b> {caregiver.phone}</div>
        <div style={{ marginBottom: 8, fontSize: 16 }}><b>성별:</b> {caregiver.gender}</div>
        <div style={{ marginBottom: 8, fontSize: 16 }}><b>나이:</b> {caregiver.age}</div>
        <div style={{ marginBottom: 8, fontSize: 16 }}><b>경력:</b> {caregiver.experience}년</div>
        <div style={{ marginBottom: 8, fontSize: 16 }}><b>평점:</b> {caregiver.rating}</div>
        <div style={{ marginBottom: 8, fontSize: 16 }}><b>스킬:</b> {caregiver.skills.join(', ')}</div>
        <div style={{ marginBottom: 18, fontSize: 16 }}><b>상태:</b> <span style={{ color: caregiver.available ? '#059669' : '#9ca3af', fontWeight: 700 }}>{caregiver.available ? '가용' : '비가용'}</span></div>
        <button onClick={onClose} style={{ marginTop: 8, width: '100%', height: 40, fontSize: 16, fontWeight: 700, borderRadius: 8, background: '#e5e7eb', color: '#222', border: 'none', cursor: 'pointer' }}>닫기</button>
      </div>
    </div>
  );
}
