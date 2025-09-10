import { useState, useEffect } from 'react';
import { Input, Button } from '../components/ui/FormElements';

import type { CareRequest } from '../types/request';
import type { Caregiver } from '../types/caregiver';
import type { Org } from '../types/org';
import { mockOrgs } from '../mocks/mockOrgs';

export default function OrgPage() {
  // 반응형 레이아웃 상태
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 600px)');
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    setIsMobile(mq.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);
  // 로딩/에러 상태 추가
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState('');
  const [orgs, setOrgs] = useState<Org[]>([]);
  useEffect(() => {
    setLoading(true);
    setLoadError('');
    // 데이터 fetch 시뮬레이션 (1초 후 mock 데이터)
    const timer = setTimeout(() => {
      // 에러 시뮬레이션: setLoadError('데이터를 불러오지 못했습니다.'); setLoading(false); return;
      setOrgs(mockOrgs);
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);
  const [name, setName] = useState('');
  const [type, setType] = useState('요양원');
  const [regNum, setRegNum] = useState('');
  const [location, setLocation] = useState('');
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<Org | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!name || !regNum || !location) {
      setError('모든 항목을 입력하세요.');
      return;
    }
    setOrgs([
      { id: Date.now().toString(), name, type, regNum, location },
      ...orgs,
    ]);
    setName('');
    setRegNum('');
    setLocation('');
  };

  const filtered = orgs.filter(org =>
    org.name.includes(search) || org.location.includes(search) || org.type.includes(search)
  );

  return (
    <div style={{ maxWidth: 540, margin: '0 auto', padding: '32px 0' }}>
  <h2 style={{ fontSize: isMobile ? 24 : 28, fontWeight: 800, marginBottom: isMobile ? 14 : 20, color: '#2563eb', letterSpacing: '-0.02em', lineHeight: isMobile ? 1.25 : 1.1 }}>기관관리</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: isMobile ? 18 : 14, marginBottom: 32, background: '#fff', borderRadius: 18, boxShadow: '0 2px 12px 0 rgba(59,130,246,0.08)', padding: isMobile ? 18 : 28, maxWidth: 480, width: '100%' }}>
        <input placeholder="기관명" value={name} onChange={e => setName(e.target.value)} style={{ height: isMobile ? 48 : 40, fontSize: isMobile ? 18 : 16, border: '1px solid #d1d5db', borderRadius: 8, padding: isMobile ? '0 16px' : '0 12px', background: '#fff', color: '#222', outline: 'none', boxShadow: '0 1px 2px 0 rgba(0,0,0,0.01)', marginBottom: 0 }} />
        <div style={{ display: 'flex', gap: isMobile ? 8 : 10, flexDirection: isMobile ? 'column' : 'row' }}>
          <select value={type} onChange={e => setType(e.target.value)} style={{ borderRadius: 8, border: '1px solid #d1d5db', background: '#fff', padding: isMobile ? '0 16px' : '0 12px', height: isMobile ? 48 : 40, fontSize: isMobile ? 18 : 16, color: '#222', outline: 'none' }}>
            <option value="요양원">요양원</option>
            <option value="병원">병원</option>
            <option value="재가센터">재가센터</option>
          </select>
          <input placeholder="사업자등록번호" value={regNum} onChange={e => setRegNum(e.target.value)} style={{ flex: 1, height: isMobile ? 48 : 40, fontSize: isMobile ? 18 : 16, border: '1px solid #d1d5db', borderRadius: 8, padding: isMobile ? '0 16px' : '0 12px', background: '#fff', color: '#222', outline: 'none', boxShadow: '0 1px 2px 0 rgba(0,0,0,0.01)' }} />
        </div>
        <input placeholder="주소" value={location} onChange={e => setLocation(e.target.value)} style={{ height: isMobile ? 48 : 40, fontSize: isMobile ? 18 : 16, border: '1px solid #d1d5db', borderRadius: 8, padding: isMobile ? '0 16px' : '0 12px', background: '#fff', color: '#222', outline: 'none', boxShadow: '0 1px 2px 0 rgba(0,0,0,0.01)' }} />
        {error && <div style={{ color: '#ef4444', fontSize: 14 }}>{error}</div>}
        <button type="submit" style={{ marginTop: 6, width: '100%', height: isMobile ? 54 : 44, fontSize: isMobile ? 20 : 18, fontWeight: 700, borderRadius: 10, background: '#3b82f6', color: '#fff', border: 'none', cursor: 'pointer', boxShadow: '0 2px 8px 0 rgba(59,130,246,0.10)', transition: 'background 0.2s', touchAction: 'manipulation' }}>기관 등록</button>
      </form>
      <div style={{ display: 'flex', gap: isMobile ? 8 : 10, marginBottom: 18 }}>
        <input placeholder="기관명/주소/유형 검색" value={search} onChange={e => setSearch(e.target.value)} style={{ flex: 1, height: isMobile ? 44 : 38, fontSize: isMobile ? 17 : 15, border: '1px solid #d1d5db', borderRadius: 8, padding: isMobile ? '0 14px' : '0 12px', background: '#fff', color: '#222', outline: 'none' }} />
      </div>
  <div style={{ display: 'flex', flexDirection: 'column', gap: isMobile ? 10 : 16, width: '100%' }}>
        {loading ? (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 120 }}>
            <div style={{ width: 36, height: 36, border: '4px solid #dbeafe', borderTop: '4px solid #2563eb', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
            <style>{`@keyframes spin { 0%{transform:rotate(0deg);} 100%{transform:rotate(360deg);} }`}</style>
          </div>
        ) : loadError ? (
          <div style={{ color: '#ef4444', fontSize: 16, textAlign: 'center', padding: '32px 0' }}>{loadError}</div>
        ) : filtered.length === 0 ? (
          <div style={{ color: '#6b7280', fontSize: 15, textAlign: 'center', padding: '32px 0' }}>등록된 기관이 없습니다.<br/>새로운 기관을 등록해보세요!</div>
        ) : (
          filtered.map((org) => (
            <div
              key={org.id}
              style={{
                background: '#fff',
                borderRadius: 14,
                boxShadow: '0 2px 8px 0 rgba(59,130,246,0.08)',
                padding: isMobile ? '20px 8px' : '18px 20px',
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                border: '1px solid #e5e7eb',
                cursor: 'pointer',
                transition: 'box-shadow 0.18s',
                marginBottom: 0,
                minHeight: isMobile ? 60 : undefined,
                touchAction: 'manipulation'
              }}
              onClick={() => setSelected(org)}
            >
              <div>
                <div style={{ fontWeight: 700, fontSize: isMobile ? 18 : 18, marginBottom: isMobile ? 1 : 2, lineHeight: isMobile ? 1.3 : 1.1 }}>{org.name}</div>
                <div style={{ fontSize: isMobile ? 15 : 14, color: '#6b7280', lineHeight: isMobile ? 1.3 : 1.1 }}>{org.type} · {org.regNum} · {org.location}</div>
              </div>
            </div>
          ))
        )}
      </div>
      {selected && (
        <OrgDetailModal org={selected} onClose={() => setSelected(null)} />
      )}
    </div>
  );
}

