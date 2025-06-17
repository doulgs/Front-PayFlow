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
      <Card className="flex-row items-center justify-between px-4 py-3 rounded-lg min-h-16">
        {/* Botão anterior */}
        <TouchableOpacity onPress={() => handleChangeMonth(-1)} className="mr-3">
          <ChevronLeft size={22} color={iconColor} />
        </TouchableOpacity>

        {/* Mês anterior */}
        <TouchableOpacity onPress={() => handleChangeMonth(-1)} className="flex-1 items-center">
          <Text className="text-base text-light-typography-muted dark:text-dark-typography-muted mr-3">
            {formatDateTime(prevMonth.toDate(), "monthYear")}
          </Text>
        </TouchableOpacity>

        {/* Mês atual destacado */}
        <View className="px-4 py-1 rounded-lg min-w-[90px] items-center bg-light-brand-primary/10 dark:bg-dark-brand-primary/10">
          <Text className="text-base font-semibold text-light-brand-primary dark:text-dark-brand-primary">
            {formatDateTime(currentDate.toDate(), "monthYear")}
          </Text>
        </View>

        {/* Mês seguinte */}
        <TouchableOpacity onPress={() => handleChangeMonth(1)} className="flex-1 items-center">
          <Text className="text-base text-light-typography-muted dark:text-dark-typography-muted ml-3">
            {formatDateTime(nextMonth.toDate(), "monthYear")}
          </Text>
        </TouchableOpacity>

        {/* Botão próximo */}
        <TouchableOpacity onPress={() => handleChangeMonth(1)} className="ml-3">
          <ChevronRight size={22} color={iconColor} />
        </TouchableOpacity>
      </Card>
    );
  }
);
