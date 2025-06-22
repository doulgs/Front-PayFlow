import React, { useEffect, useState } from "react";
import { View } from "react-native";

import { Card } from "@/components/ui/cards";
import { useChangeLanguage } from "@/hooks/useChangeLanguage";
import { useCurrency } from "@/hooks/useCurrency";
import { useDate } from "@/hooks/useDate";
import { useTheme } from "@/hooks/useTheme";
import { useVisibilityStore } from "@/storages/useVisibilityStore";
import {
  ArrowDownNarrowWide,
  ArrowUpNarrowWide,
  ChevronDown,
  ChevronUp,
  Eye,
  EyeClosed,
  Landmark,
} from "lucide-react-native";
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import { TransactionSummaryDTO } from "@/dtos/transaction";

interface Props {
  date: Date;
  data: TransactionSummaryDTO | null;
}

const FinancialTransaction: React.FC<Props> = ({ data, date }) => {
  const { t } = useChangeLanguage();
  const { currentTheme } = useTheme();
  const { formatCurrency } = useCurrency();
  const { formatDateTime } = useDate();
  const { isVisible, toggleVisibility } = useVisibilityStore();

  const [showDetails, setShowDetails] = useState(false);
  const iconColor = currentTheme === "dark" ? "white" : "black";

  const opacity = useSharedValue(0);
  const height = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    height: height.value,
  }));

  useEffect(() => {
    opacity.value = withTiming(showDetails ? 1 : 0, { duration: 300 });
    height.value = withTiming(showDetails ? 100 : 0, { duration: 300 });
  }, [showDetails]);

  const handleToggleDetails = () => {
    setShowDetails((prev) => !prev);
  };

  if (!data) {
    return (
      <Card variant="outlined" className="mb-4">
        <Card.Body>
          <Card.Text className="text-center text-sm">Dados indisponiveis</Card.Text>
        </Card.Body>
      </Card>
    );
  }

  return (
    <>
      <View className="flex-row items-center justify-between px-1 pb-1">
        <Card.Text className="text-sm">{formatDateTime(date.toISOString(), "monthYear")}</Card.Text>
        <View className="flex-row items-center justify-center">
          <Card.Text className="text-sm" onPress={handleToggleDetails}>
            {t("finance.transaction.label.month")}
          </Card.Text>
          <Card.Icon onPress={handleToggleDetails}>
            {showDetails ? <ChevronUp size={16} color={iconColor} /> : <ChevronDown size={16} color={iconColor} />}
          </Card.Icon>
        </View>
      </View>

      <Card variant="outlined" className="mb-4">
        <Card.Body className="flex-row gap-2">
          <Card.Icon variant="muted">
            <Landmark size={20} color={iconColor} />
          </Card.Icon>
          <View className="flex-1 flex-row justify-between">
            <View>
              <Card.Text variant="ghost" className="font-semibold text-sm">
                {t("finance.transaction.label.available")}
              </Card.Text>
              <Card.Text className="font-bold text-xl">
                {isVisible ? "*******" : formatCurrency(data.available_balance)}
              </Card.Text>
            </View>
            <View className="flex-row gap-2 items-center">
              <Card.Icon onPress={toggleVisibility}>
                {isVisible ? <EyeClosed size={20} color={iconColor} /> : <Eye size={20} color={iconColor} />}
              </Card.Icon>
            </View>
          </View>
        </Card.Body>
      </Card>

      <View className="flex flex-row gap-4">
        <Card variant="outlined" className="mb-4 flex-1">
          <Card.Body className="flex-row gap-2">
            <Card.Icon variant="success">
              <ArrowUpNarrowWide size={20} color="#22C55E" />
            </Card.Icon>
            <View>
              <Card.Text variant="ghost" className="font-semibold text-sm">
                {t("finance.transaction.label.income")}
              </Card.Text>
              <Card.Text className="font-bold text-xl">
                {isVisible ? "*******" : formatCurrency(data.total_income)}
              </Card.Text>
            </View>
          </Card.Body>
        </Card>

        <Card variant="outlined" className="mb-4 flex-1">
          <Card.Body className="flex-row gap-2">
            <Card.Icon variant="danger">
              <ArrowDownNarrowWide size={20} color="#c94848" />
            </Card.Icon>
            <View>
              <Card.Text variant="ghost" className="font-semibold text-sm">
                {t("finance.transaction.label.expense")}
              </Card.Text>
              <Card.Text className="font-bold text-xl">
                {isVisible ? "*******" : formatCurrency(data.total_expense)}
              </Card.Text>
            </View>
          </Card.Body>
        </Card>
      </View>

      <Animated.View style={[animatedStyle, { overflow: "hidden" }]}>
        <View className="flex flex-row gap-4">
          <Card variant="outlined" className="mb-4 flex-1">
            <Card.Body className="flex-row gap-2">
              <Card.Icon variant="info">
                <ArrowUpNarrowWide size={20} color="#3B82F6" />
              </Card.Icon>
              <View>
                <Card.Text variant="ghost" className="font-semibold text-sm">
                  {t("finance.transaction.label.to-receive")}
                </Card.Text>
                <Card.Text className="font-bold text-xl">
                  {isVisible ? "*******" : formatCurrency(data.total_to_receive)}
                </Card.Text>
              </View>
            </Card.Body>
          </Card>

          <Card variant="outlined" className="mb-4 flex-1">
            <Card.Body className="flex-row gap-2">
              <Card.Icon variant="warning">
                <ArrowDownNarrowWide size={20} color="#FACC15" />
              </Card.Icon>
              <View>
                <Card.Text variant="ghost" className="font-semibold text-sm">
                  {t("finance.transaction.label.to-pay")}
                </Card.Text>
                <Card.Text className="font-bold text-xl">
                  {isVisible ? "*******" : formatCurrency(data.total_to_pay)}
                </Card.Text>
              </View>
            </Card.Body>
          </Card>
        </View>
      </Animated.View>
    </>
  );
};

export { FinancialTransaction };
