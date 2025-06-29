import { Variant, Size } from "@/styles/variants";
import { TouchableOpacityProps } from "react-native";

interface BaseButtonProps {
  title: string;
  subTitle?: string;
  variant?: Variant;
  textVariant?: Variant;
  size?: Size;
  disabled?: boolean;
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export interface ButtonProps extends TouchableOpacityProps, BaseButtonProps {}
