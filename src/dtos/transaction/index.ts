import { TransactionType } from "../category";

export type TransactionStatus = "pending" | "paid";
export interface TransactionDTO {
  id: string;
  tenantId: string;
  userId: string;
  accountId: string;
  categoryId?: string;
  type: TransactionType;
  title: string;
  description?: string;
  value: number;
  status: TransactionStatus;
  dueDate: string;
  paidAt?: string;
  createdAt?: string;
  updatedAt?: string;
}
