import React from "react";
import { clsx } from "clsx";
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, TouchableOpacityProps, View } from "react-native";

type Variant = "primary" | "secondary" | "outline" | "ghost";
type Size = "sm" | "md" | "lg";

interface ButtonProps extends TouchableOpacityProps {
  title: string;
  subTitle?: string;
  onPress: () => void;
  variant?: Variant;
  size?: Size;
  disabled?: boolean;
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const variantClasses: Record<Variant, string> = {
  primary: "bg-light-brand-secondary dark:bg-dark-brand-secondary",
  secondary: "bg-light-surface-pressed/20 dark:bg-dark-surface-pressed/20",
  outline: "border border-light-brand-secondary dark:border-dark-brand-secondary bg-transparent",
  ghost: "bg-transparent",
};

const textColorClasses: Record<Variant, string> = {
  primary: "text-white dark:text-black",
  secondary: "text-white dark:text-black font-bold",
  outline: "text-light-brand-secondary dark:text-dark-brand-secondary",
  ghost: "text-light-brand-secondary dark:text-dark-brand-secondary",
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

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={isDisabled}
      activeOpacity={0.8}
      style={[variant === "primary" ? styles.elevation : undefined, style]}
      className={clsx(
        "rounded-lg",
        "flex-row items-center justify-center",
        variantClasses[variant],
        paddingClasses[size],
        textColorClasses[variant],
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
          <View className="items-center flex-1 justify-center">
            <Text
              className={clsx(
                "font-semibold text-slate-700 dark:text-gray-100",
                textSizeClasses[size],
                textColorClasses[variant]
              )}
            >
              {title}
            </Text>
            {subTitle && (
              <Text
                className={clsx(
                  "text-sm text-slate-700 dark:text-gray-100",
                  textSizeClasses[size],
                  textColorClasses[variant]
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
