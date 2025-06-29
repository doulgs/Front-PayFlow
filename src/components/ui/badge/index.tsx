import React from "react";
import { clsx } from "clsx";
import { Text, View } from "react-native";
import { BadgeProps } from "./types";
import { variants, variantText, variantTextSize } from "@/styles/variants";

export const Badge: React.FC<BadgeProps> = ({
  label,
  variant = "default",
  textVariant = "default",
  size = "md",
  disabled = false,
  leftIcon,
  rightIcon,
  className,
}) => {
  return (
    <View
      className={clsx(
        "flex-row px-3 py-1 items-center justify-center",
        variants[variant],
        variantTextSize[size],
        variantText[textVariant],
        disabled && "opacity-50",
        className
      )}
    >
      {leftIcon && <View className="mr-1">{leftIcon}</View>}
      <Text className="text-xs font-medium">{label}</Text>
      {rightIcon && <View className="ml-1">{rightIcon}</View>}
    </View>
  );
};
