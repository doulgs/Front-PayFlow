import React from "react";
import { KeyboardAvoidingView, Platform, ScrollView, Text, View } from "react-native";

import { Button } from "@/components/ui/buttons";
import { CustomInput } from "@/components/ui/inputs";
import { MultiOptionsButton } from "@/components/ui/multi-options-button";
import { useCurrency } from "@/hooks/useCurrency";
import { useTheme } from "@/hooks/useTheme";
import { AlignLeft, CalendarDays, DollarSign, FileDigit, LetterText } from "lucide-react-native";
import { Controller, useForm } from "react-hook-form";

interface FormData {
  type: "Entrada" | "Saida" | "Outros";
  status: "Pendente" | "Finalizado";
  code: string;
  title: string;
  description: string;
  notes: string;
  value: string;
  dueDate: string;
}

const Details = () => {
  const { iconColor } = useTheme();
  const { formatCurrency } = useCurrency();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      type: "Entrada",
      status: "Pendente",
      code: "",
      title: "",
      description: "",
      notes: "",
      value: formatCurrency(Number(0)),
      dueDate: new Date().toISOString().substring(0, 10),
    },
  });

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1 bg-light-background-secondary dark:bg-dark-background-alternative"
    >
      <ScrollView className="p-4">
        <View className="mb-4">
          <Text className="text-light-typography-secondary dark:text-dark-typography-secondary font-bold mb-1">
            Tipo de Transação
          </Text>
          <Controller
            name="type"
            control={control}
            render={({ field: { value, onChange } }) => (
              <MultiOptionsButton options={["Entrada", "Saida", "Outros"]} selected={value} onChange={onChange} />
            )}
          />
        </View>

        <View className="mb-4">
          <Text className="text-light-typography-secondary dark:text-dark-typography-secondary font-bold mb-1">
            Tipo de Transação
          </Text>
          <Controller
            name="status"
            control={control}
            render={({ field: { value, onChange } }) => (
              <MultiOptionsButton options={["Pendente", "Finalizado"]} selected={value} onChange={onChange} />
            )}
          />
        </View>

        <CustomInput
          name="title"
          label="Título"
          control={control}
          type="text"
          placeholder="Digite um título"
          leftIcon={<LetterText size={18} color={iconColor} />}
          error={errors.title?.message}
        />
        <CustomInput
          name="description"
          label="Descrição"
          control={control}
          type="text"
          placeholder="Digite uma descrição"
          leftIcon={<AlignLeft size={18} color={iconColor} />}
          error={errors.description?.message}
        />

        <CustomInput
          name="dueDate"
          label="Data"
          control={control}
          type="date"
          placeholder="Informe a data"
          leftIcon={<CalendarDays size={18} color={iconColor} />}
          error={errors.dueDate?.message}
        />
        <CustomInput
          name="value"
          label="Valor da Transação"
          control={control}
          type="currency"
          placeholder="Digite o valor"
          leftIcon={<DollarSign size={18} color={iconColor} />}
          error={errors.value?.message}
        />
        <CustomInput
          name="code"
          label="Código do documento"
          control={control}
          type="number"
          placeholder="Digite o código do documento"
          leftIcon={<FileDigit size={18} color={iconColor} />}
          error={errors.code?.message}
        />
      </ScrollView>

      <View className="flex-1 flex-row max-h-20 border-t border-neutral-300 dark:border-neutral-800">
        <Button title="Cancelar" variant="ghost" textVariant="danger" className="flex-1" onPress={() => {}} />
        <View className="w-[1.5px] bg-neutral-300 dark:bg-neutral-800" />
        <Button title="Cadastrar" variant="ghost" className="flex-1" onPress={() => {}} />
      </View>
    </KeyboardAvoidingView>
  );
};

export default Details;
