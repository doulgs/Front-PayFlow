export interface NotificationDTO {
  id: string;
  tenantId: string;
  userId?: string;
  message: string;
  read: boolean;
  createdAt?: string;
}
