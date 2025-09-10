import type { Caregiver } from '../types/caregiver';

export const mockCaregivers: Caregiver[] = [
  { id: '1', name: '박보호', phone: '010-7777-8888', gender: '여', age: 45, experience: 10, available: true, orgId: '1', skills: ['요양', '식사보조'], rating: 4.7 },
  { id: '2', name: '최요양', phone: '010-9999-0000', gender: '남', age: 52, experience: 15, available: false, orgId: '2', skills: ['동행', '청소'], rating: 4.9 },
];
