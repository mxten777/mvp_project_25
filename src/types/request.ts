export type RequestStatus = 'open' | 'matched' | 'completed';

export interface CareRequest {
  id: string;
  title: string;
  date: string;
  location: string;
  name: string;
  phone: string;
  address: string;
  status: RequestStatus;
  createdAt: string;
  matchedCaregiverId?: string;
}
