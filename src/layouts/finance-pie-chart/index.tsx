import React, { useEffect, useState } from "react";
import { ActivityIndicator, LayoutAnimation, Platform, TouchableOpacity, UIManager, View } from "react-native";

import { Card } from "@/components/ui/cards";
import { TransactionSummaryDTO } from "@/dtos/transaction";
import { useChangeLanguage } from "@/hooks/useChangeLanguage";
import { useTheme } from "@/hooks/useTheme";
import { ChartPie } from "lucide-react-native";
import { PieChart } from "react-native-gifted-charts";

import ImageNoData from "@/assets/images/pie-chart-amico.svg";

if (Platform.OS === "android" && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

interface Props {
  isLoading?: boolean;
  data: TransactionSummaryDTO | null;
}

const FinancePieChart: React.FC<Props> = ({ data, isLoading = false }) => {
  const { t } = useChangeLanguage();
  const { currentTheme, iconColor, palette } = useTheme();
  const [focusedKey, setFocusedKey] = useState<string>("");

  useEffect(() => {
    if (!isLoading) {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    }
  }, [isLoading]);

  const total = data ? Object.values(data).reduce((acc, cur) => (typeof cur === "number" ? acc + cur : acc), 0) : 0;

  const chartItems = [
    {
      key: "total_income",
      label: t("chart.finance.income"),
      value: data?.total_income ?? 0,
      color: "#22C55E",
    },
    {
      key: "total_expense",
      label: t("chart.finance.expense"),
      value: data?.total_expense ?? 0,
      color: "#EF4444",
    },
    {
      key: "total_to_receive",
      label: t("chart.finance.to_receive"),
      value: data?.total_to_receive ?? 0,
      color: "#3B82F6",
    },
    {
      key: "total_to_pay",
      label: t("chart.finance.to_pay"),
      value: data?.total_to_pay ?? 0,
      color: "#FACC15",
    },
  ];

  const hasNoData = chartItems.every((item) => item.value === 0);
  const focusedItem = chartItems.find((item) => item.key === focusedKey);
  const focusedPercentage = ((focusedItem?.value ?? 0) / total) * 100;
  const bgColor = currentTheme === "dark" ? palette.background.primary : palette.background.primary;

  const pieData = chartItems.map((item) => ({
    value: item.value,
    color: item.color,
    focused: item.key === focusedKey,
    onPress: () => {
      setFocusedKey((prev) => (prev === item.key ? "" : item.key));
    },
  }));

  return (
    <Card variant="outlined" className="mb-4">
      <Card.Header className="items-center px-1 gap-2">
        <Card.Icon>
          <ChartPie size={20} color={iconColor} />
        </Card.Icon>
        <Card.Text className="text-lg font-semibold">{t("finance.pie-chart.title")}</Card.Text>
      </Card.Header>

      {isLoading ? (
        <Card.Body className="items-center justify-center my-6">
          <ActivityIndicator size="large" color={palette.brand.primary} />
          <Card.Text className="mt-2 text-sm text-muted">{t("finance.pie-chart.loading")}</Card.Text>
        </Card.Body>
      ) : hasNoData ? (
        <Card.Body className="items-center justify-center my-2">
          <ImageNoData width={180} height={180} />
          <Card.Footer className="mt-2">
            <Card.Text className="text-sm text-muted">{t("finance.pie-chart.empty")}</Card.Text>
          </Card.Footer>
        </Card.Body>
      ) : (
        <>
          <Card.Body className="items-center justify-center my-2">
            <PieChart
              data={pieData}
              donut
              sectionAutoFocus
              isAnimated
              animationDuration={500}
              radius={70}
              innerRadius={40}
              innerCircleColor={bgColor}
              centerLabelComponent={() =>
                focusedItem ? (
                  <View className="items-center">
                    <Card.Text className="font-bold text-md">{focusedPercentage.toFixed(0)}%</Card.Text>
                    <Card.Text className="font-bold text-md">{focusedItem.label}</Card.Text>
                  </View>
                ) : null
              }
            />
          </Card.Body>

          <Card.Footer className="flex-row flex-wrap justify-center px-2 py-1 gap-y-2">
            {chartItems.map((item) => (
              <TouchableOpacity
                key={item.key}
                onPress={() => setFocusedKey((prev) => (prev === item.key ? "" : item.key))}
                style={{ width: "50%", alignItems: "center" }}
              >
                <View className="flex-row items-center">
                  <View className="w-4 h-4 rounded-md border mr-2" style={{ backgroundColor: item.color }} />
                  <Card.Text className="text-sm">{item.label}</Card.Text>
                </View>
              </TouchableOpacity>
            ))}
          </Card.Footer>
        </>
      )}
    </Card>
  );
};

export { FinancePieChart };
