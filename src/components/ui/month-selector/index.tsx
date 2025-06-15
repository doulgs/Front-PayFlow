import React, { useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";

import { useDate } from "@/hooks/useDate";
import { useTheme } from "@/hooks/useTheme";
import dayjs from "dayjs";
import { ChevronLeft, ChevronRight } from "lucide-react-native";
import { Card } from "../cards";

interface Props {
  initialDate?: Date;
  onChange: (date: Date) => void;
}

export const MonthSelectorCard = ({ initialDate = new Date(), onChange }: Props) => {
  const { iconColor } = useTheme();
  const { formatDateTime } = useDate();

  const [currentDate, setCurrentDate] = useState(dayjs(initialDate).startOf("month"));

  useEffect(() => {
    onChange(currentDate.toDate());
  }, [currentDate]);

  const handleChangeMonth = (offset: number) => {
    setCurrentDate((d) => d.add(offset, "month"));
  };

  const prevMonth = currentDate.subtract(1, "month");
  const nextMonth = currentDate.add(1, "month");

  return (
    <Card className="flex-row items-center justify-between px-4 py-3 rounded-lg">
      {/* Botão anterior */}
      <TouchableOpacity onPress={() => handleChangeMonth(-1)} className="mr-3">
        <ChevronLeft size={22} color={iconColor} />
      </TouchableOpacity>

      {/* Mês anterior */}
      <TouchableOpacity onPress={() => handleChangeMonth(-1)} className="flex-1 items-center">
        <Text className="text-base text-light-typography-muted dark:text-dark-typography-muted mr-3">
          {formatDateTime(prevMonth.toDate(), "monthNameLong")}
        </Text>
      </TouchableOpacity>

      {/* Mês atual destacado */}
      <View className="px-4 py-1 rounded-lg min-w-[90px] items-center bg-light-brand-primary/10 dark:bg-dark-brand-primary/10">
        <Text className="text-base font-semibold text-light-brand-primary dark:text-dark-brand-primary">
          {formatDateTime(currentDate.toDate(), "monthNameLong")}
        </Text>
      </View>

      {/* Mês seguinte */}
      <TouchableOpacity onPress={() => handleChangeMonth(1)} className="flex-1 items-center">
        <Text className="text-base text-light-typography-muted dark:text-dark-typography-muted ml-3">
          {formatDateTime(nextMonth.toDate(), "monthNameLong")}
        </Text>
      </TouchableOpacity>

      {/* Botão próximo */}
      <TouchableOpacity onPress={() => handleChangeMonth(1)} className="ml-3">
        <ChevronRight size={22} color={iconColor} />
      </TouchableOpacity>
    </Card>
  );
};
