import React, { useState } from "react";
import { View } from "react-native";

import { Card } from "@/components/ui/cards";
import { useCurrency } from "@/hooks/useCurrency";
import { ArrowDownNarrowWide, ArrowUpNarrowWide, Eye, EyeClosed, Landmark } from "lucide-react-native";
import { useVisibilityStore } from "@/storages/useVisibilityStore";

interface Props {
  entries: number;
  exits: number;
}

const FinancialTransactionCards: React.FC<Props> = ({ entries, exits }) => {
  const { formatCurrency } = useCurrency();
  const { isVisible, toggleVisibility } = useVisibilityStore();

  return (
    <>
      <Card variant="outlined" className="mb-4">
        <Card.Body className="flex-row gap-2">
          <Card.Icon variant="success">
            <Landmark size={20} color={"#22C55E"} />
          </Card.Icon>
          <View className="flex-1 flex-row justify-between">
            <View>
              <Card.Text variant="ghost" className="font-semibold text-sm ">
                Saldo Disponivel
              </Card.Text>
              <Card.Text className="font-bold text-xl">
                {isVisible ? "*******" : formatCurrency(entries - exits)}
              </Card.Text>
            </View>

            <View className="flex-row gap-4">
              <Card.Icon onPress={toggleVisibility}>
                {isVisible ? <EyeClosed size={20} /> : <Eye size={20} />}
              </Card.Icon>
            </View>
          </View>
        </Card.Body>
      </Card>
      <View className="flex flex-row gap-4">
        <Card variant="outlined" className="mb-4">
          <Card.Body className="flex-row gap-2">
            <Card.Icon variant="info">
              <ArrowUpNarrowWide size={20} color={"#3B82F6"} />
            </Card.Icon>
            <View>
              <Card.Text variant="ghost" className="font-semibold text-sm ">
                Entrdas
              </Card.Text>
              <Card.Text className="font-bold text-xl">{isVisible ? "*******" : formatCurrency(entries)}</Card.Text>
            </View>
          </Card.Body>
        </Card>
        <Card variant="outlined" className="mb-4">
          <Card.Body className="flex-row gap-2">
            <Card.Icon variant="danger">
              <ArrowDownNarrowWide size={20} color={"#c94848"} />
            </Card.Icon>
            <View>
              <Card.Text variant="ghost" className="font-semibold text-sm ">
                Saidas
              </Card.Text>
              <Card.Text className="font-bold text-xl">{isVisible ? "*******" : formatCurrency(exits)}</Card.Text>
            </View>
          </Card.Body>
        </Card>
      </View>
    </>
  );
};

export { FinancialTransactionCards };
