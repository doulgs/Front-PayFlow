import React, { useState } from "react";
import { Card } from "@/components/ui/cards";
import { ChartPie } from "lucide-react-native";
import { Text, View, TouchableOpacity } from "react-native";
import { PieChart } from "react-native-gifted-charts";
import { LatestTransactionProps } from "@/types/finance";
import { useTheme } from "@/hooks/useTheme";
import { colors } from "@/styles/colors";

import ImageNoData from "@/assets/images/pie-chart-amico.svg";

interface Props {
  data: LatestTransactionProps[];
}

const FinancePieChart: React.FC<Props> = ({ data }) => {
  const { currentTheme } = useTheme();
  const [focusedKey, setFocusedKey] = useState<string>("");

  const [noData] = useState<boolean>(true);

  const total = data.reduce((acc, cur) => acc + cur.value, 0);
  const focusedItem = data.find((item) => item.key === focusedKey);
  const focusedPercentage = ((focusedItem?.value ?? 0) / total) * 100;
  const iconColor = currentTheme === "dark" ? "white" : "black";
  const bgColor = currentTheme === "dark" ? colors.dark.background.primary : colors.light.background.primary;

  const pieData = data.map((item) => ({
    value: item.value,
    color: item.color,
    focused: item.key === focusedKey,
    onPress: () => setFocusedKey(item.key),
  }));

  return (
    <Card variant="outlined" className="mb-4">
      <Card.Header className="items-center px-1 gap-2">
        <Card.Icon>
          <ChartPie size={20} color={iconColor} />
        </Card.Icon>
        <Card.Text className="text-lg font-semibold">Distribuição Financeira</Card.Text>
      </Card.Header>

      {noData ? (
        <Card.Body className="items-center justify-center my-2">
          <ImageNoData width={200} height={200} />
          <Card.Footer className="mt-2">
            <Card.Text>Nenhum dado disponivel para renderizar</Card.Text>
          </Card.Footer>
        </Card.Body>
      ) : (
        <>
          <Card.Body className="items-center justify-center my-2">
            <PieChart
              data={pieData}
              donut
              sectionAutoFocus
              radius={90}
              innerRadius={60}
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
            {data.map((item) => (
              <TouchableOpacity
                key={item.key}
                onPress={() => setFocusedKey(item.key)}
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
