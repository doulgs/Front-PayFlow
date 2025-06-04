import { clsx } from "clsx";
import { LinearGradient } from "expo-linear-gradient";
import React, { ReactNode } from "react";
import { StyleProp, ViewStyle } from "react-native";

interface Props {
  className?: string;
  style?: StyleProp<ViewStyle>;
  children?: ReactNode;
}

export default function GradientLinear({ className, style, children }: Props) {
  return (
    <LinearGradient colors={["#291449", "#33115F", "#3D1071"]} className={clsx("", className)} style={style}>
      {children}
    </LinearGradient>
  );
}

export { GradientLinear };
