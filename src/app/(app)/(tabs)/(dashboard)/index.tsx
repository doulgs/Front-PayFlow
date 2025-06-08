import React, { useState } from "react";
import { ScrollView } from "react-native";

import { FinancialTransactionCards } from "@/layouts/financial-transaction-cards";
import { LatestTransactions } from "@/layouts/latest-transactions-cards";
import { FinanceTransaction, LatestTransactionsProps } from "@/types/finance";

export default function Index() {
  const [LatestList] = useState<LatestTransactionsProps>({
    incoming: 654321,
    expenses: 123456,
    receivables: 987654,
    payables: 456123,
  });

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
      <LatestTransactions data={financeList} />
    </ScrollView>
  );
}
