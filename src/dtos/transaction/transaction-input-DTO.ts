import { TransactionStatus, TransactionType } from "./enums";

export interface TransactionInputDTO {
  user_id: string;
  type: TransactionType;
  status?: TransactionStatus; // opcional no input, pois default é 'pending'
  code: string;
  title: string;
  description?: string;
  notes?: string;
  value: number;
  due_date: string; // formato ISO, ex: "2025-06-21"
}
