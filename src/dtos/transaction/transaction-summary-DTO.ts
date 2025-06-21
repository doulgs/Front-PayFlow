export interface TransactionSummaryDTO {
  available_balance: number;
  total_income: number;
  total_expense: number;
  total_to_receive: number;
  total_to_pay: number;
}
export interface TransactionSummaryResponse {
  data: TransactionSummaryDTO;
  error?: string;
}
