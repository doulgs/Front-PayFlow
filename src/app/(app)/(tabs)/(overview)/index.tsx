import React, { useRef, useState, useEffect } from "react";
import { Text, View, Button } from "react-native";
import dayjs from "dayjs";
import { MonthSelectorCard, MonthSelectorRef } from "@/components/ui/month-selector";
import { LatestTransactions } from "@/layouts/latest-transactions";

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
    <View className="flex-1 bg-light-background-secondary p-4 dark:bg-dark-background-alternative">
      <View>
        <MonthSelectorCard ref={monthSelectorRef} initialDate={new Date()} onChange={handleDateChange} />
      </View>
      {/* <View>
        <LatestTransactions data={[]} isLoading={false} />
      </View> */}
    </View>
  );
}
