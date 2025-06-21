import { TransactionStatus, TransactionType } from "./enums";

export interface TransactionOutputDTO {
  id: string;
  user_id: string;
  type: TransactionType;
  status: TransactionStatus;
  code: string;
  title: string;
  description?: string | null;
  notes?: string | null;
  value: number;
  due_date: string;
  created_at: string;
  updated_at: string;
}
