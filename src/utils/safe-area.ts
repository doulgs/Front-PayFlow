import { Platform, StatusBar } from "react-native";
import { initialWindowMetrics } from "react-native-safe-area-context";

export function getStatusBarHeight(): number {
  if (Platform.OS === "android") {
    return StatusBar.currentHeight ?? 0;
  }

  return initialWindowMetrics?.insets.top ?? 20;
}

export function getBottomSpace(): number {
  return initialWindowMetrics?.insets.bottom ?? 0;
}
