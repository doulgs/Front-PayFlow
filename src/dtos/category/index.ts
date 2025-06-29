export type TransactionType = "income" | "expense";
export interface CategoryDTO {
  id: string;
  tenantId: string;
  name: string;
  type: TransactionType;
  icon?: string;
  color?: string;
  createdAt?: string;
}
