import { Variant } from "@/styles/variants";
import { GestureResponderEvent, TextProps } from "react-native";

interface BaseCardProps {
  children: React.ReactNode;
  className?: string;
  variant?: Variant;
}

export interface CardRootProps extends BaseCardProps {
  onPress?: (event: GestureResponderEvent) => void;
}

export interface CardTextProps extends TextProps {
  variant?: Variant;
  className?: string;
}
