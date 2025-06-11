import React, { ReactNode } from "react";
import { StyleProp, ViewStyle } from "react-native";

import { useTheme } from "@/hooks/useTheme";
import { colors } from "@/styles/colors";
import { clsx } from "clsx";
import { LinearGradient } from "expo-linear-gradient";

interface Props {
  className?: string;
  style?: StyleProp<ViewStyle>;
  children?: ReactNode;
}

export function GradientLinear({ className, style, children }: Props) {
  const { currentTheme } = useTheme();

  const gradientColors: [string, string] =
    currentTheme === "dark"
      ? [colors.dark.brand.primary, colors.dark.brand.primary]
      : [colors.light.brand.primary, colors.light.brand.primary];

  return (
    <LinearGradient colors={gradientColors} className={clsx("", className)} style={style}>
      {children}
    </LinearGradient>
  );
}
