import { TransactionDTO } from "@/dtos/transaction";
import { create } from "zustand";

interface TransactionStore {
  data: Partial<TransactionDTO>;
  setData: (data: Partial<TransactionDTO>) => void;
  mergeData: (data: Partial<TransactionDTO>) => void;
  reset: () => void;
}

export const useTransactionStore = create<TransactionStore>((set) => ({
  data: {},
  setData: (data) => set({ data }),
  mergeData: (newData) =>
    set((state) => ({
      data: { ...state.data, ...newData },
    })),
  reset: () => set({ data: {} }),
}));
