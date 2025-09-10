import type { CareRequest } from '../types/request';

export const mockRequests: CareRequest[] = [
  { id: '1', title: '어르신 방문 요양', date: '2025-08-27', location: '서울시 강남구', name: '홍길동', phone: '010-1111-2222', address: '서울시 강남구', status: 'open', createdAt: '2025-08-27 09:00' },
  { id: '2', title: '식사 및 산책 케어', date: '2025-08-26', location: '서울시 서초구', name: '김영희', phone: '010-3333-4444', address: '서울시 서초구', status: 'matched', createdAt: '2025-08-26 14:30', matchedCaregiverId: '1' },
  { id: '3', title: '병원 동행 서비스', date: '2025-08-25', location: '서울시 송파구', name: '이철수', phone: '010-5555-6666', address: '서울시 송파구', status: 'completed', createdAt: '2025-08-25 11:20', matchedCaregiverId: '2' },
];
