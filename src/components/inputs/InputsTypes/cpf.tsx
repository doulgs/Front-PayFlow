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

function applyCpfMask(text: string) {
  return text
    .replace(/\D/g, "")
    .substring(0, 11)
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
}

export const CPFInput = ({ value, onChange, onBlur, placeholder }: InputProps) => {
  const { palette } = useTheme();
  const handleChange = (text: string) => {
    onChange(applyCpfMask(text));
  };

  return (
    <TextInput
      className="flex-1 text-light-typography-primary dark:text-dark-typography-primary text-base"
      placeholderTextColor={palette.typography.muted}
      placeholder={placeholder || "000.000.000-00"}
      onBlur={onBlur}
      onChangeText={handleChange}
      value={value}
      keyboardType="numeric"
      numberOfLines={1}
      autoCapitalize="none"
    />
  );
};
