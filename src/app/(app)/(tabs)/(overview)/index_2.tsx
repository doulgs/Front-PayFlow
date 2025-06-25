import { MonthSelectorCard, MonthSelectorRef } from "@/components/ui/month-selector";
import { ListTransactions } from "@/layouts/list-transaction";
import dayjs from "dayjs";
import React, { useRef, useState, useLayoutEffect, useMemo, useCallback } from "react";
import { View, SectionList, ActivityIndicator, Text } from "react-native";
import { transactionService } from "@/services/transactions-service";
import { useUserStore } from "@/storages/useUserStore";
import { useChangeLanguage } from "@/hooks/useChangeLanguage";
import { useTheme } from "@/hooks/useTheme";
import { useCurrency } from "@/hooks/useCurrency";
import { useVisibilityStore } from "@/storages/useVisibilityStore";
import { Card } from "@/components/ui/cards";
import { LayoutList } from "lucide-react-native";
import ImageNoData from "@/assets/images/research-paper-amico.svg";
import { TransactionDTO } from "@/dtos/transaction";
import clsx from "clsx";
import { Badge } from "@/components/ui/badge";

export default function Index() {
  const { userId } = useUserStore();
  const monthSelectorRef = useRef<MonthSelectorRef>(null);
  const [showTodayButton, setShowTodayButton] = useState(false);
  const [transactions, setTransactions] = useState<any[]>([]);
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const { t } = useChangeLanguage();
  const { palette, iconColor } = useTheme();
  const { formatCurrency } = useCurrency();
  const { isVisible } = useVisibilityStore();

  const handleDateChange = (date: Date) => {
    setSelectedDate(date);
    setPage(1);
    setTransactions([]);
    setHasMore(true);
    const isSameMonth = dayjs(date).isSame(new Date(), "month");
    setShowTodayButton(!isSameMonth);
  };

  const goToToday = () => {
    monthSelectorRef.current?.setDate(new Date());
  };

  const fetchTransactions = async () => {
    if (!userId) return;

    if (!hasMore) return;
    setLoading(true);
    try {
      const res = await transactionService.getTransactionsByMonth(userId, selectedDate.toISOString(), page, 15);
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
  }, [page, selectedDate]);

  const loadMore = () => {
    if (!loading && hasMore) {
      setPage((prev) => prev + 1);
    }
  };

  const renderList = (item: TransactionDTO) => {
    return (
      <Card.Body className="flex-row items-center justify-between gap-2 px-1 mt-2">
        <Card.Icon variant="outlined" className="min-w-9 min-h-9">
          <Card.Text>
            {(() => {
              const words = item.title.trim().split(" ");
              if (words.length === 1) {
                const word = words[0];
                return `${word.charAt(0).toUpperCase()}${word.charAt(word.length - 1).toUpperCase()}`;
              }
              return words
                .slice(0, 2)
                .map((word) => word.charAt(0).toUpperCase())
                .join("");
            })()}
          </Card.Text>
        </Card.Icon>

        <View className="flex-1 mr-4">
          <Card.Text numberOfLines={1} className={clsx("text-md font-bold")}>
            {item.title}
          </Card.Text>
          <Card.Text numberOfLines={1} className={clsx("text-sm")}>
            {item.description}
          </Card.Text>
        </View>

        <View className="items-end">
          <Card.Text numberOfLines={1} className={clsx("text-lg font-bold")}>
            {isVisible ? "*******" : formatCurrency(item.value)}
          </Card.Text>
          <Badge variant={item.status === "completed" ? "success" : "error"}>
            <Text>{item.status}</Text>
          </Badge>
        </View>
      </Card.Body>
    );
  };

  // Group transactions by due_date day for SectionList
  const sections = useMemo(() => {
    const groups: Record<string, TransactionDTO[]> = {};
    transactions.forEach((item) => {
      const dateKey = dayjs(item.due_date).format("YYYY-MM-DD");
      if (!groups[dateKey]) groups[dateKey] = [];
      groups[dateKey].push(item);
    });
    return Object.keys(groups)
      .sort((a, b) => dayjs(b).unix() - dayjs(a).unix())
      .map((dateKey) => ({ title: dateKey, data: groups[dateKey] }));
  }, [transactions]);

  const renderItem = useCallback(({ item }: { item: TransactionDTO }) => renderList(item), [renderList]);

  const renderSectionHeader = useCallback(
    ({ section }: { section: { title: string } }) => (
      <View className="items-center justify-center mt-2">
        <Text className="text-zinc-400">{dayjs(section.title).format("DD/MM/YYYY")}</Text>
      </View>
    ),
    []
  );

  const keyExtractor = useCallback((item: TransactionDTO) => item.id + item.due_date, []);

  return (
    <View className="flex-1 gap-4 bg-light-background-secondary p-4 dark:bg-dark-background-alternative">
      <View className="min-h-16">
        <MonthSelectorCard ref={monthSelectorRef} initialDate={selectedDate} onChange={handleDateChange} />
      </View>

      <Card variant="outlined">
        <Card.Header className="items-center px-1 gap-2">
          <Card.Icon>
            <LayoutList size={18} color={iconColor} />
          </Card.Icon>
          <Card.Text className="text-lg font-semibold">{t("finance.latest.title")}</Card.Text>
        </Card.Header>
        <SectionList
          showsVerticalScrollIndicator={false}
          sections={sections}
          extraData={sections}
          keyExtractor={keyExtractor}
          renderSectionHeader={renderSectionHeader}
          renderItem={renderItem}
          onEndReached={loadMore}
          onEndReachedThreshold={0.5}
          ListFooterComponent={loading ? <ActivityIndicator /> : null}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      </Card>
    </View>
  );
}
