import { View, Text, TouchableOpacity, Animated } from "react-native";
import { useEffect, useState, useRef } from "react";
import clsx from "clsx";
import { Button } from "../buttons";
import { colors } from "@/styles/colors";

interface Props {
  options: string[];
  defaultSelected?: string;
  selected?: string;
  onChange?: (selected: string) => void;
}

export function MultiOptionsButton({ options, defaultSelected, selected: selectedProp, onChange }: Props) {
  const [internalSelected, setInternalSelected] = useState<string>(defaultSelected ?? options[0]);
  const selected = selectedProp ?? internalSelected;
  const [buttonWidth, setButtonWidth] = useState(0);
  const animatedLeft = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (defaultSelected) {
      setInternalSelected(defaultSelected);
    }
  }, [defaultSelected]);

  useEffect(() => {
    const index = options.indexOf(selected);
    Animated.spring(animatedLeft, {
      toValue: index * buttonWidth + 12,
      useNativeDriver: false,
    }).start();
  }, [selected, buttonWidth]);

  const handlePress = (option: string) => {
    if (option !== selected) {
      const index = options.indexOf(option);
      if (selectedProp === undefined) {
        setInternalSelected(option);
      }
      Animated.spring(animatedLeft, {
        toValue: index * buttonWidth + 12,
        useNativeDriver: false,
      }).start();
      onChange?.(option);
    }
  };

  return (
    <View
      className="flex-row items-center justify-center bg-light-background-alternative dark:bg-dark-background-primary p-2 rounded-lg gap-3 relative"
      onLayout={(event) => {
        const { width } = event.nativeEvent.layout;
        setButtonWidth(width / options.length);
      }}
    >
      <Animated.View
        style={{
          position: "absolute",
          height: "100%",
          width: buttonWidth - 24,
          left: animatedLeft,
          backgroundColor: colors.light.brand.primary,
          borderRadius: 8,
        }}
      />
      {options.map((option, index) => {
        const isSelected = selected === option;
        return (
          <Button
            key={index}
            title={option}
            variant={"ghost"}
            className={"flex-1 items-center"}
            onPress={() => handlePress(option)}
            textVariant={isSelected ? "white" : "primary"}
          />
        );
      })}
    </View>
  );
}
