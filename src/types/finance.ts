export type FinanceType =
  | "entry" // entrada
  | "exit" // saída
  | "transfer" // transferência
  | "refund" // reembolso
  | "loan" // empréstimo
  | "investment" // investimento
  | "other"; // outro

export type PaymentMethod =
  | "cash" // dinheiro
  | "credit_card" // cartão de crédito
  | "debit_card" // cartão de débito
  | "pix" // PIX
  | "bank_transfer" // transferência bancária
  | "boleto" // boleto
  | "crypto" // criptomoeda
  | "check" // cheque
  | "other"; // outro

export type TransactionStatus =
  | "paid" // pago
  | "pending" // pendente
  | "in_progress"; // em andamento

export interface FinanceTransaction {
  id: string;
  title: string;
  description?: string;
  value: number;
  type: FinanceType;
  status: TransactionStatus;
  paymentMethod: PaymentMethod;
  date: string;
  createdAt?: string;
  updatedAt?: string;
  tags?: string[];
  recurrence?: "once" | "weekly" | "monthly" | "yearly";
  note?: string;
}

export type LatestTransactionProps = {
  key: "incoming" | "expenses" | "receivables" | "payables";
  label: string;
  value: number;
  color: string;
};
