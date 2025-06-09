import React, { useState } from "react";
import { RefreshControl, ScrollView, View } from "react-native";

import { FinancePieChart } from "@/layouts/finance-pie-chart";
import { FinancialTransaction } from "@/layouts/financial-transaction";
import { LatestTransactions } from "@/layouts/latest-transactions";

import { useLatestTransactionsStore } from "@/storages/useLatestTransactionsStore";
import { useFinanceTransactionStore } from "@/storages/useFinanceTransactionStore";
import { FinanceTransaction, LatestTransactionProps } from "@/types/finance";

export default function Index() {
  const [refreshing, setRefreshing] = useState(false);

  const latestData = useLatestTransactionsStore((state) => state.data);
  const setLatestData = useLatestTransactionsStore((state) => state.setData);

  const financeData = useFinanceTransactionStore((state) => state.data);
  const setFinanceData = useFinanceTransactionStore((state) => state.setData);

  const onRefresh = async () => {
    setRefreshing(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const latestMock: LatestTransactionProps[] = [
      { key: "incoming", label: "incoming", value: 654321, color: "#22C55E" },
      { key: "expenses", label: "expenses", value: 123456, color: "#EF4444" },
      { key: "receivables", label: "receivables", value: 987654, color: "#3B82F6" },
      { key: "payables", label: "payables", value: 456123, color: "#FACC15" },
    ];

    const financeMock: FinanceTransaction[] = [
      {
        id: "txn_001",
        title: "Pagamento Academia",
        description: "Mensalidade SmartFit",
        value: 99.9,
        type: "exit", // está dentro do tipo `FinanceType`
        status: "in_progress", // compatível com `TransactionStatus`
        paymentMethod: "credit_card",
        date: "2025-06-01T10:00:00Z",
        tags: ["saúde", "mensalidade"],
      },
      {
        id: "txn_002",
        title: "Salário Junho",
        description: "Salário referente ao mês de Junho",
        value: 3500.0,
        type: "entry",
        status: "paid",
        paymentMethod: "bank_transfer",
        date: "2025-06-05T09:00:00Z",
        tags: ["salário", "renda fixa"],
      },
    ];

    setLatestData(latestMock);
    setFinanceData(financeMock);

    setRefreshing(false);
  };

  return (
    <ScrollView
      className="bg-light-background-secondary dark:bg-dark-background-alternative p-4"
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
    >
      <FinancialTransaction data={latestData} date={new Date()} />
      <FinancePieChart data={latestData} isLoading={refreshing} />
      <LatestTransactions data={financeData} isLoading={refreshing} />
      <View className="min-h-11" />
    </ScrollView>
  );
}
