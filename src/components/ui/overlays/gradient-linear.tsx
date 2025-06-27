import React, { ReactNode } from "react";
import { StyleProp, ViewStyle } from "react-native";

import { useTheme } from "@/hooks/useTheme";
import { clsx } from "clsx";
import { LinearGradient } from "expo-linear-gradient";

interface Props {
  className?: string;
  style?: StyleProp<ViewStyle>;
  children?: ReactNode;
}

export function GradientLinear({ className, style, children }: Props) {
  const { currentTheme, palette } = useTheme();

  const gradientColors: [string, string] =
    currentTheme === "dark"
      ? [palette.brand["dark-primary"], palette.brand["dark-secondary"]]
      : [palette.brand.primary, palette.brand.primary];

  return (
    <LinearGradient colors={gradientColors} className={clsx("", className)} style={style}>
      {children}
    </LinearGradient>
  );
}
