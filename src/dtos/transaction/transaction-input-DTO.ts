import { TransactionStatus, TransactionType } from "./enums";

export interface TransactionInputDTO {
  type: TransactionType;
  status?: TransactionStatus;
  code: string;
  title: string;
  description?: string;
  notes?: string;
  value: string;
  due_date: string;
}
