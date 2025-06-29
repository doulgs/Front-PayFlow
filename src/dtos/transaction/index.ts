import { TransactionType } from "../category";

export type TransactionStatus = "pending" | "paid";
export interface TransactionDTO {
  id: string;
  tenantId: string;
  userId: string;
  userName: string;
  accountId: string;
  accountName: string;
  categoryId?: string;
  categoryName: string;
  type: TransactionType;
  title: string;
  description?: string;
  value: number;
  status: TransactionStatus;
  dueDate: string;
  paidAt: string | null;
  createdAt?: string;
  updatedAt?: string;
}
