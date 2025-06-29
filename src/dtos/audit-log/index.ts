export interface AuditLogDTO {
  id: string;
  tenantId: string;
  userId?: string;
  action: string;
  tableName?: string;
  recordId?: string;
  createdAt?: string;
}
