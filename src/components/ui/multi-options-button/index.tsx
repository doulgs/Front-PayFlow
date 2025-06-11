import { View, Text, TouchableOpacity } from "react-native";
import { useEffect, useState } from "react";
import clsx from "clsx";
import { Button } from "../buttons";

interface Props {
  options: string[];
  defaultSelected?: string;
  selected?: string;
  onChange?: (selected: string) => void;
}

export function MultiOptionsButton({ options, defaultSelected, selected: selectedProp, onChange }: Props) {
  const [internalSelected, setInternalSelected] = useState<string>(defaultSelected ?? options[0]);

  const selected = selectedProp ?? internalSelected;

  useEffect(() => {
    if (defaultSelected) {
      setInternalSelected(defaultSelected);
    }
  }, [defaultSelected]);

  const handlePress = (option: string) => {
    if (option !== selected) {
      if (selectedProp === undefined) {
        setInternalSelected(option);
      }
      onChange?.(option);
    }
  };

  return (
    <View className="flex-row items-center justify-center gap-3">
      {options.map((option, index) => {
        const isSelected = selected === option;
        return (
          <Button
            key={index}
            title={option}
            onPress={() => handlePress(option)}
            variant={isSelected ? "primary" : "outline"}
            className={"flex-1 py-3 rounded-lg items-center"}
          />
        );
      })}
    </View>
  );
}
