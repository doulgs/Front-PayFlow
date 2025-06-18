import React, { useEffect, useState, forwardRef, useImperativeHandle } from "react";
import { Text, TouchableOpacity, View } from "react-native";

import { useDate } from "@/hooks/useDate";
import { useTheme } from "@/hooks/useTheme";
import dayjs from "dayjs";
import { ChevronLeft, ChevronRight } from "lucide-react-native";
import { Card } from "../cards";
import { useChangeLanguage } from "@/hooks/useChangeLanguage";

interface Props {
  initialDate?: Date;
  onChange: (date: Date) => void;
  onMonthChange?: (isCurrentMonth: boolean) => void;
}

export type MonthSelectorRef = {
  setDate: (date: Date) => void;
  isCurrentMonth: boolean;
};

export const MonthSelectorCard = forwardRef<MonthSelectorRef, Props>(
  ({ initialDate = new Date(), onChange, onMonthChange }, ref) => {
    const { t, currentLanguage } = useChangeLanguage();
    const { iconColor } = useTheme();
    const { formatDateTime } = useDate(undefined, currentLanguage);

    const [currentDate, setCurrentDate] = useState(dayjs(initialDate).startOf("month"));
    const [isCurrentMonth, setIsCurrentMonth] = useState(dayjs().isSame(dayjs(initialDate).startOf("month"), "month"));

    useImperativeHandle(ref, () => ({
      setDate: (date: Date) => {
        const startOfMonth = dayjs(date).startOf("month");
        setCurrentDate(startOfMonth);
        onChange(startOfMonth.toDate());
      },
      isCurrentMonth,
    }));

    useEffect(() => {
      onChange(currentDate.toDate());

      const isCurrent = dayjs().isSame(currentDate, "month");
      setIsCurrentMonth(isCurrent);

      if (onMonthChange) {
        onMonthChange(isCurrent);
      }
    }, [currentDate]);

    const handleChangeMonth = (offset: number) => {
      setCurrentDate((d) => d.add(offset, "month"));
    };

    const prevMonth = currentDate.subtract(1, "month");
    const nextMonth = currentDate.add(1, "month");

    return (
      <Card variant="outlined" className="flex-row items-center justify-between px-4 py-3 rounded-lg min-h-16">
        <View className="flex-row items-center justify-center space-x-2 flex-1">
          <TouchableOpacity onPress={() => handleChangeMonth(-1)} className="px-4">
            <ChevronLeft size={22} color={iconColor} />
          </TouchableOpacity>

          <Text className="text-sm w-[80px] text-center text-light-typography-muted dark:text-dark-typography-muted">
            {formatDateTime(prevMonth.toDate(), "monthYear")}
          </Text>

          <View className="px-4 py-1 rounded-lg min-w-[90px] items-center bg-light-brand-primary/10 dark:bg-dark-brand-primary/10">
            <Text className="text-base font-semibold text-light-brand-primary dark:text-dark-brand-primary">
              {formatDateTime(currentDate.toDate(), "monthYear")}
            </Text>
          </View>

          <Text className="text-sm w-[80px] text-center text-light-typography-muted dark:text-dark-typography-muted">
            {formatDateTime(nextMonth.toDate(), "monthYear")}
          </Text>

          <TouchableOpacity onPress={() => handleChangeMonth(1)} className="px-4">
            <ChevronRight size={22} color={iconColor} />
          </TouchableOpacity>
        </View>
      </Card>
    );
  }
);
