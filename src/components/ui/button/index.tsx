import { clsx } from "clsx";
import React from "react";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";
import { ButtonProps } from "./types";

import { variants, variantText, variantTextSize } from "@/styles/variants";

const ButtonContent = ({
  loading,
  title,
  subTitle,
  leftIcon,
  rightIcon,
  size,
  textVariant,
}: {
  loading: boolean;
  title: string;
  subTitle?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  size: keyof typeof variantTextSize;
  textVariant: keyof typeof variantText;
}) => {
  if (loading) {
    return <ActivityIndicator color="#fff" />;
  }

  return (
    <View className="flex-row items-center justify-center">
      {leftIcon && <View className="mr-2">{leftIcon}</View>}
      <View className="items-center justify-center -mt-1">
        <Text className={clsx("font-semibold", variantTextSize[size], variantText[textVariant])}>{title}</Text>
        {subTitle && (
          <Text className={clsx("opacity-80", variantTextSize[size], variantText[textVariant])}>{subTitle}</Text>
        )}
      </View>
      {rightIcon && <View className="ml-2">{rightIcon}</View>}
    </View>
  );
};

export const Button = React.memo(function Button({
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
  ...rest
}: ButtonProps) {
  const isDisabled = disabled || loading;
  const currentTextVariant = textVariant || variant;

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={isDisabled}
      activeOpacity={0.8}
      className={clsx(
        "flex-row p-2 items-center justify-center",
        variants[variant],
        variantTextSize[size],
        variantText[currentTextVariant],
        isDisabled && "opacity-60",
        className
      )}
      {...rest}
    >
      <ButtonContent
        loading={loading}
        title={title}
        subTitle={subTitle}
        leftIcon={leftIcon}
        rightIcon={rightIcon}
        size={size}
        textVariant={currentTextVariant}
      />
    </TouchableOpacity>
  );
});