type OrgDetailModalProps = {
  org: Org;
  onClose: () => void;
};

import { mockCaregivers } from '../mocks/mockCaregivers';
import { mockRequests } from '../mocks/mockRequests';

// ...existing code...
import { CaregiverDetailModal } from './CaregiversPage';
import { RequestDetailModal } from './RequestsPage';

function OrgDetailModal({ org, onClose }: OrgDetailModalProps) {
  const orgRequests = (org.requestIds ?? []).map((id: string) => mockRequests.find((r) => r.id === id)).filter(Boolean) as CareRequest[];
  const orgCaregivers = (org.caregiverIds ?? []).map((id: string) => mockCaregivers.find((cg) => cg.id === id)).filter(Boolean) as Caregiver[];
  const [selectedRequest, setSelectedRequest] = useState<CareRequest | null>(null);
  const [selectedCaregiver, setSelectedCaregiver] = useState<Caregiver | null>(null);
  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 40, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.40)' }}>
      <div style={{ background: '#fff', borderRadius: 18, boxShadow: '0 4px 32px 0 rgba(59,130,246,0.13)', padding: 36, width: '100%', maxWidth: 420, position: 'relative' }}>
        <button style={{ position: 'absolute', top: 12, right: 12, color: '#9ca3af', background: 'none', border: 'none', fontSize: 26, cursor: 'pointer', transition: 'color 0.18s' }} onClick={onClose} title="닫기">×</button>
        <h3 style={{ fontSize: 22, fontWeight: 800, marginBottom: 14, color: '#2563eb', letterSpacing: '-0.01em' }}>기관 상세</h3>
        <div style={{ marginBottom: 8, fontSize: 16 }}><b>기관명:</b> {org.name}</div>
        <div style={{ marginBottom: 8, fontSize: 16 }}><b>유형:</b> {org.type}</div>
        <div style={{ marginBottom: 8, fontSize: 16 }}><b>사업자등록번호:</b> {org.regNum}</div>
        <div style={{ marginBottom: 8, fontSize: 16 }}><b>주소:</b> {org.location}</div>
        <div style={{ marginTop: 18 }}>
          <div style={{ fontWeight: 700, marginBottom: 6, fontSize: 15 }}>이 기관의 요청</div>
          {orgRequests.length === 0 ? <div style={{ color: '#9ca3af', fontSize: 14 }}>요청 없음</div> : (
            <ul style={{ listStyle: 'disc', paddingLeft: 20, fontSize: 14, margin: 0 }}>
              {orgRequests.map(r => (
                <li key={r.id} style={{ textDecoration: 'underline', color: '#2563eb', cursor: 'pointer', marginBottom: 2 }} onClick={() => setSelectedRequest(r)}>
                  {r.title} ({r.status})
                </li>
              ))}
            </ul>
          )}
        </div>
        <div style={{ marginTop: 18 }}>
          <div style={{ fontWeight: 700, marginBottom: 6, fontSize: 15 }}>소속 요양보호사</div>
          {orgCaregivers.length === 0 ? <div style={{ color: '#9ca3af', fontSize: 14 }}>없음</div> : (
            <ul style={{ listStyle: 'disc', paddingLeft: 20, fontSize: 14, margin: 0 }}>
              {orgCaregivers.map(cg => (
                <li key={cg.id} style={{ textDecoration: 'underline', color: '#2563eb', cursor: 'pointer', marginBottom: 2 }} onClick={() => setSelectedCaregiver(cg)}>
                  {cg.name} (경력 {cg.experience}년)
                </li>
              ))}
            </ul>
          )}
        </div>
        <button onClick={onClose} style={{ marginTop: 24, width: '100%', height: 40, fontSize: 16, fontWeight: 700, borderRadius: 8, background: '#e5e7eb', color: '#222', border: 'none', cursor: 'pointer' }}>닫기</button>
        {selectedRequest && (
          <RequestDetailModal req={selectedRequest} caregivers={mockCaregivers} onClose={() => setSelectedRequest(null)} onStatusChange={() => {}} onMatch={() => {}} />
        )}
        {selectedCaregiver && (
          <CaregiverDetailModal caregiver={selectedCaregiver} onClose={() => setSelectedCaregiver(null)} />
        )}
      </div>
    </div>
  );
}
