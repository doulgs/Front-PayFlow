export interface InstallmentDTO {
  id: string;
  tenantId: string;
  transactionId: string;
  number: number;
  value: number;
  dueDate: string;
  paidAt?: string;
}
