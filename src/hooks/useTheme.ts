import { useColorScheme } from "react-native";
import { colors } from "@/styles/colors";

export type ThemeName = "light" | "dark";

export function useTheme() {
  const colorScheme = useColorScheme();
  const currentTheme: ThemeName = colorScheme === "dark" ? "dark" : "light";
  const palette = currentTheme === "dark" ? colors.dark : colors.light;

  return { currentTheme, palette };
}
