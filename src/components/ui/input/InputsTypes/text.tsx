import React from "react";
import { NativeSyntheticEvent, TextInput, TextInputFocusEventData } from "react-native";
import { useTheme } from "@/hooks/useTheme";

interface InputProps {
  value: string;
  onChange: (text: string) => void;
  onBlur: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void;
  placeholder?: string;
  clear?: () => void;
}

export const TextInputField = ({ value, onChange, onBlur, placeholder }: InputProps) => {
  const { palette } = useTheme();
  return (
    <TextInput
      className="flex-1 text-base text-light-typography-primary dark:text-dark-typography-primary"
      placeholderTextColor={palette.background["dark-alternative"]}
      placeholder={placeholder}
      onBlur={onBlur}
      onChangeText={onChange}
      value={value}
      numberOfLines={1}
      autoCapitalize="none"
      autoCorrect={false}
    />
  );
};
