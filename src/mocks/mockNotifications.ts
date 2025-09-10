import type { Notification } from '../types/notification';

export const mockNotifications: Notification[] = [
  { id: '1', message: '새로운 케어요청이 등록되었습니다.', type: 'info', date: '2025-08-28 10:00', entityType: 'request', entityId: '1', read: false },
  { id: '2', message: '요양보호사 매칭이 완료되었습니다.', type: 'success', date: '2025-08-28 09:30', entityType: 'caregiver', entityId: '1', read: false },
  { id: '3', message: '기관 등록 심사가 필요합니다.', type: 'warning', date: '2025-08-27 18:00', entityType: 'org', entityId: '2', read: false },
];
