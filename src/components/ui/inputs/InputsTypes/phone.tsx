import React from "react";
import { NativeSyntheticEvent, TextInput, TextInputFocusEventData } from "react-native";
import { useTheme } from "@/hooks/useTheme";
import { useMask } from "@/hooks/useMaskDocument";

interface InputProps {
  value: string;
  onChange: (text: string) => void;
  onBlur: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void;
  placeholder?: string;
  clear?: () => void;
}

function applyPhoneMask(text: string) {
  const digits = text.replace(/\D/g, "").substring(0, 11);
  const length = digits.length;

  if (length <= 2) {
    return `(${digits}`;
  }

  if (length <= 7) {
    const part1 = digits.slice(0, 2);
    const part2 = digits.slice(2);
    return `(${part1})${part2}`;
  }

  const part1 = digits.slice(0, 2);
  const part2 = digits.slice(2, 7);
  const part3 = digits.slice(7);
  return `(${part1})${part2}-${part3}`;
}

export const PhoneInput = ({ value, onChange, onBlur, placeholder }: InputProps) => {
  const { palette } = useTheme();

  const handleChange = (text: string) => {
    onChange(applyPhoneMask(text));
  };

  return (
    <TextInput
      className="flex-1 text-light-typography-primary dark:text-dark-typography-primary text-base"
      placeholderTextColor={palette.typography.muted}
      placeholder={placeholder || "(00)00000-0000"}
      onBlur={onBlur}
      onChangeText={handleChange}
      value={value}
      keyboardType="phone-pad"
      numberOfLines={1}
      autoCapitalize="none"
    />
  );
};
