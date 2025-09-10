import { useState, useEffect, useRef } from 'react';
import type { CareRequest } from '../types/request';
import type { Caregiver } from '../types/caregiver';
import { mockRequests } from '../mocks/mockRequests';
import { mockCaregivers } from '../mocks/mockCaregivers';
import { mockOrgs } from '../mocks/mockOrgs';
import { RequestDetailModal } from './RequestsPage';
import { CaregiverDetailModal } from './CaregiversPage';
import type { Notification, NotificationEntityType } from '../types/notification';
import { mockNotifications } from '../mocks/mockNotifications';

function OrgDetailModalForDashboard({ org, onClose }: { org: any; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/40">
      <div className="bg-white dark:bg-gray-900 rounded shadow-lg p-8 w-full max-w-md relative">
        <button className="absolute top-2 right-2 text-gray-400 hover:text-brand-primary" onClick={onClose}>
          <span className="text-xl">×</span>
        </button>
        <h3 className="text-xl font-bold mb-2 text-brand-primary">기관 상세</h3>
        <div className="mb-2"><b>기관명:</b> {org.name}</div>
        <div className="mb-2"><b>유형:</b> {org.type}</div>
        <div className="mb-2"><b>사업자등록번호:</b> {org.regNum}</div>
        <div className="mb-2"><b>주소:</b> {org.location}</div>
        <button className="mt-4 px-4 py-2 rounded bg-gray-300 text-gray-800 dark:bg-gray-700 dark:text-gray-100" onClick={onClose}>닫기</button>
      </div>
    </div>
  );
}


// DashboardPage: 시맨틱 태그(main, section 등)와 ARIA 속성, 문서화 주석 적용

