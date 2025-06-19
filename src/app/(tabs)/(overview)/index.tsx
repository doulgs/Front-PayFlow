import { MonthSelectorCard, MonthSelectorRef } from "@/components/ui/month-selector";
import { ListTransactions } from "@/layouts/list-transaction";
import dayjs from "dayjs";
import React, { useRef, useState } from "react";
import { View } from "react-native";

export default function Index() {
  const monthSelectorRef = useRef<MonthSelectorRef>(null);
  const [showTodayButton, setShowTodayButton] = useState(false);

  const handleDateChange = (date: Date) => {
    const isSameMonth = dayjs(date).isSame(new Date(), "month");
    setShowTodayButton(!isSameMonth);
  };

  const goToToday = () => {
    monthSelectorRef.current?.setDate(new Date());
  };

  return (
    <View className="flex-1 gap-4 bg-light-background-secondary p-4 dark:bg-dark-background-alternative">
      <View className="min-h-16">
        <MonthSelectorCard ref={monthSelectorRef} initialDate={new Date()} onChange={handleDateChange} />
      </View>
      <View className="flex-1">
        <ListTransactions data={[]} isLoading={false} />
      </View>
    </View>
  );
}
