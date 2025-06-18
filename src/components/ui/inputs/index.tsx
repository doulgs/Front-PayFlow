import { clsx } from "clsx";
import React from "react";
import { Control, Controller, FieldValues, Path, RegisterOptions } from "react-hook-form";
import { Text, TouchableOpacity, View } from "react-native";

import { AreaInput } from "@/components/ui/inputs/InputsTypes/area";
import { CNPJInput } from "@/components/ui/inputs/InputsTypes/cnpj";
import { CPFInput } from "@/components/ui/inputs/InputsTypes/cpf";
import { CurrencyInput } from "@/components/ui/inputs/InputsTypes/currency";
import { DateInput } from "@/components/ui/inputs/InputsTypes/date";
import { DocumentInput } from "@/components/ui/inputs/InputsTypes/document";
import { FilePickerInput } from "@/components/ui/inputs/InputsTypes/file-picker";
import { EmailInput } from "@/components/ui/inputs/InputsTypes/mail";
import { MultiSelectInput } from "@/components/ui/inputs/InputsTypes/multi-select";
import { NumberInput } from "@/components/ui/inputs/InputsTypes/number";
import { PasswordInput } from "@/components/ui/inputs/InputsTypes/password";
import { TextInputField } from "@/components/ui/inputs/InputsTypes/text";
import { useTheme } from "@/hooks/useTheme";
import { CircleX } from "lucide-react-native";
import { SelectInput } from "./InputsTypes/select";

const inputTypeComponents = {
  text: TextInputField,
  password: PasswordInput,
  mail: EmailInput,
  cpf: CPFInput,
  cnpj: CNPJInput,
  number: NumberInput,
  currency: CurrencyInput,
  area: AreaInput,
  date: DateInput,
  select: SelectInput,
  document: DocumentInput,
  multiSelect: MultiSelectInput,
  file: FilePickerInput,
} as const;

type InputType = keyof typeof inputTypeComponents;

interface CustomInputProps<T extends FieldValues = FieldValues> {
  name: Path<T>;
  control: Control<T>;
  rules?: RegisterOptions<T, Path<T>>;
  type?: InputType;
  label?: string;
  leftIcon?: React.ReactNode;
  variant?: "flat" | "outline" | "text";
  wrapperClass?: string;
  onItemSelect?: (item: any) => void;
  [key: string]: any;
}

const isValueFilled = (value: any) =>
  value !== undefined && value !== null && value !== "" && !(Array.isArray(value) && value.length === 0);

const baseStyles = "flex-row items-center h-12 min-h-[48px]";

const variants = {
  outline: "flex-1 rounded-lg bg-light-background-alternative dark:bg-dark-background-primary px-4",
  flat: "flex-1 border-b border-slate-400 rounded-none bg-transparent dark:bg-transparent text-red-500 px-0",
  text: "flex-1 bg-transparent border-0 rounded-none px-0",
};

const CustomInput = <T extends FieldValues = FieldValues>({
  name,
  control,
  rules,
  type = "text",
  label,
  leftIcon,
  variant = "outline",
  wrapperClass,
  onItemSelect,
  ...rest
}: CustomInputProps<T>) => {
  const { iconColor } = useTheme();
  const InputComponent = inputTypeComponents[type] || TextInputField;

  return (
    <View className="w-full mb-4">
      {label && (
        <Text className="text-light-typography-secondary dark:text-dark-typography-secondary font-medium mb-1">
          {label}
        </Text>
      )}

      <Controller
        control={control}
        name={name}
        rules={rules}
        render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
          <>
            <View className={clsx(baseStyles, variants[variant], wrapperClass)}>
              {leftIcon && <View className="mr-2">{leftIcon}</View>}
              <InputComponent
                onChange={onChange}
                onBlur={onBlur}
                value={value}
                clear={() => onChange(type === "multiSelect" ? [] : "")}
                onSelect={onItemSelect}
                defaultValue={rest.defaultValue}
                {...rest}
              />
              {isValueFilled(value) && type !== "multiSelect" && type !== "file" && (
                <TouchableOpacity onPress={() => onChange("")} className="ml-2">
                  <CircleX size={20} color={iconColor} />
                </TouchableOpacity>
              )}
            </View>

            {error && (
              <Text className="text-light-status-danger dark:text-dark-status-danger text-xs mt-1 ml-1 font-medium">
                {error.message}
              </Text>
            )}
          </>
        )}
      />
    </View>
  );
};

export { CustomInput };
