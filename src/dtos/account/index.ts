export type AccountType = "bank" | "cash" | "credit_card" | "investment";
export interface AccountDTO {
  id: string;
  tenantId: string;
  name: string;
  type: AccountType;
  initialBalance: number;
  active: boolean;
  createdAt?: string;
}
