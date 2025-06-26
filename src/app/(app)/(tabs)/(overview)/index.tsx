import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/cards";
import { Picture } from "@/components/ui/picture";
import { TransactionDTO } from "@/dtos/transaction";
import { useCurrency } from "@/hooks/useCurrency";
import { transactionService } from "@/services/transactions-service";
import { useUserStore } from "@/storages/useUserStore";
import clsx from "clsx";
import { ChevronRight } from "lucide-react-native";

import { DateTime } from "luxon";
import React, { useCallback, useLayoutEffect, useMemo, useState } from "react";
import { ActivityIndicator, SafeAreaView, SectionList, Text, View } from "react-native";

export default function Index() {
  const { userId } = useUserStore();
  const [transactions, setTransactions] = useState<TransactionDTO[]>([]);
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(true);

  const { formatCurrency } = useCurrency();

  const fetchTransactions = async () => {
    if (!userId) return;

    if (!hasMore) return;
    setLoading(true);
    try {
      const res = await transactionService.getAllTransactions(userId, page, 15);
      if (!res.isValid) {
        setLoading(false);
        return;
      }
      const fetched = res.data ?? [];
      if (fetched.length < 15) {
        setHasMore(false);
      }
      setTransactions((prev) => (page === 1 ? fetched : [...prev, ...fetched]));
    } finally {
      setLoading(false);
    }
  };

  useLayoutEffect(() => {
    fetchTransactions();
  }, [page]);

  const loadMore = () => {
    if (!loading && hasMore) {
      setPage((prev) => prev + 1);
    }
  };

  const renderList = (item: TransactionDTO) => {
    return (
      <Card className="my-2 mx-4 flex-row items-center gap-2">
        <Picture size={48} fallback={item.title} />
        <Card.Body className="flex-1 flex-row justify-between items-center">
          <View>
            <Text className="text-md font-bold">{item.title}</Text>
            <Text
              className={clsx("text-sm", {
                "text-green-600": item.status === "completed",
                "text-red-600": item.status === "pending",
              })}
            >
              {item.status}
            </Text>
          </View>
          <View>
            <Text className="text-lg font-semibold">{formatCurrency(item.value)}</Text>
          </View>
        </Card.Body>
        <ChevronRight size={18} />
      </Card>
    );
  };

  const sections = useMemo(() => {
    const groups: Record<string, TransactionDTO[]> = {};
    transactions.forEach((item) => {
      const dateKey = DateTime.fromISO(item.due_date).toISODate()!;
      if (!groups[dateKey]) groups[dateKey] = [];
      groups[dateKey].push(item);
    });
    return Object.keys(groups)
      .sort((a, b) => DateTime.fromISO(b).toSeconds() - DateTime.fromISO(a).toSeconds())
      .map((dateKey) => ({ title: dateKey, data: groups[dateKey] }));
  }, [transactions]);

  const renderItem = useCallback(({ item }: { item: TransactionDTO }) => renderList(item), [renderList]);

  const renderSectionHeader = useCallback(
    ({ section }: { section: { title: string; data: TransactionDTO[] } }) => {
      const todayISO = DateTime.local().toISODate();
      const yesterdayISO = DateTime.local().minus({ days: 1 }).toISODate();
      const label =
        section.title === todayISO
          ? "Hoje"
          : section.title === yesterdayISO
          ? "Ontem"
          : DateTime.fromISO(section.title).toFormat("dd/MM/yyyy");
      const sum = section.data.reduce((total, item) => total + item.value, 0);

      return (
        <Card className="flex-row items-center justify-between my-2 mx-4">
          <Text className="text-zinc-400 font-medium">{label}</Text>
          <Text
            className={clsx("font-semibold", {
              "text-green-600": sum >= 0,
              "text-red-600": sum < 0,
            })}
          >
            {formatCurrency(sum)}
          </Text>
        </Card>
      );
    },
    [formatCurrency]
  );

  const keyExtractor = useCallback((item: TransactionDTO) => item.id + item.due_date, []);

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-light-background-secondary dark:bg-dark-background-alternative">
      <SectionList
        showsVerticalScrollIndicator={false}
        sections={sections}
        extraData={sections}
        keyExtractor={keyExtractor}
        renderSectionHeader={renderSectionHeader}
        renderItem={renderItem}
        onEndReached={loadMore}
        onEndReachedThreshold={0.5}
        refreshing={loading}
        onRefresh={() => {
          setHasMore(true);
          if (page === 1) {
            fetchTransactions();
          } else {
            setPage(1);
          }
        }}
        ListFooterComponent={loading ? <ActivityIndicator /> : null}
      />
    </SafeAreaView>
  );
}
