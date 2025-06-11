import React from "react";
import { Control, useController } from "react-hook-form";

import { Card } from "@/components/ui/cards";
import { useTheme } from "@/hooks/useTheme";
import { Trash2 } from "lucide-react-native";
import { View } from "react-native";

interface KeyboardProps {
  control: Control<any>;
  name: string;
}

const keys: string[][] = [
  ["1", "2", "3"],
  ["4", "5", "6"],
  ["7", "8", "9"],
  ["C", "0", "backspace"],
];

export function NumericKeyboard({ control, name }: KeyboardProps) {
  const { palette } = useTheme();
  const {
    field: { value = "", onChange },
  } = useController({ control, name, defaultValue: "" });

  const handlePress = (key: string) => {
    let digits = value;
    if (key === "backspace") {
      digits = digits.slice(0, -1);
    } else if (key === "C") {
      digits = "";
    } else if (/^[0-9]$/.test(key)) {
      digits = digits + key;
    }
    onChange(digits);
  };

  return (
    <View>
      {keys.map((row, ri) => (
        <View key={ri} className="flex-row justify-between">
          {row.map((k) => (
            <Card
              key={k || Math.random()}
              className="flex-1 m-2 h-20 rounded-xl items-center justify-center bg-light-surface-card dark:bg-dark-surface-card"
              onPress={() => k && handlePress(k)}
            >
              {k === "backspace" ? (
                <Trash2 size={24} color={palette.status.danger} />
              ) : (
                <Card.Text className="text-xl font-bold text-light-typography-primary dark:text-dark-typography-primary">
                  {k}
                </Card.Text>
              )}
            </Card>
          ))}
        </View>
      ))}
    </View>
  );
}