export default function DashboardPage() {
  // 반응형 레이아웃 상태
  const [isMobile, setIsMobile] = useState(false);
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
  const [requests, setRequests] = useState<CareRequest[]>([]);
  const [caregivers, setCaregivers] = useState<Caregiver[]>([]);
  const [orgs, setOrgs] = useState<any[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  useEffect(() => {
    setLoading(true);
    setLoadError('');
    // 데이터 fetch 시뮬레이션 (1초 후 mock 데이터)
    const timer = setTimeout(() => {
      // 에러 시뮬레이션: setLoadError('데이터를 불러오지 못했습니다.'); setLoading(false); return;
      setRequests(mockRequests);
      setCaregivers(mockCaregivers);
      setOrgs(mockOrgs);
      setNotifications(mockNotifications);
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  // 요청 상태별 비율 계산
  const statusCounts = { open: 0, matched: 0, completed: 0 };
  requests.forEach(r => { statusCounts[r.status] = (statusCounts[r.status] || 0) + 1; });
  const totalStatus = statusCounts.open + statusCounts.matched + statusCounts.completed;
  const statusRatios = [
    { label: '모집중', value: statusCounts.open, color: '#4f6ef7' },
    { label: '매칭중', value: statusCounts.matched, color: '#f59e0b' },
    { label: '완료', value: statusCounts.completed, color: '#10b981' },
  ];
  // 최근 데이터 추출
  const recentRequests = requests.slice(0, 3);
  const recentCaregivers = caregivers.slice(0, 3);
  const recentNotifications = notifications.slice(0, 3);
  // 최근 상세 모달 상태
  const [selectedRequest, setSelectedRequest] = useState<CareRequest | null>(null);
  const [selectedCaregiver, setSelectedCaregiver] = useState<Caregiver | null>(null);
  const [selectedNotification, setSelectedNotification] = useState<Notification | null>(null);
  // 통계 요약
  const totalRequests = requests.length;
  const totalCaregivers = caregivers.length;
  const totalOrgs = orgs.length;
  const [selectedEntity, setSelectedEntity] = useState<{ type: NotificationEntityType; id: string } | null>(null);
  const notifIdRef = useRef(4); // mockNotifications 마지막 id가 3

  // 알림 개별 삭제
  const removeNotification = (id: string) => setNotifications((list) => list.filter((n) => n.id !== id));

  // 실시간 알림 모킹: 10초마다 새 알림 추가
  useEffect(() => {
    if (loading || loadError) return;
    const interval = setInterval(() => {
      const types: Notification['type'][] = ['info', 'success', 'warning', 'error'];
      const entities: NotificationEntityType[] = ['request', 'caregiver', 'org'];
      const messages = [
        '새로운 요청이 도착했습니다.',
        '요양보호사 정보가 갱신되었습니다.',
        '기관 정보가 변경되었습니다.',
        '매칭이 완료되었습니다.',
        '승인 대기 요청이 있습니다.'
      ];
      const idx = Math.floor(Math.random() * messages.length);
      const type = types[Math.floor(Math.random() * types.length)];
      const entityType = entities[Math.floor(Math.random() * entities.length)];
      const entityId = String(Math.floor(Math.random() * 3) + 1); // 1~3
      const now = new Date();
      const date = `${now.getFullYear()}-${String(now.getMonth()+1).padStart(2,'0')}-${String(now.getDate()).padStart(2,'0')} ${String(now.getHours()).padStart(2,'0')}:${String(now.getMinutes()).padStart(2,'0')}`;
      setNotifications((list) => [
        {
          id: String(notifIdRef.current++),
          message: messages[idx],
          type,
          date,
          entityType,
          entityId,
          read: false
        },
        ...list
      ]);
    }, 10000);
    return () => clearInterval(interval);
  }, [loading, loadError]);

  const clearNotifications = () => setNotifications([]);
  const markAllRead = () => setNotifications((n) => n.map((notif) => ({ ...notif, read: true })));
  const handleNotificationClick = (n: Notification) => {
    if (n.entityType && n.entityId) setSelectedEntity({ type: n.entityType, id: n.entityId });
    setNotifications((list) => list.map((item) => item.id === n.id ? { ...item, read: true } : item));
  };

  return (
    <main role="main" aria-label="대시보드 메인 영역" className="bg-gray-100 min-h-screen py-6 px-4">
  <section aria-labelledby="dashboard-title" className="max-w-sm md:max-w-3xl mx-auto w-full overflow-x-hidden">
        <h2 id="dashboard-title" className="text-[26px] font-extrabold mb-6 text-blue-500 text-center tracking-tight leading-tight">대시보드</h2>
        {/* 로딩/에러/empty UX */}
        {loading ? (
          <div className="flex justify-center items-center min-h-[180px]">
            <div className="w-9 h-9 border-4 border-blue-100 border-t-blue-500 rounded-full animate-spin" />
          </div>
        ) : loadError ? (
          <div className="text-red-500 text-lg text-center py-12">{loadError}</div>
        ) : totalRequests + totalCaregivers + totalOrgs === 0 ? (
          <div className="text-gray-500 text-base text-center py-12">아직 등록된 데이터가 없습니다.<br/>새로운 요청, 요양보호사, 기관을 등록해보세요!</div>
        ) : (
          <>
            {/* 통계 카드 */}
            <div className={`flex ${isMobile ? 'flex-col gap-4 mb-6' : 'flex-row gap-6 mb-9'} w-full justify-between`}>
              <div className="w-full bg-white rounded-[16px] shadow-[0_1px_6px_0_rgba(59,130,246,0.07)] p-4 flex flex-col items-center border border-gray-200">
                <span className="text-[15px] text-gray-500 mb-1 leading-tight">전체 케어요청</span>
                <span className="text-[20px] font-bold text-blue-500 leading-tight">{totalRequests}</span>
              </div>
              <div className="w-full bg-white rounded-[16px] shadow-[0_1px_6px_0_rgba(59,130,246,0.07)] p-4 flex flex-col items-center border border-gray-200">
                <span className="text-[15px] text-gray-500 mb-1 leading-tight">전체 요양보호사</span>
                <span className="text-[20px] font-bold text-blue-500 leading-tight">{totalCaregivers}</span>
              </div>
              <div className="w-full bg-white rounded-[16px] shadow-[0_1px_6px_0_rgba(59,130,246,0.07)] p-4 flex flex-col items-center border border-gray-200">
                <span className="text-[15px] text-gray-500 mb-1 leading-tight">전체 기관</span>
                <span className="text-[20px] font-bold text-blue-500 leading-tight">{totalOrgs}</span>
              </div>
            </div>
            {/* 요청 상태별 비율 차트 */}
            <div className="bg-white rounded-[16px] shadow-[0_2px_12px_0_rgba(59,130,246,0.08)] p-7 border border-gray-200 mb-10 flex flex-col md:flex-row justify-center items-center gap-8 w-full">
              <div className="w-[110px] h-[110px] relative">
                <svg width="110" height="110" viewBox="0 0 120 120">
                  {(() => {
                    let acc = 0;
                    return statusRatios.map((s) => {
                      const percent = totalStatus ? s.value / totalStatus : 0;
                      const dash = percent * 2 * Math.PI * 54;
                      const dashArray = `${dash} ${2 * Math.PI * 54 - dash}`;
                      const rotate = acc * 360;
                      acc += percent;
                      return (
                        <circle
                          key={s.label}
                          r="54"
                          cx="60"
                          cy="60"
                          fill="none"
                          stroke={s.color}
                          strokeWidth="18"
                          strokeDasharray={dashArray}
                          strokeDashoffset="0"
                          style={{ transform: `rotate(-90deg) rotate(${rotate}deg)`, transformOrigin: '60px 60px', transition: 'all 0.3s' }}
                        />
                      );
                    });
                  })()}
                  <circle r="38" cx="60" cy="60" fill="#fff" />
                  <text x="60" y="66" textAnchor="middle" fontSize="16" fontWeight="500" fill="#4f6ef7">{totalStatus}</text>
                </svg>
              </div>
              <div className="flex-1">
                <div className="font-semibold text-[15px] text-blue-500 mb-2">요청 상태별 비율</div>
                <ul className="list-none p-0 m-0 text-[14px]">
                  {statusRatios.map(s => (
                    <li key={s.label} className="flex items-center mb-2">
                      <span className={`inline-block w-2.5 h-2.5 rounded-full mr-2 bg-[${s.color}]`}></span>
                      <span className="min-w-[58px]">{s.label}</span>
                      <span className="ml-2 font-medium text-blue-500">{s.value}</span>
                      <span className="ml-1 text-gray-500 text-xs">({totalStatus ? Math.round((s.value / totalStatus) * 100) : 0}%)</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </>
        )}
        {/* 최근 활동 카드 */}
  <div className={`flex ${isMobile ? 'flex-col gap-4 mb-8' : 'flex-row gap-6 mb-10'} w-full`}>
          {/* 최근 케어요청 */}
          <div className="w-full bg-white rounded-[16px] shadow-[0_1px_6px_0_rgba(59,130,246,0.07)] p-4 border border-gray-200 min-h-[120px]">
            <div className="font-bold text-[16px] text-blue-700 mb-2">최근 케어요청</div>
            {recentRequests.length === 0 ? (
              <div className="text-gray-500 text-sm">없음</div>
            ) : (
              <ul className="list-none p-0 m-0">
                {recentRequests.map(r => (
                  <li key={r.id} className="text-[15px] mb-2 text-gray-900 cursor-pointer underline underline-offset-2 min-h-[36px] hover:text-blue-500" onClick={() => setSelectedRequest(r)}>
                    <span className="font-bold">{r.title}</span> <span className="text-gray-500 text-xs">({r.date})</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
          {/* 최근 요양보호사 */}
          <div className="w-full bg-white rounded-[16px] shadow-[0_1px_6px_0_rgba(59,130,246,0.07)] p-4 border border-gray-200 min-h-[120px]">
            <div className="font-bold text-[16px] text-blue-700 mb-2">최근 요양보호사</div>
            {recentCaregivers.length === 0 ? (
              <div className="text-gray-500 text-sm">없음</div>
            ) : (
              <ul className="list-none p-0 m-0">
                {recentCaregivers.map(cg => (
                  <li key={cg.id} className="text-[15px] mb-2 text-gray-900 cursor-pointer underline underline-offset-2 min-h-[36px] hover:text-blue-500" onClick={() => setSelectedCaregiver(cg)}>
                    <span className="font-bold">{cg.name}</span> <span className="text-gray-500 text-xs">({cg.skills.join(', ')})</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
          {/* 최근 알림 */}
          <div className="w-full bg-white rounded-[16px] shadow-[0_1px_6px_0_rgba(59,130,246,0.07)] p-4 border border-gray-200 min-h-[120px]">
            <div className="font-bold text-[16px] text-blue-700 mb-2">최근 알림</div>
            {recentNotifications.length === 0 ? (
              <div className="text-gray-500 text-sm">없음</div>
            ) : (
              <ul className="list-none p-0 m-0">
                {recentNotifications.map(n => (
                  <li key={n.id} className={`text-[15px] mb-2 cursor-pointer underline underline-offset-2 min-h-[36px] ${n.read ? 'text-gray-400 font-normal' : 'text-blue-700 font-bold'} hover:text-blue-500`} onClick={() => setSelectedNotification(n)}>
                    {n.message} <span className="text-gray-500 text-xs">({n.date})</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        {/* 최근 활동 상세 모달 */}
        {selectedRequest && (
          <RequestDetailModal req={selectedRequest} caregivers={mockCaregivers} onClose={() => setSelectedRequest(null)} onStatusChange={() => {}} onMatch={() => {}} />
        )}
        {selectedCaregiver && (
          <CaregiverDetailModal caregiver={selectedCaregiver} onClose={() => setSelectedCaregiver(null)} />
        )}
        {selectedNotification && (
          <div style={{ position: 'fixed', inset: 0, zIndex: 40, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.40)' }}>
            <div style={{ background: '#fff', borderRadius: 18, boxShadow: '0 4px 32px 0 rgba(59,130,246,0.13)', padding: 36, width: '100%', maxWidth: 420, position: 'relative' }}>
              <button style={{ position: 'absolute', top: 12, right: 12, color: '#9ca3af', background: 'none', border: 'none', fontSize: 26, cursor: 'pointer', transition: 'color 0.18s' }} onClick={() => setSelectedNotification(null)} title="닫기">×</button>
              <h3 style={{ fontSize: 22, fontWeight: 800, marginBottom: 14, color: '#2563eb', letterSpacing: '-0.01em' }}>알림 상세</h3>
              <div style={{ marginBottom: 8, fontSize: 16 }}><b>메시지:</b> {selectedNotification.message}</div>
              <div style={{ marginBottom: 8, fontSize: 16 }}><b>일시:</b> {selectedNotification.date}</div>
              <div style={{ marginBottom: 8, fontSize: 16 }}><b>상태:</b> <span style={{ color: selectedNotification.read ? '#059669' : '#2563eb', fontWeight: 700 }}>{selectedNotification.read ? '읽음' : '안읽음'}</span></div>
              <button onClick={() => setSelectedNotification(null)} style={{ marginTop: 8, width: '100%', height: 40, fontSize: 16, fontWeight: 700, borderRadius: 8, background: '#e5e7eb', color: '#222', border: 'none', cursor: 'pointer' }}>닫기</button>
            </div>
          </div>
        )}
        </div>
        <section aria-label="알림 목록" className="bg-white rounded-[24px] shadow-[0_6px_32px_0_rgba(59,130,246,0.10)] p-8 mb-10 border border-gray-200">
          <div className="font-bold mb-4 text-[17px] text-gray-700">알림</div>
          {notifications.length === 0 ? (
            <div className="text-gray-500 text-[15px]">알림이 없습니다.</div>
          ) : (
            <ul className="list-none p-0 m-0 flex flex-col gap-3">
              {notifications.map((n) => (
                <li
                  key={n.id}
                  className={`flex items-center gap-3 py-3 px-4 rounded-[14px] cursor-pointer border-l-4 ${n.read ? 'border-gray-200 bg-gray-100 opacity-70' : 'border-blue-500 bg-indigo-50'} relative min-h-[56px] shadow-sm`}
                  onClick={() => handleNotificationClick(n)}
                  aria-label={`알림: ${n.message}`}
                >
                  {!n.read && <span className="w-2.5 h-2.5 rounded-full bg-blue-500 mr-2 inline-block flex-shrink-0" aria-hidden="true"></span>}
                  <span className="text-xs font-bold text-blue-700 min-w-[90px] text-right mr-3 flex-shrink-0">{n.date}</span>
                  <span className="text-[16px] text-gray-900 flex-1 break-all">{n.message}</span>
                  <button
                    className="absolute top-2.5 right-3 text-gray-400 bg-none border-none text-[18px] cursor-pointer p-0 leading-none font-bold hover:text-red-500 transition-colors"
                    title="알림 삭제"
                    onClick={e => { e.stopPropagation(); removeNotification(n.id); }}
                    aria-label="알림 삭제"
                  >
                    ×
                  </button>
                </li>
              ))}
            </ul>
          )}
          <div className={`mt-5 flex gap-${isMobile ? '2' : '3'} justify-end`}>
            <button type="button" onClick={markAllRead} className="bg-gray-100 text-gray-900 rounded-[10px] px-6 py-2 font-bold text-[15px] shadow-sm min-w-[120px] hover:bg-blue-100 transition-colors">알림 모두 읽음</button>
            <button type="button" onClick={clearNotifications} className="bg-gray-200 text-gray-900 rounded-[10px] px-6 py-2 font-bold text-[15px] shadow-sm min-w-[120px] hover:bg-red-100 transition-colors">알림 모두 지우기</button>
          </div>
          {/* 알림 클릭 시 관련 상세 모달 표시 */}
          {selectedEntity && selectedEntity.type === 'request' && (
            <RequestDetailModal
              req={mockRequests.find((r) => r.id === selectedEntity.id)!}
              caregivers={mockCaregivers}
              onClose={() => setSelectedEntity(null)}
              onStatusChange={() => {}}
              onMatch={() => {}}
            />
          )}
          {selectedEntity && selectedEntity.type === 'caregiver' && (
            <CaregiverDetailModal
              caregiver={mockCaregivers.find((cg) => cg.id === selectedEntity.id)!}
              onClose={() => setSelectedEntity(null)}
            />
          )}
          {selectedEntity && selectedEntity.type === 'org' && (
            <OrgDetailModalForDashboard
              org={mockOrgs.find((o) => o.id === selectedEntity.id)!}
              onClose={() => setSelectedEntity(null)}
            />
          )}
        </section>
        <section aria-label="주요 지표" className="bg-white rounded-[24px] shadow-[0_6px_32px_0_rgba(59,130,246,0.10)] p-8 border border-gray-200">
          <div className="font-bold mb-4 text-[17px] text-gray-700">주요 지표</div>
          <div className="grid grid-cols-2 gap-6 justify-items-center items-center mt-2">
            <div className="flex flex-col items-center">
              <span className="text-[22px] font-bold text-blue-500 mb-1">{mockRequests.length}</span>
              <span className="text-[15px] text-gray-500">전체 요청</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-[22px] font-bold text-blue-500 mb-1">{mockRequests.filter((r) => r.status === 'open').length}</span>
              <span className="text-[15px] text-gray-500">진행중</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-[22px] font-bold text-blue-500 mb-1">{mockRequests.filter((r) => r.status === 'matched').length}</span>
              <span className="text-[15px] text-gray-500">매칭중</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-[22px] font-bold text-blue-500 mb-1">{mockRequests.filter((r) => r.status === 'completed').length}</span>
              <span className="text-[15px] text-gray-500">완료</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-[22px] font-bold text-blue-500 mb-1">{mockOrgs.length}</span>
              <span className="text-[15px] text-gray-500">기관</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-[22px] font-bold text-blue-500 mb-1">{mockCaregivers.length}</span>
              <span className="text-[15px] text-gray-500">요양보호사</span>
            </div>
          </div>
        </section>
      </section>
    </main>
  );
}
