import { useFocusEffect } from "@react-navigation/native";
import React, { useCallback, useState } from "react";
import { RefreshControl, ScrollView, View } from "react-native";

import { FinancePieChart } from "@/layouts/finance-pie-chart";
import { FinancialTransaction } from "@/layouts/financial-transaction";
import { LatestTransactions } from "@/layouts/latest-transactions";
import { transactionService } from "@/services/transactions-service";
import { useTransactionSummaryStore } from "@/storages/useTransactionSummaryStore";
import { useUserStore } from "@/storages/useUserStore";

export default function Index() {
  const { userId } = useUserStore();
  const { summary, transactions, setSummary, setTransactions } = useTransactionSummaryStore();
  const [refreshing, setRefreshing] = useState(false);

  const fetchData = useCallback(async () => {
    if (!userId) {
      console.error("User ID not found!");
      return;
    }
    try {
      const response = await transactionService.getSummary(userId);
      if (response.data) {
        setSummary(response.data.summary);
        setTransactions(response.data.transactions);
      } else {
        console.error("No data received from the transaction service.");
      }
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
  }, [userId, setSummary, setTransactions]);

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchData();
    setRefreshing(false);
  };

  useFocusEffect(
    useCallback(() => {
      fetchData();
    }, [fetchData])
  );

  return (
    <ScrollView
      className="bg-light-background-secondary dark:bg-dark-background-alternative p-4"
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
    >
      <FinancialTransaction data={summary} date={new Date()} />
      <FinancePieChart data={summary} isLoading={refreshing} />
      <LatestTransactions data={transactions} isLoading={refreshing} />
      <View className="min-h-11" />
    </ScrollView>
  );
}
