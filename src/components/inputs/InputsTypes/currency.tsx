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

function formatCurrency(value: string) {
  const numeric = value.replace(/\D/g, "").substring(0, 11);
  const float = (parseInt(numeric || "0") / 100).toFixed(2);
  return "R$ " + float.replace(".", ",").replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
}

export const CurrencyInput = ({ value, onChange, onBlur, placeholder }: InputProps) => {
  const { palette } = useTheme();
  const handleChange = (text: string) => {
    onChange(formatCurrency(text));
  };

  return (
    <TextInput
      className="flex-1 text-light-typography-primary dark:text-dark-typography-primary text-base"
      placeholderTextColor={palette.typography.muted}
      placeholder={placeholder || "R$ 0,00"}
      onBlur={onBlur}
      onChangeText={handleChange}
      value={value}
      keyboardType="numeric"
      numberOfLines={1}
      autoCapitalize="none"
    />
  );
};
