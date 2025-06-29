import { Variant, Size } from "@/styles/variants";

export interface BadgeProps {
  label: string;
  variant?: Variant;
  textVariant?: Variant;
  size?: Size;
  disabled?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  className?: string;
}
