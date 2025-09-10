export interface Org {
  id: string;
  name: string;
  type: string;
  regNum: string;
  location: string;
  requestIds?: string[];
  caregiverIds?: string[];
}
