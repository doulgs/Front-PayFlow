import { useColorScheme } from "react-native";
import { useMemo } from "react";
import { colors } from "@/styles/colors";

export type ThemeName = "light" | "dark";

export function useTheme() {
  const colorScheme = useColorScheme();
  const currentTheme: ThemeName = colorScheme === "dark" ? "dark" : "light";
  const palette = useMemo(() => colors, [currentTheme]);
  const iconColor = colorScheme === "dark" ? palette.background.primary : palette.background["dark-primary"];

  return useMemo(() => ({ currentTheme, palette, iconColor }), [currentTheme, palette, iconColor]);
}
