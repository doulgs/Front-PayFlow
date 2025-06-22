import { create } from "zustand";
import { TransactionDTO, TransactionSummaryDTO } from "@/dtos/transaction";

interface TransactionSummaryStore {
  transactions: TransactionDTO[];
  summary: TransactionSummaryDTO | null;
  setTransactions: (transactions: TransactionDTO[]) => void;
  setSummary: (summary: TransactionSummaryDTO) => void;
  clearTransactions: () => void;
}

export const useTransactionSummaryStore = create<TransactionSummaryStore>((set) => ({
  transactions: [],
  summary: null,

  setTransactions: (transactions) => set({ transactions }),
  setSummary: (summary) => set({ summary }),
  clearTransactions: () => set({ transactions: [], summary: null }),
}));
