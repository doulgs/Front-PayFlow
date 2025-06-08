import React, { useState } from "react";
import { ScrollView, View } from "react-native";

import { FinancePieChart } from "@/layouts/finance-pie-chart";
import { FinancialTransactionCards } from "@/layouts/financial-transaction-cards";
import { LatestTransactions } from "@/layouts/latest-transactions-cards";
import { FinanceTransaction, LatestTransactionsProps } from "@/types/finance";

export default function Index() {
  const [LatestList] = useState<LatestTransactionsProps[]>([
    { key: `incoming`, label: `incoming`, value: 654321, color: `#22C55E` },
    { key: `expenses`, label: `expenses`, value: 123456, color: `#EF4444` },
    { key: `receivables`, label: `receivables`, value: 987654, color: `#3B82F6` },
    { key: `payables`, label: `payables`, value: 456123, color: `#FACC15` },
  ]);

  const [financeList] = useState<FinanceTransaction[]>([
    {
      id: "txn_001",
      title: "Pagamento Academia",
      description: "Mensalidade SmartFit",
      value: 99.9,
      type: "exit",
      status: "in_progress",
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
  ]);

  return (
    <ScrollView className="bg-light-background-secondary dark:bg-dark-background-alternative p-4">
      <FinancialTransactionCards data={LatestList} date={new Date()} />
      <FinancePieChart data={LatestList} />
      <LatestTransactions data={financeList} />
      <View className="min-h-11" />
    </ScrollView>
  );
}
