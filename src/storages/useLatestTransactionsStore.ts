import { LatestTransactionProps } from "@/types/finance";
import { create } from "zustand";

interface LatestTransactionsStore {
  data: LatestTransactionProps[];
  setData: (newData: LatestTransactionProps[]) => void;
  updateValue: (key: LatestTransactionProps["key"], newValue: number) => void;
  reset: () => void;
}

export const useLatestTransactionsStore = create<LatestTransactionsStore>((set) => ({
  data: [
    { key: "incoming", label: "incoming", value: 0, color: "#22C55E" },
    { key: "expenses", label: "expenses", value: 0, color: "#EF4444" },
    { key: "receivables", label: "receivables", value: 0, color: "#3B82F6" },
    { key: "payables", label: "payables", value: 0, color: "#FACC15" },
  ],
  setData: (newData) => set({ data: newData }),
  updateValue: (key, newValue) =>
    set((state) => ({
      data: state.data.map((item) => (item.key === key ? { ...item, value: newValue } : item)),
    })),
  reset: () =>
    set({
      data: [
        { key: "incoming", label: "incoming", value: 0, color: "#22C55E" },
        { key: "expenses", label: "expenses", value: 0, color: "#EF4444" },
        { key: "receivables", label: "receivables", value: 0, color: "#3B82F6" },
        { key: "payables", label: "payables", value: 0, color: "#FACC15" },
      ],
    }),
}));
