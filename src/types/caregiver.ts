export interface Caregiver {
  id: string;
  name: string;
  phone: string;
  gender: '남' | '여';
  age: number;
  experience: number;
  available: boolean;
  orgId: string;
  skills: string[];
  rating: number;
}
