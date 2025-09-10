export type NotificationEntityType = 'request' | 'caregiver' | 'org';

export interface Notification {
  id: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  date: string;
  entityType?: NotificationEntityType;
  entityId?: string;
  read?: boolean;
}
