import React from "react";
import { NativeSyntheticEvent, TextInput, TextInputFocusEventData, TextInputProps } from "react-native";
import { useTheme } from "@/hooks/useTheme";

interface EmailInputProps extends Omit<TextInputProps, "onChange" | "onBlur" | "value"> {
  value: string;
  onChange: (text: string) => void;
  onBlur: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void;
  placeholder?: string;
  clear?: () => void;
}

export const EmailInput = ({ value, onChange, onBlur, placeholder, ...rest }: EmailInputProps) => {
  const { palette } = useTheme();
  return (
    <TextInput
      className="flex-1 text-base text-light-typography-primary dark:text-dark-typography-primary"
      placeholderTextColor={palette.typography.muted}
      keyboardType="email-address"
      autoCapitalize="none"
      autoCorrect={false}
      placeholder={placeholder || "Digite seu e-mail"}
      onBlur={onBlur}
      onChangeText={onChange}
      value={value}
      {...rest}
    />
  );
};
