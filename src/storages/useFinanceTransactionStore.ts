import { create } from "zustand";
import { FinanceTransaction } from "@/types/finance";

interface FinanceTransactionStore {
  data: FinanceTransaction[];
  setData: (data: FinanceTransaction[]) => void;
  add: (transaction: FinanceTransaction) => void;
  remove: (id: string) => void;
  reset: () => void;
}

export const useFinanceTransactionStore = create<FinanceTransactionStore>((set) => ({
  data: [],
  setData: (data) => set({ data }),
  add: (transaction) =>
    set((state) => ({
      data: [transaction, ...state.data],
    })),
  remove: (id) =>
    set((state) => ({
      data: state.data.filter((t) => t.id !== id),
    })),
  reset: () =>
    set({
      data: [],
    }),
}));
