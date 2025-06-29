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

function applyCnpjMask(text: string) {
  return text
    .replace(/\D/g, "")
    .substring(0, 14)
    .replace(/(\d{2})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1/$2")
    .replace(/(\d{4})(\d{1,2})$/, "$1-$2");
}

export const DocumentInput = ({ value, onChange, onBlur, placeholder }: InputProps) => {
  const { palette } = useTheme();
  const handleChange = (text: string) => {
    const onlyNumbers = text.replace(/\D/g, "");

    if (onlyNumbers.length <= 11) {
      onChange(applyCpfMask(onlyNumbers));
    } else {
      onChange(applyCnpjMask(onlyNumbers));
    }
  };

  return (
    <TextInput
      className="flex-1 text-base text-light-typography-primary dark:text-dark-typography-primary"
      placeholderTextColor={palette.background["dark-alternative"]}
      placeholder={placeholder || "CPF ou CNPJ"}
      onBlur={onBlur}
      onChangeText={handleChange}
      value={value}
      keyboardType="numeric"
      numberOfLines={1}
      autoCapitalize="none"
    />
  );
};
