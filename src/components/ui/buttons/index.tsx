import React from "react";
import { clsx } from "clsx";
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, TouchableOpacityProps, View } from "react-native";

type Variant = "primary" | "secondary" | "outline" | "ghost";
type VariantText = "primary" | "secondary" | "outline" | "ghost" | "warning" | "success" | "info" | "white" | "danger";
type Size = "sm" | "md" | "lg";

interface ButtonProps extends TouchableOpacityProps {
  title: string;
  subTitle?: string;
  onPress: () => void;
  variant?: Variant;
  textVariant?: VariantText;
  size?: Size;
  disabled?: boolean;
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const variantClasses: Record<Variant, string> = {
  primary: "bg-light-brand-primary dark:bg-dark-brand-primary",
  secondary: "bg-light-surface-pressed/20 dark:bg-dark-surface-pressed/20",
  outline: "border bg-transparent border-gray-500/20 dark:border-gray-500/20",
  ghost: "bg-transparent",
};

const textColorClasses: Record<VariantText, string> = {
  primary: "dark:text-white text-black",
  secondary: "dark:text-white text-black font-bold",
  outline: "text-light-brand-secondary dark:text-dark-brand-secondary",
  ghost: "text-light-brand-secondary dark:text-dark-brand-secondary",
  success: "text-green-600 dark:text-green-400",
  info: "text-blue-600 dark:text-blue-400",
  warning: "text-yellow-600 dark:text-yellow-400",
  danger: "text-red-700 dark:text-red-500",
  white: "text-white",
};

const paddingClasses: Record<Size, string> = {
  sm: "py-2 px-4",
  md: "py-3 px-6",
  lg: "py-4 px-8",
};

const textSizeClasses: Record<Size, string> = {
  sm: "text-sm",
  md: "text-base",
  lg: "text-lg",
};

export function Button({
  title,
  subTitle,
  onPress,
  variant = "primary",
  textVariant = "primary",
  size = "md",
  disabled = false,
  loading = false,
  leftIcon,
  rightIcon,
  className,
  style,
  ...rest
}: ButtonProps) {
  const isDisabled = disabled || loading;
  const finalTextVariant = textVariant || variant;

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={isDisabled}
      activeOpacity={0.8}
      style={[variant === "primary" ? styles.elevation : undefined, style]}
      className={clsx(
        "rounded-lg w-full",
        "flex-row items-center justify-center",
        variantClasses[variant],
        paddingClasses[size],
        textColorClasses[finalTextVariant],
        isDisabled && "opacity-60",
        className
      )}
      {...rest}
    >
      {loading ? (
        <ActivityIndicator color={variant === "outline" || variant === "ghost" ? undefined : undefined} />
      ) : (
        <>
          {leftIcon && <View className="mr-2">{leftIcon}</View>}
          <View className="items-center justify-center">
            <Text className={clsx("font-semibold", textSizeClasses[size], textColorClasses[finalTextVariant])}>
              {title}
            </Text>
            {subTitle && (
              <Text
                className={clsx(
                  "text-sm text-slate-700 dark:text-gray-100",
                  textSizeClasses[size],
                  textColorClasses[finalTextVariant]
                )}
              >
                {subTitle}
              </Text>
            )}
          </View>
          {rightIcon && <View className="ml-2">{rightIcon}</View>}
        </>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  elevation: {
    elevation: 2,
  },
});
