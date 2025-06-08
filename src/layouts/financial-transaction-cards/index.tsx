import { Card } from "@/components/ui/cards";
import { useTheme } from "@/hooks/useTheme";
import { useCurrency } from "@/hooks/useCurrency";
import { useVisibilityStore } from "@/storages/useVisibilityStore";
import { LatestTransactionProps } from "@/types/finance";

import {
  ArrowDownNarrowWide,
  ArrowUpNarrowWide,
  ChevronDown,
  ChevronUp,
  Eye,
  EyeClosed,
  Landmark,
} from "lucide-react-native";
import React, { useState } from "react";
import { View } from "react-native";
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import { useFormattedDate } from "@/hooks/useFormattedDate";

interface Props {
  date: Date;
  data: LatestTransactionProps[];
}

const FinancialTransactionCards: React.FC<Props> = ({ data, date }) => {
  const { currentTheme } = useTheme();
  const { formatCurrency } = useCurrency();
  const { formatDate } = useFormattedDate();
  const { isVisible, toggleVisibility } = useVisibilityStore();

  const [showDetails, setShowDetails] = useState(false);
  const iconColor = currentTheme === "dark" ? "white" : "black";

  const opacity = useSharedValue(0);
  const height = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    height: height.value,
  }));

  const handleToggleDetails = () => {
    setShowDetails((prev) => {
      const expanding = !prev;
      opacity.value = withTiming(expanding ? 1 : 0, { duration: 300 });
      height.value = withTiming(expanding ? 100 : 0, { duration: 300 });
      return expanding;
    });
  };

  return (
    <>
      <View className="flex-row items-center justify-between px-1 pb-1">
        <Card.Text className="text-sm">{formatDate(date.toISOString(), "month-year")}</Card.Text>
        <View className="flex-row items-center justify-center">
          <Card.Text className="text-sm" onPress={handleToggleDetails}>
            Exibir mais
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
                Saldo Disponível
              </Card.Text>
              <Card.Text className="font-bold text-xl">
                {isVisible ? "*******" : formatCurrency(data[0].value - data[1].value)}
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

      {/* Entradas e Saídas */}
      <View className="flex flex-row gap-4">
        <Card variant="outlined" className="mb-4 flex-1">
          <Card.Body className="flex-row gap-2">
            <Card.Icon variant="success">
              <ArrowUpNarrowWide size={20} color={"#22C55E"} />
            </Card.Icon>
            <View>
              <Card.Text variant="ghost" className="font-semibold text-sm">
                Entradas
              </Card.Text>
              <Card.Text className="font-bold text-xl">
                {isVisible ? "*******" : formatCurrency(data[0].value)}
              </Card.Text>
            </View>
          </Card.Body>
        </Card>

        <Card variant="outlined" className="mb-4 flex-1">
          <Card.Body className="flex-row gap-2">
            <Card.Icon variant="danger">
              <ArrowDownNarrowWide size={20} color={"#c94848"} />
            </Card.Icon>
            <View>
              <Card.Text variant="ghost" className="font-semibold text-sm">
                Saídas
              </Card.Text>
              <Card.Text className="font-bold text-xl">
                {isVisible ? "*******" : formatCurrency(data[1].value)}
              </Card.Text>
            </View>
          </Card.Body>
        </Card>
      </View>

      {/* Animated A Receber e A Pagar */}
      <Animated.View style={[animatedStyle, { overflow: "hidden" }]}>
        <View className="flex flex-row gap-4">
          <Card variant="outlined" className="mb-4 flex-1">
            <Card.Body className="flex-row gap-2">
              <Card.Icon variant="info">
                <ArrowUpNarrowWide size={20} color={"#3B82F6"} />
              </Card.Icon>
              <View>
                <Card.Text variant="ghost" className="font-semibold text-sm">
                  A Receber
                </Card.Text>
                <Card.Text className="font-bold text-xl">
                  {isVisible ? "*******" : formatCurrency(data[2].value)}
                </Card.Text>
              </View>
            </Card.Body>
          </Card>

          <Card variant="outlined" className="mb-4 flex-1">
            <Card.Body className="flex-row gap-2">
              <Card.Icon variant="warning">
                <ArrowDownNarrowWide size={20} color={"#FACC15"} />
              </Card.Icon>
              <View>
                <Card.Text variant="ghost" className="font-semibold text-sm">
                  A Pagar
                </Card.Text>
                <Card.Text className="font-bold text-xl">
                  {isVisible ? "*******" : formatCurrency(data[3].value)}
                </Card.Text>
              </View>
            </Card.Body>
          </Card>
        </View>
      </Animated.View>
    </>
  );
};

export { FinancialTransactionCards };
