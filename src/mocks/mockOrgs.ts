import type { Org } from '../types/org';

const mockOrgs: Org[] = [
  { id: '1', name: '행복케어', type: '재가', regNum: '123-45-67890', location: '서울시 강남구', requestIds: ['1', '2'], caregiverIds: ['1'] },
  { id: '2', name: '사랑요양', type: '시설', regNum: '987-65-43210', location: '서울시 서초구', requestIds: ['3'], caregiverIds: ['2'] },
];

export { mockOrgs };
