import { useColorScheme } from "react-native";
import { useMemo } from "react";
import { colors } from "@/styles/colors";

export type ThemeName = "light" | "dark";

export function useTheme() {
  const colorScheme = useColorScheme();
  const currentTheme: ThemeName = colorScheme === "dark" ? "dark" : "light";
  const palette = useMemo(() => (currentTheme === "dark" ? colors.dark : colors.light), [currentTheme]);
  const iconColor = palette.typography.secondary;

  return useMemo(() => ({ currentTheme, palette, iconColor }), [currentTheme, palette, iconColor]);
}
